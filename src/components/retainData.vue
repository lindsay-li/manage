<template>
<div class="wrappar">
    <div class="title">留存數據</div>
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
                    title: '創建人數',
                    key: 'order2',
                    minWidth:120
                },
                {
                    title: '次日留存',
                    key: 'order3',
                    minWidth:110
                },
                {
                    title: '三日留存',
                    key: 'order4',
                    minWidth:110
                },
                {
                    title: '四日留存',
                    key: 'order5',
                    minWidth:110
                },
                {
                    title: '五日留存',
                    key: 'order6',
                    minWidth:110
                },
                {
                    title: '七日留存',
                    key: 'order7',
                    minWidth:110
                },
                {
                    title: '十五日留存',
                    key: 'order8',
                    minWidth:120
                },
                {
                    title: '三十日留存',
                    key: 'order9',
                    minWidth:120
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
        }
    },
    methods:{
        
    }
}
</script>
<style scoped>


</style>
