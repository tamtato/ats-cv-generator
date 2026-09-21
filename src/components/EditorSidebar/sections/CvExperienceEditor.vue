<script setup lang="ts">
import { useCvStore } from '../../../stores/cvStore.ts';

const cvStore = useCvStore();

const addJob = () => {
  cvStore.cvData.experience.push({
    id: String(Date.now()),
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    bullets: ['']
  });
};

const removeJob = (index: number) => {
  cvStore.cvData.experience.splice(index, 1);
};

const addBullet = (jobIndex: number) => {
  cvStore.cvData.experience[jobIndex].bullets.push('');
};

const removeBullet = (jobIndex: number, bulletIndex: number) => {
  cvStore.cvData.experience[jobIndex].bullets.splice(bulletIndex, 1);
};
</script>

<template>
  <section class="flex flex-col gap-4">
    <h3 class="font-semibold text-gray-700 border-b pb-1">Work Experience</h3>

    <div
        v-for="(job, jobIndex) in cvStore.cvData.experience"
        :key="job.id"
        class="p-4 bg-white border rounded shadow-sm relative flex flex-col gap-3"
    >
      <button
          data-testid="removeJob"
          @click="removeJob(jobIndex)"
          class="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs font-bold"
      >
        ✕ Remove Role
      </button>

      <div class="grid grid-cols-2 gap-3 mt-4">
        <div class="col-span-2">
          <label class="block text-xs font-medium text-gray-600 mb-1">Job Title</label>
          <input data-testid="jobTitle" type="text" v-model="job.title" class="w-full p-2 border rounded text-sm" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Company</label>
          <input data-testid="company" type="text" v-model="job.company" class="w-full p-2 border rounded text-sm" />
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
            <input data-testid="startDate" type="text" v-model="job.startDate" placeholder="Aug 2024" class="w-full p-2 border rounded text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-1">End Date</label>
            <input data-testid="endDate" type="text" v-model="job.endDate" placeholder="Present" class="w-full p-2 border rounded text-sm" />
          </div>
        </div>
      </div>

      <!-- Bullets -->
      <div class="flex flex-col gap-2">
        <label class="block text-xs font-medium text-gray-600">Bullet Points</label>
        <div
            v-for="(_, bulletIndex) in job.bullets"
            :key="bulletIndex"
            class="flex gap-2 items-start"
        >
          <textarea
              data-testid="bulletPoint"
              v-model="job.bullets[bulletIndex]"
              rows="2"
              class="w-full p-2 border rounded text-sm flex-1"
          ></textarea>
          <button
              data-testid="removeBullet"
              @click="removeBullet(jobIndex, bulletIndex)"
              class="text-gray-400 hover:text-red-500 p-1"
              aria-label="Remove bullet point"
          >
            ✕
          </button>
        </div>
        <button
            data-testid="addBullet"
            @click="addBullet(jobIndex)"
            class="text-xs text-blue-600 hover:underline self-start font-medium"
        >
          + Add Bullet Point
        </button>
      </div>
    </div>

    <button
        data-testid="addJob"
        @click="addJob"
        class="w-full py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded hover:bg-gray-50 hover:border-gray-400 transition text-sm font-medium"
    >
      + Add Role
    </button>
  </section>
</template>