<template>
  <page-component>
    <page-header class="justify-end">
      <q-btn
        flat
        dense
        :icon="darkMode ? 'dark_mode' : 'light_mode'"
        color="primary"
        @click="darkMode = !darkMode"
      />
    </page-header>
    <page-body>
      <div class="absolute-center row justify-center items-center">
        <q-card class="bg-transparent" flat>
          <q-card-section>
            <app-logo />
            <div class="text-center text-overline">Login your account</div>
          </q-card-section>

          <q-card-section class="q-px-none">
            <q-input v-model="form.email" type="email" placeholder="Email">
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
            </q-input>

            <q-input
              v-model="form.password"
              type="password"
              placeholder="Password"
              class="q-mt-sm"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
          </q-card-section>

          <q-card-actions class="q-px-none">
            <q-btn
              color="primary"
              label="Login"
              class="full-width"
              unelevated
              no-caps
            />
            <q-btn
              flat
              label="Register"
              class="full-width q-mt-sm"
              unelevated
              no-caps
              to="/register"
            />
          </q-card-actions>
        </q-card>
      </div>
    </page-body>
  </page-component>
</template>

<script setup lang="ts">
import { App } from '@capacitor/app';
import { useQuasar } from 'quasar';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Preferences } from '@capacitor/preferences';

const $q = useQuasar();
const route = useRoute();
const darkMode = ref($q.dark.isActive);

const form = {
  email: '',
  password: '',
};

onMounted(() => {
  App.addListener('backButton', () => {
    if (route.path == '/login') App.exitApp();
  });
});

onUnmounted(() => {
  App.removeAllListeners();
});

watch(darkMode, async (newVal) => {
  $q.dark.set(newVal);
  await Preferences.set({ key: 'dark_mode', value: `${newVal}` });
});
</script>

<style scoped lang="scss">
.q-card {
  width: 80vw;
  max-width: 400px;
}
</style>
