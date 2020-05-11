<template>
  <div>
    <div class="create-ctn">
      <div class="title-ctn">
        <span>Crear usuario</span>
      </div>
      <form @submit="submit" class="form-ctn">
        <div class="input-ctn" >
          <label >Nombre de usuario:</label>
          <input class="form-control" type="text" name="userName" v-model="form.userName" placeholder="Nombre de usuario" required>
        </div>
        <div class="input-ctn">
          <label for="name">Nombre:</label>
          <input class="form-control" name="name" type="text" v-model="form.name" placeholder="Nombre" required>
        </div>
        <div class="input-ctn">
          <label for="last-name">Apellido:</label>
          <input class="form-control" name="last-name" type="text" v-model="form.lastName" placeholder="Apellido" required>
        </div>
        <div class="input-ctn">
          <label for="email">Email:</label>
          <input class="form-control" name="email" type="email" v-model="form.email" placeholder="Email" required>
        </div>
        <div class="btn-ctn">
          <b-button type="btn-submit">ACEPTAR</b-button>
        </div>
      </form>
      <div v-if="this.$store.state.errors.createUser" class="error-ctn">
        <span>No se pudo crear al usuario, intentelo nuevamente.</span>
      </div>
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
      errors: [],
      form: {
        userName: '',
        name: '',
        lastName: '',
        email: ''
      }
    }
  },
  methods: {
    submit (e) {
      e.preventDefault();
      
      const user = {
        name: this.form.name,
        lastName: this.form.lastName,
        userName: this.form.userName,
        email: this.form.email
      }
      store.commit('SET_USER', user)
      store.dispatch('addUser')
    }
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
}
</style>