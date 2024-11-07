<template>
  <header
    class="page-header absolute-top row items-center q-gutter-x-sm q-px-md"
    :class="[{ 'header-shadow': separator }]"
  >
    <slot />
  </header>
</template>

<script setup lang="ts">
defineProps<{
  separator?: boolean;
}>();
</script>

<style scoped lang="scss">
.body--light .header-shadow {
  border-bottom: 1px solid $grey-4;
}

.body--dark .header-shadow {
  border-bottom: 1px solid $grey-9;
}
</style>
