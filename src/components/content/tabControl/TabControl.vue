<template>
 <div class="tab-control">
    <div class="tab-control-item" 
      v-for="(item,index) in titles" :key="index" 
      :class="{active:index===currentIndex}" @click="tabClick(index)">
     <span>{{item}}</span>
    </div>
 </div>
</template>

<script>
 export default {
  name: '',
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data () {
   return {
     currentIndex:0
   }
  },
  components: {

  },
  methods:{
    tabClick(index){
      this.currentIndex=index;
      this.$emit('tabclick',index)
    }
  }
 }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    height: 44px;
    line-height: 44px;
    font-size: 15px;
    background-color: #fff;
  }
  .tab-control-item{
    flex: 1;
  }
  .tab-control-item span{
    padding: 5px;
  }
  .active{
    color:var(--color-high-text)
  }
  .active span{
     border-bottom: 2px solid #ff8198;
  }
</style>
