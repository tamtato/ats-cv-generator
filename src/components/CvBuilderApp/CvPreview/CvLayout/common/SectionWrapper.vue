<script setup lang="ts">
import {useActiveTheme} from "../../../../../composables/useActiveTheme.ts";

defineProps<{ header: string }>();

const theme = useActiveTheme();

</script>

<template>
  <section :class="theme.section.wrapper">
    <h3 :class="`w-full ${theme.section.titleWrapper}`">
      <span :class="`h-full block w-fit pr-2 ${theme.section.titleText}`">
        {{ header }}
      </span>
    </h3>
    <div :class="`flex flex-col ${theme.section.content}`">
      <slot />
    </div>
  </section>
</template>