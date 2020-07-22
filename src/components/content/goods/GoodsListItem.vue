<template>
 <div class="goods-item" @click="itemClick">
    <img v-lazy="showImg" @load="imageLoad"/>
    <div class="goods-info">
       <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
 </div>
</template>

<script>
 export default {
  name: '',
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data () {
   return {

   }
  },
  computed:{
    showImg(){
      return this.goodsItem.image || this.goodsItem.show.img

    }
  },
  components: {

  },
  methods:{
    imageLoad(){
      this.$bus.$emit('onImageLoad')
    },
    itemClick(){
      //首页商品数据点击跳转  
      if(this.goodsItem.iid)
        this.$router.push('/detail/'+this.goodsItem.iid) 
    }
  }
 }
</script>

<style scoped>
  .goods-item{
    position: relative;
    padding-bottom: 40px;
    width: 48%;
  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }
  .goods-info{
    font-size: 14px;
    position: absolute;
    left: 0;
    bottom: 5px;
    right: 0;
    text-align: center;
    overflow: hidden;
  }
  .goods-info p{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect{
    position: relative;
  }
  .goods-info .collect::before{
    content:'';
    position: absolute;
    top: -1px;
    left: -14px;
    width: 14px;
    height: 14px;
    background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
  }
</style>
