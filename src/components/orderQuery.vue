<template>
<div class="wrappar">
    <!-- <div class="_title">訂單查詢</div> -->
    <div class="nav">
        <div class="option">
            <span>訂單編號：</span>
            <Input type="text"  v-model="inputValue.id" style="width:70px" />
        </div>
        <div class="option">
            <span>下單時間：</span>
            <!-- <Input type="text"  v-model="inputValue.time" style="width:160px" /> -->
            <DatePicker type="daterange" v-model="inputValue.time" placeholder="選擇時間" style="width: 190px"></DatePicker>
        </div>
        <div class="option">
            <span>收件人：</span>
            <Input type="text"  v-model="inputValue.sh_name" style="width:70px" />
        </div>
        <!-- <div class="option">
            <span>聯繫電話：</span>
            <Input type="text"  v-model="inputValue.phone" style="width:70px" />
        </div> -->
        <div class="option">
            <span>訂單狀態</span>
            <!-- <Input type="text"  v-model="inputValue.status" style="width:70px" /> -->
            <Select v-model="inputValue.type"  clearable  style="width:90px">
                <Option v-for="(item,index) in typeList" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
        </div>
        <div class="serch" @click="search">查詢</div>
    </div>
    <div class="goods">
        <Table border  :columns="columns1" :data="data1"  class="post"  @on-row-click="selectChange1">
            <template slot="shop_id" slot-scope="{row}">
                <div>{{shopnames(row.shop_id)}}</div>
            </template>
            <template slot="peisong" slot-scope="{row,index}">
                <div>
                    <p>{{row.payment==1?'貨到付款':'門店自取'}}</p>
                    <p style="margin-left:10px">{{row.delivery_num?row.delivery_num:"-"}}</p>
                    <p style="margin-left:20px">{{row.status==1?'訂單正常':"訂單用戶刪除"}}</p>
                </div>
            </template>
            <template slot="orders" slot-scope="{row,index}">
                <div>
                    <p>{{row.time}}</p>
                    <p style="margin-left:10px">
                        <!-- <Select v-model="row.type" @on-change="selectChange" size="small">
                            <Option v-for="(item,index) in typeList" :value="item.value" :key="index">{{ item.label }}</Option>
                        </Select> -->
                        {{types(row.type)}}
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
            <template slot="actions" slot-scope="{row,index}">
                <Select v-model="row.type" @on-change="selectChange" size="small" v-if="avgTypes(row.type)">
                    <Option v-for="(item,index) in typeLists" :value="item.value" :key="index">{{ item.label }}</Option>
                </Select>
                <div v-else>已操作</div>
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
                    title: '負責門店',
                    slot: 'shop_id',
                    minWidth:120
                },
                {
                    slot: 'peisong',
                    minWidth:170,
                    renderHeader:(h, params) => {
                            return h('div', [
                                h('p','配送方式'),
                                h('p',{style:{marginLeft:'10px'}},'配送編號'),
                                h('p',{style:{marginLeft:'20px'}},'出貨狀態'),
                                // h('p',{style:{marginLeft:'25px'}},'出貨狀態時間'),
                            ]);
                        },
                },
                {
                    slot: 'orders',
                    minWidth:170,
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
                    title:'操作',
                    slot:'actions',
                    width:120
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
                type:'',
                sh_name:"",
                phone:''
            },
            typeList:[
                {value:1,label:'待確認'},
                {value:2,label:'待出貨'},
                {value:9,label:'出貨中'},
                {value:3,label:'已出貨'},
                {value:4,label:'已收貨'},
                {value:5,label:'未取貨'},
                {value:6,label:'取消'},
                {value:7,label:'申請退貨'},
                {value:8,label:'換貨'},
                {value:10,label:'已退貨'},
            ],
            typeLists:[
                {value:6,label:'取消'},
                {value:10,label:'已退貨'},
                {value:8,label:'換貨'}
            ],
            typeListss:[
                {value:1,label:'待確認'},
                {value:2,label:'待出貨'},
                {value:3,label:'已出貨'},
                {value:4,label:'已收貨'},
                {value:5,label:'未取貨'}
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
            var data = {}
            if(obj){
                data = obj;
            }
            data.start = start
            data.rows = 5
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
        types(id){
            if(!id && id!=0){return ''}
            var result = this.typeList.find(item=>item.value==id)
            if(result){
                return result.label
            }else{
                return '已取消'
            }
        },
        avgTypes(id){
            if(!id && id!=0){return ''}
            var result = this.typeListss.find(item=>item.value==id)
            if(result){
                return true;
            }else{
                return false
            }
        },
        pageChange(index){ //切換頁數
            this.current = index==1?0:(index-1)*5;
            if(this.type==1){
                this.getList(this.current);
            }else{
                this.getList(this.current,this.obj)
            }
        },
        getShopname(){
            var data = {
                start:0
            }
            this.$http('orderShopService','findDatas',data)
            .then(res=>{
                if(res.rows){
                    var arr = res.rows
                    var arr1 = [];
                    for(let i =0;i<arr.length;i++){
                        var obj = {};
                        obj.value = arr[i].id;
                        obj.label = arr[i].name;
                        arr1.push(obj);
                    }
                    this.shopName = arr1;
                }
            })
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
        shopnames(id){
          if(!id){return ''}
          var result = this.shopName.find(item=>item.value == id)
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
        search(){
            var obj = {};
            if(this.inputValue.id){
                obj.id = this.inputValue.id;
            }
            if(this.inputValue.time[0]){
                console.log(this.inputValue.time)
                obj.startTime = times(this.inputValue.time[0]);
                obj.endTime = times(this.inputValue.time[1]);
            }
            if(this.inputValue.sh_name){
                obj.sh_name = this.inputValue.sh_name
            }
            if(this.inputValue.type){
                obj.type = this.inputValue.type
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
.option{
    margin: 0;
    margin-right: 20px;
}
</style>

