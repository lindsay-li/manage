<template>
<div class="coupon">
    <div class="_title">多日活動</div>
    <div class="content">
        <Table border  :columns="columns1" :data="data1" :loading="loading">
            <template slot="status" slot-scope="{row,index}">
                <div>{{getstatus(row.status)}}</div>
            </template>
            <template slot="action" slot-scope="{row,index}">
                <Button size="small" type="primary" @click="edit(row)">編輯</Button>
                <Button size="small" type="error" @click="remove(row.id)">刪除</Button>
            </template>
        </Table>
    </div>
    <div class="page">
        <div class="_btn">
            <div class="send" @click="openModel">新增活動</div>
            <!-- <div class="b_delete" >批量刪除</div> -->
        </div>
        <Page :total="total" show-total show-elevator prev-text='上一頁' next-text='下一頁' @on-change="pageChange"/>
    </div>
    <div class="prop_model" v-show="propModel">
        <div class="_box">
            <div class="contant">
                <div class="tit">添加多日活動</div>
                <div class="list"style="width:100%;">
                    <table style="width:100%;">
                        <tr>
                            <td style="text-align:right">活動名稱:</td>
                            <td>
                                <Input v-model="inputValue.name" type="text" placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">開始時間:</td>
                            <td>
                                <DatePicker v-model="inputValue.start_time" type="date" placement="bottom-end" placeholder="選擇日期" style="width: 300px"></DatePicker>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">結束時間:</td>
                            <td>
                                <DatePicker v-model="inputValue.end_time" type="date" placement="bottom-end" placeholder="選擇日期" style="width: 300px"></DatePicker>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">紅利點數:</td>
                            <td>
                                <Input v-model="inputValue.nums" type="text" placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        
                        <tr>
                            <td style="text-align:right">獎勵折扣券:</td>
                            <td>
                                <!-- <Input v-model="inputValue.coupon_log"  type="text" placeholder="點擊輸入" style="width: 300px" /> -->
                                <Select v-model="inputValue.coupon_log" style="width:300px">
                                    <Option v-for="item in coupon_list" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                                </Select>
                            </td>
                        </tr>
                        
                        <tr>
                            <td style="text-align:right">活動描述:</td>
                            <td>
                                <Input v-model="inputValue.describe"  type="textarea" placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="btns">
                    <div class="cancel" @click='closeModel'>取消</div>
                    <div class="sure" @click="sureBtn">確定</div>
                </div>
            </div>
        </div>
    </div>
</div>    
</template>
<script>
export default {
    name:'coupon',
    data(){
        return{
            columns1: [
                {
                    title: '活動名稱',
                    key: 'name',
                    minWidth:140
                },
                {
                    title: '開始時間',
                    minWidth:160,
                    key: 'start_time'
                },
                {
                    title: '結束時間',
                    minWidth:160,
                    key: 'end_time'
                },
                {
                    title: '紅利點數',
                    key: 'nums',
                    minWidth:120
                },
                {
                    title: '獎勵折扣券',
                    key: 'discount_name',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:140
                },
                {
                    title: '獎勵折扣券ID',
                    key: 'coupon_log',
                    minWidth:140
                },
                {
                    title: '活動描述',
                    key: 'describe',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:150
                },
                {
                    title: '狀態',
                    slot: 'status',
                    minWidth:120
                },
                {
                    title:'操作',
                    slot:'action',
                    width:140
                }
            ],
            data1: [],
            loading:false,
            current:0,
            total:0,
            propModel:false,
            inputValue:{
                coupon_log:'',
                start_time:"",
                end_time:"",
                name:'',
                nums:'',
                describe:""
            },
            id:'',
            coupon_list:[]
        }
    },
    created(){
        this.getcoupon();
        this.getList(0);
    },
    methods:{
        getList(start){
            var data = {
                start:start,
                rows:10
            }
            this.loading = true;
            this.$http('dayActivitiesService','findDatas',data)
            .then(res=>{
                console.log(res)
                this.loading = false;
                if(res.rows){
                    var arr = res.rows;
                    for(let i =0;i<arr.length;i++){
                        console.log(1)
                        arr[i].start_time = this.$changeTime(arr[i].start_time);
                        arr[i].end_time = this.$changeTime(arr[i].end_time);
                    }
                    this.total = res.total;
                    this.data1 = arr;
                }
            })
            .catch(err=>{
                this.loading = false;
            })
        },
         getcoupon(){
            var data = {
                start:0
            }
            this.$http('couponLogService','findDatas',data)
            .then(res=>{
                console.log(res)
                if(res.rows){
                    var arr = res.rows;
                    this.coupon_list = [];
                    for(let i =0;i<arr.length;i++){
                        var obj = {};
                        obj.label = arr[i].discount_name;
                        obj.value = arr[i].id;
                        this.coupon_list.push(obj)
                    }
                }
            })
        },
        getstatus(id){
            if(!id && id !=0){return ''}
            if(id==0){
                return '未開始'
            }else if(id ==1){
                return '進行中'
            }else if(id==2){
                return '已結束'
            }
        },
        pageChange(index){ //切換頁數
            this.current = index==1?0:(index-1)*10;
            this.getList(this.current);
        },
        openModel(){
            this.propModel = true;
        },
        closeModel(){
            this.propModel = false;
        },
        edit(row){ //編輯
            this.inputValue={
                coupon_log:row.coupon_log,
                start_time:row.start_time,
                end_time:row.end_time,
                name:row.name,
                nums:row.nums,
                describe:row.describe
            }
            this.propModel = true
            this.id = row.id;
        },
        sureBtn(){ //增加
            console.log(this.inputValue)
            var value = this.inputValue;
            value.nums = parseInt(value.nums);
            value.start_time = this.$changeTime(value.start_time);
            value.end_time = this.$changeTime(value.end_time);
            value.status = 0;
            if(this.id){
                value.id = this.id
            }
            var data = value;
            this.$http('dayActivitiesService','addOrUpdate',data)
            .then(res=>{
                this.propModel = false;
                if(res.result == 'success'){
                    if(this.id){
                        this.$Message.success('修改成功');
                    }else{
                        this.$Message.success('新增成功');
                    }
                    this.getList(this.current);
                    this.id = '';
                    this.inputValue={
                        coupon_log:'',
                        start_time:'',
                        end_time:'',
                        name:'',
                        nums:'',
                        describe:''
                    }
                }else{
                    this.$Message.error(res.message);
                }
            })
        },
        remove (id) {
            this.$Modal.confirm({
                title: '警告',
                content: '<h3>此操作將刪除數據，是否繼續？</h3>',
                onOk: () => {
                     var data = {id:id};
                    this.$http('dayActivitiesService','deleteData',data)
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
    }
}
</script>
<style scoped>
@import '../../static/title.css';
.page{
    justify-content: space-between;
}
.tit{
    width: 430px;
    height: 36px;
    background-color: #009688;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 36px;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 30px;
}
._box{
    width: 600px;
    height: 460px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -230px 0 0 -300px;
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
table tr td{
    height: 40px;
    text-align: center;
}
</style>
