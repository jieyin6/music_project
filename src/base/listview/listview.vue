<template>
  <scroll class="listview" 
          :data= "data" 
          ref="listview"
          :listenScroll = 'listenScroll'
          @scroll= "scroll"
          :probeType= "probeType"
          >
     
    <ul>
        <li v-for="group in data" :key= "group.id" class="singer-group" ref="listGroup">
            <h2>{{group.title}}</h2>
            <ul>
                <li v-for="item in group.items"
                    :key= "item.id" 
                    class="singer-item"
                    @click="selectItem(item)"
                    > 
                    <img v-lazy="item.avatar">
                    <p class="singer-name">{{item.name}}</p>
                </li>
            </ul>
        </li>
    </ul>
    
    <div class="list-group" @touchstart="onTouchstart" @touchmove='onTouchmove'>
        <ul>
            <li v-for="(title,index) in shortList" 
                :key="index" 
                :data-index='index' 
                class="group-title"
                :class="{'active':currentInedx == index}"
                >{{title}}</li>
        </ul>
    </div>
     <div class="fix-box" v-show="fixTitle" ref='fixed'>
            <h1 class="fix-title">{{fixTitle}}</h1>
     </div>
     <div class="loading" v-show='!data.length'>
         <loading></loading>
     </div>
  </scroll>
</template>

<script>
import scroll from 'base/scroll'
import loading from 'base/loading/loading'
import {getData} from 'common/js/dom'
const touch_height = 18
const title_height = 30 
export default {
  components:{
      scroll,
      loading
  },
  data(){
      return{
          scrollY : -1,
          currentInedx : 0,
          diff : -1
      }
 },
  props:{
      data:{
          type:Array,
          default:[]
      }
  },
  computed:{
      shortList(){
          return this.data.map((group)=>{
              //substr() 方法可在字符串中抽取从 start 下标开始的指定数目的字符。
              return group.title.substr(0,1)
              
          })
      },
      fixTitle(){
          if(this.scrollY > 0){
              return ''
          }
          return this.data[this.currentInedx] ? this.data[this.currentInedx].title : ''
      }
  },
  created(){
      //无需监听
      this.touch = {}
      this.listenScroll = true
      this.probeType = 3
      this.height_group = []
  },
 methods:{
     refresh(){
         this.$refs.listview.refresh()
     },
     //点击派发事件
     selectItem(item){
        this.$emit('select',item)
     },
     onTouchstart(e){
         let touchIndex = getData(e.target,'index')
         //一个 TouchList，其会列出所有当前在与触摸表面接触的  Touch 对象，
         //不管触摸点是否已经改变或其目标元素是在处于 touchstart 阶段。
         let firstTouch = e.touches[0]
         this.touch.y1 = firstTouch.pageY
         this.touch.touchIndex = touchIndex
         this.scrollTo(touchIndex)
     },
     onTouchmove(e){
         let firstTouch = e.touches[0]
         this.touch.y2 = firstTouch.pageY
         let delta = (this.touch.y2 - this.touch.y1)/touch_height || 0
         let touchIndex = parseInt (this.touch.touchIndex) +Math.floor(delta)
         console.log(touchIndex)
         this.scrollTo(touchIndex)
     },
     scroll(pos){
         this.scrollY = pos.y 
     },
    calculateHeight(){
        this.height_group = []
        let height = 0
        this.height_group.push(height)
        let list = this.$refs.listGroup
        for(let i = 0 ; i < list.length ; i++){
            let item = list[i].clientHeight
            height+=item
            this.height_group.push(height)
        }
       
    },
      scrollTo(index){
          if(!index && index !== 0){
              return
          }
          if(index < 0 ){
              index = 0
          }else if(index > this.height_group.length - 2  ){
              index = this.height_group-2
          }
          console.log(index)
          this.scrollY = - this.height_group[index]
          console.log(this.scrollY)
          //第二个参数滚动动画时间
          this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)
     }
 },
 watch:{
     data(){
         setTimeout(()=>{
             this.calculateHeight()
         },20)
     },
     scrollY(newY){
         let heightList = this.height_group
         for(let i = 0 ;i < heightList.length;i++){
             let height1 = heightList[i]
             let height2 = heightList[i+1]
             if(!height2 || (-newY) >= height1 && (-newY) < height2) {
                this.currentInedx = i
                this.diff = height2 + newY
                return
             }
             if( (-newY) < height1){
                 this.currentInedx = 0
                 return
             }
          this.currentInedx = 0
         }
     },
     diff(newVal){
         let fixedTop = (newVal > 0 && newVal < title_height) ? newVal - title_height : 0
         if(this.fixedTop === fixedTop){
             return
         }
         this.fixedTop = fixedTop
         this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
     }
 }
}
</script>

<style lang='scss'>
@import '~common/scss/variable';
.listview{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: $color-background;
    .singer-group{
        padding-bottom: 30px;
        h2{
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            font-size: $font-size-small;
            color: $color-text-l;
            background: $color-highlight-background
        }
        .singer-item{
            display: flex;
            align-items: center;
            padding: 20px 0 0 30px;
            img{
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
            p{
                margin-left: 20px;
                color: $color-text-l;
                font-size: $font-size-medium
            }
        }
    }
    .list-group{
        position: absolute;
        z-index: 30;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        padding: 20px 0;
        border-radius: 10px;
        text-align: center;
        background: $color-background-d;
        font-family: Helvetica;
        .group-title{
            padding: 3px;
            line-height: 1;
            color: $color-text-l;
            font-size: $font-size-small
        }
        .active{
            color: $color-theme
        }
    }
    .fix-box{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        .fix-title{
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            font-size: $font-size-small;
            color: $color-text-l;
            background: $color-highlight-background;
        }
    }
    .loading{
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%)
    }
    
   
}
</style>
