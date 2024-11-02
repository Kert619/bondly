<template>
  <q-page padding style="padding-top: 60px">
    <q-card square flat>
      <q-card-section class="bg-primary">
        <div class="text-center text-white custom-font">
          Register an Account
        </div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="form.firstName" placeholder="First Name" />
        <q-input v-model="form.lastName" placeholder="Last Name" />
        <q-input v-model="form.birthDate" placeholder="Birth Date" mask="date">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="form.birthDate">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input v-model="form.email" type="email" placeholder="Email" />
        <q-input
          v-model="form.password"
          type="password"
          placeholder="Password"
        />
        <q-input
          v-model="form.confirmPassword"
          type="password"
          placeholder="Confirm Password"
        />
      </q-card-section>

      <q-card-actions>
        <q-btn
          color="primary"
          label="Register"
          class="full-width"
          unelevated
          no-caps
        />
      </q-card-actions>
    </q-card>

    <q-page-sticky expand position="top">
      <q-card square class="q-pa-sm full-width">
        <q-btn flat dense icon="arrow_back" to="/login" />
      </q-card>
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const form = ref({
  firstName: '',
  lastName: '',
  birthDate: '',
  email: '',
  password: '',
  confirmPassword: '',
});
</script>
