<template>
  <q-page
    class="row justify-center"
    padding
    style="padding-top: 60px; padding-bottom: 1rem"
  >
    <q-form @submit="register">
      <div class="text-center text-h4 custom-font">Bondly</div>
      <div class="text-center text-overline">Register an account</div>

      <q-input
        v-model="form.first_name"
        placeholder="First Name"
        maxlength="255"
        :error="v$.first_name.$error"
        :error-message="v$.first_name.$errors[0]?.$message.toString()"
        @blur="v$.first_name.$touch"
      />

      <q-input
        v-model="form.last_name"
        placeholder="Last Name"
        maxlength="255"
        :error="v$.last_name.$error"
        :error-message="v$.last_name.$errors[0]?.$message.toString()"
        @blur="v$.last_name.$touch"
      />

      <q-input
        v-model="form.birth_date"
        placeholder="Birth Date"
        mask="date"
        :error="v$.birth_date.$error"
        :error-message="v$.birth_date.$errors[0]?.$message.toString()"
        @blur="v$.birth_date.$touch"
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
        @blur="v$.email.$touch"
      />
      <q-input
        v-model="form.password"
        type="password"
        placeholder="Password"
        maxlength="255"
        :error="v$.password.$error"
        :error-message="v$.password.$errors[0]?.$message.toString()"
        @blur="v$.password.$touch"
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
        @blur="v$.password_confirmation.$touch"
      />

      <q-btn
        type="submit"
        color="primary"
        label="Register"
        class="full-width q-mt-sm"
        unelevated
        no-caps
        :disable="v$.$invalid"
      />
    </q-form>

    <q-page-sticky expand position="top">
      <q-card square class="q-pa-sm full-width">
        <q-btn flat dense icon="arrow_back" to="/login" />
      </q-card>
    </q-page-sticky>
  </q-page>
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
import { RegisterUserInfo, useUserStore } from 'src/stores/user';

const userStore = useUserStore();

const form: Ref<RegisterUserInfo> = ref({
  first_name: '',
  last_name: '',
  birth_date: '',
  email: '',
  password: '',
  password_confirmation: '',
});

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

const v$ = useVuelidate(rules, form);

const register = async () => {
  await v$.value.$validate();
  if (v$.value.$invalid) return;

  await userStore.register(form.value);
};
</script>

<style scoped lang="scss">
.q-form {
  width: 80vw;
  max-width: 400px;
}
</style>
