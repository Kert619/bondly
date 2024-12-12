<template>
  <header
    class="page-header absolute-top column"
    :class="[{ border: separator }]"
  >
    <div class="col row items-center" :class="$attrs.class">
      <slot />
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  separator?: boolean;
}>();
</script>

<style scoped lang="scss">
.body--light .border {
  border-bottom: 1px solid $grey-4;
}

.body--dark .border {
  border-bottom: 1px solid $grey-7;
}
</style>
