<template>
 <div id="detail">
   <detail-nva-bar class="detail-nav"></detail-nva-bar>
   <scroll class="content" ref="scroll">
     <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
    <detail-param-info :paramInfo="paramInfo"></detail-param-info>
    <detail-comment-info :comment-info="commentInfo" @clickComment='clickComment'></detail-comment-info>
    <goods-list class="list-item" :goods="recommend"></goods-list>
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
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList'


import Scroll from 'components/common/scroll/Scroll'
import {debounce} from 'common/utils'
import {itemListenerMixin} from 'common/mixin'

import {getDetail, Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
 export default {
  name: 'Detail',
  data () {
   return {
    
     iid:null,
     topImages:[],
     goods:{},
     shop:{},
     detailInfo:{},
     paramInfo:{},
     commentInfo:{},
     recommend:[]
   }
  },
  mixins:[itemListenerMixin],
  created(){
    this.iid=this.$route.params.iid 
   
    getDetail(this.iid).then(res=>{
      // console.log(res)
      const data=res.result;
      this.topImages=res.result.itemInfo.topImages
      // console.log(this.topImages)
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services);
      this.shop=new Shop(data.shopInfo);
      this.detailInfo=data.detailInfo;
      this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule);
      if(data.rate.cRate!==0){
        this.commentInfo=data.rate.list[0]
      }
    });
    getRecommend().then(res=>{
      this.recommend=res.data.list;
     
    })
  },
  mounted(){
    
  },
  destroyed(){
    this.$bus.$off('onImageLoad',this.itemImgListener)
    // console.log("destroyed")
  },
  methods:{
    
    clickComment(){
      // console.log(this.iid)
      this.$router.push('/CommentList/'+this.iid);
    },
    imageLoad(){
      this.refresh()
      
    }
  },
  components: {
    DetailNvaBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    
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
  .list-item{
    display: flex;
    flex-wrap: wrap;
    padding: 2px;
    justify-content: space-around;
  }
</style>
