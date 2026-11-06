<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  doc: {
    type: String,
    required: true
  },
  at: {
    type: String,
    default: ''
  }
})

if (props.items.length > 24) {
  console.warn(`<Panorama> : ${props.items.length} éléments reçus (24 maximum recommandé) — scinder en deux Panoramas thématiques.`)
}

const TAG_RE = /^s(\d+)-ch(\d+)$/

const atPos = computed(() => {
  const m = TAG_RE.exec(props.at)
  return m ? { s: Number(m[1]), ch: Number(m[2]) } : null
})

function isSeen(item) {
  if (!atPos.value || !item.seen) return false
  const m = TAG_RE.exec(item.seen)
  if (!m) return false
  const s = Number(m[1])
  const ch = Number(m[2])
  return s < atPos.value.s || (s === atPos.value.s && ch <= atPos.value.ch)
}

const seenCount = computed(() => props.items.filter(isSeen).length)

const rows = computed(() => {
  const result = []
  let lastGroup
  props.items.forEach((item, index) => {
    if (item.group !== undefined && item.group !== lastGroup) {
      result.push({ type: 'group', label: item.group, key: `g-${index}` })
    }
    lastGroup = item.group
    result.push({ type: 'item', item, key: `i-${index}` })
  })
  return result
})
</script>

<template>
  <div class="panorama">
    <div class="panorama-grid">
      <template v-for="row in rows" :key="row.key">
        <div v-if="row.type === 'group'" class="panorama-group">{{ row.label }}</div>
        <div
          v-else
          class="panorama-item"
          :class="{ 'is-unseen': atPos && !isSeen(row.item) }"
        >
          <span class="item-line">
            <code class="item-name">{{ row.item.name }}</code>
            <span v-if="atPos && isSeen(row.item)" class="item-badge">vu</span>
          </span>
          <span class="item-desc">{{ row.item.desc }}</span>
        </div>
      </template>
    </div>
    <div class="panorama-footer">
      <span v-if="atPos" class="panorama-counter">
        {{ seenCount }} / {{ items.length }} vus en séance
      </span>
      <a :href="doc" target="_blank" rel="noopener" class="panorama-doc">
        📖 Documentation officielle ↗
      </a>
    </div>
  </div>
</template>

<style scoped>
.panorama {
  display: flex;
  flex-direction: column;
}
.panorama-grid {
  columns: 3;
  column-gap: 1.5rem;
}
.panorama-group {
  break-inside: avoid;
  break-after: avoid;
  font-size: 0.58em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--slidev-theme-primary, #4f8ef7);
  opacity: 0.8;
  margin: 0.55rem 0 0.15rem;
}
.panorama-group:first-child {
  margin-top: 0;
}
.panorama-item {
  break-inside: avoid;
  padding: 0.12rem 0;
  line-height: 1.3;
}
.panorama-item.is-unseen {
  opacity: 0.55;
}
.item-line {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}
.item-name {
  font-size: 0.68em;
  font-family: var(--slidev-code-font-family, ui-monospace, monospace);
  background: color-mix(in srgb, var(--slidev-theme-primary, #4f8ef7) 12%, transparent);
  border-radius: 4px;
  padding: 0.08rem 0.35rem;
  white-space: nowrap;
}
.item-badge {
  flex-shrink: 0;
  font-size: 0.5em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #fff;
  background: var(--slidev-theme-primary, #4f8ef7);
  border-radius: 999px;
  padding: 0.08rem 0.4rem;
  line-height: 1.6;
}
.item-desc {
  display: block;
  font-size: 0.62em;
  opacity: 0.7;
  line-height: 1.35;
  margin-top: 0.08rem;
}
.panorama-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.8rem;
  padding-top: 0.4rem;
  border-top: 1px solid color-mix(in srgb, var(--slidev-theme-primary, #4f8ef7) 25%, transparent);
  font-size: 0.62em;
}
.panorama-counter {
  opacity: 0.65;
}
.panorama-doc {
  margin-left: auto;
  color: var(--slidev-theme-primary, #4f8ef7);
  font-weight: 600;
}
.panorama-doc:hover {
  text-decoration: underline;
}
</style>
