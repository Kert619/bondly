<template>
  <q-scroll-area ref="scrollRef" class="page-body absolute-top fit">
    <div v-if="!removeSpaceHeader" class="page-body-spacer-header"></div>
    <slot />
    <div v-if="!removeSpaceFooter" class="page-body-spacer-footer"></div>
  </q-scroll-area>
</template>

<script setup lang="ts">
import { EventBus, QScrollArea } from 'quasar';
import { EventBusType } from 'src/boot/event-bus';
import { inject, ref, Ref } from 'vue';
import { useRoute } from 'vue-router';

defineProps<{
  removeSpaceHeader?: boolean;
  removeSpaceFooter?: boolean;
}>();

const route = useRoute();
const bus = inject<EventBus<EventBusType>>('bus');
const scrollRef: Ref<QScrollArea | null> = ref(null);

bus?.on('routeChanged', (path: string) => {
  if (route.path == path) {
    scrollRef.value?.setScrollPosition('vertical', 0, 500);
  }
});
</script>
