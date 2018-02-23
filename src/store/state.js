import {playMode} from 'common/js/config'

const state = {
    singer:{},
    //歌曲播放
    playing:false,
    //全屏展示
    fullScreen:false,
    playList:[],
    sequenceList:[],
    mode:playMode.sequence,
    currentIndex:-1,
    //歌单
    disc:{}
}

export default state