<script setup>
defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  }
})
</script>

<template>
  <kbd 
    class="bg-gray-800 text-white rounded font-mono"
    :class="{
      'px-2 py-0.5 text-sm': size === 'sm',
      'px-3 py-1 text-base': size === 'md',
      'px-4 py-2 text-2xl rounded-lg': size === 'lg',
      'px-6 py-3 text-3xl rounded-lg': size === 'xl'
    }"
  ><slot /></kbd>
</template>
