<script setup lang="ts">
defineProps<{
  summary: string;
}>();
</script>

<template>
  <section class="mb-4">
    <p>{{ summary }}</p>
  </section>
</template>