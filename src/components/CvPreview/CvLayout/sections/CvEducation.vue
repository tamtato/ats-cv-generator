<script setup lang="ts">
import {useActiveTheme} from "../../../../composables/useActiveTheme.ts";
import BlockItem from "../common/BlockItem.vue";
import {useCvStore} from "../../../../stores/cvStore.ts";
import SectionWrapper from "../common/SectionWrapper.vue";

const cvStore = useCvStore();
const theme = useActiveTheme();

</script>

<template>
  <SectionWrapper v-if="cvStore.cvData.education?.length > 0" header="Education">
  <BlockItem
        v-for="e in cvStore.cvData.education"
        :key="e.id"
        :title="e.title"
        :sub-title="e.school"
        :start-date="e.startDate"
        :end-date="e.endDate"
    >
      <p :class="theme.education.description">{{e.description}}</p>
    </BlockItem>
  </SectionWrapper>
</template>