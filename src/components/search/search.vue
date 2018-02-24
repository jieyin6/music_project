<template>
<div class="search">
    <div class="search-box-wrapper">
    <search-box ref="searchBox"></search-box>
    </div>
    <div class="shortcut-wrapper">
        <div class='shortcut'>
            <div class="hot-key">
                <h1 class="title">热门搜索</h1>
                <ul>
                    <li v-for="song in hotMusic" 
                       class="item"
                       :key="song.n"
                       @click="setQuery(song.k)"
                       >{{song.k}}</li>
                </ul>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import searchBox from 'base/search-box/search-box'
import {getHotMusic} from 'api/search'
import {ERR_OK} from 'api/config'

export default {
    components:{
        searchBox
    },
    data(){
        return{
            hotMusic:[]
        }
    },
    created(){
        this._getHotMusic()
    },
    methods:{
        _getHotMusic(){
            getHotMusic().then((res)=>{
                if(res.code === ERR_OK){
                    this.hotMusic = res.data.hotkey
                    console.log(this.hotMusic)
                }
            })
        },
        setQuery(query){
            this.$refs.searchBox.setQuery(query)
        }
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
        }
    }
}

</style>
