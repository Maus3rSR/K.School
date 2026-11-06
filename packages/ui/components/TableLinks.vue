<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import { useSlideContext } from '@slidev/client'

const props = defineProps({
  tables: {
    type: Array,
    required: true
  },
  links: {
    type: Array,
    default: () => []
  },
  direction: {
    type: String,
    default: 'row',
    validator: (value) => ['row', 'column'].includes(value)
  }
})

let $clicks = ref(0)
try {
  $clicks = useSlideContext().$clicks
}
catch (e) {
  // hors contexte slide : tout est visible
}

const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
const root = ref(null)
const itemEls = new Map()
const geoms = ref([])

function setItemRef(id, el) {
  if (el) itemEls.set(id, el)
  else itemEls.delete(id)
}

// visible pour at <= clicks (et clicks < until) ; enregistre les clicks
// nécessaires dans le total de la slide, comme un v-click absolu
function clickValue(at, until) {
  if (until != null)
    return [at != null && at >= 1 ? at : 1, until]
  if (at != null && at >= 1)
    return at
  return false
}

// élément visible seulement avant un click : v-click-hide
function isUntilOnly(at, until) {
  return until != null && (at == null || at < 1)
}

function isVariants(cell) {
  return Array.isArray(cell) && cell.length > 0
    && cell.every(c => c && typeof c === 'object' && 'v' in c)
}

function cellText(cell) {
  if (!isVariants(cell))
    return cell
  const c = $clicks.value
  let text = ''
  for (const v of cell) {
    if ((v.at ?? 0) <= c && c < (v.until ?? Number.POSITIVE_INFINITY))
      text = v.v
  }
  return text
}

function isBadRow(table, i) {
  return table.badRows?.some(b =>
    typeof b === 'number'
      ? b === i
      : b.row === i && (b.at ?? 0) <= $clicks.value && $clicks.value < (b.until ?? Number.POSITIVE_INFINITY)
  )
}

function measure() {
  const el = root.value
  if (!el)
    return
  // offset* remonte la chaîne des offsetParent jusqu'à la racine :
  // coordonnées en pixels de layout, immunisées au transform: scale() de Slidev
  const rel = (target) => {
    let l = 0
    let t = 0
    let n = target
    while (n && n !== el) {
      l += n.offsetLeft
      t += n.offsetTop
      n = n.offsetParent
    }
    const w = target.offsetWidth
    const h = target.offsetHeight
    return { l, t, r: l + w, b: t + h, cx: l + w / 2, cy: t + h / 2 }
  }

  // { sub: rect de la ligne/cellule visée, box: rect extérieur de la table/carte }
  const anchor = (spec) => {
    const item = itemEls.get(spec.table)
    if (!item)
      return null
    let target = item
    if (spec.row != null) {
      const sel = item.dataset.kind === 'object' ? '.tl-prop' : 'tbody tr'
      const row = item.querySelectorAll(sel)[spec.row]
      if (row) {
        target = row
        if (spec.col != null) {
          const table = props.tables.find(x => x.id === spec.table)
          const idx = table?.columns?.indexOf(spec.col) ?? -1
          if (idx >= 0 && row.children[idx])
            target = row.children[idx]
        }
      }
    }
    return { sub: rel(target), box: rel(item) }
  }

  const vertical = props.direction === 'column'

  geoms.value = props.links.map((l) => {
    const from = l.from && anchor(l.from)
    if (!from)
      return null
    const to = l.to ? anchor(l.to) : null

    let x1, y1, x2, y2, horiz
    if (to) {
      // la flèche sort du bord extérieur de l'élément, à hauteur de la ligne/cellule
      horiz = Math.abs(to.sub.cx - from.sub.cx) >= Math.abs(to.sub.cy - from.sub.cy)
      if (horiz) {
        const dir = to.sub.cx >= from.sub.cx ? 1 : -1
        x1 = dir > 0 ? from.box.r : from.box.l
        y1 = from.sub.cy
        x2 = dir > 0 ? to.box.l : to.box.r
        y2 = to.sub.cy
      }
      else {
        const dir = to.sub.cy >= from.sub.cy ? 1 : -1
        x1 = from.sub.cx
        y1 = dir > 0 ? from.box.b : from.box.t
        x2 = to.sub.cx
        y2 = dir > 0 ? to.box.t : to.box.b
      }
    }
    else {
      // pas de cible : la flèche part vers le vide (pointillé),
      // dans la direction des autres éléments mais s'arrête dans l'intervalle
      horiz = !vertical
      let dir = 1
      const others = [...itemEls.values()]
        .filter(e => e !== itemEls.get(l.from.table))
        .map(e => rel(e))
      if (others.length) {
        const ccx = others.reduce((s, r) => s + r.cx, 0) / others.length
        const ccy = others.reduce((s, r) => s + r.cy, 0) / others.length
        dir = (horiz ? ccx - from.sub.cx : ccy - from.sub.cy) >= 0 ? 1 : -1
      }
      const len = 52
      if (horiz) {
        x1 = dir > 0 ? from.box.r : from.box.l
        y1 = from.sub.cy
        x2 = x1 + dir * len
        y2 = y1
      }
      else {
        x1 = from.sub.cx
        y1 = dir > 0 ? from.box.b : from.box.t
        x2 = x1
        y2 = y1 + dir * len
      }
    }

    let d
    if (horiz) {
      const s = x2 >= x1 ? 1 : -1
      const k = Math.min(Math.max(Math.abs(x2 - x1) / 2, 18), 90)
      d = `M ${x1} ${y1} C ${x1 + s * k} ${y1}, ${x2 - s * k} ${y2}, ${x2} ${y2}`
    }
    else {
      const s = y2 >= y1 ? 1 : -1
      const k = Math.min(Math.max(Math.abs(y2 - y1) / 2, 18), 90)
      d = `M ${x1} ${y1} C ${x1} ${y1 + s * k}, ${x2} ${y2 - s * k}, ${x2} ${y2}`
    }

    return {
      d,
      dashed: l.dashed === true || !l.to,
      variant: l.variant || 'default',
      lx: (x1 + x2) / 2,
      ly: (y1 + y2) / 2,
    }
  })
}

function labelStyle(i) {
  const g = geoms.value[i]
  if (!g)
    return { visibility: 'hidden' }
  return { left: `${g.lx}px`, top: `${g.ly}px` }
}

let ro = null
onMounted(async () => {
  await nextTick()
  measure()
  ro = new ResizeObserver(() => measure())
  if (root.value)
    ro.observe(root.value)
  itemEls.forEach(el => ro.observe(el))
  document.fonts?.ready?.then(() => measure())
  watch($clicks, () => nextTick(measure))
})
onBeforeUnmount(() => ro?.disconnect())
</script>

<template>
  <div ref="root" class="tl-root" :class="`tl-${direction}`">
    <div
      v-for="t in tables"
      :key="t.id"
      :ref="el => setItemRef(t.id, el)"
      v-click="clickValue(t.at)"
      class="tl-item"
      :data-kind="t.kind === 'object' ? 'object' : 'table'"
    >
      <div v-if="t.kind === 'object'" class="tl-object">
        <div class="tl-obj-name">{{ t.name }}</div>
        <div v-for="(p, i) in t.props" :key="i" class="tl-prop">
          <span class="tl-prop-key">{{ p[0] }}</span>
          <span class="tl-prop-val">
            <template v-if="isVariants(p[1])">
              {{ cellText(p[1]) }}<span
                v-for="(v, j) in p[1]" :key="j"
                v-click="clickValue(v.at, v.until)"
                class="tl-clk"
              />
            </template>
            <template v-else>{{ p[1] }}</template>
          </span>
        </div>
      </div>
      <template v-else>
        <div class="tl-name">{{ t.name }}</div>
        <table class="tl-table">
          <thead>
            <tr>
              <th v-for="col in t.columns" :key="col">
                {{ col }}<sup v-if="t.pk?.includes(col)" class="tl-badge tl-badge-pk">PK</sup><sup v-else-if="t.fk?.includes(col)" class="tl-badge tl-badge-fk">FK</sup>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in t.rows" :key="i" :class="{ 'tl-bad': isBadRow(t, i) }">
              <td v-for="(cell, j) in row" :key="j">
                {{ cellText(cell) }}<template v-if="isVariants(cell)"><span
                  v-for="(v, k) in cell" :key="k"
                  v-click="clickValue(v.at, v.until)"
                  class="tl-clk"
                /></template>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>

    <svg class="tl-svg" aria-hidden="true">
      <defs>
        <marker
          v-for="v in ['default', 'ok', 'error', 'muted']" :key="v"
          :id="`tl-head-${uid}-${v}`"
          markerWidth="9" markerHeight="9" refX="7" refY="4.5"
          orient="auto-start-reverse" markerUnits="userSpaceOnUse"
        >
          <path d="M 0 0 L 9 4.5 L 0 9 z" :class="`tl-head tl-head-${v}`" />
        </marker>
      </defs>
      <g v-for="(l, i) in links" :key="i">
        <path
          v-if="isUntilOnly(l.at, l.until)"
          v-click-hide="l.until"
          :d="geoms[i]?.d || ''"
          :class="[`tl-link tl-link-${geoms[i]?.variant || 'default'}`, { 'tl-dashed': geoms[i]?.dashed }]"
          :marker-end="`url(#tl-head-${uid}-${geoms[i]?.variant || 'default'})`"
        />
        <path
          v-else
          v-click="clickValue(l.at, l.until)"
          :d="geoms[i]?.d || ''"
          :class="[`tl-link tl-link-${geoms[i]?.variant || 'default'}`, { 'tl-dashed': geoms[i]?.dashed }]"
          :marker-end="`url(#tl-head-${uid}-${geoms[i]?.variant || 'default'})`"
        />
      </g>
    </svg>

    <template v-for="(l, i) in links" :key="`lbl-${i}`">
      <div
        v-if="l.label && isUntilOnly(l.at, l.until)"
        v-click-hide="l.until"
        class="tl-label"
        :class="`tl-label-${geoms[i]?.variant || 'default'}`"
        :style="labelStyle(i)"
      >{{ l.label }}</div>
      <div
        v-else-if="l.label"
        v-click="clickValue(l.at, l.until)"
        class="tl-label"
        :class="[`tl-label-${geoms[i]?.variant || 'default'}`, { 'tl-label-below': l.labelSide === 'below' }]"
        :style="labelStyle(i)"
      >{{ l.label }}</div>
    </template>
  </div>
</template>

<style scoped>
.tl-root {
  position: relative;
  display: flex;
  gap: 3.2rem;
  align-items: center;
  justify-content: center;
}
.tl-column {
  flex-direction: column;
  gap: 2.6rem;
}
.tl-item {
  flex-shrink: 0;
}
.tl-name {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.78em;
  font-weight: 700;
  letter-spacing: 0.04em;
  opacity: 0.75;
  margin-bottom: 0.25rem;
}
.tl-table {
  width: auto !important;
  font-size: 0.8em;
}
.tl-badge {
  font-size: 0.6em;
  font-weight: 800;
  margin-left: 0.35em;
  padding: 0.05em 0.3em;
  border-radius: 4px;
  vertical-align: super;
}
.tl-badge-pk {
  color: #00b5ff;
  border: 1px solid #00b5ff;
}
.tl-badge-fk {
  color: #a855f7;
  border: 1px solid #a855f7;
}
.tl-bad td {
  background: color-mix(in srgb, #ff5861 16%, transparent) !important;
  color: #ff5861;
}
.tl-object {
  min-width: 9rem;
  border: 1px solid color-mix(in srgb, var(--slidev-theme-primary, #4f8ef7) 45%, transparent);
  border-radius: 10px;
  overflow: hidden;
  font-size: 0.8em;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
}
.tl-obj-name {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-weight: 700;
  padding: 0.3rem 0.7rem;
  background: color-mix(in srgb, var(--slidev-theme-primary, #4f8ef7) 18%, transparent);
  border-bottom: 1px solid color-mix(in srgb, var(--slidev-theme-primary, #4f8ef7) 30%, transparent);
}
.tl-prop {
  display: flex;
  justify-content: space-between;
  gap: 0.9rem;
  padding: 0.25rem 0.7rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
.tl-prop + .tl-prop {
  border-top: 1px solid rgba(148, 163, 184, 0.15);
}
.tl-prop-key {
  opacity: 0.7;
}
.tl-prop-val {
  color: var(--slidev-theme-primary, #4f8ef7);
}
.tl-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}
.tl-link {
  fill: none;
  stroke-width: 2;
}
.tl-link-default {
  stroke: var(--slidev-theme-primary, #4f8ef7);
}
.tl-link-ok {
  stroke: #00a96e;
}
.tl-link-error {
  stroke: #ff5861;
}
.tl-link-muted {
  stroke: #94a3b8;
}
.tl-dashed {
  stroke-dasharray: 5 4;
}
.tl-head-default {
  fill: var(--slidev-theme-primary, #4f8ef7);
}
.tl-head-ok {
  fill: #00a96e;
}
.tl-head-error {
  fill: #ff5861;
}
.tl-head-muted {
  fill: #94a3b8;
}
.tl-label {
  position: absolute;
  transform: translate(-50%, -115%);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.62rem;
  white-space: nowrap;
  padding: 0.1rem 0.45rem;
  border-radius: 6px;
  background: rgba(148, 163, 184, 0.14);
  border: 1px solid rgba(148, 163, 184, 0.4);
  backdrop-filter: blur(2px);
  pointer-events: none;
}
.tl-label-error {
  color: #ff5861;
  border-color: color-mix(in srgb, #ff5861 55%, transparent);
  background: color-mix(in srgb, #ff5861 12%, transparent);
}
.tl-label-ok {
  color: #00a96e;
  border-color: color-mix(in srgb, #00a96e 55%, transparent);
  background: color-mix(in srgb, #00a96e 10%, transparent);
}
.tl-label-muted {
  color: #94a3b8;
}
.tl-label-below {
  transform: translate(-50%, 35%);
}
.tl-clk {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}
</style>
