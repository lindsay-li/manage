<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>開始時間：</span>
            <!-- <Input type="text" name="phone" style="width:160px"/> -->
            <DatePicker type="date" v-model="inputValue.startdate" placeholder="选择时间" style="width: 160px"></DatePicker>
        </div>
        <div class="option">
            <span>結束時間：</span>
            <!-- <Input type="text" name="time" style="width:160px"/> -->
            <DatePicker type="date" v-model="inputValue.enddate" placeholder="选择时间" style="width: 160px"></DatePicker>
        </div>
        <div class="serch" @click="serchData(0)">查詢</div>
    </div>
    <div class="activity">
        <Table border  :columns="columns1" :data="data1"  class="post" :loading="loading"></Table>
    </div>
    <div class="page">
        <Page :total="total" show-total show-elevator prev-text='上一頁' next-text='下一頁' @on-change="pageChange"/>
    </div> 
</div>   
</template>
<script>
import {times} from '../until/tool.js'
export default {
    data(){
        return{
            columns1: [
                {
                    title: '時間',
                    key: 'datestr',
                    minWidth:140
                },
                {
                    title: '商品數量',
                    key: 'protypenum',
                    minWidth:110
                },
                {
                    title: '售出商品數量',
                    key: 'pronum',
                    minWidth:130
                },
                {
                    title: '營收總額',
                    key: 'ordermoney',
                    minWidth:110
                },
                {
                    title: '贩售商品數量',
                    key: 'pronum',
                    minWidth:130
                },
                {
                    title: '使用折扣數量',
                    key: 'yhqnum',
                    minWidth:130
                },
                {
                    title: '使用葡萄折扣金额',
                    key: 'ptmoney',
                    minWidth:150
                },
                {
                    title: '使用折扣券数量',
                    key: 'yhqnum',
                    minWidth:140
                },
                {
                    title: '待出货订单金额',
                    key: 'dchmoney',
                    minWidth:140
                },
                {
                    title: '待出货订单',
                    key: 'dccnum',
                    minWidth:130
                },
                {
                    title: '平均订单金额',
                    key: 'avgmoney',
                    minWidth:130
                },
                {
                    title: '订单数',
                    key: 'ordernum',
                    minWidth:130
                },
                {
                    title: '订单金额',
                    key: 'ordermoney',
                    minWidth:130
                }
                
            ],
            data1: [],
            total:0,
            current:0,
            type:1,
            loading:false,
            inputValue:{
                startdate:'',
                enddate:''
            }
        }
    },
    created(){
        this.getList(0);
        this.type = 1
    },
    methods:{
        getList(start){
            var data = {
               start:start,
               rows:10 
            }
            this.loading = true;
            this.$http('statsDataServiceImpl','findPuductDatas',data)
            .then(res=>{
                console.log(res)
                this.loading = false;
                if(res.rows.length>0){
                    this.data1 = res.rows;
                    this.total = res.total;
                }
            })
        },
        pageChange(index){ //切换页数
            this.current = index==1?0:(index-1)*10;
            if(this.type==1){
                this.getList(this.current);
            }else{
                this.serchData(this.current);
            }
        },
        serchData(start){
            if(!this.inputValue.startdate){
                this.$Message.error('开始时间不能为空');
                return;
            }
            if(!this.inputValue.enddate){
                this.$Message.error('结束时间不能为空');
                return;
            }
            var data = {
                startdate:times(this.inputValue.startdate),
                enddate:times(this.inputValue.enddate),
                start:start,
                rows:10 
            };
            this.loading = true;
            this.$http('statsDataServiceImpl','findPuductDatas',data)
            .then(res=>{
                this.loading = false;
                this.type = 2
                console.log(res)
                if(res.rows.length>0){
                    this.data1 = res.rows;
                    this.total = res.total;
                }
            })
        }
    }
}
</script>
<style scoped>


</style>
