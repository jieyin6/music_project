import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const maxLength = 15

const PLAY_KEY = '__play__'
const maxPlayLength = 200

const FAVORITE_KET = '__favorite__'
const maxFavoriteLength = 200

//检查数组里有无重复 对数组的操作
function insetArray(arr,val,compare,maxlen){
    let index = arr.findIndex(compare)
    if(index === 0 ){
        return
    }
    if(index > 0){
        arr.splice(index,1)
    }
    arr.unshift(val)
    if(maxlen && arr.length > maxlen){
        arr.pop()
    }
}
//删除数组中的内容
function deleteFormArray(arr,compare){
    let index = arr.findIndex(compare)
    if(index > -1){
        arr.splice(index,1)
    }
}

export function saveSearch(query){
    let searches = storage.get(SEARCH_KEY,[])
    insetArray(searches,query,(item)=>{
        return item === query
    },maxLength)
    //存进去
    storage.set(SEARCH_KEY,searches)
    return searches
   
}

//从本地读取数据
 export function saveSearchlist(){
     return storage.get(SEARCH_KEY,[])
 }
//删除本地数据中的query
 export function deleteSearch(query){
    let searches = storage.get(SEARCH_KEY,[])
    deleteFormArray(searches,(item)=>{
        return item === query
    })
    storage.set(SEARCH_KEY,searches)
    return searches
 }

 //全部删除
 export function clearSearch(){
     storage.remove(SEARCH_KEY)
     return []
 }

 export function saveplayhistory(song){
     let songs = storage.get(PLAY_KEY,[])
     insetArray(songs,song,(item)=>{
         return item.id === song.id
     },maxPlayLength)
     storage.set(PLAY_KEY,songs)
     return songs
 }

 export function loadPlayHistory(){
     return storage.get(PLAY_KEY,[])
 }

 //收藏列表
 export function saveFavoritelist(song){
     let songs = storage.get(FAVORITE_KET,[])
     insetArray(songs,song,(item)=>{
        return item.id === song.id
     },maxFavoriteLength)
     storage.set(FAVORITE_KET,songs)
     return songs
 }

 export function deleteFavoritelist(song){
     let songs = storage.get(FAVORITE_KET,[])
     deleteFormArray(songs,(item)=>{
         return item.id === song.id
     })
     storage.set(FAVORITE_KET,songs)
     return songs
 }

 export function loadFavoriteList(){
     return storage.get(FAVORITE_KET,[])
 }
