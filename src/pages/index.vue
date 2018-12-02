<template>
    <div class="wrapper">
        <div class="navs">
            <div class="user">
                <span>測試一會</span>
                <span>歡迎你！</span>
            </div>
            <div class="operation">
                <Dropdown trigger="click" style="margin-left: 20px" :transfer="true">
                    <a href="javascript:void(0)">
                        菜單管理
                        <Icon type="ios-arrow-down" color="#17233d"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem>修改密碼</DropdownItem>
                        <DropdownItem>更換主題</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown trigger="click" style="margin-left: 20px" :transfer="true">
                    <a href="javascript:void(0)">
                        退出系統
                        <Icon type="ios-arrow-down" color="#17233d"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem>重新登錄</DropdownItem>
                        <DropdownItem>安全退出</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            
        </div>
        <div class="contant">
            <div class="menu">
                <Menu :theme="theme2" :open-names="['1']" accordion active-name='1-1'>
                    <div class="menu-nav">
                        <Icon type="ios-grid" color="#ffffff"/>
                        <span >導航功能</span>
                    </div>
                    
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-paper" />
                            關鍵數據
                        </template>
                        <MenuItem name="1-1" to='/cruxdata'> 即時數據</MenuItem>
                        <MenuItem name="1-2" to="/recentdata">近期數據</MenuItem>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-people" />
                            用戶管理
                        </template>
                        <MenuItem name="2-1" to="/user">用戶信息</MenuItem>
                        <MenuItem name="2-2" to="/coupon">折扣券</MenuItem>
                        <MenuItem name="2-3" to="/wallet">錢包明細</MenuItem>
                        <MenuItem name="2-4" to="/posts">評酒貼文列表</MenuItem>
                        <MenuItem name="2-5" to="/car">用戶購物車</MenuItem>
                        <MenuItem name="2-6" to='/collect'>用戶收藏</MenuItem>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="md-beer" />
                            酒窖
                        </template>
                        <MenuItem name="3-1" to="/wine">酒類管理</MenuItem>
                        <MenuItem name="3-2" to="/userwine">用戶酒窖</MenuItem>
                    </Submenu>
                    <Submenu name="4">
                        <template slot="title">
                            <Icon type="ios-stats" />
                            商品管理
                        </template>
                        <MenuItem name="4-1" to="/createGoods">建立商品</MenuItem>
                        <MenuItem name="4-2" to="/goodsQuery">商品查詢</MenuItem>
                        <MenuItem name="4-3">庫存管理</MenuItem>
                    </Submenu>
                    <Submenu name="5">
                        <template slot="title">
                            <Icon type="ios-list" />
                            訂單查詢
                        </template>
                        <MenuItem name="5-1" to="/orderQuery">訂單查詢</MenuItem>
                        <MenuItem name="5-2">取消訂單</MenuItem>
                    </Submenu>
                    <Submenu name="6">
                        <template slot="title">
                            <Icon type="md-bicycle" />
                            宅配出貨
                        </template>
                        <MenuItem name="6-1" to="/homeDelivery">宅配訂單確定</MenuItem>
                        <MenuItem name="6-2" to="/homeDeliveryGoods">宅配出貨</MenuItem>
                    </Submenu>
                    <Submenu name="7">
                        <template slot="title">
                            <Icon type="ios-alarm" />
                            超取出貨
                        </template>
                        <MenuItem name="7-1" to="/overtime">超取訂單確認</MenuItem>
                        <MenuItem name="7-2" to="/overtimeGoods">超取出貨</MenuItem>
                    </Submenu>
                    <Submenu name="8">
                        <template slot="title">
                            <Icon type="md-cog" />
                            門市操作
                        </template>
                        <MenuItem name="8-1" to="/retailSalesOrder">門市訂單確認</MenuItem>
                        <MenuItem name="8-2" to="/retailSales">門市寶貝</MenuItem>
                        <MenuItem name="8-3" to="/retailSalesUp">門市取貨</MenuItem>
                    </Submenu>
                    <Submenu name="9">
                        <template slot="title">
                            <Icon type="logo-pinterest" />
                            換貨處理_預設
                        </template>
                        <MenuItem name="9-1" to="/barterHandle">換貨處理</MenuItem>
                        <MenuItem name="9-2" to="/barterQuery">換貨查詢</MenuItem>
                    </Submenu>
                    <Submenu name="10">
                        <template slot="title">
                            <Icon type="md-return-right" />
                            退貨處理
                        </template>
                        <MenuItem name="10-1" to="/returnHandle">退貨處理</MenuItem>
                        <MenuItem name="10-2" to="returnQuery">退貨查詢</MenuItem>
                    </Submenu>
                    <Submenu name="11">
                        <template slot="title">
                            <Icon type="logo-buffer" />
                            文章日誌
                        </template>
                        <MenuItem name="11-1" to="/newArticle">新增文章</MenuItem>
                        <MenuItem name="11-2" to="/articleList">文章列表</MenuItem>
                    </Submenu>
                    <Submenu name="12">
                        <template slot="title">
                            <Icon type="md-megaphone" />
                            公告&廣告管理
                        </template>
                        <MenuItem name="12-1" to="/editNotice">編輯公告</MenuItem>
                        <MenuItem name="12-2" to="/auditingNotice">審核公告</MenuItem>
                        <MenuItem name="12-3" to="/advertisementEdit">編輯廣告</MenuItem>
                        <MenuItem name="12-4" to="/advertisementAuditing">審核廣告</MenuItem>
                    </Submenu>
                    <Submenu name="13">
                        <template slot="title">
                            <Icon type="md-globe" />
                            運營管理
                        </template>
                        <MenuItem name="13-1" to="/userHandle">用戶賬號操作</MenuItem>
                        <MenuItem name="13-2" to="/userArticleHandle">用戶貼文管理</MenuItem>
                        <MenuItem name="13-3" to="/goodsActivity">商品活動</MenuItem>
                        <MenuItem name="13-4" to="/memberLevel">會員分級</MenuItem>
                        <MenuItem name="13-5" to="/buygoods">加買商品</MenuItem>
                        <MenuItem name="13-6" to="/freeMail">免運活動</MenuItem>
                        <MenuItem name="13-7" to="/couponActivity">折扣券活動</MenuItem>
                        <MenuItem name="13-8" to="/specials">特價商品區</MenuItem>
                        <MenuItem name="13-9" to="/birthdaygift">生日禮</MenuItem>
                        <MenuItem name="13-10" to="/continuousActivity">多日活動</MenuItem>
                        <MenuItem name="13-11" to="/signInActive">簽到活動</MenuItem>
                        <MenuItem name="13-12" to="/achievement">成就</MenuItem>
                    </Submenu>
                    <Submenu name="14">
                        <template slot="title">
                            <Icon type="ios-key" />
                            後臺賬號管理
                        </template>
                        <MenuItem name="14-1" to="/accountManage">賬號添加刪除</MenuItem>
                        <MenuItem name="14-2" to="/accountPower">賬號分級設定</MenuItem>
                        <MenuItem name="14-3" to="/accountHandRecord">後臺賬號操作紀錄</MenuItem>
                    </Submenu>
                    <Submenu name="15">
                        <template slot="title">
                            <Icon type="md-analytics" />
                            數據分析
                        </template>
                        <MenuItem name="15-1" to="/comprehensiveData">綜合報表</MenuItem>
                        <MenuItem name="15-2" to="/memberData">會員數據</MenuItem>
                        <MenuItem name="15-3" to="/retainData">留存數據</MenuItem>
                        <MenuItem name="15-4" to="/communityData">社群數據</MenuItem>
                        <MenuItem name="15-5" to="/goodsData">商品數據</MenuItem>
                        <MenuItem name="15-6" to="/articleData">文章數據</MenuItem>
                    </Submenu>
                    <Submenu name="16">
                        <template slot="title">
                            <Icon type="ios-call" />
                            客服相關
                        </template>
                        <MenuItem name="16-1" to="/waiterLetter">客服信件</MenuItem>
                        <MenuItem name="16-2" to="/repairFunc">補發功能</MenuItem>
                        <MenuItem name="16-3" to="/userImpeach">用戶檢舉</MenuItem>
                    </Submenu>
                    <Submenu name="17">
                        <template slot="title">
                            <Icon type="logo-bitcoin" />
                            賬務管理
                        </template>
                        <MenuItem name="17-1" to="/financeCheck">賬務核對</MenuItem>
                        <MenuItem name="17-2" to="/shipmentCheck">出貨資料核對</MenuItem>
                        <MenuItem name="17-3" to="/invoice">發票另寄</MenuItem>
                    </Submenu>
                </Menu>
            </div>
            <div class="tables">
                <router-view/>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data () {
        return {
            theme2: 'dark'
        }
    }
}
</script>
<style scoped>
    .wrapper{
        width: 100%;
        height:100vh;
    }
    .navs{
        width: 100%;
        height: 100px;
        position: relative;
        /* background-color: #08A2BA; */
        background-color:#009688;
        overflow: hidden;
    }
    /* .nav::before,
    .nav::after{
        content: "";
        position: absolute;
        left: 50%;
        min-width: 300vw;
        min-height: 300vw;
        background-color: #fff;
        animation-name: rotate;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }
    .nav::before{
        bottom: 15vh;
        border-radius: 45%;
        animation-duration: 10s;   
    }
    .nav::after{
        bottom: 12vh;
        opacity: .5;
        border-radius: 47%;
        animation-duration: 10s;
    } */
    @-webkit-keyframes rotate {
        0% {
            transform: translate(-50%, 0) rotateZ(0deg);
        }
        50% {
            transform: translate(-50%, -2%) rotateZ(180deg);
        }
        100% {
            transform: translate(-50%, 0%) rotateZ(360deg);
        }
    }
    @keyframes rotate {
        0% {
            transform: translate(-50%, 0) rotateZ(0deg);
        }
        50% {
            transform: translate(-50%, -2%) rotateZ(180deg);
        }
        100% {
            transform: translate(-50%, 0%) rotateZ(360deg);
        }
    }
    .user{
        position: absolute;
        top: 10px;
        right: 20px;
        font-weight: bold;
    }
    .operation{
        position: absolute;
        bottom: 10px;
        right: 20px;
        color: #17233d;
        
    }
    .contant{
        width: 100%;
        height: calc(100% - 100px);
        display: flex;
    }
    .menu{
        height: 100%;
        overflow-y: scroll;
        background-color: #283440;
    }
    ::-webkit-scrollbar {
    display: none;
    }
    .menu-nav{
        color: #fff;
        font-size: 16px;
        height: 51px;
        line-height: 51px;
        position: relative;
        left: 23px;
    }
    .menu-nav span{
        margin-left: 10px;
    }
    .tables{
        padding: 20px;
        width: calc(100% - 240px);
        position: relative;
        overflow-x:scroll; 
    }
    .routers{
        display: inline-block;
    }
</style>
