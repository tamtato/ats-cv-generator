<script setup lang="ts">
import {useCvStore} from "../../../../stores/cvStore.ts";
import {CvThemes} from "../../../../types/themes/themeTypes.ts";
import SelectDropdown from "../../../common/SelectDropdown.vue";
import {atsSafeFonts} from "../../../../types/themes/fonts.ts";
import ColorPicker from "../../../common/ColorPicker.vue";
import ConfigWrapper from "../common/ConfigWrapper.vue";
import ConfigBlockWrapper from "../common/ConfigBlockWrapper.vue";

const cvStore = useCvStore();

</script>

<template>
  <ConfigWrapper>
    <ConfigBlockWrapper>
      <template #title>
        Typography
      </template>
      <div class="grid lg:grid-cols-2 gap-3">
        <div>
          <SelectDropdown
              label="Header Font"
              v-model="cvStore.cvData.theme.selectedHeaderFont"
              :options="Object.values(atsSafeFonts)"
          />
          <h3 class="text-xl font-bold font-selected-header-font pt-4 px-2 uppercase"
              :style="{'fontFamily': cvStore.cvData.theme.selectedHeaderFont}">Header text</h3>
        </div>
        <div>
          <SelectDropdown
              label="Body Font"
              v-model="cvStore.cvData.theme.selectedBodyFont"
              :options="Object.values(atsSafeFonts)"
          />
          <p class="text-xl p-2 font-normal pt-4 px-2" :style="{'fontFamily': cvStore.cvData.theme.selectedBodyFont}">
            Body text</p>
        </div>
      </div>
    </ConfigBlockWrapper>
    <ConfigBlockWrapper>
      <template #title>
        Style
      </template>
      <div class="grid lg:grid-cols-2 gap-3">
        <SelectDropdown
            label="Themes"
            v-model="cvStore.cvData.theme.selectedTheme"
            :options="Object.values(CvThemes)"
        />
        <ColorPicker
            label="Theme Accent Color"
            v-model="cvStore.cvData.theme.selectedColor"
        />
      </div>
    </ConfigBlockWrapper>
  </ConfigWrapper>
</template>