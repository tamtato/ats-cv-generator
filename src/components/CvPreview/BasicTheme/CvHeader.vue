<script setup lang="ts">
import type {CvHeaderType} from "../../../types/cv.ts";

defineProps<{
  header: CvHeaderType;
  selectedColor: string;
}>();

</script>

<template>
  <header class="mb-6 border-b-2 pb-4" :style="{ borderColor: selectedColor }">
    <h1 class="text-2xl font-bold uppercase tracking-wide" :style="{ color: selectedColor }">
      {{ header.name }}
    </h1>
    <h2 class="text-xl font-semibold mb-2 text-gray-700">
      {{ header.title }}
    </h2>
    <div class="flex gap-2 flex-wrap text-gray-600 text-[10px]">
      <span v-if="header.location">{{ header.location }}</span>
      <span v-if="header.phone">{{ header.phone }}</span>
      <span v-if="header.email">{{ header.email }}</span>
      <a v-if="header.github" :href="'https://' + header.github" target="_blank" class="underline-offset-2 underline">
        {{ header.github }}
      </a>
      <a v-if="header.linkedin" :href="'https://' + header.linkedin" target="_blank" class="underline-offset-2 underline">
        {{ header.linkedin }}
      </a>
    </div>
  </header>
</template>