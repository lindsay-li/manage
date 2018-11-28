import Vue from 'vue'
import Router from 'vue-router'
import Indexs from '@/pages/index'
import login from '@/pages/login'
import cruxdata from '@/components/cruxdata'
import recentdata from '@/components/recentdata'
import user from '@/components/users'
import Coupon from '@/components/coupon'
import wallet from '@/components/wallet'
import posts from '@/components/posts'
import car from '@/components/car'
import collect from '@/components/collect'
import wine from '@/components/wine'
import userWine from '@/components/userWine'
import createGoods from '@/components/createGoods'
import goodsQuery from '@/components/goodsQuery'
import orderQuery from '@/components/orderQuery'
import homeDelivery from '@/components/homeDelivery'
import homeDeliveryGoods from '@/components/homeDeliveryGoods'
import overtime from '@/components/overtime'
import overtimeGoods from '@/components/overtimeGoods'
import retailSalesUp from '@/components/retailSalesUp'
import retailSales from '@/components/retailSales'
import retailSalesOrder from '@/components/retailSalesOrder'
import barterHandle from '@/components/barterHandle'
import barterQuery from '@/components/barterQuery'
import returnHandle from '@/components/returnHandle'
import returnQuery from '@/components/returnQuery'
import newArticle from '@/components/newArticle'
import articleList from '@/components/articleList'

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
        },
        {
          path:'/wallet',
          component:wallet
        },
        {
          path:'/posts',
          component:posts
        },
        {
          path:'/car',
          component:car
        },
        {
          path:'/collect',
          component:collect
        },
        {
          path:'/wine',
          component:wine
        },
        {
          path:'/userwine',
          component:userWine
        },
        {
          path:'/createGoods',
          component:createGoods
        },
        {
          path:'/goodsQuery',
          component:goodsQuery
        },
        {
          path:'/orderQuery',
          component:orderQuery
        },
        {
          path:'/homeDelivery',
          component:homeDelivery
        },
        {
          path:'/homeDeliveryGoods',
          component:homeDeliveryGoods
        },
        {
          path:'/overtime',
          component:overtime
        },
        {
          path:'/overtimeGoods',
          component:overtimeGoods
        },
        {
          path:'/retailSalesUp',
          component:retailSalesUp
        },
        {
          path:'/retailSales',
          component:retailSales
        },
        {
          path:'/retailSalesOrder',
          component:retailSalesOrder
        },
        {
          path:"/barterHandle",
          component:barterHandle
        },
        {
          path:'/barterQuery',
          component:barterQuery
        },
        {
          path:'/returnQuery',
          component:returnQuery
        },
        {
          path:'/returnHandle',
          component:returnHandle
        },
        {
          path:'/newArticle',
          component:newArticle
        },
        {
          path:'/articleList',
          component:articleList
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
