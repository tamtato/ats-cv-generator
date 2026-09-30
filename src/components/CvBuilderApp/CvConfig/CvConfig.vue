<script setup lang="ts">
import { computed } from 'vue';
import { useCvStore } from '../../../stores/cvStore';
import ExperienceConfig from './configs/ExperienceConfig.vue';
import HeaderConfig from "./configs/HeaderConfig.vue";
import EducationConfig from "./configs/EducationConfig.vue";
import SkillsConfig from "./configs/SkillsConfig.vue";
import ThemeConfig from "./configs/ThemeConfig.vue";
import CertificatesConfig from "./configs/CertificatesConfig.vue";

const cvStore = useCvStore();

const formComponents: Record<string, any> = {
  basicInfo: HeaderConfig,
  education: EducationConfig,
  experience: ExperienceConfig,
  skills: SkillsConfig,
  certificates: CertificatesConfig,
  theme: ThemeConfig,
};

const activeComponent = computed(() => {
  return formComponents[cvStore.activeCvConfigId] || ExperienceConfig;
});
</script>

<template>
  <KeepAlive>
    <div class="w-full bg-white p-4 lg:p-6 min-h-full overflow-y-auto">
      <component :is="activeComponent" />
    </div>

  </KeepAlive>
</template>