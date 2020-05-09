import Vue from 'vue' 
import VueRouter from 'vue-router';
import './styles/normalize.scss';

Vue.use(VueRouter); 

import HeaderComponent from './components/header.vue';

const routes = [{
    path: '/',
    component: HeaderComponent,
  }];

const router = new VueRouter({ mode: 'history', routes: routes });

new Vue({
  render: h => h(HeaderComponent),
  router
}).$mount('#app');
