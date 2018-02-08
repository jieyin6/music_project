<template>
  <div class="recommend-wrapper">
    <div class="recommend-content">
      <div class="slider-wrapper"></div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'
export default {
  created() {
    this._getRecommend()
  },
  methods:{
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK ) {
          console.log(res.data.slider)
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
}
</style>
