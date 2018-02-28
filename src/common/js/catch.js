import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const maxLength = 15

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