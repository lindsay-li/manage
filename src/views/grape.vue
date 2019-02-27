<template>
<div class="wrappar">
    <div class="_title">葡萄种类</div>
    <!-- <div class="nav">
        <div class="option">
            <span>葡萄種類：</span>
            <Input type="text"  v-model="grape_type" style="width:160px" />
        </div>
        <div class="serch" @click="newAdd">新增</div>
    </div> -->
    <div class="goods">
        <Table border  :columns="columns1" :data="data1"   class="post">
            <template slot="action" slot-scope="{row,index}">
                <Button size="small" type="primary" @click="edit(row)">编辑</Button>
                <Button size="small" type="error" @click="remove(row.id)">刪除</Button>
            </template>
        </Table>
    </div>
    <div class="page">
        <div class="_btn">
            <div class="send" @click="openModel">新增</div>
        </div>
        <Page :total="total" show-total show-elevator prev-text='上一頁' next-text='下一頁'  @on-change="pageChange"/>
    </div>
    <div class="prop_model" v-show="propModel">
        <div class="_box">
            <div class="contant">
                <div class="tit">新增</div>
                <div class="list">
                    <table style="width:100%;">
                        <tr>
                            <td style="text-align:right">葡萄种类:</td>
                            <td>
                                <Input v-model="varietal_name"  placeholder="點擊輸入" style="width: 160px;" />
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="btns">
                    <div class="cancel" @click='closeModel'>取消</div>
                    <div class="sure" @click="setMenuHandle">確定</div>
                </div>
            </div>
        </div>
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
                    title: '葡萄種類',
                    key: 'varietal_name',
                    minWidth:180
                },
                {
                    title:'操作',
                    slot:'action',
                    width:140
                }
            ],
            data1: [],
            grape_type:'',
            propModel:false,
            total:0,
            current:0,
            varietal_name:''
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
            this.$http('moVarietalService','findDatas',data)
            .then(res=>{
                console.log(res)
                if(res.rows){
                    var arr = res.rows
                    this.data1 = arr;
                    this.total = res.total;
                }
            })
        },
        remove (id) {
            this.$Modal.confirm({
                title: '警告',
                content: '<h3>此操作將刪除數據，是否繼續？</h3>',
                onOk: () => {
                     var data = {id:id};
                    this.$http('moVarietalService','deleteData',data)
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
        openModel(){
            this.propModel = true;
        },
        closeModel(){
            this.propModel = false;
            this.varietal_name = ''
        },
        edit(row){
           this.varietal_name = row.varietal_name
            this.id = row.id;
            this.propModel = true;
        },
        setMenuHandle(){
            if(!this.varietal_name){
                 this.$Modal.info({
                        content: '請輸入葡萄種類'
                    }); 
                return;
            }
            var data = {
                varietal_name:this.varietal_name
            }
            var notice = '添加成功'
            if(this.id){
                data.id = this.id
                notice = '修改成功'
            }
            this.$http('moVarietalService','addOrUpdate',data)
            .then(res=>{
                if(res.result == 'success'){
                    this.propModel = false
                    this.$Message.success(notice);
                    this.getList(this.current);
                    this.id = ''
                    this.varietal_name = ''
                }else{
                    this.$Message.error(res.message);
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
@import '../../static/title.css';
.wrapper{
    position: relative;
}
.page{
    justify-content: space-between;
}
._box{
    width: 360px;
    height: 260px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -130px 0 0 -180px;
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
