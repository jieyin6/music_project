import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import recommend from '../components/recommend/recommend'
import singer from '../components/singer/singer'
import search from '../components/search/search'
import singerDetail from '../components/singer-detail/singer-detail'
import disc from '../components/disc/disc'
import topList from '../components/top-list/top-list'
import rank from '../components/rank/rank'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: recommend
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend,
      children:[
        {
        path:":id",
        component:disc
        }
      ]
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer,
      children:[
        {
          path:':id',
          component:singerDetail
        }
      ]
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank,
      children:[
        {
          path:':id',
          component:topList
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: search
    }
  ]
})
