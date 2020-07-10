<template>
  <div id="app">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {getHomeMultiData} from 'network/home'
  export default {
    name: "Home",
    data(){
      return {
        banner:[],
        recommend:[]
      }
    },
    components:{
      NavBar
    },
    created(){
      getHomeMultiData().then(res=>{
        this.banner=res.data.banner.list;
        this.recommend=res.data.recommend.list;
        
      })
    }
  }
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    text-align: center;
  }
</style>
