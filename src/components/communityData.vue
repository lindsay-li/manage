<template>
<div class="wrappar">
    <div class="title">社群數據</div>
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
                    title: '新增貼文數',
                    key: 'order2',
                    minWidth:120
                },
                {
                    title: '新增貼文人數',
                    key: 'order3',
                    minWidth:130
                },
                {
                    title: '迴文次數',
                    key: 'order4',
                    minWidth:110
                },
                {
                    title: '活躍迴文人數',
                    key: 'order5',
                    minWidth:130
                },
                {
                    title: '點贊次數',
                    key: 'order6',
                    minWidth:110
                },
                {
                    title: '文章瀏覽數',
                    key: 'order7',
                    minWidth:120
                },
                {
                    title: '最高文章瀏覽數',
                    key: 'order8',
                    minWidth:140
                },
                {
                    title: '評價人數',
                    key: 'order9',
                    minWidth:110
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
