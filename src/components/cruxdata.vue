<template>
 <div class="contant">
     <div class="title">即時數據</div>
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
            data1: [
                {
                    order1: '7單',
                    order2: 'xxx',
                    order3: 33  
                },
                {
                    order1: '零庫存商品數',
                    order2: '待出貨訂單數',
                    order3: '平均出貨天數'   
                },
                {
                    order1: '4單',
                    order2: 'xxx',
                    order3: 33                   
                }
            ]
        }
    } ,
    created(){
        this.getDatas();
    },
    methods: {
            getDatas(){
                var data = {
                      service:'keyDataService',
                      method:'findTimelyData',
                      data:JSON.stringify({
                            start:0,
                            rows:20
                        })
                    };
                this.$http.post('/api/op/in',this.$qs.stringify(data))
                .then((res)=>{
                    console.log(res);
                    // if(res.status == 'success'){
                    //     var obj = {
                    //         order1:res.result.num_count,
                    //         order2:res.result.price_count,
                    //         order3:res.result.goods_num
                    //     }
                    //     var obj1={
                    //         order1:'零庫存商品數',
                    //         order2:'待出貨訂單數',
                    //         order3:'平均出貨天數'
                    //     }
                    //     var obj2 = {
                    //         order1:res.result.nostock_num,
                    //         order2:res.result.watfs_num,
                    //         order3:0
                    //     }
                    //     var arr = []
                    //     arr.push(obj);
                    //     arr.push(obj1);
                    //     arr.push(obj2);
                    //     this.data1 = arr;
                    // }
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
.title{
    width: 100%;
    height: 50px;
    background-color: #009688;
    border-radius: 4px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    line-height: 50px;
    margin-bottom: 30px;
}
</style>
