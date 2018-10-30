<template>
 <div class="contant">
     <div class="title">即时数据</div>
    <Table :columns="columns1" :data="data1" border :row-class-name="rowClassName" size='large' height='229'></Table>
 </div>   
</template>
<script>
export default {
   data () {
        return {
            columns1: [
                {
                    title: '今日订单',
                    key: 'order1'
                },
                {
                    title: '今日订单总金额',
                    key: 'order2'
                },
                {
                    title: '总商品数',
                    key: 'order3'
                }
            ],
            data1: [
                {
                    order1: '7单',
                    order2: 'xxx',
                    order3: 33  
                },
                {
                    order1: '零库存商品数',
                    order2: '待出货订单数',
                    order3: '平均出货天数'   
                },
                {
                    order1: '4单',
                    order2: 'xxx',
                    order3: 33                   
                }
            ]
        }
    } ,
    methods: {
            rowClassName (row, index) {
                if (index === 1) {
                    return 'demo-table-info-row';
                } 
                return '';
            }
        }
}
</script>
<style scoped>
.contant{
    width: 100%;
    display: flex;
    flex-direction: column;
}
.title{
    width: 100%;
    height: 50px;
    background-color: #2d8cf0;
    border-radius: 4px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    line-height: 50px;
    margin-bottom: 30px;
}
</style>
