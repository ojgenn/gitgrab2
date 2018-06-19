<template>
  <div class="user">
    <icon name="spinner" spin scale="2" v-if="isSpinner"></icon>
    <h1 v-else-if="isError">{{isError}}</h1>
    <div v-else class="user-maincontent">
      <div class="user-maincontent__sidebar" v-if="showSideBar">
        <side-bar position="layout" :user="this.$route.params.name"/>
      </div>
      <div class="user-maincontent__content">
        <list :data = "prepareData" v-if="path !== 'repo'" />
        <list :data = "prepareRepo" v-if="path === 'repo'" type = "repo" :page="page"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from 'vue-awesome/components/Icon'
  import SideBar from '../Sidenavbar/Sidenavbar.vue'
  import List from '../List/List.vue'
  import {TYPE_CHECKER} from '../../constants'

  const ALLOW_RESULTS = [
    'name',
    'email',
    'company',
    'blog',
    'bio',
    'created_at',
    'updated_at',
    'followers',
    'following',
    'hireable',
    'location',
    'public_repos'
  ];

  export default {
    data() {
      return {
        path: 'info',
        page: 0
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
      },
      prepareData() {
        return ALLOW_RESULTS.map(item => {
          return {value: TYPE_CHECKER(this.$store.state.data[item]), label: item.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        })
      },
      prepareRepo() {
        return this.$store.state.repos.map(item => {
          return ({label: item.name, value: item})
        });
      }
    },
    components: {Icon, SideBar, List},
    created: function () {
      this.path = this.$route.query.path;
      this.$store.dispatch('getUser', this.$route.params.name)
      if(this.path === 'repo') {
        this.page = this.$route.query.page;
        this.$store.dispatch('getRepos', this.$route.params.name)
      }
    },
    watch: {
      '$route'(to, from) {
        console.log(to, from)
        this.path = to.query.path;
        if(to.params.name !== from.params.name){
          this.$store.dispatch('getUser', this.$route.params.name);
        }
        if(this.path === 'repo') {
          this.page = this.$route.query.page;
          this.$store.dispatch('getRepos', this.$route.params.name)
        }
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
    padding-right: 1rem;
  }

  .user-maincontent__content {
    width: 100%;
  }

  .sidebar {
    background: #fff;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
  }
</style>