<template>
<div class="wrappar">
    <div class="goods">
        <Table border  :columns="columns1" :data="data1"  class="post">
            <template slot="order" slot-scope="{row,index}">
                <div>{{row.order===0?'男':'女'}}</div>
            </template>
            <template slot="promotion" slot-scope="{row,index}">
                <div>{{row.promotion===0?'不通知':'通知'}}</div>
            </template>
            <template slot="activity" slot-scope="{row,index}">
                <div>{{row.activity===0?'不通知':'通知'}}</div>
            </template>
            <template slot="follow_msg" slot-scope="{row,index}">
                <div>{{row.follow_msg===0?'不通知':'通知'}}</div>
            </template>
            <template slot="lock" slot-scope="{row,index}">
                <div>{{row.lock===1?'锁定':'未认证'}}</div>
            </template>
            <template slot="action" slot-scope="{row,index}">
                <Button size="small" type="primary" @click="edit(row)">编辑</Button>
                <Button size="small" type="error" @click="remove(row.id)">删除</Button>
            </template>
        </Table>
    </div>
    <div class="page">
        <div class="_btn">
            <div class="send" @click="openModel">新增</div>
        </div>
        <Page :total="total" show-total show-elevator prev-text='上一頁' next-text='下一頁'  @on-change="pageChange"/>
    </div>
    <div class="prop_model" v-show="propModel">
        <div class="_box">
            <div class="contant">
                <div class="tit">新增</div>
                <div class="list">
                    <table style="width:100%;">
                        <tr>
                            <td style="text-align:right">酒庄名称:</td>
                            <td>
                                <Input v-model="inputValue.winery"  placeholder="點擊輸入" style="width: 160px;" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">酒庄等级:</td>
                            <td>
                                <Input v-model="inputValue.grade"  placeholder="點擊輸入" style="width: 160px" />
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="btns">
                    <div class="cancel" @click='closeModel'>取消</div>
                    <div class="sure" @click="newAdd">確定</div>
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
                    title: '用户名称',
                    key: 'user',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:140
                },
                {
                    title: '昵称',
                    key: 'nickname',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:140
                },
                {
                    title: '性别',
                    key: 'sex',
                    minWidth:100
                },
                {
                    title: '生日',
                    key: 'birth',
                    minWidth:140
                },
                {
                    title:'手机',
                    key:'phone',
                    minWidth:130
                },
                {
                    title:'密码',
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
                    title:'邮箱',
                    key:'email',
                    minWidth:190
                },
                {
                    title:'城市',
                    key:'city',
                    minWidth:120
                },
                {
                    title:'区县',
                    key:'district',
                    minWidth:120
                },
                {
                    title:'乡镇',
                    key:'towns',
                    minWidth:120
                },
                {
                    title:'详细地址',
                    key:'address',
                    minWidth:140
                },
                {
                    title:'头像',
                    key:'head',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:140
                },
                {
                    title:'个人简介',
                    key:'brief',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:140
                },
                {
                    title:'注册时间',
                    key:'create_date',
                    minWidth:150
                },
                {
                    title:'身份认证锁定',
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
                    title:'订单通知',
                    slot:'order',
                    minWidth:120
                },
                {
                    title:'商品促销通知',
                    slot:'promotion',
                    minWidth:130
                },
                {
                    title:'活动通知',
                    slot:'activity',
                    minWidth:120
                },
                {
                    title:'关注与留言',
                    slot:'follow_msg',
                    minWidth:130
                },
                {
                    title:'黄金会员到期时间',
                    key:'gold',
                    minWidth:150
                },
                {
                    title:'白金会员到期时间',
                    key:'platinum',
                    minWidth:150
                },
                {
                    title:'微信昵称',
                    key:'wx_nickname',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:130
                },
                {
                    title:'微信性别',
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
                    title:'微信头像',
                    key:'wx_head',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:120
                },
                {
                    title:'微信国家',
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
                    title:'微信更新时间',
                    key:'wx_update_date',
                    minWidth:160
                },
                {
                    title:'FaceBook昵称',
                    key:'fb_nickname',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:140
                },
                {
                    title:'FaceBook邮箱',
                    key:'fb_email',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:140
                },
                {
                    title:'FaceBook头像',
                    key:'fb_head',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:140
                },
                {
                    title:'FaceBook更新时间',
                    key:'fb_update_date',
                    minWidth:160
                },
                {
                    title:'LineMe昵称',
                    key:'lm_nickname',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:140
                },
                {
                    title:'LineMe邮箱',
                    key:'lm_email',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:140
                },
                {
                    title:'LineMe头像',
                    key:'lm_head',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:140
                },
                {
                    title:'LineMe更新时间',
                    key:'lm_update_date',
                    minWidth:160
                },
                {
                    title:'操作',
                    slot:'action',
                    fixed:'right',
                    minWidth:140
                },
            ],
            data1: [],
            total:0,
            current:0,
            propModel:false,
            inputValue:{
                winery:'',
                grade:''
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
            this.$http('userService','findDatas',data)
            .then(res=>{
                console.log(res)
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
                content: '<h3>此操作将删除数据，是否继续？</h3>',
                onOk: () => {
                     var data = {id:id};
                    this.$http('userService','deleteData',data)
                    .then(res=>{
                        if(res.result == 'success'){
                            this.$Message.success('删除成功');
                            this.getList(this.current);
                        }else{
                            this.$Message.error('操作失败');
                        }
                    })
                },
                onCancel: () => {
                }
            })  
        },
        edit(row){

        },
        newAdd(){
            if(!this.inputValue.grade || !this.inputValue.winery){
                this.$Message.warning('请输入信息');
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
        pageChange(index){ //切换页数
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
.wrapper{
    position: relative;
}
.page{
    justify-content: flex-end;
}
.page{
    justify-content: space-between;
}
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
