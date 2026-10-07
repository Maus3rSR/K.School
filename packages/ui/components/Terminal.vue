<script setup>
defineProps({
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
  }
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
          <div v-if="line.cmd" class="term-cmd">
            <span class="term-prompt">{{ prompt }}</span> {{ line.cmd }}
          </div>
          <div v-if="line.out" class="term-out">{{ line.out }}</div>
        </div>
        <div v-else class="terminal-line">
          <div v-if="line.cmd" class="term-cmd">
            <span class="term-prompt">{{ prompt }}</span> {{ line.cmd }}
          </div>
          <div v-if="line.out" class="term-out">{{ line.out }}</div>
        </div>
      </template>
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
}
.term-cmd {
  color: #4ade80;
}
.term-prompt {
  color: #94a3b8;
  font-weight: 700;
}
.term-out {
  color: #94a3b8;
  white-space: pre-wrap;
}
</style>
