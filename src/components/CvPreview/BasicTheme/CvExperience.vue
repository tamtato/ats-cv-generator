<script setup lang="ts">
import type {CvExperienceType} from "../../../types/cv.ts";

defineProps<{
  experience: CvExperienceType[];
  selectedColor: string;
}>();
</script>

<template>
  <section class="mb-6">
    <h3 class="text-lg font-bold uppercase mb-3 border-b border-gray-200" :style="{ color: selectedColor}">
      Experience
    </h3>
    <div v-for="job in experience" :key="job.id" class="mb-5 job-block">
        <div class="flex justify-between items-baseline mb-1">
          <h4 class="font-bold text-base">{{ job.title }}</h4>
          <span class="text-gray-600 font-medium">
            {{ job.startDate }} <span v-if="job.startDate && job.endDate">-</span> {{ job.endDate }}
          </span>
        </div>
        <div class="font-semibold mb-2">{{ job.company }}</div>
      <ul class="list-disc list-outside ml-4 space-y-1">
        <li v-for="(bullet, index) in job.bullets" :key="index" class="relative break-inside-auto">
          {{ bullet }}
        </li>
      </ul>
    </div>
  </section>
</template>