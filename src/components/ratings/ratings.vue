<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @selecttype="setType" @content="setOnlycontent" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)" class="rating-item">
            <div class="avatar">
              <img :src="rating.avatar" alt=""  width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <div class="text">{{rating.text}}</div>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span v-for="item in rating.recommend" class="item">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
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

  const ERR_OK = 0;
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props:{
      seller:{
        type:Object
      }
    },
    data() {
      return {
        ratings:[],
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc:{
          all:'全部',
          positive:'满意',
          negative:'不满意'
        }
      }
    },
    created() {
      axios.get('/api/ratings').then((response) => {
        response = response.data;
        if (response.errno == ERR_OK) {
          this.ratings = response.data;
          console.log('ratings:',this.ratings);
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings ,{
              click:true
            });
          })
        }
      })
        .catch((err) => {
          console.log('error:',err);
        });
    },
    methods:{
      setType(type) {
        this.selectType = type;
        //手动刷新better-scroll重新计算页面高度
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      setOnlycontent() {
        this.onlyContent = !this.onlyContent;
        //手动刷新better-scroll重新计算页面高度
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      needShow(type,text) {
        if(this.onlyContent && !text) {
          return false;
        }
        if(this.selectType == ALL) {
          return true;
        } else {
          return type == this.selectType;
        }
      }
    },
    filters:{
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date,'yyyy-MM-dd hh:mm');
      }
    },
    components:{
      star,
      split,
      ratingselect
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .ratings
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .overview
      display flex
      padding 18px 0
      .overview-left
        flex 0 0 137px
        padding 6px 0
        width 137px
        border-right 1px solid rgba(7,17,27,.2)
        text-align center
        @media only screen and (max-width 320px)
          flex 0 0 120px
          width 120px
        .score
          line-height 28px
          font-size 24px
          color rgb(255,153,0)
          margin-bottom 6px
        .title
          margin-bottom 8px
          line-height 12px
          font-size 12px
          color rgb(7,17,27)
        .rank
          line-height 10px
          font-size 10px
          color rgb(147,153,159)
      .overview-right
        flex 1
        padding 6px 0 6px 24px
        @media only screen and (max-width 320px)
          padding-left 6px
        .score-wrapper
          margin-bottom 8px
          font-size 0
          .title
            display inline-block
            vertical-align top
            line-height 18px
            font-size 12px
            color rgb(7,17,27)
          .star
            display inline-block
            vertical-align top
            margin 0 12px
          .score
            display inline-block
            vertical-align top
            line-height 18px
            font-size 10px
            color rgb(255,153,0)
        .delivery-wrapper
          font-size 0
          .title
            line-height 18px
            font-size 12px
            color rgb(7,17,27)
          .delivery
            font-size 12px
            color rgb(147,153,159)
            margin-left 12px
    .rating-wrapper
      padding 0 18px
      .rating-item
        display flex
        padding 18px 0
        border-1px(rgba(7,17,27,.1))
        .avatar
          flex 0 0 28px
          width 28px
          margin-right 12px
          img
            border-radius 50%
        .content
          position relative
          flex 1
          .name
            margin-bottom 4px
            line-height 12px
            font-size 10px
            color rgb(7,17,27)
          .star-wrapper
            margin-bottom 6px
            font-size 0
            .star,.delivery
              display inline-block
              margin-right 6px
              vertical-align top
            .delivery
              line-height 12px
              font-size 10px
              color rgb(147,153,159)


          .text
            display inline-block
            line-height 18px
            font-size 12px
            color rgb(7,17,27)
            margin-bottom 8px
          .recommend
            font-size 0
            span
              display inline-block
              line-height 16px
              vertical-align top
              font-size 12px
              margin 0 8px 4px 0
            .icon-thumb_up
              color rgb(0,160,220)
            .icon-thumb_down
              color rgb(147,153,159)
            .item
              line-height 16px
              font-size 9px
              padding 0 6px
              border 1px solid rgba(7,17,27,.1)
              border-radius 1px
              color rgb(147,153,159)
              background #fff
          .time
            position absolute
            right 0
            top 0
            line-height 12px
            font-size 10px
            color rgb(147,153,159)



</style>