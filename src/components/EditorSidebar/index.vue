<script setup lang="ts">

import DownloadPdfButton from "./DownloadPdfButton.vue";
import CvSelectFontAndColor from "./CvSelectFontAndColor.vue";
import CvHeaderEditor from "./CvHeaderEditor.vue";
import CvSummaryEditor from "./CvSummaryEditor.vue";
import CvExperienceEditor from "./CvExperienceEditor.vue";
import SectionWrapperEditorSidebar from "./SectionWrapperEditorSidebar.vue";
import CvSelectTheme from "./CvSelectTheme.vue";
import CvSkillsEditor from "./CvSkillsEditor.vue";
import CvEducationEditor from "./CvEducationEditor.vue";

</script>

<template>
  <div class="flex flex-col gap-6">

    <div class="flex flex-wrap gap-2 border-b pb-6">
      <DownloadPdfButton />

    </div>
    <SectionWrapperEditorSidebar header="Document Settings">
      <CvSelectFontAndColor />
      <CvSelectTheme />
    </SectionWrapperEditorSidebar>
    <CvHeaderEditor />
    <CvSummaryEditor />
    <CvExperienceEditor />
    <CvEducationEditor />
    <CvSkillsEditor />
  </div>
</template>