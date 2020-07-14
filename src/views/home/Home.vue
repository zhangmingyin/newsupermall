<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <scroll class="scroll-content"
            ref="scroll" 
            @scroll="contentScroll" 
            :probeType="3" 
            :pull-up-load="true" @pullingup="pullingUp">
      <home-swiper :banners="banners"></home-swiper>
      <recommend :recommends="recommends"></recommend>
      <feature-view></feature-view>
      <tab-control class="tab-control" @tabclick="tabClick" :titles="['流行','新款','精选']"></tab-control>
      
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
        isShowBackTop:false
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

      this.$bus.$on('onImageLoad',()=>{
        // console.log('监听图片加载')
        this.$refs.scroll && this.$refs.scroll.refresh();
      })
    },
    methods:{
      getHomeMultiData(){
        getHomeMultiData().then(res=>{
          this.banners=res.data.banner.list;
          this.recommends=res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page=this.goods[type].page+1;
        getHomeGoods(type,page).then(res=>{
          // console.log(res)
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page+=1;
          this.$refs.scroll.finishPullUp();
        })
      },
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
        }
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0,400)
      },
      contentScroll(position){
        // console.log(position)
        this.isShowBackTop= (-position.y) > 1000
      },
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
  .tab-control{
    position: sticky;
    top:44px;
    z-index: 9;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    text-align: center;
    position: fixed;
    z-index: 9;
    left: 0;
    top: 0;
    right: 0;
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
  /* .scroll-content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>
