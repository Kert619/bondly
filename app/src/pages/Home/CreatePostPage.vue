<template>
  <page-component>
    <page-header class="justify-between q-px-sm">
      <page-back-button to="/login" />
      <q-btn label="Post" no-caps unelevated color="primary" size="sm" />
    </page-header>
    <page-body>
      <div class="q-mt-md q-px-sm column q-gutter-y-sm">
        <UserProfileAvatar
          :src="authStore.userThumbnail"
          :name="authStore.fullName"
        />

        <q-input
          v-model="text"
          autogrow
          autofocus
          borderless
          placeholder="Share your ideas..."
          :input-style="{
            fontSize: '1.3rem',
            lineHeight: '1.5',
            maxHeight: '50vh',
          }"
        />
      </div>

      <q-separator />

      <q-list separator>
        <q-item clickable v-ripple>
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
import { useAuthStore } from 'src/stores/auth';
import { ref } from 'vue';
import UserProfileAvatar from 'components/Profile/UserProfileAvatar.vue';

const authStore = useAuthStore();
const text = ref('');
</script>
