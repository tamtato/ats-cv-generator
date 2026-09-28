<script setup lang="ts">
import {useCvStore} from "../../../../stores/cvStore.ts";
import {CvThemes} from "../../../../types/themes/themeTypes.ts";
import SelectDropdown from "../../../common/SelectDropdown.vue";
import {atsSafeFonts} from "../../../../types/themes/fonts.ts";
import TextField from "../../../common/TextField.vue";
import ColorPicker from "../../../common/ColorPicker.vue";
import {Icon} from "@iconify/vue";
import {FORMS} from "../../../../types/forms.ts";

const cvStore = useCvStore();


</script>

<template>
  <section class="flex flex-col gap-4 lg:gap-6 w-full lg:w-1/3">


    <SelectDropdown
        label="Header Font"
        test-id="fontSelect"
        v-model="cvStore.cvData.selectedFont"
        :options="Object.values(atsSafeFonts)"
    />
    <SelectDropdown
        label="Body Font"
        test-id="fontSelect"
        v-model="cvStore.cvData.selectedFont"
        :options="Object.values(atsSafeFonts)"
    />


      <SelectDropdown
          label="Themes"
          test-id="themeSelect"
          v-model="cvStore.cvData.selectedTheme"
          :options="Object.values(CvThemes)"
      />
    <ColorPicker
        label="Theme Accent Color"
        v-model="cvStore.cvData.selectedColor"
    />


  </section>
</template>