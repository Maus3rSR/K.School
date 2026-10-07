<script setup>
import { ref } from 'vue'

defineProps({
  front: {
    type: String,
    required: true
  },
  back: {
    type: String,
    required: true
  }
})

const flipped = ref(false)
</script>

<template>
  <div class="flashcard" :class="{ flipped }" @click="flipped = !flipped">
    <div class="flashcard-inner">
      <div class="flashcard-face flashcard-front">{{ front }}</div>
      <div class="flashcard-face flashcard-back">{{ back }}</div>
    </div>
  </div>
</template>

<style scoped>
.flashcard {
  perspective: 1000px;
  height: 140px;
  cursor: pointer;
}
.flashcard-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s;
}
.flashcard.flipped .flashcard-inner {
  transform: rotateY(180deg);
}
.flashcard-face {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0.8rem;
  border-radius: 10px;
  backface-visibility: hidden;
  font-weight: 600;
  font-size: 0.85em;
  color: #fff;
}
.flashcard-front {
  background: var(--slidev-theme-primary, #4f8ef7);
}
.flashcard-back {
  background: #00a96e;
  transform: rotateY(180deg);
}
</style>
