<script setup>
defineOptions({ name: 'FileTree' })

defineProps({
  tree: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <ul class="file-tree">
    <li v-for="(node, i) in tree" :key="i" class="file-node" :class="{ 'is-highlight': node.highlight }">
      <span class="node-row">
        <span class="node-icon">{{ node.children ? '📁' : '📄' }}</span>
        <span class="node-name">{{ node.name }}</span>
        <span v-if="node.comment" class="node-comment">{{ node.comment }}</span>
      </span>
      <FileTree v-if="node.children" :tree="node.children" class="file-children" />
    </li>
  </ul>
</template>

<style scoped>
.file-tree {
  list-style: none;
  margin: 0;
  padding: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  line-height: 1.6;
}

.file-tree:not(.file-children) {
  font-size: 0.8em;
}

.file-children {
  padding-left: 1em;
  font-size: 1em;
}

.file-node {
  white-space: nowrap;
}

.node-row {
  display: flex;
  align-items: baseline;
}

.node-icon {
  margin-right: 0.35em;
}

.node-comment {
  margin-left: auto;
  padding-left: 1em;
  font-size: 0.8em;
  font-style: italic;
  opacity: 0.55;
}

.is-highlight>.node-row>.node-name {
  color: var(--slidev-theme-primary, #4f8ef7);
  font-weight: 700;
}
</style>
