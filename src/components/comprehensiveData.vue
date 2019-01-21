<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>會員編號：</span>
            <Input type="text" style="width:160px"/>
        </div>
        <div class="option">
            <span>開始時間：</span>
            <Input type="text" name="phone" style="width:160px"/>
        </div>
        <div class="option">
            <span>結束時間：</span>
            <Input type="text" name="time" style="width:160px"/>
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
                    key: 'ldate',
                    minWidth:170
                },
                {
                    title: '會員編號',
                    key: 'userno',
                    minWidth:120
                },
                {
                    title: '累計會員數',
                    key: 'usernum',
                    minWidth:120
                },
                {
                    title: '登入次數',
                    key: 'ltimes',
                    minWidth:110
                },
                {
                    title: '平均在線時間',
                    key: 'duration',
                    minWidth:130
                },
                {
                    title: '品酒發文人數',
                    key: 'evanum',
                    minWidth:130
                },
                {
                    title: '迴文人數',
                    key: 'evarenum',
                    minWidth:110
                },
                {
                    title: '訂單數',
                    key: 'ordernum',
                    minWidth:105
                },
                {
                    title: '訂單金額',
                    key: 'totalmoney',
                    minWidth:105
                },
                {
                    title: '平均訂單金額',
                    key: 'avgmoney',
                    minWidth:130
                },
                {
                    title: '待出貨訂單',
                    key: 'dchnum',
                    minWidth:120
                },
                {
                    title: '待出貨訂單金額',
                    key: 'dchmoney',
                    minWidth:140
                },
                {
                    title: '平均出貨天數',
                    key: 'avgchdays',
                    minWidth:140
                },
                {
                    title: '負擔運費總額(含退貨)',
                    key: 'yunfee',
                    minWidth:180
                },
            ],
            data1: [],
            selectData:'門市'
        }
    },
    methods:{
        
    }
}
</script>
<style scoped>


</style>
