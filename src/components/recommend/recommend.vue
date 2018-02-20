<template>
  <div class="recommend-wrapper">
    <scroll ref="scroll">
    <div class="recommend-content">
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

        </ul>
       <!-- <div class="sliderP_wrapper" v-if="recommends.length">
          <slider-p :recommends="recommends">
            
          </slider-p>
        </div> -->
      </div>
    </div>
    <div class="loading-wrapper" >
      <loading></loading>
    </div>
    </scroll>
  </div>
</template>

<script>
//import sliderP from '../slider_practice/sliderPra'
import Slider from 'base/slider'
import scroll from 'base/scroll'
import Loading from 'base/loading/loading'
import {getRecommend,getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
export default {
  components:{
    Slider,
    scroll,
    Loading
  },
  data(){
    return {
      recommends:[]
    }
  },
  created() {
    setTimeout(()=>{
      this._getRecommend()
    },2000)
    
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
          console.log(res.data.recomPlaylist.data.v_hot)
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
    }
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
  }
  .loading-wrapper{
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%)
  }
}
</style>
