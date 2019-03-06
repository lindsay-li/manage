<template>
<div class="wrappar">
    <div class="_title">免运活动</div>
    <div class="handle">
        <Table border  :columns="columns1" :data="data1" @on-row-click="selectChange1"  class="post">
            <template slot-scope="{ row, index }" slot="end_time">
                <div>{{row.start_time}}——{{row.end_time}}</div>
            </template>
            <template slot-scope="{row}" slot="type">
                <div>{{types(row.type)}}</div>
            </template>
            <template slot-scope="{ row, index }" slot="status">
                <div>
                    <Select v-model="row.status" style="width:100%" @on-change="selectChange">
                        <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" @click="edit(row)">編輯</Button>
                <Button type="error" size="small" @click="deletes(row.id)">刪除</Button>
            </template>
        </Table>
    </div>
    <div class="page">
        <div class="_btn">
            <div class="send" @click="openModel">新增活动</div>
        </div>
        <Page :total="total" show-total show-elevator prev-text='上一頁' next-text='下一頁' @on-change="pageChange"/>
    </div>
    <div class="prop_model" v-show="propModel">
        <div class="_box">
            <div class="contant">
                <div class="tit">新增活动</div>
                <div class="list"style="width:100%;">
                    <table style="width:100%;">
                        <tr>
                            <td style="text-align:right">商品编号(ID):</td>
                            <td>
                                <Input v-model="inputValue.alcohol_id" type="text" placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">优惠方式:</td>
                            <td>
                                <Select v-model="inputValue.type" style="width:300px">
                                    <Option v-for="item in typeList" :value="item.value" :key="item.value" :disabled='item.disabled'>{{ item.label }}</Option>
                                </Select>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">狀態:</td>
                            <td>
                                <Select v-model="inputValue.status" style="width:300px">
                                    <Option v-for="item in statusList" :value="item.value" :key="item.value" :disabled='item.disabled'>{{ item.label }}</Option>
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
    data(){
        return{
            columns1: [
                {
                    title: '商品編號',
                    key: 'alcohol_id',
                    minWidth:120
                },
                {
                    title: '优惠名称',
                    slot: 'type',
                    minWidth:120
                },
                {
                    title: '活动时间',
                    slot: 'end_time',
                    minWidth:320
                },
                {
                    title: '狀態',
                    slot: 'status',
                    width:120
                },
                {
                    title:'操作',
                    slot:'action',
                    width:140
                }
            ],
            data1: [],
            loading:false,
            total:0,
            current:0,
            statusList:[
                {value:0,label:'无效'},
                {value:1,label:'有效'}
            ],
            typeList:[
                {value:0,label:'不免邮'},
                {value:1,label:'免邮'}
            ],
            statusData:'',
            id:'',
            propModel:false,
            inputValue:{
                start_time:'',
                type:'',
                alcohol_id:'',
                end_time:'',
                status:""
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
            this.$http('alcoholFreePostageService','findDatas',data)
            .then(res=>{
                console.log(res)
                this.loading = false;
                if(res.rows){
                    var arr = res.rows
                    for(let i=0;i<arr.length;i++){
                        arr[i].start_time = arr[i].start_time?this.$changeTime(arr[i].start_time):''
                        arr[i].end_time = arr[i].end_time?this.$changeTime(arr[i].end_time):''
                    }
                    this.data1 = arr;
                    this.total = res.total;
                }
            })
        },
        pageChange(index){ //切換頁數
            this.current = index==1?0:(index-1)*10;
            this.getList(this.current);  
        },
        types(id){
            if(id==''){return ''}
            var result = this.typeList.find(item=>item.value==id)
            if(result){
                return result.label
            }else{
                return ''
            }
        },
        selectChange(value){
            console.log(value)
            this.revise(value)
        },
        selectChange1(row){
            console.log(row)
            this.id = row.id
        },
        revise(value){ //修改狀態
            var data = {
                status:parseInt(value),
                id:this.id
            }
            this.$http('alcoholFreePostageService','addOrUpdate',data)
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
        deletes(id){
            this.$Modal.confirm({
                title: '警告',
                content: '<h3>此操作將刪除數據，是否繼續？</h3>',
                onOk: () => {
                     var data = {id:id};
                    this.$http('alcoholFreePostageService','deleteData',data)
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
        sureBtn(){ //增加
            console.log(this.inputValue)
            var value = this.inputValue;
            value.alcohol_id = parseInt(value.alcohol_id);
            value.start_time = this.$changeTime(value.start_time);
            value.end_time = this.$changeTime(value.end_time);
            if(this.id){
                value.id = this.id
            }
            var data = value;
            this.$http('alcoholFreePostageService','addOrUpdate',data)
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
                    this.inputValue = {
                        start_time:'',
                        type:'',
                        alcohol_id:'',
                        end_time:'',
                        status:""
                    }
                }else{
                    this.$Message.error(res.message);
                }
            })
        },
        openModel(){
            this.propModel = true;
        },
        closeModel(){
            this.propModel = false;
            this.inputValue = {
                start_time:'',
                type:'',
                alcohol_id:'',
                end_time:'',
                status:""
            }
            this.id = ''
        },
        edit(row){ //編輯
            this.inputValue={
                start_time:row.start_time,
                type:row.type,
                alcohol_id:row.alcohol_id,
                end_time:row.end_time,
                status:row.status
            }
            this.propModel = true
            this.id = row.id;
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
    height: 430px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -215px 0 0 -300px;
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
