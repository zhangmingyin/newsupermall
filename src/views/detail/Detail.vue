<template>
 <div id="detail">
   <detail-nva-bar class="detail-nav"></detail-nva-bar>
   <scroll class="content" ref="scroll">
     <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detail-info="detailInfo" @imageLoad='imageLoad'></detail-goods-info>
    <detail-param-info :paramInfo="paramInfo"></detail-param-info>
   </scroll>
 </div>
</template>

<script>
import DetailNvaBar from './childComps/DetailNvaBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'

import Scroll from 'components/common/scroll/Scroll'
import {debounce} from 'common/utils'

import {getDetail, Goods,Shop,GoodsParam} from 'network/detail'
 export default {
  name: 'Detail',
  data () {
   return {
     iid:null,
     topImages:[],
     goods:{},
     shop:{},
     detailInfo:{},
     paramInfo:{}
   }
  },
  mounted(){
    this.iid=this.$route.params.iid;
    
    getDetail(this.iid).then(res=>{
      console.log(res)
      const data=res.result;
      this.topImages=res.result.itemInfo.topImages
      // console.log(this.topImages)
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services);
      this.shop=new Shop(data.shopInfo);
      this.detailInfo=data.detailInfo;
      this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
    });
   
  },
  methods:{
    imageLoad(){
      const refresh=debounce(this.$refs.scroll && this.$refs.scroll.refresh,200);
      refresh();
    }
  },
  components: {
    DetailNvaBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    Scroll
  }
 }
</script>

<style scoped>
  #detail{
    height: 100vh;
    position: relative;
    z-index: 9;
    background: #fff;
  }
  .detail-nav{
    background: #fff;
    position: relative;
    z-index: 9;

  }
  .content{
    height: calc(100% - 44px);
  }
 
</style>
