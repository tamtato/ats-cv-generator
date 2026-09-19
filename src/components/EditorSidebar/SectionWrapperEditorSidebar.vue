<script setup lang="ts">
defineProps<{
  header: string;
}>();
</script>
<template>
  <div class="border-b pb-6 flex flex-col gap-3">
    <h3 class="text-sm font-bold text-gray-700 uppercase tracking-wider">{{ header }}</h3>
    <slot />
  </div>
</template>
