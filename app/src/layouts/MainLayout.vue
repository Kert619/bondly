<template>
  <q-layout view="hHh lpR fFf">
    <transition
      enter-active-class="animated slideInUp"
      leave-active-class="animated slideOutDown"
    >
      <q-footer bordered v-if="!useHideFooter()">
        <q-tabs dense no-caps switch-indicator align="justify">
          <q-route-tab
            icon="home"
            label="Home"
            to="/home"
            @click="handleRouteChanged('/home')"
          />
          <q-route-tab
            icon="video_library"
            label="Videos"
            to="/videos"
            @click="handleRouteChanged('/videos')"
          />
          <q-route-tab
            icon="notifications"
            label="Notifications"
            to="/notifications"
            @click="handleRouteChanged('/notifications')"
          />
          <q-route-tab
            icon="public"
            label="Public"
            to="/public"
            @click="handleRouteChanged('/public')"
          />
          <q-route-tab
            icon="calendar_month"
            label="Events"
            to="/events"
            @click="handleRouteChanged('/events')"
          />
        </q-tabs>
      </q-footer>
    </transition>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { EventBus } from 'quasar';
import { EventBusType } from 'src/boot/event-bus';
import { useHideFooter } from 'src/composables/useHideFooter';
import { inject } from 'vue';

const bus = inject<EventBus<EventBusType>>('bus');

const handleRouteChanged = (path: string) => {
  bus?.emit('routeChanged', path);
};
</script>
