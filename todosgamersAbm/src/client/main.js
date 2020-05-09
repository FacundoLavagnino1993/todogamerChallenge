import Vue from 'vue' 
import VueRouter from 'vue-router'
Vue.use(VueRouter); 

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue, IconsPlugin)
import './styles/normalize.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import store from './store/store'
import HeaderComponent from './components/header/header-component.vue'
import UsersTableComponent from './components/usersTable/users-table-component.vue'
import CreateUserComponent from './components/createUser/create-user-component.vue'

const routes = [{
    path: '/',
    component: HeaderComponent,
    children: [{
      path: '/all-users',
      component: UsersTableComponent
    },{
      path: '/create',
      component: CreateUserComponent
    }]
  }];

const router = new VueRouter({ mode: 'history', routes: routes });

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
