<template>
  <page-component>
    <page-header separator>
      <div class="full-width row justify-between q-px-sm">
        <app-logo class="text-h6" />
        <div class="row items-center q-gutter-x-sm">
          <q-btn flat dense icon="search" round />
          <q-btn flat dense icon="chat" round />
          <q-btn flat dense round>
            <q-avatar size="sm">
              <ImageBase
                :src="authStore.userThumbnail"
                transformations="n-small_thumbnail"
              />
            </q-avatar>
          </q-btn>
        </div>
      </div>
    </page-header>
    <page-body>
      <PostIndex />
    </page-body>
  </page-component>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth';
import ImageBase from 'components/UI/ImageBase.vue';
import PostIndex from 'src/components/Post/PostIndex.vue';

const authStore = useAuthStore();
</script>
