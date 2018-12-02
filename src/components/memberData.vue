<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>會員編號：</span>
            <input type="text" >
        </div>
        <div class="option">
            <span>開始時間：</span>
            <input type="text" name="phone">
        </div>
        <div class="option">
            <span>結束時間：</span>
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
                    title: '時間',
                    key: 'order1',
                    minWidth:145
                },
                {
                    title: '會員編號',
                    key: 'order2',
                    minWidth:120
                },
                {
                    title: '累計會員',
                    key: 'order3',
                    minWidth:110
                },
                {
                    title: '完整資料會員數',
                    key: 'order4',
                    minWidth:140
                },
                {
                    title: '驗證身份人數',
                    key: 'order5',
                    minWidth:130
                },
                {
                    title: '登入會員',
                    key: 'order6',
                    minWidth:110
                },
                {
                    title: '簽到人數',
                    key: 'order7',
                    minWidth:110
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
