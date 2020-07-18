<template>
 <div class="back-bg">
   <nav-bar>
     <div slot="left" class="left" @click='backClick'>
       <img src="~assets/img/common/back.svg"/>
     </div>

     <div slot="center" class="list-info">
       <div>用户评论</div>
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

   }
  },
  components: {
    NavBar
  },
  methods:{
    backClick(){
      this.$router.go(-1)
    }
  }
 }
</script>

<style scoped>
  .list-info{
    text-align: center;
  }
  .left{
    margin-top: 6px;
    text-align: center;
  }
  .back-bg{
    background: #fff;
    position: relative;
    z-index: 9;
  }
</style>
