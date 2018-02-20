<template>
  <div class="singer-wrapper">
   
  </div>
</template>

<script>
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
export default {
  data(){
    return{
      singerList:[]
    }
  },
  created(){
    
      this._getSingerList()
    
  },
  methods:{
    _getSingerList(){
      getSingerList().then((res) => {
        if(res.code === ERR_OK){
          console.log(res.data.list)
        }
      })
    }
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
