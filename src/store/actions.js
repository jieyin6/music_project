import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/until'

//当点击随机播放按钮时，调用的是randomplay action。此时再点击列表中的其他歌曲时
//显示播放的还是随机播放时当前的歌曲。所以点击歌曲时，要先判断当前模式是否是随机
//是的话，就将歌曲列表打乱，在打乱的列表里找到点击的歌曲的index，将index传给currentindex
//即可播放点击歌曲。
export function findIndex(list,song){
    return list.findIndex((item) =>{
        return item.id === song.id
    })
}

export const selectPlay = function({commit,state},{list,index}){
    commit(types.SET_SEQUENCE_LIST,list)
    if(state.mode === playMode.random){
        let randomlist = shuffle(list)
        commit(types.SET_PLATLIST,randomlist)
        index = findIndex(randomlist,list[index])
    }else{
        commit(types.SET_PLATLIST,list)
    }
    commit(types.SET_CURRENT_INDEX,index)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_PlAYING,true)
}

export const randomPlay = function({commit},{list}){
    commit(types.SET_PLAY_MODE,playMode.random)
    commit(types.SET_SEQUENCE_LIST,list)
    let randomlist = shuffle(list)
    commit(types.SET_PLATLIST,randomlist)
    commit(types.SET_CURRENT_INDEX,0)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_PlAYING,true)
}