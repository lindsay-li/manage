<template>
<div class="wrappar">
    <div class="nav">
        <div class="_title">廣告審核</div>
    </div>
    <div class="notice">
        <Table border  :columns="columns1" :data="data1" @on-row-click="selectChange1">
            <template slot-scope="{row,index}" slot="type">
                <div>{{types(row.type)}}</div>
            </template>
            <template slot-scope="{row,index}" slot="status">
                <!-- <div>{{row.status==1?'待審核':'已審核'}}</div> -->
                <div>
                    <Select v-model="row.status"  @on-change="selectChange">
                        <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
            </template>
            <template slot-scope="{row,index}" slot="begin_time">
                <div>{{changeTime(row.begin_time)}}</div>
            </template>
            <template slot-scope="{row,index}" slot="end_time">
                <div>{{changeTime(row.end_time)}}</div>
            </template>
            <template slot-scope="{row,index}" slot="action">
                <Button type="error" size='small' @click="remove(row.id)">刪除</Button>
            </template>
        </Table>
    </div>
    <div class="page">
        <!-- <div class="add_goods" @click="openPropModel">新增通知</div> -->
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
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '類型',
                    slot: 'type',
                    minWidth:140
                },
                {
                    title: '廣告標題',
                    key: 'title',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:180
                },
                {
                    title: '廣告內容',
                    key: 'content',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:180
                },
                {
                    title: '鏈接',
                    key: 'a_link',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:180
                },
                {
                    title: '部分用戶ID',
                    key: 'user_ids',
                    minWidth:140
                },
                {
                    title:'發送時間',
                    slot:'begin_time',
                    minWidth:160,
                },
                {
                    title:'結束時間',
                    slot:'end_time',
                    minWidth:160,
                },
                {
                    title:'狀態',
                    slot:'status',
                    minWidth:130,
                },
                // {
                //     title:'操作',
                //     slot:'action',
                //     minWidth:90,
                // },
            ],
            data1: [],
            userList:[],
            noticeList:[],
            propModel:false,
            loading:false,
            total:0,
            current:0,
            inputValue:{
                content:'',
                type:'',
                status:"",
                title:'',
                a_link:'',
                begin_time:'',
                end_time:""
            },
            statusList:[
                {value:1,label:'待審核'},
                {value:2,label:'已審核'}
            ],
            id:''
        }
    },
    created(){
        this.getList(0);
        this.noticeList = [
            {value:1,label:'全部'},
            {value:2,label:'部分用戶'},
            ]
    },
    methods:{
        getList(start){
            var data = {
               start:start,
               rows:10 
            }
            this.loading = true;
            this.$http('advertisementService','findDatas',data)
            .then(res=>{
                console.log(res)
                this.loading = false;
                if(res.rows.length>0){
                    this.data1 = res.rows;
                    this.total = res.total;
                }
            })
        },
        openPropModel(){
            this.propModel = true;  
        },
        changeTime(time){
            if(!time){return ''}
            return this.$changeTime(time)
        },
        pageChange(index){ //切換頁數
            this.current = index==1?0:(index-1)*10;
            this.getList(this.current);
        },
        types(type){
            if(!type){return}
            var str ='';
            switch(type){
                case 1:
                   str = '全部';
                   break;
                case 2:
                   str = '部分用戶';
                   break;
            }
            return str
            
        },
        selectChange1(row){
            this.id = row.id
        },
        revise(status){ //修改狀態
            var data = {
                status:status,
                id:this.id
            }
            this.$http('advertisementService','addOrUpdate',data)
            .then(res=>{
                if(res.result=='success'){
                    this.$Message.success('修改成功');
                    this.getList(this.current);
                    this.id = '';
                }else{
                    this.$Message.error('操作失敗');
                }
            })
        },
        selectChange(value){
            console.log(value)
            this.revise(value)
        },
    }
   
}
</script>
<style scoped>
.page{
    justify-content: flex-end;
}
._title{
    width: 100%;
    height: 36px;
    background-color: #2D8CF0;
    border-radius: 4px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    line-height: 36px;
    /* margin-bottom: 30px; */
}
.n_box{
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -250px 0 0 -300px;
    width: 600px;
    height: 500px;
    background-color:#fff;
    border-radius: 4px; 
}
.n_content{
    width: 90%;
    margin: 0 auto;
}
.n_title{
    width: 100%;
    height: 36px;
    background-color: #009688;
    border-radius: 4px;
    color: #fff;
    line-height: 36px;
    text-align: center;
    margin: 20px 0;
}
table,table tr th, table tr td { border:1px solid #E0E0E0;text-align: center;font-size: 14px; }
table{
    border-collapse: collapse;
    padding:2px;
}
table tr td:first-child{
    width: 120px;
}
table tr td{
    height: 40px;
}
._btns{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 25px;
}
._btns .sure,
._btns .cancel{
    width: 110px;
    height: 32px;
    line-height: 32px;
}
._btns .cancel{
    margin-left: 20px;
}
</style>
