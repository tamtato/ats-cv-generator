<script setup lang="ts">
import CvExperienceEditor from "./sections/CvExperienceEditor.vue";
import { ref, computed } from 'vue';
import ResponsiveCard from "../common/ResponsiveCard.vue";
import ExportJSON from "./sections/ExportJSON.vue";
import DownloadPdfButton from "./sections/DownloadPdfButton.vue";
import {useCvStore} from "../../stores/cvStore.ts";
import DraggableList from "../common/DraggableList.vue";
import Button from "../common/Button.vue";
import ImportJSON from "./sections/ImportJSON.vue";
import CvPreview from "../CvPreview/CvPreview.vue";

const cvStore = useCvStore();

const isMobileOpen = ref(false);
const activeTab = ref('basicInfo');

const basicInfoTab = { id: 'basicInfo', label: 'Basic Info', icon: 'material-symbols-light:person-play-outline', component: CvExperienceEditor };
const themeTab = { id: 'theme', label: 'Theme', icon: 'material-symbols-light:palette-outline', component: CvExperienceEditor };

const sectionTabsMap: Record<string, any> = {
  education: { label: 'Education', icon:'material-symbols-light:sports-martial-arts', component: CvExperienceEditor },
  experience: { label: 'Experience', icon:'material-symbols-light:surfing', component: CvExperienceEditor },
  skills: { label: 'Skills', icon:'material-symbols-light:skateboarding', component: CvExperienceEditor },
};/*
  certificates: { label: 'Certificates', icon:'material-symbols-light:scuba-diving', component: CvExperienceEditor }
*/

const allTabs = computed(() => {
  const dynamicTabs = (cvStore.cvData.sectionOrder || []).map(id => ({
    id,
    ...sectionTabsMap[id]
  }));
  return [basicInfoTab, ...dynamicTabs, themeTab];
});

const activeTabLabel = computed(() => allTabs.value.find(t => t.id === activeTab.value)?.label || '');
const activeComponent = computed(() => allTabs.value.find(t => t.id === activeTab.value)?.component || CvExperienceEditor);

const openTab = (tabId: string) => {
  activeTab.value = tabId;
  isMobileOpen.value = true;
}

</script>

<template>
  <div class="flex-1 flex flex-col lg:flex-row ">
    <aside class="h-full py-4 lg:py-6 flex flex-col">

      <div class="w-full flex items-center justify-between lg:items-baseline lg:justify-baseline lg:flex-col lg:gap-6 border-b border-gray-200 pb-4">
        <h4 class="text-gray-500 text-lg">CV CONFIG</h4>
        <ImportJSON />
      </div>

      <div class="w-fit flex flex-col gap-6 py-6 lg:py-8 lg:gap-8">
        <Button variant="text" :text="basicInfoTab.label" :icon="basicInfoTab.icon" @click="openTab(basicInfoTab.id)" :active="activeTab === basicInfoTab.id" />
        <DraggableList
            v-model="cvStore.cvData.sectionOrder"
            :list="sectionTabsMap"
            :active-id="activeTab"
            @select="openTab"
        />
        <Button variant="text" :text="themeTab.label" :icon="themeTab.icon" @click="openTab(themeTab.id)" :active="activeTab === themeTab.id" />
      </div>

      <div class="flex gap-4 lg:flex-col">

        <ExportJSON />
        <DownloadPdfButton />
        <div class="block xl:hidden w-full">
          <Button @click="cvStore.showCvPreviewMobile = !cvStore.showCvPreviewMobile" variant="secondary" text="Preview PDF" icon="material-symbols-light:preview-sharp" />
        </div>
      </div>

    </aside>

    <main class="flex-1 lg:p-8">
      <ResponsiveCard
          v-model:isOpen="isMobileOpen"
          :title="activeTabLabel"
          breakpoint="lg"
      >
        <KeepAlive>
          <component :is="activeComponent" />
        </KeepAlive>
      </ResponsiveCard>
    </main>
  </div>
</template>