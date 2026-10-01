<script setup lang="ts">
</script>
<template>
  <div class="relative flex flex-col gap-4  p-4 pt-1 border border-gray-100">
    <div class="flex items-center justify-between h-10.5">
      <h3 class="flex-1 text-indigo-600 font-header uppercase tracking-widest">
        <slot name="title"/>
      </h3>
      <div class="justify-end">
        <slot name="titleAction"/>
      </div>
    </div>
    <slot/>
  </div>
</template>