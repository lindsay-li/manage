<template>
<div class="wrappar">
    <div class="title">文章數據</div>
    <div class="nav">
        <div class="option">
            <span>分類：</span>
            <Select v-model="select_model" style="width:200px">
                <Option v-for="item in select_List" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
        <div class="option">
            <span>開始時間：</span>
            <DatePicker type="date" placeholder="Select date" ></DatePicker>
        </div>
        <div class="option">
            <span>結束時間：</span>
            <DatePicker type="date" placeholder="Select date" ></DatePicker>
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
                    title: '文章名稱',
                    key: 'order2',
                    minWidth:160
                },
                {
                    title: '點贊率',
                    key: 'order3',
                    minWidth:100
                },
                {
                    title: '排重點閱',
                    key: 'order4',
                    minWidth:110
                },
                {
                    title: '收藏人數',
                    key: 'order5',
                    minWidth:110
                },
                {
                    title: '分享次數',
                    key: 'order6',
                    minWidth:110
                },
                {
                    title: '評分',
                    key: 'order7',
                    minWidth:100
                },
                {
                    title: '留言次數',
                    key: 'order8',
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
            select_model:'月總',
            select_List:[
                {
                    value:'月總',
                    label:'月總'
                },
                {
                    value:'日總',
                    label:'日總'
                },
                {
                    value:'前十文章',
                    label:'前十文章'
                },
                {
                    value:'最新文章',
                    label:'最新文章'
                }
            ]
        }
    },
    methods:{
        
    }
}
</script>
<style scoped>


</style>
