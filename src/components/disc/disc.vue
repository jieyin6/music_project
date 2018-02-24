<template>
  <transition name="slider">
      <music-list :bg-image='bgImage' :title='title' :songs='songlist'></music-list>
  </transition>
</template>

<script>
import musicList  from '../music-list/music-list'
import {mapGetters} from 'vuex'
import {getSongList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'

export default {
    components:{
        musicList
    },
    data(){
        return{
            songlist:[]
        }
    },
    computed:{
        bgImage(){
            return this.disc.imgurl
        },
        title(){
            return this.disc.dissname
        },
        ...mapGetters([
            'disc'
        ])
    },
    created(){
        this._getSongList()
    },
    methods:{
        _getSongList(){
            if(!this.disc.dissid){
                this.$router.push('/recommend')
                return
            }
           getSongList(this.disc.dissid).then((res) => {
                if(res.code === ERR_OK){
                    console.log(res.cdlist[0].songlist)
                    this.songlist =this. _normalizeSong(res.cdlist[0].songlist)
                    console.log(this.songlist)
               }
            })
        },
        _normalizeSong(list){
            let ret = []
            list.forEach((musicData) => {
                if(musicData.albummid && musicData.songid){
                    ret.push(createSong(musicData))
                }
            })
            return ret
        }
    }

}
</script>

<style lang="scss">
@import '~common/scss/variable';

.slider-enter-active,.slider-leave-active{
    transition: all 0.3s
}
.slider-enter,.slider-leave-to{
    transform: translate3d(100%,0,0)
}

</style>
