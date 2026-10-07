<script setup>
defineProps({
  number: {
    type: [String, Number],
    default: ''
  },
  duration: {
    type: String,
    default: ''
  },
  background: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="slidev-layout chapter" :style="background ? { backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}">
    <div class="chapter-overlay">
      <div v-if="number !== ''" class="chapter-number">Chapitre {{ String(number).padStart(2, '0') }}</div>
      <div class="chapter-content">
        <slot />
      </div>
      <div v-if="duration" class="chapter-duration">⏱ {{ duration }}</div>
    </div>
  </div>
</template>

<style scoped>
.chapter {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%);
  color: #f1f5f9;
}
.chapter-overlay {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
  background: rgba(15, 23, 42, 0.55);
}
.chapter-number {
  position: absolute;
  top: 2.2rem;
  left: 3rem;
  font-size: 0.95em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  font-variant: small-caps;
  color: var(--slidev-theme-primary, #4f8ef7);
}
.chapter-content :deep(h1) {
  font-size: 2.4em;
  font-weight: 800;
  color: #f1f5f9;
  margin-bottom: 0.8rem;
}
.chapter-content :deep(li),
.chapter-content :deep(p) {
  color: #cbd5e1;
}
.chapter-duration {
  position: absolute;
  bottom: 2.2rem;
  right: 3rem;
  font-size: 0.8em;
  font-weight: 600;
  padding: 0.35em 0.9em;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.2);
  color: #cbd5e1;
}
</style>
