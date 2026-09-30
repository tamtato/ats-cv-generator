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
      <li v-for="(skillGroup, index) in cvStore.cvData.skills" :key="index" :class="`relative break-inside-auto ${theme.blockItem.text}`">
        <span :class="[theme.skills.category, !skillGroup.category && 'italic opacity-40']">{{ skillGroup.category || 'Category Name' }}:</span>
        <span :class="[theme.skills.skills, !skillGroup.items && 'italic opacity-40']">{{ skillGroup.items || 'List of skills in category' }}</span>
      </li>
    </ul>
  </SectionWrapper>
</template>