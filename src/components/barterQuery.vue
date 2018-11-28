<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <input type="text" placeholder="输入关键字、多个用；隔开">
        </div>
        <div class="serch">查询</div>
    </div>
    <div class="barter_query">
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
                    minWidth:125,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'订单编号'),h('p',{},'换货单编号')
                        ]
                        )
                    }
                },
                {
                    title: '订单编号',
                    key: 'order2',
                    minWidth:125,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'换货单状态'),h('p',{},'换货成立时间'),h('p',{},'换货状态时间')
                        ]
                        )
                    }
                },
                {
                    title: '',
                    key: 'order3',
                    minWidth:164,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'换货原因'),h('p',{},'换货描述')
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
                            h('p',{},'商品编号'),h('p',{},'商品名称')
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
                            h('p',{},'数量'),h('p',{},'单价'),h('p',{},'折扣金额'),h('p',{},'销售金额')
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
                    title:'',
                    key:'order6',
                    minWidth:145,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'折扣活动金额'),h('p',{},'折扣卷折扣金额')
                        ]
                        )
                    },
                },
                {
                    title:'',
                    key:'order7',
                    minWidth:160,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'联络人'),h('p',{},'联络人电话'),h('p',{},'换货地址')
                        ]
                        )
                    },
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
