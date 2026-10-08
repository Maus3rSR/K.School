<script setup>
defineOptions({ name: 'KeyTerm' })
</script>

<template>
  <span class="key-term"><slot /></span>
</template>

<style scoped>
.key-term {
  display: inline;
  padding: 0.05em 0.35em;
  border-radius: 0.35em;
  font-weight: 600;
  color: var(--slidev-theme-primary, #4f8ef7);
  background: color-mix(in srgb, var(--slidev-theme-primary, #4f8ef7) 15%, transparent);
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}
</style>
