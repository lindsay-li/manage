<template>
    <div class="wrapper">
        <div class="navs">
            <div class="user">
                <span>测试一会</span>
                <span>欢迎你！</span>
            </div>
            <div class="operation">
                <Dropdown trigger="click" style="margin-left: 20px" :transfer="true">
                    <a href="javascript:void(0)">
                        菜单管理
                        <Icon type="ios-arrow-down" color="#17233d"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem>修改密码</DropdownItem>
                        <DropdownItem>更换主题</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown trigger="click" style="margin-left: 20px" :transfer="true">
                    <a href="javascript:void(0)">
                        退出系统
                        <Icon type="ios-arrow-down" color="#17233d"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem>重新登录</DropdownItem>
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
                        <span >导航功能</span>
                    </div>
                    
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-paper" />
                            关键数据
                        </template>
                        <MenuItem name="1-1" to='/cruxdata'> 即时数据</MenuItem>
                        <MenuItem name="1-2" to="/recentdata">近期数据</MenuItem>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-people" />
                            用户管理
                        </template>
                        <MenuItem name="2-1" to="/user">用户信息</MenuItem>
                        <MenuItem name="2-2" to="/coupon">折扣券</MenuItem>
                        <MenuItem name="2-3" to="/wallet">钱包明细</MenuItem>
                        <MenuItem name="2-4" to="/posts">评酒贴文列表</MenuItem>
                        <MenuItem name="2-5" to="/car">用户购物车</MenuItem>
                        <MenuItem name="2-6" to='/collect'>用户收藏</MenuItem>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="md-beer" />
                            酒窖
                        </template>
                        <MenuItem name="3-1" to="/wine">酒类管理</MenuItem>
                        <MenuItem name="3-2" to="/userwine">用户酒窖</MenuItem>
                    </Submenu>
                    <Submenu name="4">
                        <template slot="title">
                            <Icon type="ios-stats" />
                            商品管理
                        </template>
                        <MenuItem name="4-1" to="/createGoods">建立商品</MenuItem>
                        <MenuItem name="4-2" to="/goodsQuery">商品查询</MenuItem>
                        <MenuItem name="4-3">库存管理</MenuItem>
                    </Submenu>
                    <Submenu name="5">
                        <template slot="title">
                            <Icon type="ios-list" />
                            订单查询
                        </template>
                        <MenuItem name="5-1" to="/orderQuery">订单查询</MenuItem>
                        <MenuItem name="5-2">取消订单</MenuItem>
                    </Submenu>
                    <Submenu name="6">
                        <template slot="title">
                            <Icon type="md-bicycle" />
                            宅配出货
                        </template>
                        <MenuItem name="6-1" to="/homeDelivery">宅配订单确定</MenuItem>
                        <MenuItem name="6-2" to="/homeDeliveryGoods">宅配出货</MenuItem>
                    </Submenu>
                    <Submenu name="7">
                        <template slot="title">
                            <Icon type="ios-alarm" />
                            超取出货
                        </template>
                        <MenuItem name="7-1" to="/overtime">超取订单确认</MenuItem>
                        <MenuItem name="7-2" to="/overtimeGoods">超取出货</MenuItem>
                    </Submenu>
                    <Submenu name="8">
                        <template slot="title">
                            <Icon type="md-cog" />
                            门市操作
                        </template>
                        <MenuItem name="8-1" to="/retailSalesOrder">门市订单确认</MenuItem>
                        <MenuItem name="8-2" to="/retailSales">门市宝贝</MenuItem>
                        <MenuItem name="8-3" to="/retailSalesUp">门市取货</MenuItem>
                    </Submenu>
                    <Submenu name="9">
                        <template slot="title">
                            <Icon type="logo-pinterest" />
                            换货处理_预设
                        </template>
                        <MenuItem name="9-1" to="/barterHandle">换货处理</MenuItem>
                        <MenuItem name="9-2" to="/barterQuery">换货查询</MenuItem>
                    </Submenu>
                    <Submenu name="10">
                        <template slot="title">
                            <Icon type="md-return-right" />
                            退货处理
                        </template>
                        <MenuItem name="10-1" to="/returnHandle">退货处理</MenuItem>
                        <MenuItem name="10-2" to="returnQuery">退货查询</MenuItem>
                    </Submenu>
                    <Submenu name="11">
                        <template slot="title">
                            <Icon type="logo-buffer" />
                            文章日志
                        </template>
                        <MenuItem name="11-1" to="/newArticle">新增文章</MenuItem>
                        <MenuItem name="11-2" to="/articleList">文章列表</MenuItem>
                    </Submenu>
                    <Submenu name="12">
                        <template slot="title">
                            <Icon type="md-megaphone" />
                            公告&广告管理
                        </template>
                        <MenuItem name="12-1" to="/editNotice">编辑公告</MenuItem>
                        <MenuItem name="12-2" to="/auditingNotice">审核公告</MenuItem>
                        <MenuItem name="12-3" to="/editNotice">编辑广告</MenuItem>
                        <MenuItem name="12-4" to="/auditingNotice">审核广告</MenuItem>
                    </Submenu>
                    <Submenu name="13">
                        <template slot="title">
                            <Icon type="md-globe" />
                            运营管理
                        </template>
                        <MenuItem name="13-1">用户账号操作</MenuItem>
                        <MenuItem name="13-2">用户贴文管理</MenuItem>
                        <MenuItem name="13-3">商品活动</MenuItem>
                        <MenuItem name="13-4">折扣券活动</MenuItem>
                        <MenuItem name="13-5">特价商品区</MenuItem>
                        <MenuItem name="13-6">生日礼</MenuItem>
                        <MenuItem name="13-7">多日活动</MenuItem>
                        <MenuItem name="13-8">签到活动</MenuItem>
                        <MenuItem name="13-9">成就</MenuItem>
                    </Submenu>
                    <Submenu name="14">
                        <template slot="title">
                            <Icon type="ios-key" />
                            后台账号管理
                        </template>
                        <MenuItem name="14-1">账号添加删除</MenuItem>
                        <MenuItem name="14-2">账号分级设定</MenuItem>
                        <MenuItem name="14-3">后台账号操作纪录</MenuItem>
                    </Submenu>
                    <Submenu name="15">
                        <template slot="title">
                            <Icon type="md-analytics" />
                            数据分析
                        </template>
                        <MenuItem name="15-1">综合报表</MenuItem>
                        <MenuItem name="15-2">会员数据</MenuItem>
                        <MenuItem name="15-3">留存数据</MenuItem>
                        <MenuItem name="15-4">社群数据</MenuItem>
                        <MenuItem name="15-5">商品数据</MenuItem>
                        <MenuItem name="15-6">文章数据</MenuItem>
                    </Submenu>
                    <Submenu name="16">
                        <template slot="title">
                            <Icon type="ios-call" />
                            客服相关
                        </template>
                        <MenuItem name="16-1">客服信件</MenuItem>
                        <MenuItem name="16-2">浦发功能</MenuItem>
                        <MenuItem name="16-3">用户检举</MenuItem>
                    </Submenu>
                    <Submenu name="17">
                        <template slot="title">
                            <Icon type="logo-bitcoin" />
                            账务管理
                        </template>
                        <MenuItem name="17-1">账务核对</MenuItem>
                        <MenuItem name="17-2">出货资料核对</MenuItem>
                        <MenuItem name="17-3">发票另寄</MenuItem>
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
