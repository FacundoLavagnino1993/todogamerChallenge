<template>
  <div>
    <h3>CREATE</h3>
    <div>
      
      <span>Crear usuario</span>
      <form name="userCreateForm">
        <b-row>
          <b-col>
            <b-form-input type="text" v-model="userData.userName" placeholder="Nombre de usuario"></b-form-input>
            {{userData.userName}}
          </b-col>
          <b-col>
            <b-form-input type="text" v-model="userData.name" placeholder="Nombre"></b-form-input>
          </b-col>
          <b-col>
            <b-form-input type="text" v-model="userData.lastName" placeholder="Apellido"></b-form-input>
          </b-col>
          <b-col>
            <b-form-input type="text" v-model="userData.email" placeholder="Email"></b-form-input>
          </b-col>
        </b-row>
        <b-button type="button" @click="createUser(userData)">Crear</b-button>
      </form>
    </div>
  </div>
</template>
<script>
import store from '../../store/store'

export default {
  name: 'create-user-component',
  data: () => {
    return {
      titleBrand: 'ABMuserS',
      addUser: 'Crear Usuario',
      userData: {
        userName: '',
        name: '',
        lastName: '',
        email: ''
      } 
    }
  },
  
  methods: {
    createUser: (user) => {
      store.commit('SET_USER', user)
      store.dispatch('addUser')
    }
  }
}
</script>
<style lang="scss" scoped>

</style>