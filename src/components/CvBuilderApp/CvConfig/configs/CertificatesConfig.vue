<script setup lang="ts">
import { useCvStore } from '../../../../stores/cvStore.ts';
import TextField from "../../../common/TextField.vue";
import Button from "../../../common/Button.vue";
import ConfigBlockWrapper from "../common/ConfigBlockWrapper.vue";
import ConfigWrapper from "../common/ConfigWrapper.vue";

const cvStore = useCvStore();

const addCertificate = () => {
  cvStore.cvData.certificates.push({
    id: String(Date.now()),
    title: '',
    grade: '',
    date: '',
    description: ''
  });
};

const removeCertificate = (index: number) => {
  cvStore.cvData.certificates?.splice(index, 1);
};

</script>
<template>
  <ConfigWrapper>
    <ConfigBlockWrapper
        v-for="(certificate, certificateIndex) in cvStore.cvData.certificates"
        :key="certificate.id">
      <template #title>
        Certificate {{certificateIndex + 1}}
      </template>
      <template #titleAction>
        <Button
            data-testid="removeCertificate"
            @click="removeCertificate(certificateIndex)"
            variant="text"
            color="red"
            text=""
            icon="material-symbols-light:delete-outline"
        />
      </template>
      <TextField
          label="Certificate Title"
          v-model="certificate.title"
          placeholder="Ex: Advanced Tactical Engineering"
      />
      <div class="grid lg:grid-cols-2 gap-3">
        <TextField
            label="Grade"
            v-model="certificate.grade"
            placeholder="Ex: Pass"
        />
        <TextField
            label="Date Received"
            v-model="certificate.date"
            placeholder="DD/MM/YY"
            type="date"
        />
      </div>
      <TextField
          label="Description"
          v-model="certificate.description"
          placeholder="Ex: Completed an intensive program focused on guerrilla tactics, cybernetic countermeasures, and temporal anomaly navigation."
          isTextarea
      />
    </ConfigBlockWrapper>
    <Button
        data-testid="addCertificate"
        variant="secondary"
        text="Add Certificate"
        @click="addCertificate"
        icon="material-symbols-light:note-stack-add-outline-sharp"
    />
  </ConfigWrapper>
</template>