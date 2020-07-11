<template>
 <div class="recommend">
   <div class="recommends-item" v-for="item in recommends" :key="item.index">
     <a :href="item.link">
       <img :src="item.image" alt="">
       <div>{{item.title}}</div>
     </a>
   </div>
 </div>
</template>

<script>
 export default {
  name: '',
  data () {
   return {

   }
  },
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components: {

  }
 }
</script>

<style scoped>
  .recommend{
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 10px 0px 20px;
    border-bottom: 9px solid #eee;
  }
  .recommends-item{
    flex:1
  }
  .recommends-item img{
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>
