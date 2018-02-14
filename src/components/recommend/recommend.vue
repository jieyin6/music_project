<template>
  <div class="recommend-wrapper">
    <div class="recommend-content">
      <div class="recommend-slider" v-if="recommends.length">
        <slider>
          <div v-for="item in recommends" :key="item.id">
            <a :href="item.linkUrl">
              <img :src="item.picUrl">
            </a>
          </div>
        </slider>
       </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
        </ul>
        <div class="sliderP_wrapper" v-if="recommends.length">
          <slider-p :recommends="recommends">
             <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <img :src="item.picUrl">
              </a>
          </div>
          </slider-p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sliderP from '../slider_practice/sliderPra'
import Slider from 'base/slider'
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'
export default {
  components:{
    Slider,
    sliderP
  },
  data(){
    return {
      recommends:[]
    }
  },
  created() {
    this._getRecommend()
  },
  methods:{
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK ) {
          console.log(res.data.slider)
          this.recommends = res.data.slider
        }
      })
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
}
</style>
