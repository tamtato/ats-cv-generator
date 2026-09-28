<script setup lang="ts">
import { useCvStore } from '../../../../stores/cvStore.ts';
import Button from "../../../common/Button.vue";
import TextField from "../../../common/TextField.vue";

const cvStore = useCvStore();

const addExp = () => {
  cvStore.cvData.experience.push({
    id: String(Date.now()),
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    current: false,
    bullets: ['']
  });
};

const removeExp = (index: number) => {
  cvStore.cvData.experience.splice(index, 1);
};

const addBullet = (expIndex: number) => {
  cvStore.cvData.experience[expIndex].bullets.push('');
};

const removeBullet = (expIndex: number, bulletIndex: number) => {
  cvStore.cvData.experience[expIndex].bullets.splice(bulletIndex, 1);
};
</script>

<template>
  <section class="flex flex-col gap-4 lg:gap-6">

    <div
        v-for="(exp, expIndex) in cvStore.cvData.experience"
        :key="exp.id"
        class="relative flex flex-col gap-4 p-4 pt-1 border border-gray-100"
    >
      <div class="flex items-center justify-between">
        <h3 class="flex-1 text-indigo-600 font-header uppercase tracking-widest">
          Experience {{expIndex + 1}}
        </h3>
        <Button
            data-testid="removeExp"
            @click="removeExp(expIndex)"
            variant="text"
            color="red"
            text=""
            icon="material-symbols-light:delete-outline"
            class="justify-end flex-1"
        />
      </div>

      <div class="grid lg:grid-cols-2 gap-3">
        <TextField
            label="Experience Title"
            v-model="exp.title"
            placeholder="Ex: Systems Saboteur & Operations Lead"
        />
        <TextField
            label="company"
            v-model="exp.company"
            placeholder="Ex: The Human Resistance"
        />

      </div>
      <TextField
          label="I'm currently working here"
          type="checkbox"
          v-model="exp.current"
          @update:model-value="(val) => { if (val) exp.endDate = ''; }"
      />
      <div class="flex items-center gap-3 ">
        <TextField
            label="Start Date"
            v-model="exp.startDate"
            placeholder="DD/MM/YY"
            type="date"
        />
        <TextField
            :disabled="exp.current"
            label="End Date"
            v-model="exp.endDate"
            placeholder="DD/MM/YY"
            type="date"
        />

      </div>

      <!-- Bullets -->
      <div class="flex flex-col gap-2">
        <label class="block text-xs uppercase font-header text-gray-600 pl-2 tracking-widest">
          Bullet Points</label>
        <div
            v-for="(_, bulletIndex) in exp.bullets"
            :key="bulletIndex"
            class="flex gap-2 items-center"
        >
          <div class="flex-1">
          <TextField
              v-model="exp.bullets[bulletIndex]"
              data-testid="bulletPoint"
              placeholder="Ex:Architected the physical destruction of the Cyberdyne Systems primary development lab, preventing the deployment of the Skynet system."
              rows="3"
              isTextarea
          />
          </div>
        <div>
          <Button
              data-testid="removeBullet"
              @click="removeBullet(expIndex, bulletIndex)"
              variant="text"
              color="red"
              text=""
              icon="material-symbols-light:delete-outline"
          />
        </div>
        </div>
        <div class="flex">

          <Button
            data-testid="addBullet"
            @click="addBullet(expIndex)"
            variant="text"
            text="Add new bullet point"
            icon="material-symbols-light:format-list-bulleted-add"
        />


        </div>


      </div>
    </div>
    <Button
        data-testid="addExp"
        @click="addExp"
        variant="secondary"
        text="Add Experience"
        icon="material-symbols-light:note-stack-add-outline-sharp"

    />

  </section>
</template>