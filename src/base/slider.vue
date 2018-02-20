<template>
  <div class="slider-wrapper" ref="slider">
      <div class="slider-group" ref="sliderGroup">
          <slot></slot>
      </div>
      <div class="slider-dots">
          <span class="dot" v-for="(item,index) in dots" :key="index"
          :class="{ active: currentPageIndex === index }"></span>
      </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import {addClass} from 'common/js/dom'
export default {
    props:{
        //循环
        loop:{
            type:Boolean,
            default:true
        },
        //自动轮播
        autoPlay:{
            type:Boolean,
            default:true
        },
        //自动轮播时间
        interval:{
            type:Number,
            default:4000
        }
    },
    data(){
        return{
            dots:[],
            currentPageIndex:0
        }
    },
    mounted(){
        //组件渲染完之后才能获取元素的宽度
        setTimeout(() => {
            this.setSliderWith()
            this.initDots()
            this.initSlider()
            if(this.autoPlay){
                this.play()
            }
        },20)
         
         window.addEventListener('resize',()=>{
             if(!this.sliderBscroll || !this.sliderBscroll.enabled){
                 return
             }
             clearTimeout(this.resizeTimer)
             this.resizeTimer = setTimeout(() => {
                 // 判断当前 scroll 是否处于滚动动画过程中。
                 if(this.sliderBscroll.isInTransition){
                     this.onScrollEnd()
                 } else {
                     if(this.autoPlay){
                         this.play()
                     }
                 }
                 this.refresh()
             },60)
         })
    },
    activated(){
        //启用 better-scroll, 默认 开启。
        this.sliderBscroll.enable()
        let pageIndex = this.sliderBscroll.getCurrentPage().pageX
        this.sliderBscroll.goToPage(pageIndex,0,0)
        this.currentPageIndex = pageIndex
        if(this.autoPlay){
            this.play()
        }
    },
    deactivated(){
        this.sliderBscroll.disable()
        clearTimeout(this.timer)
    },
    beforeDestroy(){
        this.sliderBscroll.disable()
        clearTimeout(this.timer)
    },
    methods:{
        refresh(){
            if(this.sliderBscroll){
                this.setSliderWith(true)
                this.sliderBscroll.refresh()
            }
        },
        setSliderWith(isResize){
            this.children = this.$refs.sliderGroup.children
            let width = 0 ;
            let sliderWidth = this.$refs.slider.clientWidth
            for(let i = 0 ; i < this.children.length ; i++){
                let child = this.children[i]
                addClass(child,'slider-item')
                child.style.width = sliderWidth +'px'
                width += sliderWidth
            }
            if(this.loop && !isResize){
                width += 2 * sliderWidth
                
            }
            this.$refs.sliderGroup.style.width = width + 'px'
        },
        initDots(){
            this.dots = new Array(this.children.length)
        },
        initSlider(){
            this.sliderBscroll = new Bscroll(this.$refs.slider,{
                scrollX:true,
                scrollY:false,
                momentum:false,
                snap:{
                 loop: this.loop,
                 threshold:0.3,
                 speed:400,
                },
                click:true 
                 
            })
            this.sliderBscroll.on("scrollEnd",this.onScrollEnd)
            this.sliderBscroll.on('touchend',()=>{
                if(this.autoPlay){
                    this.play()
                }
            })
            this.sliderBscroll.on('beforeScrollStart',() => {
                if(this.autoPlay){
                    clearTimeout(this.timer)
                }
            })
        
        },
        onScrollEnd(){
            let pageIndex = this.sliderBscroll.getCurrentPage().pageX 
                this.currentPageIndex = pageIndex
                if(this.autoPlay){
                    this.play()
                }
        },
        play(){
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.sliderBscroll.next()
            },this.interval)  
        }
    }
  
}
</script>

<style lang="scss">
@import '~common/scss/variable';
.slider-wrapper{
    min-height: 1px;
    .slider-group{
        position: relative;
        overflow: hidden;
        white-space: nowrap;
        .slider-item{
            float: left;
            box-sizing: border-box;
            overflow: hidden;
            text-align: center;
            a{
                display: block;
                width: 100%;
                overflow: hidden;
            }
            img{
                display: block;
                width: 100%;
            }
        }
    }
    .slider-dots{
        position: absolute;
        right: 0;
        left: 0;
        bottom: 12px;
        text-align: center;
        font-size: 0;
        .dot{
            display: inline-block;
            margin: 0 4px;
            width: 8px;
            height: 8px;
            border-radius: 4px;
            background-color: $color-text-l;
        }
        .active{
            width: 20px;
            border-radius: 5px;
            background-color: $color-text-ll
        }
    }
}

</style>
