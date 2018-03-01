import {mapGetters, mapMutations,mapActions} from 'vuex'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/until'

export const playlistMixin = {
computed:{
    ...mapGetters([
        'playList'
    ])
},
mounted(){
    this.handlePlaylist(this.playList)
},
activated(){
    this.handlePlaylist(this.playList)
},
watch:{
   playList(newlist){
    this.handlePlaylist(newlist)
   } 
},
methods:{
    //调用组件中又该方法就调用，没有的话调用mixin中的该方法
    handlePlaylist(list){
        throw new Error('component must implement handleplaylis tmethod')
    }
}
}

export const playerMixin = {
   computed:{
    playmode(){
        return this.mode === playMode.sequence ? 'icon-sequence' :
         this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
      },
      ...mapGetters([
        'sequenceList',
        'currentSong',
        'mode',
        'playList'
    ])
   },
   methods:{
        //改变播放模式
        changeMode(){
            const mode = (this.mode +1)%3
            this.setMode(mode)
            let list = null
            if(this.mode === playMode.random){
                list = shuffle(this.sequenceList)
            }else{
                list = this.sequenceList
            }
             this.resetCurrentIndex(list)
             this.setPlaylist(list)
        },
         resetCurrentIndex(list){
             let index = list.findIndex((item) => {
                 return item.id === this.currentSong.id
             })
             this.setCurrentIndex(index)
        },
        ...mapMutations({
            setCurrentIndex:'SET_CURRENT_INDEX',
            setMode:'SET_PLAY_MODE',
            setPlaylist:'SET_PLATLIST',
            setPlaying:'SET_PlAYING',
        })
   }
}

export const searchMixin = {
    computed:{
        ...mapGetters([
            'searchHistory',
           ]),
    },
    methods:{
        blurInput(){
            this.$refs.searchBox.blur()
        },
        saveSearch(){
            this.saveSearchHistory(this.query)
        },
        deleteSearch(item){
            this.deleteSearchHistory(item)
        },
        setQuery(query){
            this.$refs.searchBox.setQuery(query)
        },
        ...mapActions([
            'saveSearchHistory',
            'deleteSearchHistory',
            'clearSearchHistory'
        ])
    }
}

export const favoriteMixin = {
    computed:{
        ...mapGetters([
            'favoriteList'
        ])
    },
    methods:{
        getFavoriteIcon(song){
            if(this.isFavorite(song)){
                return 'icon-favorite'
            }
            return 'icon-not-favorite'
        },
        toggleFavoriteIcon(song){
            if(this.isFavorite(song)){
                this.deleteFavoriteList(song)
            }else{
                this.saveFavoriteList(song)
            }
        },
        isFavorite(song){
            let index = this.favoriteList.findIndex((item)=>{
                return item.id === song.id
            })
            return index >-1
        },
        ...mapActions([
            'saveFavoriteList',
            'deleteFavoriteList'
        ])    
    }
}