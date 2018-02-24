//定义修改的操作

import * as types from './mutation-types'

const mutations = {
    [types.SET_SINGER](state,singer) {
        state.singer = singer
    },
    [types.SET_PlAYING](state,flag){
        state.playing = flag
    },
    [types.SET_FULL_SCREEN](state,flag){
        state.fullScreen = flag
    },
    [types.SET_PLATLIST](state,list){
        state.playList = list
    },
    [types.SET_SEQUENCE_LIST](state,list){
        state.sequenceList = list
    },
    [types.SET_PLAY_MODE](state,mode){
        state.mode = mode
    },
    [types.SET_CURRENT_INDEX](state,index){
        state.currentIndex = index
    },
    [types.SET_DISC](state,disc){
        state.disc = disc
    },
    [types.SET_TOP_LIST](state,list){
        state.toplist = list
    }
}

export default mutations