<template>
<div class="coupon">
    <div class="nav">
        <div class="option">
            <span>用戶名：</span>
            <input type="text" >
        </div>
        <div class="option">
            <span>金額：</span>
            <input type="text" name="phone">
        </div>
        <div class="option">
            <span>使用時間：</span>
            <input type="text" name="time">
        </div>
        <div class="option">
            <span>活動名稱：</span>
            <input type="text" name="address">
        </div>
        <div class="serch">查詢</div>
    </div>
    <div class="content">
        <Table border  :columns="columns1" :data="data1"></Table>
    </div>
    <div class="page">
        <Page :total="100" show-total show-elevator prev-text='上一頁' next-text='下一頁'/>
    </div>
</div>    
</template>
<script>
export default {
    name:'coupon',
    data(){
        return{
            columns1: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '活動名稱',
                    key: 'order1'
                },
                {
                    title: '金額',
                    key: 'order2'
                },
                {
                    title: '折扣%數',
                    key: 'order3'
                },
                {
                    title: '使用時間',
                    key: 'order4'
                },
                {
                    title: '範圍',
                    key: 'order5'
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
