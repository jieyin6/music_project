<template>
  <transition name="slider">
      <music-list :bg-image='bgImage' :title='title'></music-list>
  </transition>
</template>

<script>
import musicList  from '../music-list/music-list'
import {mapGetters} from 'vuex'
import {getSongList} from 'api/recommend'
import {ERR_OK} from 'api/config'

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
            console.log(this.disc.dissid)
           getSongList(this.disc.dissid).then((res) => {
                if(res.code === ERR_OK){
                    console.log(res.cdlist[0].songlist)
                }
            })
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
