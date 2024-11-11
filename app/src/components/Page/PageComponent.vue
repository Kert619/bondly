<template>
  <div class="page absolute-top fit shadow-4">
    <div
      class="fit"
      :class="[
        { 'page-nudger': route.meta.nudgePage },
        { 'nudge-left': hasActiveChildPage && route.meta.nudgePage },
      ]"
    >
      <slot />
    </div>
    <router-view v-slot="{ Component }">
      <transition
        :enter-active-class="enterTransitionClass"
        :leave-active-class="leaveTransitionClass"
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
import { computed, onActivated, onDeactivated, ref } from 'vue';
import { useRoute } from 'vue-router';

const emit = defineEmits<{
  activated: [];
  deactivated: [];
}>();

const route = useRoute();
const hasActiveChildPage = ref(false);

onActivated(() => {
  emit('activated');
});

onDeactivated(() => {
  emit('deactivated');
});

const enterTransitionClass = computed(() => {
  if (route.meta.childTransitionEnterClass) {
    return `animated ${route.meta.childTransitionEnterClass}`;
  } else {
    return 'animated slideInRight';
  }
});

const leaveTransitionClass = computed(() => {
  if (route.meta.childTransitionLeaveClass) {
    return `animated ${route.meta.childTransitionLeaveClass}`;
  } else {
    return 'animated slideOutRight';
  }
});
</script>
