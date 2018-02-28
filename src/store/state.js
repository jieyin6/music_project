import {playMode} from 'common/js/config'
import {saveSearchlist} from 'common/js/catch'

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
    disc:{},
    //排行榜
    toplist:{},
    //搜索历史 从本地读取数据
    searchHistory:saveSearchlist()
}

export default state