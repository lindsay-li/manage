<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>订单编号：</span>
            <input type="text" >
        </div>
        <div class="option">
            <span>下单时间：</span>
            <input type="text" name="phone">
        </div>
        <div class="option">
            <span>出货时间：</span>
            <input type="text" name="time">
        </div>
        <div class="option">
            <span>类型：</span>
            <input type="text" name="time">
        </div>
        <div class="serch">查询</div>
    </div>
    <div class="orderquery">
        <Table border  :columns="columns1" :data="data1"  class="post"></Table>
    </div>
    <div class="page">
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
                    title: '订单编号',
                    key: 'order1',
                    width:95
                },
                {
                    title: '负责门市',
                    key: 'order2',
                    width:100
                },
                {
                    title: '配送方式\n配送编号\n出货状态\n出货时间',
                    key: 'order3',
                    width:164,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'配送方式'),h('p',{},'配送编号'),h('p',{},'出货状态'),h('p',{},'出货时间'),
                        ]
                        )
                    }
                },
                {
                    title: '下单时间\n订单状态\n订单状态日\n取消原因\n订单来源',
                    key: 'order4',
                    width:164,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'下单时间'),h('p',{},'订单状态'),h('p',{},'订单状态日'),h('p',{},'取消原因'),h('p',{},'订单来源')
                        ]
                        )
                    }
                },
                {
                    title: '商品名称\n商品编号',
                    key: 'order5',
                    width:104,
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
                    width:85
                },
                {
                    title:'商品单价\n折扣金额\n销售金额(折扣后)',
                    key:'order7',
                    width:160,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'商品单价'),h('p',{},'折扣金额'),h('p',{},'销售金额(折扣后)')
                        ]
                        )
                    }
                },
                {
                    title:'会员编号\n收件人\n收件人电话\n地址',
                    key:'order8',
                    width:164,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'会员编号'),h('p',{},'收件人'),h('p',{},'收件人电话'),h('p',{},'地址')
                        ]
                        )
                    }
                },
                {
                    title:'订单备注',
                    key:'order9'
                },
                {
                    title:'消费者备注',
                    key:'order10'
                }
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
