<template>
 <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    
    <div v-for="itemInfo in commentInfo" :key="itemInfo.index">
        <div class="info-user">
        <img :src="itemInfo.user.avatar" alt="">
        <span>{{itemInfo.user.uname}}</span>
      </div>
      <div class="info-detail">
        <p>{{itemInfo.content}}</p>
        <div class="info-other">
          <span class="date">{{itemInfo.created | showDate}}</span>
          <span>{{itemInfo.style}}</span>
        </div>
        <div class="info-imgs">
          <img :src="item" v-for="(item, index) in itemInfo.images" :key="index">
        </div>
      </div>
    </div>

    <div v-for="itemInfo in commentInfo" :key="itemInfo.index">
        <div class="info-user">
        <img :src="itemInfo.user.avatar" alt="">
        <span>{{itemInfo.user.uname}}</span>
      </div>
      <div class="info-detail">
        <p>{{itemInfo.content}}</p>
        <div class="info-other">
          <span class="date">{{itemInfo.created | showDate}}</span>
          <span>{{itemInfo.style}}</span>
        </div>
        <div class="info-imgs">
          <img :src="item" v-for="(item, index) in itemInfo.images" :key="index">
        </div>
      </div>
    </div>

     <div v-for="itemInfo in commentInfo" :key="itemInfo.index">
        <div class="info-user">
        <img :src="itemInfo.user.avatar" alt="">
        <span>{{itemInfo.user.uname}}</span>
      </div>
      <div class="info-detail">
        <p>{{itemInfo.content}}</p>
        <div class="info-other">
          <span class="date">{{itemInfo.created | showDate}}</span>
          <span>{{itemInfo.style}}</span>
        </div>
        <div class="info-imgs">
          <img :src="item" v-for="(item, index) in itemInfo.images" :key="index">
        </div>
      </div>
    </div>

     <div v-for="itemInfo in commentInfo" :key="itemInfo.index">
        <div class="info-user">
        <img :src="itemInfo.user.avatar" alt="">
        <span>{{itemInfo.user.uname}}</span>
      </div>
      <div class="info-detail">
        <p>{{itemInfo.content}}</p>
        <div class="info-other">
          <span class="date">{{itemInfo.created | showDate}}</span>
          <span>{{itemInfo.style}}</span>
        </div>
        <div class="info-imgs">
          <img :src="item" v-for="(item, index) in itemInfo.images" :key="index">
        </div>
      </div>
    </div>

     <div v-for="itemInfo in commentInfo" :key="itemInfo.index">
        <div class="info-user">
        <img :src="itemInfo.user.avatar" alt="">
        <span>{{itemInfo.user.uname}}</span>
      </div>
      <div class="info-detail">
        <p>{{itemInfo.content}}</p>
        <div class="info-other">
          <span class="date">{{itemInfo.created | showDate}}</span>
          <span>{{itemInfo.style}}</span>
        </div>
        <div class="info-imgs">
          <img :src="item" v-for="(item, index) in itemInfo.images" :key="index">
        </div>
      </div>
    </div>
</div>

</template>

<script>
import {formatDate} from 'common/utils'
 export default {
  name: '',
  props:{
    commentInfo:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data () {
   return {

   }
  },
  components: {

  },
  filters:{
    showDate(value){
      const data=new Date(value * 1000);
      return formatDate(data,'yyyy-MM-dd hh:mm:ss')
    }
  }
 }
</script>

<style scoped>
    .comment-info {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .header-title {
    float: left;
    font-size: 15px;
  }

  .header-more {
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }

  .info-user {
    padding: 10px 0 5px;
  }

  .info-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  .info-user span {
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }

  .info-detail {
    padding: 0 5px 15px;
  }

  .info-detail p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }

  .info-detail .info-other {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }

  .info-other .date {
    margin-right: 8px;
  }

  .info-imgs {
    margin-top: 10px;
  }

  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
 
 
</style>
