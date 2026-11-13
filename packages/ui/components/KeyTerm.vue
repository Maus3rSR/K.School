<script setup>
defineOptions({ name: 'KeyTerm' })
</script>

<template>
  <span class="key-term"><slot /></span>
</template>

<style scoped>
.key-term {
  display: inline;
  font-weight: 600;
  color: var(--slidev-theme-primary, #4f8ef7);
  text-decoration: underline dotted;
  text-decoration-thickness: 2px;
  text-underline-offset: 0.2em;
  text-decoration-color: var(--slidev-theme-primary, #4f8ef7);
}
</style>
