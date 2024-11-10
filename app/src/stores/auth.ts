import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { Notify } from 'quasar';
import { ref, Ref } from 'vue';
import { messages } from 'src/messages';

export type RegisterUserInfo = {
  first_name: string;
  last_name: string;
  birth_date: string;
  email: string;
  password: string;
  password_confirmation: string;
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
  const appHasInitialized = ref(false);

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
          message:
            error.response?.status == 500
              ? messages[500]
              : error.response?.data.message,
          type: 'negative',
          position: 'bottom',
          actions: [{ icon: 'close', color: 'white', round: true }],
        });
        throw error;
      });
  };

  const loadUser = async () => {
    return api
      .get('/user')
      .then((response) => {
        user.value = response.data.user;
        userProfile.value = response.data.user_profile;
      })
      .catch((error) => {
        Notify.create({
          message:
            error.response?.status == 500
              ? messages[500]
              : error.response?.data.message,
          type: 'negative',
          position: 'bottom',
          actions: [{ icon: 'close', color: 'white', round: true }],
        });

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
          message:
            error.response?.status == 500
              ? messages[500]
              : error.response?.data.message,
          type: 'negative',
          position: 'bottom',
          actions: [{ icon: 'close', color: 'white', round: true }],
        });
        throw error;
      });
  };

  return {
    register,
    loadUser,
    resendEmailVerification,
    token,
    user,
    userProfile,
    appHasInitialized,
  };
});