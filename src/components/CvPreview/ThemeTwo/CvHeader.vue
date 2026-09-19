<script setup lang="ts">
import type {CvHeaderType} from "../../../types/cv.ts";

defineProps<{
  header: CvHeaderType;
  selectedColor: string;
}>();

</script>

<template>
  <header>
    <h1 class="text-3xl font-bold uppercase tracking-wider" :style="{ color: selectedColor }">
      {{ header.name }}
    </h1>
    <h2 class="text-xl font-semibold mb-2 text-gray-700 tracking-wider mt-1">
      {{ header.title }}
    </h2>
    <div class="text-[10px] text-gray-600 bg-gray-100 p-2 flex flex-wrap mt-3 gap-1">
        <p v-if="header.location" class="mr-2">{{ header.location }}</p>
        <p v-if="header.phone" class="mr-2">{{ header.phone }}</p>
        <p v-if="header.email" class="mr-2">{{ header.email }}</p>
        <a v-if="header.github" :href="'https://' + header.github" target="_blank" class="text-blue-900 font-medium mr-2">
          {{ header.github }}
        </a>
        <a v-if="header.linkedin" :href="'https://' + header.linkedin" target="_blank" class="text-blue-900 font-medium mr-2">
          {{ header.linkedin }}
        </a>
    </div>
  </header>
</template>