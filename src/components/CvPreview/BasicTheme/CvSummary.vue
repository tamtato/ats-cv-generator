<script setup lang="ts">
defineProps<{
  summary: string;
}>();
</script>

<template>
  <section class="mb-4 text-[12px]">
    <p>{{ summary }}</p>
  </section>
</template>