<template>
  <header class="page-header absolute-top column">
    <div
      class="col row items-center q-gutter-x-md q-px-md"
      :class="$attrs.class"
    >
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
