<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <input type="text" placeholder="輸入關鍵字、多個用；隔開">
        </div>
        <div class="serch">查詢</div>
    </div>
    <div class="returnHandle">
        <Table border  :columns="columns1" :data="data1"  class="post"></Table>
    </div>
    <div class="page">
        <div class="b_delete">批量刪除</div>
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
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '訂單編號',
                    key: 'order1',
                    minWidth:125
                },
                {
                    title: '負責門市',
                    key: 'order2',
                    minWidth:125
                },
                {
                    title: '',
                    key: 'order3',
                    minWidth:164,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'配送方式'),h('p',{},'配送編號'),h('p',{},'出貨狀態'),h('p',{},'出貨狀態時間')
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
                            h('p',{},'下單時間'),h('p',{},'訂單狀態'),h('p',{},'訂單狀態日'),h('p',{},'取消原因'),h('p',{},'訂單來源')
                        ]
                        )
                    }
                },
                {
                    title: '',
                    key: 'order5',
                    minWidth:125,
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
                    minWidth:105
                },
                {
                    title:'',
                    key:'order7',
                    minWidth:160,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'商品單價'),h('p',{},'折扣金額'),h('p',{},'銷售金額(折扣後)')
                        ]
                        )
                    },
                },
                {
                    title:'',
                    key:'order8',
                    minWidth:160,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'會員編號'),h('p',{},'收件人'),h('p',{},'收件人電話'),h('p',{},'地址')
                        ]
                        )
                    },
                },
                {
                    title:'訂單備註',
                    key:'order9',
                    minWidth:165
                },
                {
                    title:'消費者備註',
                    key:'order10',
                    minWidth:165
                },
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
                }
            ],
        }
    },
    methods:{

    }
}
</script>
<style scoped>
input{
    width: 380px;
}
.page{
    justify-content: space-between;
}
.b_delete{
    width: 200px;
    height: 42px;
    line-height: 42px;
    text-align: center;
    cursor:pointer;
    border-radius: 6px;
    border: 1px solid #777;
}

.b_delete:hover{
    background-color: #009688;
    color:#fff;
}
</style>
