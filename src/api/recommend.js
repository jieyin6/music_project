import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
// Object.assign方法用于对象的合并
// 将源对象（source）的所有可枚举属性，复制到目标对象（target）。
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    platform:'h5',
    uin: 0,
    needNewCode: 1,
    _:1518103207572
  })
  return jsonp(url, data,options)
}

//获取歌单数据
export function getDiscList() {
  const url = '/api/getDiscList'
  const data = Object.assign({},commonParams,{
    /*platform:'yqq',
    needNewCode:0,
    callback:'recom3559201900056719',
    g_tk:734873323,
    jsonpCallback:'recom3559201900056719',
    loginUin:961145934,
    hostUin:0,*/
   // data:{"comm":{"ct":24},"category":{"method":"get_hot_category","param":{"qq":""},"module":"music.web_category_svr"},"recomPlaylist":{"method":"get_hot_recommend","param":{"async":1,"cmd":2},"module":"playlist.HotRecommendServer"},"playlist":{"method":"get_playlist_by_category","param":{"id":8,"curPage":1,"size":40,"order":5,"titleid":8},"module":"playlist.PlayListPlazaServer"},"new_song":{"module":"QQMusic.MusichallServer","method":"GetNewSong","param":{"type":0}},"new_album":{"module":"QQMusic.MusichallServer","method":"GetNewAlbum","param":{"type":0,"category":"-1","genre":0,"year":1,"company":-1,"sort":1,"start":0,"end":39}},"toplist":{"module":"music.web_toplist_svr","method":"get_toplist_index","param":{}},"focus":{"module":"QQMusic.MusichallServer","method":"GetFocus","param":{}}},
    format:'json',
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
   })
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}