<script setup>
defineProps({
  term: {
    type: String,
    required: true
  },
  translation: {
    type: String,
    default: ''
  },
  definition: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="term-card">
    <span class="term">
      {{ term }}
      <small v-if="translation">{{ translation }}</small>
    </span>
    <span class="definition">{{ definition }}</span>
  </div>
</template>

<style scoped>
.term-card {
  display: flex;
  flex-direction: column;
  border-left: 3px solid var(--slidev-theme-primary, #4f8ef7);
  padding: 4px 10px;
  margin-bottom: 8px;
  border-radius: 0 6px 6px 0;
  background: rgba(79, 142, 247, 0.06);
}
.term-card .term {
  font-weight: 600;
  font-size: 0.95em;
  color: var(--slidev-theme-primary, #4f8ef7);
  line-height: 1.3;
}
.term-card .term small {
  font-weight: 400;
  font-size: 0.78em;
  opacity: 0.6;
  margin-left: 4px;
  color: inherit;
}
.term-card .definition {
  font-size: 0.78em;
  opacity: 0.75;
  line-height: 1.3;
}
</style>
