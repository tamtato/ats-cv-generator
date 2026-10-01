<script setup lang="ts">
import {computed} from 'vue';
import {useCvStore} from "../../../../stores/cvStore.ts";
import CvSummary from "./sections/CvSummary.vue";
import CvHeader from "./sections/CvHeader.vue";
import CvEducation from "./sections/CvEducation.vue";
import CvExperience from "./sections/CvExperience.vue";
import CvSkills from "./sections/CvSkills.vue";
import CvCertificates from "./sections/CvCertificates.vue";

const cvStore = useCvStore();

const activeThemeStyles = computed(() => {
  return {
    '--color-selected-color': cvStore.cvData.theme.selectedColor,
    '--font-selected-header-font': cvStore.cvData.theme.selectedHeaderFont,
    '--font-selected-body-font': cvStore.cvData.theme.selectedBodyFont,
  };
});

const sectionComponents: Record<string, any> = {
  education: CvEducation,
  experience: CvExperience,
  skills: CvSkills,
  certificates: CvCertificates,
};
</script>

<template>
  <div :style="activeThemeStyles" class="cv-theme-root relative flex flex-col gap-6 text-gray-900">
    <CvHeader/>
    <CvSummary/>
    <component
        v-for="sectionId in cvStore.cvData.sectionOrder"
        :key="sectionId"
        :is="sectionComponents[sectionId]"
    />
  </div>
</template>

<style scoped>
.cv-theme-root {
  font-family: var(--font-selected-body-font), sans-serif;
}

.cv-theme-root :deep(h1),
.cv-theme-root :deep(h2),
.cv-theme-root :deep(h3) {
  font-family: var(--font-selected-header-font), sans-serif;
}
</style>