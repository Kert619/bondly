<template>
  <div class="row items-center q-gutter-sm">
    <div class="col-auto">
      <q-btn dense flat round no-caps>
        <UserProfileAvatar :src="authStore.userThumbnail" />
      </q-btn>
    </div>

    <div class="col">
      <q-btn
        dense
        rounded
        outline
        no-caps
        label="Share your ideas here"
        class="full-width"
        to="/home/create-post"
      />
    </div>

    <div class="col-auto">
      <q-btn
        dense
        icon="filter"
        flat
        round
        color="positive"
        @click="pickImages"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth';
import UserProfileAvatar from 'components/Profile/UserProfileAvatar.vue';
import { Camera } from '@capacitor/camera';

const authStore = useAuthStore();

const pickImages = async () => {
  const result = await Camera.pickImages({});
  console.log(result.photos);
};
</script>
