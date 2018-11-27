<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>商品编号：</span>
            <input type="text" >
        </div>
        <div class="option">
            <span>数量：</span>
            <input type="text" name="phone">
        </div>
        <div class="option">
            <span>年份：</span>
            <input type="text" name="time">
        </div>
        <div class="option">
            <span>类型：</span>
            <input type="text" name="time">
        </div>
        <div class="serch">查询</div>
    </div>
    <div class="retailSales">
        <Table border  :columns="columns1" :data="data1"  class="post"></Table>
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
            columns1:[
                {
                    title: '商品编号',
                    key: 'order1',
                    minWidth:95
                },
                {
                    title: '名称',
                    key: 'order2',
                    minWidth:100
                },
                {
                    title: '数量',
                    key: 'order3',
                    minWidth:85
                },
                {
                    title: '售价',
                    key: 'order4',
                    minWidth:95
                },
                {
                    title: '年份',
                    key: 'order5',
                    minWidth:104
                },
                {
                    title:'类型',
                    key:'order6',
                    minWidth:105
                },
                {
                    title:'操作',
                    key:'order7',
                    minWidth:120
                }
            ],
            data1: [
                {
                    order1:'MS0001',
                    order2:'葡萄酒',
                    order3:'19',
                    order4:'1221',
                    order5:2015,
                    order6:'红葡萄酒',
                    order7:'门市售卖'
                }
            ],
        }
    },
    methods:{

    }
}
</script>
<style scoped>

</style>
