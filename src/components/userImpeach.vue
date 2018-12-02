<template>
<div class="wrappar">
    <div class="title">用户检举</div>
    <div class="nav">
        <div class="option options">
            <span>分类：</span>
            <Select v-model="select_model" >
                <Option v-for="item in select_list" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
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
                    title: '品酒检举',
                    key: 'order1',
                    minWidth:200
                },
                {
                    title: '回文检举',
                    key: 'order2',
                    minWidth:200
                },
            ],
            data1: [
                {
                    order1: '',
                    order2: '',
                    order3: ''
                },
                {
                    order1: '',
                    order2: '',
                    order3: ''
                },
                {
                    order1: '',
                    order2: '',
                    order3: ''
                },
                {
                    order1: '',
                    order2: '',
                    order3: ''
                },
                {
                    order1: '',
                    order2: '',
                    order3: ''
                },
            ],
           select_model:'月总',
           select_list:[
               {
                   value:'月总',
                   label:'月总'
               },
               {
                   value:'前十文章',
                   label:'前十文章'
               },
               {
                   value:'最新文章',
                   label:'最新文章'
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
