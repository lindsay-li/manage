<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>订单编号：</span>
            <input type="text" >
        </div>
        <div class="option">
            <span>配送厂家：</span>
            <input type="text" name="phone">
        </div>
        <div class="option">
            <span>配送编号：</span>
            <input type="text" name="time">
        </div>
        <div class="option">
            <span>商品名称：</span>
            <input type="text" name="time">
        </div>
        <div class="serch">查询</div>
    </div>
    <div class="homeDelivery">
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
                    title: '负责门市',
                    key: 'order1',
                    width:95
                },
                {
                    title: '订单编号',
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
                            h('p',{},'配送咨询'),h('p',{},'配送厂家'),h('p',{},'配送编号')
                        ]
                        )
                    }
                },
                {
                    title: '下单时间 预计出货日',
                    key: 'order4',
                    width:164,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'下单时间'),h('p',{},'预计出货日')
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
                    title:'销售金额',
                    key:'order7',
                    width:160
                },
                {
                    title:'收件人咨询',
                    key:'order8',
                    width:264,
                },
                {
                    title:'备注',
                    key:'order9'
                },
                {
                    title:'订单状态',
                    key:'order10'
                },
                {
                    title:'修改',
                    key:'order11',
                    // render:(h,params)=>{
                    //     return h('select',{props:{
                    //         name:'编辑'
                    //     }},[
                    //         h('option',{props:{value:"待出货",name:'待出货'}},'待出货'),h('option',{props:{value:"出货中",name:'出货中'}},'出货中'),
                    //     ])
                    // }
                    render:(h,params)=>{
                        return h('Dropdown',{
                                props:{
                                    trigger:'click',
                                    transfer:true
                                }
                                
                            },
                            [
                                h('Button',{props:{type:'primary'}}
                            
                                ,'编辑状态'),
                                h('DropdownMenu',
                                    {
                                        props:{
                                            slot:'list'
                                            }
                                    },
                                    [
                                        h('DropdownItem',{},'待出货'),
                                        h('DropdownItem',{},'出货中')
                                    ]
                                )
                            ]
                        )
                    }
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

</style>
