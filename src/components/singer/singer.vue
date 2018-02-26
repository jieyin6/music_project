<template>
  <div class="singer-wrapper" ref="singer">
   <list-view :data="singerList" @select="selectSinger" ref="list"></list-view>
   <router-view></router-view>
  </div>
</template>

<script>
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer'
import ListView from 'base/listview/listview'
import {mapMutations} from 'vuex'
import {playlistMixin} from 'common/js/mixin'

const hotSingerLength = 10
const hot_name = '热门'
export default {
  mixins:[playlistMixin],
  data(){
    return{
      singerList:[]
    }
  },
  components:{
    ListView
  },
  created(){
    
      this._getSingerList()
    
  },
  methods:{
    handlePlaylist(playlist){
       let bottom
        if(playlist > 0){
            bottom = '60px'
        }else{
            return
        }
      this.$refs.singer.style.bottom = bottom
      this.$refs.list.refresh()
    },
    selectSinger(singer){
      //跳转
      this.$router.push({
        path:`/singer/${singer.id}`
      })
     this.setSinger(singer)
      
    },
    _getSingerList(){
      getSingerList().then((res) => {
        if(res.code === ERR_OK){
          console.log(res.data.list)
          this.singerList=this._nomalizeSinger(res.data.list)
          console.log(this.singerList)
        }
      })
    },
    _nomalizeSinger(list){
       let map ={
         hot:{
           title:hot_name,
           items:[]
         }
       }
       list.forEach((items,index) => {
         if(index < hotSingerLength){
           map.hot.items.push(new Singer({
             id:items.Fsinger_mid,
             name:items.Fsinger_name,
             idNum:items.Fsinger_id
          }))
         }
        const key = items.Findex
        if(!map[key]){
            map[key]={
              title:key,
              items:[]
            }
          }
        map[key].items.push(new Singer({
          id:items.Fsinger_mid,
          name:items.Fsinger_name,
          idNum:items.Fsinger_id
        }))
      
      })
      //将map对象整理成数组 按照我们所需要的顺序
      let hot = []
      let ret = []
      for(let key in map){
        let val = map[key]
        if(val.title.match(/[a-zA-Z]/)){
          ret.push(val)
        }else if(val.title === hot_name){
          hot.push(val)
        }
      }
        //按照a-z排序
      ret.sort((a,b)=>{
        //charCodeAt() 方法可返回指定位置的字符的 Unicode 编码。这个返回值是 0 - 65535 之间的整数。
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      console.log(hot)
      console.log(ret)
      return hot.concat(ret)

    },
    ...mapMutations({
      setSinger:'SET_SINGER'
    })

  }
}
</script>

<style lang="scss">
@import '~common/scss/variable';
.singer-wrapper{
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%
}
</style>
