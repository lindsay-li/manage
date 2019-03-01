<template>
<div class="wrappar">
    <div class="_title">關注記錄</div>
    <div class="handle">
        <Table border  :columns="columns1" :data="data1"   class="post">
            <template slot-scope="{ row, index }" slot="notice">
                <div>{{row.notice==1?'關閉':'正常'}}</div>
            </template>
            <template slot-scope="{ row, index }" slot="shield">
                <div>{{row.shield==1?'屏蔽':'正常'}}</div>
            </template>
            <template slot-scope="{ row, index }" slot="blacklist">
                <div>{{row.blacklist==1?'是':'正常'}}</div>
            </template>
            <template slot-scope="{ row, index }" slot="type">
                <div>{{row.type==1?'是':'正常'}}</div>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="error" size="small" @click="deletes(row.id)">刪除</Button>
            </template>
        </Table>
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
                    title: '被關注用戶ID',
                    key: 'follow_user_id',
                    minWidth:130
                },
                {
                    title: '被關注的用戶',
                    key: 'fname',
                    minWidth:140
                },
                {
                    title: '發起關注用戶ID',
                    key: 'user_id',
                    minWidth:140
                },
                {
                    title: '發起關注用戶',
                    key: 'tname',
                    minWidth:140
                },
                {
                    title: '貼文通知',
                    slot: 'notice',
                    width:120
                },
                {
                    title: '查看動態',
                    slot: 'shield',
                    width:120
                },
                {
                    title: '拉黑',
                    slot: 'blacklist',
                    width:120
                },
                {
                    title: '取消關注',
                    slot: 'type',
                    width:120
                },
                {
                    title:'操作',
                    slot:'action',
                    width:90
                }
            ],
            data1: [],
            loading:false,
            total:0,
            current:0,
            id:''
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
            this.loading = true;
            this.$http('followService','findDatas',data)
            .then(res=>{
                console.log(res)
                this.loading = false;
                if(res.rows){
                    this.data1 = res.rows;
                    this.total = res.total;
                }
            })
        },
        pageChange(index){ //切換頁數
            this.current = index==1?0:(index-1)*10;
            this.getList(this.current);
            
        },
        deletes(id){
            this.$Modal.confirm({
                title: '警告',
                content: '<h3>此操作將刪除數據，是否繼續？</h3>',
                onOk: () => {
                     var data = {id:id};
                    this.$http('followService','deleteData',data)
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
</style>
