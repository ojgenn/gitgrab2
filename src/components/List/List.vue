<template>
  <div class="list">
    <ul class="list-group">
      <li v-for="item in getData"
          :key="item.label"
          v-if="item.value"
          class="list-group__item"
          :class = "{'list-group__item-hovered': type === 'repo'}"
          @click="goTo(item)">
        <div class="list-group__label">
          {{item.label}}
        </div>
        <repo-item v-if="type === 'repo'" :data = "item.value"/>
        <div class="list-group__value" v-html="item.value" v-else></div>
      </li>
    </ul>
    <div v-if="type === 'repo'" class="list-pagination">
      <div class="list-pagination__item" v-if="$route.query.page && $route.query.page > 1">
        <router-link :to="'/' + $route.params.name + '?path=' + $route.query.path + '&page=' + (Number($route.query.page) - 1 )">Назад</router-link>
      </div>
      <div class="list-pagination__item" v-if="!$route.query.page || ($route.query.page && $route.query.page <= 1)">
        Назад
      </div>
      <div class="list-pagination__item" v-if="getPageNumber <= getLimit + 1">
        <router-link :to="'/' + $route.params.name + '?path=' + $route.query.path + '&page=' + (Number(getPageNumber) + 1)">Вперед</router-link>
      </div>
      <div class="list-pagination__item" v-if="getPageNumber > getLimit + 1">
        Вперед
      </div>
    </div>
  </div>
</template>

<script>
  import RepoItem from '../RepoItem/RepoItem.vue'
  import {ITEMS_ON_LIST} from '../../constants'
  export default {
    props: ['data', 'type'],
    components: {RepoItem},
    methods: {
      goTo(val) {
        if(this.type === 'repo') {
          this.$router.push(`/${this.$route.params.name}/${val.label}`)
        }
      },
    },
    computed: {
      getData() {
        if(this.type !== 'repo') {
          return this.data
        }
        else {
          let arr = [...this.data];
          arr = arr.splice((this.$route.query.page - 1) * ITEMS_ON_LIST, ITEMS_ON_LIST);
          return arr
        }
      },
      getLimit() {
        console.log((this.data.length / ITEMS_ON_LIST).toFixed())
        console.log(this.data.length )
        return (this.data.length / ITEMS_ON_LIST).toFixed();
      },
      getPageNumber () {
        return this.$route.query.page || 1;
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/css/style";

  .list {
    background: @secondary-text-color;
    webkit-box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 1px 3px 0 rgba(0, 0, 0, .12);
  }

  .list-group {
    margin: 0;
    padding: 1rem;
    list-style-type: none;
  }

  .list-group__item {
    border-bottom: 1px solid #ccc;
    padding: 1rem;
    &:last-child{
      border: none;
    }
  }

  .list-group__item-hovered {
    &:hover {
      background: #eee;
      cursor: pointer;
    }
  }

  .list-group__label {
    width: 100%;
    font-size: 1.2rem;
  }

  .list-group__value {
    width: 100%;
    color: rgba(0, 0, 0, .54);
    a {
      color: @main-color;
      text-decoration: none;
    }
  }

  .fa-icon {
    width: auto;
    height: 1em; /* or any other relative font sizes */

    /* You would have to include the following two lines to make this work in Safari */
    max-width: 100%;
    max-height: 100%;
  }
  .list-pagination {
    a {
      color: @main-color;
      text-decoration: none;
    }
    display: flex;
    justify-content: center;
  }
  .list-pagination__item {
    padding: 1rem
  }
</style>