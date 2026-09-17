<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import { useCvStore } from '../../stores/cvStore.ts';
import ImportExportActions from "./ImportExportActions.vue";
import DownloadPdfButton from "./DownloadPdfButton.vue";
import ToasterBanner from "../common/ToasterBanner.vue";
import CvSelectFontAndColor from "./CvSelectFontAndColor.vue";
import CvHeaderEditor from "./CvHeaderEditor.vue";
import CvSummaryEditor from "./CvSummaryEditor.vue";
import CvExperienceEditor from "./CvExperienceEditor.vue";

const cvStore = useCvStore();


// Skills management
const addSkill = () => {
  if (!cvStore.cvData.skills) {
    cvStore.cvData.skills = [];
  }
  cvStore.cvData.skills.push({
    category: '',
    items: ''
  });
};

const removeSkill = (index: number) => {
  cvStore.cvData.skills.splice(index, 1);
};

</script>

<template>
  <div class="flex flex-col gap-6">

    <!-- Local Storage Notice -->
    <ToasterBanner color="blue" :persistent="true">
      <strong>Heads up:</strong> This tool is 100% serverless. Your CV data never leaves your device and is saved locally in your browser.
    </ToasterBanner>

    <!-- Actions -->
    <div class="flex flex-wrap gap-2 border-b pb-6">
      <DownloadPdfButton />
      <ImportExportActions />
    </div>

    <!-- Document Settings -->
    <CvSelectFontAndColor />

    <!-- Basic Info -->
    <CvHeaderEditor />

    <!-- Summary -->
    <CvSummaryEditor />

    <CvExperienceEditor />
      <!-- Skills -->
      <section class="flex flex-col gap-4">
        <h3 class="font-semibold text-gray-700 border-b pb-1">Technical Skills</h3>

        <div
            v-for="(skill, index) in cvStore.cvData.skills"
            :key="index"
            class="p-4 bg-white border rounded shadow-sm relative flex flex-col gap-3"
        >
          <button
              @click="removeSkill(index)"
              class="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs font-bold"
          >
            ✕ Remove
          </button>

          <div class="mt-2">
            <label class="block text-xs font-medium text-gray-600 mb-1">Category (e.g., Languages, Frameworks)</label>
            <input type="text" v-model="skill.category" class="w-full p-2 border rounded text-sm mb-3" />

            <label class="block text-xs font-medium text-gray-600 mb-1">Skills (comma separated)</label>
            <textarea v-model="skill.items" rows="2" class="w-full p-2 border rounded text-sm"></textarea>
          </div>
        </div>

        <button
            @click="addSkill"
            class="w-full py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded hover:bg-gray-50 hover:border-gray-400 transition text-sm font-medium"
        >
          + Add Skill Category
        </button>
      </section>


  </div>
</template>