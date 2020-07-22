export default {
  addCart(context,payload){
    return new Promise((resolve,reject)=>{
      let oldProduct=context.state.cartList.find(item => item.iid===payload.iid);
      if(oldProduct){
        context.commit('addCounter',oldProduct);
        resolve('商品数量+1')
      }else{
        payload.count=1
        context.commit('addToCart',payload)
        resolve('添加购物车成功')
      }
    })
    //方式1：定义购物车数量初始为空
     // let oldProduct=null;
     // //遍历cartList数量，取出每个商品，判断商品id和新加入商品id是否一样，如果一样就赋值
     // for(let item of state.cartList){
     //   if(item.iid===payload.iid){
     //     oldProduct=item
     //   }
     // }
     //方式2：
     let oldProduct=context.state.cartList.find(item => item.iid===payload.iid)
     //如果购物车有这个商品，泽该商品数量加1
     if(oldProduct){
      //  oldProduct.count+=1
      context.commit('addCounter',oldProduct)
     }else{
       //否则就让新商品数量=1，然后添加新商品到购物车
       payload.count=1;
      //  context.state.cartList.push(payload);
      context.commit('addToCart',payload)
     }
     
   }
}