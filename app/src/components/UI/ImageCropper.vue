<template>
  <q-dialog v-model="show" full-height no-shake @hide="emit('hide')">
    <q-card flat square class="column">
      <div class="col">
        <img ref="imgRef" :src="src" />
      </div>

      <div class="col-auto row justify-center q-pa-md q-gutter-md">
        <q-btn
          label="Save"
          color="positive"
          icon="crop"
          no-caps
          unelevated
          @click="handleImageCropped"
        />
        <q-btn
          label="Reset"
          color="negative"
          icon="cached"
          no-caps
          unelevated
          @click="cropper?.reset()"
        />
        <q-btn label="Back" flat icon="arrow_back_ios" @click="hideDialog" />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, Ref, ref } from 'vue';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { QDialog } from 'quasar';

const emit = defineEmits<{
  hide: [];
  cropped: [blob: Blob];
}>();

defineProps<{
  src: string;
}>();

const show = ref(true);
const imgRef: Ref<HTMLImageElement | null> = ref(null);
let cropper: Cropper | null;

onMounted(() => {
  initializeCropper();
});

onUnmounted(() => {
  cropper?.destroy();
});

const initializeCropper = () => {
  nextTick(() => {
    if (imgRef.value) {
      cropper = new Cropper(imgRef.value, {
        aspectRatio: 1,
        viewMode: 1,
        background: false,
        dragMode: 'move',
        cropBoxResizable: false,
        cropBoxMovable: false,
        guides: false,
      });
    }
  });
};

const hideDialog = () => {
  emit('hide');
};

const handleImageCropped = () => {
  if (cropper) {
    cropper
      .getCroppedCanvas({
        width: 256,
        height: 256,
      })
      .toBlob((blob) => {
        emit('cropped', blob as Blob);
        emit('hide');
      }, 'image/jpeg');
  }
};
</script>

<style scoped lang="scss">
.q-card {
  width: 100%;
  max-width: 400px;
}

img {
  width: 100%;
  height: 100%;
}
</style>
