<script setup lang="ts">
import {useActiveTheme} from "../../../../../composables/useActiveTheme.ts";
import {useCvStore} from "../../../../../stores/cvStore.ts";
import SectionWrapper from "../common/SectionWrapper.vue";

const cvStore = useCvStore();
const theme = useActiveTheme();

</script>

<template>
  <SectionWrapper v-if="cvStore.cvData.skills?.length > 0" header="Summary">
    <p :class="theme.summary.text">{{ cvStore.cvData.summary }}</p>
  </SectionWrapper>
</template>