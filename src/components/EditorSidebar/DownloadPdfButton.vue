<script setup lang="ts">

const triggerPrint = () => {
  window.print();
};
</script>

<template>
  <button
      data-testid="download-pdf-button"
      @click="triggerPrint"
      class="bg-gray-900 text-white px-4 py-2 rounded shadow hover:bg-gray-800 transition text-sm font-medium"
  >
    Download PDF
  </button>
</template>