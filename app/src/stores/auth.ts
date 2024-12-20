import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { computed, ref, Ref } from 'vue';
import { Gender } from 'src/enums/gender';
import { RelationshipStatus } from 'src/enums/relationship-status';
import { Mood } from 'src/enums/mood';
import { ImagePath } from 'src/enums/image-path';

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
  gender: Gender | null;
  relationship_status: RelationshipStatus;
  address: string;
  postal_code: string;
  occupation: string;
  company_name: string;
  school: string;
  profile_photo: string;
  cover_photo: string;
  bio: string;
  mood: Mood;
  created_at: Date;
  updated_at: Date;
  profile_completed: boolean;
};

export const useAuthStore = defineStore('user', () => {
  const token: Ref<string | null> = ref(null);
  const user: Ref<User | null> = ref(null);
  const userProfile: Ref<UserProfile | null> = ref(null);

  const register = async (userInfo: RegisterUserInfo) => {
    const response = await api.post('/register', userInfo);
    token.value = response.data.token;
    user.value = response.data.user;
    userProfile.value = response.data.user_profile;
    return response;
  };

  const login = async (userCredentials: LoginUserInfo) => {
    const response = await api.post('/login', userCredentials);
    token.value = response.data.token;
    user.value = response.data.user;
    userProfile.value = response.data.user_profile;
    return response;
  };

  const loadUser = async () => {
    const response = await api.get('/user');
    user.value = response.data.user;
    userProfile.value = response.data.user_profile;
    return response;
  };

  const resendEmailVerification = async () => {
    const response = await api.post('/email/verification-notification');
    return response;
  };

  const updateUserProfile = async (userProfile: Partial<UserProfile> = {}) => {
    const response = await api.put('/update-user-profile', userProfile);
    return response;
  };

  const userThumbnail = computed(() => {
    return userProfile.value?.profile_photo
      ? `${ImagePath.Profile_Photo_Cropped}/${userProfile.value.profile_photo}`
      : '/default-profile-256.png';
  });

  const fullName = computed(() => {
    return `${userProfile.value?.first_name} ${userProfile.value?.last_name}`;
  });

  return {
    register,
    login,
    loadUser,
    resendEmailVerification,
    updateUserProfile,
    token,
    user,
    userProfile,
    userThumbnail,
    fullName,
  };
});
