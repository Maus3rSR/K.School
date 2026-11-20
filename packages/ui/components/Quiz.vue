<script setup>
import { ref } from 'vue'

function parseCode(text) {
  return String(text)
    .split('`')
    .map((part, i) => ({ text: part, code: i % 2 === 1 }))
}

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
    <p class="quiz-question">
      <template v-for="(seg, i) in parseCode(question)" :key="i">
        <code v-if="seg.code">{{ seg.text }}</code>
        <template v-else>{{ seg.text }}</template>
      </template>
    </p>
    <div v-if="$slots.default" class="quiz-code">
      <slot />
    </div>
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
        <span class="quiz-text">
          <template v-for="(seg, j) in parseCode(option)" :key="j">
            <code v-if="seg.code">{{ seg.text }}</code>
            <template v-else>{{ seg.text }}</template>
          </template>
        </span>
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
  margin: 0.5rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  min-height: 340px;
}
.quiz-question {
  font-weight: 700;
  font-size: 1.35em;
  line-height: 1.4;
  margin: 0;
}
.quiz-code {
  margin: 0;
}
.quiz-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: minmax(0, 1fr);
  gap: 0.75rem;
  min-height: 0;
  align-content: stretch;
}
.quiz-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: left;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  border: 2px solid rgba(79, 142, 247, 0.35);
  border-color: color-mix(in srgb, var(--slidev-theme-primary, #4f8ef7) 35%, transparent);
  background: rgba(127, 127, 127, 0.06);
  color: inherit;
  font-size: 0.95em;
  line-height: 1.3;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease, opacity 0.15s ease, transform 0.15s ease;
}
.quiz-option:not(:disabled):hover {
  border-color: var(--slidev-theme-primary, #4f8ef7);
  background: rgba(79, 142, 247, 0.12);
  background: color-mix(in srgb, var(--slidev-theme-primary, #4f8ef7) 12%, transparent);
  transform: translateY(-2px);
}
.quiz-option:disabled {
  cursor: default;
}
.quiz-letter {
  flex-shrink: 0;
  width: 2em;
  height: 2em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--slidev-theme-primary, #4f8ef7);
  color: #fff;
  font-size: 0.9em;
  font-weight: 700;
}
.quiz-option.is-correct {
  border-color: #22c55e;
  background: rgba(34, 197, 94, 0.25);
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.35);
  opacity: 1;
}
.quiz-option.is-correct .quiz-letter {
  background: #22c55e;
}
.quiz-option.is-wrong {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.22);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.3);
  opacity: 1;
}
.quiz-option.is-wrong .quiz-letter {
  background: #ef4444;
}
.quiz-option.is-dimmed {
  opacity: 0.4;
}
.quiz-feedback {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.05em;
  font-weight: 600;
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
