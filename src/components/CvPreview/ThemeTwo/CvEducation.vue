<script setup lang="ts">
import type {CvEducationType} from "../../../types/cv.ts";

defineProps<{
  education: CvEducationType[];
}>();
</script>

<template>
  <section>
    <div v-for="e in education" :key="e.id" class="mt-3 job-block">
      <h5 class="font-bold text-[12px]">{{ e.title }}</h5>
        <div class="mb-2 text-[11px] flex gap-1 font-medium">
          <h6>{{ e.school }}:</h6>
          <h6 class="text-gray-600">{{ e.startDate || 'yymmdd' }} - {{ e.endDate || 'yymmdd' }}</h6>
        </div>
        <p class="text-[11px]">{{e.description}}</p>
    </div>
  </section>
</template>