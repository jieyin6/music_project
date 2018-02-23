<template>
<transition name="slider">
  
      <music-list :songs='songs' :title="title" :bg-image="bgImage"></music-list>
  
  </transition>
</template>

<script>
import musicList from '../music-list/music-list'
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/recommend'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
export default {
    data(){
        return{
            songs:[]
        }
    },
    components:{
        musicList
    },
  computed:{
      ...mapGetters([
          'singer'
      ]),
       title(){
         return this.singer.name
      },
      bgImage(){
          return this.singer.avatar
      }
  },
  created(){
      this._getSingerDetail()
     },
  methods:{
      _getSingerDetail(){
          if(!this.singer.id){
              this.$router.push('/singer')
              return
          }
          getSingerDetail(this.singer.idNum).then((res)=>{
              if(res.code == ERR_OK){
                  this.songs = this._normalizeSongs(res.data.list)
              }
          })
      },
      _normalizeSongs(list){
          let ret = []
          list.forEach((item) => {
              let {musicData} = item
              if(musicData.albummid && musicData.songid){
                   ret.push(createSong(musicData))
              }
            })
            return ret
            console.log(ret)
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
