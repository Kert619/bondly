<template>
  <div class="row items-center">
    <q-avatar size="sm">
      <ImageBase :src="src" transformations="n-small_thumbnail" />
    </q-avatar>
    <span v-if="name" style="margin-left: 0.5rem">{{ name }}</span>
  </div>
</template>

<script setup lang="ts">
import ImageBase from 'components/UI/ImageBase.vue';

defineProps<{
  src: string;
  name?: string;
}>();
</script>
