<script setup lang="ts">
import { computed } from 'vue';
import { useCvStore } from '../../stores/cvStore';

import MobileDrawer from '../common/MobileDrawer.vue';

import CvPreview from './CvPreview/CvPreview.vue';
import SidebarMenu from "./SidebarMenu/SidebarMenu.vue";
import CvLayout from "./CvPreview/CvLayout/CvLayout.vue";
import {type CvConfigId, CV_CONFIGS} from "../../types/cvConfigs.ts";
import CvConfig from "./CvConfig/CvConfig.vue";

const cvStore = useCvStore();

const activeCvConfig = computed(() => CV_CONFIGS[cvStore.activeCvConfigId as CvConfigId]);
</script>

<template>
  <div class="flex w-full h-full ">

    <!-- 1. SIDEBAR (Self-manages full width on mobile, 64-width on desktop) -->
    <SidebarMenu />

    <!-- 2. DESKTOP EDITOR (Hidden on mobile) -->
    <section class="hidden md:block flex-1 py-4 lg:py-6 h-full overflow-y-auto">
      <CvConfig />
    </section>

    <!-- 3. DESKTOP PREVIEW (Hidden on mobile & small desktop) -->
    <aside class="hidden xl:block w-2/5 h-full overflow-y-auto overflow-x-hidden pt-4 lg:pt-6">
      <CvPreview />
    </aside>

    <!-- MOBILE DRAWERS -->
    <MobileDrawer
        class="md:hidden"
        :isOpen="cvStore.mobileOverlay === 'cvConfig'"
        :title="activeCvConfig?.label || 'Update CV Section'"
        :icon="activeCvConfig?.icon"
        @close="cvStore.mobileOverlay = 'none'"
    >
      <CvConfig />
    </MobileDrawer>
    <MobileDrawer
        class="xl:hidden"
        :isOpen="cvStore.mobileOverlay === 'preview'"
        title="Live CV Preview"
        @close="cvStore.mobileOverlay = 'none'"
    >
      <div class="min-h-full max-w-full">
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