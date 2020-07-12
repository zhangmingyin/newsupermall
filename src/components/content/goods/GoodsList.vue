<template>
 <div class="goods">
    <GoodsListItem v-for="item in goods" :goods-item="item" :key="item.index"/>
 </div>
</template>

<script>
 import GoodsListItem from './GoodsListItem'
 export default {
  name: '',
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data () {
   return {

   }
  },
  components: {
    GoodsListItem
  }
 }
</script>

<style scoped>
  
</style>
