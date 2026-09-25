<script setup lang="ts">
import {computed} from "vue";
import {useActiveTheme} from "../../../../../composables/useActiveTheme.ts";
import {useCvStore} from "../../../../../stores/cvStore.ts";

const cvStore = useCvStore();

const contactInfo = computed(() => [cvStore.cvData.header.location, cvStore.cvData.header.phone, cvStore.cvData.header.email]);
const links = computed(() => [cvStore.cvData.header.github, cvStore.cvData.header.linkedin]);
const theme = useActiveTheme();

</script>

<template>
  <header :class="theme.header.wrapper">
      <h1 :class="theme.header.name">
        {{ cvStore.cvData.header.name }}
      </h1>
    <h2
        :class="theme.header.title"
    >
      {{ cvStore.cvData.header.title }}
    </h2>

    <div :class="theme.header.contact.wrapper">
        <p v-for="contact in contactInfo" :key="contact" :class="theme.header.contact.contacts" >{{ contact }}</p>
        <a v-for="link in links" :key="link" :href="'https://' + link" target="_blank" :class="theme.header.contact.links"
          >
          {{ link }}
        </a>
    </div>
  </header>
</template>