<script setup lang="ts">
import { useCvStore } from '../../../../stores/cvStore.ts';
import TextField from "../../../common/TextField.vue";
import Button from "../../../common/Button.vue";

const cvStore = useCvStore();

const addSkill = () => {
  if (!cvStore.cvData.skills) {
    cvStore.cvData.skills = [];
  }
  cvStore.cvData.skills.push({
    category: '',
    items: ''
  });
};

const removeSkill = (index: number) => {
  cvStore.cvData.skills.splice(index, 1);
};
</script>

<template>
  <section class="flex flex-col gap-4 lg:gap-6">
    <div
        v-for="(skill, skillIndex) in cvStore.cvData.skills"
        :key="skillIndex"
        class="relative flex flex-col gap-4 p-4 pt-1 border border-gray-100"
    >
      <div class="flex items-center justify-between">
        <h3 class="flex-1 text-indigo-600 font-header uppercase tracking-widest">
          Skills {{skillIndex + 1}}
        </h3>
        <Button
            data-testid="removeSkill"
            @click="removeSkill(skillIndex)"
            variant="text"
            color="red"
            text=""
            icon="material-symbols-light:delete-outline"

            class="justify-end flex-1"
        />
      </div>
      <TextField
          label="Category"
          v-model="skill.category"
          placeholder="Ex: Cybernetics"
      />
      <TextField
          label="Skills"
          v-model="skill.items"
          placeholder="Ex: T-800 hardware analysis, neural-net processor destruction, CPU reprogramming"
          isTextarea
          rows="2"
      />
    </div>
    <Button
        data-testid="addSkill"
        variant="secondary"
        text="Add Skill Category"
        @click="addSkill"
        icon="material-symbols-light:note-stack-add-outline-sharp"
    />
  </section>
</template>