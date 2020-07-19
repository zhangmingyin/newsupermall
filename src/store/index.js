import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store=new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations:{
    addCart(state,payload){
     //方式1：定义购物车数量初始为空
      // let oldProduct=null;
      // //遍历cartList数量，取出每个商品，判断商品id和新加入商品id是否一样，如果一样就赋值
      // for(let item of state.cartList){
      //   if(item.iid===payload.iid){
      //     oldProduct=item
      //   }
      // }
      //方式2：
      let oldProduct=state.cartList.find(item => item.iid===payload.iid)
      //如果购物车有这个商品，泽该商品数量加1
      if(oldProduct){
        oldProduct.count+=1
      }else{
        //否则就让新商品数量=1，然后添加新商品到购物车
        payload.count=1;
        state.cartList.push(payload);
      }
      
    }
  }
})
export default store