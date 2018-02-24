import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getTopList(){
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

    const data = Object.assign({},commonParams,{
        g_tk:734873323,
        platform:'h5',
        needNewCode:1,
    })
    return jsonp(url, data,options)
}

//获取排行榜榜单内数据
export function getMusicList(id){
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

    const data = Object.assign({},commonParams,{
        g_tk:5381,
        uin:0,
        platform:'h5',
        needNewCode:1,
        tpl:3,
        page:'detail',
        type:'top',
        topid:id,
    })
    return jsonp(url,data,options)
}