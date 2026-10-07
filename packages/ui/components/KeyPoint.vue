<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'À retenir'
  },
  icon: {
    type: String,
    default: '💡'
  },
  variant: {
    type: String,
    default: 'tip',
    validator: (value) => ['tip', 'rule', 'warning'].includes(value)
  }
})

const palette = {
  tip: '#00b5ff',
  rule: '#a855f7',
  warning: '#ffbe00'
}

const variantColor = computed(() => palette[props.variant])
</script>

<template>
  <div class="keypoint" :style="{ '--kp-color': variantColor }">
    <div class="keypoint-header">
      <span class="keypoint-icon">{{ icon }}</span>
      <span class="keypoint-title">{{ title }}</span>
    </div>
    <div class="keypoint-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.keypoint {
  border-radius: 10px;
  padding: 0.9rem 1.1rem;
  background: color-mix(in srgb, var(--kp-color) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--kp-color) 40%, transparent);
}
.keypoint-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}
.keypoint-icon {
  font-size: 1.1em;
}
.keypoint-title {
  font-weight: 700;
  font-size: 0.95em;
  color: var(--kp-color);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.keypoint-body {
  font-size: 0.88em;
  line-height: 1.5;
}
.keypoint-body :deep(p) {
  margin: 0.25rem 0;
}
</style>
