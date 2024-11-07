<template>
  <div class="page absolute-top fit">
    <slot />
    <router-view v-slot="{ Component }">
      <transition
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutRight"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>
