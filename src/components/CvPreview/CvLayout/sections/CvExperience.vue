<script setup lang="ts">
import {useActiveTheme} from "../../../../composables/useActiveTheme.ts";
import BlockItem from "../common/BlockItem.vue";
import SectionWrapper from "../common/SectionWrapper.vue";
import {useCvStore} from "../../../../stores/cvStore.ts";

const cvStore = useCvStore();
const theme = useActiveTheme();

</script>

<template>
  <SectionWrapper v-if="cvStore.cvData.experience?.length > 0" header="Experience">
    <BlockItem
        v-for="job in cvStore.cvData.experience"
        :key="job.id"
        :title="job.title"
        :sub-title="job.company"
        :start-date="job.startDate"
        :end-date="job.endDate"
    >
      <ul :class="theme.experience.ul">
        <li
            v-for="(bullet, index) in job.bullets"
            :key="index"
            :class="`relative break-inside-auto ${theme.experience.li}`"
        >
          <span class="text-[12px] font-bold">-</span> {{ bullet }}
        </li>
      </ul>
    </BlockItem>
  </SectionWrapper>
</template>