<template>
<div class="search">
    <div class="search-box-wrapper">
    <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query" ref="shortcut">
        <scroll class='shortcut' :data='alllist' ref="scroll" >
            <div>
                <div class="hot-key">
                    <h1 class="title">热门搜索</h1>
                    <ul>
                     <li v-for="song in hotMusic" 
                         class="item"
                         :key="song.n"
                         @click="setQuery(song.k)"
                       >{{song.k}}
                       </li>
                    </ul>
                </div>
                <div class="search-history" v-show="this.searchHistory.length" >
                    <h1 class="title">
                        <span class="text">搜索历史</span>
                        <span class="clear" @click="clearSearch">
                            <i class="icon-clear"></i>
                        </span>
                    </h1>
                    <search-list :searchlist = 'searchHistory'
                             @select='setQuery'
                             @delete='deleteSearch'
                             ></search-list>
                </div>
            </div>
        </scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
        <suggest @select='saveSearch' 
                @beforeScroll='blurInput'
                :query='query'
                ref="suggest"></suggest>
    </div>
    <confirm ref="confirm"
             text='确定要全部删除?'
            @cancel='cancelDeleteAll'
            @confirm='confirmDeleteAll'></confirm>
    <router-view></router-view>
  </div>
</template>

<script>
import suggest from '../suggest/suggest'
import searchBox from 'base/search-box/search-box'
import {getHotMusic} from 'api/search'
import {ERR_OK} from 'api/config'
import {mapActions,mapGetters} from 'vuex'
import searchList  from 'base/search-list/search-list'
import confirm from 'base/confirm/confirm'
import scroll from 'base/scroll'
import {playlistMixin,searchMixin} from 'common/js/mixin'

export default {
    mixins:[playlistMixin,searchMixin],
    components:{
        searchBox,
        suggest,
        searchList,
        confirm,
        scroll
    },
    data(){
        return{
            hotMusic:[],
            query:''
        }
    },
    created(){
        this._getHotMusic()
        
    },
    computed:{
        alllist(){
            return this.hotMusic.concat(this.searchHistory)
        },
         ...mapGetters([
           'playList'
         ]),
    },
    watch:{
        query(newquery){
            if(!newquery){
                this.$nextTick(()=>{
                     this.$refs.scroll.refresh()
                })
            }
        }
    },
    methods:{
         //mixin
      handlePlaylist(playlist){
         let bottom
        if(playlist.length > 0){
            bottom = '60px'
        }else{
            return
        }
       this.$refs.shortcut.style.bottom = bottom
        this.$refs.scroll.refresh()
        this.$refs.searchResult.style.bottom = bottom
        this.$refs.suggest.refresh()
      },
       _getHotMusic(){
            getHotMusic().then((res)=>{
                if(res.code === ERR_OK){
                    this.hotMusic = res.data.hotkey
                    console.log(this.hotMusic)
                }
            })
        },
        onQueryChange(query){
            this.query = query
        },
       confirmDeleteAll(){
            this.clearSearchHistory()
            this.$refs.confirm.hide()
        },
        cancelDeleteAll(){
            this.$refs.confirm.hide()
        },
         clearSearch(){
            this.$refs.confirm.show()
            
        },
       
    }

}
</script>

<style lang='scss'>
@import '~common/scss/variable';
@import '~common/scss/mixin';
.search{
    .search-box-wrapper{
        margin: 20px;
    }
    .shortcut-wrapper{
        position: fixed;
        top: 178px;
        bottom: 0;
        width: 100%;
        .shortcut{
            height: 100%;
            overflow: hidden;
            .hot-key{
                margin: 0 20px 20px 20px;
                .title{
                    margin-bottom: 20px;
                    font-size: $font-size-medium;
                    color:$color-text-l
                }
                .item{
                    display: inline-block;
                    padding: 5px 10px;
                    margin: 0 20px 10px 0;
                    border-radius: 6px;
                    background: $color-highlight-background;
                    font-size: $font-size-medium;
                    color: $color-text-d
                }
            }
             .search-history{
                position: relative;
                margin: 0 20px;
                .title{
                    display: flex;
                    align-items: center;
                    height: 40px;
                    font-size: $font-size-medium;
                    color: $color-text-l;
                    .text{
                    flex: 1;
                    }
                    .clear{
                    @include extend-click();
                    .icon-clear{
                        font-size: $font-size-medium;
                        color: $color-text-d;
                        }
                    }
                }
            }
        }
    }
    .search-result{
        position: fixed;
        width: 100%;
        top: 178px;
        bottom: 0
    }
}

</style>
