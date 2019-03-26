<template>
<div class="wrappar">
    <div class="_title">折扣券</div>
    <div class="nav">
        <div class="option">
            <span>用戶ID：</span>
            <Input type="text"  v-model="inputValue.user_id" style="width:160px" />
        </div>
        <div class="option">
            <span>用戶名稱：</span>
            <Input type="text"  v-model="inputValue.user" style="width:160px" />
        </div>
        <div class="serch" @click="search">查詢</div>
    </div>
    <div class="handle">
        <Table border  :columns="columns1" :data="data1" @on-row-click="selectChange1"  class="post">
            <template slot-scope="{ row, index }" slot="end_time">
                <div>{{row.start_time}}——{{row.end_time}}</div>
            </template>
            <template slot-scope="{ row, index }" slot="status">
                <div>
                    {{statuslists(row.status)}}
                </div>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" @click="edit(row)">編輯</Button>
                <Button type="error" size="small" @click="deletes(row.id)">刪除</Button>
            </template>
        </Table>
    </div>
    <div class="page">
        <div class="_btn">
            <!-- <div class="send" @click="openModel">新增補發</div> -->
        </div>
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
                    title: '用戶ID',
                    key: 'user_id',
                    minWidth:100
                },
                {
                    title: '用戶名稱',
                    key: 'name',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:140
                },
                {
                    title: '折扣券名稱',
                    key: 'discount_name',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:180
                },
                {
                    title: '實際優惠金額(分)',
                    key: 'actual',
                    width:150
                },
                {
                    title: '使用期限',
                    slot: 'end_time',
                    width:320
                },
                {
                    title: '狀態',
                    slot: 'status',
                    width:120
                }
            ],
            data1: [],
            loading:false,
            total:0,
            current:0,
            statusList:[
                {value:0,label:'未使用'},
                {value:1,label:'已使用'},
                {value:2,label:'中途取消'}
            ],
            statusData:'',
            couponsList:[],
            id:'',
            propModel:false,
            inputValue:{
                user:'',
                user_id:'',
            },
            type:1,
            obj:{}
        }
    },
    created(){
        // this.getCoupons()
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
            this.loading = true;
            this.$http('couponService','findDatas',data)
            .then(res=>{
                console.log(res)
                this.loading = false;
                if(res.rows){
                    var arr = res.rows
                    for(let i=0;i<arr.length;i++){
                        arr[i].start_time = arr[i].start_time?this.$changeTime(arr[i].start_time):''
                        arr[i].end_time = arr[i].end_time?this.$changeTime(arr[i].end_time):''
                    }
                    this.data1 = arr;
                    this.total = res.total;
                }
            })
        },
        pageChange(index){ //切換頁數
            this.current = index==1?0:(index-1)*10;
            if(this.type==1){
                this.getList(this.current);
            }else{
                this.getList(this.current,this.obj)
            }
        },
        search(){ //按條件查詢
            var obj = {};
            if(this.inputValue.user){
                obj.name = this.inputValue.user;
            }
            if(this.inputValue.user_id){
                obj.user_id = parseInt(this.inputValue.user_id);
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
        selectChange(value){
            console.log(value)
            this.revise(value)
        },
        selectChange1(row){
            console.log(row)
            this.id = row.id
        },
        coupons(id){
            if(!id){return ''}
            var result = this.couponsList.find(item=>item.value==id)
            if(result){
                return result.label
            }else{
                return ''
            }
        },
        statuslists(id){
            if(!id && id != 0){return ''}
            var result = this.statusList.find(item=>item.value==id)
            if(result){
                return result.label
            }else{
                return ''
            }
        }
    }
}
</script>
<style scoped>
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
.page{
    justify-content: space-between;
}
.tit{
    width: 430px;
    height: 36px;
    background-color: #009688;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 36px;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 30px;
}
._box{
    width: 600px;
    height: 680px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -340px 0 0 -300px;
    border-radius: 4px;
    background-color: #fff;
}
.contant{
    width: 90%;
    margin: 0 auto;
}

.btns{
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 30px;
}
.cancel,
.sure{
    width: 136px;
    height:40px;
    line-height: 40px; 
}
.sure{
    margin-left: 20px;
}
table tr td{
    height: 40px;
    text-align: center;
}
</style>
