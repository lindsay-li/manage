<template>
<div class="wrappar">
    <!-- <div class="_title">訂單查詢</div> -->
    <div class="nav">
        <div class="option">
            <span>訂單編號：</span>
            <Input type="text"  v-model="inputValue.id" style="width:100px" />
        </div>
        <div class="option">
            <span>配送廠家：</span>
            <Input type="text"  v-model="inputValue.delivery_home" style="width:120px" />
        </div>
        <div class="option">
            <span>商品名稱</span>
            <Input type="text"  v-model="inputValue.title" style="width:120px" />
            <!-- <DatePicker type="daterange" v-model="inputValue.time" placeholder="選擇時間" style="width: 160px"></DatePicker> -->
        </div>
        <div class="option">
            <span>配送編號：</span>
            <Input type="text"  v-model="inputValue.delivery_num" style="width:100px" />
        </div>
        <div class="serch" @click="search">查詢</div>
    </div>
    <div class="goods">
        <Table border  :columns="columns1" :data="data1"  class="post"  @on-row-click="selectChange1">
            <template slot="peisong" slot-scope="{row,index}">
                <div>
                    <p>{{row.payment==1?'貨到付款':'門店自取'}}</p>
                    <p style="margin-left:10px">{{row.delivery_home?row.delivery_home:"-"}}</p>
                    <p style="margin-left:20px">{{row.delivery_num?row.delivery_num:"-"}}</p>
                </div>
            </template>
            <template slot="orders" slot-scope="{row,index}">
                <div>
                    <p>{{row.time}}</p>
                    <!-- <p style="margin-left:10px">{{row.status==1?'訂單正常':"訂單用戶刪除"}}</p> -->
                    <!-- <p style="margin-left:20px">-</p> -->
                    <p style="margin-left:25px">{{row.source}}</p>
                </div>
            </template>
            <template slot="goods" slot-scope="{row,index}">
                <div>
                    <p>{{row.title}}</p>
                    <p style="margin-left:10px">{{row.alcohol_id}}</p>
                </div>
            </template>
            <template slot="prices" slot-scope="{row,index}">
                <div>
                    <p>{{row.origin_price}}</p>
                    <p style="margin-left:10px">{{row.discounts_money}}</p>
                    <p style="margin-left:20px">{{row.total_price}}</p>
                </div>
            </template>
            <template slot="users" slot-scope="{row,index}">
                <div>
                    <!-- <p>-</p> -->
                    <p>{{row.sh_name}}</p>
                    <!-- <p>-</p> -->
                    <p>{{row.address}}</p>
                </div>
            </template>
            <template slot="type" slot-scope="{row}">
                <!-- <div>{{types(row.type)}}</div> -->
                <div>
                    <Select v-model="row.type" @on-change="selectChange" size="small">
                        <Option v-for="(item,index) in typeList" :value="item.value" :key="index">{{ item.label }}</Option>
                    </Select>
                </div>
            </template>
            <template slot="action" slot-scope="{row,index}">
                <Button size="small" type="error" @click="remove(row.id)">刪除</Button>
            </template>
        </Table>
    </div>
    <div class="page">
        <div class="_btn">
            <!-- <div class="send" @click="openModel">一件發貨</div> -->
        </div>
        <Page :total="total" show-total show-elevator prev-text='上一頁' next-text='下一頁'  @on-change="pageChange"/>
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
                    title: '負責門店',
                    key: 'shop_name',
                    minWidth:120
                },
                {
                    title: '訂單編號',
                    key: 'id',
                    minWidth:120
                },
                {
                    slot: 'peisong',
                    minWidth:150,
                    renderHeader:(h, params) => {
                            return h('div', [
                                h('p','配送方式'),
                                h('p',{style:{marginLeft:'10px'}},'配送廠家'),
                                h('p',{style:{marginLeft:'20px'}},'配送編號'),
                            ]);
                        },
                },
                {
                    slot: 'orders',
                    minWidth:150,
                    renderHeader:(h, params) => {
                            return h('div', [
                                h('p','下單時間'),
                                h('p',{style:{marginLeft:'25px'}},'訂單來源'),
                            ]);
                        },
                },
                {
                    slot: 'goods',
                    minWidth:180,
                    ellipsis:true,
                    tooltip:true,
                    renderHeader:(h, params) => {
                            return h('div', [
                                h('p','商品名稱'),
                                h('p',{style:{marginLeft:'10px'}},'商品編號')
                            ]);
                        },
                },
                {
                    title:'數量',
                    key:'num',
                    minWidth:100
                },
                {
                    slot: 'prices',
                    minWidth:130,
                    renderHeader:(h, params) => {
                            return h('div', [
                                h('p','商品單價'),
                                h('p',{style:{marginLeft:'10px'}},'折扣金額'),
                                h('p',{style:{marginLeft:'15px'}},'銷售金額(折扣後)')
                            ]);
                        },
                },
                {
                    slot: 'users',
                    minWidth:130,
                    ellipsis:true,
                    tooltip:true,
                    renderHeader:(h, params) => {
                            return h('div', [
                                // h('p','會員編號'),
                                h('p',{style:{marginLeft:'10px'}},'收件人'),
                                // h('p',{style:{marginLeft:'15px'}},'收件人電話'),
                                h('p',{style:{marginLeft:'20px'}},'收件人地址')
                            ]);
                        },
                },
                {
                    title:'發票類型',
                    key:'order1',
                    width:110
                },
                {
                    title:'訂單狀態',
                    slot:'type',
                    width:120
                },
                {
                    title:'訂單備註',
                    key:'order2',
                    width:110
                },
                {
                    title:'消費者備註',
                    key:'order3',
                    width:120
                }
            ],
            data1: [],
            grape_type:'',
            total:0,
            current:0,
            propModel:false,
            shopName:[], //所有門店
            inputValue:{
                id:"",
                title:'',
                delivery_num:'',
                delivery_home:""
            },
            typeList:[
                {value:2,label:'待出貨'},
                {value:3,label:'已出貨'}
            ],
            id:'',
            paymentList:[
                {value:'1',label:'貨到付款'},
                {value:'2',label:'門店自取'}
            ],
            editValue:{
                id:'',
                delivery_home:'',
                delivery_num:''
            }
        }
    },
    created(){
        this.getList(0)
    },
    methods:{
        getList(start,obj){
            var data = {
                start:start,
                type:3,
                rows:5
            }
            if(obj){
                data = obj;
            }
            this.$http('orderInfoService','findDatas',data)
            .then(res=>{
                console.log(res)
                if(res.rows){
                    var arr = res.rows
                    for(let i =0;i<arr.length;i++){
                        arr[i].time =arr[i].time?this.$changeTime(arr[i].time):'-'
                        // arr[i].update_time = arr[i].update_time?this.$changeTime(arr[i].update_time):'-'
                    }
                    this.data1 = arr;
                    this.total = res.total;
                }
            })
        },
        newAdd(){
            if(!this.editValue.delivery_home || !this.editValue.delivery_num){
                this.$Message.warning('請輸入信息');
                return;
            }
            var data = {
                delivery_num:this.editValue.delivery_num,
                delivery_home:this.editValue.delivery_home
            }
            if(this.id){
                data.id = this.id
            }
            this.$http('orderFormService','addOrUpdate',data)
            .then(res=>{
                this.propModel = false;
                if(res.result == 'success'){
                    this.$Message.success('出貨成功');
                    this.id = '';
                    this.editValue.delivery_num=''
                    this.editValue.delivery_home = ''
                    this.getList(this.current);
                }else{
                    this.$Message.error(res.message);
                }
            })
        },
        types(id){
            if(!id){return ''}
            var result = this.typeList.find(item=>item.value==id);
            if(result){
                return result.label
            }else if(id==0){
                return '取消(用戶信件)'
            }else{
                return ''
            }
        },
        pageChange(index){ //切換頁數
            this.current = index==1?0:(index-1)*5;
            this.getList(this.current);
        },
        selectChange1(row){
            console.log(row)
            this.id = row.id
        },
        revise(value){ //修改狀態
            var data = {
                type:parseInt(value),
                id:this.id
            }
            this.$http('orderFormService','addOrUpdate',data)
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
        search(){
            var obj = {};
            if(this.inputValue.id){
                obj.id = this.inputValue.id;
            }
            if(this.inputValue.title){
                obj.title = this.inputValue.title
            }
            if(this.inputValue.delivery_num){
                obj.delivery_num = this.inputValue.delivery_num
            }
            if(this.inputValue.payment){
                obj.delivery_home = this.inputValue.delivery_home
            }
            var arr =Object.keys(obj)
            if(arr.length>0){
                obj.start=0
                obj.rows=5
                obj.type=3
                this.getList(0,obj)
            }else{
                this.getList(0)
            }
        },
    }  
}
</script>
<style scoped>
.wrapper{
    position: relative;
}
.page{
    justify-content: space-between;
}

</style>

