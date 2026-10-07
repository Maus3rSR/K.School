<script setup>
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const nav = useNav()

const hiddenLayouts = ['cover', 'chapter', 'section', 'end']

const chapter = computed(() => {
  const list = nav.slides.value || []
  for (let i = nav.currentSlideNo.value - 1; i >= 0; i--) {
    const s = list[i]
    if (s?.meta?.layout === 'chapter' || s?.meta?.slide?.frontmatter?.layout === 'chapter')
      return s
  }
  return null
})

const show = computed(() => !!chapter.value && !hiddenLayouts.includes(nav.currentLayout.value))

const label = computed(() => {
  const slide = chapter.value?.meta?.slide
  const fm = slide?.frontmatter || {}
  const title = slide?.title || fm.title || ''
  const num = fm.number != null && fm.number !== ''
    ? `Chapitre ${String(fm.number).padStart(2, '0')}`
    : 'Chapitre'
  return title ? `${num} · ${title}` : num
})
</script>

<template>
  <footer v-if="show" class="chapter-footer">{{ label }}</footer>
</template>

<style scoped>
.chapter-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.6rem 1rem;
  font-size: 0.75rem;
  opacity: 0.5;
  z-index: 10;
  pointer-events: none;
}
</style>
