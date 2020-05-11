import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios);

export default new Vuex.Store({
  state: {
    allUsers: [],
    errors: {
      getAllUser: Boolean,
      createUser: Boolean,
      deleteUser: Boolean,
      editUser: Boolean
    },
    user: {
      name: String,
      lastName: String,
      userName: String,
      email: String
    }
  },
  actions: {
    addUser (type) {
      this.commit('LOADER', { type: 'loadingCreateUser', value: true});

      axios.post('http://localhost:4300/add-user', {
        name: this.state.user.name,
        last_name: this.state.user.lastName,
        user_name: this.state.user.userName,
        email: this.state.user.email
      },{
        mode: 'no-cors',
      })
      .then(response => {
        Vue.toasted.show("Usuario agregado con éxito", {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 5000
        })
        this.commit('ERROR', { type: 'createUser', value: false });

      })
      .catch(error => {
        this.commit('ERROR', { type: 'createUser', value: true });
        console.log(error)
      })
      .finally(() => this.commit('LOADER', {
        type: 'loadingCreateUser',
        value: false
      }))
    },
    deleteUser (type, payload) {
      axios.delete(`http://localhost:4300/delete-user?id=${payload.id}`, {
        id: payload.id,
      },{
        mode: 'no-cors',
      })
      .then(response => {
        const users = response.data.data;
        this.commit('SET_ALL_USERS', users)
        this.commit('ERROR', { type: 'deleteUser', value: false });
        Vue.toasted.show("Usuario eliminado con éxito", {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 5000
        })
      })
      .catch(error => {
        this.commit('ERROR', { type: 'deleteUser', value: true });
        console.log(error)
      })
      .finally(() => this.commit('LOADER', {
        type: 'loadingDeleteUser',
        value: false
      }))
    },
    editUser (type, id) {
      //this.commit('LOADER', { type: 'loadingCreateUser', value: true});
      axios.put('http://localhost:4300/update-user', {
        _id: id,
        name: this.state.user.name,
        last_name: this.state.user.lastName,
        user_name: this.state.user.userName,
        email: this.state.user.email
      },{
        mode: 'no-cors',
      })
      .then(response => {
        Vue.toasted.show("Usuario editado con éxito", {
          theme: "toasted-primary",
          position: "bottom-right",
          duration: 5000
        })
        this.commit('ERROR', { type: 'editUser', value: false });
      })
      .catch(error => {
        this.commit('ERROR', { type: 'editUser', value: true });
        console.log(error)
      })
      .finally(() => this.commit('LOADER', {
        type: 'loadingCreateUser',
        value: false
      }))
    },
    resetErrors () {
      this.commit('RESET_ERRORS');
    }
  },
  mutations: {
    SET_ALL_USERS (state, users) {
      state.allUsers = users
    },
    SET_USER (state, user) {
      state.user.name = user.name,
      state.user.lastName = user.lastName,
      state.user.userName = user.userName,
      state.user.email = user.email
    },
    LOADER (state, payload) {
      state[payload.type] = payload.value;
    },
    ERROR (state, payload) {
      state.errors[payload.type] = payload.value;
    },
    RESET_ERRORS (state) {
      state.errors.editUser = false,
      state.errors.deleteUser = false,
      state.errors.createUser = false,
      state.errors.getAllUser = false
    }
  }

  
})
