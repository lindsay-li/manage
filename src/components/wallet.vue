<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>用户名：</span>
            <input type="text" >
        </div>
        <div class="option">
            <span>会员编号：</span>
            <input type="text" name="phone">
        </div>
        <div class="serch">查询</div>
    </div>
    <div class="wallet">
        <Table border  :columns="columns1" :data="data1"></Table>
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
            columns1: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '会员编号',
                    key: 'order1'
                },
                {
                    title: '用户姓名',
                    key: 'order2'
                },
                {
                    title: '时间',
                    key: 'order3'
                },
                {
                    title: '操作',
                    key: 'order4'
                },
                {
                    title: '支出消耗',
                    key: 'order5'
                },
                {
                    title:'结账',
                    key:'order6'
                },
                {
                    title:'备注',
                    key:'order7',
                    width:400
                }
            ],
            data1: [
                {
                    order1: '下载赠送',
                    order2: 200,
                    order3: '5%',
                    order4: '2016/10/03-2018/9/02',
                    order5:'官方APP商品'
                },
                {
                    order1: '下载赠送',
                    order2: 200,
                    order3: '5%',
                    order4: '2016/10/03-2018/9/02',
                    order5:'官方APP商品'
                },
                {
                    order1: '下载赠送',
                    order2: 200,
                    order3: '5%',
                    order4: '2016/10/03-2018/9/02',
                    order5:'官方APP商品'
                },
                {
                    order1: '下载赠送',
                    order2: 200,
                    order3: '5%',
                    order4: '2016/10/03-2018/9/02',
                    order5:'官方APP商品'
                },
                {
                    order1: '下载赠送',
                    order2: 200,
                    order3: '5%',
                    order4: '2016/10/03-2018/9/02',
                    order5:'官方APP商品'
                },
            ]
        }
    }
}
</script>
<style scoped>
</style>
