<template>
  <div class="image-grid">
    <div
      v-for="image in displayImages"
      :key="image.webPath"
      :style="gridItemStyle(image.aspectRatio)"
    >
      <img :src="image.webPath" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  images: { webPath: string; aspectRatio: number }[];
}>();

const displayImages = computed(() => {
  const images =
    props.images.length >= 5 ? props.images : props.images.slice(0, 5);

  return images;
});

// const isSquare = (aspectRatio: number) => {
//   return aspectRatio >= 0.7 && aspectRatio <= 1.3;
// };

const isWide = (aspectRatio: number) => {
  return aspectRatio >= 1.7;
};

const isSlightlyWide = (aspectRatio: number) => {
  return aspectRatio > 1.3 && aspectRatio < 1.7;
};

// const isTall = (aspectRatio: number) => {
//   return aspectRatio < 0.7;
// };

// const hasSquare = computed(() => {
//   return displayImages.value.some((image) => isSquare(image.aspectRatio));
// });

// const hasWide = computed(() => {
//   return displayImages.value.some((image) => isWide(image.aspectRatio));
// });

// const hasTall = computed(() => {
//   return displayImages.value.some((image) => isTall(image.aspectRatio));
// });

const getColumnSpanEnd = (aspectRatio: number) => {
  if (isSlightlyWide(aspectRatio)) {
    return 'span 4';
  }

  if (isWide(aspectRatio)) {
    return 'span 6';
  }

  return 'span 3';
};

const gridItemStyle = (aspectRatio: number) => {
  return {
    gridColumn: getColumnSpanEnd(aspectRatio),
  };
};
</script>

<style scoped lang="scss">
img {
  height: 100%;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-flow: dense;
  grid-auto-rows: 200px 200px;
  grid-template-rows: 200px 200px;
  gap: 5px;
}
</style>
