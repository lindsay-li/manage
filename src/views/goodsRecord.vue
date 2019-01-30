<template>
<div class="wrappar">
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
                    title: '時間',
                    key: 'bro_time',
                    minWidth:150
                },
                {
                    title: '商品名稱',
                    key: 'product_name',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:280
                },
                {
                    title: '開啟次數',
                    key: 'num',
                    minWidth:120
                },
                {
                    title: '用戶名',
                    key: 'user_name',
                    minWidth:120
                }
            ],
            data1: [],
            country:'',
            total:0,
            current:0,
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
            this.$http('alcoholBrowseLogService','findDatas',data)
            .then(res=>{
                console.log(res)
                if(res.rows.length>0){
                    var arr = res.rows
                    for(let i =0;i<arr.length;i++){
                        arr[i].bro_time = this.$changeTime(arr[i].bro_time)
                    }
                    this.data1 = arr;
                    this.total = res.total;
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
.wrapper{
    position: relative;
}
.page{
    justify-content: flex-end;
}

</style>
