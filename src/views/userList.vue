<template>
<div class="wrappar">
    <div class="_title">用戶清單</div>
    <div class="nav">
        <div class="option">
            <span>用戶名稱：</span>
            <Input type="text"  v-model="inputValue.name" style="width:160px" />
        </div>
        <div class="serch" @click="search">查詢</div>
    </div>
    <div class="goods">
        <Table border  :columns="columns1" :data="data1" class="post">
        </Table>
    </div>
    <div class="page">
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
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '用户名稱',
                    key: 'name',
                    minWidth:120
                },
                {
                    title: '商品名称',
                    key: 'title',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:160
                },
                {
                    title: '数量',
                    key: 'num',
                    minWidth:110
                },
                {
                    title: '售价',
                    key: 'total_price',
                    minWidth:110
                }
            ],
            data1: [],
            country:'',
            total:0,
            current:0,
            inputValue:{
                name:''
            },
            type:1,
            obj:{}
        }
    },
    created(){
        this.getList(0)
    },
    methods:{
        getList(start,obj){
            var data = {}
            if(obj){
                data = obj;
            }
            data.start = start;
            data.rows = 10
            this.$http('orderInfoService','findDatas',data)
            .then(res=>{
                console.log(res)
                if(res.rows){
                    var arr = res.rows
                    this.data1 = arr;
                    this.total = res.total;
                }
            })
        },
        search(){ //按條件查詢
            var obj = {};
            if(this.inputValue.name){
                obj.user_name = this.inputValue.name;
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

</style>
