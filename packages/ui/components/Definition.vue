<script setup>
defineProps({
  term: {
    type: String,
    required: true
  },
  translation: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="definition">
    <div class="definition-term">
      {{ term }}
      <small v-if="translation">{{ translation }}</small>
    </div>
    <div class="definition-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.definition {
  border-left: 4px solid var(--slidev-theme-primary, #4f8ef7);
  border-radius: 0 10px 10px 0;
  padding: 0.8rem 1.1rem;
  background: rgba(79, 142, 247, 0.06);
  background: color-mix(in srgb, var(--slidev-theme-primary, #4f8ef7) 6%, transparent);
}
.definition-term {
  font-weight: 700;
  font-size: 1.3em;
  color: var(--slidev-theme-primary, #4f8ef7);
  line-height: 1.25;
  margin-bottom: 0.3rem;
}
.definition-term small {
  font-weight: 400;
  font-size: 0.6em;
  opacity: 0.6;
  margin-left: 0.4rem;
}
.definition-body {
  font-size: 0.9em;
  line-height: 1.5;
  opacity: 0.9;
}
.definition-body :deep(p) {
  margin: 0.25rem 0;
}
</style>
