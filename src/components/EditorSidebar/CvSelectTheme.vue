<script setup lang="ts">
import {useCvStore} from "../../stores/cvStore.ts";
import {CvThemes} from "../../types/themes.ts";

const cvStore = useCvStore();

</script>

<template>

      <label class="block text-xs font-medium text-gray-600 mb-1">CV Themes (ATS Safe)</label>
      <select
          data-testid="themeSelect"
          v-model="cvStore.cvData.selectedTheme"
          class="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option
            v-for="theme in CvThemes"
            :key="theme"
            :value="theme"
        >
          {{ theme }}
        </option>
      </select>

</template>