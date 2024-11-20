import { RouteRecordRaw } from 'vue-router';
import { auth } from 'src/guards/auth';
import { guest } from 'src/guards/guest';
import { verified } from 'src/guards/verified';
import { unverified } from 'src/guards/unverified';
import { profile } from 'src/guards/profile';

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
            meta: {
              nudgeParent: true,
              enterTransitionClass: 'slideInRight',
              leaveTransitionClass: 'slideOutRight',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/verify-email',
    component: () => import('pages/Auth/VerifyEmailPage.vue'),
    meta: { requiresAuth: true },
    beforeEnter: [auth, unverified],
  },

  {
    path: '/setup-profile',
    component: () => import('pages/Auth/SetupProfilePage.vue'),
    meta: { requiresAuth: true, requiresVerified: true },
    beforeEnter: [auth, unverified],
  },

  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true, requiresVerified: true, requiresProfile: true },
    beforeEnter: [auth, verified, profile],
    children: [
      {
        path: '',
        component: () => import('pages/Home/HomePage.vue'),
        children: [
          {
            path: 'child',
            component: () => import('pages/Home/HomeChildPage.vue'),
            meta: {
              hideFooter: true,
              enterTransitionClass: 'slideInUp',
              leaveTransitionClass: 'slideOutDown',
            },
            children: [
              {
                path: 'grandchild',
                component: () => import('pages/Home/HomeGrandChildPage.vue'),
                meta: {
                  nudgeParent: true,
                  enterTransitionClass: 'slideInRight',
                  leaveTransitionClass: 'slideOutRight',
                },
              },
            ],
          },
        ],
      },
    ],
  },

  {
    path: '/videos',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true, requiresVerified: true, requiresProfile: true },
    beforeEnter: [auth, verified, profile],
    children: [
      {
        path: '',
        component: () => import('pages/Videos/VideosPage.vue'),
      },
    ],
  },

  {
    path: '/notifications',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true, requiresVerified: true, requiresProfile: true },
    beforeEnter: [auth, verified, profile],
    children: [
      {
        path: '',
        component: () => import('pages/Notifications/NotificationsPage.vue'),
      },
    ],
  },

  {
    path: '/public',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true, requiresVerified: true, requiresProfile: true },
    beforeEnter: [auth, verified, profile],
    children: [
      {
        path: '',
        component: () => import('pages/Public/PublicPage.vue'),
      },
    ],
  },

  {
    path: '/events',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true, requiresVerified: true, requiresProfile: true },
    beforeEnter: [auth, verified, profile],
    children: [
      {
        path: '',
        component: () => import('pages/Events/EventsPage.vue'),
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
