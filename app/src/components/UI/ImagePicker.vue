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
      :disable="disable"
    />
    <!-- Hidden file input -->
    <input
      type="file"
      ref="fileRef"
      class="hidden"
      accept="image/*"
      :multiple="multiple"
      @change="onFileChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  selected: [files: FileList];
}>();

defineProps<{
  multiple?: boolean;
  disable?: boolean;
}>();

const fileRef = ref<HTMLInputElement | null>(null);

// Function to trigger the file input click
const triggerFileInput = () => {
  fileRef.value?.click();
};

// Function to handle file input change
const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) emit('selected', target.files);
};
</script>
