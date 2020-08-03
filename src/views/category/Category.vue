<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="disp">
      <div class="dev"></div>
       <tab-control 
        class="tab-control aaa" 
        :titles="['综合','新品','销量']" @tabclick="tabclick" 
        ref="tabcontrol1" v-show="showTabControl"></tab-control>
    </div>
    <div class="content">
      <left-info :left-info="categorys" @selectItem="selectItem"></left-info>
      
      <scroll id="wrapper" 
      ref="scroll" 
      @scroll="contentScroll" 
      :probeType="3" 
      :pull-up-load="true">
        <!-- <tab-control 
        class="tab-control" 
        :titles="['综合','新品','销量']" @tabclick="tabclick" 
        ref="tabcontrol1" v-show="showTabControl"></tab-control> -->
        <tab-content-category 
        :subcategories="showSubcategory"></tab-content-category>
        <tab-control 
        class="tab-control" 
        :titles="['综合','新品','销量']" @tabclick="tabclick" ref="tabcontrol2"></tab-control>
        <goods-list class="goodslist" :goods="showCategoryDetail"></goods-list>
      </scroll> 
      <back-top @click.native="topClick" v-show="isBackTop"></back-top>
    </div>
    
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar' 
  import LeftInfo from './childComps/LeftInfo'
  import TabContentCategory from './childComps/TabContentCategory'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'
  import Scroll from 'components/common/scroll/Scroll'
  import {getCategory,getSubcategory,getCategoryDetail} from 'network/category'
  import {itemListenerMixin} from 'common/mixin'
  export default {
    name: "Category",
    components:{
      NavBar,
      LeftInfo,
      TabContentCategory,
      TabControl,
      GoodsList,
      BackTop,
      Scroll
    },
    data(){
      return {
        categorys:[],
        currentIndex:-1,
        categoryData: {},
        currentType:'pop',
        showTabControl: false,
        tabOffsetTop: 0,
        isBackTop:false
      }
    },
    created() {
      this._getCategory()
      this.$bus.$on('imgLoad',()=>{
        this.$refs.scroll.refresh()
      })
    },
    mixins:[itemListenerMixin],
    mounted(){

    },
    computed:{
      showSubcategory() {
		    if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
       showCategoryDetail() {
		    if (this.currentIndex === -1) return []
		    return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    activated(){
      this.$refs.scroll.refresh()
    },
    methods:{
      //  categoryImageLoad(){
      //   this.tabOffsetTop=this.$refs.tabcontrol2.$el.offsetTop;
      //   console.log(this.tabOffsetTop)
      // },
      contentScroll(position){
        this.tabOffsetTop=this.$refs.tabcontrol2.$el.offsetTop;
        // console.log(this.tabOffsetTop)
        // console.log(position)
        this.showTabControl=(-position.y) > this.tabOffsetTop
        this.isBackTop=(-position.y) > 1000
      },
      topClick(){
        this.$refs.scroll.scrollTo(0,0,300)
      },
      _getCategory(){
        getCategory().then(res=>{
          this.categorys=res.data.category.list;
          for(let i=0;i<this.categorys.length;i++){
            this.categoryData[i]={
               subcategories:{},
               categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          console.log(res)
          this._getSubcategory(0)
        })    
      },
      _getSubcategory(index){
        this.currentIndex=index
        // console.log(this.currentIndex)
        const maitKey=this.categorys[index].maitKey
        // console.log(maitKey)
        getSubcategory(maitKey).then(res=>{
          this.categoryData[index].subcategories=res.data
          this.categoryData = {...this.categoryData}
          console.log( this.categoryData)
          this._getCategoryDetail('pop')
          this._getCategoryDetail('new')
          this._getCategoryDetail('sell')
        })
      },
      _getCategoryDetail(type){
        const miniWallkey=this.categorys[this.currentIndex].miniWallkey
        getCategoryDetail(miniWallkey, type).then(res=>{
          this.categoryData[this.currentIndex].categoryDetail[type]=res;
          // console.log(this.categoryDetail[this.currentIndex].categoryDetail[type])
          this.categoryData={...this.categoryData}
          console.log(this.categoryData)
        })
      },
      selectItem(index){
        this._getSubcategory(index)
      },
      tabclick(index){
        switch(index){
          case 0:
            this.currentType='pop';
            break;
          case 1:
            this.currentType='new';
            break;
          case 2:
            this.currentType='sell'  
        }
        this.$refs.tabcontrol1.currentIndex=index
        this.$refs.tabcontrol2.currentIndex=index
      }
    }
  }

</script>

<style scoped>
   #category{
    height: 100vh;
  }
  .tab-control{
    font-size: 14px;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    text-align: center;
    position: relative;
    z-index: 1;
  }
   .content{
   
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }
  #wrapper{
    height: 100%;
    flex: 1;
  }
  .goodslist{
    display: flex;
    flex-wrap: wrap;
    padding: 3px;
    justify-content: space-around;
  }
  .disp{
    display: flex;
    position: relative;
    z-index: 9;
  }
  .dev{
    width: 100px;
    height: 0;
  }
  .aaa{
    flex: 1;
  }
</style>
