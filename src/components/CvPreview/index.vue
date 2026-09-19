<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount, computed} from 'vue';
import {useCvStore} from "../../stores/cvStore.ts";
import CvSummary from "./CvLayout/sections/CvSummary.vue";
import CvEducation from "./CvLayout/sections/CvEducation.vue";
import CvExperience from "./CvLayout/sections/CvExperience.vue";
import CvSectionWrapper from "./CvLayout/common/CvSectionWrapper.vue";
import CvSkills from "./CvLayout/sections/CvSkills.vue";
import CvHeader from "./CvLayout/sections/CvHeader.vue";
const cvStore = useCvStore();


const activeThemeStyles = computed(() => {
  return {
    '--color-selected-color': cvStore.cvData.selectedColor,
    'fontFamily': cvStore.cvData.selectedFont
  };
});

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
  <div class="h-full overflow-y-auto bg-gray-300 py-10 print:py-0 print:bg-white print:h-auto print:overflow-visible print:block">
    <div
        class="cv-paper relative mx-auto bg-white shadow-2xl"
        :style="{ minHeight: `calc(3cm + (${pageCount} * 266mm))` }"
    >
      <!-- Static Page 1 Label -->
      <div class="absolute top-0 -left-20 mt-6 text-sm font-medium text-slate-600 print:hidden">
        Page 1
      </div>

      <!-- Dynamic Cut-Lines & Page Labels -->
      <template v-for="(pos, index) in cutLines" :key="index">
        <!-- Page Label -->
        <div
            class="absolute -left-20 mt-6 text-sm font-medium text-slate-600 print:hidden"
            :style="{ top: pos }"
        >
          Page {{ index + 2 }}
        </div>

        <!-- Cut Line -->
        <div
            class="absolute -left-10 -right-10 z-10 border-b-2 border-dashed border-slate-400 print:hidden"
            :style="{ top: pos }"
        ></div>
      </template>

      <!-- Document Content -->
      <div ref="contentRef" :style="activeThemeStyles" class="flex flex-col gap-6">


          <CvHeader :header="cvStore.cvData.header" />

          <CvSummary v-if="cvStore.cvData.summary" :summary="cvStore.cvData.summary" />

          <CvSectionWrapper v-if="cvStore.cvData.education?.length > 0" header="Education">
            <CvEducation :education="cvStore.cvData.education" />
          </CvSectionWrapper>

          <CvSectionWrapper v-if="cvStore.cvData.experience?.length > 0" header="Experience">
            <CvExperience :experience="cvStore.cvData.experience" />
          </CvSectionWrapper>

          <CvSectionWrapper v-if="cvStore.cvData.skills?.length > 0" header="Skills">
            <CvSkills :skills="cvStore.cvData.skills" />
          </CvSectionWrapper>

      </div>
    </div>
  </div>
</template>