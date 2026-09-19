<script setup lang="ts">
import type {CvSkillType} from "../../../types/cv.ts";

defineProps<{
  skills: CvSkillType[];
}>();
</script>

<template>
  <section v-if="skills && skills.length > 0" class="mt-3">
    <ul class="space-y-1 text-[11px]">
      <li v-for="(skillGroup, index) in skills" :key="index" class="relative break-inside-auto">
        <span class="font-bold pr-1">{{ skillGroup.category }}:</span> {{ skillGroup.items }}
      </li>
    </ul>
  </section>
</template>