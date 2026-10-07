<script setup>
defineProps({
  pros: {
    type: Array,
    required: true
  },
  cons: {
    type: Array,
    required: true
  },
  prosTitle: {
    type: String,
    default: 'Avantages'
  },
  consTitle: {
    type: String,
    default: 'Inconvénients'
  }
})
</script>

<template>
  <div class="proscons">
    <div class="pc-card pc-pros">
      <div class="pc-title">{{ prosTitle }}</div>
      <ul class="pc-list">
        <li v-for="(item, i) in pros" :key="i"><span class="pc-mark">✓</span>{{ item }}</li>
      </ul>
    </div>
    <div class="pc-card pc-cons">
      <div class="pc-title">{{ consTitle }}</div>
      <ul class="pc-list">
        <li v-for="(item, i) in cons" :key="i"><span class="pc-mark">✗</span>{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.proscons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.pc-card {
  border-radius: 10px;
  padding: 0.9rem 1rem;
}
.pc-pros {
  background: rgba(0, 169, 110, 0.08);
  border: 1px solid rgba(0, 169, 110, 0.35);
}
.pc-cons {
  background: rgba(255, 88, 97, 0.08);
  border: 1px solid rgba(255, 88, 97, 0.35);
}
.pc-pros .pc-title {
  color: #00a96e;
}
.pc-cons .pc-title {
  color: #ff5861;
}
.pc-title {
  font-weight: 700;
  font-size: 0.95em;
  margin-bottom: 0.5rem;
}
.pc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.pc-list li {
  display: flex;
  gap: 0.5rem;
  font-size: 0.82em;
  line-height: 1.4;
  padding: 0.15rem 0;
}
.pc-mark {
  flex-shrink: 0;
  font-weight: 700;
}
.pc-pros .pc-mark {
  color: #00a96e;
}
.pc-cons .pc-mark {
  color: #ff5861;
}
</style>
