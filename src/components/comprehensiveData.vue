<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>會員編號：</span>
            <Input type="text" v-model="inputValue.userno" style="width:160px"/>
        </div>
        <div class="option">
            <span>開始時間：</span>
            <!-- <Input type="text" name="phone" style="width:160px"/> -->
            <DatePicker type="date" v-model="inputValue.startdate" placeholder="選擇時間" style="width: 160px"></DatePicker>
        </div>
        <div class="option">
            <span>結束時間：</span>
            <!-- <Input type="text" name="time" style="width:160px"/> -->
            <DatePicker type="date" v-model="inputValue.enddate" placeholder="選擇時間" style="width: 160px"></DatePicker>
        </div>
        <div class="serch" @click="serchData(0)">查詢</div>
    </div>
    <div class="activity">
        <Table border  :columns="columns1" :data="data1"  class="post" :loading="loading" ></Table>
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
                    key: 'ldate',
                    minWidth:170
                },
                {
                    title: '會員編號',
                    key: 'userno',
                    minWidth:120
                },
                {
                    title: '累計會員數',
                    key: 'usernum',
                    minWidth:120
                },
                {
                    title: '登入次數',
                    key: 'ltimes',
                    minWidth:110
                },
                {
                    title: '平均在線時間',
                    key: 'duration',
                    minWidth:130
                },
                {
                    title: '品酒發文人數',
                    key: 'evanum',
                    minWidth:130
                },
                {
                    title: '迴文人數',
                    key: 'evarenum',
                    minWidth:110
                },
                {
                    title: '訂單數',
                    key: 'ordernum',
                    minWidth:105
                },
                {
                    title: '訂單金額',
                    key: 'totalmoney',
                    minWidth:105
                },
                {
                    title: '平均訂單金額',
                    key: 'avgmoney',
                    minWidth:130
                },
                {
                    title: '待出貨訂單',
                    key: 'dchnum',
                    minWidth:120
                },
                {
                    title: '待出貨訂單金額',
                    key: 'dchmoney',
                    minWidth:140
                },
                {
                    title: '平均出貨天數',
                    key: 'avgchdays',
                    minWidth:140
                },
                {
                    title: '負擔運費總額(含退貨)',
                    key: 'yunfee',
                    minWidth:180
                },
            ],
            data1: [],
            total:0,
            current:0,
            loading:false,
            type:1,
            inputValue:{
                userno:'',
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
            this.$http('statsDataServiceImpl','findZhDatas',data)
            .then(res=>{
                console.log(res)
                this.loading = false;
                if(res.rows.length>0){
                    this.data1 = res.rows;
                    this.total = res.total;
                }
            })
        },
        pageChange(index){ //切換頁數
            this.current = index==1?0:(index-1)*10;
            if(this.type ==1){
                this.getList(this.current);
            }else{
                this.serchData(this.current);
            }
            
        },
        serchData(start){
            if(!this.inputValue.userno){
                this.$Message.error('會員編號不能為空');
                return;
            }
            if(!this.inputValue.startdate){
                this.$Message.error('開始時間不能為空');
                return;
            }
            if(!this.inputValue.enddate){
                this.$Message.error('結束時間不能為空');
                return;
            }
            var data = {
                userno:this.inputValue.userno,
                startdate:times(this.inputValue.startdate),
                enddate:times(this.inputValue.enddate),
                start:start,
                rows:10 
            };
            this.loading = true;
            this.$http('statsDataServiceImpl','findZhDatas',data)
            .then(res=>{
                console.log(res)
                this.type =2;
                this.loading = false;
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
