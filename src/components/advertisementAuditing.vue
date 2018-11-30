<template>
<div class="wrappar">
    <div class="nav">
        <div class="titles">公告&廣告</div>
    </div>
    <div class="advertisement">
        <Table border  :columns="columns1" :data="data1"  @on-selection-change="selectChange1"></Table>
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
                    title: '廣告告種類',
                    key: 'order1',
                    minWidth:105
                },
                {
                    title: '發送用戶',
                    key: 'order2',
                    minWidth:180
                },
                {
                    title: '標題',
                    key: 'order3',
                    minWidth:160
                },
                {
                    title: '發送時間',
                    key: 'order4',
                    minWidth:85
                },
                {
                    title:'結束時間',
                    key:'order5',
                    minWidth:85,
                },
                {
                    title:'內容',
                    key:'order6',
                    minWidth:85,
                },
                {
                    title:'夾帶折扣卷',
                    key:'order7',
                    minWidth:105,  
                },
                {
                    title:'連接',
                    key:'order8',
                    minWidth:105,   
                },
                {
                    title:'狀態',
                    key:'order9',
                    minWidth:105,   
                },
            ],
            data1: [
                {
                    order1: '廣告通知',
                    order2: '全部用戶',
                    order3: '法國紅酒特價',
                    order4: '2019.2.2',
                    order5:'2019.3.3',
                    order6:'發到法師法發順豐搜房網發發發發發',
                    order7:'不使用',
                    order8:'不使用',
                    order9:'待審核'
                },
                
            ],
        }
    },
    methods:{
        selectChange1(){

        },
    }
   
}
</script>
<style scoped>

.titles{
    width: 100%;
    height: 36px;
    background-color: #009688;
    border-radius: 4px;
    line-height: 36px;
    text-align: center;
    color: #fff;
}

</style>
