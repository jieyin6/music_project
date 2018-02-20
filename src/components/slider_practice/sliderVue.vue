<template>
  <div class="slider-p-wrapper" ref="sliderwra" @mouseenter='stop' @mouseleave='start'>
      <div class="slider-p-content" ref="sliderp" >
        <transition-group name="list">
        <div v-for="(item,index) in recommends" :key="index" v-show=" indexPic-1 == index">
              <a :href="item.linkUrl">
                <img :src="item.picUrl">
              </a>
          </div>
          </transition-group>
      </div>
       <div class="dots">
          <ul>
              <li v-for= "(dot,index) in dots" :key="index"
              :class="{ dotActive : indexPic -1  === index}"
              @click="changePic(index)"></li>
          </ul>
      </div>
      <div class="left" @click="leftclick" ref="left" v-show='!this.interval'>&lt;</div>
      <div class="right" @click="rightclick" ref="right" v-show="!this.interval">&gt;</div>
  </div>
</template>


<script>
export default {
  props:{
      recommends:{
          type:Array
      }
  },
  data(){
      return{
          //底部小圆点
            dots:[],
            indexPic:1,
            //显示左右箭头
            interval:true
      }
  },
  mounted(){
      this.$nextTick(()=>{
          this.getdots()
          this.timer = setInterval(()=>{
              this.rightclick()
          },2000)
      })
  },
  methods:{
       //显示小圆点
     getdots(){
          this.dots = new Array(this.recommends.length)
      },
      stop(){
          clearInterval(this.timer)
          this.interval = false
      },
      start(){
          this.interval = true
          this.timer = setInterval(()=>{
              this.rightclick()
          },2000)
      },
      leftclick(){
          if(this.indexPic == 1){
              this.indexPic = 5
          }else{
              this.indexPic --
          }
          
      },
      rightclick(){
          if(this.indexPic == this.recommends.length){
              this.indexPic = 1
          }else{
              this.indexPic++
          }
      },
      changePic(index){
          this.indexPic = index + 1
      }
  }
}
</script>

<style lang="scss">
@import '~common/scss/variable';
@import '~common/scss/mixin';
.slider-p-wrapper{
    position: relative;
    overflow: hidden;
    height: 290px;
    width: 100%;
    .slider-p-content{
        position: absolute;
        top: 0;
        overflow: hidden;
        white-space: nowrap;
        transition: left 0.3s linear;
        .item-class{
            float: left;
            
        }
    }
    .dots{
        position: absolute;
        bottom: 10px;
        left: 50%;
        ul{
            margin-left: -50px;
            li{
                float: left;
                width: 10px;
                height: 10px;
                border-radius: 5px;
                margin-right: 10px;
                background-color: gray
            }
            .dotActive{
                width: 20px;
                background-color: black
            }
        }
    }
    .left{
        position: absolute;
        top: 50%;
        left: -1px;
        z-index: 2;
        width: 20px;
        height: 20px;
        margin-top: -10px;
        color:white;
        background-color: transparent;
        animation: showleft 40ms linear forwards;
        
    }
    .right{
        position: absolute;
        top: 50%;
        right: -1px;
        z-index: 2;
        width: 20px;
        height: 20px;
        margin-top: -10px;
        color:white;
        background-color: transparent;
        animation: showright 40ms linear forwards;
    }
   .list-enter-to{
        transition: all 100ms ease;
        transform: translateX(0)
    }
    
    .list-leave-active{
        transition: 300ms ease;
        transform: translateX(-100%)
    }
    .list-enter{
        transform: translateX(100%)
    }
   .list-leave{
       transform: translateX(0)
   }
   
   

}
@keyframes showleft {
            0%{
                left: -1px
            }
            100%{
                left: 20px
            }
        }
@keyframes showright {
            0%{
                right: -1px
            }
            100%{
                right: 20px
            }
        }

</style>
