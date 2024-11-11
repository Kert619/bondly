import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { Notify } from 'quasar';
import { ref, Ref } from 'vue';
import { useErrorMessage } from 'src/composables/useErrorMessage';

export type RegisterUserInfo = {
  first_name: string;
  last_name: string;
  birth_date: string;
  email: string;
  password: string;
  password_confirmation: string;
  device_name?: string;
};

export type LoginUserInfo = {
  email: string;
  password: string;
  device_name?: string;
};

export type User = {
  id: number;
  email: string;
  email_verified_at: Date;
  created_at: Date;
  updated_at: Date;
};

export type UserProfile = {
  user_id: number;
  first_name: string;
  last_name: string;
  birth_date: Date;
  created_at: Date;
  updated_at: Date;
};

export const useAuthStore = defineStore('user', () => {
  const token: Ref<string | null> = ref(null);
  const user: Ref<User | null> = ref(null);
  const userProfile: Ref<UserProfile | null> = ref(null);

  const register = async (userInfo: RegisterUserInfo) => {
    return api
      .post('/register', userInfo)
      .then((response) => {
        token.value = response.data.token;
        user.value = response.data.user;
        userProfile.value = response.data.user_profile;
        return response;
      })
      .catch((error) => {
        Notify.create({
          message: useErrorMessage(error),
          type: 'negative',
          position: 'bottom',
          actions: [{ icon: 'close', color: 'white', round: true }],
        });
        throw error;
      });
  };

  const login = async (userCredentials: LoginUserInfo) => {
    return api
      .post('/login', userCredentials)
      .then((response) => {
        token.value = response.data.token;
        user.value = response.data.user;
        userProfile.value = response.data.user_profile;
        return response;
      })
      .catch((error) => {
        Notify.create({
          message: useErrorMessage(error),
          type: 'negative',
          position: 'bottom',
          actions: [{ icon: 'close', color: 'white', round: true }],
        });
        throw error;
      });
  };

  const loadUser = async (showError = true) => {
    return api
      .get('/user')
      .then((response) => {
        user.value = response.data.user;
        userProfile.value = response.data.user_profile;
      })
      .catch((error) => {
        if (showError) {
          Notify.create({
            message: useErrorMessage(error),
            type: 'negative',
            position: 'bottom',
            actions: [{ icon: 'close', color: 'white', round: true }],
          });
        }

        throw error;
      });
  };

  const resendEmailVerification = async () => {
    return api
      .post('/email/verification-notification')
      .then((response) => {
        Notify.create({
          message: 'Email has been sent!',
          type: 'positive',
          position: 'bottom',
          actions: [{ icon: 'close', color: 'white', round: true }],
        });
        return response;
      })
      .catch((error) => {
        Notify.create({
          message: useErrorMessage(error),
          type: 'negative',
          position: 'bottom',
          actions: [{ icon: 'close', color: 'white', round: true }],
        });
        throw error;
      });
  };

  return {
    register,
    login,
    loadUser,
    resendEmailVerification,
    token,
    user,
    userProfile,
  };
});
