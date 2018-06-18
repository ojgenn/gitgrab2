<template>
  <nav class="sidebar">
    <img :src="$store.state.data.avatar_url" alt="avatar" class="sidebar-avatar">
    <h3 class="sidebar-login">
      <a :href="`https://github.com/${$store.state.data.login}`"
         :class="{'sidebar-login__link-main': position === 'layout', 'sidebar-list__link-side': positon !== 'layout'}">
        {{$store.state.data.login}}
      </a>
    </h3>
    <ul class="sidebar-list">
      <li
              v-for="item in list"
              class="sidebar-list__item"
              :key="item.to"
              @click="goTo(item.to)"
              :class="{'sidebar-list__item-main': position === 'layout'}">
        {{item.value}}
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    data() {
      return {
        list: [
          {to: '/', value: 'На главную'},
          {to: `/${this.user}?path=info`, value: 'О юзере'},
          {to: `/${this.user}?path=repo`, value: 'Репозитории'}
        ]
      }
    },
    methods: {
      goTo(val) {
        this.$router.push({path: val})
      }
    },
    props: ['position', 'user']
  }
</script>

<style lang="less">
  @import "../../assets/css/style";

  .sidebar-avatar {
    width: 100%;
  }

  .sidebar-login {
    padding: 1rem;
    margin: 0;
    text-align: center;
    cursor: pointer;
  }

  .sidebar-login__link-main {
    color: @main-color;
    text-decoration: none;
  }

  .sidebar-list__link-side{
    color: @secondary-text-color;
    text-decoration: none;
  }

  .sidebar-list {
    padding: 1rem;
    margin: 0;
  }

  .sidebar-list__item {
    text-transform: uppercase;
    padding: 0.5rem;
    color: @secondary-text-color;
    &:hover {
      cursor: pointer;
    }
  }

  .sidebar-list__item-main {
    color: @main-color;
    a, a:hover, a:active {
      text-decoration: none;
    }
    &:hover {
      background: #eee;
    }
  }

</style>