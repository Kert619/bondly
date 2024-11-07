<template>
  <q-scroll-area class="page-body absolute-top fit">
    <div v-if="!removeSpaceHeader" class="page-body-spacer-header"></div>
    <slot />
    <div v-if="!removeSpaceFooter" class="page-body-spacer-footer"></div>
  </q-scroll-area>
</template>

<script setup lang="ts">
defineProps<{
  removeSpaceHeader?: boolean;
  removeSpaceFooter?: boolean;
}>();
</script>
