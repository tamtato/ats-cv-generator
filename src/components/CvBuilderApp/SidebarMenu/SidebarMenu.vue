<script setup lang="ts">
import ExportJSON from "./ExportJSON.vue";
import DownloadPdfButton from "./DownloadPdfButton.vue";
import {useCvStore} from "../../../stores/cvStore.ts";
import DraggableList from "../../common/DraggableList.vue";
import Button from "../../common/Button.vue";
import ImportJSON from "./ImportJSON.vue";
import {DRAGGABLE_SECTIONS, CV_CONFIGS} from "../../../types/cvConfigs.ts";

const cvStore = useCvStore();

</script>

<template>
  <aside class="flex flex-col h-full bg-gray-100 overflow-y-auto shrink-0 w-full md:w-80 p-4 lg:p-6 ">
    <div class="w-full border-b border-gray-200 pb-4 mb-2 lg:mb-0">
    <p class="font-light text-sm mb-4">This project is 100% serverless. Your CV data never leaves your device and is saved locally in your browser.</p>
      <ImportJSON />
    </div>
    <div class="flex flex-col gap-4 py-6 lg:py-8 flex-1">
      <Button
          variant="secondary"
          :text="CV_CONFIGS.basicInfo.label"
          :icon="CV_CONFIGS.basicInfo.icon"
          @click="cvStore.openCvConfigById(CV_CONFIGS.basicInfo.id)"
          :active="cvStore.activeCvConfigId === CV_CONFIGS.basicInfo.id"
      />
      <DraggableList
          v-model="cvStore.cvData.sectionOrder"
          :list="DRAGGABLE_SECTIONS"
          :active-id="cvStore.activeCvConfigId"
          @select="cvStore.openCvConfigById"
      />
      <Button
          variant="secondary"
          :text="CV_CONFIGS.theme.label"
          :icon="CV_CONFIGS.theme.icon"
          @click="cvStore.openCvConfigById(CV_CONFIGS.theme.id)"
          :active="cvStore.activeCvConfigId === CV_CONFIGS.theme.id"
      />

    </div>
    <div class="flex gap-4 flex-col mt-auto pt-6 border-t border-gray-200">
      <div class="flex-1 flex xl:flex-col gap-4">
        <ExportJSON class="flex-1" />
        <DownloadPdfButton class="flex-1" />
      </div>

      <Button
            @click="cvStore.mobileOverlay = 'preview'"
            variant="secondary"
            text="Preview PDF"
            icon="material-symbols-light:preview-sharp"
            class="block xl:hidden"
        />
      </div>
    </aside>
</template>