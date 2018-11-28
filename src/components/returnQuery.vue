<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <input type="text" placeholder="输入关键字、多个用；隔开">
        </div>
        <div class="serch">查询</div>
    </div>
    <div class="returnQuery">
        <Table border  :columns="columns1" :data="data1"  class="post"></Table>
    </div>
    <div class="page">
        <div class="b_delete">批量删除</div>
        <Page :total="100" show-total show-elevator prev-text='上一页' next-text='下一页'/>
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
                    title: '订单编号',
                    key: 'order1',
                    minWidth:125
                },
                {
                    title: '负责门市',
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
                            h('p',{},'配送方式'),h('p',{},'配送编号'),h('p',{},'出货状态'),h('p',{},'出货状态时间')
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
                            h('p',{},'下单时间'),h('p',{},'订单状态'),h('p',{},'订单状态日'),h('p',{},'取消原因'),h('p',{},'订单来源')
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
                            h('p',{},'商品名称'),h('p',{},'商品编号')
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
                    title:'数量',
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
                            h('p',{},'商品单价'),h('p',{},'折扣金额'),h('p',{},'销售金额(折扣后)')
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
                            h('p',{},'会员编号'),h('p',{},'收件人'),h('p',{},'收件人电话'),h('p',{},'地址')
                        ]
                        )
                    },
                },
                {
                    title:'订单备注',
                    key:'order9',
                    minWidth:165
                },
                {
                    title:'消费者备注',
                    key:'order10',
                    minWidth:165
                },
            ],
            data1: [
                {
                    order1:'发哥',
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
