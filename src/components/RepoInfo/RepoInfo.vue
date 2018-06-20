<template>
  <div class="repo-info">
    <div class="repo-info__breadcrumbs">
      <router-link :to="'/' + $route.params.name">{{$route.params.name}}</router-link><span> - </span><router-link :to="'/' + $route.params.name + '/' + $route.params.repo">{{$route.params.repo}}</router-link>
    </div>
    <list :data = "data"/>
  </div>
</template>

<script>
  import axios from 'axios'
  import Icon from 'vue-awesome/components/Icon'
  import List from '../List/List.vue'
  import {API_URL, TYPE_CHECKER} from '../../constants'

  const ALLOW_RESULTS = [
    'name',
    'homepage',
    'description',
    'created_at',
    'updated_at',
    'forks',
    'language',
    'license',
    'open_issues',
    'size',
    'stargazers_count',
    'subscribers_count',
    'watchers'
  ];

  export default {
    data() {
      return {
        data: null,
        spinner: true,
        error: null
      }
    },
    created: function () {
      axios.get(`${API_URL}/repos/${this.$route.params.name}/${this.$route.params.repo}`)
        .then(res => {
          this.spinner = false;
          if (res.message) {
            this.error = res.message;
            this.data = null;
          } else {
            this.error = null;
            this.data = ALLOW_RESULTS.map(item => {
              return {value: TYPE_CHECKER(res.data[item]), label: item.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            })
          }
        })
        .catch(err => {
          this.spinner = false;
          if (err && err.message) {
            this.error = err.message
          }
        })
    },
    components: {
      Icon, List
    },
  }
</script>

<style lang="less">
  @import "../../assets/css/style";

  .repo-info {
    .main-content;
    a {
      color: @main-color;
      text-decoration: none;
    }
  }

  .repo-info__breadcrumbs {
    padding: 1rem;
    span {
      padding: 0 0.5rem 0 0.5rem;
    }
  }
</style>