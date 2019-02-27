<template>
<div class="wrappar">
    <div class="nav">
        <div class="j_tit">即時數據</div>
    </div>
    <div class="activity">
        <Table border  :columns="columns1" :data="data1"  class="post" :loading="loading">
            <template slot-scope="{ row, index }" slot="days">
                <div>{{numbers(row.days)}}</div>
            </template>
        </Table>
    </div>
</div>   
</template>
<script>
export default {
    data(){
        return{
            columns1: [
                {
                    title: '時間',
                    slot: 'days',
                    minWidth:140
                },
                {
                    title: '總訂單數',
                    key: 'ordernum',
                    minWidth:120
                },
                {
                    title: 'APP訂單數',
                    key: 'appnum',
                    minWidth:130
                },
                {
                    title: 'web訂單數',
                    key: 'webnum',
                    minWidth:130
                },
                {
                    title: '總訂單金額',
                    key: 'totalmoney',
                    minWidth:130
                },
                {
                    title: 'APP訂單金額',
                    key: 'appmoney',
                    minWidth:130
                },
                {
                    title: 'web訂單金額',
                    key: 'webmoney',
                    minWidth:130
                },
                {
                    title: '平均訂單金額',
                    key: 'avgmoney',
                    minWidth:140
                },
                {
                    title: 'APP平均訂單金額',
                    key: 'appavgmoney',
                    minWidth:150
                },
                {
                    title: 'web平均訂單金額',
                    key: 'webavgmoney',
                    minWidth:150
                },
                {
                    title: '總會員數',
                    key: 'totaluser',
                    minWidth:130
                }
            ],
            data1: [],
            loading:false,
        }
    },
    created(){
        this.getList();
    },
    methods:{
        getList(){
            var data = {
            //    start:start,
            //    rows:10 
            }
            this.loading = true;
            this.$http('keyDataService','findNearData',data)
            .then(res=>{
                console.log(res)
                this.loading = false;
                if(res.rows.length>0){
                    this.data1 = res.rows;
                    this.total = res.total;
                }
            })
        },
        numbers(data){
            if(!data){return}
            // if(data > 10){
                var n = data +'';
                var arr = n.split('');
                console.log(arr)
                var newN = '';
                for(let i =0;i<arr.length;i++){
                    newN += this.changeNum(arr[i])
                }
            // }
            // var num = changeNum(data);
            console.log(newN)
            if(newN=='一'){return '昨日'}
            else{
                return `前${newN}日`
            }

        },
        changeNum(n){
            if(!n){return}
            var num = '';
            switch(parseInt(n)){
                case 1:
                num = '一';
                break;
                case 2:
                num = '二';
                break;
                case 3:
                num = '三';
                break;
                case 4:
                num = '四';
                break;
                case 5:
                num = '五';
                break;
                case 6:
                num = '六';
                break;
                case 7:
                num = '七';
                break;
                case 8:
                num = '八';
                break;
                case 9:
                num = '九';
                break;
                case 10:
                num = '十';
                break;
                case 0:
                num = '十';
                break;
            }
            return num
        }
    }
}
</script>
<style scoped>
.j_tit{
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
