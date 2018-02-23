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
//获取歌手数据
export function  getSingerDetail(singerId){
  const url =  'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({},commonParams,{
    singerid:singerId,
    g_tk:734873323,
    format:'json',
    notice:0,
    platform:'h5page',
    needNewCode:1,
    order:'listen',
    from:'h5',
    num:100,
    begin:0,
  })
  return jsonp(url, data,options)
}

//获取歌单内歌曲数据
export function getSongList(disstid) {
  const url = '/api/getCdInfo' 

  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}