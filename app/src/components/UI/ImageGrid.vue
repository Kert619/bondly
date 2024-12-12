<template>
  <div class="image-grid" :class="imageGridClass">
    <div
      v-for="image in displayImages"
      :key="image.webPath"
      :style="image.style"
    >
      <img :src="image.webPath" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ImageGridType } from 'src/global-types/image-grid-type';
import { computed } from 'vue';

const props = defineProps<{
  images: ImageGridType[];
}>();

const displayImages = computed(() => {
  if (props.images.length == 0) return [];

  const images =
    props.images.length >= 5 ? props.images : props.images.slice(0, 5);

  const imagesCount = images.length;

  if (imagesCount == 3 || imagesCount == 4) {
    let marked = false;
    const mappedImages = images.map((image) => {
      if ((isWide(image.aspectRatio) || isTall(image.aspectRatio)) && !marked) {
        marked = true;
        return { ...image, style: { gridArea: 'image1' } };
      }

      return image;
    });
    if (!marked) mappedImages[0].style.gridArea = 'image1';

    mappedImages[1].style.gridArea = 'image2';
    mappedImages[2].style.gridArea = 'image3';
    if (imagesCount == 4) mappedImages[3].style.gridArea = 'image4';

    return mappedImages;
  }

  return images;
});

const imageGridClass = computed(() => {
  const imagesCount = displayImages.value.length;

  if (imagesCount == 2) {
    if (hasWide.value) return 'two layout-2';
    return 'two layout-1';
  }

  if (imagesCount == 3) {
    if (hasTall.value) return 'three layout-1';
    return 'three layout-2';
  }

  if (imagesCount == 4) {
    if (hasTall.value) return 'four layout-2';
    if (hasWide.value) return 'four layout-3';
    return 'four layout-1';
  }

  return 'one';
});

const isWide = (aspectRatio: number) => {
  return aspectRatio >= 1.7;
};

const isTall = (aspectRatio: number) => {
  return aspectRatio < 0.7;
};

const hasWide = computed(() => {
  return displayImages.value.some((image) => isWide(image.aspectRatio));
});

const hasTall = computed(() => {
  return displayImages.value.some((image) => isTall(image.aspectRatio));
});
</script>

<style scoped lang="scss">
img {
  height: 100%;
  width: 100%;
}

.image-grid {
  display: grid;
  gap: 3px;
}

.image-grid.one {
  grid-template-columns: 1;
}

.image-grid.two.layout-1 {
  grid-template-columns: repeat(2, 1fr);
}

.image-grid.two.layout-2 {
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 24vh);
}

.image-grid.three.layout-1 {
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 24vh);
  grid-template-areas:
    'image1 image1 image1 image2 image2'
    'image1 image1 image1 image3 image3';
}

.image-grid.three.layout-2 {
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 16vh);
  grid-template-areas:
    'image1 image1'
    'image1 image1'
    'image2 image3';
}

.image-grid.four.layout-1 {
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 24vh);
  grid-template-areas:
    'image1 image2'
    'image3 image4';
}

.image-grid.four.layout-2 {
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 16vh);
  grid-template-areas:
    'image1 image1 image2'
    'image1 image1 image3'
    'image1 image1 image4';
}

.image-grid.four.layout-3 {
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 16vh);
  grid-template-areas:
    'image1 image1 image1'
    'image1 image1 image1'
    'image2 image3 image4';
}
</style>
