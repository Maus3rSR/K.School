<script setup>
import { computed } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  cols: {
    type: Number,
    default: 3
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  clicks: {
    type: Boolean,
    default: false
  }
})

const heights = { sm: '80px', md: '120px', lg: '180px' }
const imgHeight = computed(() => heights[props.size])
</script>

<template>
  <div class="image-grid" :style="{ gridTemplateColumns: `repeat(${cols}, 1fr)` }">
    <template v-for="(img, i) in images" :key="i">
      <div v-if="clicks" v-click class="image-card">
        <img :src="img.src" :alt="img.alt || ''" :style="{ height: imgHeight }" />
        <div v-if="img.caption" class="image-caption">{{ img.caption }}</div>
      </div>
      <div v-else class="image-card">
        <img :src="img.src" :alt="img.alt || ''" :style="{ height: imgHeight }" />
        <div v-if="img.caption" class="image-caption">{{ img.caption }}</div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.image-grid {
  display: grid;
  gap: 0.75rem;
}
.image-card {
  background: rgba(148, 163, 184, 0.12);
  border-radius: 10px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.image-card img {
  object-fit: contain;
  max-width: 100%;
  border-radius: 6px;
}
.image-caption {
  font-size: 0.7em;
  text-align: center;
  opacity: 0.8;
  margin-top: 0.35rem;
}
</style>
