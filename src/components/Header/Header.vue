<template>
  <div>
    <div class="header">
      <div class="header-logo">
        <div v-if="showMenu" @click="sideNav = !sideNav">
          <icon name="bars" class="header-logo__image"/>
        </div>
        <img src="../../assets/images/github.png" class="header-logo__image" v-else @click="goHome"/>
        <span class="header-logo__label" @click="goHome">gitgrab</span>
      </div>
      <div class="header-input">
        <input type="text" placeholder="Введите имя" v-model="inputValue" @keyup.enter="submit">
        <div class="header-input__icons">
          <transition name="fade">
          <span @click="inputValue = null" v-show="inputValue">
            <icon name="times"></icon>
          </span>
          </transition>
          <span @click="submit" class="header-input__icons-search">
          <icon name="search"></icon>
        </span>
        </div>
      </div>
    </div>
    <div v-if="showMenu && sideNav" class="side-bar">
      <div class="side-bar__layout" @click="sideNav = !sideNav"></div>
      <div class="side-bar__bar">
        <side-bar position="side" :user="this.$route.params.name"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from 'vue-awesome/components/Icon'
  import {SET_WINDOW_SIZE} from '../../store/mutation.types'
  import SideBar from '../Sidenavbar/Sidenavbar.vue'

  export default {
    data() {
      return {
        inputValue: null,
        sideNav: false,
        routerName: '',
      }
    },
    methods: {
      goHome() {
        this.inputValue = null;
        this.sideNav = false;
        this.$router.push('/');
      },
      submit() {
        this.sideNav = false;
        this.$router.push(`/${this.inputValue}`)
      },
      handleResize() {
        this.$store.commit(SET_WINDOW_SIZE, {
          width: window.innerWidth,
          height: window.innerHeight
        })
      }
    },
    computed: {
      showMenu() {
        return this.routerName !== 'home' && this.$store.state.window.width < 600 && this.$store.state.data
      }
    },
    created: function () {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
      this.routerName = this.$route.name;
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize);
    },
    components: {Icon, SideBar},
    watch: {
      '$route'(to) {
        this.sideNav = false;
        this.routerName = to.name;
      }
    }
  }
</script>


<style scoped lang="less">
  @import "../../assets/css/style";

  @padding-constant: 1rem;
  @color-constant: 20%;

  .fa-icon {
    &:active, :hover {
      opacity: 0.6;
    }
  }

  .header {
    background: @main-color;
    height: @header-height;
    .vertical-align;
    justify-content: space-between;
  }

  .header-logo {
    height: 100%;
    .vertical-align;
    padding-left: @padding-constant;
    &:hover {
      cursor: pointer;
    }
  }

  .header-logo__image {
    height: calc(@header-height - @padding-constant);
    width: calc(@header-height - @padding-constant);
    .fa-icon {
      height: calc(@header-height - @padding-constant);
      width: calc(@header-height - @padding-constant);
    }
  }

  .header-logo__label {
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.2rem;
    padding-left: @padding-constant;
    @media screen and (max-width: 450px) {
      display: none;
    }
  }

  .header-input {
    .fa-icon {
      height: 0.7rem;
      padding-right: 0.3rem;
      padding-left: 0.3rem;
    }
    padding-right: @padding-constant;
    input {
      display: inline-flex;
      background: transparent;
      position: relative;
      padding-right: calc(@padding-constant * 3);
      border: none;
      border-bottom: 1px solid @secondary-text-color;
      color: @secondary-text-color;
      &:focus {
        outline: none;
        &::-webkit-input-placeholder {
          color: transparent;
        }
      }
      &::placeholder {
        font-style: italic;
        color: darken(@secondary-text-color, @color-constant);
      }
      &:-moz-placeholder {
        font-style: italic;
        color: darken(@secondary-text-color, @color-constant);
      }
      &::-webkit-input-placeholder {
        font-style: italic;
        color: darken(@secondary-text-color, @color-constant);
      }
    }
    .header-input__icons {
      display: inline;
      position: absolute;
      right: @padding-constant;
      &:hover {
        cursor: pointer;
      }
    }
  }

  .side-bar__layout {
    display: flex;
    background: #eeeeee;
    opacity: 0.5;
    filter: blur(1px);
    position: absolute;
    top: calc(0 - @header-height);
    width: 100%;
    height: calc(100vh - @header-height);
    z-index: 50;
  }

  .side-bar__bar {
    display: flex;
    justify-content: center;
    background: @main-color;
    position: absolute;
    top: calc(0 - @header-height);
    width: 80%;
    max-width: 20rem;
    height: calc(100vh - @header-height);
    -webkit-box-shadow: 2px 0px 2px 0px rgba(168, 168, 168, 0.75);
    box-shadow: 2px 0px 2px 0px rgba(168, 168, 168, 0.75);
    z-index: 999;
    & a {
      color: @secondary-text-color;
    }
  }
</style>