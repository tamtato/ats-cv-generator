<script setup lang="ts">
import {computed} from 'vue';
import {useCvStore} from "../../../stores/cvStore.ts";
import CvSummary from "./sections/CvSummary.vue";
import CvEducation from "./sections/CvEducation.vue";
import CvExperience from "./sections/CvExperience.vue";
import CvSkills from "./sections/CvSkills.vue";
import CvHeader from "./sections/CvHeader.vue";

const cvStore = useCvStore();

const activeThemeStyles = computed(() => {
  return {
    '--color-selected-color': cvStore.cvData.selectedColor,
    'fontFamily': cvStore.cvData.selectedFont
  };
});

</script>

<template>
  <div :style="activeThemeStyles" class="flex flex-col gap-6">
    <CvHeader />
    <CvSummary />
    <CvEducation />
    <CvExperience  />
    <CvSkills  />
  </div>
</template>