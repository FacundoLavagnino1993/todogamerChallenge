<template>
  <div>
   
    <div>{{this.$store.state.loadingAllUser}}</div>
    <div>{{this.$store.state.errors.getAllUser}}</div>
    <h3>TABLE</h3>

    <b-table striped hover :items="$store.state.allUsers" :fields="fields">
      <template v-slot:cell(user_name)="data">
        <b class="text-info">{{data.item.user_name}}</b>
      </template>
      <template v-slot:cell(name)="data">
        <b class="text-info">{{data.item.name}}</b>
      </template>
      <template v-slot:cell(last_name)="data">
        <b class="text-info">{{data.item.last_name}}</b>
      </template>
      <template v-slot:cell(email)="data">
        <b class="text-info">{{data.item.email}}</b>
        <b-button @click="goToEditUser(data.item)">Editar</b-button>
        <b-button @click="showDeleteModal(data.item._id)">Eliminar</b-button>
      </template>
    </b-table>
    <modals-container />
  </div>
</template>
<script>

import { mapState } from 'vuex'
import store from '../../store/store'
import axios from 'axios'


export default {
  name: 'users-table-component',
  data: () => {
    return {
      deleteId: '',
      delete: '',
      fields: [
        {
          key: 'user_name',
        },{
          key: 'name'
        },{
          key: 'last_name'
        },{
          key: 'email'
        }
      ],
    }
  },
  mounted() {
    axios.get('http://localhost:4300/get-all-users', {
      mode: 'no-cors',
    })
    .then(response => {
      store.commit('SET_ALL_USERS', response.data);
      store.commit('ERROR', { type: 'getAllUser', value: false });
    })
    .catch(error => {
      store.commit('ERROR', { type: 'getAllUser', value: true });
      console.log(error);
    })
  },
  methods: {
    showDeleteModal(id) {
      const self = this;
      this.deleteId = id;
      this.$modal.show({
         template: `
          <div>
            <h3>Atención!</h3>
            <span>Desea eliminar permanenteme al usuario?</span>  
            <b-button @click="$emit('close')">CANCELAR</b-button>
            <b-button @click="self.deleteUser(); $emit('close')">ELIMINAR</b-button>
          </div>
        `,
        props: ['self']
      },{
        self: this
      },{
        height: "200px",
        width: "300px"
      })
    },
    deleteUser() {
      this.$store.dispatch('deleteUser', {id:this.deleteId});
    },
    goToEditUser(user) {
      const userToEdit = {
        name: user.name,
        lastName: user.last_name,
        userName: user.user_name,
        email: user.email
      }
      this.$store.commit('SET_USER', userToEdit);
      this.$router.push(`/edit-user/?id=${user._id}&userName=${user.user_name}&name=${user.name}&lastName=${user.last_name}&email=${user.email}`)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>