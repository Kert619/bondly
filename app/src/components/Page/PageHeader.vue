<template>
  <header class="page-header absolute-top column">
    <div class="col row items-center" :class="$attrs.class">
      <slot />
    </div>
    <q-separator v-if="separator" />
  </header>
</template>

<script setup lang="ts">
defineProps<{
  separator?: boolean;
}>();
</script>
