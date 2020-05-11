<template>
  <div class=actions-header>
    <div class="main-header">
      <router-link to="/"><span>{{titleBrand}}</span></router-link>
    </div>
    <div class="nav-ctn">
      <nav>
        <router-link to="/create">{{addUser}}</router-link>
        <router-link to="/all-users">{{usersList}}</router-link>
      </nav>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import store from '../../store/store'

export default {
  name: 'header-component',
  data: () => {
    return {
      titleBrand: 'ABMuserS',
      addUser: 'CREAR USUARIO',
      usersList: 'LISTA DE USUARIOS'
    }
  },
  created: function() {
    this.$store.dispatch('resetErrors');
  }
}
</script>

<style lang="scss">
.logo-ctn {
  margin: auto;
  margin-top: 100px;
}
.main-header {
  background-color: #333333 !important;
  display: flex;
  flex-direction: row;
  height: 48px;
  padding-left: 16px;
  a {
    color: #dfdfdf;
    font-weight: bold;
    font-size: 32px;
  }
  a:hover {
    color: #aaaaaa;
  }
}
.nav-ctn {
  background-color: #dfdfdf !important;
  box-shadow: -2px 3px 13px 0px rgba(0,0,0,0.48);

  display: flex;
  flex-direction: column;
  height: 28px;
  justify-content: center;
  padding-left: 16px;

  nav {
    display: flex;
    flex-direction: row;
    a {
      color: #333333;
      font-size: 12px;
      font-weight: bold;
      margin-right: 16px;
    }
    a:hover {
      color: #62abb4;
    }
  }
}
.actions-header {
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
}
a {
  text-decoration: none !important;
}
h3 {
  font-weight: bold !important;
}
#sup-bar {
  background-color: #42b983;
  margin: auto;
}
</style>