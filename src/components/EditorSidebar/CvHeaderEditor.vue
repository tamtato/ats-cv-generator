<script setup lang="ts">
import { useCvStore } from '../../stores/cvStore';

const cvStore = useCvStore();
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Basic Info -->
    <section class="flex flex-col gap-3">
      <h3 class="font-semibold text-gray-700 border-b pb-1">Basic Info</h3>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
          <input data-testid="fullName" type="text" v-model="cvStore.cvData.header.name" maxlength="100" class="w-full p-2 border rounded text-sm" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Target Title</label>
          <input data-testid="title" type="text" v-model="cvStore.cvData.header.title" maxlength="100" class="w-full p-2 border rounded text-sm" />
        </div>
      </div>
    </section>

    <!-- Contact Details -->
    <section class="flex flex-col gap-3">
      <h3 class="font-semibold text-gray-700 border-b pb-1">Contact</h3>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Email</label>
          <input data-testid="email" type="email" v-model="cvStore.cvData.header.email" maxlength="100" class="w-full p-2 border rounded text-sm" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Phone</label>
          <input data-testid="phone" type="text" v-model="cvStore.cvData.header.phone" maxlength="30" class="w-full p-2 border rounded text-sm" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Location</label>
          <input data-testid="location" type="text" v-model="cvStore.cvData.header.location" maxlength="100" class="w-full p-2 border rounded text-sm" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">GitHub</label>
          <input
              data-testid="github"
              type="text"
              v-model="cvStore.cvData.header.github"
              @blur="cvStore.cvData.header.github = cvStore.cvData.header.github?.replace(/^(https?:\/\/|javascript:)/i, '')"
              maxlength="100"
              class="w-full p-2 border rounded text-sm"
          />
        </div>
        <div class="col-span-2">
          <label class="block text-xs font-medium text-gray-600 mb-1">LinkedIn</label>
          <input
              data-testid="linkedin"
              type="text"
              v-model="cvStore.cvData.header.linkedin"
              @blur="cvStore.cvData.header.linkedin = cvStore.cvData.header.linkedin?.replace(/^(https?:\/\/|javascript:)/i, '')"
              maxlength="100"
              class="w-full p-2 border rounded text-sm"
          />
        </div>
      </div>
    </section>
  </div>
</template>