<template>
<div class="wrappar">
    <!-- <div class="nav">
        <div class="option">
            <span>葡萄種類：</span>
            <Input type="text"  v-model="grape_type" style="width:160px" />
        </div>
        <div class="serch" @click="newAdd">新增</div>
    </div> -->
    <div class="goods">
        <Table border  :columns="columns1" :data="data1"  class="post">
            <template slot="peisong" slot-scope="{row,index}">
                <div>
                    <p>{{row.payment==1?'货到付款':'门店自取'}}</p>
                    <p style="margin-left:10px">{{row.delivery_num}}</p>
                    <p style="margin-left:20px">{{types(row.type)}}</p>
                </div>
            </template>
            <template slot="orders" slot-scope="{row,index}">
                <div>
                    <p>{{row.time}}</p>
                    <p style="margin-left:10px">{{row.status==1?'订单正常':"订单用户删除"}}</p>
                    <p style="margin-left:20px">-</p>
                    <p style="margin-left:25px">{{row.source}}</p>
                </div>
            </template>
            <template slot="goods" slot-scope="{row,index}">
                <div>
                    <p>{{row.product_name}}</p>
                    <p style="margin-left:10px">{{row.product_name}}</p>
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
                    <p>{{}}</p>
                    <p>{{row.sh_name}}</p>
                    <p>{{}}</p>
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
            <div class="send" @click="openModel">新增</div>
        </div>
        <Page :total="total" show-total show-elevator prev-text='上一頁' next-text='下一頁'  @on-change="pageChange"/>
    </div>
</div>        
</template>
<script>
export default {
    data(){
        return{
            columns1: [
                {
                    title: '订单编号',
                    key: 'id',
                    minWidth:120
                },
                {
                    title: '负责门市',
                    key: 'delivery_home',
                    minWidth:140
                },
                {
                    slot: 'peisong',
                    minWidth:130,
                    renderHeader:(h, params) => {
                            return h('div', [
                                h('p','配送方式'),
                                h('p',{style:{marginLeft:'10px'}},'配送编号'),
                                h('p',{style:{marginLeft:'20px'}},'出货状态'),
                            ]);
                        },
                },
                {
                    slot: 'orders',
                    minWidth:130,
                    renderHeader:(h, params) => {
                            return h('div', [
                                h('p','下单时间'),
                                h('p',{style:{marginLeft:'10px'}},'订单状态'),
                                h('p',{style:{marginLeft:'20px'}},'取消原因'),
                                h('p',{style:{marginLeft:'25px'}},'订单来源'),
                            ]);
                        },
                },
                {
                    slot: 'goods',
                    minWidth:130,
                    ellipsis:true,
                    tooltip:true,
                    renderHeader:(h, params) => {
                            return h('div', [
                                h('p','商品名称'),
                                h('p',{style:{marginLeft:'10px'}},'商品编号')
                            ]);
                        },
                },
                {
                    title:'数量',
                    key:'num',
                    minWidth:100
                },
                {
                    slot: 'prices',
                    minWidth:130,
                    renderHeader:(h, params) => {
                            return h('div', [
                                h('p','商品单价'),
                                h('p',{style:{marginLeft:'10px'}},'折扣金额'),
                                h('p',{style:{marginLeft:'15px'}},'销售金额(折扣后)')
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
                                h('p','会员编号'),
                                h('p',{style:{marginLeft:'10px'}},'收件人'),
                                h('p',{style:{marginLeft:'15px'}},'收件人电话'),
                                h('p',{style:{marginLeft:'20px'}},'收件人地址')
                            ]);
                        },
                },
                {
                    title:'操作',
                    slot:'action',
                    width:90
                }
            ],
            data1: [],
            grape_type:'',
            total:0,
            current:0,
            propModel:false
        }
    },
    created(){
        this.getList(0)
    },
    methods:{
        getList(start){
            var data = {
                start:start,
                rows:5
            }
            this.$http('orderInfoService','findDatas',data)
            .then(res=>{
                console.log(res)
                if(res.rows){
                    var arr = res.rows
                    for(let i =0;i<arr.length;i++){
                        arr[i].time = this.$changeTime(arr[i].time)
                        arr[i].update_time = this.$changeTime(arr[i].update_time)
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
                    this.$http('alcoholGrapeService','deleteData',data)
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
        openModel(){
            this.propModel = true;
        },
        types(data){
            if(!data){
                return;
            }
            var str = '';
            if(data == 1){
                str = '待确认'
            }else if(data==2){
                str = '待出货'
            }else if(data==3){
                str = '已完成'
            }
        },
        newAdd(){
            if(!this.grape_type){
                 this.$Modal.info({
                        content: '請輸入葡萄種類'
                    }); 
                return;
            }
            var data = {
                grape_type:this.grape_type
            }
            this.$http('alcoholGrapeService','addOrUpdate',data)
            .then(res=>{
                if(res.result == 'success'){
                    this.$Message.success('添加成功');
                    this.getList(0);
                }else{
                    this.$Message.error(res.message);
                }
            })
        },
        pageChange(index){ //切換頁數
            this.current = index==1?0:(index-1)*5;
            this.getList(this.current);
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

