<script setup>
import { computed } from 'vue'

const props = defineProps({
  method: {
    type: String,
    default: 'GET'
  },
  url: {
    type: String,
    default: '/'
  },
  version: {
    type: String,
    default: 'HTTP/1.1'
  },
  headers: {
    type: Array,
    default: () => []
  },
  body: {
    type: String,
    default: ''
  },
  explain: {
    type: Boolean,
    default: true
  },
  clicks: {
    type: Boolean,
    default: false
  },
  legend: {
    type: Boolean,
    default: true
  }
})

const emptyBody = computed(() =>
  props.method.toUpperCase() === 'GET'
    ? "Vide : un GET n'a pas de corps"
    : 'Vide'
)

const parts = [
  {
    color: '#00b5ff',
    title: 'Ligne de requête',
    kind: 'request',
    clearTitle: 'Ma demande',
    clearText: 'Quoi faire, sur quoi, et dans quel « langage ».'
  },
  {
    color: '#ffbe00',
    title: "Lignes d'en-tête",
    kind: 'headers',
    clearTitle: 'Les infos pratiques',
    clearText: "Qui je suis, ce que j'envoie, ce que je sais lire… Autant de lignes que besoin."
  },
  {
    color: '#94a3b8',
    title: 'Ligne vide',
    kind: 'blank',
    clearTitle: 'Le séparateur',
    clearText: ''
  },
  {
    color: '#a855f7',
    title: "Corps de l'entité",
    kind: 'body',
    clearTitle: 'Le contenu du colis',
    clearText: "Les données envoyées au serveur (optionnel : un GET n'en a pas)."
  }
]
</script>

<template>
  <div class="hreq">
    <div class="hreq-rows">
      <template v-for="(p, i) in parts" :key="i">
      <div
        v-if="clicks"
        v-click
        class="hreq-row"
        :class="{ 'hreq-row--solo': !explain }"
        :style="{ '--c': p.color }"
      >
        <div class="hreq-part">
          <span class="hreq-badge">{{ i + 1 }}</span>
          <div class="hreq-title">{{ p.title }}</div>

          <div v-if="p.kind === 'request'" class="hreq-line">
            <span class="hreq-ccol">
              <span class="hreq-chip">{{ method }}</span>
              <span class="hreq-cap">Méthode : l'action</span>
            </span>
            <span class="hreq-ghost">sp</span>
            <span class="hreq-ccol">
              <span class="hreq-chip">{{ url }}</span>
              <span class="hreq-cap">URL : l'adresse visée</span>
            </span>
            <span class="hreq-ghost">sp</span>
            <span class="hreq-ccol">
              <span class="hreq-chip">{{ version }}</span>
              <span class="hreq-cap">Version du protocole</span>
            </span>
            <span class="hreq-ghost">CR LF</span>
          </div>

          <template v-else-if="p.kind === 'headers'">
            <div v-for="(h, j) in headers" :key="j" class="hreq-line">
              <span class="hreq-chip">{{ h[0] }}:</span>
              <span class="hreq-ghost">sp</span>
              <span class="hreq-chip hreq-chip--val">{{ h[1] }}</span>
              <span class="hreq-ghost">CR LF</span>
            </div>
            <div v-if="!headers.length" class="hreq-empty">(aucun en-tête)</div>
          </template>

          <div v-else-if="p.kind === 'blank'" class="hreq-line">
            <span class="hreq-ghost">CR LF</span>
            <span class="hreq-note">Rien d'écrit : juste un saut de ligne. Fin des en-têtes.</span>
          </div>

          <div v-else class="hreq-body">
            <span v-if="body" class="hreq-bodybox">{{ body }}</span>
            <span v-else class="hreq-empty">{{ emptyBody }}</span>
          </div>
        </div>

        <div v-if="explain" class="hreq-clear">
          <span class="hreq-clear-label">En clair</span>
          <span class="hreq-clear-title">{{ p.clearTitle }}</span>
          <span v-if="p.clearText" class="hreq-clear-text">{{ p.clearText }}</span>
        </div>
      </div>
      <div
        v-else
        class="hreq-row"
        :class="{ 'hreq-row--solo': !explain }"
        :style="{ '--c': p.color }"
      >
        <div class="hreq-part">
          <span class="hreq-badge">{{ i + 1 }}</span>
          <div class="hreq-title">{{ p.title }}</div>

          <div v-if="p.kind === 'request'" class="hreq-line">
            <span class="hreq-ccol">
              <span class="hreq-chip">{{ method }}</span>
              <span class="hreq-cap">Méthode : l'action</span>
            </span>
            <span class="hreq-ghost">sp</span>
            <span class="hreq-ccol">
              <span class="hreq-chip">{{ url }}</span>
              <span class="hreq-cap">URL : l'adresse visée</span>
            </span>
            <span class="hreq-ghost">sp</span>
            <span class="hreq-ccol">
              <span class="hreq-chip">{{ version }}</span>
              <span class="hreq-cap">Version du protocole</span>
            </span>
            <span class="hreq-ghost">CR LF</span>
          </div>

          <template v-else-if="p.kind === 'headers'">
            <div v-for="(h, j) in headers" :key="j" class="hreq-line">
              <span class="hreq-chip">{{ h[0] }}:</span>
              <span class="hreq-ghost">sp</span>
              <span class="hreq-chip hreq-chip--val">{{ h[1] }}</span>
              <span class="hreq-ghost">CR LF</span>
            </div>
            <div v-if="!headers.length" class="hreq-empty">(aucun en-tête)</div>
          </template>

          <div v-else-if="p.kind === 'blank'" class="hreq-line">
            <span class="hreq-ghost">CR LF</span>
            <span class="hreq-note">Rien d'écrit : juste un saut de ligne. Fin des en-têtes.</span>
          </div>

          <div v-else class="hreq-body">
            <span v-if="body" class="hreq-bodybox">{{ body }}</span>
            <span v-else class="hreq-empty">{{ emptyBody }}</span>
          </div>
        </div>

        <div v-if="explain" class="hreq-clear">
          <span class="hreq-clear-label">En clair</span>
          <span class="hreq-clear-title">{{ p.clearTitle }}</span>
          <span v-if="p.clearText" class="hreq-clear-text">{{ p.clearText }}</span>
        </div>
      </div>
      </template>
    </div>

    <div v-if="legend" class="hreq-legend">
      <span class="hreq-ghost">sp</span> = espace&ensp;·&ensp;<span class="hreq-ghost">CR LF</span> = retour à la ligne (invisible à l'écran)
    </div>
  </div>
</template>

<style scoped>
.hreq {
  font-size: 0.78em;
  --c: #94a3b8;
}
.hreq-rows {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.hreq-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 8px;
  align-items: stretch;
  position: relative;
}
.hreq-row--solo {
  grid-template-columns: 1fr;
}
.hreq-row:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 33%;
  bottom: -7px;
  height: 6px;
  border-left: 2px dotted color-mix(in srgb, var(--slidev-theme-primary, #4f8ef7) 45%, transparent);
}
.hreq-part {
  position: relative;
  border-radius: 9px;
  padding: 0.32rem 0.6rem 0.4rem;
  background: color-mix(in srgb, var(--c) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--c) 40%, transparent);
}
.hreq-badge {
  position: absolute;
  top: -0.45em;
  left: -0.45em;
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  background: var(--c);
  color: #fff;
  font-size: 0.85em;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
}
.hreq-title {
  color: var(--c);
  font-weight: 700;
  font-size: 0.72em;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-left: 1rem;
  margin-bottom: 0.15rem;
}
.hreq-line {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.35em;
  padding: 0.08em 0;
}
.hreq-ccol {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hreq-cap {
  font-size: 0.62em;
  opacity: 0.65;
  white-space: nowrap;
  margin-top: 0.08em;
}
.hreq-chip {
  font-family: var(--slidev-code-font-family, ui-monospace, SFMono-Regular, Menlo, monospace);
  background: color-mix(in srgb, var(--c) 55%, #0f172a);
  color: #fff;
  font-weight: 700;
  font-size: 0.9em;
  line-height: 1.35;
  padding: 0.06em 0.5em;
  border-radius: 5px;
  white-space: nowrap;
}
.hreq-chip--val {
  background: color-mix(in srgb, var(--c) 40%, #0f172a);
  font-weight: 600;
}
.hreq-ghost {
  font-family: var(--slidev-code-font-family, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 0.62em;
  padding: 0.05em 0.35em;
  border: 1px dashed color-mix(in srgb, var(--c) 55%, transparent);
  border-radius: 4px;
  opacity: 0.8;
  white-space: nowrap;
}
.hreq-note {
  font-size: 0.78em;
  opacity: 0.75;
}
.hreq-bodybox {
  display: inline-block;
  font-family: var(--slidev-code-font-family, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 0.9em;
  font-weight: 600;
  background: color-mix(in srgb, var(--c) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--c) 35%, transparent);
  border-radius: 6px;
  padding: 0.15em 0.6em;
}
.hreq-empty {
  font-style: italic;
  font-size: 0.82em;
  opacity: 0.55;
}
.hreq-clear {
  border-radius: 9px;
  padding: 0.32rem 0.6rem;
  background: color-mix(in srgb, var(--c) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--c) 25%, transparent);
  border-left: 3px solid var(--c);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.hreq-clear-label {
  font-size: 0.58em;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--c);
}
.hreq-clear-title {
  font-weight: 800;
  font-size: 0.78em;
  line-height: 1.2;
}
.hreq-clear-text {
  font-size: 0.66em;
  opacity: 0.7;
  line-height: 1.3;
  margin-top: 0.1em;
}
.hreq-legend {
  margin-top: 6px;
  font-size: 0.62em;
  opacity: 0.6;
}
</style>
