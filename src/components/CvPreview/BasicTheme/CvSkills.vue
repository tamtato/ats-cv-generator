<script setup lang="ts">
import type {CvSkillType} from "../../../types/cv.ts";

defineProps<{
  skills: CvSkillType[];
  selectedColor: string;
}>();
</script>

<template>
  <section v-if="skills && skills.length > 0">
    <h3 class="text-lg mb-3 font-bold uppercase border-b border-gray-200" :style="{ color: selectedColor}">
      Technical Skills
    </h3>
    <ul class="space-y-1">
      <li v-for="(skillGroup, index) in skills" :key="index" class="relative break-inside-auto max-[print]:[orphans:1] max-[print]:[widows:1]">
        <span class="font-bold">{{ skillGroup.category }}:</span> {{ skillGroup.items }}
      </li>
    </ul>
  </section>
</template>