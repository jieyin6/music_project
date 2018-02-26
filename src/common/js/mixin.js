import {mapGetters} from 'vuex'

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