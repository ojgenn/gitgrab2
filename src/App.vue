<template>
  <div id="app">
    <header-view/>
    <router-view/>
  </div>
</template>

<script>
  import HeaderView from './components/Header/Header.vue'

  export default {
    components: {HeaderView}
  }
</script>

<style lang="less">
  @import "./assets/css/style";
</style>
