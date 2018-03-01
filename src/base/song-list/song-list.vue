<template>
<div class="song-list" :data='songs'> 
     <ul>
         <li v-for="(song,index) in songs" :key="song.id" class="item" @click="selectItem(song,index)">
            <div class="song-rank" v-show="rank">
               <span :class="getRankcla(index)" v-text="getRanktext(index)"></span>
            </div>
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
        },
        rank:{
            type:Boolean,
            default:false
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
        },
        getRankcla(index){
            if(index <= 2 ){
                return `icon icon${index}`
            }else{
                return 'text'
            }
        },
        getRanktext(index){
            if(index > 2){
                return index + 1 
            }
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
        .song-rank{
            flex:  0 0 25px;
            width: 25px;
            margin-right: 30px;
            text-align: center;
            .icon{
                display: inline-block;
                width: 25px;
                height: 24px;
                background-size: 25px 24px;
                
            }
            .icon0{
                @include bg-image('first')
            }
            .icon1{
                @include bg-image('second')
            }
            .icon2{
                @include bg-image('third')
            }
            .text{
                color: $color-theme;
                font-size: $font-size-large;
            }
        }
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
