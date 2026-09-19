<script setup lang="ts">

import {useCvStore} from "../../../stores/cvStore.ts";
import CvHeader from "./CvHeader.vue";
import CvSummary from "./CvSummary.vue";
import CvExperience from "./CvExperience.vue";
import CvSkills from "./CvSkills.vue";
import CvEducation from "./CvEducation.vue";

const cvStore = useCvStore();
</script>

<template>
  <div class="text-gray-900 text-sm" :style="{ fontFamily: cvStore.cvData.selectedFont }">
    <CvHeader :header="cvStore.cvData.header" :selected-color="cvStore.cvData.selectedColor"/>
    <CvSummary v-if="cvStore.cvData.summary.length > 0" :summary="cvStore.cvData.summary" />
    <CvExperience v-if="cvStore.cvData.experience.length > 0" :experience="cvStore.cvData.experience" :selected-color="cvStore.cvData.selectedColor" />
    <CvEducation v-if="cvStore.cvData.education.length > 0" :education="cvStore.cvData.education" :selected-color="cvStore.cvData.selectedColor" />
    <CvSkills v-if="cvStore.cvData.skills.length > 0" :skills="cvStore.cvData.skills" :selected-color="cvStore.cvData.selectedColor" />
  </div>
</template>