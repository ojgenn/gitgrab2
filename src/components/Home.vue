<template>
  <div class="home">
    <transition appear name="fade">
      <div class="home-content" v-show="show">
        <h1>Сервис просмотра профилей Github</h1>
        <span>Чтобы просмотреть профиль, введите имя юзера</span>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false
      }
    },
    name: 'home',
    created: function () {
      this.show = true;
    }
  }
</script>

<style scoped lang="less">
  @import "../assets/css/style";

  .home {
    color: @main-text-color;
    padding: 1rem;
    .vertical-align;
    height: calc(100vh - @header-heiht - 2rem);
    max-width: 960px;
    margin: auto;
  }

  .home-content {
    display: flex;
    flex-wrap: wrap;
    h1, span {
      display: inline-flex;
      width: 100%;
      justify-content: center;
    }
  }
</style>
