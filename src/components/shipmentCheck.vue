<template>
<div class="wrappar">
    <div class="_title">出貨資料核對</div>
    <div class="nav">
        <div class="option">
            <span>開始時間：</span>
            <DatePicker type="date" v-model="inputValue.startTime" placeholder="選擇時間" style="width: 160px"></DatePicker>
        </div>
        <div class="option">
            <span>結束時間：</span>
            <DatePicker type="date" v-model="inputValue.endTime" placeholder="選擇時間" style="width: 160px"></DatePicker>
        </div>
        <div class="serch" @click="serchData(0)">查詢</div>
    </div>
    <div class="handle">
        <Table border  :columns="columns1" :data="data1"  class="post">
            <template slot-scope="{ row, index }" slot="type">
                <div v-if="row.type">{{row.type==3?'已出貨':''}}</div>
            </template>
        </Table>
    </div>
    <div class="page">
        <Page :total="total" show-total show-elevator prev-text='上一頁' next-text='下一頁' @on-change="pageChange"/>
    </div>
</div>   
</template>
<script>
export default {
    data(){
        return{
            columns1: [
                {
                    title: '訂單日期',
                    key: 'time',
                    minWidth:170
                },
                {
                    title: '收貨日期',
                    key: 'order1',
                    minWidth:170
                },
                {
                    title: '訂單編號',
                    key: 'id',
                    width:110
                },
                {
                    title: '配送編號',
                    key: 'delivery_num',
                    minWidth:120
                },
                {
                    title: '數量',
                    key: 'num',
                    minWidth:100
                },
                {
                    title: '商品名稱',
                    key: 'title',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:160
                },
                {
                    title: '商品編號',
                    key: 'alcohol_id',
                    minWidth:110
                },
                {
                    title: '銷售金額',
                    key: 'total_price',
                    minWidth:120
                },
                {
                    title: '發票編號',
                    key: 'order2',
                    minWidth:120
                },
                {
                    title: '訂單狀態',
                    slot: 'type',
                    width:120
                },
            ],
            data1: [],
            loading:false,
            total:0,
            current:0,
            statusData:'',
            id:'',
            inputValue:{
                endTime:'',
                startTime:''
            },
            type:1
        }
    },
    created(){
        this.getList(0)
        this.type = 1
    },
    methods:{
        getList(start){
            var data = {
               start:start,
               type:3,
               rows:10 
            }
            this.loading = true;
            this.$http('orderInfoService','findDatas',data)
            .then(res=>{
                console.log(res)
                this.loading = false;
                if(res.rows){
                    var arr = res.rows
                    for(let i=0;i<arr.length;i++){
                        arr[i].time = arr[i].time?this.$changeTime(arr[i].time):''
                    }
                    this.data1 = arr;
                    this.total = res.total;
                }
            })
        },
        pageChange(index){ //切換頁數
            this.current = index==1?0:(index-1)*10;
            // this.getList(this.current);
            if(this.type==1){
                this.getList(this.current);
            }else{
                this.serchData(this.current);
            }
            
        },
        serchData(start){
            if(!this.inputValue.startTime){
                this.$Message.error('開始時間不能為空');
                return;
            }
            if(!this.inputValue.endTime){
                this.$Message.error('結束時間不能為空');
                return;
            }
            var data = {
                startTime:times(this.inputValue.startTime),
                endTime:times(this.inputValue.endTime),
                start:start,
                type:3,
                rows:10 
            };
            this.loading = true;
            this.$http('orderInfoService','findDatas',data)
            .then(res=>{
                this.loading = false;
                this.type = 2
                console.log(res)
                if(res.rows){
                    for(let i=0;i<arr.length;i++){
                        arr[i].time = arr[i].time?this.$changeTime(arr[i].time):''
                    }
                    this.data1 = arr;
                    this.total = res.total;
                }
            })
        }
    }
}
</script>
<style scoped>
._title{
    width: 100%;
    height: 36px;
    background-color: #2D8CF0;
    border-radius: 4px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    line-height: 36px;
    margin-bottom: 30px;
}
</style>
