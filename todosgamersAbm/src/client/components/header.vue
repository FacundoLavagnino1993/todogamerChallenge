<template>
  <div class="header-ctn">
    <h3>{{msg}}</h3>
  </div>
</template>

<script>
export default {
  name: 'header',
  data: () => {
    return {
      msg: 'ABMuserS'
    }
  }

}
</script>

<style lang="scss" scoped>
.header-ctn {
  background-color: #333333;
  height: 64px;
  width: 100%;
}
h3 {
  color: #42b983;
  margin: auto;
}
</style>