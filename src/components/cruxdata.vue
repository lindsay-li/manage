<template>
 <div class="contant">
    <div class="_title">即時數據</div>
    <Table :columns="columns1" :data="data1" border :row-class-name="rowClassName" size='large' height='229'></Table>
 </div>   
</template>
<script>
export default {
   data () {
        return {
            columns1: [
                {
                    title: '今日訂單',
                    key: 'order1'
                },
                {
                    title: '今日訂單總金額',
                    key: 'order2'
                },
                {
                    title: '總商品數',
                    key: 'order3'
                }
            ],
            data1: [],
            loading:false,
        }
    } ,
    created(){
        this.getDatas();
    },
    methods: {
            getDatas(){
                this.loading = true;
                var data = {}
                this.$http('keyDataService','findTimelyData',data)
                .then((res)=>{
                    console.log(res);
                    this.loading = false;
                    if(res.rows.length>0){
                        var rows = res.rows[0]
                        var obj = {
                            order1:rows.ordernum?rows.ordernum:0,
                            order2:rows.ordermoney?rows.ordermoney:0,
                            order3:rows.totalproduct?rows.totalproduct:0
                        }
                        var obj1={
                            order1:'零庫存商品數',
                            order2:'待出貨訂單數',
                            order3:'平均出貨天數'
                        }
                        var obj2 = {
                            order1:rows.nokcproduct?rows.nokcproduct:0,
                            order2:rows.dchnum?rows.dchnum:0,
                            order3:rows.avgchday?rows.avgchday:0
                        }
                        var arr = []
                        arr.push(obj);
                        arr.push(obj1);
                        arr.push(obj2);
                        this.data1 = arr;
                    }
                })
            },
            rowClassName (row, index) {
                if (index === 1) {
                    return 'demo-table-info-row';
                } 
                return '';
            }
        }
}
</script>
<style scoped>
.contant{
    width: 100%;
    display: flex;
    flex-direction: column;
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
    margin-bottom: 30px;
}
</style>
