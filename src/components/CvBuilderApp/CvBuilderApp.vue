<script setup lang="ts">
import { computed } from 'vue';
import { useCvStore } from '../../stores/cvStore';

import MobileDrawer from '../common/MobileDrawer.vue';

import CvPreview from './CvPreview/CvPreview.vue';
import SidebarMenu from "./SidebarMenu/SidebarMenu.vue";
import Editor from "./Editor/Editor.vue";
import CvLayout from "./CvPreview/CvLayout/CvLayout.vue";

const cvStore = useCvStore();

const activeTabTitle = computed(() => {
  const titles: Record<string, string> = {
    basicInfo: 'Basic Info',
    education: 'Education',
    experience: 'Experience',
    skills: 'Skills',
    theme: 'Theme Settings'
  };
  return titles[cvStore.activeTabId] || 'Editor';
});
</script>

<template>
  <div class="flex-1 flex overflow-hidden relative w-full h-full">

    <!-- 1. SIDEBAR (Self-manages full width on mobile, 64-width on desktop) -->
    <SidebarMenu />

    <!-- 2. DESKTOP EDITOR (Hidden on mobile) -->
    <section class="hidden md:block flex-1 p-8 h-full overflow-y-auto bg-white">
      <Editor />
    </section>

    <!-- 3. DESKTOP PREVIEW (Hidden on mobile & small desktop) -->
    <aside class="hidden xl:block w-2/5 overflow-y-auto h-full shrink-0">
      <CvPreview />
    </aside>

    <!-- MOBILE DRAWERS -->
    <MobileDrawer
        class="md:hidden"
        :isOpen="cvStore.mobileOverlay === 'editor'"
        :title="activeTabTitle"
        @close="cvStore.mobileOverlay = 'none'"
    >
      <Editor />
    </MobileDrawer>
    <MobileDrawer
        class="xl:hidden"
        :isOpen="cvStore.mobileOverlay === 'preview'"
        title="Live CV Preview"
        @close="cvStore.mobileOverlay = 'none'"
    >
      <div class="min-h-full flex justify-center bg-gray-100">
        <CvPreview />
      </div>
    </MobileDrawer>

  </div>

  <!-- ========================================= -->
  <!-- PRINT ONLY UI (Teleported to root body)   -->
  <!-- ========================================= -->
  <Teleport to="body">
    <div class="hidden print:block cv-paper bg-white">
      <CvLayout />
    </div>
  </Teleport>
</template>