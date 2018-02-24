<template>
  <transition name="slider">
    <music-list :rank='rank' :title = 'title' :bgImage = 'bgImage' :songs='musicgroup' ></music-list>
 </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import musicList from '../music-list/music-list'
import {getMusicList} from 'api/rank'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'

export default {
    components:{
        musicList
    },
    data(){
        return{
            musicgroup:[],
            rank:true
        }
    },
    created(){
        this._getMusicList()
    },
    computed:{
        title(){
            return this.toplist.topTitle
        },
        bgImage(){
            if(this.musicgroup.length){
                return this.musicgroup[0].image
            }
            return ''
        },
        ...mapGetters([
            'toplist'
        ])
    },
    methods:{
        _getMusicList(){
            if(!this.toplist.id){
                this.$router.push('/rank')
                return
            }
            getMusicList(this.toplist.id).then((res) => {
                if(res.code === ERR_OK){
                    this.musicgroup = this._normalizeMusic(res.songlist)
                   }
            })
        },
        _normalizeMusic(list){
            let ret = []
            list.forEach((item) => {
                const musicData = item.data
                if(musicData.albummid && musicData.songid){
                    ret.push(createSong(musicData))
                }
            })
            return ret
            
        }
    }
}
</script>

<style lang='scss'>
@import '~common/scss/variable';

.slider-enter-active,.slider-leave-active{
    transition: all 0.3s
}
.slider-enter,.slider-leave-to{
    transform: translate3d(100%,0,0)
}
</style>
