<script setup lang="ts">

import {useCvStore} from "../../../stores/cvStore.ts";
import CvHeader from "./CvHeader.vue";
import CvSummary from "./CvSummary.vue";
import CvExperience from "./CvExperience.vue";
import CvSkills from "./CvSkills.vue";

const cvStore = useCvStore();
</script>

<template>
  <div class="text-gray-900 text-sm" :style="{ fontFamily: cvStore.cvData.selectedFont }">
    <CvHeader :header="cvStore.cvData.header" :selected-color="cvStore.cvData.selectedColor"/>
    <CvSummary :summary="cvStore.cvData.summary" />
    <CvExperience :experience="cvStore.cvData.experience" :selected-color="cvStore.cvData.selectedColor" />
    <CvSkills :skills="cvStore.cvData.skills" :selected-color="cvStore.cvData.selectedColor" />
  </div>
</template>