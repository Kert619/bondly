<template>
  <page-component>
    <page-body remove-space-header remove-space-footer>
      <div class="window-height row justify-center items-center">
        <q-card class="login-card bg-transparent" flat>
          <q-card-section>
            <div class="text-center text-h4 custom-font">Bondly</div>
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

    <page-header class="justify-end"> DARK MODE </page-header>
  </page-component>
</template>

<script setup lang="ts">
import { App } from '@capacitor/app';
import { useQuasar } from 'quasar';
import { onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

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

const $q = useQuasar();
$q.dark.set(true);
</script>

<style scoped lang="scss">
.login-card {
  width: 80vw;
  max-width: 400px;
}
</style>
