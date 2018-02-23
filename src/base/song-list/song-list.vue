<template>

 <div class="song-list" :data='songs'> 
     <ul>
         <li v-for="(song,index) in songs" :key="song.id" class="item" @click="selectItem(song,index)">
             <div class="content">
                 <h1 class="name">{{song.name}}</h1>
                 <p class="desc">{{getDesc(song)}}</p>
             </div>
         </li>
     </ul>
</div>

</template>

<script>
import scroll from 'base/scroll'
export default {
    props:{
        songs:{
            type:Array,
            default:[]
        }
    },
    components:{
        scroll
    },
   methods:{
        getDesc(song){
            return `${song.singer}·${song.album}`
        },
        selectItem(item,index){
            this.$emit('select',item,index)
        }
    }
}
</script>

<style lang="scss">
@import '~common/scss/variable';
@import '~common/scss/mixin';

.song-list{
    .item{
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 64px;
        font-size: $font-size-medium;
        .content{
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            .name{
                color: $color-text
            }
            .desc{
                margin-top: 4px;
                color: $color-text-d
            }
        }
    }
}

</style>
