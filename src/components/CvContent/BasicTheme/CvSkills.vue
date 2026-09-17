<script setup lang="ts">
import type {CvSkillType} from "../../../types/cv.ts";

defineProps<{
  skills: CvSkillType[];
  selectedColor: string;
}>();
</script>

<template>
  <section v-if="skills && skills.length > 0" class="skills-block">
    <h3 class="text-lg mb-3 font-bold uppercase border-b border-gray-200" :style="{ color: selectedColor}">
      Technical Skills
    </h3>
    <div class="">
      <div v-for="(skillGroup, index) in skills" :key="index">
        <span class="font-bold">{{ skillGroup.category }}:</span> {{ skillGroup.items }}
      </div>
    </div>
  </section>
</template>