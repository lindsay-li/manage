<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>分類：</span>
            <Select v-model="inputValue.tag" style="width:160px">
                <Option v-for="item in select_List" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
        <div class="option">
            <span>開始時間：</span>
            <DatePicker type="date" v-model="inputValue.startdate" placeholder="選擇時間" style="width: 160px"></DatePicker>
        </div>
        <div class="option">
            <span>結束時間：</span>
            <DatePicker type="date" v-model="inputValue.enddate" placeholder="選擇時間" style="width: 160px"></DatePicker>
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
                    minWidth:145
                },
                {
                    title: '文章名稱',
                    key: 'title',
                    minWidth:160
                },
                {
                    title: '點贊數',
                    key: 'dznum',
                    minWidth:100
                },
                {
                    title: '排重點閱',
                    key: 'usernum',
                    minWidth:110
                },
                {
                    title: '留言次數',
                    key: 'lynum',
                    minWidth:110
                },
                
            ],
            data1: [],
            total:0,
            current:0,
            loading:false,
            inputValue:{
                startdate:'',
                enddate:'',
                tag:0
            },
            select_List:[
                {value:1,label:'生活'},
                {value:2,label:'酒莊'},
                {value:3,label:'活動'},
                {value:4,label:'深度'},
                {value:5,label:'大師'},
                {value:6,label:'特色'},
                {value:7,label:'名人'},
            ],
            type:1    //type=1 為全部 =2位搜索結果
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
            this.$http('statsDataServiceImpl','findArticleDatas',data)
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
            if(this.type==1){
                this.getList(this.current);
            }else{
                this.serchData(this.current);
            }
            
        },
        serchData(start){
            if(!this.inputValue.tag){
                this.$Message.error('文章類型不能為空');
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
                tag:parseInt(this.inputValue.tag),
                startdate:times(this.inputValue.startdate),
                enddate:times(this.inputValue.enddate),
                start:start,
                rows:10
            };
            this.loading = true;
            this.$http('statsDataServiceImpl','findArticleDatas',data)
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
