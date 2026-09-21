<script setup lang="ts">

const triggerPrint = () => {
  window.print();
};
</script>

<template>
  <button
      data-testid="download-pdf-button"
      @click="triggerPrint"
      class="bg-gray-800 cursor-pointer text-white px-4 py-4 w-full shadow hover:bg-indigo-600 transition text-sm font-medium"
  >
    Download PDF
  </button>
</template>