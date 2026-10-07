<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  },
  direction: {
    type: String,
    default: 'horizontal',
    validator: (value) => ['horizontal', 'vertical'].includes(value)
  },
  clicks: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="steps" :class="`steps-${direction}`">
    <template v-for="(item, i) in items" :key="i">
      <div v-if="clicks" v-click class="step">
        <div class="step-marker">
          <span v-if="item.icon" class="step-icon">{{ item.icon }}</span>
          <span v-else>{{ i + 1 }}</span>
        </div>
        <div class="step-body">
          <div class="step-title">{{ item.title }}</div>
          <div v-if="item.desc" class="step-desc">{{ item.desc }}</div>
        </div>
      </div>
      <div v-else class="step">
        <div class="step-marker">
          <span v-if="item.icon" class="step-icon">{{ item.icon }}</span>
          <span v-else>{{ i + 1 }}</span>
        </div>
        <div class="step-body">
          <div class="step-title">{{ item.title }}</div>
          <div v-if="item.desc" class="step-desc">{{ item.desc }}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.steps {
  display: flex;
}
.steps-horizontal {
  flex-direction: row;
  align-items: flex-start;
}
.steps-vertical {
  flex-direction: column;
}
.step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  position: relative;
}
.steps-horizontal .step {
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
}
.steps-vertical .step {
  padding-bottom: 1.25rem;
}
.steps-vertical .step:last-child {
  padding-bottom: 0;
}
/* connecting line */
.steps-horizontal .step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 1.1rem;
  left: calc(50% + 1.4rem);
  right: calc(-50% + 1.4rem);
  height: 2px;
  background: color-mix(in srgb, var(--slidev-theme-primary, #4f8ef7) 40%, transparent);
}
.steps-vertical .step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 2.4rem;
  bottom: 0.15rem;
  left: 1.1rem;
  width: 2px;
  background: color-mix(in srgb, var(--slidev-theme-primary, #4f8ef7) 40%, transparent);
}
.step-marker {
  flex-shrink: 0;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--slidev-theme-primary, #4f8ef7);
  color: #fff;
  font-weight: 700;
  font-size: 0.9em;
  z-index: 1;
}
.step-icon {
  font-size: 1em;
}
.step-body {
  padding-top: 0.15rem;
}
.steps-horizontal .step-body {
  margin-top: 0.5rem;
  padding-top: 0;
}
.step-title {
  font-weight: 700;
  font-size: 0.9em;
  line-height: 1.25;
}
.step-desc {
  font-size: 0.75em;
  opacity: 0.7;
  line-height: 1.3;
  margin-top: 0.15rem;
}
</style>
