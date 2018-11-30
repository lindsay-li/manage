<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>訂單編號：</span>
            <input type="text" >
        </div>
        <div class="option">
            <span>配送廠家：</span>
            <input type="text" name="phone">
        </div>
        <div class="option">
            <span>配送編號：</span>
            <input type="text" name="time">
        </div>
        <div class="option">
            <span>商品名稱：</span>
            <input type="text" name="time">
        </div>
        <div class="serch">查詢</div>
    </div>
    <div class="delivery_goods">
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
                    title: '負責門市',
                    key: 'order1',
                    width:95
                },
                {
                    title: '訂單編號',
                    key: 'order2',
                    width:100
                },
                {
                    title: '',
                    key: 'order3',
                    width:164,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'配送諮詢'),h('p',{},'配送廠家'),h('p',{},'配送編號')
                        ]
                        )
                    }
                },
                {
                    title: '下單時間 預計出貨日',
                    key: 'order4',
                    width:164,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'下單時間'),h('p',{},'預計出貨日')
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
                    title:'銷售金額',
                    key:'order7',
                    width:160
                },
                {
                    title:'收件人諮詢',
                    key:'order8',
                    width:264,
                },
                {
                    title:'備註',
                    key:'order9',
                    width:264
                },
                {
                    title:'訂單狀態',
                    key:'order10',
                    width:100
                },
                {
                    title:'修改',
                    key:'order11',
                    width:160,
                    render:(h,params)=>{
                        return h('Select',{props:{
                            size:'small',
                            placeholder:'編輯狀態'
                        },
                        style:{
                            width:100
                        }},[
                            h('Option',{props:{value:"待出貨"}}),h('Option',{props:{value:"出貨中"}}),
                        ])
                    }
                },
                {
                    title:'可改狀態',
                    key:'order12',
                    width:110,
                    render:(h,params)=>{
                        return h('div',{},[
                            h('p',{style:{marginLeft:'-10px',color:'#ED4014'}},'待出貨'),
                            h('p',{style:{marginLeft:'10px',color:'#ED4014'}},'出貨中')
                        ])
                    }
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
                    order11:''
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
