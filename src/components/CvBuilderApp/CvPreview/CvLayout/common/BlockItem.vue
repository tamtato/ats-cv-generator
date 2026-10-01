<script setup lang="ts">
import {useActiveTheme} from "../../../../../composables/useActiveTheme.ts";

defineProps<{
  title: string;
  subTitle: string;
  startDate?: string | undefined;
  endDate?: string | undefined;
  current?: boolean | undefined;
  completionDate?: string | undefined;
}>();

const theme = useActiveTheme();

</script>

<template>
  <div :class="theme.blockItem.wrapper">
    <h5 :class="[theme.blockItem.title, !title && 'italic opacity-40']">{{ title || 'Title' }}</h5>
    <div :class="theme.blockItem.subTitle.wrapper">
      <h6 :class="[theme.blockItem.subTitle.title, !subTitle && 'italic opacity-40']">{{ subTitle || 'SubTitle' }}
        |</h6>
      <h6 v-if="completionDate">{{ completionDate }}</h6>
      <h6 v-else :class="theme.blockItem.subTitle.dates">
        <span :class="!startDate && 'italic opacity-40'">{{ startDate || 'yymmdd' }} </span>
        <span :class="[
              current ? theme.blockItem.subTitle.endDate : '',
              !current && !endDate && 'italic opacity-40'
              ]"
        >
            - {{ current ? 'Present' : (endDate || 'yymmdd') }}
          </span>
      </h6>
    </div>
    <slot/>
  </div>

</template>