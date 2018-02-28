<template>
  <transition name='confirm-fade'>
      <div class="confirm" v-show="isshow">
          <div class="confirm-wrapper">
              <div class="confirm-content">
                  <p class="text">{{text}}</p>
                  <div class="operate">
                      <div class="operate-btn left" @click="confirm">{{confirmBtn}}</div>
                      <div class="operate-btn" @click="cancel">{{cancelBtn}}</div>
                  </div>
              </div>
          </div>
      </div>
  </transition>
</template>

<script>
export default {
    props:{
        text:{
            type:String,
            default:''
        },
        confirmBtn:{
            type:String,
            default:'确定'
        },
        cancelBtn:{
            type:String,
            default:'取消'
        }
    },
    data(){
        return{
            isshow:false
        }
    },
    methods:{
        show(){
            this.isshow = true
        },
        hide(){
            this.isshow = false
        },
        cancel(){
            this.$emit('cancel')
        },
        confirm(){
            this.$emit('confirm')
        }
    }

}
</script>

<style lang='scss'>
@import '~common/scss/variable';

.confirm{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 998;
    background-color: $color-background-d;
    &.confirm-fade-enter-active{
        animation: confrim-fadein 0.3s;
        .confirm-content{
            animation: confirm-zoom 0.3s;
        }
    }
    .confirm-wrapper{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 999;
        .confirm-content{
            width: 270px;
            border-radius: 13px;
            background: $color-highlight-background;
            .text{
                padding:19px 15px;
                line-height: 22px;
                text-align: center;
                font-size: $font-size-large;
                color: $color-text-l;
            }
            .operate{
                display: flex;
                align-items: center;
                text-align:center;
                font-size: $font-size-large;
                .operate-btn{
                    flex: 1;
                    line-height: 22px;
                    padding: 10px 0 ;
                    border-top:1px solid $color-background-d;
                    color: $color-text-d;
                    &.left{
                        border-right: 1px solid $color-background-d
                    }
                }
            }
        }
    }
}
@keyframes confirm-fadein{
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
@keyframes confirm-zoom {
    0%{
        transform: scale(0)
    }
    50%{
        transform: scale(1.1)
    }
    100%{
        transform: scale(1)
    }
    
}
</style>
