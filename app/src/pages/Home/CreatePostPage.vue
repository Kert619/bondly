<template>
  <page-component>
    <page-header class="justify-between q-px-sm" separator>
      <page-back-button to="/login" />
      <q-btn label="Post" no-caps unelevated color="primary" size="sm" />
    </page-header>
    <page-body style="padding-bottom: 96px">
      <div class="q-mt-md q-px-sm column q-gutter-y-sm">
        <!-- USER AVATAR -->
        <UserProfileAvatar
          :src="authStore.userThumbnail"
          :name="authStore.fullName"
        />

        <!-- USER CONTENT -->
        <q-input
          v-model="text"
          autogrow
          autofocus
          borderless
          placeholder="Share your ideas..."
        />
      </div>

      <!-- UPLOADED IMAGAES -->
      <ImageGrid :images="images" />

      <!-- BUTTONS FIXED AT BOTTOM -->
      <q-list separator class="fixed-bottom">
        <q-separator />
        <q-item clickable v-ripple @click="pickImages">
          <q-item-section avatar>
            <q-icon name="filter" color="positive" />
          </q-item-section>
          <q-item-section>Photos</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="photo_camera" color="info" />
          </q-item-section>
          <q-item-section>Camera</q-item-section>
        </q-item>
      </q-list>
    </page-body>
  </page-component>
</template>

<script setup lang="ts">
import { Camera } from '@capacitor/camera';
import { useAuthStore } from 'src/stores/auth';
import { Ref, ref } from 'vue';
import UserProfileAvatar from 'components/Profile/UserProfileAvatar.vue';
import ImageGrid from 'components/UI/ImageGrid.vue';
import { ImageGridType } from 'src/global-types/image-grid-type';

const authStore = useAuthStore();
const text = ref('');
const images: Ref<ImageGridType[]> = ref([]);

const pickImages = async () => {
  try {
    const result = await Camera.pickImages({});
    images.value = await Promise.all(
      result.photos.map(async (photo) => {
        const aspectRatio = await getImageAspectRatio(photo.webPath);
        return { webPath: photo.webPath, aspectRatio, style: {} };
      })
    );

    console.log(images.value);
  } catch (error) {}
};

const getImageAspectRatio = async (imagePath: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      //once the image is loaded, get the natural width and height
      const ratio = img.naturalWidth / img.naturalHeight;
      resolve(ratio);
    };

    img.onerror = () => reject(new Error('Failed to load image'));

    img.src = imagePath;
  });
};
</script>
