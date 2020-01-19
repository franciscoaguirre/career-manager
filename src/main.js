import Vue from 'vue';
import { BootstrapVue } from 'bootstrap-vue';
import axios from 'axios';

import App from './App.vue';
import router from './router';
import auth from './auth';

import 'bootstrap/dist/css/bootstrap.css';

import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

if (auth.isAuthenticated()) {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('authToken')}`;
}

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
