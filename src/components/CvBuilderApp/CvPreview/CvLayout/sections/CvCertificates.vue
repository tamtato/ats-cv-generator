<script setup lang="ts">
import {useActiveTheme} from "../../../../../composables/useActiveTheme.ts";
import BlockItem from "../common/BlockItem.vue";
import {useCvStore} from "../../../../../stores/cvStore.ts";
import SectionWrapper from "../common/SectionWrapper.vue";

const cvStore = useCvStore();
const theme = useActiveTheme();

</script>

<template>
  <SectionWrapper v-if="cvStore.cvData.certificates?.length > 0" header="Certificates">
    <BlockItem
        v-for="cert in cvStore.cvData.certificates"
        :key="cert.id"
        :title="cert.title"
        :sub-title="cert.grade"
        :completion-date="cert.date"
    >
      <p :class="[theme.blockItem.text, !cert.description && 'italic opacity-40']">{{cert.description || 'Short description about the certificate'}}</p>
    </BlockItem>
  </SectionWrapper>
</template>