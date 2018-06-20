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
      <div class="list-pagination__item" @click="list('prev')">
        <span :class="{'list-patination__item-link': checkIfCanRoute('prev')}">Назад</span>
      </div>
      <div class="list-pagination__item" @click="list('forw')">
        <span :class="{'list-patination__item-link': checkIfCanRoute('forw')}">Вперед</span>
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
      getPageLimit() {
        let pageLimit;
        if(this.data.length % ITEMS_ON_LIST > 0) {
          pageLimit = (this.data.length - (this.data.length % ITEMS_ON_LIST))/ITEMS_ON_LIST + 1;
        } else {
          pageLimit = this.data.length/ITEMS_ON_LIST;
        }
        return pageLimit;
      },
      checkIfCanRoute(val) {
        let page = 1;
        if(this.$route.query.page) {page = Number(this.$route.query.page)}
        let pageLimit = this.getPageLimit();
        if(page <= 1 && val === 'prev') {return false}
        else if (page >= pageLimit && val === 'forw') {return false}
        else return true;
      },
      list (val) {
        let page = 1;
        if(this.$route.query.page) {page = Number(this.$route.query.page)}
        if(this.checkIfCanRoute(val)) {
          let to = '/' + this.$route.params.name + '?path=' + this.$route.query.path + '&page='
          if(val === 'prev') {
            to += page - 1
          } else {
            to += page + 1
          }
          this.$router.push(to)
        }
      }
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
        return this.getPageLimit();
      },
      getPageNumber () {
        return this.$route.query.page || 1;
      }, 
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
    padding: 1rem;
  }
  .list-patination__item-link {
    color: @main-color;
    cursor: pointer;
  }
</style>