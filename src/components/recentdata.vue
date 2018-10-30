<template>
<div class="recent">
    <div class="title">即时数据</div>
    <Table :columns="columns1" :data="data1" border  size='large' ></Table>
</div>  
</template>
<script>
export default {
    data(){
        return{
            columns1: [
                {
                    title: '时间',
                    key: 'order1'
                },
                {
                    title: '总订单数',
                    key: 'order2'
                },
                {
                    title: 'APP订单数',
                    key: 'order3'
                },
                {
                    title: 'web订单数',
                    key: 'order4'
                },
                {
                    title: '线下订单数(门市专用)',
                    key: 'order5'
                },
                {
                    title: '总订单金额',
                    key: 'order6'
                },
                {
                    title: 'APP订单金额',
                    key: 'order7'
                },
                {
                    title: 'web订单金额',
                    key: 'order8'
                },
                {
                    title: '线下订单金额(门市专用)',
                    key: 'order9'
                },
                {
                    title: '平均订单金额',
                    key: 'order10'
                },
                {
                    title: 'APP平均订单金额',
                    key: 'order11'
                },
                {
                    title: 'web平均订单金额',
                    key: 'order12'
                },
                {
                    title: '线下平均订单金额(门市专用)',
                    key: 'order13'
                },
                {
                    title: '总会员数',
                    key: 'order14'
                },
                {
                    title: 'web登入人数(IP排重)',
                    key: 'order15'
                },
                {
                    title: 'APP登入人数(排重)',
                    key: 'order16'
                },
                {
                    title: '一次购物人数&占比',
                    key: 'order17'
                },
                {
                    title: '二次购物人数&占比',
                    key: 'order18'
                },
                {
                    title: '未次购物人数&占比',
                    key: 'order19'
                },
            ],
            data1: [
                {
                    order1: '昨日',
                    order2: 3,
                    order3: 4,
                    order4: 5,
                    order5: 6,
                    order6: 7,
                    order7: 7,
                    order8: 9,
                    order9: 0,
                    order10: 3,
                    order11: 4,
                    order12: 5,
                    order13: 5,
                    order14: 4,  
                },
                {
                    order1: '前七日',
                    order2: 3,
                    order3: 4,
                    order4: 5,
                    order5: 6,
                    order6: 7,
                    order7: 7,
                    order8: 9,
                    order9: 0,
                    order10: 3,
                    order11: 4,
                    order12: 5,
                    order13: 5,
                    order14: 4,    
                },
                {
                    order1: '前三十日',
                    order2: 3,
                    order3: 4,
                    order4: 5,
                    order5: 6,
                    order6: 7,
                    order7: 7,
                    order8: 9,
                    order9: 0,
                    order10: 3,
                    order11: 4,
                    order12: 5,
                    order13: 5,
                    order14: 4,                    
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
    background-color: #2d8cf0;
    border-radius: 4px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    line-height: 50px;
    margin-bottom: 30px;
}
</style>
