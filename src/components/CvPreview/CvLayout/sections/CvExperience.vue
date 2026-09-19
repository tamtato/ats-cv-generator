<script setup lang="ts">
import type {CvExperienceType} from "../../../../types/cv.ts";

defineProps<{
  experience: CvExperienceType[];
}>();
</script>

<template>
  <section>
    <div v-for="job in experience" :key="job.id" class="mt-3 job-block ">
      <h5 class="font-bold text-[12px]">{{ job.title }}</h5>
        <div class="mb-2 text-[11px] flex gap-1 font-medium">
          <h6>{{ job.company }}:</h6>
          <h6 class="text-gray-600">{{ job.startDate || 'yymmdd' }} - {{ job.endDate || 'yymmdd' }}</h6>
        </div>
        <ul class="space-y-1 pl-2 text-[11px]">
          <li v-for="(bullet, index) in job.bullets" :key="index" class="relative break-inside-auto">
            <span class="text-[12px] font-bold">-</span> {{ bullet }}
          </li>
        </ul>
    </div>
  </section>
</template>