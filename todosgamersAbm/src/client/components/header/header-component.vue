<template>
  <div class=actions-header>
    <div class="main-header">
      <router-link to="/"><span>{{titleBrand}}</span></router-link>
      <div class="search-ctn">
        <form> 
          <input type="text" v-model="userSearch" placeholder="Usuario">
          <button type="submit">Buscar</button>
        </form>
        {{userSearch}}
      </div>
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
export default {
  name: 'header-component',
  data: () => {
    return {
      titleBrand: 'ABMuserS',
      addUser: 'Crear Usuario',
      usersList: 'Lista de usuarios',
      userSearch: ''
    }
  }
}
</script>

<style lang="scss">
.main-header {
  background-color: #333333 !important;
  display: flex;
  flex-direction: row;
  height: 48px;
}
.nav-ctn {
  background-color: #dfdfdf !important;
  display: flex;
  flex-direction: row;
  height: 28px;
  nav {
    a {color: #333333;}
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