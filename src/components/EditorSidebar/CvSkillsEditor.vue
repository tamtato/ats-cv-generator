<script setup lang="ts">
import { useCvStore } from '../../stores/cvStore';

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
  <section class="flex flex-col gap-4">
    <h3 class="font-semibold text-gray-700 border-b pb-1">Technical Skills</h3>

    <div
        v-for="(skill, index) in cvStore.cvData.skills"
        :key="index"
        class="p-4 bg-white border rounded shadow-sm relative flex flex-col gap-3"
    >
      <button
          data-testid="removeSkill"
          @click="removeSkill(index)"
          class="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs font-bold"
      >
        ✕ Remove
      </button>

      <div class="mt-2">
        <label class="block text-xs font-medium text-gray-600 mb-1">Category (e.g., Languages, Frameworks)</label>
        <input data-testid="skillCategory" name="skillCategory" type="text" v-model="skill.category" class="w-full p-2 border rounded text-sm mb-3" />

        <label class="block text-xs font-medium text-gray-600 mb-1">Skills (comma separated)</label>
        <textarea data-testid="skillItems" name="skillItems" v-model="skill.items" rows="2" class="w-full p-2 border rounded text-sm"></textarea>
      </div>
    </div>

    <button
        data-testid="addSkill"
        @click="addSkill"
        class="w-full py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded hover:bg-gray-50 hover:border-gray-400 transition text-sm font-medium"
    >
      + Add Skill Category
    </button>
  </section>
</template>