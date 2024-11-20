<template>
  <page-component>
    <page-header separator class="justify-center">
      <div class="text-body2">Profile Setup</div>
    </page-header>
    <page-body>
      <div class="row justify-center q-pa-md">
        <q-form class="form-container q-gutter-y-md">
          <div class="column q-gutter-y-md items-center">
            <q-avatar size="128px">
              <img
                :src="croppedImage ? croppedImage : '/default-profile-256.png'"
              />
            </q-avatar>

            <image-picker v-if="!refresh" @selected="handleSelected" />
          </div>

          <q-input
            v-model="form.first_name"
            dense
            placeholder="First Name"
            label="First Name"
            readonly
          />

          <q-input
            v-model="form.last_name"
            dense
            placeholder="Last Name"
            label="Last Name"
            readonly
          />

          <div class="q-gutter-y-sm">
            <p class="text-body2 q-ma-none">Gender</p>
            <q-btn-toggle
              v-model="form.gender"
              size="sm"
              toggle-color="primary"
              :options="[
                { label: 'Male', value: Gender.Male },
                { label: 'Female', value: Gender.Female },
              ]"
            />
          </div>
        </q-form>
      </div>
    </page-body>

    <image-cropper
      v-if="imgSelected"
      :src="imgSelected"
      @cropped="handleImageCropped"
      @hide="handleImageCropperHide"
    />
  </page-component>
</template>

<script setup lang="ts">
import ImagePicker from 'components/UI/ImagePicker.vue';
import ImageCropper from 'components/UI/ImageCropper.vue';
import { nextTick, Ref, ref } from 'vue';
import { useAuthStore, UserProfile } from 'src/stores/auth';
import { Gender } from 'src/enums/gender';

const authStore = useAuthStore();
const imgSelected: Ref<string | null> = ref(null);
const croppedImage: Ref<string | null> = ref(null);
const refresh = ref(false);

const form: Ref<Partial<UserProfile>> = ref({
  first_name: authStore.userProfile?.first_name,
  last_name: authStore.userProfile?.last_name,
});

const handleSelected = (src: string) => {
  imgSelected.value = src;
  handleRefresh();
};

const handleImageCropped = (blob: Blob) => {
  const imageUrl = URL.createObjectURL(blob);
  croppedImage.value = imageUrl;
};

const handleImageCropperHide = () => {
  imgSelected.value = null;
};

const handleRefresh = async () => {
  refresh.value = true;
  await nextTick();
  refresh.value = false;
};
</script>

<style scoped lang="scss">
.form-container {
  width: 100%;
  max-width: 400px;
}
</style>
