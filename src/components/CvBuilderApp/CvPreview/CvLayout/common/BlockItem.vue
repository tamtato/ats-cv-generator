<script setup lang="ts">
import {useActiveTheme} from "../../../../../composables/useActiveTheme.ts";

defineProps<{
  title: string;
  subTitle: string;
  startDate: string | undefined;
  endDate: string | undefined;
}>();

const theme = useActiveTheme();

</script>

<template>
    <div :class="theme.blockItem.wrapper">
      <h5 :class="theme.blockItem.title">{{ title }}</h5>
      <div :class="theme.blockItem.subTitle.wrapper">
        <h6 :class="theme.blockItem.subTitle.title">{{ subTitle }}:</h6>
        <h6 :class="theme.blockItem.subTitle.dates">
          {{ startDate || 'yymmdd' }} -
          <span :class="endDate?.toLowerCase().includes('present') ? theme.blockItem.subTitle.endDate : ''">
            {{ endDate || 'yymmdd' }}
          </span>
        </h6>
      </div>
      <slot />
    </div>

</template>