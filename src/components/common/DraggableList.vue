<script setup lang="ts">
import { ref } from 'vue';
import {Icon} from "@iconify/vue";
import type {FormId} from "../../types/forms.ts";

const props = defineProps<{
  modelValue: string[];
  list: Record<string, { label: string; icon: string; id: FormId }>;
  activeId: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
  (e: 'select', id: string): void;
}>();

const draggedIndex = ref<number | null>(null);

const onDragStart = (index: number, event: DragEvent) => {
  draggedIndex.value = index;
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move';
  }
};

const onDrop = (dropIndex: number) => {
  if (draggedIndex.value === null) return;

  const newOrder = [...props.modelValue];
  const [movedItem] = newOrder.splice(draggedIndex.value, 1);
  newOrder.splice(dropIndex, 0, movedItem);

  emit('update:modelValue', newOrder);
  draggedIndex.value = null;
};
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <button
        v-for="(itemId, index) in modelValue"
        :key="itemId"
        draggable="true"
        @dragstart="onDragStart(index, $event)"
        @dragover.prevent
        @dragenter.prevent
        @drop="onDrop(index)"
        @click="emit('select', itemId)"
        :class="[
        'w-full outline-none flex items-center gap-3 p-3 transition-colors cursor-move border border-dashed border-gray-300 bg-gray-50 ',
        activeId === itemId ? 'text-indigo-600 border-indigo-500 ' : 'text-gray-800 hover:text-indigo-600 hover:border-indigo-500'
      ]"
    >
      <Icon icon="material-symbols-light:drag-indicator" class="w-6 h-6" />
      <Icon :icon="list[itemId]?.icon" class="w-6 h-6" />
      <span class="text-sm tracking-widest uppercase">{{ list[itemId]?.label }}</span>
    </button>
  </div>
</template>