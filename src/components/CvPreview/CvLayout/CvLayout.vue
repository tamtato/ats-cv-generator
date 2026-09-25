
<script setup lang="ts">
import { computed } from 'vue';
import { useCvStore } from "../../../stores/cvStore.ts";
import CvSummary from "./sections/CvSummary.vue";
import CvHeader from "./sections/CvHeader.vue";
import CvEducation from "./sections/CvEducation.vue";
import CvExperience from "./sections/CvExperience.vue";
import CvSkills from "./sections/CvSkills.vue";
/*import CvCertificates from "./sections/CvCertificates.vue";*/

const cvStore = useCvStore();

const activeThemeStyles = computed(() => {
  return {
    '--color-selected-color': cvStore.cvData.selectedColor,
    'fontFamily': cvStore.cvData.selectedFont
  };
});

const sectionComponents: Record<string, any> = {
  education: CvEducation,
  experience: CvExperience,
  skills: CvSkills,
/*
  certificates: CvCertificates,
*/
};
</script>

<template>
  <div :style="activeThemeStyles" class="relative flex flex-col gap-6 text-gray-900">
    <CvHeader />
    <CvSummary />
    <component
        v-for="sectionId in cvStore.cvData.sectionOrder"
        :key="sectionId"
        :is="sectionComponents[sectionId]"
    />
  </div>
</template>