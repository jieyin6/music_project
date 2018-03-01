<template>
  <transition name="slide">
      <div class="add-song" v-show="showFlag" @click.stop>
          <div class="header">
              <h1 class="title">添加歌曲至列表</h1>
              <div class="close" @click="hide">
                  <i class="icon-close"></i>
              </div>
          </div>
          <div class="search-box-wrapper">
              <search-box ref="searchBox" placeholder="搜索歌曲" @query='changequery'></search-box>
          </div>
          <div class="shortcut" v-show="!query">
              <switches :switches='switches'
                        :currentIndex='currentIndex'
                        @switch='changeindex'></switches>
              <div class="list-wrapper">
                  <scroll class="list-scroll"
                          v-if="this.currentIndex === 0" 
                          :data='playHistory'
                          ref="songScroll">
                      <div class="list-inner">
                          <song-list :songs='playHistory' @select="selectItem"></song-list>
                      </div>
                  </scroll>
                  <scroll class="list-scroll" 
                          v-if="this.currentIndex === 1" 
                          :data='searchHistory'
                          ref="searchScroll">
                      <div class="list-inner">
                          <search-list :searchlist='searchHistory' @select='setQuery' @delete='deleteSearch'></search-list>
                      </div>
                  </scroll>
              </div>
              
          </div>
          <div class="search-result" v-show="query">
              <suggest :query='query'
                      :showSinger='showSinger' 
                      ref="suggest"
                      @select='selectSuggest' 
                      @beforeScroll='blurInput'></suggest>
          </div>
          <top-tip ref="topTip">
              <div class="tip-title">
                  <i class="icon-ok"></i>
                  <span class="text">1首歌曲已经被添加到播放列表</span>
              </div>
          </top-tip>
      </div>
  </transition>
</template>

<script>
import searchBox from 'base/search-box/search-box'
import suggest from '../suggest/suggest'
import {searchMixin} from 'common/js/mixin'
import switches from 'base/switches/switches'
import { mapGetters, mapActions } from '_vuex@3.0.1@vuex'
import scroll from 'base/scroll'
import songList from 'base/song-list/song-list'
import Song from 'common/js/song'
import searchList from 'base/search-list/search-list'
import topTip from 'base/top-tip/top-tip'

export default {
    mixins:[searchMixin],
    components:{
        searchBox,
        suggest,
        switches,
        scroll,
        songList,
        searchList,
        topTip
    },
    computed:{
        ...mapGetters([
            'playHistory'
        ])
    },
    data(){
        return{
            showFlag:false,
            showSinger:false,
            query:'',
            currentIndex:0,
            switches:[
                {name:'播放历史'},
                {name:'搜索历史'}
            ]
        }
    },
    methods:{
        show(){
            this.showFlag = true
            this.$nextTick(()=>{
                 if(this.currentIndex === 0){
                this.$refs.songScroll.refresh()
            }else{
                this.$refs.searchScroll.refresh()
            }
            })
           
        },
        hide(){
            this.showFlag = false
        },
        changequery(query){
            this.query = query
            
        },
        changeindex(index){
            this.currentIndex = index
        },
        selectSuggest(){
            this.saveSearch()
            this.showTip()
        },
        selectItem(song,index){
            console.log(song)
            console.log(index)
            if (index !== 0){
                console.log(new Song(song))
                this.insertSong(new Song(song))
            }
            this.showTip()
        },
        showTip(){
            this.$refs.topTip.show()
        },
        ...mapActions([
            'insertSong'
        ])
    }
}
</script>

<style lang='scss'>
@import '~common/scss/variable';
@import '~common/scss/mixin';

.add-song{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 200;
    background: $color-background;
   
    .header{
        position: relative;
        height: 44px;
        text-align: center;
        .title{
            line-height: 44px;
            font-size: $font-size-large;
            color:$color-text
        }
        .close{
            position: absolute;
            top: 0;
            right: 8px;
            .icon-close{
                display: block;
                padding: 12px;
                font-size: 20px;
                color:$color-theme;
            }
        }
    }
    .search-box-wrapper{
        margin: 20px;
    }
    .shortcut{
        .list-wrapper{
            position: absolute;
            top: 165px;
            bottom: 0;
            width:100% ;
            .list-scroll{
                height: 100%;
                overflow: hidden;
                .list-inner{
                    padding: 20px 30px;
                }
            }
         }
      }
     .search-result{
        position: fixed;
        top: 124px;
        bottom: 0;
        width:100% ;
     }
    .tip-title{
       text-align: center;
       padding: 18px 0;
       font-size: 0;
       .icon-ok{
           font-size: $font-size-medium;
           color: $color-theme;
           margin-right:4px; 
       }
       .text{
           font-size: $font-size-medium;
           color: $color-text
       }
    }
}
 .slide-enter-active,.slide-leave-active{
        transition: all 0.3s
    }
.slide-enter,.slide-leave-to{
       transform: translate3d(100%,0,0)
    }
</style>
