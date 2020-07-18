<template>
 <div class="comment-list">
   <list-nav-bar></list-nav-bar>
   <scroll class="scroll">
      <list-info :comment-info="commentInfo"></list-info>
   </scroll>
   
 </div>

</template>

<script>
import ListInfo from './childComps/ListInfo'
import ListNavBar from './childComps/ListNavBar'

import {getDetail} from 'network/detail'
import Scroll from 'components/common/scroll/Scroll'

import NavBar from 'components/common/navbar/NavBar'
 export default {
  name: 'CommentList',
  data () {
   return {
     iid:null,
     commentInfo:[]
   }
  },
  components: {
    Scroll,
    ListInfo,
    ListNavBar
  },
  mounted(){
     this.iid=this.$route.params.iid;
    //  console.log(this.iid);
     getDetail(this.iid).then(res=>{
      //  console.log(res)
       const data=res.result;
        if(data.rate.cRate!==0){
        this.commentInfo=data.rate.list;
        // console.log(this.commentInfo)
      }
     })
    
  }
 }
</script>

<style scoped>
  .comment-list{
      height: 100vh;
    position: relative;
    z-index: 9;
    background: #fff;
  }
  .scroll{
    height: calc(100% - 44px);
  }
</style>
