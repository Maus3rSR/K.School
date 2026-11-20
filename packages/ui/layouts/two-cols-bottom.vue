<template>
  <div class="slidev-layout two-cols-bottom">
    <div class="tcb-header"><slot /></div>
    <div class="tcb-left"><slot name="left" /></div>
    <div class="tcb-right"><slot name="right" /></div>
    <div class="tcb-bottom"><slot name="bottom" /></div>
  </div>
</template>

<style scoped>
.two-cols-bottom {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto minmax(0, 1fr) auto;
  grid-template-areas:
    'header header'
    'left right'
    'bottom bottom';
}
.tcb-header { grid-area: header; }
.tcb-left { grid-area: left; min-width: 0; min-height: 0; }
.tcb-right { grid-area: right; min-width: 0; min-height: 0; }
.tcb-right :deep(p) { margin-block: 0.3em; line-height: 1.3; }
.tcb-bottom {
  grid-area: bottom;
  margin-top: 0.3rem;
  padding-top: 0.4rem;
  border-top: 1px solid rgba(148, 163, 184, 0.35);
}
.tcb-bottom:empty { display: none; }
.tcb-bottom:has(> .slidev-vclick-hidden):not(:has(> :not(.slidev-vclick-hidden))) { display: none; }
</style>
