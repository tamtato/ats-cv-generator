<script setup lang="ts">
import type {CvEducationType} from "../../../types/cv.ts";

defineProps<{
  education: CvEducationType[];
  selectedColor: string;
}>();
</script>

<template>
  <section class="mb-6">
    <h3 class="text-[15px] font-bold uppercase mb-3 border-b border-gray-200" :style="{ color: selectedColor}">
      Education
    </h3>
    <div v-for="edu in education" :key="edu.id" class="mb-5 job-block text-[12px]">
    <div class="flex justify-between items-baseline mb-1">
      <h4 class="font-bold text-[13px]">{{ edu.title }}</h4>
    </div>
    <div class="font-bold mb-2 ml-2">{{ edu.school }}: <span class="font-normal">
            {{ edu.startDate }} - {{ edu.endDate }}
          </span></div>
      <p>{{ edu.description }}</p>
  </div>
  </section>
</template>