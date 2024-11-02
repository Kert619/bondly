<template>
  <q-page class="row items-center justify-center">
    <q-card class="login-card" flat>
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
  </q-page>
</template>

<script setup lang="ts">
import { App } from '@capacitor/app';
import { onMounted } from 'vue';
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
</script>

<style scoped lang="scss">
.login-card {
  width: 80vw;
  max-width: 400px;
}
</style>
