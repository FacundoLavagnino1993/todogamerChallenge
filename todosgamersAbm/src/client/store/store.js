import Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'

Vue.use(vuex, axios);

export default new vuex.Store({
  state: {
    allUsers: [],
    errorToGetAllUser: Boolean,
    loadingAllUser: Boolean
  },
  actions: {
    getAllUsers () {
      this.commit('GET_ALL_USERS_LOADER', true)
      axios
      .get('http://localhost:4300/get-all-users', {
        mode: 'no-cors',
      })
      .then(data => {
        this.commit('SET_ALL_USERS', data)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => this.commit('GET_ALL_USERS_LOADER', false))
    }
  },
  mutations: {
    SET_ALL_USERS (state, users) {
      state.allUsers = users
    },
    GET_ALL_USERS_LOADER (state, loader) {
      state.loadingAllUser = loader
    }
  }
})