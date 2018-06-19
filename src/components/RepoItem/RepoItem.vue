<template>
  <div class="repo-item">
    <div class="repo-item__block">
      <div v-if="data.description">
        <div>
          {{ data.description}}
        </div>
      </div>
      <div>
      <span class="repo-item__item" v-if="data.language">
        <icon name="circle" :color="data.language | colorize"/>
        {{ data.language }}
      </span>
        <span class="repo-item__item" v-if="data.stargazers_count > 0">
        <icon name="star"/>
        {{ data.stargazers_count }}
      </span>
        <span class="repo-item__item" v-if="data.forks > 0">
        <icon name="code-fork"/>
        {{ data.forks }}
      </span>
        <span class="repo-item__item" v-if="data.license">
        <icon name="balance-scale"/>
        {{ data.license.spdx_id }}
      </span>
        <span class="repo-item__item">
        Updated {{ moment(data.updated_at, "YYYY-MM-DD").fromNow() }}
      </span>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from 'vue-awesome/components/Icon'
  import moment from 'moment'

  export default {
    props: ['data'],
    components: {Icon},
    data() {
      return {
        moment
      }
    }
  }
</script>

<style lang="less">
  .repo-item__item {
    font-size: 0.8rem;
    padding-right: 0.5rem;
    .fa-icon {
      height: 0.6rem;
    }
  }
</style>