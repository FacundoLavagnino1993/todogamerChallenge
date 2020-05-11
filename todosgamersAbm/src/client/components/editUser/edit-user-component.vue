<template>
  <div>
    <div class="create-ctn">
      <div class="title-ctn">
        <span>Editar usuario</span>
      </div>
      <form @submit="submit" class="form-ctn">
        <div class="input-ctn">
          <label >Nombre de usuario:</label>
          <input class="form-control" type="text" name="userName" v-model="form.userName" :placeholder="userName">
        </div>
        <div class="input-ctn">
          <label for="name">Nombre:</label>
          <input class="form-control" name="name" type="text" v-model="form.name" :placeholder="name">
        </div>
        <div class="input-ctn">
          <label for="last-name">Apellido:</label>
          <input class="form-control" name="last-name" type="text" v-model="form.lastName" :placeholder="lastName">
        </div>
        <div class="input-ctn">
          <label for="email">Email:</label>
          <input class="form-control" name="email" type="email" v-model="form.email" :placeholder="email">
        </div>
        <div class="btn-ctn">
          <b-button type="btn-submit">ACEPTAR</b-button>
          <b-button class="cancel-btn" @click="$router.go(-1)" type="button">CANCELAR</b-button>
        </div>
      </form>
      <div v-if="this.$store.state.errors.editUser" class="error-ctn">
        <span>No se pudo editar al usuario, intentelo nuevamente.</span>
      </div>
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
      form: {
        userName: '',
        name: '',
        lastName: '',
        email: ''
      } 
    }
  },
  methods: {
    submit: function (e) {
      e.preventDefault();
      const user = {
        userName: this.form.userName ? this.form.userName : this.userName,
        name: this.form.name ? this.form.name : this.name,
        lastName: this.form.lastName ? this.form.lastName : this.lastName,
        email: this.form.email ? this.form.email : this.email,
      }
      store.commit('SET_USER', user)
      store.dispatch('editUser', this.id)
    },
  }
}
</script>
<style lang="scss" scoped>
.error-ctn {
  align-items: center;
  background-color: #bb2020;
  color: #ffffff;
  display:flex;
  font-size: 14px;
  font-weight: bold;
  height: 42px;
  justify-content: center;
  margin-top: 16px;
}
.create-ctn {
  border: 2px solid #62abb4;
  border-radius: 5px;
  margin: auto;
  margin-top: 24px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  padding-top: 10px;
  width: 420px;
}
.title-ctn {
  font-size: 24px;
  font-weight: 500;
}
.form-ctn {
  div:first-child {
    margin-top: 10px;
  }
}
.input-ctn {
  margin-bottom: 16px;
}
.btn-ctn {
  display: flex;
  flex-direction: row-reverse;
  button {
    background-color: #62abb4 !important;
    border: none !important;
    font-size: 14px;
    font-weight: bold;
  }
  .cancel-btn {
    background-color: inherit !important;
    border: 2px solid gray !important;
    color: #62abb4;
    margin-right: 8px;
  }
}
</style>