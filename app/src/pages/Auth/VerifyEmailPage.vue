<template>
  <page-component>
    <page-header>
      <q-btn
        label="Go to home"
        flat
        icon="home"
        dense
        no-caps
        color="primary"
        @click="goHome"
      />
    </page-header>
    <page-body class="q-px-md">
      <q-card flat class="bg-transparent absolute-center full-width">
        <q-card-section class="row justify-center">
          <q-icon name="forward_to_inbox" size="100px" color="positive" />
        </q-card-section>

        <q-card-section class="q-pa-sm">
          <div class="text-h4 q-mb-md">Verify your email</div>
          <p class="text-body2">
            We've sent a confirmation email to the address you've provided.
            Please check your inbox and click the verification link to complete
            your registration. If you don't see the email in your inbox, please
            check your spam or junk folder.
          </p>
        </q-card-section>

        <q-card-actions>
          <p>
            Didn't receive an email? Click
            <a
              href="#"
              :class="{ disabled: timer > 0 }"
              @click.prevent="resendEmail"
              >here</a
            >
            to resend
          </p>
          <p v-if="timer > 0">
            Resend available in
            <span class="text-weight-bold">{{ timer }}</span> seconds
          </p>
        </q-card-actions>
      </q-card>
    </page-body>
  </page-component>
</template>

<script setup lang="ts">
import { Notify, useQuasar } from 'quasar';
import { useHandleError } from 'src/composables/useHandleError';
import { useAuthStore } from 'src/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();
const timer = ref(0);

const startTimer = () => {
  const countDown = setInterval(() => {
    timer.value--;
    if (timer.value == 0) clearInterval(countDown);
  }, 1000);
};

const resendEmail = async () => {
  try {
    $q.loading.show();
    await authStore.resendEmailVerification();
    timer.value = 120;
    startTimer();

    $q.notify({
      message: 'Email has been sent!',
      type: 'positive',
      position: 'bottom',
      actions: [{ icon: 'close', color: 'white', round: true }],
    });
  } catch (error) {
    useHandleError(error);
  } finally {
    $q.loading.hide();
  }
};

const goHome = async () => {
  try {
    $q.loading.show();
    await authStore.loadUser();
    if (authStore.user?.email_verified_at) {
      router.replace('/home');
    } else {
      Notify.create({
        message: 'Please verify your email first',
        type: 'negative',
        position: 'bottom',
        actions: [{ icon: 'close', color: 'white', round: true }],
      });
    }
  } catch (error) {
    useHandleError(error);
  } finally {
    $q.loading.hide();
  }
};
</script>

<style scoped lang="scss">
.disabled {
  pointer-events: none;
}

.body--dark .disabled {
  color: $grey-4;
}

.body--light .disabled {
  color: black;
}
</style>
