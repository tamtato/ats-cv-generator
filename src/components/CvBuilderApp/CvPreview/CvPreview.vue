<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import CvLayout from "./CvLayout/CvLayout.vue";
const wrapperRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);

const pageCount = ref(1);
const scaleFactor = ref(1);

const PAGE_CAPACITY_PX = 995.9;
const A4_WIDTH_PX = 794; // 210mm at 96dpi

let contentObserver: ResizeObserver | undefined;
let wrapperObserver: ResizeObserver | undefined;

onMounted(() => {
  contentObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      pageCount.value = Math.max(1, Math.ceil(entry.contentRect.height / PAGE_CAPACITY_PX));
    }
  });
  if (contentRef.value) contentObserver.observe(contentRef.value);

  wrapperObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const availableWidth = entry.contentRect.width;
      // 48px accounts for the p-6 (1.5rem * 2) padding
      const requiredWidth = A4_WIDTH_PX + 48;
      scaleFactor.value = availableWidth < requiredWidth
          ? availableWidth / requiredWidth
          : 1;
    }
  });
  if (wrapperRef.value) wrapperObserver.observe(wrapperRef.value);
});

onBeforeUnmount(() => {
  if (contentObserver) contentObserver.disconnect();
  if (wrapperObserver) wrapperObserver.disconnect();
});

const cutLines = computed(() => {
  const lines = [];
  for (let i = 1; i < pageCount.value; i++) {
    lines.push(`calc(1.5cm + ${i * 266}mm)`);
  }
  return lines;
});

const unscaledHeight = computed(() => `calc(3cm + (${pageCount.value} * 266mm))`);
</script>

<template>

  <div ref="wrapperRef" class="w-full" >
    <div
        class="relative print:hidden mx-auto "
        :style="{
        width: `calc(${scaleFactor} * 210mm)`,
        height: `calc(${scaleFactor} * ${unscaledHeight})`
      }"
    >
      <div
          class="cv-paper bg-white absolute top-0 left-0 origin-top-left"
          :style="{
          width: '210mm',
          padding: '1.5cm',
          minHeight: unscaledHeight,
          transform: `scale(${scaleFactor})`
        }"
      >
        <template v-for="(pos, index) in cutLines" :key="index">
          <div
              class="absolute -left-10 -right-10 z-10 border-b-2 border-dashed border-slate-400"
              :style="{ top: pos }"
          ></div>
        </template>
        <div ref="contentRef">
          <CvLayout />
        </div>

      </div>
    </div>
  </div>




<!--  &lt;!&ndash;    CONTENT THAT WILL BE DOWNLOADED TO PDF    &ndash;&gt;
  <div class="cv-paper bg-white hidden print:block print:relative"
       :style="{ width: '210mm', minHeight: `calc(3cm + (${pageCount} * 266mm))` }"
  >
    <CvLayout />
  </div>-->
</template>