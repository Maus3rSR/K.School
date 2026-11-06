<script setup>
import { computed } from 'vue'
import { COMMAND_ROLES, ROLE_LABELS, tokenizeCommand } from '../utils/tokenizeCommand.js'
import { PHP_ROLES, PHP_ROLE_LABELS, tokenizePhp } from '../utils/tokenizePhp.js'

const props = defineProps({
  title: {
    type: String,
    default: 'bash'
  },
  prompt: {
    type: String,
    default: '$'
  },
  lines: {
    type: Array,
    required: true
  },
  clicks: {
    type: Boolean,
    default: false
  },
  highlight: {
    type: Boolean,
    default: true
  },
  legend: {
    type: Boolean,
    default: false
  },
  codePrompt: {
    type: String,
    default: '>>>'
  }
})

const LEGEND_ORDER = [
  ...COMMAND_ROLES,
  ...PHP_ROLES.filter((role) => !COMMAND_ROLES.includes(role)),
]
const LEGEND_LABELS = { ...ROLE_LABELS, ...PHP_ROLE_LABELS }

const tokenizedLines = computed(() =>
  props.lines.map((line) =>
    line.cmd ? (line.lang === 'php' ? tokenizePhp(line.cmd) : tokenizeCommand(line.cmd)) : null
  )
)

const linePrompt = (line) => (line.lang ? props.codePrompt : props.prompt)

const legendRoles = computed(() => {
  if (!props.legend) return []
  const present = new Set()
  for (const parts of tokenizedLines.value) {
    if (!parts) continue
    for (const part of parts) {
      if (part.role) present.add(part.role)
    }
  }
  return LEGEND_ORDER.filter((role) => present.has(role))
})
</script>

<template>
  <div class="terminal">
    <div class="terminal-bar">
      <span class="dot dot-red"></span>
      <span class="dot dot-yellow"></span>
      <span class="dot dot-green"></span>
      <span class="terminal-title">{{ title }}</span>
    </div>
    <div class="terminal-body">
      <template v-for="(line, i) in lines" :key="i">
        <div v-if="clicks" v-click class="terminal-line">
          <div v-if="line.cmd" class="term-cmd" :class="{ 'term-cmd--roles': highlight }">
            <span class="term-prompt">{{ linePrompt(line) }}</span>
            <template v-if="highlight"><span v-for="(part, j) in tokenizedLines[i]" :key="j" :class="part.role ? `tok-${part.role}` : null">{{ part.text }}</span></template>
            <template v-else> {{ line.cmd }}</template>
          </div>
          <div v-if="line.out" class="term-out">{{ line.out }}</div>
        </div>
        <div v-else class="terminal-line">
          <div v-if="line.cmd" class="term-cmd" :class="{ 'term-cmd--roles': highlight }">
            <span class="term-prompt">{{ linePrompt(line) }}</span>
            <template v-if="highlight"><span v-for="(part, j) in tokenizedLines[i]" :key="j" :class="part.role ? `tok-${part.role}` : null">{{ part.text }}</span></template>
            <template v-else> {{ line.cmd }}</template>
          </div>
          <div v-if="line.out" class="term-out">{{ line.out }}</div>
        </div>
      </template>
    </div>
    <div v-if="legendRoles.length" class="terminal-legend">
      <span v-for="role in legendRoles" :key="role" class="legend-pill" :class="`tok-${role}`">
        <span class="legend-dot"></span>{{ ROLE_LABELS[role] }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.terminal {
  border-radius: 10px;
  overflow: hidden;
  background: #0f172a;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}
.terminal-bar {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 0.8rem;
  background: rgba(255, 255, 255, 0.06);
}
.dot {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
}
.dot-red {
  background: #ff5f57;
}
.dot-yellow {
  background: #febc2e;
}
.dot-green {
  background: #28c840;
}
.terminal-title {
  margin-left: 0.5rem;
  font-size: 0.7em;
  color: #94a3b8;
  font-family: ui-monospace, monospace;
}
.terminal-body {
  padding: 0.8rem 1rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.78em;
  line-height: 1.55;
  color: #e2e8f0;
  user-select: text;
  cursor: text;
}
.term-cmd {
  color: #4ade80;
  user-select: text;
  cursor: text;
}
.term-prompt {
  color: #94a3b8;
  font-weight: 700;
  user-select: none;
}
.term-cmd .term-prompt {
  margin-right: 0.5em;
}
.term-out {
  color: #94a3b8;
  white-space: pre-wrap;
  user-select: text;
  cursor: text;
}
.tok-program {
  color: #00b5ff;
  font-weight: 700;
}
.tok-subcommand {
  color: #ffbe00;
}
.tok-action {
  color: #00a96e;
}
.tok-flag {
  color: #a855f7;
}
.tok-argument {
  color: #e2e8f0;
}
.term-cmd--roles {
  color: #e2e8f0;
}
.tok-separator {
  color: #ff5861;
  font-weight: 700;
}
.tok-class {
  color: #00b5ff;
  font-weight: 700;
}
.tok-scope {
  color: #ff5861;
  font-weight: 700;
}
.tok-arrow {
  color: #ffbe00;
}
.tok-method {
  color: #00a96e;
}
.tok-variable {
  color: #a855f7;
}
.tok-string {
  color: #fde68a;
}
.tok-number {
  color: #00b5ff;
}
.tok-operator {
  color: #94a3b8;
}
.tok-colon {
  color: #ff5861;
}
.tok-punct {
  color: #94a3b8;
}
.terminal-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 0.9rem;
  padding: 0.5rem 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.68em;
}
.legend-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}
.legend-dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: currentColor;
}
</style>
