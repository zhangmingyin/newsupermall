<template>
  <swiper>
    <swiper-item v-for="item in topImages" :key="item.index" class="imgHeight">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
 export default {
  name: '',
  props:{
    topImages:Array,
    default(){
      return []
    }
  },
  data () {
   return {

   }
  },
  components: {
    Swiper,
    SwiperItem
  }
 }
</script>

<style scoped>
.imgHeight{
  height: 300px;
  overflow: hidden;
}
 
</style>
