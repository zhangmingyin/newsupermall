<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <left-info :left-info="categorys" @selectItem="selectItem"></left-info>
      <scroll id="wrapper" ref="scroll">
        <tab-content-category :subcategories="showSubcategory"></tab-content-category>
        <tab-control 
        class="tab-control" 
        :titles="['综合','新品','销量']" @tabclick="tabclick"></tab-control>
        <goods-list></goods-list>
      </scroll>
    </div>
    
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar' 
  import LeftInfo from './childComps/LeftInfo'
  import TabContentCategory from './childComps/TabContentCategory'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'

  import Scroll from 'components/common/scroll/Scroll'
  import {getCategory,getSubcategory,getCategoryDetail} from 'network/category'
  export default {
    name: "Category",
    components:{
      NavBar,
      LeftInfo,
      TabContentCategory,
      TabControl,
      GoodsList,
      Scroll
    },
    data(){
      return {
        categorys:[],
        currentIndex:-1,
        categoryData: {},
        currentType:'pop'
        // subcategories:{}
        
      }
    },
    created() {
      this._getCategory()
      this.$bus.$on('imgLoad',()=>{
        this.$refs.scroll.refresh()
      })
    },
    computed:{
      showSubcategory() {
		    if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
    },
    activated(){
      this.$refs.scroll.refresh()
    },
    methods:{
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
          // this._getSubcategory('new')
          // this._getSubcategory('sell')
        })
      },
      _getCategoryDetail(type){
        const miniWallkey=this.categorys[this.currentIndex].miniWallkey
        getCategoryDetail(miniWallkey, type).then(res=>{
          this.categoryDetail[this.currentIndex].categoryDetail[type]=res;
          // console.log(this.categoryDetail[this.currentIndex].categoryDetail[type])
          this.categoryDetail={...this.categoryData}
          console.log(categoryDetail)
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
 
</style>
