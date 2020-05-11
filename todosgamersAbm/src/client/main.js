import Vue from 'vue' 
import VueRouter from 'vue-router'
Vue.use(VueRouter); 

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue, IconsPlugin)

import VModal from 'vue-js-modal'
Vue.use(VModal, { dialog: true, dynamic: true}) 

import Toasted from 'vue-toasted';
Vue.use(Toasted);

/*import VForm from 'vform';
Vue.use(VForm)*/

import './styles/normalize.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import store from './store/store'
import HeaderComponent from './components/header/header-component.vue'
import UsersTableComponent from './components/usersTable/users-table-component.vue'
import CreateUserComponent from './components/createUser/create-user-component.vue'
import EditUserComponent from './components/editUser/edit-user-component.vue';

const routes = [{
    path: '/',
    component: HeaderComponent,
    children: [{
      path: '/all-users',
      component: UsersTableComponent
    },{
      path: '/create',
      component: CreateUserComponent
    },{
      path: '/edit-user',
      component: EditUserComponent,
      props: (route) => ({
        id: route.query.id, 
        name: route.query.name,
        lastName: route.query.lastName,
        userName: route.query.userName,
        email: route.query.email
      }) 
    }]
  }];

const router = new VueRouter({ mode: 'history', routes: routes });



new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
