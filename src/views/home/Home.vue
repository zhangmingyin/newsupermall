<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend :recommends="recommends"></recommend>
    <feature-view></feature-view>
    <ul>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
    </ul>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import Recommend from './childComps/Recommend'
import FeatureView from './childComps/FeatureView'

import {getHomeMultiData} from 'network/home'
  export default {
    name: "Home",
    data(){
      return {
        banners:[],
        recommends:[]
      }
    },
    components:{
      NavBar,
      HomeSwiper,
      Recommend,
      FeatureView
    },
    created(){
      getHomeMultiData().then(res=>{
        console.log(res)
        this.banners=res.data.banner.list;
        this.recommends=res.data.recommend.list;
        
      })
    }
  }
</script>

<style scoped>
  #home{
      padding-top: 44px;
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
</style>
