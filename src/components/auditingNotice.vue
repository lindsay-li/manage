<template>
<div class="wrappar">
    <div class="nav">
        <div class="titles">公告&广告</div>
    </div>
    <div class="notice">
        <Table border  :columns="columns1" :data="data1"  @on-selection-change="selectChange1"></Table>
    </div>
    <div class="page">
        <Page :total="100" show-total show-elevator prev-text='上一页' next-text='下一页'/>
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
                    title: '公告种类',
                    key: 'order1',
                    minWidth:105
                },
                {
                    title: '发送用户',
                    key: 'order2',
                    minWidth:180
                },
                {
                    title: '标题',
                    key: 'order3',
                    minWidth:160
                },
                {
                    title: '发送时间',
                    key: 'order4',
                    minWidth:85
                },
                {
                    title:'结束时间',
                    key:'order5',
                    minWidth:85,
                },
                {
                    title:'内容',
                    key:'order6',
                    minWidth:85,
                },
                {
                    title:'夹带折扣卷',
                    key:'order7',
                    minWidth:105,  
                },
                {
                    title:'连接',
                    key:'order8',
                    minWidth:105,   
                },
                {
                    title:'状态',
                    key:'order9',
                    minWidth:105,   
                },
            ],
            data1: [
                {
                    order1: '公告通知',
                    order2: '全部用户',
                    order3: '法国红酒特价',
                    order4: '2019.2.2',
                    order5:'2019.3.3',
                    order6:'发到法师法发顺丰搜房网发发发发发',
                    order7:'不使用',
                    order8:'不使用',
                    order9:'待审核'
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
