<template>
<div class="wrappar">
    <div class="title">成就</div>
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
                    title: '用戶編號',
                    key: 'order1',
                    minWidth:105
                },
                {
                    title: '登陸成就',
                    key: 'order2',
                    minWidth:165
                },
                {
                    title: '瓶酒發文成就',
                    key: 'order3',
                    minWidth:165
                },
                {
                    title: '任意迴文成就',
                    key: 'order4',
                    minWidth:165
                }
            ],
            data1: [
                {
                    order1: '200元',
                    order2: '2019.05.18-2019.05.21',
                    order3: '20%',
                    order4:'所有',
                    order5:'充值送券',
                },
                {
                    order1: '200元',
                    order2: '2019.05.18-2019.05.21',
                    order3: '20%',
                    order4:'所有',
                    order5:'充值送券',
                },
                {
                    order1: '200元',
                    order2: '2019.05.18-2019.05.21',
                    order3: '20%',
                    order4:'所有',
                    order5:'充值送券',
                    
                },
                {
                    order1: '200元',
                    order2: '2019.05.18-2019.05.21',
                    order3: '20%',
                    order4:'所有',
                    order5:'充值送券',
                    
                },
                {
                    order1: '200元',
                    order2: '2019.05.18-2019.05.21',
                    order3: '20%',
                    order4:'所有',
                    order5:'充值送券',
                    
                },
            ],
        }
    },
    methods:{
        
    }
}
</script>
<style scoped>
.title{
    width: 100%;
    height: 50px;
    background-color: #009688;
    border-radius: 4px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    line-height: 50px;
    margin-bottom: 30px;
}

</style>
