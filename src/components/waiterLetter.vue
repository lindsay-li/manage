<template>
<div class="wrappar">
    <div class="_title">客服信件</div>
    <div class="handle">
        <Table border  :columns="columns1" :data="data1" @on-row-click="selectChange1"  class="post">
            <template slot-scope="{ row, index }" slot="type">
                <div>{{types(row.type)}}</div>
            </template>
            <template slot-scope="{ row, index }" slot="status">
                <div>
                    <Select v-model="row.status" style="width:100%" @on-change="selectChange">
                        <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="error" size="small" @click="deletes(row.id)">删除</Button>
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
                    title: '内容',
                    key: 'msg',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:200
                },
                {
                    title: '图片消息',
                    key: 'img',
                    minWidth:180
                },
                {
                    title: '用户id',
                    key: 'user_id',
                    width:120
                },
                {
                    title: '问题id',
                    key: 'pid',
                    width:120
                },
                {
                    title: '发送对象',
                    slot: 'type',
                    width:120
                },
                {
                    title:'状态',
                    slot:'status',
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
            statusList:[
                {value:0,label:'未回复'},
                {value:1,label:'已回复'}
            ],
            statusData:'',
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
            this.$http('mesmanageService','findDatas',data)
            .then(res=>{
                console.log(res)
                this.loading = false;
                if(res.rows.length>0){
                    this.data1 = res.rows;
                    this.total = res.total;
                }
            })
        },
        pageChange(index){ //切換頁數
            this.current = index==1?0:(index-1)*10;
            this.getList(this.current);
            
        },
        types(type){
            if(!type){return}
            var str = '';
            if(type==1){
                str = '管理员'
            }else if(type ==2){
                str = '用户'
            }
            return str
        },
        selectChange(value){
            console.log(value)
            this.revise(value)
        },
        selectChange1(row){
            console.log(row)
            this.id = row.id
        },
        revise(value){ //修改状态
            var data = {
                status:parseInt(value),
                id:this.id
            }
            this.$http('mesmanageService','addOrUpdate',data)
            .then(res=>{
                if(res.result=='success'){
                    this.$Message.success('修改成功');
                    this.getList(this.current);
                    this.id = '';
                }else{
                    this.$Message.error('操作失敗');
                }
            })
        },
        deletes(id){
            this.$Modal.confirm({
                title: '警告',
                content: '<h3>此操作將刪除數據，是否繼續？</h3>',
                onOk: () => {
                     var data = {id:id};
                    this.$http('mesmanageService','deleteData',data)
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
