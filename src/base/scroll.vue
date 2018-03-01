<template>
  <div ref="wrapper">
      <slot></slot>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
export default {
  props:{
      //滚动的位置
     probeType:{
         type:Number,
         default:1
     },
    click:{
        type:Boolean,
        default:true
    },
    //内部的数据
    data:{
        type:Array,
        default:null
    },
    listenScroll:{
        type:Boolean,
        default:false
    },
    //上拉更新
    pullUp:{
        type:Boolean,
        default:false
    },
    //手机端搜索时滑动隐藏键盘
    beforeScroll:{
        type:Boolean,
        default:false
    }
  },
  mounted(){
      this.$nextTick(this.scroll())
     },
 methods:{
     scroll(){
         if(!this.$refs.wrapper){
                 return
             }
             this.scroll = new Bscroll(this.$refs.wrapper,{
                 probeType:this.probeType,
                 click:this.click,
             })
             //监听滚动事件
         if(this.listenScroll){
             let _this = this
             this.scroll.on('scroll',(pos)=>{
                 _this.$emit('scroll',pos)
             })
         }
        if(this.pullUp){
            this.scroll.on('scrollEnd',()=>{
               
                if(this.scroll.y <= (this.scroll.maxScrollY +50)){
                     
                    this.$emit('scrollToEnd')
                }
            })
        }
        if(this.beforeScroll){
            this.scroll.on('beforeScrollStart',()=>{
                this.$emit('beforeScroll')
            })
        }

     },
 //定义一些方法
    enable(){
     this.scroll && this.scroll.enable()
    },
    disable(){
     this.scroll && this.scroll.disable()
    },
    refresh(){
     this.scroll && this.scroll.refresh()
    },
    scrollTo(){
        this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
    },
    scrollToElement(){
        this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
    }
 },
 //观察数据变化就调用refresh方法
 watch:{
     data(){
         this.$nextTick(()=>{
             this.refresh()
         })
             
        
  }
 }
}
</script>

