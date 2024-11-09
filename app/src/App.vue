<template>
  <router-view />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { Preferences } from '@capacitor/preferences';

const $q = useQuasar();

(async () => {
  const { value } = await Preferences.get({ key: 'dark_mode' });
  $q.dark.set(value == 'true');
})();
</script>
