<template>
  <div>
    <h3>EDIT</h3>
    <div>
      <span>Editar usuario</span>
      <form name="userCreateForm">
        <b-row>
          <b-col>
            <b-form-input type="text" v-model="userData.userName" :placeholder="userName"></b-form-input>
          </b-col>
          <b-col>
            <b-form-input type="text" v-model="userData.name" :placeholder="name"></b-form-input>
          </b-col>
          <b-col>
            <b-form-input type="text" v-model="userData.lastName" :placeholder="lastName"></b-form-input>
          </b-col>
          <b-col>
            <b-form-input type="text" v-model="userData.email" :placeholder="email"></b-form-input>
          </b-col>
        </b-row>
        <b-button type="button" @click="updateUser(userData)">Editar</b-button>
      </form>
    </div>
  </div>
</template>
<script>
import store from '../../store/store'
import Vue from 'vue' 
export default {
  name: 'edit-user-component',
  props: [
    'id',
    'name',
    'userName',
    'lastName',
    'email'
  ],
  data: () => {
    return {
      titleBrand: 'ABMuserS',
      addUser: 'Editar Usuario',
      userData: {
        userName: '',
        name: '',
        lastName: '',
        email: ''
      } 
    }
  },
  methods: {
    updateUser: function () {
      const user = {
        userName: this.userData.userName ? this.userData.userName : this.userName,
        name: this.userData.name ? this.userData.name : this.name,
        lastName: this.userData.lastName ? this.userData.lastName : this.lastName,
        email: this.userData.email ? this.userData.email : this.email,
      }
      store.commit('SET_USER', user)
      store.dispatch('editUser', this.id)
    },
  }
}
</script>
<style lang="scss" scoped>

</style>