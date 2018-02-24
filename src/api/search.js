import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getHotMusic(){
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
    const data = Object.assign({},commonParams,{
        g_tk:5381,
        uin:0,
        platform:'h5',
        needNewCode:1,
     })
     return jsonp(url,data,options)
}

//搜索接口
export function search(query,page,zhida,prepage){
    const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
    const data = Object.assign({},commonParams,{
        w:query,
        zhidaqu:1,
        catZhida:zhida? 1 : 0,
        perpage:prepage,
        n:prepage,
        p:page,
        t:0,
        flag:1,
        ie:'utf-8',
        sem:1,
        aggr:0,
        g_tk:5381,
        uin:0,
        platform:'h5',  
        needNewCode:1,
       remoteplace:'txt.mqq.all'
    })
    return jsonp(url,data,options)
}