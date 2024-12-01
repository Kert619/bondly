<template>
  <page-component>
    <page-header separator class="justify-center">
      <div class="text-body2">Profile Setup</div>
    </page-header>
    <page-body class="q-px-md">
      <q-form class="q-gutter-y-md absolute-center full-width">
        <div class="column q-gutter-y-md items-center">
          <q-avatar size="128px">
            <img
              :src="croppedImage ? croppedImage : '/default-profile-256.png'"
            />
          </q-avatar>

          <image-picker
            v-if="!refresh"
            :disable="loading"
            @selected="handleSelected"
          />
        </div>

        <div
          class="row justify-center items-center q-gutter-x-sm"
          v-if="loading"
        >
          <span v-if="uploading">Uploading...</span>
          <span v-else-if="saving">Saving...</span>
          <q-circular-progress
            indeterminate
            rounded
            size="md"
            color="primary"
          />
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

        <SelectBase
          v-model="form.gender"
          label="Gender"
          :options="genderOptions"
        />

        <SelectBase v-model="form.mood" label="Mood" :options="moodOptions" />

        <div class="row justify-center">
          <q-btn
            size="sm"
            color="positive"
            label="Proceed"
            icon="arrow_forward_ios"
            unelevated
            no-caps
            :disable="loading"
            @click="submit"
          />
        </div>
      </q-form>
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
import { computed, nextTick, Ref, ref } from 'vue';
import { useAuthStore, UserProfile } from 'src/stores/auth';
import { Mood } from 'src/enums/mood';
import SelectBase from 'components/UI/SelectBase.vue';
import { moodOptions } from 'src/constants/mood-options';
import { genderOptions } from 'src/constants/gender-options';
import { useImageKit } from 'src/composables/useImageKit';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const { upload } = useImageKit();
const imgSelected: Ref<string | null> = ref(null);
const croppedImage: Ref<string | null> = ref(null);
let imageSelectedFile: File | null = null;
let croppedImageFile: File | null = null;
const uploading = ref(false);
const saving = ref(false);
const refresh = ref(false);

const form: Ref<Partial<UserProfile>> = ref({
  first_name: authStore.userProfile?.first_name,
  last_name: authStore.userProfile?.last_name,
  mood: Mood.All,
});

const loading = computed(() => {
  return uploading.value || saving.value;
});

const handleSelected = (files: FileList) => {
  imageSelectedFile = files[0];
  imgSelected.value = URL.createObjectURL(imageSelectedFile);
  handleRefresh();
};

const handleImageCropped = (blob: Blob) => {
  if (!imageSelectedFile) return;
  const imageUrl = URL.createObjectURL(blob);
  croppedImage.value = imageUrl;
  croppedImageFile = new File([blob], imageSelectedFile.name, {
    type: blob.type,
  });
};

const handleImageCropperHide = () => {
  imgSelected.value = null;
};

const handleRefresh = async () => {
  refresh.value = true;
  await nextTick();
  refresh.value = false;
};

const submit = async () => {
  if (loading.value) return;

  const [imageFileName] = await uploadImages();
  if (imageFileName) form.value.profile_photo = imageFileName;

  saving.value = true;
  const response = await authStore.updateUserProfile(form.value);
  authStore.userProfile = response.data;
  saving.value = false;

  router.replace('/home');
};

const uploadImages = async () => {
  let croppedImageFileName;
  let originalImageFileName;

  if (croppedImageFile && imageSelectedFile) {
    uploading.value = true;

    const fileName = `${Date.now()}-${imageSelectedFile.name}}`;

    const cropped = await upload(
      croppedImageFile as File,
      fileName,
      '/Users_Profile/Profile_Photos/Cropped'
    );
    const original = await upload(
      imageSelectedFile as File,
      fileName,
      '/Users_Profile/Profile_Photos/Original'
    );

    croppedImageFileName = cropped.name;
    originalImageFileName = original.name;
    uploading.value = false;
  }

  return croppedImageFileName && originalImageFileName
    ? [croppedImageFileName, originalImageFileName]
    : [];
};
</script>
