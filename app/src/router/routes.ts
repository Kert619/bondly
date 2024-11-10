import { RouteRecordRaw } from 'vue-router';
import { auth } from 'src/guards/auth';
import { guest } from 'src/guards/guest';
import { verified } from 'src/guards/verified';
import { unverified } from 'src/guards/unverified';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    component: () => import('layouts/AuthLayout.vue'),
    beforeEnter: [guest],
    children: [
      {
        path: '',
        component: () => import('pages/Auth/LoginPage.vue'),
        children: [
          {
            path: 'register',
            component: () => import('pages/Auth/RegisterPage.vue'),
            alias: '/register',
          },
        ],
      },
    ],
  },
  {
    path: '/verify-email',
    component: () => import('pages/Email/VerifyEmailPage.vue'),
    meta: { requiresAuth: true },
    beforeEnter: [auth, unverified],
  },

  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true, requiresVerified: true },
    beforeEnter: [auth, verified],
    children: [
      {
        path: '',
        component: () => import('pages/Home/HomePage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
