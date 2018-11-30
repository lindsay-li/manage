<template>
<div class="wrappar">
    <div class="title">会员分级</div>
    <div class="handle">
        <Table border  :columns="columns1" :data="data1"></Table>
    </div>
    <div class="page">
        <div class="add_goods">添加</div>
    </div>
</div>   
</template>
<script>
export default {
    data(){
        return{
            columns1: [
                {
                    title: '会员等级',
                    key: 'order1',
                    minWidth:105
                },
                {
                    title: '获得途径',
                    key: 'order2',
                    minWidth:105
                },
                {
                    title: '订单回馈红利',
                    key: 'order3',
                    minWidth:105
                },
                {
                    title: '生日卷',
                    key: 'order4',
                    minWidth:160,
                    renderHeader:(h,params)=>{
                        return h('div',{},[
                            h('p',{},'生日卷'),
                            h('p',{},'(满1000元抵消费)')
                        ])
                    }

                },
                {
                    title: '每月酒品试饮兑换',
                    key: 'order5',
                    minWidth:160
                },
                {
                    title:'非促销酒品优惠',
                    key:'order6',
                    minWidth:150
                }
            ],
            data1: [
                {
                    order1: '一般会员',
                    order2: '消费获得',
                    order3: '1倍',
                    order4: '50元',
                    order5:'',
                    order6:'',
                },
                {
                    order1: '黄金会员',
                    order2: '20000元',
                    order3: '1.2倍',
                    order4: '100元',
                    order5:'',
                    order6:'95折',
                },
                {
                    order1: '白金会员',
                    order2: '50000元',
                    order3: '1.5倍',
                    order4: '300元',
                    order5:'1杯(试饮资料每月另行公告)',
                    order6:'9折',
                }
            ]
        }
    },
    methods:{
        
    }
}
</script>
<style scoped>
.title{
    width: 100%;
    height: 50px;
    background-color: #009688;
    border-radius: 4px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    line-height: 50px;
    margin-bottom: 30px;
}
</style>
