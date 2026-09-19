<script setup lang="ts">
import type {CvExperienceType} from "../../../types/cv.ts";

defineProps<{
  experience: CvExperienceType[];
  selectedColor: string;
}>();
</script>

<template>
  <section class="mb-6">
    <h3 class="text-[15px] font-bold uppercase mb-3 border-b border-gray-200" :style="{ color: selectedColor}">
      Experience
    </h3>
    <div v-for="job in experience" :key="job.id" class="mb-5 job-block text-[12px]">
      <h4 class="font-bold text-[13px] mb-1">{{ job.title }}</h4>
      <div class="font-bold mb-2 ml-2">{{ job.company }}: <span class="font-normal">
          {{ job.startDate }} - {{ job.endDate }}
      </span></div>
      <ul class="ml-2 space-y-1">
        <li v-for="(bullet, index) in job.bullets" :key="index" class="relative break-inside-auto">
          <span class="text-[12px] font-bold">-</span> {{ bullet }}
        </li>
      </ul>
    </div>
  </section>
</template>