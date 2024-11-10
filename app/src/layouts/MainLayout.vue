<template>
  <q-layout view="hHh lpR fFf">
    <q-footer bordered>
      <q-tabs dense no-caps switch-indicator>
        <q-route-tab icon="home" label="Home" to="/home" />
        <q-route-tab icon="video_library" label="Videos" to="/videos" />
        <q-route-tab
          icon="notifications"
          label="Notifications"
          to="/notifications"
        />
        <q-route-tab icon="public" label="Public" to="/public" />
        <q-route-tab icon="calendar_month" label="Events" to="/events" />
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts"></script>
