<template>
<div class="wrappar">
    <div class="title">商品數據</div>
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
                    title: '商品數量',
                    key: 'order2',
                    minWidth:110
                },
                {
                    title: '營收總額',
                    key: 'order3',
                    minWidth:110
                },
                {
                    title: '販售商品數量',
                    key: 'order4',
                    minWidth:130
                },
                {
                    title: '使用折扣數量',
                    key: 'order5',
                    minWidth:130
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
            select_model:'酒品',
            select_List:[
                {
                    value:'酒品',
                    label:'酒品'
                },
                {
                    value:'類型',
                    label:'類型'
                },
                {
                    value:'國家',
                    label:'國家'
                },
                {
                    value:'產品',
                    label:'產品'
                },
                {
                    value:'酒莊',
                    label:'酒莊'
                },
            ]
        }
    },
    methods:{
        
    }
}
</script>
<style scoped>


</style>
