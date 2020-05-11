<template>
  <div>
    <div class="error-ctn" v-if="$store.state.errors.getAllUser">
      <div class="error-label-ctn" >
        <span>Hubo un error al obtener la lista de usuarios. Reintente nuevamente.</span>
      </div>
      <div class="btn-error-ctn">
        <b-button @click="$router.go()">REINTENTAR</b-button>
      </div>
    </div>
    <div v-if="!$store.state.errors.getAllUser" class="table-ctn">
      <div class="no-content-ctn" v-if="$store.state.allUsers.length == 0">
        <span>No hay usuarios ingresados.</span>
      </div>
      <b-table v-if="$store.state.allUsers.length > 0" striped hover :items="$store.state.allUsers" :fields="fields">
        <template v-slot:cell(Usuario)="data">
          <b class="text-info">{{data.item.user_name}}</b>
        </template>
        <template v-slot:cell(Nombre)="data">
          <b class="text-info">{{data.item.name}}</b>
        </template>
        <template v-slot:cell(Apellido)="data">
          <b class="text-info">{{data.item.last_name}}</b>
        </template>
        <template v-slot:cell(email)="data">
          <b class="text-info">{{data.item.email}}</b>
        </template>
        <template v-slot:cell(Acciones)="data">
          <div class="btn-ctn">
            <b-button @click="showDeleteModal(data.item._id)">ELIMINAR</b-button>
            <b-button @click="goToEditUser(data.item)">EDITAR</b-button>
          </div>
        </template>
      </b-table>
    </div>
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
          key: 'Usuario',
        },{
          key: 'Nombre'
        },{
          key: 'Apellido'
        },{
          key: 'Email'
        }, {
          key: 'Acciones'
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
            <div style="align-items:center; padding-left: 16px;background-color: #333333;color: #ffffff;display: flex; height:42px; font-size: 18px; font-weight: bold">
              <span>Atención!</span>
            </div>
            <div style="font-size: 16px; font-weight: bold;height: 104px;padding-left:16px; padding-top: 32px">
              <span>Desea eliminar permanenteme al usuario?</span>  
            </div>
            <div style="display: flex; flex-direction: row-reverse; padding-right: 16px;">
              <b-button style="margin-left: 16px;background-color: #62abb4 !important;border: none !important;font-size: 14px;font-weight: bold;" @click="self.deleteUser(); $emit('close')">ELIMINAR</b-button>
              <b-button style="background-color: inherit !important; border: 2px solid gray !important; color: #62abb4; margin-right: 8px;font-size: 14px;font-weight: bold;" @click="$emit('close')">CANCELAR</b-button>
            </div>
          </div>
        `,
        props: ['self']
      },{
        self: this
      },{
        height: "200px",
        width: "400px"
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

.table-ctn {
  margin: auto;
  width: 75%;
  border: 2px solid #62abb4;
  border-radius: 5px;
  margin-top: 16px;
}
.btn-ctn {
  
  button {
    background-color: #333333 !important;
    border: none !important;
    font-size: 14px;
    font-weight: bold;
  }
}
.error-ctn {
  margin: auto;
  margin-top: 16px;
  width: 75%;
  
}
.error-label-ctn {
  background-color: #bb2020 ;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  width: 100%;
  height: 64px;
  display:flex;
  align-items: center;
  justify-content: center;
}
.btn-error-ctn {
  width: 100%;
  display:flex;
  justify-content: center;
  margin-top: 16px;
  button {
    background-color: #333333 !important;
    border: none !important;
    font-size: 14px;
    font-weight: bold;
  }
}
.no-content-ctn {
  display: flex;
  height: 64px;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
}

</style>