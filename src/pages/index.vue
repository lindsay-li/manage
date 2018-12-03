<template>
    <div class="wrapper">
        <div class="navs">
            <div class="logo">
                巴克斯運營管理平臺
            </div>
            <div class="user">
                <span>AdminTest</span>
                <span>歡迎你！</span>
            </div>
            <div class="operation">
                <Dropdown trigger="click" style="margin-left: 20px" :transfer="true">
                    <a href="javascript:void(0)">
                        菜單管理
                        <Icon type="ios-arrow-down" color="#fff"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem>修改密碼</DropdownItem>
                        <DropdownItem>更換主題</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown trigger="click" style="margin-left: 20px" :transfer="true">
                    <a href="javascript:void(0)">
                        退出系統
                        <Icon type="ios-arrow-down" color="#fff"></Icon>
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
                <Menu :theme="theme2" :open-names="['1']" accordion active-name='1-1' @on-open-change="selectChange" @on-select="selectItem">
                    <div class="menu-nav">
                        <Icon type="ios-grid" color="#ffffff"/>
                        <span >導航功能</span>
                    </div>
                    
                    <Submenu name="關鍵數據">
                        <template slot="title">
                            <Icon type="ios-paper" />
                            關鍵數據
                        </template>
                        <MenuItem name="即時數據" to='/cruxdata'> 即時數據</MenuItem>
                        <MenuItem name="近期數據" to="/recentdata">近期數據</MenuItem>
                    </Submenu>
                    <Submenu name="用戶管理">
                        <template slot="title">
                            <Icon type="ios-people" />
                            用戶管理
                        </template>
                        <MenuItem name="用戶信息" to="/user">用戶信息</MenuItem>
                        <MenuItem name="折扣券" to="/coupon">折扣券</MenuItem>
                        <MenuItem name="錢包明細" to="/wallet">錢包明細</MenuItem>
                        <MenuItem name="評酒貼文列表" to="/posts">評酒貼文列表</MenuItem>
                        <MenuItem name="用戶購物車" to="/car">用戶購物車</MenuItem>
                        <MenuItem name="用戶收藏" to='/collect'>用戶收藏</MenuItem>
                    </Submenu>
                    <Submenu name="酒窖">
                        <template slot="title">
                            <Icon type="md-beer" />
                            酒窖
                        </template>
                        <MenuItem name="酒類管理" to="/wine">酒類管理</MenuItem>
                        <MenuItem name="用戶酒窖" to="/userwine">用戶酒窖</MenuItem>
                    </Submenu>
                    <Submenu name="商品管理">
                        <template slot="title">
                            <Icon type="ios-stats" />
                            商品管理
                        </template>
                        <MenuItem name="建立商品" to="/createGoods">建立商品</MenuItem>
                        <MenuItem name="商品查詢" to="/goodsQuery">商品查詢</MenuItem>
                        <MenuItem name="庫存管理">庫存管理</MenuItem>
                    </Submenu>
                    <Submenu name="訂單查詢">
                        <template slot="title">
                            <Icon type="ios-list" />
                            訂單查詢
                        </template>
                        <MenuItem name="訂單查詢" to="/orderQuery">訂單查詢</MenuItem>
                        <MenuItem name="取消訂單">取消訂單</MenuItem>
                    </Submenu>
                    <Submenu name="宅配出貨">
                        <template slot="title">
                            <Icon type="md-bicycle" />
                            宅配出貨
                        </template>
                        <MenuItem name="宅配訂單確定" to="/homeDelivery">宅配訂單確定</MenuItem>
                        <MenuItem name="宅配出貨" to="/homeDeliveryGoods">宅配出貨</MenuItem>
                    </Submenu>
                    <Submenu name="超取出貨">
                        <template slot="title">
                            <Icon type="ios-alarm" />
                            超取出貨
                        </template>
                        <MenuItem name="超取訂單確認" to="/overtime">超取訂單確認</MenuItem>
                        <MenuItem name="超取出貨" to="/overtimeGoods">超取出貨</MenuItem>
                    </Submenu>
                    <Submenu name="門市操作">
                        <template slot="title">
                            <Icon type="md-cog" />
                            門市操作
                        </template>
                        <MenuItem name="門市訂單確認" to="/retailSalesOrder">門市訂單確認</MenuItem>
                        <MenuItem name="門市寶貝" to="/retailSales">門市寶貝</MenuItem>
                        <MenuItem name="門市取貨" to="/retailSalesUp">門市取貨</MenuItem>
                    </Submenu>
                    <Submenu name="換貨處理_預設">
                        <template slot="title">
                            <Icon type="logo-pinterest" />
                            換貨處理_預設
                        </template>
                        <MenuItem name="換貨處理" to="/barterHandle">換貨處理</MenuItem>
                        <MenuItem name="換貨查詢" to="/barterQuery">換貨查詢</MenuItem>
                    </Submenu>
                    <Submenu name="退貨處理">
                        <template slot="title">
                            <Icon type="md-return-right" />
                            退貨處理
                        </template>
                        <MenuItem name="退貨處理" to="/returnHandle">退貨處理</MenuItem>
                        <MenuItem name="退貨查詢" to="returnQuery">退貨查詢</MenuItem>
                    </Submenu>
                    <Submenu name="文章日誌">
                        <template slot="title">
                            <Icon type="logo-buffer" />
                            文章日誌
                        </template>
                        <MenuItem name="新增文章" to="/newArticle">新增文章</MenuItem>
                        <MenuItem name="文章列表" to="/articleList">文章列表</MenuItem>
                    </Submenu>
                    <Submenu name="公告&廣告管理">
                        <template slot="title">
                            <Icon type="md-megaphone" />
                            公告&廣告管理
                        </template>
                        <MenuItem name="編輯公告" to="/editNotice">編輯公告</MenuItem>
                        <MenuItem name="審核公告" to="/auditingNotice">審核公告</MenuItem>
                        <MenuItem name="編輯廣告" to="/advertisementEdit">編輯廣告</MenuItem>
                        <MenuItem name="審核廣告" to="/advertisementAuditing">審核廣告</MenuItem>
                    </Submenu>
                    <Submenu name="運營管理">
                        <template slot="title">
                            <Icon type="md-globe" />
                            運營管理
                        </template>
                        <MenuItem name="用戶賬號操作" to="/userHandle">用戶賬號操作</MenuItem>
                        <MenuItem name="用戶貼文管理" to="/userArticleHandle">用戶貼文管理</MenuItem>
                        <MenuItem name="商品活動" to="/goodsActivity">商品活動</MenuItem>
                        <MenuItem name="會員分級" to="/memberLevel">會員分級</MenuItem>
                        <MenuItem name="加買商品" to="/buygoods">加買商品</MenuItem>
                        <MenuItem name="免運活動" to="/freeMail">免運活動</MenuItem>
                        <MenuItem name="折扣券活動" to="/couponActivity">折扣券活動</MenuItem>
                        <MenuItem name="特價商品區" to="/specials">特價商品區</MenuItem>
                        <MenuItem name="生日禮" to="/birthdaygift">生日禮</MenuItem>
                        <MenuItem name="多日活動" to="/continuousActivity">多日活動</MenuItem>
                        <MenuItem name="簽到活動" to="/signInActive">簽到活動</MenuItem>
                        <MenuItem name="成就" to="/achievement">成就</MenuItem>
                    </Submenu>
                    <Submenu name="後臺賬號管理">
                        <template slot="title">
                            <Icon type="ios-key" />
                            後臺賬號管理
                        </template>
                        <MenuItem name="賬號添加刪除" to="/accountManage">賬號添加刪除</MenuItem>
                        <MenuItem name="1賬號分級設定" to="/accountPower">賬號分級設定</MenuItem>
                        <MenuItem name="後臺賬號操作紀錄" to="/accountHandRecord">後臺賬號操作紀錄</MenuItem>
                    </Submenu>
                    <Submenu name="數據分析">
                        <template slot="title">
                            <Icon type="md-analytics" />
                            數據分析
                        </template>
                        <MenuItem name="綜合報表" to="/comprehensiveData">綜合報表</MenuItem>
                        <MenuItem name="會員數據" to="/memberData">會員數據</MenuItem>
                        <MenuItem name="留存數據" to="/retainData">留存數據</MenuItem>
                        <MenuItem name="社群數據" to="/communityData">社群數據</MenuItem>
                        <MenuItem name="商品數據" to="/goodsData">商品數據</MenuItem>
                        <MenuItem name="文章數據" to="/articleData">文章數據</MenuItem>
                    </Submenu>
                    <Submenu name="客服相關">
                        <template slot="title">
                            <Icon type="ios-call" />
                            客服相關
                        </template>
                        <MenuItem name="客服信件" to="/waiterLetter">客服信件</MenuItem>
                        <MenuItem name="補發功能" to="/repairFunc">補發功能</MenuItem>
                        <MenuItem name="用戶檢舉" to="/userImpeach">用戶檢舉</MenuItem>
                    </Submenu>
                    <Submenu name="賬務管理">
                        <template slot="title">
                            <Icon type="logo-bitcoin" />
                            賬務管理
                        </template>
                        <MenuItem name="賬務核對" to="/financeCheck">賬務核對</MenuItem>
                        <MenuItem name="出貨資料核對" to="/shipmentCheck">出貨資料核對</MenuItem>
                        <MenuItem name="發票另寄" to="/invoice">發票另寄</MenuItem>
                    </Submenu>
                </Menu>
            </div>
            <div class="tables">
                <div class="nav_menu">
                    <div class="adress">
                        <Icon type="ios-pin" color="#009688" size="30"/>
                        <span>您當前的位置：首頁<span>>{{submenu}}</span><span v-if="menuitem != ''">>{{menuitem}}</span></span>
                    </div>
                    <div class="time">{{time}}</div>
                </div>
                <div class="footer">巴克斯版權所有</div>
                <router-view/>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data () {
        return {
            theme2: 'dark',
            time:'',
            submenu:'',
            menuitem:''
        }
    },
    created(){
        this.getTime();
    },
    watch:{
        submenu(val){
            this.menuitem = ''
        }
    },
    methods:{
        getTime(){
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.getDate();
            var week = date.getDay();
            var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
            this.time = `${year}年${month}月${day}日 ${weekday[week]}`;
        },
        selectChange(name){
            console.log(name)
            this.submenu = name.join(' ');
        },
        selectItem(name){
            console.log('子菜單',name)
            this.menuitem = name;
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
        height: 80px;
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
    .logo{
        font-size: 30px;
        color: #fff;
        text-shadow:  0 8px 9px #4583b3;
        height: 80px;
        line-height: 80px;
        width: auto;
        padding-left: 30px;
    }
    .user{
        position: absolute;
        top: 10px;
        right: 20px;
        font-weight: bold;
        color: #fff;
    }
    .operation{
        position: absolute;
        bottom: 10px;
        right: 20px;
        color: #17233d;
        
    }
    .contant{
        width: 100%;
        height: calc(100% - 80px);
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
        padding-top: 60px;
        width: calc(100% - 240px);
        position: relative;
        overflow-x:scroll; 
    }
    .routers{
        display: inline-block;
    }
    .nav_menu{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 40px;
        background-color: #f4f4f4;
        border: 1px solid #ccc;
        position: absolute;
        left: 0;
        top: 0;
    }
    .adress{
        margin-left: 20px;
        color:#5F5F5F;
    }
    .time{
        margin-right: 20px;
    }
    .footer{
        width: 100%;
        height: 30px;
        line-height: 30px;
        background-color: #363E4F;
        text-align: center;
        color: #fff;
        position: absolute;
        left: 0;
        bottom: 0;
    }
</style>
