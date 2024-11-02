<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition
          enter-active-class="animated slideInRight"
          leave-active-class="animated slideOutRight"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>
