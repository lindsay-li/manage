<template>
<div class="wrappar">
    <div class="_title">用户账号操作</div>
    <div class="nav">
        <div class="option">
            <span>會員編號：</span>
            <Input type="text"  v-model="inputValue.id" style="width:160px" />
        </div>
        <div class="option">
            <span>會員名稱：</span>
            <Input type="text"  v-model="inputValue.name" style="width:160px" />
        </div>
        <div class="serch" @click="search">查詢</div>
    </div>
    <div class="goods">
        <Table border  :columns="columns1" :data="data1" @on-row-click="selectChange1" :loading="loading" class="post">
            <template slot="nums" slot-scope="{row}">
                <div style="cursor:pointer" @click="changeRed(row)">{{row.redNum}}</div>
            </template>
            <template slot="coupon" slot-scope="{row}">
                <div style="cursor:pointer" @click="changeCoupon(row)">{{row.coupon_name.toString()}}</div>
            </template>
            <template slot="status" slot-scope="{row}">
                <Select v-model="row.status" style="width:100%" @on-change="selectChange">
                    <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </template>
        </Table>
    </div>
    <div class="page">
        <Page :total="total" show-total show-elevator prev-text='上一頁' next-text='下一頁'  @on-change="pageChange"/>
    </div>
    <div class="prop_model" v-show="redPropmodel">
        <div class="_box red_box">
            <div class="contant">
                <div class="tit">增加减少红利</div>
                <div class="list"style="width:100%;">
                    <table style="width:100%;">
                        <tr>
                            <td style="text-align:right">红利点数：</td>
                            <td>
                                <Input v-model="redValue.num" type="text" placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">操作：</td>
                            <td>
                                <RadioGroup v-model="redValue.status" style="margin-left:40px">
                                    <Radio :label="1">增加</Radio>
                                    <Radio :label='2'>减少</Radio>
                                </RadioGroup>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="btns">
                    <div class="cancel" @click='closeModel'>取消</div>
                    <div class="sure" @click="sureBtn(1)">確定</div>
                </div>
            </div>
        </div>
    </div>
    <div class="prop_model" v-show="conPropmodel">
        <div class="_box cou_box">
            <div class="contant">
                <div class="tit">折扣卷操作</div>
                <div class="list"style="width:100%;">
                    <table style="width:100%;">
                        <tr v-for="(item,index) in couPonlist" :key="index">
                            <td>{{item.name}}</td>
                            <td>
                                <Button type="error"  @click="delets(item.id,index)">删除</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>新增折扣卷：</td>
                            <td>
                                <Select v-model="coupon_id"  >
                                    <Option v-for="item in couponsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="btns">
                    <div class="cancel" @click='closeModel'>取消</div>
                    <div class="sure" @click="sureBtn(2)">確定</div>
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
                    title: '會員編號',
                    key: 'id',
                    minWidth:110
                },
                {
                    title: '用戶姓名',
                    key: 'name',
                    minWidth:120
                },
                {
                    title: '手机号码',
                    key: 'phone',
                    minWidth:140
                },
                {
                    title: '电子邮件',
                    key: 'email',
                    minWidth:140
                },
                {
                    title: '红利点数',
                    slot: 'nums',
                    minWidth:110
                },
                {
                    title: '会员等级',
                    key: 'vip_level_id',
                    minWidth:110
                },
                {
                    title: '折扣券',
                    slot: 'coupon',
                    minWidth:150
                },
                {
                    title: '状态',
                    slot: 'status',
                    minWidth:130
                }
            ],
            data1: [],
            country:'',
            total:0,
            current:0,
            inputValue:{
                name:'',
                id:''
            },
            statusList:[
                {value:1,label:'启用'},
                {value:0,label:'封禁'}
            ],
            type:1,
            obj:{},
            id:'',
            redPropmodel:false,
            conPropmodel:false,
            redValue:{
                num:'',
                status:1
            },
            couponsList:[],
            couPonlist:[],
            coupon_id:''
        }
    },
    created(){
        this.getCoupons();
        this.getList(0)
    },
    methods:{
        getList(start,obj){
            var userdata = {};
            if(obj){
                userdata = obj;
            }
            userdata.start = start;
            userdata.rows = 10;
            this.loading = true;
            var getUser = this.$http('userService','findDatas',userdata)
            //**/ 红利*/
            var reddata = {start:0}
            var getrednum = this.$http('vineyardLogService','findDatas',reddata)
            /*折扣*/
            var coupondata = {start:0}
            var getcoupon = this.$http('couponService','findDatas',coupondata)
            Promise.all([getUser, getrednum, getcoupon]).then((res)=>{
                this.loading = false;
                console.log(res)
                var userlist = res[0];
                var rednumlist = res[1];
                var couponlist = res[2];
                for(let i=0;i<userlist.rows.length;i++){
                    userlist.rows[i].coupon_name = [];
                    userlist.rows[i].coupon_list = [];
                    for(let y=0;y<rednumlist.rows.length;y++){
                        if(userlist.rows[i].id == rednumlist.rows[y].user_id){
                            userlist.rows[i].redNum = rednumlist.rows[y].Surplus;
                        }
                    }
                    for(let j =0;j<couponlist.rows.length;j++){
                        if(userlist.rows[i].id == couponlist.rows[j].user_id){
                            userlist.rows[i].coupon_name.push(couponlist.rows[j].discount_name);
                            var obj ={};
                            obj.name = couponlist.rows[j].discount_name;
                            obj.id = couponlist.rows[j].id;
                            userlist.rows[i].coupon_list.push(obj);
                        }
                    }
                }
                
                this.total = userlist.total;
                this.data1 = userlist.rows;
            });

        },
        changeRed(row){ //点击红利
            this.redPropmodel = true;
        },
        changeCoupon(row){
            this.conPropmodel = true;
            this.couPonlist = row.coupon_list;
        },
        sureBtn(type){
            var data={};
            if(type==1){
                data.user_id = this.id;
                console.log(this.redValue)
                data.status = this.redValue.status;
                data.num = parseInt(this.redValue.num);
                this.$http('vineyardLogService','addOrUpdate',data)
                .then((res)=>{
                    this.redPropmodel = false;
                    if(res.result=='success'){
                        this.$Message.success('操作成功');
                        this.getList(this.current);
                        this.id='';
                        this.redValue.num = '';
                    }else{
                        this.$Message.error('操作失败');
                    }
                })
            }else{
                if(!this.coupon_id){
                    this.getList(this.current);
                    this.conPropmodel = false;
                    return 
                }
                data.coupon_log_id = this.coupon_id;
                data.user_id = this.id;
                this.$http('couponService','addOrUpdate',data)
                .then(res=>{
                    this.conPropmodel = false;
                    if(res.result == 'success'){
                        this.$Message.success('新增成功');
                        this.getList(this.current);
                        this.id = ''
                        this.coupon_id = '';
                    }else{
                        this.$Message.error(res.message);
                    }
                })
            }
        },
        closeModel(){
            this.redPropmodel = false;
            this.conPropmodel = false;
        },
        selectChange(value){
            console.log(value)
            this.revise(value)
        },
        selectChange1(row){
            console.log(row)
            this.id = row.id
        },
        delets(id,index){
            this.$Modal.confirm({
                title: '警告',
                content: '<h3>此操作將刪除數據，是否繼續？</h3>',
                onOk: () => {
                    var data = {id:id};
                    this.$http('couponService','deleteData',data)
                    .then(res=>{
                        if(res.result == 'success'){
                            this.$Message.success('刪除成功');
                            this.couPonlist.splice(index,1);
                        }else{
                            this.$Message.error('操作失敗');
                        }
                    })
                },
                onCancel: () => {
                }
            })  
        },
        revise(value){ //修改狀態
            var data = {
                status:parseInt(value),
                id:this.id
            }
            this.$http('userService','addOrUpdate',data)
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
        search(){ //按條件查詢
            var obj = {};
            if(this.inputValue.name){
                obj.name = this.inputValue.name;
            }
            if(this.inputValue.id){
                obj.id = parseInt(this.inputValue.id);
            }
            var arr =Object.keys(obj)
            if(arr.length>0){
                this.obj = obj
                this.type=2
                this.getList(0,obj)
            }else{
                this.type=1
                this.obj={}
                this.getList(0)
            }
        },
        pageChange(index){ //切換頁數
            this.current = index==1?0:(index-1)*10;
            if(this.type==1){
                this.getList(this.current);
            }else{
                this.getList(this.current,this.obj)
            }
        },
        getCoupons(){
            var data = {
                start:0
            }
            this.$http('couponLogService','findDatas',data)
            .then(res=>{
                if(res.rows){
                    var arr = res.rows
                    var arr1 = [];
                    for(let i=0;i<arr.length;i++){
                        var obj ={};
                        obj.value = arr[i].id
                        obj.label = arr[i].discount_name
                        arr1.push(obj)
                    }
                    this.couponsList = arr1;
                }
            })
        }
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
    /* height: 480px; */
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
    padding-bottom: 30px;
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
div.red_box{
    height: 300px;
    margin-top: -150px;
}
div.cou_box{
    min-height: 300px;
}
</style>
