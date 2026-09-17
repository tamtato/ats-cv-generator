<script setup>
import { ref, shallowRef, watch, onMounted, nextTick } from 'vue';
import { Previewer } from 'pagedjs';
import Index from './BasicTheme/index.vue';
import { useCvStore } from '../../stores/cvStore.ts';

const cvStore = useCvStore();
const sourceContent = ref(null);
const pagedContainer = ref(null);
const previewer = shallowRef(null);
let renderTimeout = null;
let isRendering = false;

const renderPages = async () => {
  if (isRendering) return;

  clearTimeout(renderTimeout);
  renderTimeout = setTimeout(async () => {
    isRendering = true;
    await nextTick();

    if (pagedContainer.value) {
      pagedContainer.value.innerHTML = '';
    }
    document.querySelectorAll('style[data-pagedjs-inserted-styles]').forEach(el => el.remove());

    const clone = sourceContent.value.cloneNode(true);
    clone.style.display = 'block';

    // Strip Vue comment nodes to prevent Paged.js tree-walker crashes
    const treeWalker = document.createTreeWalker(clone, NodeFilter.SHOW_COMMENT, null, false);
    const comments = [];
    let currentNode;
    while ((currentNode = treeWalker.nextNode())) {
      comments.push(currentNode);
    }
    comments.forEach(node => node.parentNode?.removeChild(node));

    // Prevent Paged.js from parsing Tailwind v4 CSS and crashing.
    // We supply ONLY the pagination/fragmentation rules it strictly needs to calculate pages.
    // All visual Tailwind styling will still be natively rendered by the browser!
    const pagedCss = `
      @page { size: A4; margin: 1.5cm; }
      .break-inside-avoid { break-inside: avoid; }
    `;
    const blob = new Blob([pagedCss], { type: 'text/css' });
    const cssUrl = URL.createObjectURL(blob);

    previewer.value = new Previewer();

    try {
      // Passing cssUrl prevents Paged.js from scanning document.styleSheets and crashing on Tailwind
      await previewer.value.preview(clone, [cssUrl], pagedContainer.value);
    } catch (error) {
      console.error("Paged.js rendering failed:", error);
    } finally {
      URL.revokeObjectURL(cssUrl); // Clean up memory
      isRendering = false;
    }
  }, 400);
};

watch(() => cvStore.cvData, () => {
  renderPages();
}, { deep: true });

onMounted(() => {
  renderPages();
});

//TODO: Add theme switching support in the future. For now, we only support BasicCv.
</script>

<template>
  <div class="h-full relative overflow-hidden bg-gray-300 print:bg-white flex flex-col">
    <!-- Target for Paged.js output -->
    <div
        ref="pagedContainer"
        class="paged-preview-container overflow-y-auto w-full h-full pb-10 print:overflow-visible print:pb-0"
    ></div>

    <!-- Hidden Vue Source -->
    <div class="hidden">
      <div ref="sourceContent">
        <Index />
      </div>
    </div>
  </div>
</template>