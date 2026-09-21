<script setup lang="ts">
defineProps<{
  href?: string;
}>();
</script>

<template>
  <component
      :is="href ? 'a' : 'button'"
      :href="href"
      :target="href ? '_blank' : ''"
      class="flex items-center gap-2 text-sm text-gray-800 hover:text-indigo-600 transition-colors cursor-pointer tracking-widest"
  >
    <slot name="icon" />
    <slot />
  </component>
</template>