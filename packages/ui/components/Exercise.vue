<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    default: ''
  },
  level: {
    type: String,
    default: 'guidé',
    validator: (value) => ['guidé', 'autonome'].includes(value)
  },
  criteria: {
    type: Array,
    default: () => []
  },
  hints: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="exercise">
    <div class="exercise-header">
      <span class="exercise-icon">🎯</span>
      <span class="exercise-title">{{ title }}</span>
      <span class="exercise-badge exercise-level" :class="`level-${level}`">{{ level }}</span>
      <span v-if="duration" class="exercise-badge exercise-duration">⏱ {{ duration }}</span>
    </div>
    <div class="exercise-body">
      <slot />
    </div>
    <div v-if="criteria.length" class="exercise-criteria">
      <div class="exercise-subtitle">Critères de réussite</div>
      <ul>
        <li v-for="(c, i) in criteria" :key="i"><span class="checkbox">☐</span>{{ c }}</li>
      </ul>
    </div>
    <div v-if="hints.length" class="exercise-hints">
      <details v-for="(hint, i) in hints.slice(0, 3)" :key="i" class="exercise-hint">
        <summary>Indice {{ i + 1 }}</summary>
        <div class="hint-body">{{ hint }}</div>
      </details>
    </div>
  </div>
</template>

<style scoped>
.exercise {
  border: 1px solid color-mix(in srgb, var(--slidev-theme-primary, #4f8ef7) 35%, transparent);
  border-radius: 10px;
  padding: 0.9rem 1.1rem;
  background: color-mix(in srgb, var(--slidev-theme-primary, #4f8ef7) 4%, transparent);
}
.exercise-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}
.exercise-icon {
  font-size: 1.15em;
}
.exercise-title {
  font-weight: 700;
  font-size: 1em;
}
.exercise-badge {
  font-size: 0.65em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.2em 0.6em;
  border-radius: 999px;
}
.level-guidé {
  background: rgba(0, 181, 255, 0.15);
  color: #00b5ff;
}
.level-autonome {
  background: rgba(168, 85, 247, 0.15);
  color: #a855f7;
}
.exercise-duration {
  background: rgba(148, 163, 184, 0.15);
  color: #94a3b8;
}
.exercise-body {
  font-size: 0.85em;
  line-height: 1.5;
}
.exercise-body :deep(p) {
  margin: 0.25rem 0;
}
.exercise-criteria {
  margin-top: 0.6rem;
}
.exercise-subtitle {
  font-weight: 700;
  font-size: 0.75em;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.75;
  margin-bottom: 0.3rem;
}
.exercise-criteria ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.exercise-criteria li {
  display: flex;
  gap: 0.5rem;
  font-size: 0.82em;
  padding: 0.12rem 0;
}
.checkbox {
  color: var(--slidev-theme-primary, #4f8ef7);
}
.exercise-hints {
  margin-top: 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.exercise-hint summary {
  cursor: pointer;
  font-size: 0.8em;
  font-weight: 600;
  color: var(--slidev-theme-primary, #4f8ef7);
}
.hint-body {
  font-size: 0.8em;
  padding: 0.3rem 0 0.3rem 1rem;
  opacity: 0.85;
}
</style>
