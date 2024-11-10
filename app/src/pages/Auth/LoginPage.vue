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
        <q-form @submit="login">
          <app-logo />
          <div class="text-center text-overline">Register an account</div>

          <q-input
            v-model="form.email"
            type="email"
            placeholder="Email"
            :error="v$.email.$error"
            :error-message="v$.email.$errors[0]?.$message.toString()"
            @blur="v$.email.$touch"
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>

          <q-input
            v-model="form.password"
            type="password"
            placeholder="Password"
            :error="v$.password.$error"
            :error-message="v$.password.$errors[0]?.$message.toString()"
            @blur="v$.password.$touch"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>

          <div class="q-mt-md">
            <q-btn
              type="submit"
              color="primary"
              label="Login"
              class="full-width"
              unelevated
              no-caps
            />
            <q-btn
              type="button"
              flat
              label="Register"
              class="full-width q-mt-sm"
              unelevated
              no-caps
              to="/register"
            />
          </div>
        </q-form>
      </div>
    </page-body>
  </page-component>
</template>

<script setup lang="ts">
import { App } from '@capacitor/app';
import { useQuasar } from 'quasar';
import { computed, onMounted, onUnmounted, Ref, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Preferences } from '@capacitor/preferences';
import { LoginUserInfo, useAuthStore } from 'src/stores/auth';
import useVuelidate from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';
import { Device } from '@capacitor/device';

const $q = useQuasar();
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const darkMode = ref($q.dark.isActive);

const form: Ref<LoginUserInfo> = ref({
  email: '',
  password: '',
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('Please enter your email', required),
      email: helpers.withMessage('Please enter a valid email', email),
    },
    password: {
      required: helpers.withMessage('Please enter your password', required),
    },
  };
});

const v$ = useVuelidate(rules, form);

onMounted(() => {
  App.addListener('backButton', () => {
    if (route.path == '/login') App.exitApp();
  });
});

onUnmounted(() => {
  App.removeAllListeners();
});

const login = async () => {
  await v$.value.$validate();
  if (v$.value.$invalid) return;

  $q.loading.show();
  const deviceName = (await Device.getInfo()).name;
  form.value.device_name = deviceName;

  authStore
    .login(form.value)
    .then(async () => {
      await Preferences.set({
        key: 'auth_token',
        value: authStore.token ?? '',
      });
      router.replace('/home');
    })
    .finally(() => $q.loading.hide());
};

watch(darkMode, async (newVal) => {
  $q.dark.set(newVal);
  await Preferences.set({ key: 'dark_mode', value: `${newVal}` });
});
</script>

<style scoped lang="scss">
.q-form {
  width: 80vw;
  max-width: 400px;
}
</style>
