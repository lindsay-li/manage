<template>
<div class="wrappar">
    <div class="_title">紅利葡萄</div>
    <div class="nav">
        <div class="option">
            <span>用戶ID：</span>
            <Input type="text"  v-model="inputValue.user_id" style="width:160px" />
        </div>
        <div class="option">
            <span>用戶名稱：</span>
            <Input type="text"  v-model="inputValue.name" style="width:160px" />
        </div>
        <div class="serch" @click="search">查詢</div>
    </div>
    <div class="goods">
        <Table border  :columns="columns1" :data="data1"  class="post">
            <template slot="num" slot-scope="{row,index}">
                <div>{{row.status==1?'+':'-'}}{{row.num}}</div>
            </template>
            <template slot="state" slot-scope="{row,index}">
                <div>{{states(row.state)}}</div>
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
                    title: '用户ID',
                    key: 'user_id',
                    minWidth:110
                },
                {
                    title: '用户名称',
                    key: 'name',
                    minWidth:140
                },
                {
                    title: '点数',
                    slot: 'num',
                    minWidth:140
                },
                {
                    title: '剩余',
                    key: 'Surplus',
                    minWidth:140
                },
                {
                    title: '状态',
                    slot: 'state',
                    minWidth:140
                },
                {
                    title: '来源',
                    key: 'type',
                    minWidth:90
                },
                {
                    title: '更新時間',
                    key: 'updatetime',
                    minWidth:160
                },
                {
                    title:'操作',
                    slot:'action',
                    width:90
                }
            ],
            data1: [],
            stateList:[{value:0,label:'使用失败、失效'},{value:1,label:'使用中'},{value:2,label:'使用完成'},],
            total:0,
            current:0,
            propModel:false,
            inputValue:{
                user_id:'',
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
            this.$http('vineyardLogService','findDatas',data)
            .then(res=>{
                console.log(res)
                if(res.rows){
                    var arr = res.rows
                    for(let i =0;i<arr.length;i++){
                        arr[i].updatetime =arr[i].updatetime?this.$changeTime(arr[i].updatetime):""
                    }
                    this.data1 = arr;
                    this.total = res.total;
                }
            })
        },
        search(){ //按條件查詢
            var obj = {};
            if(this.inputValue.name){
                obj.name = this.inputValue.name;
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
        remove (id) {
            this.$Modal.confirm({
                title: '警告',
                content: '<h3>此操作將刪除數據，是否繼續？</h3>',
                onOk: () => {
                     var data = {id:id};
                    this.$http('vineyardLogService','deleteData',data)
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
        states(id){
            if(!id && id != 0){
                return ''
            }
            console.log(id)
            let result = this.stateList.find(item=>item.value==id)
            if(result){
                return result.label
            }else{
                return ''
            }
        },
        pageChange(index){ //切換頁數
            this.current = index==1?0:(index-1)*10;
            if(this.type==1){
                this.getList(this.current);
            }else{
                this.getList(this.current,this.obj)
            }
        }
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
.page{
    justify-content: space-between;
}
._box{
    width: 360px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -125px 0 0 -150px;
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
    position: absolute;
    bottom: 20px;
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
.tit{
    width: 100px;
    height: 36px;
    background-color: #009688;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 36px;
    margin-left: 20px;
    margin-top: 30px;
    margin-bottom: 30px;
}
table td{
    height: 45px;
}
</style>
