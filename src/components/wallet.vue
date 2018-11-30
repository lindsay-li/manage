<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>用戶名：</span>
            <input type="text" >
        </div>
        <div class="option">
            <span>會員編號：</span>
            <input type="text" name="phone">
        </div>
        <div class="serch">查詢</div>
    </div>
    <div class="wallet">
        <Table border  :columns="columns1" :data="data1"></Table>
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
            columns1: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '會員編號',
                    key: 'order1'
                },
                {
                    title: '用戶姓名',
                    key: 'order2'
                },
                {
                    title: '時間',
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
                    title:'結賬',
                    key:'order6'
                },
                {
                    title:'備註',
                    key:'order7',
                    width:400
                }
            ],
            data1: [
                {
                    order1: '下載贈送',
                    order2: 200,
                    order3: '5%',
                    order4: '2016/10/03-2018/9/02',
                    order5:'官方APP商品'
                },
                {
                    order1: '下載贈送',
                    order2: 200,
                    order3: '5%',
                    order4: '2016/10/03-2018/9/02',
                    order5:'官方APP商品'
                },
                {
                    order1: '下載贈送',
                    order2: 200,
                    order3: '5%',
                    order4: '2016/10/03-2018/9/02',
                    order5:'官方APP商品'
                },
                {
                    order1: '下載贈送',
                    order2: 200,
                    order3: '5%',
                    order4: '2016/10/03-2018/9/02',
                    order5:'官方APP商品'
                },
                {
                    order1: '下載贈送',
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
