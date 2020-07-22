<template>
 <div class="toast" v-show="isShow">
   <div>{{message}}</div>
 </div>
</template>

<script>
 export default {
  name: '',
  props:{
    // message:{
    //   type:String,
    //   default:''
    // },
    // show:{
    //   type:Boolean,
    //   default:false
    // }
  },
  data(){
    return {
      message:'',
      isShow:false
    }
  },
  components: {

  },
  methods:{
    show(message,duration=2000){
      this.message=message;
      this.isShow=true;
      setTimeout(()=>{
        this.message='';
        this.isShow=false
      },duration)
    }
  }
 }
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: rgba(0,0,0,.75);
    padding: 8px 10px;
    color: #fff;
    border-radius: 5px;
    z-index: 99;
  }
 
</style>
