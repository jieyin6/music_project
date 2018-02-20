<template>
  <div class="slider-p-wrapper" ref="sliderwra" @mouseenter='stop' @mouseleave='start'>
      <div class="slider-p-content" ref="sliderp"
      :style="{transform:`translate(-indexPic * 100 / newrecommends.length)%` , transition:isReset? '' : `transform 1s ease`}"
      >
        <div v-for="(item,index) in newrecommends" :key="index">
              <a :href="item.linkUrl">
                <img :src="item.picUrl">
              </a>
          </div>
      </div>
       <div class="dots">
          <ul>
              <li v-for= "(dot,index) in dots" :key="index"
              :class="{ dotActive : dotIndex  === index}"
              @click="changePic(index)"></li>
          </ul>
      </div>
      <div class="left" @click="leftclick" ref="left" v-show="block">&lt;</div>
      <div class="right" @click="rightclick" ref="right" v-show="block">&gt;</div>
  </div>
</template>

<script>
import {addClass} from 'common/js/dom'
export default {
    props:{
        recommends:{
            type:Array
        },
        autoPlay:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return{
            //底部小圆点
            dots:[],
            //首位添加图片后的数组
            newrecommends:[],
            //第几张照片
            indexPic:null,
            //显示左右箭头
            block:false,
           //小圆点index
           dotIndex:null,
           //是否瞬间重置定位，在watch中初始化，重定位会取消transition动画
           isReset:false
        }
    },
    mounted(){
        //设置显示第一张图片
        let width = this.$refs.sliderwra.clientWidth
        this.$refs.sliderp.style.left = -width +'px'
        this.indexPic = 1
        this.dotIndex = 0
        this.isReset = false
        //设置动画行内样式
        this.$refs.sliderp.style.transition = 'left 0.3s linear'
        setTimeout(() => {
            this.getWidth()
            this.getdots()
        },20)
        if(this.autoPlay == true){
            this._autoPlay()
        }
      },
    created(){
        //首尾
         let newarr = []
         this.recommends.forEach((item,index)=>{
             newarr.push(item)
        })
         this.newrecommends = this.newrecommends.concat(newarr)
         let first = newarr.pop()
         console.log(first)
         let last = newarr.shift()
         this.newrecommends.push(last)
         this.newrecommends.unshift(first)
         console.log(this.newrecommends)
     },
    watch:{
        indexPic(newindex){
            if(newindex == this.newrecommends.length-1){
               this.isReset = true
               this.indexPic = 1
               let width = this.$refs.sliderwra.clientWidth
               this.$refs.sliderp.style.left = -width +'px'
            }
            if(newindex == 0){
                this.isReset = true
                this,indexPic = this.newrecommends.length - 2 
                let width = this.$refs.sliderwra.clientWidth
                this.$refs.sliderp.style.left = -parseFloat(this.$refs.sliderp.style.width)+2 * width +'px'
                
           }
        }
    },
  methods:{
      //获取总宽度
      getWidth(){
          this.children = this.$refs.sliderp.children
          console.log(this.children)
          let sliderWidth = this.$refs.sliderwra.clientWidth
          let width = 0
          for(let i = 0 ; i < this.children.length ; i++){
              let child = this.children[i]
              addClass(child,'item-class')
              child.style.width = sliderWidth +'px'
              width += sliderWidth
          }
          this.$refs.sliderp.style.width = width +'px'
      },
      animate(width){
         let newleft = parseFloat(this.$refs.sliderp.style.left)+width 
         this.$refs.sliderp.style.left = newleft +'px'
         let left1 = this.$refs.sliderwra.clientWidth
        let left6 = - parseFloat(this.$refs.sliderp.style.width) + left1
        if(newleft > 0){
            this.$refs.sliderp.style.left = left6+'px'
        } 
        if(newleft < left6){
          this.$refs.sliderp.style.left = 0 +'px' 
        }
      },

      //向后翻
      rightclick(){
          console.log('right')
         if(this.indexPic == this.newrecommends.length){
                this.indexPic = 1
                this.dotActive(1) 
          }else{
               this.indexPic +=1
               this.dotActive(1)
          }
         let width = this.$refs.sliderwra.clientWidth
          this.animate(-width)
      },
      //向前翻
      leftclick(){
          console.log('left')
          if(this.indexPic == 0){
              this.indexPic = this.newrecommends.length
              this.dotActive(-1)
          }else{
              this.indexPic -=1
              this.dotActive(-1)
          }
          let width = this.$refs.sliderwra.clientWidth
          this.animate(width)
      },
    //显示小圆点
     getdots(){
          this.dots = new Array(this.recommends.length)
      },
      //小圆点的点亮
    dotActive(val){
          if(this.dotIndex == this.recommends.length-1){
              this.dotIndex = 0
          }else{
              this.dotIndex = this.dotIndex + val
          }
      },
      //按钮切换
     changePic(index){
          if(this.indexPic - 1  == index){
              return
          }else{
              let width = this.$refs.sliderwra.clientWidth
              let offestIndex = index - (this.indexPic -1)
              let offest = offestIndex * ( - width)
              this.animate(offest)
              this.indexPic = index + 1
              this.dotIndex = index
          }
      },
      
      //自动播放
      _autoPlay(){
          clearInterval(this.timer)
          this.timer = setInterval(()=>{
              this.rightclick()
          },5000)
      },
      //滑入停止自动播放
     stop(){
         this.block=true
         clearInterval(this.timer)
    },
    //滑出开启自动播放
    start(){
        this.block=false
        this._autoPlay()
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
      /*  transition: left 0.3s linear;*/
     
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
