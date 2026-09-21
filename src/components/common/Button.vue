<script setup lang="ts">
defineProps<{
  href?: string;
}>();
</script>

<template>
  <component
      :is="href ? 'a' : 'button'"
      :href="href"
      class="flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
  >
    <slot name="icon" />
    <slot />
  </component>
</template>