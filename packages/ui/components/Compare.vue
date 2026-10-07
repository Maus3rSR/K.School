<script setup>
defineProps({
  badLabel: {
    type: String,
    default: '❌ À éviter'
  },
  goodLabel: {
    type: String,
    default: '✅ À faire'
  }
})
</script>

<template>
  <div class="compare">
    <div class="compare-col compare-bad">
      <div class="compare-header">{{ badLabel }}</div>
      <div class="compare-body">
        <slot name="bad" />
      </div>
    </div>
    <div class="compare-col compare-good">
      <div class="compare-header">{{ goodLabel }}</div>
      <div class="compare-body">
        <slot name="good" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.compare {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.compare-col {
  border-radius: 10px;
  overflow: hidden;
}
.compare-bad {
  border: 1px solid rgba(255, 88, 97, 0.4);
}
.compare-good {
  border: 1px solid rgba(0, 169, 110, 0.4);
}
.compare-header {
  font-weight: 700;
  font-size: 0.85em;
  padding: 0.5rem 0.9rem;
}
.compare-bad .compare-header {
  background: rgba(255, 88, 97, 0.15);
  color: #ff5861;
}
.compare-good .compare-header {
  background: rgba(0, 169, 110, 0.15);
  color: #00a96e;
}
.compare-body {
  padding: 0.6rem 0.9rem;
  font-size: 0.85em;
}
.compare-body :deep(pre) {
  margin: 0;
}
</style>
