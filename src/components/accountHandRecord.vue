<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>用戶名：</span>
            <input type="text" >
        </div>
        <div class="option">
            <span>操作時間：</span>
            <input type="text" name="phone">
        </div>
        <div class="option">
            <span>操作行為：</span>
            <input type="text" name="time">
        </div>
        <div class="serch">查詢</div>
    </div>
    <div class="activity">
        <Table border  :columns="columns1" :data="data1"  class="post"></Table>
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
                    type:'selection',
                    align:'center',
                    width:60
                },
                {
                    title: '會員編號',
                    key: 'order1',
                    minWidth:105
                },
                {
                    title: '用戶姓名',
                    key: 'order2',
                    minWidth:120
                },
                {
                    title: '操作時間',
                    key: 'order3',
                    minWidth:160
                },
                {
                    title: '操作行為',
                    key: 'order4',
                    minWidth:160
                },
                {
                    title: '操作賬戶',
                    key: 'order5',
                    minWidth:160
                },
                {
                    title: '操作次數',
                    key: 'order6',
                    minWidth:160
                }
            ],
            data1: [
                {
                    order1: '200元',
                    order2: '2019.05.18-2019.05.21',
                    order3: '20%',
                    order4:'所有',
                    order5:'充值送券',
                    order6:'充值10000送200'
                },
                {
                    order1: '200元',
                    order2: '2019.05.18-2019.05.21',
                    order3: '20%',
                    order4:'所有',
                    order5:'充值送券',
                    order6:'充值10000送200'
                },
                {
                    order1: '200元',
                    order2: '2019.05.18-2019.05.21',
                    order3: '20%',
                    order4:'所有',
                    order5:'充值送券',
                    order6:'充值10000送200'
                },
                {
                    order1: '200元',
                    order2: '2019.05.18-2019.05.21',
                    order3: '20%',
                    order4:'所有',
                    order5:'充值送券',
                    order6:'充值10000送200'
                },
                {
                    order1: '200元',
                    order2: '2019.05.18-2019.05.21',
                    order3: '20%',
                    order4:'所有',
                    order5:'充值送券',
                    order6:'充值10000送200'
                },
            ],
            selectData:'門市'
        }
    },
    methods:{
        
    }
}
</script>
<style scoped>


</style>
