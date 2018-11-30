<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>會員編號：</span>
            <input type="text" >
        </div>
        <div class="option">
            <span>酒名：</span>
            <input type="text" name="phone">
        </div>
        <div class="option">
            <span>數量：</span>
            <input type="text" name="time">
        </div>
        <div class="serch">查詢</div>
    </div>
    <div class="car">
        <Table border  :columns="columns1" :data="data1"  @on-selection-change="selectChange1" class="post"></Table>
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
                    title: '會員編號',
                    key: 'order1'
                },
                {
                    title: '用戶名稱、暱稱',
                    key: 'order2'
                },
                {
                    title: '酒名',
                    key: 'order3'
                },
                {
                    title: '評分',
                    key: 'order4'
                },
                {
                    title: '數量',
                    key: 'order5'
                },
                {
                    title:'市場估值',
                    key:'order6',
                    
                },
                {
                    title:'平均成本',
                    key:'order7'
                },
                {
                    title:'寶貝價格',
                    key:'order8'
                },
                {
                    title:'損益',
                    key:'order9'
                },
            ],
            data1: [
                {
                    order1:'發哥',
                    order2:'葡萄酒',
                    order3:'1',
                    order4:'12',
                    order5:'紅酒',
                    order6:'www.wdwd.ddd',
                    order9:''
                }
            ]
        }
    },
    methods:{
        remove (index) {
            this.data1.splice(index, 1);
        },
        selectChange1(selection){
            console.log(selection)
        },
        change(){
            console.log(111)
        }
    }  
}
</script>
<style scoped>

</style>
