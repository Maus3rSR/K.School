<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: [String, Number],
    required: true
  },
  label: {
    type: String,
    default: ''
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

const statColor = computed(() => palette[props.color])
</script>

<template>
  <div class="stat">
    <div class="stat-value" :style="{ color: statColor }">{{ value }}</div>
    <div v-if="label" class="stat-label">{{ label }}</div>
  </div>
</template>

<style scoped>
.stat {
  text-align: center;
}
.stat-value {
  font-size: 3em;
  font-weight: 800;
  line-height: 1.1;
}
.stat-label {
  font-size: 0.8em;
  opacity: 0.75;
  margin-top: 0.2rem;
}
</style>
