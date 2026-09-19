<script setup lang="ts">
defineProps<{
  header: string;
  selectedColor: string;
}>();
</script>
<template>
  <div>
    <h3 class="uppercase font-bold tracking-widest text-[14px] bg-gray-100 w-full" :style="{ color: selectedColor}">
      <span class="bg-white h-full block w-fit pr-2">{{ header }}</span>
    </h3>
    <slot />
  </div>
</template>