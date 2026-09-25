<script setup lang="ts">
import { useCvStore } from '../../../../stores/cvStore.ts';

const cvStore = useCvStore();

const addEducation = () => {
  cvStore.cvData.education.push({
    id: String(Date.now()),
    title: '',
    school: '',
    startDate: '',
    endDate: '',
    description: ''
  });
};

const removeEducation = (index: number) => {
  cvStore.cvData.education?.splice(index, 1);
};

</script>

<template>
  <section class="flex flex-col gap-4">
    <h3 class="font-semibold text-gray-700 border-b pb-1">Education</h3>

    <div
        v-for="(education, educationIndex) in cvStore.cvData.education"
        :key="education.id"
        class="p-4 bg-white border rounded shadow-sm relative flex flex-col gap-3"
    >
      <button
          data-testid="removeEducation"
          @click="removeEducation(educationIndex)"
          class="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs font-bold"
      >
        ✕ Remove Education
      </button>

      <div class="grid grid-cols-2 gap-3 mt-4">
        <div class="col-span-2">
          <label class="block text-xs font-medium text-gray-600 mb-1">Education Title</label>
          <input data-testid="title-education" type="text" v-model="education.title" class="w-full p-2 border rounded text-sm" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">School</label>
          <input data-testid="school-education" type="text" v-model="education.school" class="w-full p-2 border rounded text-sm" />
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
            <input data-testid="startDate-education" type="text" v-model="education.startDate" placeholder="Aug 2024" class="w-full p-2 border rounded text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">End Date</label>
            <input data-testid="endDate-education" type="text" v-model="education.endDate" placeholder="Present" class="w-full p-2 border rounded text-sm" />
          </div>
        </div>
      </div>
      <div>
        <label class="block text-xs font-medium text-gray-600 mb-1">Description</label>
        <textarea data-testid="description-education" v-model="education.description" rows="3" class="w-full p-2 border rounded text-sm"></textarea>
      </div>
    </div>

    <button
        data-testid="addEducation"
        @click="addEducation"
        class="w-full py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded hover:bg-gray-50 hover:border-gray-400 transition text-sm font-medium"
    >
      + Add Education
    </button>
  </section>
</template>