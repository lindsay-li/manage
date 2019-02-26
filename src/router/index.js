import Vue from 'vue'
import Router from 'vue-router'
const Indexs = () => import('@/pages/indexs');
const login = () => import('@/pages/login');
const cruxdata = () => import('@/components/cruxdata');
const recentdata = () => import('@/components/recentdata');
const user = () => import('@/components/users');
const Coupon = () => import('@/components/Coupon');
// const wallet = () => import('@/components/wallet');
// const posts = () => import('@/components/posts');
const car = () => import('@/components/car');
const collect = () => import('@/components/collect');
// const wine = () => import('@/components/wine');
// const userWine = () => import('@/components/userWine');
const createGoods = () => import('@/components/createGoods');
const goodsQuery = () => import('@/components/goodsQuery');
const productType = () => import('@/views/productType');
// const stockManage = () => import('@/components/stockManage');
const orderQuery = () => import('@/components/orderQuery');
// const ordersCancel = () => import('@/components/ordersCancel');
// const homeDelivery = () => import('@/components/homeDelivery');
// const homeDeliveryGoods = () => import('@/components/homeDeliveryGoods');
// const overtime = () => import('@/components/overtime');
// const overtimeGoods = () => import('@/components/overtimeGoods');
// const retailSalesUp = () => import('@/components/retailSalesUp');
// const retailSales = () => import('@/components/retailSales');
// const retailSalesOrder = () => import('@/components/retailSalesOrder');
// const barterHandle = () => import('@/components/barterHandle');
// const barterQuery = () => import('@/components/barterQuery');
// const returnHandle = () => import('@/components/returnHandle');
// const returnQuery = () => import('@/components/returnQuery');
// const newArticle = () => import('@/components/newArticle');
const articleList = () => import('@/components/articleList');
const editNotice = () => import('@/components/editNotice');
// const auditingNotice = () => import('@/components/auditingNotice');
const advertisementEdit = () => import('@/components/advertisementEdit');
// const advertisementAuditing = () => import('@/components/advertisementAuditing');
// const userHandle = () => import('@/components/userHandle');
// const userArticleHandle = () => import('@/components/userArticleHandle');
// const goodsActivity = () => import('@/components/goodsActivity');//商品活動
// const memberLevel = () => import('@/components/memberLevel'); //會員分級
// const buygoods = () => import('@/components/buygoods');
// const freeMail = () => import('@/components/freeMail');
// const couponActivity = () => import('@/components/couponActivity');
// const specials = () => import('@/components/specials');
// const birthdaygift = () => import('@/components/birthdaygift');
// const continuousActivity = () => import('@/components/continuousActivity');
// const signInActive = () => import('@/components/signInActive');
// const achievement = () => import('@/components/achievement');
const accountManage = () => import('@/components/accountManage');
const accountPower = () => import('@/components/accountPower');
// const accountHandRecord = () => import('@/components/accountHandRecord');
const comprehensiveData = () => import('@/components/comprehensiveData');
const memberData = () => import('@/components/memberData');
const retainData = () => import('@/components/retainData');
const communityData = () => import('@/components/communityData');
const goodsData = () => import('@/components/goodsData');
const articleData = () => import('@/components/articleData');
const waiterLetter = () => import('@/components/waiterLetter');
// const repairFunc = () => import('@/components/repairFunc');
// const userImpeach = () => import('@/components/userImpeach');
const financeCheck = () => import('@/components/financeCheck');
// const shipmentCheck = () => import('@/components/shipmentCheck');
const invoice = () => import('@/components/invoice');
const menumanage = () => import('@/views/menuManage');
const branchInventory = () => import('@/views/branchInventory');
const productArea = () => import('@/views/productArea');
const country = () => import('@/views/country');
const grape = () => import('@/views/grape');
const winery = () => import('@/views/winery');
const shopName = () => import('@/views/shopName');
const goodsRecord = () => import('@/views/goodsRecord');
const home = ()=> import('@/home');
const wineryType = () => import('@/views/wineryType');
const areaSun = () => import('@/views/areaSun');
const brand = () => import('@/views/brand');
const areaPic = () => import('@/views/areaPic');

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/index',
      component: Indexs,
      children:[
        {
          path:'/',
          redirect:'/home'
        },
        {
          path:'/home',
          component:home,
          meta:{
            title:'首頁'
          }
        },
        {
          path:'/cruxdata',
          component:cruxdata,
          meta:{
            title:'即时数据'
          }
        },
        {
          path:'/recentdata',
          component:recentdata,
          meta:{
            title:'近期数据'
          }
        },
        {
          path:'/user',
          component:user,
          meta:{
            title:'用戶信息'
          }
        },
        {
          path:'/coupon',
          component:Coupon,
          meta:{
            title:'折扣券'
          }
        },
        {
          path:'/car',
          component:car,
          meta:{
            title:'用戶購物車'
          }
        },
        {
          path:'/collect',
          component:collect,
          meta:{
            title:'用戶收藏'
          }
        },
        {
          path:'/createGoods',
          component:createGoods,
          meta:{
            title:'商品風格'
          }
        },
        {
          path:'/productType',
          component:productType,
          meta:{
            title:'商品类型'
          }
        },
        {
          path:'/goodsQuery',
          component:goodsQuery,
          meta:{
            title:'商品查詢'
          }
        },
        {
          path:'/orderQuery',
          component:orderQuery,
          meta:{
            title:'订单查询'
          }
        },
        {
          path:'/articleList',
          component:articleList,
          meta:{
            title:'文章列表'
          }
        },
        {
          path:'/editNotice',
          component:editNotice,
          meta:{
            title:'公告通知'
          }
        },
        {
          path:'/advertisementEdit',
          component:advertisementEdit,
          meta:{
            title:'广告管理'
          }
        },
        {
          path:'/accountManage',
          component:accountManage,
          meta:{
            title:'用戶管理'
          }
        },
        {
          path:'/accountPower',
          component:accountPower,
          meta:{
            title:'角色權限管理'
          }
        },
        {
          path:'/comprehensiveData',
          component:comprehensiveData,
          meta:{
            title:'綜合報表'
          }
        },
        {
          path:'/memberData',
          component:memberData,
          meta:{
            title:'會員數據'
          }
        },
        {
          path:'/retainData',
          component:retainData,
          meta:{
            title:'葡萄數據'
          }
        },
        {
          path:'/communityData',
          component:communityData,
          meta:{
            title:'社群數據'
          }
        },
        {
          path:'/goodsData',
          component:goodsData,
          meta:{
            title:'商品數據'
          }
        },
        {
          path:'/articleData',
          component:articleData,
          meta:{
            title:'文章數據'
          }
        },
        {
          path:'/waiterLetter',
          component:waiterLetter,
          meta:{
            title:'客服信件'
          }
        },
        {
          path:'/menuManage',
          component:menumanage,
          meta:{
            title:'菜單管理'
          }
        },
        {
          path:'/branchInventory',
          component:branchInventory,
          meta:{
            title:'分店庫存'
          }
        },
        {
          path:'/productArea',
          component:productArea,
          meta:{
            title:'產區風格'
          }
        },
        {
          path:'/country',
          component:country,
          meta:{
            title:'國家管理'
          }
        },
        {
          path:'/grape',
          component:grape,
          meta:{
            title:'葡萄種類'
          }
        },
        {
          path:'/winery',
          component:winery,
          meta:{
            title:'酒莊管理'
          }
        },
        {
          path:'/shopName',
          component:shopName,
          meta:{
            title:'門店管理'
          }
        },
        {
          path:'/goodsRecord',
          component:goodsRecord,
          meta:{
            title:'商品瀏覽記錄'
          }
        },
        {
          path:'/financeCheck',
          component:financeCheck,
          meta:{
            title:'财务核对'
          }
        },
        {
          path:'/invoice',
          component:invoice,
          meta:{
            title:'发票另寄'
          }
        },
        {
          path:"/wineryType",
          component:wineryType,
          meta:{
            title:'酒类管理'
          }
        },
        {
          path:'/areaSun',
          component:areaSun,
          meta:{
            title:'子产区管理'
          }
        },
        {
          path:'/brand',
          component:brand,
          meta:{
            title:'品牌管理'
          }
        },
        {
          path:'/areaPic',
          component:areaPic,
          meta:{
            title:'产品图片管理'
          }
        }
      ]
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/',
      redirect:'/index'
    }
  ]
})
