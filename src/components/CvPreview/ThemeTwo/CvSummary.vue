<script setup lang="ts">
import SectionWrapperThemeTwo from "./SectionWrapperThemeTwo.vue";

defineProps<{
  summary: string;
}>();
</script>

<template>
  <section>
    <p class="text-[11px]">{{ summary }}</p>
  </section>
</template>