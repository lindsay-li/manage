<template>
<div class="coupon">
    <div class="_title">折扣券</div>
    <div class="content">
        <Table border  :columns="columns1" :data="data1" :loading="loading">
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
                <div class="tit">添加折扣活動</div>
                <div class="list"style="width:100%;">
                    <table style="width:100%;">
                        <tr>
                            <td style="text-align:right">折扣券類型:</td>
                            <td>
                                <Select v-model="inputValue.discount_type" style="width:300px">
                                    <Option v-for="item in discountType" :value="item.value" :key="item.value" :disabled='item.disabled'>{{ item.label }}</Option>
                                </Select>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">抵扣%數:</td>
                            <td>
                                <!-- <Input v-model="inputValue.discount_value" type="number" placeholder="點擊輸入" style="width: 300px" /> -->
                                <InputNumber
                                    style="width: 300px"
                                    :max="100"
                                    v-model="inputValue.discount_value"
                                    :formatter="value => `${value}%`"
                                    :parser="value => value.replace('%', '')">
                                </InputNumber>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">最大優惠金額:</td>
                            <td>
                                <Input v-model="inputValue.discount_max" type="text" placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">使用時間:</td>
                            <td>
                                <DatePicker v-model="inputValue.discount_start" type="date" placement="bottom-end" placeholder="選擇日期" style="width: 300px"></DatePicker>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">結束時間:</td>
                            <td>
                                <DatePicker v-model="inputValue.discount_end" type="date" placement="bottom-end" placeholder="選擇日期" style="width: 300px"></DatePicker>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">使用門檻:</td>
                            <td>
                                <Input v-model="inputValue.discount_condition" type="text" placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        
                        <tr>
                            <td style="text-align:right">可用範圍:</td>
                            <td>
                                <Input v-model="inputValue.discount_scope"  type="text" placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">活動名稱:</td>
                            <td>
                                <Input v-model="inputValue.discount_name" type="text" placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">活動說明:</td>
                            <td>
                                <Input v-model="inputValue.discount_explain"  type="textarea" placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">注意事項:</td>
                            <td>
                                <Input v-model="inputValue.discount_remark"  type="textarea" placeholder="點擊輸入" style="width: 300px" />
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
                    key: 'discount_name',
                    minWidth:140
                },
                {
                    title: '折扣值',
                    minWidth:140,
                    key: 'discount_value'
                },
                {
                    title: '折扣類型',
                    minWidth:120,
                    key: 'discount_type'
                },
                {
                    title: '最大優惠金額',
                    key: 'discount_max',
                    minWidth:140
                },
                {
                    title: '使用時間',
                    key: 'discount_time_type',
                    minWidth:120
                },
                {
                    title: '開始時間',
                    key: 'discount_start',
                    minWidth:150
                },
                {
                    title: '結束時間',
                    key: 'discount_end',
                    minWidth:150
                },
                {
                    title: '使用範圍',
                    key: 'discount_scope',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:120
                },
                {
                    title: '使用門檻',
                    key: 'discount_condition',
                    minWidth:120
                },
                {
                    title: '注意事項',
                    key: 'discount_remark',
                    minWidth:140,
                    ellipsis:true,
                    tooltip:true
                },
                {
                    title: '創建時間',
                    key: 'discount_time',
                    minWidth:150
                },
                {
                    title: '活動說明',
                    key: 'discount_explain',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:140
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
                discount_remark:'',
                discount_start:"",
                discount_end:"",
                discount_name:'',
                discount_explain:'',
                discount_type:'',
                discount_value:100,
                discount_condition:0,
                discount_scope:'',
                discount_max:"",
                discount_time:''
            },
            discountType:[
                {
                    value:1,
                    label:'折扣券'
                },
                {
                    value:2,
                    label:'現金券',
                    disabled:true
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
            this.$http('couponLogService','findDatas',data)
            .then(res=>{
                console.log(res)
                this.loading = false;
                if(res.rows){
                    var arr = res.rows;
                    for(let i =0;i<arr.length;i++){
                        console.log(1)
                        arr[i].discount_end = this.$changeTime(arr[i].discount_end);
                        arr[i].discount_start = this.$changeTime(arr[i].discount_start);
                        arr[i].discount_time = arr[i].discount_time?this.$changeTime(arr[i].discount_time):'';
                        arr[i].discount_time_type =arr[i].discount_time_type ?'領卷後一天':this.Calculation(arr[i].discount_start,arr[i].discount_end)
                        arr[i].discount_scope = this.changeArr(arr[i].discount_scope);
                        arr[i].discount_type = arr[i].discount_type ==2?'現金券':'折扣卷';
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
        Calculation(start,end){
            var start = new Date(start).getTime();
            var end = new Date(end).getTime();
            var num = end -start;
            
            var newdate = parseInt(num / (1000*60*60*24));
            return newdate;
        },
        changeArr(data){

            if(data){
                var str ='';
                try{
                    var obj = JSON.parse(data);
                    str = `終端:${obj.terminal.join(',')},國家id:${obj.country.join(',')}，酒莊id:${obj.winery.join(',')}，產品類型id:${obj.product_type.join(',')}`
                }catch(err){
                    console.log(err)
                    str = data;
                }
                return str;
            }
        },
        openModel(){
            this.propModel = true;
        },
        closeModel(){
            this.propModel = false;
        },
        edit(row){ //編輯
            this.inputValue={
                discount_remark:row.discount_remark,
                discount_start:row.discount_start,
                discount_end:row.discount_end,
                discount_name:row.discount_name,
                discount_explain:row.discount_explain,
                discount_type:row.discount_type,
                discount_value:row.discount_value,
                discount_condition:row.discount_condition,
                discount_scope:row.discount_scope,
                discount_max:row.discount_max,
                discount_time:row.discount_time
            }
            this.propModel = true
            this.id = row.id;
        },
        sureBtn(){ //增加
            console.log(this.inputValue)
            var value = this.inputValue;
            value.discount_condition = parseInt(value.discount_condition);
            value.discount_max = parseInt(value.discount_max);
            value.discount_start = this.$changeTime(value.discount_start);
            value.discount_end = this.$changeTime(value.discount_end);
            value.discount_time = this.$changeTime(new Date());
            if(this.id){
                value.id = this.id
            }
            var data = value;
            this.$http('couponLogService','addOrUpdate',data)
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
                    this.$http('couponLogService','deleteData',data)
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
    height: 680px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -340px 0 0 -300px;
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
