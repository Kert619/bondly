<template>
  <page-component>
    <page-header class="q-px-sm">
      <page-back-button to="/login" />
    </page-header>

    <page-body class="q-px-md" remove-space-footer>
      <q-form @submit="register" class="absolute-center full-width">
        <app-logo />
        <div class="text-center text-overline">Register an account</div>

        <q-input
          v-model="form.first_name"
          placeholder="First Name"
          maxlength="255"
          :error="v$.first_name.$error"
          :error-message="v$.first_name.$errors[0]?.$message.toString()"
        />

        <q-input
          v-model="form.last_name"
          placeholder="Last Name"
          maxlength="255"
          :error="v$.last_name.$error"
          :error-message="v$.last_name.$errors[0]?.$message.toString()"
        />

        <q-input
          v-model="form.birth_date"
          placeholder="Birth Date"
          mask="date"
          :error="v$.birth_date.$error"
          :error-message="v$.birth_date.$errors[0]?.$message.toString()"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="form.birth_date">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          v-model="form.email"
          type="email"
          placeholder="Email"
          maxlength="255"
          :error="v$.email.$error"
          :error-message="v$.email.$errors[0]?.$message.toString()"
        />
        <q-input
          v-model="form.password"
          type="password"
          placeholder="Password"
          maxlength="255"
          :error="v$.password.$error"
          :error-message="v$.password.$errors[0]?.$message.toString()"
        />
        <q-input
          v-model="form.password_confirmation"
          type="password"
          placeholder="Confirm Password"
          maxlength="255"
          :error="v$.password_confirmation.$error"
          :error-message="
            v$.password_confirmation.$errors[0]?.$message.toString()
          "
        />

        <q-btn
          type="submit"
          color="primary"
          label="Register"
          class="full-width q-mt-sm"
          unelevated
          no-caps
        />
      </q-form>
    </page-body>
  </page-component>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from 'vue';
import {
  required,
  email,
  minLength,
  sameAs,
  helpers,
} from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { RegisterUserInfo, useAuthStore } from 'src/stores/auth';
import { Device } from '@capacitor/device';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { Preferences } from '@capacitor/preferences';
import { useHandleError } from 'src/composables/useHandleError';

const $q = useQuasar();
const authStore = useAuthStore();
const router = useRouter();

const externalServerValidation = () => true;

const form: Ref<RegisterUserInfo> = ref({
  first_name: '',
  last_name: '',
  birth_date: '',
  email: '',
  password: '',
  password_confirmation: '',
  device_name: '',
});
const $externalResults: Ref<{ [K in keyof RegisterUserInfo]?: string[] }> = ref(
  {}
);

const rules = computed(() => {
  return {
    first_name: {
      required: helpers.withMessage('Please enter your first name', required),
    },
    last_name: {
      required: helpers.withMessage('Please enter your last name', required),
    },
    birth_date: {
      required: helpers.withMessage('Please enter your birth date', required),
    },
    email: {
      required: helpers.withMessage('Please enter your email', required),
      email: helpers.withMessage('Please enter a valid email', email),
      externalServerValidation,
    },
    password: {
      required: helpers.withMessage('Please enter your password', required),
      minLength: helpers.withMessage(
        'Password must be atleast 8 characters',
        minLength(8)
      ),
    },
    password_confirmation: {
      required: helpers.withMessage('Please enter confirm password', required),
      sameAs: helpers.withMessage(
        'Confirm password does not match',
        sameAs(form.value.password)
      ),
    },
  };
});

const v$ = useVuelidate(rules, form, {
  $rewardEarly: true,
  $stopPropagation: true,
  $externalResults,
});

const register = async () => {
  $externalResults.value = {};
  await v$.value.$validate();
  if (v$.value.$invalid) return;

  $q.loading.show();

  const deviceName = (await Device.getInfo()).name;
  form.value.device_name = deviceName;
  try {
    await authStore.register(form.value);
    await Preferences.set({
      key: 'auth_token',
      value: authStore.token ?? '',
    });
    router.replace('/verify-email');
  } catch (error) {
    useHandleError<RegisterUserInfo>(error, $externalResults);
  } finally {
    $q.loading.hide();
  }
};
</script>
