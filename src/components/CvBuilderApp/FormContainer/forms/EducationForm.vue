<script setup lang="ts">
import { useCvStore } from '../../../../stores/cvStore.ts';
import TextField from "../../../common/TextField.vue";
import Button from "../../../common/Button.vue";

const cvStore = useCvStore();

const addEducation = () => {
  cvStore.cvData.education.push({
    id: String(Date.now()),
    title: '',
    school: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });
};

const removeEducation = (index: number) => {
  cvStore.cvData.education?.splice(index, 1);
};

</script>

<template>
  <section class="flex flex-col gap-4 lg:gap-6">
    <div
        v-for="(education, educationIndex) in cvStore.cvData.education"
        :key="education.id"
        class="relative flex flex-col gap-4  p-4 pt-1 border border-gray-100"
    >
      <div class="flex items-center justify-between">
        <h3 class="flex-1 text-indigo-600 font-header uppercase tracking-widest">
          Education {{educationIndex + 1}}
        </h3>
        <Button
            data-testid="removeEducation"
            @click="removeEducation(educationIndex)"
            variant="text"
            color="red"
            text=""
            icon="material-symbols-light:delete-outline"
            class="justify-end flex-1"
        />
      </div>
        <div class="grid lg:grid-cols-2 gap-3">
        <TextField
            label="Education Title"
            v-model="education.title"
            placeholder="Ex: Advanced Tactical Engineering"
        />
        <TextField
            label="School"
            v-model="education.school"
            placeholder="Ex: Resistance Training Academy"
        />

      </div>
      <TextField
          label="I'm currently studying here"
          type="checkbox"
          v-model="education.current"
          @update:model-value="(val) => { if (val) education.endDate = ''; }"

      />
      <div class="flex items-center gap-3 ">
        <TextField
            label="Start Date"
            v-model="education.startDate"
            placeholder="DD/MM/YY"
            type="date"
        />
        <TextField
            :disabled="education.current"
            label="End Date"
            v-model="education.endDate"
            placeholder="DD/MM/YY"
            type="date"
        />
      </div>
      <TextField
          label="Description"
          v-model="education.description"
          placeholder="Ex: Completed an intensive program focused on guerrilla tactics, cybernetic countermeasures, and temporal anomaly navigation."
          isTextarea
      />

    </div>
    <Button
        data-testid="addEducation"
        variant="secondary"
        text="Add Education"
        @click="addEducation"
        icon="material-symbols-light:note-stack-add-outline-sharp"
    />
  </section>
</template>