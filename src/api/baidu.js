import jsonp from 'common/js/jsonp'
import {commonParams,options} from './baiduconfig'
export function getRecommend(value){
    const url = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su'
    commonParams.wd = encodeURIComponent(value)
    const data = Object.assign({},commonParams)
    return jsonp(url,data,options)
}