<template>
  <div>
    <q-btn
      @click="triggerFileInput"
      no-caps
      unelevated
      label="Upload"
      color="primary"
      size="sm"
      icon="attach_file"
    />
    <!-- Hidden file input -->
    <input
      type="file"
      ref="fileRef"
      class="hidden"
      accept="image/*"
      @change="onFileChange"
    />
  </div>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from 'vue';

const emit = defineEmits<{
  selected: [src: string];
}>();

const fileRef = ref<HTMLInputElement | null>(null);
const selectedFile: Ref<File | undefined | null> = ref(null);
const imgSrc: Ref<string | null | undefined | ArrayBuffer> = ref(null);
const fileReader = new FileReader();

fileReader.onload = (ev: ProgressEvent<FileReader>) => {
  imgSrc.value = ev.target?.result;

  if (imgSrc.value && selectedFile.value) {
    emit('selected', imgSrc.value as string);
  }
};

// Function to trigger the file input click
const triggerFileInput = () => {
  fileRef.value?.click();
};

// Function to handle file input change
const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  selectedFile.value = target.files?.[0];
};

watch(selectedFile, (newVal) => {
  if (newVal) {
    fileReader.readAsDataURL(newVal);
  }
});
</script>
