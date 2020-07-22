<template>
 <div class="bottom-bar ignore">
   <div class="check-content">
     <check-button class="checked" :is-checked="isChecked" @click.native="cheClick"></check-button>
     <span>全选</span>
   </div>

   <div class="price">
     合计:<span>{{totalPrice}}</span> 
   </div>

   <div class="calculeta" @click='calcClick'>
     去计算({{cartListLength}})
   </div>
 </div>
</template>

<script>
import CheckButton from './CheckButton'
import {mapGetters} from 'vuex'
 export default {
  name: '',
  data () {
   return {

   }
  },
  components: {
    CheckButton
  },
  computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
      return '￥'+ this.cartList.filter(item => {
        return item.checked
      }).reduce((prev,item) => {
        return prev + item.price * item.count
      },0).toFixed(2)
    },
    cartListLength(){
      return this.cartList.filter(item => item.checked).length
    },
    isChecked(){
      //判断购物车有无数据
      if(this.cartList.length===0) return false;
      //方式一：filter函数
      // return !(this.cartList.filter(item => !item.checked).length)
      //方式二：find函数
      // return !this.cartList.find(item => !item.checked)
      //方式三：普通for循环
      for(let item of this.cartList){
        if(!item.checked){
          return false
        }
      }
      return true
    }
  },
  methods:{
    cheClick(){
      if(this.isChecked){ //如果是全选
        //让其他checked都为false
        this.cartList.forEach(item => item.checked=false)
      }else{
        //否则就让所有checked为true
        this.cartList.forEach(item =>item.checked=true)
      }
    },
    calcClick(){
      if(this.cartListLength===0){
        this.$toast.show('请选择您要购买的商品',2000)
      }
    }
  }
 }
</script>

<style scoped>
  .bottom-bar{
    display: flex;
    height: 40px;
    background:#eee;
    line-height: 40px;
    position: relative;
    bottom: 133px;
    font-size: 15px;
  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 5px;
    width: 60px;
  }
  .checked{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 6px;
  }
  .price{
    margin-left: 10px;
    flex: 1;
    text-align: center;
  }
  .price span{
    color: red;
  }
  .calculeta{
    width: 90px;
    background: var(--color-tint);
    color: #fff;
    text-align: center;
  }
</style>
