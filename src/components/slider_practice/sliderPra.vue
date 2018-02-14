<template>
  <div class="slider-p-wrapper" ref="sliderwra" @mouseenter='stop' @mouseleave='start'>
      <div class="slider-p-content" ref="sliderp" >
        <div v-for="(item,index) in newrecommends" :key="index">
              <a :href="item.linkUrl">
                <img :src="item.picUrl">
              </a>
          </div>
      </div>
       <div class="dots">
          <ul>
              <li v-for= "(dot,index) in dots" :key="index"
              :class="{ dotActive : indexPic -1  === index}"
              @click="changePic(index)"></li>
          </ul>
      </div>
      <div class="left" @click="leftclick" ref="left">&lt;</div>
      <div class="right" @click="rightclick" ref="right">&gt;</div>
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
            indexPic:1,
            //图片位移总时间
            time:300,
            //图片位移间隔
            interval:3
        }
    },
    mounted(){
        //设置显示第一张图片
        let width = this.$refs.sliderwra.clientWidth
        this.$refs.sliderp.style.left = -width +'px'
        console.log(this.recommends)
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
         this.go(width,newleft)
      },
      //向后翻
      rightclick(){
          console.log('right')
          if(this.indexPic == this.recommends.length){
              this.indexPic = 1
          }else{
               this.indexPic +=1
          }
         let width = this.$refs.sliderwra.clientWidth
          this.animate(-width)
      },
      //向前翻
      leftclick(){
          console.log('left')
          if(this.indexPic == 1){
              this.indexPic = this.recommends.length
          }else{
              this.indexPic -=1
          }
          let width = this.$refs.sliderwra.clientWidth
          this.animate(width)
      },
    //显示小圆点
     getdots(){
          this.dots = new Array(this.recommends.length)
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
          }
      },
      //位移函数
      go(width,newleft){
          console.log('go')
          //每次位移量
          let variable = width/(this.time/this.interval)
          if((variable > 0 && parseFloat(this.$refs.sliderp.style.left)<newleft) || (variable < 0 && parseFloat(this.$refs.sliderp.style.left)>newleft )  ){
              this.$refs.sliderp.style.left = parseFloat(this.$refs.sliderp.style.left) + variable +'px'
              //调用的是自身，所以会重复调用
              setTimeout(this.go(width,newleft),this.interval)         
          }else{
              this.$refs.sliderp.style.left = newleft +'px'
              let left1 = this.$refs.sliderwra.clientWidth
              let left5 = - parseFloat(this.$refs.sliderp.style.width) + 2*left1
             if(newleft > -left1){
               this.$refs.sliderp.style.left = left5+'px'
             } 
             if(newleft < left5){
             this.$refs.sliderp.style.left = -left1 +'px' 
             }   
          }
      },
      //自动播放
      _autoPlay(){
          this.$refs.left.style.display = 'none'
          this.$refs.right.style.display = 'none'
          this.timer = setInterval(()=>{
              this.rightclick()
          },5000)
      },
      //滑入停止自动播放
     stop(){
         this.$refs.left.style.display = 'block'
         this.$refs.right.style.display = 'block'
         clearInterval(this.timer)
    },
    //滑出开启自动播放
    start(){
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
