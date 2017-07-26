<template>
<div class="seller" ref="seller">
  <div class="seller-content">
    <div class="overview">
      <h1 class="title">{{seller.name}}</h1>
      <div class="desc border-1px">
        <star :size="36" :score="seller.score"></star>
        <span class="text">({{seller.ratingCount}})</span>
        <span class="text">月售{{seller.sellCount}}单</span>
      </div>
      <div class="remark">
        <div class="block">
          <h2>起送价</h2>
          <div class="content">
            <span class="stress">{{seller.minPrice}}</span>元
          </div>
        </div>
        <div class="block">
          <h2>商家配送</h2>
          <div class="content">
            <span class="stress">{{seller.deliveryPrice}}</span>元
          </div>
        </div>
        <div class="block">
          <h2>评价配送时间</h2>
          <div class="content">
            <span class="stress">{{seller.minPrice}}</span>分钟
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  import split from '../split/split.vue';
  import ratingselect from '../ratingselect/ratingselect.vue';
  import star from '../star/star.vue';
  import axios from 'axios';
  import {formatDate} from '../../common/js/date';
  import BScroll from 'better-scroll';

  export default {
    props:{
      seller:{
        type:Object
      }
    },
    components:{
      star,

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .seller
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .overview
      padding 18px
      .title
        margin-bottom 8px
        line-height 14px
        color rgb(7,17,27)
        font-size 14px
      .desc
        padding-bottom 18px
        line-height 18px
        font-size 0
        border-1px(rgba(7,17,27,.1))
        .star
          display inline-block
          vertical-align top
          margin-right 8px
        .text
          display inline-block
          vertical-align top
          font-size 10px
          margin-right 12px
          color rgb(77,85,93)
      .remark
        display flex
        padding-top 18px
        .block
          flex 1
          text-align center
          border-right 1px solid rgba(7,17,27,.1)
          &:last-child
            border none
          h2
            margin-bottom 4px
            line-height 10px
            font-size 10px
            color rgb(147,153,159)
          .content
            line-height 24px
            font-size 10px
            color rgb(7,17,27)
            .stress
              font-size 24px



</style>