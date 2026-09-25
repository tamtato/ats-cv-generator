<script setup lang="ts">
import ExportJSON from "./ExportJSON.vue";
import DownloadPdfButton from "./DownloadPdfButton.vue";
import {useCvStore} from "../../../stores/cvStore.ts";
import DraggableList from "../../common/DraggableList.vue";
import Button from "../../common/Button.vue";
import ImportJSON from "./ImportJSON.vue";

const cvStore = useCvStore();
const basicInfoTab = { id: 'basicInfo', label: 'Basic Info', icon: 'material-symbols-light:person-play-outline'};
const themeTab = { id: 'theme', label: 'Theme', icon: 'material-symbols-light:palette-outline'};

const sectionTabsMap: Record<string, any> = {
  education: {id: 'education', label: 'Education', icon:'material-symbols-light:sports-martial-arts'},
  experience: {id: 'experience', label: 'Experience', icon:'material-symbols-light:surfing'},
  skills: {id: 'skills', label: 'Skills', icon:'material-symbols-light:skateboarding'},
};/*
  certificates: {id: 'certificates', label: 'Certificates', icon:'material-symbols-light:scuba-diving'}
*/
</script>

<template>
  <aside class="flex flex-col h-full bg-gray-50 overflow-y-auto shrink-0 w-full md:w-64 p-4 lg:p-6">
    <div class="w-full border-b border-gray-200 pb-4 mb-2 lg:mb-0">
      <ImportJSON />
    </div>
    <div class="w-fit flex flex-col gap-6 py-6 lg:py-8 lg:gap-8 flex-1">
      <Button variant="text" :text="basicInfoTab.label" :icon="basicInfoTab.icon" @click="cvStore.openEditorTab(basicInfoTab.id)" :active="cvStore.activeTabId === basicInfoTab.id" />
      <DraggableList
          v-model="cvStore.cvData.sectionOrder"
          :list="sectionTabsMap"
          :active-id="cvStore.activeTabId"
          @select="cvStore.openEditorTab"
      />
      <Button variant="text" :text="themeTab.label" :icon="themeTab.icon" @click="cvStore.openEditorTab(themeTab.id)" :active="cvStore.activeTabId === themeTab.id" />
    </div>
    <div class="flex gap-4 lg:flex-col mt-auto">
      <ExportJSON />
      <DownloadPdfButton />
      <div class="block xl:hidden mt-4 w-full">
        <Button
            @click="cvStore.mobileOverlay = 'preview'"
            variant="secondary"
            text="Preview PDF"
            icon="material-symbols-light:preview-sharp"
        />
      </div>
    </div>
    </aside>
</template>