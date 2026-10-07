<script setup>
import { computed } from 'vue'

const props = defineProps({
  w: {
    type: Number,
    default: 600
  },
  h: {
    type: Number,
    default: 400
  },
  text: {
    type: String,
    default: ''
  },
  bg: {
    type: String,
    default: '1e293b'
  },
  fg: {
    type: String,
    default: '94a3b8'
  },
  rounded: {
    type: Boolean,
    default: true
  }
})

const src = computed(() => {
  const t = props.text || `${props.w}×${props.h}`
  return `https://placeholdit.com/${props.w}x${props.h}/${props.bg}/${props.fg}?text=${encodeURIComponent(t).replace(/%20/g, '+')}`
})
const alt = computed(() => props.text || `${props.w}×${props.h}`)
</script>

<template>
  <img :src="src" :alt="alt" class="placeholder" :class="{ rounded }" />
</template>

<style scoped>
.placeholder {
  max-width: 100%;
  display: block;
}
.placeholder.rounded {
  border-radius: 8px;
}
</style>
