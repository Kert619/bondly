<template>
  <page-component>
    <page-header class="justify-end q-px-sm">
      <q-btn
        flat
        dense
        :icon="darkMode ? 'dark_mode' : 'light_mode'"
        color="primary"
        round
        @click="darkMode = !darkMode"
      />
    </page-header>
    <page-body class="q-px-md">
      <q-form @submit="submit" class="absolute-center full-width">
        <app-logo />
        <div class="text-center text-overline">Register an account</div>

        <q-input
          v-model="form.email"
          type="email"
          placeholder="Email"
          :error="v$.email.$error"
          :error-message="v$.email.$errors[0]?.$message.toString()"
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
    </page-body>
  </page-component>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed, Ref, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Preferences } from '@capacitor/preferences';
import { LoginUserInfo, useAuthStore } from 'src/stores/auth';
import useVuelidate from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';
import { Device } from '@capacitor/device';
import { useHandleError } from 'src/composables/useHandleError';
import { useEcho } from 'src/composables/useEcho';

const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();
const darkMode = ref($q.dark.isActive);

const form: Ref<LoginUserInfo> = ref({
  email: '',
  password: '',
});

const $externalResults: Ref<{ [K in keyof LoginUserInfo]?: string[] }> = ref(
  {}
);

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

const v$ = useVuelidate(rules, form, {
  $rewardEarly: true,
  $stopPropagation: true,
  $externalResults,
});

const submit = async () => {
  $externalResults.value = {};
  await v$.value.$validate();
  if (v$.value.$invalid) return;

  $q.loading.show();
  const deviceName = (await Device.getInfo()).name;
  form.value.device_name = deviceName;

  try {
    await authStore.login(form.value);
    await Preferences.set({
      key: 'auth_token',
      value: authStore.token as string,
    });

    useEcho(authStore.token as string);
    router.replace('/home');
  } catch (error) {
    useHandleError<LoginUserInfo>(error, $externalResults);
  } finally {
    $q.loading.hide();
  }
};

watch(darkMode, async (newVal) => {
  $q.dark.set(newVal);
  await Preferences.set({ key: 'dark_mode', value: `${newVal}` });
});
</script>
