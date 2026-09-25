<!-- src/components/CvBuilderApp/CvEditor/CvEditorArea.vue -->
<script setup lang="ts">
import { computed } from 'vue';
import { useCvStore } from '../../../stores/cvStore';
import ExperienceForm from './forms/ExperienceForm.vue';

const cvStore = useCvStore();

const editorComponents: Record<string, any> = {
  basicInfo: ExperienceForm, // Replace with actual component
  education: ExperienceForm, // Replace with actual component
  experience: ExperienceForm,
  skills: ExperienceForm,    // Replace with actual component
  theme: ExperienceForm,     // Replace with actual component
};

const activeComponent = computed(() => {
  return editorComponents[cvStore.activeTabId] || ExperienceForm;
});
</script>

<template>
  <KeepAlive>
    <component :is="activeComponent" />
  </KeepAlive>
</template>