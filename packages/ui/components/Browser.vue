<script setup>
defineProps({
  url: {
    type: String,
    default: 'localhost:5173'
  },
  title: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="browser">
    <div class="browser-bar">
      <span class="dot dot-red"></span>
      <span class="dot dot-yellow"></span>
      <span class="dot dot-green"></span>
      <span class="browser-url">🔒 {{ url }}</span>
      <span v-if="title" class="browser-title">{{ title }}</span>
    </div>
    <div class="browser-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.browser {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(148, 163, 184, 0.3);
}
.browser-bar {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 0.8rem;
  background: rgba(148, 163, 184, 0.15);
}
.dot {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  flex-shrink: 0;
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
.browser-url {
  flex: 1;
  margin-left: 0.5rem;
  font-size: 0.7em;
  padding: 0.25em 0.8em;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.2);
  color: inherit;
  opacity: 0.85;
  font-family: ui-monospace, monospace;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.browser-title {
  font-size: 0.7em;
  opacity: 0.6;
}
.browser-body {
  overflow: hidden;
  background: rgba(148, 163, 184, 0.05);
}
.browser-body :deep(img) {
  display: block;
  width: 100%;
}
</style>
