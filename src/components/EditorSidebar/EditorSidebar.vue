<script setup lang="ts">

import DownloadPdfButton from "./DownloadPdfButton.vue";
import CvSelectFontAndColor from "./sections/CvSelectFontAndColor.vue";
import CvHeaderEditor from "./sections/CvHeaderEditor.vue";
import CvSummaryEditor from "./sections/CvSummaryEditor.vue";
import CvExperienceEditor from "./sections/CvExperienceEditor.vue";
import SectionWrapperEditorSidebar from "./SectionWrapperEditorSidebar.vue";
import CvSelectTheme from "./sections/CvSelectTheme.vue";
import CvSkillsEditor from "./sections/CvSkillsEditor.vue";
import CvEducationEditor from "./sections/CvEducationEditor.vue";
import Button from "../common/Button.vue";
import {Icon} from "@iconify/vue";
import ImportExportActions from "./sections/ImportExportActions.vue";

</script>

<template>
  <div class="w-full h-full flex flex-col gap-6 tracking-widest p-6 bg-white">
    <h6 class="font-header">CV CONFIG</h6>
    <p class="font-light text-xs">
      This project is 100% serverless. Your CV data never leaves your device and is saved locally in your browser.
    </p>
    <ImportExportActions />

    <Button>
      <template #icon>
      <Icon icon="material-symbols-light:palette-outline" class="w-6 h-6" />
        </template >
      Style
    </Button>
    <DownloadPdfButton />

<!--
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
    <CvSkillsEditor />-->
  </div>
</template>