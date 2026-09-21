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
      class="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors cursor-pointer"
  >
    <slot name="icon" />
    <slot />
  </component>
</template>