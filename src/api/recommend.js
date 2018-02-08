import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
// Object.assign方法用于对象的合并
// 将源对象（source）的所有可枚举属性，复制到目标对象（target）。
  const data = Object.assign({}, commonParams, {
    platform:'h5',
    uin: 0,
    needNewCode: 1,
    _:1518103207572
  })
  return jsonp(url, data,options)
}