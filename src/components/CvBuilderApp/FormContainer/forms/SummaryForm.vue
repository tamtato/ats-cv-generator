<script setup lang="ts">
import { useCvStore } from '../../../../stores/cvStore.ts';

const cvStore = useCvStore();
</script>

<template>
  <section class="flex flex-col gap-3">
    <h3 class="font-semibold text-gray-700 border-b pb-1">Professional Summary</h3>
    <textarea data-testid="summary" v-model="cvStore.cvData.summary" rows="3" class="w-full p-2 border rounded text-sm"></textarea>
  </section>
</template>