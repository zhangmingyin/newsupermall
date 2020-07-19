<template>
 <div id="detail">
   <detail-nva-bar class="detail-nav" @titleClick="titleClick" ref="navbar"></detail-nva-bar>
   <scroll class="content" ref="scroll" :probe-type="3" @scroll="scroll">
     <ul>
     <li v-for="item in $store.state.cartList" :key="item.iid">{{item}}</li>
   </ul>
     <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
    <detail-param-info ref="params" :paramInfo="paramInfo"></detail-param-info>
    <detail-comment-info ref="comment" :comment-info="commentInfo" @clickComment='clickComment'></detail-comment-info>
    <goods-list ref="recommend" class="list-item" :goods="recommend"></goods-list>
   </scroll>
   <detail-bottom-bar @addToCart="addCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
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
import DetailBottomBar from './childComps/DetailBottomBar'
import BackTop from 'components/content/backTop/BackTop'


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
     recommend:[],
     themeTopY:[],
     themeImage:null,
     currentIndex:0,
     isShowBackTop:false
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
      // this.$nextTick(()=>{
      //    this.themeTopY=[]
      //   this.themeTopY.push(0);
      //   this.themeTopY.push(this.$refs.params.$el.offsetTop-44)
      //   this.themeTopY.push(this.$refs.comment.$el.offsetTop-44)
      //   this.themeTopY.push(this.$refs.recommend.$el.offsetTop-44);
      //   console.log(this.themeTopY)
      // })
    });
    getRecommend().then(res=>{
      this.recommend=res.data.list;
     
    });
    this.themeImage=debounce(()=>{
       this.themeTopY=[]
        this.themeTopY.push(0);
        this.themeTopY.push(this.$refs.params.$el.offsetTop-49)
        this.themeTopY.push(this.$refs.comment.$el.offsetTop-49)
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop-49);
        // console.log(this.themeTopY)
    },100)
  },
  mounted(){
    
  },
  
  destroyed(){
    this.$bus.$off('onImageLoad',this.itemImgListener)
    // console.log("destroyed")
  },
  methods:{
     //点击图标回到顶部
    backClick(){
      this.$refs.scroll.scrollTo(0,0,400)
    },
    
    clickComment(){
      // console.log(this.iid)
      this.$router.push('/CommentList/'+this.iid);
    },
    imageLoad(){
      this.refresh()
      this.themeImage()
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopY[index],200)
    },
    scroll(position){
      //backtop的显示和隐藏
      this.isShowBackTop= (-position.y) > 1000;
     
      const positionY=-position.y;
      // console.log(positionY)
      let length=this.themeTopY.length
      for(let i=0;i<length;i++){
        
        if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1]) || (i === length - 1 && positionY >= this.themeTopY[i]))){ 
           this.currentIndex=i
          //  console.log(this.currentIndex)
          this.$refs.navbar.currentIndex=this.currentIndex
        }
      }
    },
    addCart(){
      const product={};
      product.image=this.topImages[0];
      product.price=this.goods.newPrice;
      product.title=this.goods.title;
      product.desc=this.goods.desc;
      product.iid=this.iid;
      this.$store.commit("addCart",product)
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
    DetailBottomBar,
    BackTop,
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
    height: calc(100% - 44px - 49px);
    background: #fff;
  }
  .list-item{
    display: flex;
    flex-wrap: wrap;
    padding: 2px;
    justify-content: space-around;
  }
</style>
