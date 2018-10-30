import Vue from 'vue'
import Router from 'vue-router'
import Indexs from '@/pages/index'
import login from '@/pages/login'
import cruxdata from '@/components/cruxdata'
import recentdata from '@/components/recentdata'
import user from '@/components/users'
import Coupon from '@/components/coupon'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Indexs,
      children:[
        {
          path:'/',
          component:cruxdata
        },
        {
          path:'/cruxdata',
          component:cruxdata
        },
        {
          path:'/recentdata',
          component:recentdata
        },
        {
          path:'/user',
          component:user
        },
        {
          path:'/coupon',
          component:Coupon
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
