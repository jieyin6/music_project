import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import recommend from '../components/recommend/recommend'
import singer from '../components/singer/singer'
import charts from '../components/charts/charts'
import search from '../components/search/search'
import singerDetail from '../components/singer-detail/singer-detail'
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
      component: recommend
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
      path: '/charts',
      name: 'charts',
      component: charts
    },
    {
      path: '/search',
      name: 'search',
      component: search
    }
  ]
})
