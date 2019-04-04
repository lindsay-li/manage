<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100vh;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.rotate-icon{
        transform: rotate(-90deg);
    }
.logo{
    font-size: 24px;
    color: #fff;
    font-weight: bold;
}
.headers{
    display: flex;
    justify-content: space-between;
    background-color: #143F6D;
}
.rights{
    display: flex;
    min-width: 100px;
    justify-content: space-between;
}
.users{
    /* margin-left: 20px;
    display: flex;
    height: 100%;
    align-items: center; */
    cursor: pointer;
}
.u_icon{
    position: relative;
    top: 3px;
    margin-left: 2px;
}
.menu-nav{
    /* margin-left: 25px; */
    margin: 8px 0 7px 25px;
}
</style>
<template>
    <div class="layout">
        <Layout style="height:100%">
            <Header class="headers">
                <div>
                    <span class='logo'>巴克斯後臺管理</span> <Icon @click.native="collapsedSider" color="#2D8CF0" :class="rotateIcon" :style="{margin: '0 20px',cursor:'pointer'}" type="md-menu" size="24"></Icon>
                </div> 
                <div class="rights">
                    <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>
                    <div class="users">
                        
                        <Dropdown trigger="click" style="margin-left: 20px;width:120px" :transfer="true" @on-click="outlogin">
                            <Avatar style="background-color: #87d068" icon="ios-person" />
                            <span style="color:#fff">{{userInfo.username}}</span>
                            <Icon type="md-arrow-dropdown" size="24" color="#eee" class="u_icon"/>
                            <DropdownMenu slot="list" >
                                <DropdownItem name="重新登錄">重新登錄</DropdownItem>
                                <DropdownItem name="安全退出">安全退出</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </Header>
            <Layout>
                <Sider hide-trigger collapsible :width="236" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden',background:'#283440'}">
                    <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" @on-opens="fathers" :menu-list="menuList">
                        <!-- 需要放在菜單上面的內容，如Logo，寫在side-menu標籤內部，如下 -->
                        <div class="menu-nav">
                            <Icon type="ios-grid" color="#ffffff"/>
                            <span style="color:#fff;margin-left:3px" v-show="!navs">導航功能</span>
                        </div>
                    </side-menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem to="/">首頁</BreadcrumbItem>
                        <BreadcrumbItem v-if="fathers">{{father}}</BreadcrumbItem>
                        <BreadcrumbItem :to="childname" v-if="child">{{child}}</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <router-view/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import SideMenu from './components/side-menu'
import Fullscreen from './components/fullscreen'
    export default {
        name: 'Main',
        components: {
            SideMenu,
            Fullscreen,
        },
        data(){
            return{
                collapsed:false,
                isFullscreen: false,
                menuList:[],
                father:'',
                child:'',
                childname:'',
                navs:false,
                userInfo:{}
            }
        },
        watch:{
            father(val){
                this.child = '';
                this.childname = '';
            },
            $route(){
                console.log(this.$route)
                this.child = this.$route.meta.title;
                if(this.child == '首頁'){
                    this.father='';
                    this.child = '';
                    this.childname='';
                }
            }
        },
        created () {
            // var data = '[{"icon":"ios-book","name":"doc","meta":{"title":"文檔","href":"https://lison16.github.io/iview-admin-doc/#/","icon":"ios-book"},"href":"https://lison16.github.io/iview-admin-doc/#/"},{"icon":"","name":"join","meta":{"hideInBread":true},"children":[{"icon":"_qq","name":"join_page","meta":{"icon":"_qq","title":"QQ群"}}]},{"icon":"logo-buffer","name":"components","meta":{"icon":"logo-buffer","title":"組件"},"children":[{"icon":"md-arrow-dropdown-circle","name":"tree_select_page","meta":{"icon":"md-arrow-dropdown-circle","title":"樹狀下拉選擇器"}},{"icon":"md-trending-up","name":"count_to_page","meta":{"icon":"md-trending-up","title":"數字漸變"}},{"icon":"ios-infinite","name":"drag_list_page","meta":{"icon":"ios-infinite","title":"拖拽列表"}},{"icon":"md-list","name":"drag_drawer_page","meta":{"icon":"md-list","title":"可拖拽抽屜"}},{"icon":"ios-people","name":"org_tree_page","meta":{"icon":"ios-people","title":"組織結構樹"}},{"icon":"md-git-branch","name":"tree_table_page","meta":{"icon":"md-git-branch","title":"樹狀表格"}},{"icon":"md-crop","name":"cropper_page","meta":{"icon":"md-crop","title":"圖片裁剪"}},{"icon":"md-grid","name":"tables_page","meta":{"icon":"md-grid","title":"多功能表格"}},{"icon":"md-pause","name":"split_pane_page","meta":{"icon":"md-pause","title":"分割窗口"}},{"icon":"logo-markdown","name":"markdown_page","meta":{"icon":"logo-markdown","title":"Markdown編輯器"}},{"icon":"ios-create","name":"editor_page","meta":{"icon":"ios-create","title":"富文本編輯器"}},{"icon":"_bear","name":"icons_page","meta":{"icon":"_bear","title":"自定義圖標"}}]},{"icon":"md-cloud-upload","name":"update","meta":{"icon":"md-cloud-upload","title":"數據上傳"},"children":[{"icon":"ios-document","name":"update_table_page","meta":{"icon":"ios-document","title":"上傳Csv"}},{"icon":"md-clipboard","name":"update_paste_page","meta":{"icon":"md-clipboard","title":"粘貼表格數據"}}]},{"icon":"ios-stats","name":"excel","meta":{"icon":"ios-stats","title":"EXCEL導入導出"},"children":[{"icon":"md-add","name":"upload-excel","meta":{"icon":"md-add","title":"導入EXCEL"}},{"icon":"md-download","name":"export-excel","meta":{"icon":"md-download","title":"導出EXCEL"}}]},{"icon":"","name":"tools_methods","meta":{"hideInBread":true},"children":[{"icon":"ios-hammer","name":"tools_methods_page","meta":{"icon":"ios-hammer","title":"工具方法","beforeCloseName":"before_close_normal"}}]},{"icon":"","name":"i18n","meta":{"hideInBread":true},"children":[{"icon":"md-planet","name":"i18n_page","meta":{"icon":"md-planet","title":"i18n - {{ i18n_page }}"}}]},{"icon":"","name":"error_store","meta":{"hideInBread":true},"children":[{"icon":"ios-bug","name":"error_store_page","meta":{"icon":"ios-bug","title":"錯誤收集"}}]},{"icon":"","name":"directive","meta":{"hideInBread":true},"children":[{"icon":"ios-navigate","name":"directive_page","meta":{"icon":"ios-navigate","title":"指令"}}]},{"icon":"md-menu","name":"multilevel","meta":{"icon":"md-menu","title":"多級菜單"},"children":[{"icon":"md-funnel","name":"level_2_1","meta":{"icon":"md-funnel","title":"二級-1"}},{"icon":"md-funnel","name":"level_2_2","meta":{"access":["super_admin"],"icon":"md-funnel","showAlways":true,"title":"二級-2"},"children":[{"icon":"md-funnel","name":"level_2_2_1","meta":{"icon":"md-funnel","title":"三級"}},{"icon":"md-funnel","name":"level_2_2_2","meta":{"icon":"md-funnel","title":"三級"}}]},{"icon":"md-funnel","name":"level_2_3","meta":{"icon":"md-funnel","title":"二級-3"}}]}]'  
            var data = [
                    {
                        icon:'ios-paper',
                        name:'關鍵數據',
                        meta:{icon:'ios-paper',title:'關鍵數據'},
                        children:[
                            {icon:'',name:'cruxdata',meta:{icon:'',title:'即時數據'}},
                            {icon:'',name:'recentdata',meta:{icon:'',title:'近期數據'}}
                        ] 
                    },
                    {
                        icon:'ios-people',
                        name:'用戶管理',
                        meta:{icon:'ios-people',title:'用戶管理'},
                        children:[
                            {icon:'',name:'user',meta:{icon:'',title:'用戶信息'}},
                            {icon:'',name:'membershipLevel',meta:{icon:'',title:'會員等級'}},
                            {icon:'',name:'identity',meta:{icon:'',title:'身份驗證'}},
                            {icon:'',name:'coupon',meta:{icon:'',title:'折扣券'}},
                            {icon:'',name:'car',meta:{icon:'',title:'用戶購物車'}},
                            {icon:'',name:'collect',meta:{icon:'',title:'用戶收藏'}},
                            {icon:'',name:'userList',meta:{icon:'',title:'用戶清單'}},
                            {icon:'',name:'goodsRecord',meta:{icon:'',title:'商品瀏覽記錄'}},
                            {icon:'',name:'followList',meta:{icon:'',title:'關注記錄'}},
                            {icon:'',name:'dividendGrape',meta:{icon:'',title:'紅利葡萄'}}
                        ]
                    },
                    {
                        icon:'ios-stats',
                        name:'商品管理',
                        meta:{icon:'ios-stats',title:'商品管理'},
                        children:[
                            {icon:'',name:'goodsQuery',meta:{icon:'',title:'商品查詢'}},
                            {icon:'',name:'createGoods',meta:{icon:'',title:'商品風格'}},
                            // {icon:'',name:'productType',meta:{icon:'',title:'商品類型'}},
                            {icon:'',name:'branchInventory',meta:{icon:'',title:'分店庫存'}},
                            {icon:'',name:'productArea',meta:{icon:'',title:'產區管理'}},
                            {icon:'',name:'areaSun',meta:{icon:'',title:'次產區管理'}},
                            {icon:'',name:'country',meta:{icon:'',title:'國家管理'}},
                            {icon:'',name:'grape',meta:{icon:'',title:'葡萄種類'}},
                            {icon:'',name:'winery',meta:{icon:'',title:'酒莊管理'}},
                            {icon:'',name:'wineryType',meta:{icon:'',title:'酒類管理'}},
                            {icon:'',name:'shopName',meta:{icon:'',title:'門店管理'}},
                            {icon:'',name:'brand',meta:{icon:'',title:'品牌管理'}},
                            {icon:'',name:'areaPic',meta:{icon:'',title:'產品圖片管理'}},
                            {icon:'',name:'grapeRelation',meta:{icon:'',title:'葡萄跟酒關聯'}},

                        ]
                    },
                    {
                        icon:'ios-list',
                        name:'訂單管理',
                        meta:{icon:'ios-list',title:'訂單管理'},
                        children:[
                            {icon:'',name:'orderDistribution',meta:{icon:'',title:'訂單分配'}},
                            {icon:'',name:'orderQuery',meta:{icon:'',title:'訂單查詢'}},
                            {icon:'',name:'orderCancel',meta:{icon:'',title:'訂單取消'}}
                        ]
                    },
                    {
                        icon:'md-bicycle',
                        name:'宅配出貨',
                        meta:{icon:'md-bicycle',title:'宅配出貨'},
                        children:[
                            {icon:'',name:'homeDelivery',meta:{icon:'',title:'宅配訂單確定'}},
                            {icon:'',name:'homeDeliveryGoods',meta:{icon:'',title:'宅配訂單出貨'}},
                        ]
                    },
                    {
                        icon:'ios-alarm',
                        name:'超取出貨',
                        meta:{icon:'ios-alarm',title:'超取出貨'},
                        children:[
                            {icon:'',name:'overtime',meta:{icon:'',title:'超取訂單確定'}},
                            {icon:'',name:'overtimeGoods',meta:{icon:'',title:'超取訂單出貨'}},
                        ]
                    },
                    {
                        icon:'md-cog',
                        name:'門市操作',
                        meta:{icon:'md-cog',title:'門市操作'},
                        children:[
                            {icon:'',name:'retailSalesOrder',meta:{icon:'',title:'門市訂單確定'}},
                            {icon:'',name:'retailSalesUp',meta:{icon:'',title:'門市取貨'}},
                        ]
                    },
                    {
                        icon:'logo-pinterest',
                        name:'換貨處理_預設',
                        meta:{icon:'logo-pinterest',title:'換貨處理_預設'},
                        children:[
                            {icon:'',name:'barterHandle',meta:{icon:'',title:'換貨處理'}},
                            {icon:'',name:'barterQuery',meta:{icon:'',title:'換貨查詢'}},
                        ]
                    },
                    {
                        icon:'md-return-right',
                        name:'退貨操作',
                        meta:{icon:'md-return-right',title:'退貨操作'},
                        children:[
                            
                            {icon:'',name:'returnHandle',meta:{icon:'',title:'退貨處理'}},
                            {icon:'',name:'returnQuery',meta:{icon:'',title:'退貨查詢'}},
                        ]
                    },
                    {
                        icon:'logo-buffer',
                        name:'文章日誌',
                        meta:{icon:'logo-buffer',title:'文章日誌'},
                        children:[
                            {icon:'',name:'articleList',meta:{icon:'',title:'文章列表'}},
                            {icon:'',name:'newArticle',meta:{icon:'',title:'新增文章'}}
                        ]
                    },
                    {
                        icon:'md-megaphone',
                        name:'公告&廣告管理',
                        meta:{icon:'md-megaphone',title:'公告&廣告管理'},
                        children:[
                            {icon:'',name:'editNotice',meta:{icon:'',title:'公告通知'}},
                            {icon:'',name:'noticeAuding',meta:{icon:'',title:'公告審核'}},
                            {icon:'',name:'advertisementEdit',meta:{icon:'',title:'廣告管理'}},
                            {icon:'',name:'advertisementAuditing',meta:{icon:'',title:'廣告審核'}}
                        ]
                    },
                    {
                        icon:'md-globe',
                        name:'运营管理',
                        meta:{icon:'md-globe',title:'运营管理'},
                        children:[
                            {icon:'',name:'userhandle',meta:{icon:'',title:'用戶賬號操作'}},
                            {icon:'',name:'buygoods',meta:{icon:'',title:'加買商品'}},
                            {icon:'',name:'freeMail',meta:{icon:'',title:'免運活動'}},
                            {icon:'',name:'couponActivity',meta:{icon:'',title:'折扣券活动'}},
                            {icon:'',name:'specials',meta:{icon:'',title:'特價商品區'}},
                            {icon:'',name:'birthdaygift',meta:{icon:'',title:'生日禮'}},
                            {icon:'',name:'manyDays',meta:{icon:'',title:'多日活動'}},
                            {icon:'',name:'indexSeting',meta:{icon:'',title:'首頁設定'}},
                        ]
                    },
                    {
                        icon:'ios-key',
                        name:'後臺賬號管理',
                        meta:{icon:'ios-key',title:'後臺賬號管理'},
                        children:[
                            {icon:'',name:'accountManage',meta:{icon:'',title:'用戶管理'}},
                            {icon:'',name:'accountPower',meta:{icon:'',title:'角色權限管理'}},
                            {icon:'',name:'menuManage',meta:{icon:'',title:'菜單管理'}}
                        ]
                    },
                    {
                        icon:'md-analytics',
                        name:'數據分析',
                        meta:{icon:'md-analytics',title:'數據分析'},
                        children:[
                            {icon:'',name:'comprehensiveData',meta:{icon:'',title:'綜合報表'}},
                            {icon:'',name:'memberData',meta:{icon:'',title:'會員數據'}},
                            {icon:'',name:'retainData',meta:{icon:'',title:'葡萄數據'}},
                            {icon:'',name:'keepData',meta:{icon:'',title:'留存數據'}},
                            {icon:'',name:'communityData',meta:{icon:'',title:'社群數據'}},
                            {icon:'',name:'goodsData',meta:{icon:'',title:'商品數據'}},
                            {icon:'',name:'articleData',meta:{icon:'',title:'文章數據'}},
                        ]
                    },
                    {
                        icon:'ios-call',
                        name:'客服相關',
                        meta:{icon:'ios-call',title:'客服相關'},
                        children:[
                            {icon:'',name:'waiterLetter',meta:{icon:'',title:'客服信件'}},
                            {icon:'',name:'repairFunc',meta:{icon:'',title:'補發功能'}}
                        ]
                    },
                    {
                        icon:'logo-bitcoin',
                        name:'賬務管理',
                        meta:{icon:'logo-bitcoin',title:'賬務管理'},
                        children:[
                            {icon:'',name:'financeCheck',meta:{icon:'',title:'賬務核對'}},
                            {icon:'',name:'shipmentCheck',meta:{icon:'',title:'出貨資料核對'}},
                            {icon:'',name:'invoice',meta:{icon:'',title:'發票另寄'}},
                        ]
                    }
                ]
            // this.menuList =data;
            // console.log(this.menuList)
            var user = JSON.parse(sessionStorage.getItem('user_info'));
            this.userInfo = user.dbUser;
            this.getMenuList(user.mList)
        },
        computed: {
          rotateIcon () {
                return [
                    'menu-icon',
                    this.collapsed ? 'rotate-icon' : ''
                ];
            },  
        },
        methods:{
            getMenuList(data){ //获取菜单列表
                var arr = [];
                for(let i =0;i<data.length;i++){
                    if(!data[i].pid){
                        var obj={};
                        obj.name = data[i].m_name
                        obj.icon = data[i].m_code
                        obj.order = data[i].m_order
                        obj.id = data[i].id
                        obj.meta={icon:data[i].m_code,title:data[i].m_name}
                        obj.children=[]
                        arr.push(obj)
                    }
                    
                }

                for(let j =0;j<arr.length;j++){
                    for(let k =0;k<data.length;k++){
                        if(data[k].pid && data[k].pid==arr[j].id){
                            var obj1 = {};
                            obj1.name = data[k].m_url
                            obj1.icon = ''
                            obj1.order = data[k].m_order
                            obj1.meta={icon:'',title:data[k].m_name}
                            arr[j].children.push(obj1)
                        }
                    }
                }
                arr.sort(function(a,b){
                    return a.order-b.order
                })
                for(let o=0;o<arr.length;o++){
                    arr[o].children.sort(function(a,b){
                        return a.order - b.order
                    })
                }
            this.menuList = arr;
            console.log('list',arr)
            },
            turnToPage (route) {
                let name = '';
                if (typeof route === 'string') name = route
                this.childname = name;
                this.$router.push({path:name})
            },
            fathers(data){
                this.father = data[0];
            },
            collapsedSider(){
                this.collapsed = !this.collapsed;
                // this.navs = !this.navs;
                if(!this.collapsed){
                    var timer =setTimeout(() => {
                        this.navs =false;
                        clearTimeout(timer);
                    }, 200);
                }else{
                    this.navs = true;
                }
                
            },
            outlogin(name){
                console.log('...',name)
                // return
                sessionStorage.clear()
                this.$router.push({path:'/login'});
            },
        }
    }
</script>
<style lang="less" scoped>
.left-sider{
    .ivu-layout-sider-children{
      overflow-y: scroll;
      margin-right: -18px;
    }
  }
</style>
