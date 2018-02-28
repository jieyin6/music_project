import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/until'
import {saveSearch,deleteSearch,clearSearch} from 'common/js/catch'

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

export const insertSong = function({commit,state},song){
   
    //Do not mutate vuex store state outside mutation handlers 会报错
    let playlist = state.playList.slice()
    let sequencelist = state.sequenceList.slice()
    let currentindex = state.currentIndex
    let currentSong = playlist[currentindex]
//如果插入的歌曲在列表内，找出其index
    let songIndex = findIndex(playlist, song)
    //插入的歌曲是下一首
    currentindex ++
//将歌曲插入到列表
    playlist.splice(currentindex,0,song)
    //如果包含了这首歌 即可以找到其index
    if(songIndex > -1){
        //这首歌的位置在插入的位置之前
        if(currentindex > songIndex){
            playlist.splice(songIndex,1)
            currentindex  --
        }else{
            //插入时currentindex加上了1
            playlist.splice(songIndex+1,1)
        }
    }
    
    //修改sequencelist
    let currentSindex = findIndex(sequencelist,currentSong)+1
    let sequenceIndex = findIndex(sequencelist,song)
    sequencelist.splice(currentSindex,0,song)
    if(sequenceIndex > -1){
        if(sequenceIndex > currentSindex){
            sequencelist.splice(sequenceIndex +1,1)
        }else{
            sequencelist.splice(sequenceIndex,1)
        }
    }
    commit(types.SET_PLATLIST,playlist)
    commit(types.SET_SEQUENCE_LIST,sequencelist)
    commit(types.SET_CURRENT_INDEX,currentindex)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_PlAYING,true)
}

export const saveSearchHistory = function({commit},query){
   commit(types.SET_SEARCH_HISTORY,saveSearch(query))
}

export const deleteSearchHistory = function({commit},query){
    commit(types.SET_SEARCH_HISTORY,deleteSearch(query))
}

export const clearSearchHistory = function({commit}){
    commit(types.SET_SEARCH_HISTORY,clearSearch())
}

export const deleteSong = function({commit,state},song){
    let playlist = state.playList.slice()
    let sequencelist = state.sequenceList.slice()
    let currentindex = state.currentIndex
    let pIndex = findIndex(playlist, song) 
    playlist.splice(pIndex,1)
    let sIndex = findIndex(sequencelist,song)
    sequencelist.splice(sIndex,1)

    if(currentindex > pIndex || currentindex === playlist.length){
        currentindex--
    }

    commit(types.SET_PLATLIST,playlist)
    commit(types.SET_SEQUENCE_LIST,sequencelist)
    commit(types.SET_CURRENT_INDEX,currentindex)
 //全删掉了
    if(!playlist.length){
        commit(types.SET_PlAYING,false)
    }else{
        commit(types.SET_PlAYING,true)
    }
}

export const clearPlayList = function({commit}){
    commit(types.SET_PLATLIST,[])
    commit(types.SET_SEQUENCE_LIST,[])
    commit(types.SET_CURRENT_INDEX,-1)
    commit(types.SET_PlAYING,false)
}