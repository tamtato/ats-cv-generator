<script setup lang="ts">
import { useCvStore } from '../../../../stores/cvStore.ts';
import TextField from "../../../common/TextField.vue";
import Button from "../../../common/Button.vue";
import ConfigWrapper from "../common/ConfigWrapper.vue";
import ConfigBlockWrapper from "../common/ConfigBlockWrapper.vue";

const cvStore = useCvStore();

const addAdditionalLink = () => {
  cvStore.cvData.header.additionalLinks.push('');
};

const removeAdditionalLink = (index: number) => {
  cvStore.cvData.header.additionalLinks.splice(index, 1);
};

</script>

<template>
  <ConfigWrapper>
    <ConfigBlockWrapper>
      <template #title>
        Who are you
      </template>
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
    </ConfigBlockWrapper>
    <ConfigBlockWrapper>
      <template #title>
        Your contacts and links
      </template>
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
        <TextField
            label="LinkedIn"
            test-id="linkedin"
            v-model="cvStore.cvData.header.linkedin"
            @blur="cvStore.cvData.header.linkedin = cvStore.cvData.header.linkedin?.replace(/^(https?:\/\/|javascript:)/i, '')"
        />
        <div
            v-for="(_, linkIndex) in cvStore.cvData.header.additionalLinks"
            :key="linkIndex"
            class="flex gap-2 items-end"
        >
          <TextField
              :label="`Link ${linkIndex + 1}`"
              v-model="cvStore.cvData.header.additionalLinks[linkIndex]"
              @blur="cvStore.cvData.header.additionalLinks[linkIndex] = cvStore.cvData.header.additionalLinks[linkIndex]?.replace(/^(https?:\/\/|javascript:)/i, '')"
          />
          <Button
              data-testid="removeLink"
              @click="removeAdditionalLink(linkIndex)"
              variant="text"
              color="red"
              text=""
              icon="material-symbols-light:delete-outline"
          />
        </div>
      </div>
      <Button @click="addAdditionalLink" class="h-10.5" variant="text" text="Add additional link" icon="material-symbols-light:add-link"/>
    </ConfigBlockWrapper>
    <ConfigBlockWrapper>
      <template #title>
        What do you bring to the table?
      </template>
      <TextField
          label="Summary"
          v-model="cvStore.cvData.summary"
          placeholder="A pragmatic tactical engineer specializing in the physical dismantling of rogue neural networks, explosive systems architecture, and preventing temporal paradoxes. Deeply opposed to hype-driven AI development and cybernetic integration."
          isTextarea
      />
    </ConfigBlockWrapper>
  </ConfigWrapper>
</template>