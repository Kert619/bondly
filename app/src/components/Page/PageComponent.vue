<template>
  <div class="page absolute-top fit shadow-4">
    <div class="page-nudger fit" :class="{ 'nudge-left': hasActiveChildPage }">
      <slot />
    </div>
    <router-view v-slot="{ Component }">
      <transition
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutRight"
      >
        <keep-alive>
          <component
            :is="Component"
            @activated="hasActiveChildPage = true"
            @deactivated="hasActiveChildPage = false"
          />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { onActivated, onDeactivated, ref } from 'vue';

const emit = defineEmits<{
  activated: [];
  deactivated: [];
}>();

const hasActiveChildPage = ref(false);

onActivated(() => {
  emit('activated');
});

onDeactivated(() => {
  emit('deactivated');
});
</script>
