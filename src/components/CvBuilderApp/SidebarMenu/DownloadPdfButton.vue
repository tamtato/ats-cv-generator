<script setup lang="ts">
import Button from "../../common/Button.vue";

const triggerPrint = () => {
  window.print();
};
</script>

<template>
  <Button
      data-testid="download-pdf-button"
      @click="triggerPrint"
      variant="primary"
      text="Download PDF"
      icon="material-symbols-light:download-2"
  />
</template>