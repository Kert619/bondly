<template>
  <q-btn flat dense no-caps icon="arrow_back_ios" :label="label" :to="to" />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    to: string;
  }>(),
  {
    label: 'Back',
  }
);
</script>
