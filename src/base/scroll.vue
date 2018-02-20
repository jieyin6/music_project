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
    }
  },
  mounted(){
      setTimeout(()=>{
          this.scroll()
      },20)
  },
 methods:{
     scroll(){
         if(!this.$refs.wrapper){
                 return
             }
             this.srcoll = new Bscroll(this.$refs.wrapper,{
                 probeType:this.probeType,
                 click:this.click,
             })
         
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
    }
 },
 //观察数据变化就调用refresh方法
 watch:{
     data(){
         setTimeout(()=>{
             this.refresh()
         },20)
     }
 }
}
</script>

