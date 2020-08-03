<template>
  <div class="category-list">
    <scroll class="scroll">
     <div class="list-info">
       <div 
       class="list-info-item"  
       v-for="(item,index) in leftInfo" 
       :key="index" 
       @click="indexClick(index)" 
       :class="{active:index===currentIndex}">{{item.title}}</div>
     </div>
    </scroll>  
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
 export default {
  name: '',
  data () {
   return {
     currentIndex:0
   }
  },
  components: {
    Scroll
  },
  props:{
    leftInfo:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    indexClick(index){
      this.currentIndex=index;
      this.$emit('selectItem',index)
    }
  }
 }
</script>

<style scoped>
  .category-list{
    position: relative;
    z-index: 10;
  }
  .scroll{
    height:100%;
    width: 100px;
    box-sizing: border-box;
    font-size: 14px;
    text-align: center;
    background: #f6f6f6;
  }
  .list-info-item{
    height: 45px;
    line-height: 45px;
   
  }
  .active{
    border-left: 3px solid var(--color-tint);
    color: var(--color-tint);
    font-weight: 700;
    background: #fff;
  }
</style>
