<template>
  <scroll class="suggest" 
          :data='result'
          :pullUp='pullUp'
          :beforeScroll = 'beforeScroll'
          @scrollToEnd='searchMore'
          @beforeScroll='listScroll'
          ref="scroll"
          >
      <ul class="suggest-list">
          <li @click="selectItem(item)" class="suggest-item" v-for="item in result" :key="item.id">
              <div class="icon">
                  <i :class="getIconCla(item)"></i>
              </div>
              <div class="name">
                  <p class="text" v-html="getDisplayName(item)"></p>
              </div>
          </li>
          <loading v-show="hasMore" title=""></loading>
      </ul>
      <div class="no-result-wrapper" v-show=" !hasMore && !result.length">
          <no-result title="抱歉，暂无搜索结果"></no-result>
      </div>
  </scroll>
</template> 

<script>
import loading from 'base/loading/loading'
import scroll from 'base/scroll'
import {search} from 'api/search'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import Singer from 'common/js/singer'
import {mapMutations,mapActions} from 'vuex'
import noResult from 'base/no-result/no-result'

const prepage = 20

const TYPE_SINGER = 'singer'
export default {
    components:{
        scroll,
        loading,
        noResult
    },
    props:{
        query:{
            type:String,
            default:''
        },
        showSinger:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return{
            page:1,
            result:[],
            pullUp:true,
            //是否还有更多
            hasMore:true,
            beforeScroll:false
        }
    },
    methods:{
        refresh(){
            this.$refs.scroll.refresh()
        },
        _search(){
            //query值改变时，加载到第一页的位置
            this.page = 1
            this.$refs.scroll.scrollTo(0,0)
            this.hasMore = true
            search(this.query,this.page,this.showSinger,prepage).then((res) =>{
                 if(res.code === ERR_OK){
                     this.result = this._getResult(res.data)
                     this._checkMore(res.data)
               }
            })
        },
       searchMore(){
           
            if(!this.hasMore){
                return
            }
            
            this.page++
            search(this.query,this.page,this.showSinger,prepage).then((res)=>{
                if(res.code === ERR_OK){
                     this.result = this.result.concat(this._getResult(res.data))
                     this._checkMore(res.data)
               }
            })
        },
        _checkMore(data){
            const song = data.song
           
            if(!song.list.length || song.curnum + song.curpage * prepage >= song.totalnum){
                this.hasMore = false
            }
        },
        _getResult(data){
            let ret = []
            if(data.zhida && data.zhida.singerid){
                ret.push({...data.zhida,...{type:TYPE_SINGER}})
            }
            if(data.song){
               ret = ret.concat(this._normalizeSong(data.song.list))
             }
            return ret
        },
        getIconCla(item){
            if(item.type === TYPE_SINGER){
                return 'icon-mine'
            }else{
                return 'icon-music'
            }
        },
        getDisplayName(item){
            if(item.type === TYPE_SINGER){
                return item.singername
            }else{
                return `${item.name}-${item.singer}`
            }
        },
        _normalizeSong(list){
            let ret = []
            list.forEach((musicData) => {
                 if (musicData.songid && musicData.albummid) {
                        ret.push(createSong(musicData))
                    }
            })
            return ret
        },
        selectItem(item){
            if(item.type === TYPE_SINGER){
                const singer = new Singer({
                    id:item.singermid,
                    name:item.singername,
                    idNum:item.singerid
                })
                console.log(singer)
                this.$router.push({
                    path:`/search/${singer.id}`
                })
                this.setSinger(singer)
            }else{
               this.insertSong(item)
            }
           this.$emit('select')
        },
        listScroll(){
            this.$emit('listScroll')
        },
        ...mapMutations({
            setSinger:'SET_SINGER'
        }),
        ...mapActions([
            'insertSong'
        ])
    },
    watch:{
        query(){
            this._search()
        }
    }
}
</script>

<style lang="scss">
@import '~common/scss/variable';
@import '~common/scss/mixin';

.suggest{
    height: 100%;
    overflow: hidden;
    .suggest-list{
        padding: 0 30px;
        .suggest-item{
            display: flex;
            align-items: center;
            padding-bottom: 20px;
            .icon{
                flex: 0 0 30px;
                width: 30px;
            }
            .name{
                flex: 1;
                font-size: $font-size-medium;
                color: $color-text-d;
                overflow: hidden;
                .text{
                    @include no-wrap()
                }
            }
        }
    }
    .no-result-wrapper{
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%)
    }
}
</style>
