<template>
  <div class="header">
    <div class="header-logo">
      <img src="../../assets/images/github.png" class="header-logo__image"/>
      <span class="header-logo__label">gitgrab</span>
    </div>
    <div class="header-input">
      <input type="text" placeholder="Введите имя" v-model="inputValue">
      <div class="header-input__icons">
        <transition name="fade">
          <span v-on:click="inputValue = null"  v-show="inputValue">
            <icon name="times"></icon>
          </span>
        </transition>
        <icon name="search"></icon>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from 'vue-awesome/components/Icon'

  export default {
    data() {
      return {
        inputValue: null
      }
    },
    components: {Icon}
  }
</script>


<style lang="less">
  @import "../../assets/css/style";

  @padding-constant: 1rem;
  @color-constant: 20%;

  .header {
    background: @main-color;
    height: 3rem;
    .vertical-align;
    justify-content: space-between;
  }

  .header-logo {
    height: 100%;
    .vertical-align;
    padding-left: @padding-constant;
  }

  .header-logo__image {
    height: calc(100% - @padding-constant);
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
        color: darken(@secondary-text-color, @color-constant);
      }
      &:-moz-placeholder {
        color: darken(@secondary-text-color, @color-constant);
      }
      &::-webkit-input-placeholder {
        color: darken(@secondary-text-color, @color-constant);
      }
    }
    .fa-icon {
      height: 0.7rem;
      padding-right: 0.3rem;
      padding-left: 0.3rem;
    }
    .header-input__icons {
      display: inline;
      position: absolute;
      right: @padding-constant;
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
  }
</style>