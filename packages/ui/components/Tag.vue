<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'green', 'orange', 'purple', 'red', 'gray'].includes(value)
  }
})

const palette = {
  blue: '#00b5ff',
  green: '#00a96e',
  orange: '#ffbe00',
  purple: '#a855f7',
  red: '#ff5861',
  gray: '#94a3b8'
}

const tagColor = computed(() => palette[props.color])
</script>

<template>
  <span class="tag" :style="{ '--tag-color': tagColor }">
    <span class="tag-label">{{ label }}</span>
    <span class="tag-word"><slot /></span>
  </span>
</template>

<style scoped>
.tag {
  position: relative;
  display: inline-block;
  padding-top: 1.1em;
  line-height: 1;
  vertical-align: baseline;
  margin: 0 0.15em;
}
.tag-label {
  position: absolute;
  top: 8px;
  left: 80%;
  transform: translateX(-15%);
  white-space: nowrap;
  font-size: 0.45em;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  padding: 0.08em 0.35em;
  border-radius: 999px;
  color: var(--tag-color);
  background: color-mix(in srgb, var(--tag-color) 18%, transparent);
  border: 1px solid color-mix(in srgb, var(--tag-color) 55%, transparent);
}
.tag-word {
  border-bottom: 2px dotted var(--tag-color);
}
</style>
