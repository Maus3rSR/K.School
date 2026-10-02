<script setup>
import { ref } from 'vue'

defineProps({
  question: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true
  },
  answer: {
    type: Number,
    required: true
  }
})

const selected = ref(null)

function select(index) {
  if (selected.value === null) selected.value = index
}

function reset() {
  selected.value = null
}
</script>

<template>
  <div class="quiz">
    <p class="quiz-question">{{ question }}</p>
    <div class="quiz-grid">
      <button
        v-for="(option, i) in options"
        :key="i"
        class="quiz-option"
        :class="{
          'is-correct': selected !== null && i === answer,
          'is-wrong': selected === i && i !== answer,
          'is-dimmed': selected !== null && i !== answer && i !== selected
        }"
        :disabled="selected !== null"
        @click="select(i)"
      >
        <span class="quiz-letter">{{ String.fromCharCode(65 + i) }}</span>
        <span class="quiz-text">{{ option }}</span>
      </button>
    </div>
    <div v-if="selected !== null" class="quiz-feedback">
      <span v-if="selected === answer">✅ Bonne réponse !</span>
      <span v-else>❌ Mauvaise réponse — la bonne réponse est en vert.</span>
      <button class="quiz-retry" @click="reset">Réessayer</button>
    </div>
  </div>
</template>

<style scoped>
.quiz {
  margin: 0.5rem 0;
}
.quiz-question {
  font-weight: 700;
  font-size: 1.2em;
  margin: 0 0 0.75rem;
}
.quiz-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}
.quiz-option {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-align: left;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  border: 2px solid rgba(79, 142, 247, 0.35);
  border-color: color-mix(in srgb, var(--slidev-theme-primary, #4f8ef7) 35%, transparent);
  background: transparent;
  color: inherit;
  font-size: 0.85em;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease, opacity 0.15s ease;
}
.quiz-option:not(:disabled):hover {
  border-color: var(--slidev-theme-primary, #4f8ef7);
  background: rgba(79, 142, 247, 0.12);
  background: color-mix(in srgb, var(--slidev-theme-primary, #4f8ef7) 12%, transparent);
}
.quiz-option:disabled {
  cursor: default;
}
.quiz-letter {
  flex-shrink: 0;
  width: 1.5em;
  height: 1.5em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--slidev-theme-primary, #4f8ef7);
  color: #fff;
  font-size: 0.75em;
  font-weight: 700;
}
.quiz-option.is-correct {
  border-color: #22c55e;
  background: rgba(34, 197, 94, 0.15);
  opacity: 1;
}
.quiz-option.is-correct .quiz-letter {
  background: #22c55e;
}
.quiz-option.is-wrong {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.15);
  opacity: 1;
}
.quiz-option.is-wrong .quiz-letter {
  background: #ef4444;
}
.quiz-option.is-dimmed {
  opacity: 0.5;
}
.quiz-feedback {
  margin-top: 0.6rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85em;
}
.quiz-retry {
  background: none;
  border: none;
  padding: 0;
  color: var(--slidev-theme-primary, #4f8ef7);
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.85em;
}
</style>
