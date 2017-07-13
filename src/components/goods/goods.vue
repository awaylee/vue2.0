<template>
  <div class="goods" >
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{current:currentIndex == index}" @click="selectMenu(index,$event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon" alt="" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopCart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopCart>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import BScroll from 'better-scroll';
  import shopCart from '../shopcart/shopcart.vue'

  const ERR_OK = 0;

  export default {
    props: {
      seller:{
        type:Object
      }
    },
    data () {
      return {
        goods:[],
        listHeight:[],
        scrollY:0
      }
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i+1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      }
    },
    created() {
      this.classMap = [
        'decrease','discount','special','invoice','guarantee'
      ];
      axios.get('/api/goods').then((response) => {
        response = response.data;
        if (response.errno == ERR_OK) {
          this.goods = response.data;
          console.log('goods:',this.goods);
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          })
        }
      })
      .catch((err) => {
        console.log('error:',err);
      })

    },
    methods: {
      selectMenu (index,event) {
        if(!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el,300);
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3
        });

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        })

      },
      _calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for(let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    },
    components:{
      'shopCart': shopCart
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin"
  .goods
    position absolute
    width 100%
    top 170px
    bottom 46px
    display flex
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        width 56px
        height 54px
        line-height 14px
        padding 0 12px
        &.current
          position relative
          margin-top -1px
          z-index 10
          background #fff
          font-weight 700
          .text
            border none
        .text
          font-size 12px
          display table-cell
          width 56px
          vertical-align middle
          border-1px(rgba(7,17,27,.1))
          .icon
            display inline-block
            vertical-align top
            width 12px
            height 12px
            margin-right 2px
            background-size 12px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147,153,159)
        background #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7,17,27,.1))
        &:last-child
          border-none()
          mmargin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            color rgh(7,17,27)
          .desc,.extra
            line-height 10px
            font-size 10px
            color rgb(147,153,159)
          .desc
            margin-bottom 8px
          .extra
            .count
              margin-right 12px
              line-height 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 8px
              font-size 14px
              color rgb(240,20,20)
            .old
              text-decoration line-through
              font-size 10px
              color rgb(147,153,159)

</style>