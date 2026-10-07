<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: '🧠'
  },
  image: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="analogy" :class="{ 'analogy-with-image': image }">
    <img v-if="image" :src="image" :alt="title" class="analogy-image" />
    <div class="analogy-content">
      <div class="analogy-header">
        <span class="analogy-icon">{{ icon }}</span>
        <span class="analogy-title">{{ title }}</span>
      </div>
      <div class="analogy-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.analogy {
  display: flex;
  gap: 1rem;
  align-items: stretch;
  border: 2px dashed color-mix(in srgb, var(--slidev-theme-primary, #4f8ef7) 45%, transparent);
  border-radius: 10px;
  padding: 0.9rem 1.1rem;
  background: color-mix(in srgb, var(--slidev-theme-primary, #4f8ef7) 5%, transparent);
}
.analogy-image {
  flex-shrink: 0;
  width: 35%;
  object-fit: cover;
  border-radius: 8px;
}
.analogy-content {
  flex: 1;
  min-width: 0;
}
.analogy-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}
.analogy-icon {
  font-size: 1.2em;
}
.analogy-title {
  font-weight: 700;
  font-size: 0.95em;
  color: var(--slidev-theme-primary, #4f8ef7);
}
.analogy-body {
  font-size: 0.88em;
  line-height: 1.5;
}
.analogy-body :deep(p) {
  margin: 0.25rem 0;
}
</style>
