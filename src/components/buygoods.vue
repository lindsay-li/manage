<template>
<div class="coupon">
    <div class="_title">加買商品</div>
    <div class="content">
        <Table border  :columns="columns1" :data="data1" :loading="loading">
            <template slot="status" slot-scope="{row}">
                <div>{{row.status==1?'激活':'默認'}}</div>
            </template>
            <template slot="action" slot-scope="{row}">
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
                <div class="tit">加買商品</div>
                <div class="list" style="width:100%;">
                    <table style="width:100%;">
                        <tr>
                            <td style="text-align:right">消費金額:</td>
                            <td>
                                <InputNumber :min="0" v-model="inputValue.condition" style="width: 300px"></InputNumber>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">價格:</td>
                            <td>
                                <InputNumber :min="0" v-model="inputValue.price" style="width: 300px"></InputNumber>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">商品ID:</td>
                            <td>
                                <InputNumber :min="0" v-model="inputValue.alcohol_id" style="width: 300px"></InputNumber>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">狀態:</td>
                            <td>
                                <Select v-model="inputValue.status" style="width:300px">
                                    <Option v-for="item in statuList" :value="item.value" :key="item.value" :disabled='item.disabled'>{{ item.label }}</Option>
                                </Select>
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
                    title: '消費金額',
                    key: 'condition',
                    minWidth:120
                },
                {
                    title: '價格',
                    minWidth:120,
                    key: 'price'
                },
                {
                    title: '商品ID',
                    minWidth:140,
                    key: 'alcohol_id'
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
                    title: '狀態',
                    minWidth:130,
                    slot: 'status'
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
                condition:0,
                end_time:"",
                price:0,
                status:'',
                alcohol_id:0,
                start_time:''
            },
            statuList:[
                {
                    value:0,
                    label:'默認'
                },
                {
                    value:1,
                    label:'激活'
                }
            ],
            id:''
        }
    },
    created(){
        this.getList(0);
    },
    methods:{
        getList(start){
            var data = {
                start:start,
                rows:10
            }
            this.loading = true;
            this.$http('alcoholFullReductionService','findDatas',data)
            .then(res=>{
                console.log(res)
                this.loading = false;
                if(res.rows){
                    var arr = res.rows;
                    for(let i =0;i<arr.length;i++){
                        arr[i].end_time =arr[i].end_time?this.$changeTime(arr[i].end_time):"";
                        arr[i].start_time = arr[i].start_time?this.$changeTime(arr[i].start_time):'';
                    }
                    this.total = res.total;
                    this.data1 = arr;
                }
            })
            .catch(err=>{
                this.loading = false;
            })
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
            this.inputValue={
                condition:0,
                end_time:"",
                price:0,
                status:'',
                alcohol_id:0,
                start_time:''
            }
            this.id='';
        },
        edit(row){ //編輯
            this.inputValue={
                condition:row.condition,
                end_time:row.end_time,
                price:row.price,
                status:row.status,
                alcohol_id:row.alcohol_id,
                start_time:row.start_time
            }
            this.propModel = true
            this.id = row.id;
        },
        sureBtn(){ //增加
            console.log(this.inputValue)
            var value = this.inputValue;
            value.start_time = this.$changeTime(value.start_time);
            value.end_time = this.$changeTime(value.end_time);
            if(this.id){
                value.id = this.id
            }
            var data = value;
            this.$http('alcoholFullReductionService','addOrUpdate',data)
            .then(res=>{
                this.propModel = false;
                if(res.result == 'success'){
                    if(this.id){
                        this.$Message.success('修改成功');
                    }else{
                        this.$Message.success('新增成功');
                    }
                    this.getList(this.current);
                    this.id = ''
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
                    this.$http('alcoholFullReductionService','deleteData',data)
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
    height: 480px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -240px 0 0 -300px;
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
