<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>商品名称：</span>
            <Input type="text"  v-model="inputValue.product_name" style="width:160px" />
        </div>
        <div class="option">
            <span>商品类型：</span>
            <Input type="text"  v-model="inputValue.product_type" style="width:160px" />
        </div>
        <div class="option">
            <span>售价：</span>
            <!-- <Input type="text"  v-model="product_name" style="width:160px" /> -->
            <InputNumber  :min="0" v-model="inputValue.price" style="width:160px" ></InputNumber>
        </div>
        <div class="serch" @click="search">查询</div>
    </div>
    <div class="car">
        <Table border  :columns="columns1" :data="data1"  class="post" :loading="loading"></Table>
    </div>
    <div class="page">
        <Page :total="total" show-total show-elevator prev-text='上一頁' next-text='下一頁' @on-change="pageChange"/>
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
                    title: '用戶名稱',
                    key: 'user',
                    minWidth:160
                },
                {
                    title: '商品名稱',
                    key: 'product_name',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:160
                },
                {
                    title: '商品類型',
                    key: 'product_type',
                    minWidth:160
                },
                {
                    title: '價格',
                    key: 'price',
                    minWidth:120
                },
                {
                    title: '數量',
                    key: 'num',
                    minWidth:120
                },
                {
                    title:'操作',
                    key:'action',
                    width:90,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.row.id)
                                    }
                                }
                            }, '刪除')
                        ]);
                    }
                }
            ],
            data1: [],
            loading:false,
            current:0,
            total:0,
            inputValue:{
                product_name:"",
                product_type:"",
                price:0
            }
        }
    },
    created(){
        this.getList(0);
    },
    methods:{
        getList(start,obj){
            var data = {
                start:start,
                rows:10
            }
            if(obj){
                data = obj;
            }
            this.loading = true;
            this.$http('shoppingTrolleyService','findDatas',data)
            .then(res=>{
                console.log(res)
                this.loading = false;
                if(res.rows){
                    this.total = res.total;
                    this.data1 = res.rows;
                }
            })
            .catch(err=>{
                this.loading = false;
            })
        },
        search(){ //按条件查询
            var obj = {};
            if(this.inputValue.product_name){
                obj.product_name = this.inputValue.product_name;
            }
            if(this.inputValue.product_type){
                obj.product_type = this.inputValue.product_type;
            }
            if(this.inputValue.price >0){
                obj.price = this.inputValue.price;
            }
            var arr =Object.keys(obj)
            if(arr.length>0){
                this.getList(0,obj)
            }else{
                this.getList(0)
            }
            
        },
        remove (id) {
            this.$Modal.confirm({
                title: '警告',
                content: '<h3>此操作將刪除數據，是否繼續？</h3>',
                onOk: () => {
                     var data = {id:id};
                    this.$http('shoppingTrolleyService','deleteData',data)
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
        pageChange(index){ //切換頁數
            this.current = index==1?0:(index-1)*10;
            this.getList(this.current);
        },
    }
}
</script>
<style scoped>
.page{
    justify-content: flex-end;
}
</style>
