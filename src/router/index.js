import Vue from 'vue'
import Router from 'vue-router'
const Indexs = () => import('@/pages/index');
const login = () => import('@/pages/login');
const cruxdata = () => import('@/components/cruxdata');
const recentdata = () => import('@/components/recentdata');
const user = () => import('@/components/users');
const Coupon = () => import('@/components/Coupon');
const wallet = () => import('@/components/wallet');
const posts = () => import('@/components/posts');
const car = () => import('@/components/car');
const collect = () => import('@/components/collect');
const wine = () => import('@/components/wine');
const userWine = () => import('@/components/userWine');
const createGoods = () => import('@/components/createGoods');
const goodsQuery = () => import('@/components/goodsQuery');
const orderQuery = () => import('@/components/orderQuery');
const homeDelivery = () => import('@/components/homeDelivery');
const homeDeliveryGoods = () => import('@/components/homeDeliveryGoods');
const overtime = () => import('@/components/overtime');
const overtimeGoods = () => import('@/components/overtimeGoods');
const retailSalesUp = () => import('@/components/retailSalesUp');
const retailSales = () => import('@/components/retailSales');
const retailSalesOrder = () => import('@/components/retailSalesOrder');
const barterHandle = () => import('@/components/barterHandle');
const barterQuery = () => import('@/components/barterQuery');
const returnHandle = () => import('@/components/returnHandle');
const returnQuery = () => import('@/components/returnQuery');
const newArticle = () => import('@/components/newArticle');
const articleList = () => import('@/components/articleList');
const editNotice = () => import('@/components/editNotice');
const auditingNotice = () => import('@/components/auditingNotice');
const advertisementEdit = () => import('@/components/advertisementEdit');
const advertisementAuditing = () => import('@/components/advertisementAuditing');
const userHandle = () => import('@/components/userHandle');
const userArticleHandle = () => import('@/components/userArticleHandle');
const goodsActivity = () => import('@/components/goodsActivity');//商品活动
const memberLevel = () => import('@/components/memberLevel'); //会员分级
const buygoods = () => import('@/components/buygoods');
const freeMail = () => import('@/components/freeMail');
const couponActivity = () => import('@/components/couponActivity');

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
        },
        {
          path:'/editNotice',
          component:editNotice
        },
        {
          path:'/auditingNotice',
          component:auditingNotice
        },
        {
          path:'/advertisementAuditing',
          component:advertisementAuditing
        },
        {
          path:'/advertisementEdit',
          component:advertisementEdit
        },
        {
          path:'/userHandle',
          component:userHandle
        },
        {
          path:'/userArticleHandle',
          component:userArticleHandle
        },
        {
          path:'/goodsActivity',
          component:goodsActivity
        },
        {
          path:'/memberLevel',
          component:memberLevel
        },
        {
          path:'/buygoods',
          component:buygoods
        },
        {
          path:'/freeMail',
          component:freeMail
        },
        {
          path:'/couponActivity',
          component:couponActivity
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
