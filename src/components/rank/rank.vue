<template>
 <div class="rank" >
     <scroll class="toplist" :data="toplist">
         <ul>
             <li class="item" v-for="item in toplist" :key="item.id" @click="selectList(item,item.id)">
                 <div class="icon">
                     <img width="100" height="100" v-lazy="item.picUrl">
                 </div>
                 <ul class="songlist">
                     <li class="song" v-for="(song,index) in item.songList" :key="song.id">
                         <span>{{index + 1}}</span>
                         <span >{{song.songname}} - {{song.singername}}</span>
                     </li>
                 </ul>
             </li>
         </ul>
         <div class="loading-container" v-show="!toplist.length">
             <loading></loading>
         </div>
     </scroll>
    <router-view></router-view>
 </div>
</template>

<script>
import {getTopList} from 'api/rank'
import {ERR_OK} from 'api/config'
import scroll from 'base/scroll'
import loading from 'base/loading/loading'
import {mapMutations} from 'vuex'

export default {
    components:{
        scroll,
        loading
    },
    data(){
        return{
            toplist:[]
        }
    },
    created(){
        this._getTopList()
    },
    methods:{
        _getTopList(){
            getTopList().then((res)=>{
                if(res.code === ERR_OK){
                    this.toplist = res.data.topList
                    console.log(this.toplist)
                }
            })
        },
        selectList(item,index){
            //this.$emit('select',item,index)
            this.$router.push(`/rank/${index}`)
            this.setToplist(item)
        },
         ...mapMutations({
        setToplist:'SET_TOP_LIST'
    })
    },
   
}
</script>

<style lang="scss">
@import '~common/scss/variable';
@import '~common/scss/mixin';

.rank{
    position: fixed;
    width:100% ;
    top: 88px;
    bottom:0;
    .toplist{
        height:100%;
        overflow: hidden;
        .item{
            display: flex;
            margin: 0 20px;
            padding-top: 20px;
            height: 100px;
            &:last-child{
                padding-bottom:20px; 
            }
            .icon{
                flex: 0 0 100px;
                width:100px ;
                height:100px;
            }
            .songlist{
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 0 20px;
                height: 100px;
                overflow: hidden;
                background: $color-highlight-background;
                color: $color-text-d;
                font-size: $font-size-small;
                .song{
                    /* no-wrap()*/
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    line-height: 26px;
                }
            }
        }
        .loading-container{
           position: absolute;
           width: 100%;
           top: 50%;
           transform: translateY(-50%)
        }
    }
}

</style>
