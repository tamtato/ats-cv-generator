<script setup lang="ts">
defineProps<{ header: string }>();
</script>

<!-- CvSectionWrapper.vue -->
<template>
  <div>
    <h3 class="w-full text-[14px]"
        style="
          color: var(--color-header-with-color);
          background-color: var(--bg-section-header);
          font-weight: var(--font-weight-header);
          text-transform: var(--text-transform-header);
          letter-spacing: var(--tracking-header);
          border-bottom: var(--border-bottom-header);
        ">
      <!-- Use the new variable here -->
      <span style="background-color: var(--bg-section-header-inner);" class="h-full block w-fit pr-2">
        {{ header }}
      </span>
    </h3>
    <slot />
  </div>
</template>