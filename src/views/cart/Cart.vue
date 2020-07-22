<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    
    <cart-list></cart-list>

    <cart-bottom-bar class="ignore"></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
import { mapGetters } from 'vuex'
  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
     ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  .nav-bar{
    text-align: center;
    color:#fff;
    background-color: var(--color-tint);
  }
</style>
