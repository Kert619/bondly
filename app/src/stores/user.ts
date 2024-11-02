import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { Notify } from 'quasar';

export type RegisterUserInfo = {
  first_name: string;
  last_name: string;
  birth_date: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export const useUserStore = defineStore('user', () => {
  const register = async (user: RegisterUserInfo) => {
    return api
      .post('/register', user)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        Notify.create({
          message: error.response.data.message,
          type: 'negative',
        });
        throw error;
      });
  };

  return { register };
});
