<template>
<div class="wrappar">
    <!-- <div class="_title">訂單查詢</div> -->
    <div class="nav">
        <div class="option">
            <span>訂單編號：</span>
            <Input type="text"  v-model="inputValue.id" style="width:160px" />
        </div>
        <div class="option">
            <span>下單時間：</span>
            <!-- <Input type="text"  v-model="inputValue.time" style="width:160px" /> -->
            <DatePicker type="daterange" v-model="inputValue.time" placeholder="選擇時間" style="width: 190px"></DatePicker>
        </div>
        <div class="serch" @click="search">查詢</div>
    </div>
    <div class="goods">
        <Table border  :columns="columns1" :data="data1"  class="post"  @on-row-click="selectChange1">
            <template slot="peisong" slot-scope="{row,index}">
                <div>
                    <p>{{row.payment==1?'貨到付款':'門市取貨'}}</p>
                    <!-- <p style="margin-left:10px">{{row.delivery_num?row.delivery_num:"-"}}</p> -->
                    <!-- <p style="margin-left:20px">{{types(row.type)}}</p> -->
                    <!-- <p style="margin-left:20px">{{row.status==1?'訂單正常':"訂單用戶刪除"}}</p> -->
                </div>
            </template>
            <template slot="orders" slot-scope="{row,index}">
                <div>
                    <p>{{row.time}}</p>
                    <p style="margin-left:10px">
                        待分配
                    </p>
                    <!-- <p style="margin-left:20px">-</p> -->
                    <p style="margin-left:0px">{{row.update_time}}</p>
                    <p style="margin-left:25px">{{row.source}}</p>
                </div>
            </template>
            <template slot="goods" slot-scope="{row,index}">
                <div>
                    <p>{{row.title}}</p>
                    <p style="margin-left:10px">{{row.alcohol_id}}</p>
                </div>
            </template>
            <template slot="shopname" slot-scope="{row,index}">
                <div>
                    <Select v-model="row.shop_id" @on-change="selectChange" size="small">
                        <Option v-for="(item,index) in shopName" :value="item.value" :key="index">{{ item.label }}</Option>
                    </Select>
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
            <template slot="action" slot-scope="{row,index}">
                <Button size="small" type="error" @click="remove(row.id)">刪除</Button>
            </template>
        </Table>
    </div>
    <div class="page">
        <div class="_btn">
            <!-- <div class="send" @click="openModel">新增</div> -->
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
                    title: '訂單編號',
                    key: 'id',
                    minWidth:120
                },
                {
                    title: '選擇門市',
                    slot: 'shopname',
                    minWidth:120
                },
                {
                    slot: 'peisong',
                    minWidth:150,
                    renderHeader:(h, params) => {
                            return h('div', [
                                // h('p','配送方式'),
                                // h('p',{style:{marginLeft:'10px'}},'配送編號'),
                                h('p','出貨狀態'),
                                // h('p',{style:{marginLeft:'10px'}},'出貨狀態時間')
                            ]);
                        },
                },
                {
                    slot: 'orders',
                    minWidth:150,
                    renderHeader:(h, params) => {
                            return h('div', [
                                h('p','下單時間'),
                                h('p',{style:{marginLeft:'10px'}},'訂單狀態'),
                                h('p',{style:{marginLeft:'20px'}},'訂單狀態日'),
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
                time:'',
                type:''
            },
            typeList:[
                {value:1,label:'待確認'},
                {value:2,label:'待出貨'},
                // {value:3,label:'已出貨'},
                // {value:4,label:'已收貨'},
                // {value:5,label:'未取貨'},
                {value:6,label:'取消'},
                // {value:7,label:'退貨'},
            ],
            id:'',
            type:1,
            obj:{}
        }
    },
    created(){
        this.getShopname()
        this.getList(0)
    },
    methods:{
        getList(start,obj){
            var data = {};
            if(obj){
                data = obj;
            }
            data.start = start
            data.type=1
            data.payment=2
            data.rows=5
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
        getShopname(){
            var data = {
                start:0
            }
            this.$http('orderShopService','findDatas',data)
            .then(res=>{
                console.log(res)
                if(res.rows){
                    var arr = [];
                    for(let i =0; i<res.rows.length;i++){
                        var obj ={};
                        obj.value = res.rows[i].id;
                        obj.label = res.rows[i].name;
                        arr.push(obj)
                    }
                    this.shopName = arr;
                }
            })
        },
        remove (id) {
            this.$Modal.confirm({
                title: '警告',
                content: '<h3>此操作將刪除數據，是否繼續？</h3>',
                onOk: () => {
                     var data = {id:id};
                    // this.$http('alcoholGrapeService','deleteData',data)
                    // .then(res=>{
                    //     if(res.result == 'success'){
                    //         this.$Message.success('刪除成功');
                    //         this.getList(this.current);
                    //     }else{
                    //         this.$Message.error('操作失敗');
                    //     }
                    // })
                },
                onCancel: () => {
                }
            })  
        },
        openModel(){
            this.propModel = true;
        },
        types(data){
            var str = '';
            if(data == 1){
                str = '待確認'
            }else if(data==2){
                str = '待出貨'
            }else if(data==3){
                str = '已完成'
            }
            
            return str
        },
        pageChange(index){ //切換頁數
            this.current = index==1?0:(index-1)*5;
            if(this.type==1){
                this.getList(this.current);
            }else{
                this.getList(this.current,this.obj)
            }
        },
        selectChange1(row){
            console.log(row)
            this.id = row.id
        },
        revise(value){ //修改狀態
            var data = {
                shop_id:parseInt(value),
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
            if(this.inputValue.time[0]){
                obj.startTime = times(this.inputValue.time[0]);
                obj.endTime = times(this.inputValue.time[1]);
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
        }
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

