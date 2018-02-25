<template>

 <div class="progress-bar" ref="progressBar" @click="clickProgress">
     <div class="bar-inner">
         <div class="progress" ref="progress"></div>
         <div class="progress-btn-wrapper"
              ref="progressBtn"
              @touchstart='progressTouchStart'
              @touchmove='progressTouchMove'
              @touchend='progressTouchEnd'>
             <div class="progress-btn"></div>
         </div>
     </div>
 </div>

</template>

<script>
import {prefixStyle} from 'common/js/dom'

const transform = prefixStyle('transform')
const btnWidtn = 16
export default {
    props:{
        precent:{
            type:Number,
            default:0
        }
    },
    data(){
        return{
            touch:{}
        }
    },
    methods:{
        progressTouchStart(e){
           this.touch.initiated = true
           this.touch.startX = e.touches[0].pageX
           this.touch.left = this.$refs.progress.clientWidth
        },
        progressTouchMove(e){
            if(!this.touch.initiated){
                return
            }
           const deltax = e.touches[0].pageX - this.touch.startX
           const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - btnWidtn,Math.max(0,this.touch.left + deltax))
            this._offset(offsetWidth)
        },
        progressTouchEnd(){
            this.touch.initiated = false
            this.changeProgress()
        },
        changeProgress(){
             const widthBar = this.$refs.progressBar.clientWidth - btnWidtn
             const precent = this.$refs.progress.clientWidth/widthBar
             this.$emit('changeprecent',precent)
        },
        _offset(offsetWidth){
            this.$refs.progress.style.width = offsetWidth +'px'
            this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
        },
        //点击改变歌曲进度
        clickProgress(e){
            let rect = this.$refs.progressBar.getBoundingClientRect()
            let offsetWidth = e.pageX - rect.left
            this._offset(offsetWidth)
           //点击progressBtn时候 offset获取不会
            //this._offset(e.offsetX)
            this.changeProgress()
        }
    },
    watch:{
        precent(newPrecent){
            if(newPrecent >= 0 && !this.touch.initiated){
            const widthBar = this.$refs.progressBar.clientWidth - btnWidtn
            const offsetWidth = newPrecent * widthBar
            this._offset(offsetWidth)
            }
        }
    }

}
</script>

<style lang='scss'>
@import '~common/scss/variable';
.progress-bar{
    height: 30px;
    .bar-inner{
        position: relative;
        top: 13px;
        height: 4px;
        background: rgba(0, 0, 0, 0.3);
        .progress{
            position: absolute;
            height: 100%;
            background: $color-theme;
        }
        .progress-btn-wrapper{
            position: absolute;
            left: -8px;
            top: -13px;
            width: 30px;
            height: 30px;
            .progress-btn{
                position: relative;
                top: 7px;
                left: 7px;
                box-sizing: border-box;
                width: 16px;
                height: 16px;
                border: 3px solid $color-text;
                border-radius: 50%;
                background: $color-theme
            }
        }
    }
}

</style>
