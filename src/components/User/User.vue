<template>
  <div class="user">
    <icon name="spinner" spin scale="2" v-if="isSpinner"></icon>
    <h1 v-else-if="isError">{{isError}}</h1>
    <div v-else class="user-maincontent">
      <div class="user-maincontent__sidebar" v-if="showSideBar">
        <side-bar position="layout" :user="this.$route.params.name"/>
      </div>
      <div class="user-maincontent__content">
        {{this.path }}
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from 'vue-awesome/components/Icon'
  import SideBar from '../Sidenavbar/Sidenavbar.vue'

  export default {
    data() {
      return {
        path: 'info'
      }
    },
    computed: {
      isSpinner() {
        return this.$store.state.spinner
      },
      isError() {
        return this.$store.state.err
      },
      showSideBar() {
        return this.$store.state.window.width>600
      }
    },
    components: {Icon, SideBar},
    created: function () {
      this.$store.dispatch('getUser', this.$route.params.name)
    },
    watch: {
      '$route'(to) {
        this.path = to.query.path;
        this.$store.dispatch('getUser', this.$route.params.name)
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/css/style";

  @sidebar-width: 30%;

  .user {
    display: flex;
    .main-content;
    justify-content: center;
    h1 {
      text-align: center;
    }
    a {
      color: @main-color;
    }
  }

  .user-maincontent {
    display: inline-flex;
    width: 100%;
  }

  .user-maincontent__sidebar {
    width: @sidebar-width;
  }

  .user-maincontent__content {
    width: calc(100% - @sidebar-width);
    padding: 1rem;
  }

  .sidebar {
    background: #fff;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
  }
</style>