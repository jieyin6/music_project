<template>
  <div class="slider-p-wrapper" ref="sliderwra" @mouseover="stop">
      <div class="slider-p-content" ref="sliderp" >
          <slot></slot>
      </div>
       <div class="dots">
          <ul>
              <li v-for= "(dot,index) in dots" :key="index"
              :class="{ dotActive : currentIndex === index}"
              @click="changePic(index)"></li>
          </ul>
      </div>
      <div class="left" @click="leftclick">&lt;</div>
      <div class="right" @click="rightclick">&gt;</div>
  </div>
</template>

<script>
import {addClass} from 'common/js/dom'
export default {
    props:{
        autoPlay:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return{
            dots:[],
            currentIndex:0
        }
    },
    mounted(){

        setTimeout(() => {
            this.getWidth()
            this.getdots()
         /* if(this.autoPlay === true){
                this._autoPlay()
            }*/
        },20)
        
    },
  methods:{
      //获取总宽度
      getWidth(){
          this.children = this.$refs.sliderp.children
          console.log(this.children.length)
          let sliderWidth = this.$refs.sliderwra.clientWidth
          console.log(sliderWidth)
          let width = 0
          for(let i = 0 ; i < this.children.length ; i++){
              let child = this.children[i]
              console.log(child)
              addClass(child,'item-class')
              console.log(child.className)
             child.style.width = sliderWidth +'px'
             width += sliderWidth
          }
          this.$refs.sliderp.style.width = width +'px'
      },
      //设置小圆点
      getdots(){
          this.dots = new Array(this.children.length)
      },
      //自动播放
     _autoPlay(){
         
          clearTimeout(this.timer)
          this.timer = setInterval(()=>{
              let width = this.$refs.sliderwra.clientWidth
              let sliderWidth = parseFloat(this.$refs.sliderp.style.width)
              let current = 0;
              if(this.$refs.sliderp.style.left){
                  let left =this.$refs.sliderp.style.left
                  current = parseFloat(left) - width
              }else{
                  current =  -width
              }
             if(current > -sliderWidth){
                    this.$refs.sliderp.style.left = current +'px'
              }else{
                  this.$refs.sliderp.style.left = 0 +'px'
              }
              if(this.currentIndex < this.dots.length-1){
                  this.currentIndex++
              }else{
                  this.currentIndex = 0
              }
          },2000)
          
      },
      //滑过停止自动播放
      stop(){
          console.log('stop')
          clearInterval(this.timer)
      },
      //前一页
      leftclick(){
           let width = this.$refs.sliderwra.clientWidth
           let sliderWidth = parseFloat(this.$refs.sliderp.style.width)
           let current = parseFloat(this.$refs.sliderp.style.left)
          
            if(current && current >= -sliderWidth+width){
                    this.$refs.sliderp.style.left = current+width  +'px'
                    this.currentIndex --
              }else{
                  this.$refs.sliderp.style.left = -sliderWidth+width +'px'
                  this.currentIndex = this.dots.length -1
              }
      },
      //后一页
      rightclick(){
          let width = this.$refs.sliderwra.clientWidth
           let sliderWidth = parseFloat(this.$refs.sliderp.style.width)
           let current = parseFloat(this.$refs.sliderp.style.left);
           
            if(current > -sliderWidth+width){
                    this.$refs.sliderp.style.left = current-width  +'px'
                    this.currentIndex ++
              }else{
                  this.$refs.sliderp.style.left = 0 +'px'
                  this.currentIndex = 0
              }
      },
      //点击小圆点切换图片
      changePic(index){
          let width = this.$refs.sliderwra.clientWidth
          this.$refs.sliderp.style.left = -index * width  +'px'
          this.currentIndex = index
      }
  }
}
</script>


<style lang="scss">
@import '~common/scss/variable';
.slider-p-wrapper{
    position: relative;
    overflow: hidden;
    height: 290px;
    width: 100%;
    .slider-p-content{
        position: absolute;
        top: 0;
        left: 0;
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
                background-color: black
            }
        }
    }
    .left{
        position: absolute;
        top: 50%;
        left: 10px;
        width: 20px;
        height: 20px;
        margin-top: -10px;
        color: black;
        background-color: transparent
    }
    .right{
        position: absolute;
        top: 50%;
        right: 10px;
        width: 20px;
        height: 20px;
        margin-top: -10px;
        color: black;
        background-color: transparent
    }
    .slider-p-content-active{
        left: 0;
    }

}

</style>
