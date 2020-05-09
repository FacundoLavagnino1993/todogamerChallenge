<template>
  <div>
    <div>{{this.$store.state.loadingAllUser}}</div>
    <h3>TABLE</h3>
    <div>{{this.$store.state.allUsers}}</div>
  </div>
</template>
<script>

import { mapState } from 'vuex'

export default {
  name: 'users-table-component',
  data: () => {
    return {
      titleBrand: 'ABMuserS',
      addUser: 'Crear Usuario',
      usersList: 'Lista de usuarios'
    }
  },
  mounted() {
    this.$store.dispatch('getAllUsers')
  },
  computed: {
    ...mapState([
      'allUsers'
    ])
  }
}
</script>
<style lang="scss" scoped>

</style>