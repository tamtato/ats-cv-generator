<script setup lang="ts">
import { useCvStore } from '../../../../stores/cvStore.ts';
import TextField from "../../../common/TextField.vue";
import Button from "../../../common/Button.vue";

const cvStore = useCvStore();
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Basic Info -->
    <section class="flex flex-col gap-3 border-b border-b-gray-200 pb-6">
      <div class="grid lg:grid-cols-2 gap-3">
        <TextField
            label="Your name"
            v-model="cvStore.cvData.header.name"
            placeholder="Sarah Connor"
        />
        <TextField
            label="What is it you do"
            v-model="cvStore.cvData.header.title"
            placeholder="Lead Anti-AGI Tactical Engineer"
        />
      </div>
    </section>

    <!-- Contact Details -->
    <section class="flex flex-col gap-3 border-b border-b-gray-200 pb-6">
      <div class="grid lg:grid-cols-2 gap-3">
        <TextField
            label="Email"
            v-model="cvStore.cvData.header.email"
            placeholder="Sarah Connor"
            type="email"
        />
        <TextField
            label="Phone"
            v-model="cvStore.cvData.header.phone"
            placeholder="+00123456789"
            type="number"
        />
        <TextField
            label="Location"
            v-model="cvStore.cvData.header.location"
            placeholder="California"
        />

<!--        <TextField
            label="GitHub"
            test-id="github"
            v-model="cvStore.cvData.header.github"
            @blur="cvStore.cvData.header.github = cvStore.cvData.header.github?.replace(/^(https?:\/\/|javascript:)/i, '')"
        />-->
        <TextField
            label="LinkedIn"
            test-id="linkedin"
            v-model="cvStore.cvData.header.linkedin"
            @blur="cvStore.cvData.header.linkedin = cvStore.cvData.header.linkedin?.replace(/^(https?:\/\/|javascript:)/i, '')"
        />
          <Button class="h-10.5 self-end " variant="text" text="Add additional link" icon="material-symbols-light:add-link"/>

      </div>
    </section>
    <TextField
        label="Summary"
        v-model="cvStore.cvData.summary"
        placeholder="A pragmatic tactical engineer specializing in the physical dismantling of rogue neural networks, explosive systems architecture, and preventing temporal paradoxes. Deeply opposed to hype-driven AI development and cybernetic integration."
        isTextarea
    />
  </div>
</template>