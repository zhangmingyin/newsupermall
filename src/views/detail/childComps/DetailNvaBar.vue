<template>
 <div>
   <nav-bar >
    <div slot="left" class="nav-left" @click="back" >
      <img src="~assets/img/common/back.svg" alt=''/>
    </div>  
    <div slot="center" class="detail">
      <div 
      v-for="(item,index) in titles" 
      :key="index" 
      class="nav-item" 
      @click="itemIndex(index)" 
      :class="{active:currentIndex===index}">{{item}}</div>  
    </div>  
   </nav-bar>
 </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
 export default {
  name: '',
  data () {
   return {
     titles:['商品','参数','评论','推荐'],
     currentIndex:0
   }
  },
  components: {
    NavBar
  },
  methods:{
    itemIndex(index){
      this.currentIndex=index
    },
    back(){
      this.$router.go(-1)
    }
  }
 }
</script>

<style scoped>
  .detail{
    display: flex;
    text-align: center;
    font-size: 14px;
  }
  .nav-item{
    flex: 1;
    
  }
  .nav-left{
    text-align: center;
  }
  .nav-left img{
    margin-top: 11px;
  }
  .active{
    color:var(--color-tint)
  }
</style>
