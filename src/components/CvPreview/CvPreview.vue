<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount, computed} from 'vue';

import CvLayout from "./CvLayout/CvLayout.vue";
import DownloadPdfButton from "../EditorSidebar/DownloadPdfButton.vue";

const contentRef = ref<HTMLElement | null>(null);
const pageCount = ref(1);

const PAGE_CAPACITY_PX = 995.9;

let observer: ResizeObserver | undefined;

onMounted(() => {
  observer = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const contentHeight = entry.contentRect.height;
      pageCount.value = Math.max(1, Math.ceil(contentHeight / PAGE_CAPACITY_PX));
    }
  });

  if (contentRef.value) {
    observer.observe(contentRef.value);
  }
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});

const cutLines = computed(() => {
  const lines = [];
  for (let i = 1; i < pageCount.value; i++) {
    lines.push(`calc(1.5cm + ${i * 266}mm)`);
  }
  return lines;
});
</script>

<template>
  <div class="h-full overflow-y-auto py-6 pr-6 print:py-0 print:bg-white print:h-auto print:overflow-visible print:block">
    <div
        class="cv-paper relative bg-white "
        :style="{ minHeight: `calc(3cm + (${pageCount} * 266mm))` }"
    >
      <template v-for="(pos, index) in cutLines" :key="index">
        <div
            class="absolute -left-10 -right-10 z-10 border-b-2 border-dashed border-slate-400 print:hidden"
            :style="{ top: pos }"
        ></div>
      </template>
      <CvLayout ref="contentRef" />
    </div>
  </div>
</template>