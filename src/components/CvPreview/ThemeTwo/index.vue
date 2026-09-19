<script setup lang="ts">

import {useCvStore} from "../../../stores/cvStore.ts";
import CvHeader from "./CvHeader.vue";
import CvSummary from "./CvSummary.vue";
import CvExperience from "./CvExperience.vue";
import CvSkills from "./CvSkills.vue";
import SectionWrapperThemeTwo from "./SectionWrapperThemeTwo.vue";
import CvEducation from "./CvEducation.vue";

const cvStore = useCvStore();
</script>

<template>
  <div class="text-gray-900 flex flex-col gap-6" :style="{ fontFamily: cvStore.cvData.selectedFont }">
    <CvHeader :header="cvStore.cvData.header" :selected-color="cvStore.cvData.selectedColor"/>

    <CvSummary v-if="cvStore.cvData.summary" :summary="cvStore.cvData.summary" />
    <SectionWrapperThemeTwo v-if="cvStore.cvData.education && cvStore.cvData.education.length > 0" header="Education" :selected-color="cvStore.cvData.selectedColor">
      <CvEducation :education="cvStore.cvData.education" />
    </SectionWrapperThemeTwo>
    <SectionWrapperThemeTwo v-if="cvStore.cvData.experience && cvStore.cvData.experience.length > 0" header="Experience" :selected-color="cvStore.cvData.selectedColor">
      <CvExperience :experience="cvStore.cvData.experience" />
    </SectionWrapperThemeTwo>

    <SectionWrapperThemeTwo v-if="cvStore.cvData.skills && cvStore.cvData.skills.length > 0" header="Skills" :selected-color="cvStore.cvData.selectedColor">
      <CvSkills :skills="cvStore.cvData.skills" />
    </SectionWrapperThemeTwo>
  </div>

</template>