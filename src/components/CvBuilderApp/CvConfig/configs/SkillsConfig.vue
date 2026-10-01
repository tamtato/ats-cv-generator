<script setup lang="ts">
import {useCvStore} from '../../../../stores/cvStore.ts';
import TextField from "../../../common/TextField.vue";
import Button from "../../../common/Button.vue";
import ConfigBlockWrapper from "../common/ConfigBlockWrapper.vue";
import ConfigWrapper from "../common/ConfigWrapper.vue";

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
  <ConfigWrapper>
    <ConfigBlockWrapper
        v-for="(skill, skillIndex) in cvStore.cvData.skills"
        :key="skillIndex"
    >
      <template #title>
        Skills {{ skillIndex + 1 }}
      </template>
      <template #titleAction>
        <Button
            data-testid="removeSkill"
            @click="removeSkill(skillIndex)"
            variant="text"
            color="red"
            text=""
            icon="material-symbols-light:delete-outline"
        />
      </template>
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
    </ConfigBlockWrapper>
    <Button
        data-testid="addSkill"
        variant="secondary"
        text="Add Skill Category"
        @click="addSkill"
        icon="material-symbols-light:note-stack-add-outline-sharp"
    />
  </ConfigWrapper>
</template>