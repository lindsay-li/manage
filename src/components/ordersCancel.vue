<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>訂單編號：</span>
            <input type="text" >
        </div>
        <div class="option">
            <span>配送方式：</span>
            <input type="text" name="phone">
        </div>
        <div class="option">
            <span>下單時間：</span>
            <input type="text" name="time">
        </div>
        <div class="option">
            <span>配送編號：</span>
            <input type="text" name="time">
        </div>
        <div class="serch">查詢</div>
    </div>
    <div class="ordercancel">
        <Table border  :columns="columns1" :data="data1"  class="post"></Table>
    </div>
    <div class="page">
        <div class="delete">取消訂單</div>
        <Page :total="100" show-total show-elevator prev-text='上一頁' next-text='下一頁'/>
    </div>
</div>        
</template>
<script>
export default {
    data(){
        return{
            columns1:[
                {
                    title: '訂單編號',
                    key: 'order1',
                    minWidth:95
                },
                {
                    title: '',
                    key: 'order2',
                    minWidth:110,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'下單時間'),h('p',{},'配送方式')
                        ]
                        )
                    }
                },
                {
                    title: '',
                    key: 'order3',
                    width:164,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'取消原因'),h('p',{},'取消訂單日')
                        ]
                        )
                    }
                },
                {
                    title: '',
                    key: 'order4',
                    minWidth:164,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'付款方式'),h('p',{},'訂單確認日'),h('p',{},'預計出貨日')
                        ]
                        )
                    }
                },
                {
                    title: '商品名稱\n商品編號',
                    key: 'order5',
                    minWidth:104,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'商品名稱'),h('p',{},'商品編號')
                        ]
                        )
                    },
                    render:(h,params)=>{
                        return h('div',
                        [
                           h('p',{},params.row.order5.name?params.row.order5.name:'--'),h('p',{},params.row.order5.num) 
                        ]
                        )
                    }
                },
                {
                    title:'數量',
                    key:'order6',
                    minWidth:85
                },
                {
                    title:'商品單價\n折扣金額\n銷售金額(折扣後)',
                    key:'order7',
                    minWidth:160,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'商品單價'),h('p',{},'折扣金額'),h('p',{},'銷售金額(折扣後)')
                        ]
                        )
                    }
                },
                {
                    title:'會員編號\n收件人\n收件人電話\n地址',
                    key:'order8',
                    minWidth:164,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'會員編號'),h('p',{},'收件人'),h('p',{},'收件人電話'),h('p',{},'地址')
                        ]
                        )
                    }
                },
                {
                    title:'出貨狀態',
                    minWidth:95,
                    key:'order9'
                },
                {
                    title:'訂單備註',
                    key:'order10',
                    minWidth:160
                },
                {
                    title:'消費者備註',
                    key:'order11',
                    minWidth:160
                }
            ],
            data1: [
                {
                    order1:'發哥',
                    order2:'葡萄酒',
                    order3:'1',
                    order4:'12',
                    order5:{name:'',num:'BX124548'},
                    order6:'www.wdwd.ddd',
                    order7:'',
                    order8:'',
                    order9:'',
                    order10:'',
                    order11:""
                }
            ],
        }
    },
    methods:{

    }
}
</script>
<style scoped>
.page{
    justify-content: space-between;
}
</style>
