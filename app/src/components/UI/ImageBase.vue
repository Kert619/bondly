<template>
  <q-img
    :src="actualSrc"
    :placeholder-src="placeholderSrc"
    loading="lazy"
    initial-ratio="1"
    no-transition
    no-spinner
  />
</template>

<script setup lang="ts">
import ImageKit from 'imagekit-javascript';

const props = defineProps<{
  src: string;
  transformations?: string;
}>();

const imageKit = new ImageKit({
  urlEndpoint: import.meta.env.VITE_IK_ENDPOINT as string,
  publicKey: import.meta.env.VITE_IK_PUBLIC_KEY,
});

// URLs for blurred placeholder and actual image
const placeholderSrc = imageKit.url({
  path: props.src,
  urlEndpoint: import.meta.env.VITE_IK_ENDPOINT,
  transformation: [{ raw: 'n-blur' }], // Low-quality blurred placeholder
});

const actualSrc = imageKit.url({
  path: props.src,
  urlEndpoint: import.meta.env.VITE_IK_ENDPOINT, // Full-quality image
  transformation: [{ raw: props.transformations ?? '' }],
});
</script>
