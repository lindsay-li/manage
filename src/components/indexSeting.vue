<template>
<div class="wrappar">
    <div class="_title">首頁設定</div>
    <div class="handle">
        <app-banner></app-banner>
        <web-banner></web-banner>
    </div>
</div>   
</template>
<script>
import appBanner from './appBanner'
import webBanner from './webBanner'
export default {
    data(){
        return{
            
        }
    },
    components:{
        appBanner,
        webBanner
    },
    created(){
        // this.getList(0)
    },
    methods:{
        getList(start){
            var data = {
               start:start,
               rows:10 
            }
            this.loading = true;
            this.$http('sowingmapService','findDatas',data)
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
        types(type){
            if(!type){return}
            var str = '';
            if(type==1){
                str = '公司發票'
            }else if(type ==2){
                str = '捐贈'
            }else if(type == 3){
                str = '個人發票'
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
        revise(value){ //修改狀態
            var data = {
                status:parseInt(value),
                id:this.id
            }
            this.$http('invoiceService','addOrUpdate',data)
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
                    this.$http('invoiceService','deleteData',data)
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
