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
    .main-content;
    .vertical-align;
  }

  .home-content {
    display: flex;
    flex-wrap: wrap;
    h1, span {
      display: inline-flex;
      width: 100%;
      justify-content: center;
      text-align: center;
    }
  }
</style>
