<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>葡萄种类：</span>
            <Input type="text"  v-model="grape_type" style="width:160px" />
        </div>
        <div class="serch" @click="newAdd">新增</div>
    </div>
    <div class="goods">
        <Table border  :columns="columns1" :data="data1"  @on-selection-change="selectChange1" class="post">
            <template slot="action" slot-scope="{row,index}">
                <Button size="small" type="error" @click="remove(row.id)">删除</Button>
            </template>
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
                    title: '葡萄种类',
                    key: 'grape_type',
                    minWidth:180
                },
                {
                    title: '创建时间',
                    key: 'time',
                    minWidth:180
                },
                {
                    title: 'ID',
                    key: 'id',
                    minWidth:90
                },
                {
                    title:'操作',
                    slot:'action',
                    width:90
                }
            ],
            data1: [],
            grape_type:'',
            total:0,
            current:0
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
            this.$http('alcoholGrapeService','findDatas',data)
            .then(res=>{
                console.log(res)
                if(res.rows){
                    var arr = res.rows
                    for(let i =0;i<arr.length;i++){
                        arr[i].time = this.$changeTime(arr[i].time)
                    }
                    this.data1 = arr;
                    this.total = res.total;
                }
            })
        },
        remove (id) {
            this.$Modal.confirm({
                title: '警告',
                content: '<h3>此操作将删除数据，是否继续？</h3>',
                onOk: () => {
                     var data = {id:id};
                    this.$http('alcoholGrapeService','deleteData',data)
                    .then(res=>{
                        if(res.result == 'success'){
                            this.$Message.success('删除成功');
                            this.getList(this.current);
                        }else{
                            this.$Message.error('操作失败');
                        }
                    })
                },
                onCancel: () => {
                }
            })  
        },
        selectChange1(selection){
            console.log(selection)
        },
        newAdd(){
            if(!this.grape_type){
                 this.$Modal.info({
                        content: '请输入葡萄种类'
                    }); 
                return;
            }
            var data = {
                grape_type:this.grape_type
            }
            this.$http('alcoholGrapeService','addOrUpdate',data)
            .then(res=>{
                if(res.result == 'success'){
                    this.$Message.success('添加成功');
                    this.getList(0);
                }else{
                    this.$Message.error(res.message);
                }
            })
        },
        pageChange(index){ //切换页数
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
