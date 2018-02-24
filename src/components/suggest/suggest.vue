<template>
  <div class="suggest">
      <ul class="suggest-list">
          <li class="suggest-item">
              <div class="icon">
                  <i></i>
              </div>
              <div class="name">
                  <p class="text"></p>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
import {search} from 'api/search'
import {ERR_OK} from 'api/config'

export default {
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
            result:[]
        }
    },
    methods:{
        _search(){
            search(this.query,this.page,this.showSinger).then((res) => ){
                if(res.code === ERR_OK){
                    
                }
            }
        }
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
}
</style>
