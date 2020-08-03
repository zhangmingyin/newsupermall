<template>
  <div class="item-info">
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategories.list">
      <div class="item" v-for="(item, index) in subcategories.list" :key="index">
        <a :href="item.link">
          <img class="item-img" :src="item.image"  alt="">
          <div class="item-text">{{item.title}}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>

<script>
  import GridView from 'components/common/gridView/GridView'

  export default {
    name: "TabContentCategory",
    components: {
      GridView
    },
    data(){
      return{
        isLoad:false
      }
    },
    props: {
      subcategories: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods:{
      
    }
  }
</script>

<style scoped>
  
  .item-info{
    
    /* display: flex;
    text-align: center;
    font-size: 12px;
    flex-wrap: wrap;
    padding: 10px 8px; */
    /* padding: 10px 0px 20px; */
    /* border-bottom: 9px solid #eee; */
  }
  
  .item {
    /* width: 33%; */
    /* padding: 5px;
    margin-top: 3px; */
    text-align: center;
    font-size: 12px;
  }

  .item-img {
    width: 100%;
  }

  .item-text {
    margin-top: 10px;
  }
</style>
