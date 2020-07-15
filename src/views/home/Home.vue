<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <tab-control ref="tabcontrol1" class="tab-control" v-show="isbackFiexd" @tabclick="tabClick" :titles="['流行','新款','精选']"></tab-control>
    <scroll class="scroll-content"
            ref="scroll" 
            @scroll="contentScroll" 
            :probeType="3" 
            :pull-up-load="true" @pullingup="pullingUp">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend :recommends="recommends"></recommend>
      <feature-view></feature-view>
      <tab-control ref="tabcontrol2" @tabclick="tabClick" :titles="['流行','新款','精选']"></tab-control>
      
      <GoodsList class="goods-list" :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    
  </div>   
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import Recommend from './childComps/Recommend'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultiData,getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'
  export default {
    name: "Home",
    data(){
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        currenType:'pop',
        isShowBackTop:false,
        tabOffset:0,
        isbackFiexd:false,
        saveY:0
      }
    },
    components:{ 
      HomeSwiper,
      Recommend,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    created(){
      this.getHomeMultiData();
      //请求商品goods列表数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted(){
      //监听图片进行防抖处理
      const refresh=debounce(this.$refs.scroll && this.$refs.scroll.refresh,200)
      this.$bus.$on('onImageLoad',()=>{   
        refresh();
      });
      
    },
    activated(){
      // console.log('进入');
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.saveY);
      
    },
    deactivated(){
      // console.log('离开');
      this.saveY=this.$refs.scroll.getSaveY()
      
    },
    methods:{
      //接收轮播图中发出的监听图片事件
      swiperImageLoad(){
        this.tabOffset=this.$refs.tabcontrol2.$el.offsetTop;
        // console.log(this.tabOffset)
      },
      //首页多个数据
      getHomeMultiData(){
        getHomeMultiData().then(res=>{
          this.banners=res.data.banner.list;
          this.recommends=res.data.recommend.list;
        })
      },
      //首页商品
      getHomeGoods(type){
        const page=this.goods[type].page+1;
        getHomeGoods(type,page).then(res=>{
          // console.log(res)
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page+=1;
          this.$refs.scroll.finishPullUp();
        })
      },
      //点击切换商品类型
      tabClick(index){
        switch(index){
          case 0:
            this.currenType='pop';
            break;
          case 1:
            this.currenType='new';
            break;
          case 2:
            this.currenType='sell';
            break;
        };
        this.$refs.tabcontrol1.currentIndex=index;
        this.$refs.tabcontrol2.currentIndex=index;
      },
      //点击图标回到顶部
      backClick(){
        this.$refs.scroll.scrollTo(0,0,400)
      },
      //图标的滚动显示和隐藏
      contentScroll(position){
        // console.log(position)
        //backtop的显示和隐藏
        this.isShowBackTop= (-position.y) > 1000;
        //tabcontrol的显示和隐藏
        this.isbackFiexd=(-position.y) > this.tabOffset
      },
      //商品上拉加载更多
      pullingUp(){
        this.getHomeGoods(this.currenType);
      
      }
    },
     computed:{
      showGoods(){
        return this.goods[this.currenType].list;
      }
    },
  }
</script>

<style scoped>
  #home{
      /* padding-top: 44px; */
      height: 100vh;
      position: relative;
  }
  /* .tab-control{
    position: sticky;
    top:44px;
    z-index: 9;
  } */
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    text-align: center;
    /* position: fixed;
    z-index: 9;
    left: 0;
    top: 0;
    right: 0; */
  }
  .goods-list{
    display:flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
  .scroll-content{
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
  /* .fixed{
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
  } */
  /* .scroll-content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>
