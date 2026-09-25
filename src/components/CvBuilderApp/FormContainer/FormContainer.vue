<!-- src/components/CvBuilderApp/CvEditor/CvEditorArea.vue -->
<script setup lang="ts">
import { computed } from 'vue';
import { useCvStore } from '../../../stores/cvStore';
import ExperienceForm from './forms/ExperienceForm.vue';
import HeaderForm from "./forms/HeaderForm.vue";
import EducationForm from "./forms/EducationForm.vue";
import SkillsForm from "./forms/SkillsForm.vue";
import ThemeForm from "./forms/ThemeForm.vue";

const cvStore = useCvStore();

const formComponents: Record<string, any> = {
  basicInfo: HeaderForm,
  education: EducationForm,
  experience: ExperienceForm,
  skills: SkillsForm,
  theme: ThemeForm,
};

const activeComponent = computed(() => {
  return formComponents[cvStore.activeFormId] || ExperienceForm;
});
</script>

<template>
  <KeepAlive>
    <div class="w-full bg-white p-4 lg:p-6 min-h-full overflow-y-auto">
      <component :is="activeComponent" />
    </div>

  </KeepAlive>
</template>