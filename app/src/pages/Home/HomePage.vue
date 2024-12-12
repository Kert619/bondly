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
import { onActivated, onDeactivated } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const authStore = useAuthStore();

type PostData = { postId: number; postUserId: number };

type LikerData = PostData & { likerId: number };

type CommenterData = PostData & { commenterId: number };

onActivated(() => {
  window.Echo.private('App.Models.User.1')
    .listen('PostLiked', (event: LikerData) => {
      $q.notify({
        message: `User ${event.likerId} liked your post ${event.postId}`,
        type: 'positive',
      });
    })
    .listen('PostCommented', (event: CommenterData) => {
      $q.notify({
        message: `User ${event.commenterId} commented on your post ${event.postId}`,
        type: 'positive',
      });
    });
});

onDeactivated(() => {
  window.Echo.leave('App.Models.User.1');
  console.log('Leaving channel');
});
</script>
