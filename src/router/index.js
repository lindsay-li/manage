import Vue from 'vue'
import Router from 'vue-router'
import Indexs from '@/pages/index'
import login from '@/pages/login'
import cruxdata from '@/components/cruxdata'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Indexs',
      component: Indexs,
      children:[
        {
          path:'/',
          name:cruxdata,
          component:cruxdata
        }
      ]
    },
    {
      path:'/login',
      name:'login',
      component:login
    }
  ]
})
