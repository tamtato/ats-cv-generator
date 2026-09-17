<script setup lang="ts">
import type {CvHeaderType} from "../../../types/cv.ts";

const props = defineProps<{
  header: CvHeaderType;
  selectedColor: string;
}>();

const {name, title, location, phone, email, github, linkedin} = props.header;
</script>

<template>
  <header class="mb-6 border-b-2 pb-4" :style="{ borderColor: selectedColor }">
    <h1 class="text-3xl font-bold uppercase tracking-wide" :style="{ color: selectedColor }">
      {{ name }}
    </h1>
    <h2 class="text-xl font-semibold mb-2 text-gray-700">
      {{ title }}
    </h2>
    <div class="flex gap-4 flex-wrap text-gray-600">
      <span v-if="location">{{ location }}</span>
      <span v-if="phone">{{ phone }}</span>
      <span v-if="email">{{ email }}</span>
      <a v-if="github" :href="'https://' + github" target="_blank" class="hover:underline">
        {{ github }}
      </a>
      <a v-if="linkedin" :href="'https://' + linkedin" target="_blank" class="hover:underline">
        {{ linkedin }}
      </a>
    </div>
  </header>
</template>