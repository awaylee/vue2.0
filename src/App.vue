<template>
  <div>
    <!--<img src="./assets/logo.png">
    <router-view></router-view>-->
    <v-header></v-header>
    <!--tab-->
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>

    <!--路由匹配到的组件将渲染在这里-->
    <router-view></router-view>
  </div>
</template>

<script>
  import header from './components/header/header.vue';

  export default {
    components: {
      "v-header": header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.tab
  display flex
  width 100%
  height 40px
  line-height 40px
  border-1px (rgba(7,17,27,.1))
  .tab-item
    flex 1
    text-align center
    & > a
      display block
      font-size 14px
      color rgb(77,85,93)
      &.active
        color rgb(240,20,20)


</style>
