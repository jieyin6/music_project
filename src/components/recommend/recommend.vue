<template>
  <div class="recommend-wrapper">
   
      
    <scroll class="recommend-content" ref="scroll" :data="songsList">
      <div>
      <div class="recommend-slider" v-if="recommends.length">
        <slider>
          <div v-for="item in recommends" :key="item.id">
            <a :href="item.linkUrl">
              <img :src="item.picUrl" @load="imgOnload">
            </a>
          </div>
        </slider>
       </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li v-for="item in songsList" :key="item.id" class="list-item" @click="changeRouter(item)">
            <div class="list-img">
              <img v-lazy="item.imgurl">
            </div>
            <div class="list-content">
              <h2>{{item.creator.name}}</h2>
              <p>{{item.dissname}}</p>
            </div>
          </li>
        </ul>
       <!-- <div class="sliderP_wrapper" v-if="recommends.length">
          <slider-p :recommends="recommends">
            
          </slider-p>
        </div> -->
      </div>
    </div>
    <div class="loading-wrapper" v-show="!this.songsList.length">
      <loading></loading>
    </div>
    </scroll>
   <router-view></router-view>
  </div>
</template>

<script>
//import sliderP from '../slider_practice/sliderPra'
import Slider from 'base/slider'
import scroll from 'base/scroll'
import Loading from 'base/loading/loading'
import {getRecommend,getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import {mapMutations} from 'vuex'

export default {
  components:{
    Slider,
    scroll,
    Loading
  },
  data(){
    return {
      recommends:[],
      songsList:[]
    }
  },
  created() {
    
      this._getRecommend()
   
    
    this._getDiscList()
  },
  methods:{
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK ) {
          console.log(res.data.slider)
          this.recommends = res.data.slider
        }
      })
    },
    _getDiscList(){
      getDiscList().then((res) => {
        if(res.code === ERR_OK){
          console.log(res.data.list)
          this.songsList = res.data.list
        }
      })
    },
    //图片加载完之后会撑起轮播盒子的高，滚动的高度需要重新计算。
    //如果不重新计算的话，会少图片的高度，导致歌单展示不全。
    imgOnload(){
      if(!this.loadCheck){
        this.$refs.scroll.refresh()
        this.loadCheck = true
      }
    },
    changeRouter(item){
        this.$router.push({
        path:`/recommend/${item.dissid}`
      })
      this.setDisc(item)
     },
    ...mapMutations({
      setDisc:'SET_DISC'
    })
  }
} 
</script>

<style lang="scss">
@import '~common/scss/variable';
.recommend-wrapper{
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .recommend-content{
    height: 100%;;
    overflow: hidden;
    .recommend-slider{
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .recommend-list{
      .list-title{
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme
      }
      .list-item{
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px
      }
      .list-img{
        flex: 0 0 60px;
        width: 60px;
        padding-right: 20px;
        img{
          width: 60px;
          height: 60px;
        }
      }
      .list-content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        font-size: $font-size-medium;
        h2{
          margin-bottom: 10px;
          color: $color-text
        }
        p{
          color: $color-text-d
        }
      }
    }
  }
  .loading-wrapper{
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%)
  }
}
</style>
