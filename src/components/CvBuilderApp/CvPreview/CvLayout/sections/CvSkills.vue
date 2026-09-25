<script setup lang="ts">
import {useActiveTheme} from "../../../../../composables/useActiveTheme.ts";
import {useCvStore} from "../../../../../stores/cvStore.ts";
import SectionWrapper from "../common/SectionWrapper.vue";

const cvStore = useCvStore();
const theme = useActiveTheme();

</script>

<template>
  <SectionWrapper v-if="cvStore.cvData.skills?.length > 0" header="Skills">
    <ul :class="theme.skills.ul">
      <li v-for="(skillGroup, index) in cvStore.cvData.skills" :key="index" :class="`relative break-inside-auto ${theme.skills.li}`">
        <span :class="theme.skills.category">{{ skillGroup.category }}:</span> <span :class="theme.skills.skills">{{ skillGroup.items }}</span>
      </li>
    </ul>
  </SectionWrapper>
</template>