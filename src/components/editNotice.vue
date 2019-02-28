<template>
<div class="wrappar">
    <div class="nav">
        <div class="_title">公告通知</div>
    </div>
    <div class="notice">
        <Table border  :columns="columns1" :data="data1" >
            <template slot-scope="{row,index}" slot="type">
                <div>{{types(row.TYPE)}}</div>
            </template>
            <template slot-scope="{row,index}" slot="status">
                <div>{{row.STATUS==0?'未讀':'已讀'}}</div>
            </template>
            <template slot-scope="{row,index}" slot="action">
                <Button type="error" size='small' @click="remove(row.id)">刪除</Button>
            </template>
        </Table>
    </div>
    <div class="page">
        <div class="add_goods" @click="openPropModel">新增通知</div>
        <Page :total="total" show-total show-elevator prev-text='上一頁' next-text='下一頁' @on-change="pageChange"/>
    </div>
    <div class="prop_model" v-show="propModel">
        <div class="n_box">
            <div class="n_content">
                <div class="n_title">新增通知</div>
                <table style="width:100%">
                    <tr>
                        <td>通知類型</td>
                        <td>
                            <Select v-model="inputValue.type" style="width:220px;">
                                <Option v-for="item in noticeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </td>
                    </tr>
                    <!-- <tr>
                        <td>發送用戶</td>
                        <td>
                            <InputNumber :min="1" v-model="inputValue.to_user_id" style="width:220px;"></InputNumber>
                        </td>
                    </tr> -->
                    <tr>
                        <td>狀態</td>
                        <td>
                            <Select v-model="inputValue.status" style="width:220px;">
                                <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:110px;">內容</td>
                        <td><Input v-model="inputValue.msg" type="textarea" :rows="4" /></td>
                    </tr>
                </table>
                <div class="_btns">
                    <div class="sure" @click="sureBtn">確定</div>
                    <div class="cancel" @click="closeModel">取消</div>
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
                    title: '內容',
                    key: 'msg',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:180
                },
                {
                    title: '發送人id',
                    key: 'from_user_id',
                    minWidth:120
                },
                // {
                //     title: '接收人id',
                //     key: 'to_user_id',
                //     minWidth:120
                // },
                {
                    title:'其它',
                    key:'other',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:140,
                },
                {
                    title:'狀態',
                    slot:'status',
                    minWidth:110,
                },
                {
                    title:'操作',
                    slot:'action',
                    minWidth:90,
                },
            ],
            data1: [],
            userList:[],
            noticeList:[],
            propModel:false,
            loading:false,
            total:0,
            current:0,
            inputValue:{
                msg:'',
                type:'',
                // to_user_id:1,
                status:""
            },
            statusList:[
                {value:0,label:'未讀'},
                {value:1,label:'已讀'}
            ]
        }
    },
    created(){
        this.getList(0);
        this.noticeList = [
            {value:1,label:'文章被留言'},
            {value:2,label:'文章留言被評論'},
            {value:3,label:'酒被評價'},
            {value:4,label:'評價被評論'},
            {value:5,label:'新增關注'},
            {value:6,label:'訂單創建'},
            {value:7,label:'訂單確認'},
            {value:8,label:'訂單取消'},
            {value:9,label:'訂單發貨'},
            {value:10,label:'訂單完成'},
            {value:11,label:'活動消息'},
            {value:12,label:'商品促銷消息'},
            {value:13,label:'一些系統通知'},
            ]
    },
    methods:{
        getList(start){
            var data = {
               start:start,
               rows:10 
            }
            this.loading = true;
            this.$http('messageLogService','findDatas',data)
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
        selectChange1(){

        },
        closeModel(){
            this.propModel = false;
        },
        remove(id){
            this.$Modal.confirm({
                title: '警告',
                content: '<h3>此操作將刪除數據，是否繼續？</h3>',
                onOk: () => {
                     var data = {id:id};
                    this.$http('messageLogService','deleteData',data)
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
        sureBtn(){
            var data = {};
            data.msg = this.inputValue.msg;
            data.type = this.inputValue.type;
            // data.to_user_id = this.inputValue.to_user_id;
            if(this.inputValue.status || this.inputValue.status==0){
                data.status = this.inputValue.status;
            }
            // data.time = this.$changeTime(new Date())
            this.$http('messageLogService','addOrUpdate',data)
            .then(res=>{
                if(res.result == 'success'){
                    this.propModel = false;
                    this.$Message.success('新增成功');
                    this.getList(this.current);
                    this.inputValue ={
                        msg:'',
                        type:'',
                        // to_user_id:1,
                        status:""
                    }
                }else{
                    this.$Message.error('操作失敗，請檢查')
                }
            })
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
                   str = '文章被留言';
                   break;
                case 2:
                   str = '文章留言被評論';
                   break;
                case 3:
                   str = '酒被評價';
                   break;
                case 4:
                   str = '評價被評論';
                   break;
                case 5:
                   str = '新增關注';
                   break;
                case 6:
                   str = '訂單創建';
                   break;
                case 7:
                   str = '訂單確認';
                   break;
                case 8:
                   str = '訂單取消';
                   break;
                case 9:
                   str = '訂單發貨';
                   break;
                case 10:
                   str = '訂單完成';
                   break;
                case 11:
                   str = '活動消息';
                   break;
                case 12:
                   str = '商品促銷消息';
                   break;
                case 13:
                   str = '一些系統通知';
                   break;
            }
            return str
            
        }
    }
   
}
</script>
<style scoped>
.page{
    justify-content: space-between;
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
    margin: -200px 0 0 -300px;
    width: 600px;
    height: 400px;
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
