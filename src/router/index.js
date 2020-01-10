import Vue from 'vue';
import VueRouter from 'vue-router';

import Main from '@/views/Main.vue';
import Login from '@/views/Login.vue';
import SignUp from '@/views/SignUp.vue';

import authService from '@/auth';

Vue.use(VueRouter);

const guard = (to, from, next) => {
  if (!authService.isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
};

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    beforeEnter: guard,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/sign_up',
    name: 'sign_up',
    component: SignUp,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
