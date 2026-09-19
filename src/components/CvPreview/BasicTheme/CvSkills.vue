<script setup lang="ts">
import type {CvSkillType} from "../../../types/cv.ts";

defineProps<{
  skills: CvSkillType[];
  selectedColor: string;
}>();
</script>

<template>
  <section>
    <h3 class="text-[15px] mb-3 font-bold uppercase border-b border-gray-200" :style="{ color: selectedColor}">
      Technical Skills
    </h3>
    <ul class="space-y-1 text-[12px]">
      <li v-for="(skillGroup, index) in skills" :key="index" class="relative break-inside-auto">
        <span class="font-bold">{{ skillGroup.category }}:</span> {{ skillGroup.items }}
      </li>
    </ul>
  </section>
</template>