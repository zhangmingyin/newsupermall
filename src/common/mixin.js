import {debounce} from './utils'

export const itemListenerMixin = {
  data(){
    return {
      itemImgListener:null,
      refresh:null
    }
  },
  mounted(){
    this.refresh=debounce(this.$refs.scroll && this.$refs.scroll.refresh,200);
      this.itemImgListener=()=>{
        this.refresh();
   }
      this.$bus.$on('onImageLoad',this.itemImgListener)
      // console.log('我是混入中的内容')
  }
} 