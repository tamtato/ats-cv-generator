<script setup lang="ts">
import ExportJSON from "./ExportJSON.vue";
import DownloadPdfButton from "./DownloadPdfButton.vue";
import {useCvStore} from "../../../stores/cvStore.ts";
import DraggableList from "../../common/DraggableList.vue";
import Button from "../../common/Button.vue";
import ImportJSON from "./ImportJSON.vue";
import {DRAGGABLE_SECTIONS, FORMS} from "../../../types/forms.ts";

const cvStore = useCvStore();

</script>

<template>
  <aside class="flex flex-col h-full bg-gray-100 overflow-y-auto shrink-0 w-full md:w-80 p-4 lg:p-6 ">
    <div class="w-full border-b border-gray-200 pb-4 mb-2 lg:mb-0">
    <p class="font-light text-sm mb-4">This project is 100% serverless. Your CV data never leaves your device and is saved locally in your browser.</p>
      <ImportJSON />
    </div>
    <div class="w-fit flex flex-col gap-6 py-6 lg:py-8 lg:gap-8 flex-1">
      <Button
          variant="text"
          :text="FORMS.basicInfo.label"
          :icon="FORMS.basicInfo.icon"
          @click="cvStore.openFormById(FORMS.basicInfo.id)"
          :active="cvStore.activeFormId === FORMS.basicInfo.id"
      />
      <DraggableList
          v-model="cvStore.cvData.sectionOrder"
          :list="DRAGGABLE_SECTIONS"
          :active-id="cvStore.activeFormId"
          @select="cvStore.openFormById"
      />
      <Button
          variant="text"
          :text="FORMS.theme.label"
          :icon="FORMS.theme.icon"
          @click="cvStore.openFormById(FORMS.theme.id)"
          :active="cvStore.activeFormId === FORMS.theme.id"
      />    </div>
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