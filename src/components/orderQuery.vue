<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>訂單編號：</span>
            <input type="text" >
        </div>
        <div class="option">
            <span>下單時間：</span>
            <input type="text" name="phone">
        </div>
        <div class="option">
            <span>出貨時間：</span>
            <input type="text" name="time">
        </div>
        <div class="option">
            <span>類型：</span>
            <input type="text" name="time">
        </div>
        <div class="serch">查詢</div>
    </div>
    <div class="orderquery">
        <Table border  :columns="columns1" :data="data1"  class="post"></Table>
    </div>
    <div class="page">
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
                    width:95
                },
                {
                    title: '負責門市',
                    key: 'order2',
                    width:100
                },
                {
                    title: '配送方式\n配送編號\n出貨狀態\n出貨時間',
                    key: 'order3',
                    width:164,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'配送方式'),h('p',{},'配送編號'),h('p',{},'出貨狀態'),h('p',{},'出貨時間'),
                        ]
                        )
                    }
                },
                {
                    title: '下單時間\n訂單狀態\n訂單狀態日\n取消原因\n訂單來源',
                    key: 'order4',
                    width:164,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'下單時間'),h('p',{},'訂單狀態'),h('p',{},'訂單狀態日'),h('p',{},'取消原因'),h('p',{},'訂單來源')
                        ]
                        )
                    }
                },
                {
                    title: '商品名稱\n商品編號',
                    key: 'order5',
                    width:104,
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
                    width:85
                },
                {
                    title:'商品單價\n折扣金額\n銷售金額(折扣後)',
                    key:'order7',
                    width:160,
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
                    width:164,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'會員編號'),h('p',{},'收件人'),h('p',{},'收件人電話'),h('p',{},'地址')
                        ]
                        )
                    }
                },
                {
                    title:'訂單備註',
                    key:'order9'
                },
                {
                    title:'消費者備註',
                    key:'order10'
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
                    order10:''
                }
            ],
        }
    },
    methods:{

    }
}
</script>
<style scoped>

</style>
