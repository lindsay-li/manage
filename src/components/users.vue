<template>
<div class="wrappar">
    <!-- <div class="_title">用戶信息</div> -->
    <div class="nav">
        <div class="option">
            <span>用戶名稱：</span>
            <Input type="text" style="width:160px" v-model="searchData.user"/>
        </div>
        <div class="option">
            <span>用户ID：</span>
            <Input type="text" name="time" style="width:160px" v-model="searchData.id"/>
        </div>
        <div class="option">
            <span>手機號碼：</span>
            <Input type="text"  style="width:160px" v-model="searchData.phone"/>
        </div>
        <!-- <div class="option">
            <span>類型：</span>
            <Input type="text" name="time" style="width:160px"/>
        </div> -->
        <div class="serch" @click='search'>查詢</div>
    </div>
    <div class="goods">
        <Table border  :columns="columns1" :data="data1" :loading="loading" class="post">
            <template slot="sex" slot-scope="{row,index}">
                <div>{{row.sex==0?'男':'女'}}</div>
            </template>
            <template slot="order" slot-scope="{row,index}">
                <div>{{row.order==0?'不通知':'通知'}}</div>
            </template>
            <template slot="promotion" slot-scope="{row,index}">
                <div>{{row.promotion==0?'不通知':'通知'}}</div>
            </template>
            <template slot="activity" slot-scope="{row,index}">
                <div>{{row.activity==0?'不通知':'通知'}}</div>
            </template>
            <template slot="follow_msg" slot-scope="{row,index}">
                <div>{{row.follow_msg==0?'不通知':'通知'}}</div>
            </template>
            <template slot="lock" slot-scope="{row,index}">
                <div>{{row.lock==1?'鎖定':'未認證'}}</div>
            </template>
            <template slot="action" slot-scope="{row,index}">
                <!-- <Button size="small" type="primary" @click="edit(row)">編輯</Button> -->
                <Button size="small" type="error" @click="remove(row.id)">刪除</Button>
            </template>
        </Table>
    </div>
    <div class="page">
        <!-- <div class="_btn">
            <div class="send" @click="openModel">新增</div>
        </div> -->
        <Page :total="total" show-total show-elevator prev-text='上一頁' next-text='下一頁'  @on-change="pageChange"/>
    </div>
</div>        
</template>
<script>
export default {
    data(){
        return{
            columns1: [
                {
                    title: '用戶名稱',
                    key: 'user',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:140
                },
                {
                    title: '用戶ID',
                    key: 'id',
                    minWidth:90
                },
                {
                    title: '暱稱',
                    key: 'nickname',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:140
                },
                {
                    title: '性別',
                    slot: 'sex',
                    minWidth:100
                },
                {
                    title: '生日',
                    key: 'birth',
                    minWidth:140
                },
                {
                    title:'手機',
                    key:'phone',
                    minWidth:130
                },
                {
                    title:'密碼',
                    key:'password',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:120
                },
                {
                    title:'全名',
                    key:'name',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:140
                },
                {
                    title:'郵箱',
                    key:'email',
                    minWidth:190
                },
                {
                    title:'城市',
                    key:'city',
                    minWidth:120
                },
                {
                    title:'區縣',
                    key:'district',
                    minWidth:120
                },
                {
                    title:'鄉鎮',
                    key:'towns',
                    minWidth:120
                },
                {
                    title:'詳細地址',
                    key:'address',
                    minWidth:140
                },
                {
                    title:'頭像',
                    key:'head',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:140
                },
                {
                    title:'個人簡介',
                    key:'brief',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:140
                },
                {
                    title:'註冊時間',
                    key:'create_date',
                    minWidth:150
                },
                {
                    title:'身份認證鎖定',
                    slot:'lock',
                    minWidth:130
                },
                {
                    title:'膜拜酒',
                    key:'worship',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:140
                },
                {
                    title:'訂單通知',
                    slot:'order',
                    minWidth:120
                },
                {
                    title:'商品促銷通知',
                    slot:'promotion',
                    minWidth:130
                },
                {
                    title:'活動通知',
                    slot:'activity',
                    minWidth:120
                },
                {
                    title:'關注與留言',
                    slot:'follow_msg',
                    minWidth:130
                },
                {
                    title:'黃金會員到期時間',
                    key:'gold',
                    minWidth:150
                },
                {
                    title:'白金會員到期時間',
                    key:'platinum',
                    minWidth:150
                },
                {
                    title:'微信暱稱',
                    key:'wx_nickname',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:130
                },
                {
                    title:'微信性別',
                    key:'wx_sex',
                    minWidth:120
                },
                {
                    title:'微信id',
                    key:'wx_id',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:120
                },
                {
                    title:'微信頭像',
                    key:'wx_head',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:120
                },
                {
                    title:'微信國家',
                    key:'wx_country',
                    minWidth:120
                },
                {
                    title:'微信省份',
                    key:'wx_province',
                    minWidth:120
                },
                {
                    title:'微信城市',
                    key:'wx_city',
                    minWidth:120
                },
                {
                    title:'微信更新時間',
                    key:'wx_update_date',
                    minWidth:160
                },
                {
                    title:'FaceBook暱稱',
                    key:'fb_nickname',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:140
                },
                {
                    title:'FaceBook郵箱',
                    key:'fb_email',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:140
                },
                {
                    title:'FaceBook頭像',
                    key:'fb_head',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:140
                },
                {
                    title:'FaceBook更新時間',
                    key:'fb_update_date',
                    minWidth:160
                },
                {
                    title:'LineMe暱稱',
                    key:'lm_nickname',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:140
                },
                {
                    title:'LineMe郵箱',
                    key:'lm_email',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:140
                },
                {
                    title:'LineMe頭像',
                    key:'lm_head',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:140
                },
                {
                    title:'LineMe更新時間',
                    key:'lm_update_date',
                    minWidth:160
                },
                {
                    title:'操作',
                    slot:'action',
                    fixed:'right',
                    minWidth:90
                },
            ],
            data1: [],
            total:0,
            current:0,
            propModel:false,
            loading:false,
            inputValue:{
                winery:'',
                grade:''
            },
            searchData:{
                user:'',
                id:"",
                phone:''
            }
        }
    },
    created(){
        this.getList(0)
    },
    methods:{
        getList(start){
            var data = {
                start:start,
                rows:10
            }
            this.loading = true;
            this.$http('userService','findDatas',data)
            .then(res=>{
                console.log(res)
                this.loading = false
                if(res.rows.length>0){
                    var arr = res.rows
                    for(let i =0;i<arr.length;i++){
                        arr[i].create_date =arr[i].create_date?this.$changeTime(arr[i].create_date):'';
                        arr[i].fb_update_date =arr[i].fb_update_date?this.$changeTime(arr[i].fb_update_date):'';
                        arr[i].lm_update_date =arr[i].lm_update_date?this.$changeTime(arr[i].lm_update_date):'';
                        arr[i].wx_update_date =arr[i].wx_update_date?this.$changeTime(arr[i].wx_update_date):'';
                        arr[i].platinum =arr[i].platinum?this.$changeTime(arr[i].platinum):'';
                        arr[i].gold =arr[i].gold?this.$changeTime(arr[i].gold):'';
                    }
                    this.data1 = arr;
                    this.total = res.total;
                }
            })
        },
        remove (id) {
            this.$Modal.confirm({
                title: '警告',
                content: '<h3>此操作將刪除數據，是否繼續？</h3>',
                onOk: () => {
                     var data = {id:id};
                    this.$http('userService','deleteData',data)
                    .then(res=>{
                        if(res.result == 'success'){
                            this.$Message.success('刪除成功');
                            this.getList(this.current);
                        }else{
                            this.$Message.error('操作失敗');
                        }
                    })
                },
                onCancel: () => {
                }
            })  
        },
        edit(row){

        },
        search(){
            var data = {};
            if(this.searchData.user){
                data.user = this.searchData.user
            }
            if(this.searchData.id){
                data.id = this.searchData.id
            }
            if(this.searchData.phone){
                data.phone = this.searchData.phone
            }
            data.start =0
            data.rows = 10
            this.loading = true;
            this.$http('userService','findDatas',data)
            .then(res=>{
                console.log(res)
                this.loading = false
                if(res.rows.length>0){
                    var arr = res.rows
                    for(let i =0;i<arr.length;i++){
                        arr[i].create_date =arr[i].create_date?this.$changeTime(arr[i].create_date):'';
                        arr[i].fb_update_date =arr[i].fb_update_date?this.$changeTime(arr[i].fb_update_date):'';
                        arr[i].lm_update_date =arr[i].lm_update_date?this.$changeTime(arr[i].lm_update_date):'';
                        arr[i].wx_update_date =arr[i].wx_update_date?this.$changeTime(arr[i].wx_update_date):'';
                        arr[i].platinum =arr[i].platinum?this.$changeTime(arr[i].platinum):'';
                        arr[i].gold =arr[i].gold?this.$changeTime(arr[i].gold):'';
                    }
                    this.data1 = arr;
                    this.total = res.total;
                }
            })
        },
        newAdd(){
            if(!this.inputValue.grade || !this.inputValue.winery){
                this.$Message.warning('請輸入信息');
                return;
            }
            var data = {
                grade:this.inputValue.grade,
                winery:this.inputValue.winery
            }
            this.$http('alcoholWineryService','addOrUpdate',data)
            .then(res=>{
                this.propModel = false;
                if(res.result == 'success'){
                    this.$Message.success('添加成功');
                    this.getList(0);
                }else{
                    this.$Message.error(res.message);
                }
            })
        },
        pageChange(index){ //切換頁數
            this.current = index==1?0:(index-1)*10;
            this.getList(this.current);
        },
        openModel(){
            // this.propModel = true;
        },
        closeModel(){
            this.propModel = false;
        },
    }  
}
</script>
<style scoped>
@import '../../static/title.css';
.wrapper{
    position: relative;
}
.page{
    justify-content: flex-end;
}
/* .page{
    justify-content: space-between;
} */
._box{
    width: 360px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -125px 0 0 -150px;
    border-radius: 4px;
    background-color: #fff;
}
.contant{
    width: 90%;
    margin: 0 auto;
}
.btns{
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 30px;
    position: absolute;
    bottom: 20px;
}
.cancel,
.sure{
    width: 136px;
    height:40px;
    line-height: 40px; 
}
.sure{
    margin-left: 20px;
}
.tit{
    width: 100px;
    height: 36px;
    background-color: #009688;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 36px;
    margin-left: 20px;
    margin-top: 30px;
    margin-bottom: 30px;
}
table td{
    height: 45px;
}
</style>
