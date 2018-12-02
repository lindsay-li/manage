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
                    title: '累計會員數',
                    key: 'order3',
                    minWidth:110
                },
                {
                    title: '登入會員',
                    key: 'order4',
                    minWidth:110
                },
                {
                    title: '登入次數',
                    key: 'order5',
                    minWidth:110
                },
                {
                    title: '平均APP在線人數',
                    key: 'order6',
                    minWidth:150
                },
                {
                    title: '平均在線時間',
                    key: 'order7',
                    minWidth:130
                },
                {
                    title: '品酒發文人數',
                    key: 'order8',
                    minWidth:130
                },
                {
                    title: '迴文人數',
                    key: 'order9',
                    minWidth:110
                },
                {
                    title: '訂單數',
                    key: 'order10',
                    minWidth:105
                },
                {
                    title: '訂單金額',
                    key: 'order11',
                    minWidth:105
                },
                {
                    title: '平均訂單金額',
                    key: 'order12',
                    minWidth:130
                },
                {
                    title: '待出貨訂單',
                    key: 'order13',
                    minWidth:120
                },
                {
                    title: '待出貨訂單金額',
                    key: 'order14',
                    minWidth:140
                },
                {
                    title: '平均出貨天數',
                    key: 'order15',
                    minWidth:140
                },
                {
                    title: '負擔運費總額(含退貨)',
                    key: 'order16',
                    minWidth:180
                },
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
