<script setup lang="ts">
import CvSectionWrapper from "../common/CvSectionWrapper.vue";

defineProps<{
  summary: string;
}>();
</script>

<template>
  <section>
    <p class="text-[11px]">{{ summary }}</p>
  </section>
</template>