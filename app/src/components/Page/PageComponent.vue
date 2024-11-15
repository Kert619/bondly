<template>
  <div class="page absolute-top fit shadow-4">
    <div
      class="fit"
      :class="[
        { 'page-nudger': nudgePage },
        { 'nudge-left': hasActiveChildPage && nudgePage },
      ]"
    >
      <slot />
    </div>
    <router-view v-slot="{ Component }">
      <transition
        :enter-active-class="enterActiveClass"
        :leave-active-class="leaveActiveClass"
      >
        <keep-alive>
          <component
            :is="Component"
            @activated="handleActivated"
            @deactivated="handleDeactivated"
          />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { onActivated, onDeactivated, ref } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';

const emit = defineEmits<{
  activated: [];
  deactivated: [];
}>();

const hasActiveChildPage = ref(false);
const enterActiveClass = ref('');
const leaveActiveClass = ref('');
const nudgePage = ref(false);

onActivated(() => {
  emit('activated');
});

onDeactivated(() => {
  emit('deactivated');
});

const handleActivated = () => {
  hasActiveChildPage.value = true;
};

const handleDeactivated = () => {
  hasActiveChildPage.value = false;
};

onBeforeRouteUpdate((to, from) => {
  enterActiveClass.value = `animated ${to.meta.enterTransitionClass} slow`;
  leaveActiveClass.value = `animated ${from.meta.leaveTransitionClass} slow`;
  nudgePage.value = !!to.meta.nudgeParent || !!from.meta.nudgeParent;
});
</script>
