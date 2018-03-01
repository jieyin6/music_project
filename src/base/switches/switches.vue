<template>
  <div class="switches">
      <div class="switch-item" 
            v-for="(item,index) in switches" 
            :key="index"
            :class="{'active':currentIndex === index}"
            @click="changeindex(index)">
          <span>{{item.name}}</span>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        switches:{
            type:Array,
            default:''
        },
        currentIndex:{
            type:Number,
            default:0
        }
    },
    methods:{
        changeindex(index){
            this.$emit('switch',index)
        }
    }

}
</script>

<style lang='scss'>
@import '~common/scss/variable';
.switches{
    display: flex;
    align-items: center;
    width: 240px;
    margin: 0 auto;
    border: 1px solid $color-highlight-background;
    border-radius: 5px;
    .switch-item{
      flex: 1;
      padding: 8px;
      text-align: center;
      font-size: $font-size-medium;
      color: $color-text-d;
      &.active{
        background: $color-highlight-background;
        color: $color-text;
      }
    }
}

</style>
