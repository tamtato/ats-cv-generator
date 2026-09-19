<script setup lang="ts">
import type {CvHeaderType} from "../../../../types/cv.ts";
import {computed} from "vue";
import {useActiveTheme} from "../../../../composables/useActiveTheme.ts";

const props = defineProps<{
  header: CvHeaderType;
}>();

const contactInfo = computed(() => [props.header.location, props.header.phone, props.header.email]);
const links = computed(() => [props.header.github, props.header.linkedin]);
const theme = useActiveTheme();

</script>

<template>
  <header>
    <div class="flex flex-col gap-1 ">
      <h1 :class="theme.headerName">
        {{ header.name }}
      </h1>
      <h2
          :class="theme.headerTitle"
          >
        {{ header.title }}
      </h2>

    </div>

    <div class="flex flex-wrap mt-3 gap-1">
        <p v-for="contact in contactInfo" :key="contact" class="mr-2" >{{ contact }}</p>
        <a v-for="link in links" :key="link" :href="'https://' + link" target="_blank" class="mr-2"
          >
          {{ link }}
        </a>
    </div>
  </header>
</template>