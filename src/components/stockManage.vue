<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>商品編號：</span>
            <input type="text" >
        </div>
        <div class="option">
            <span>名稱：</span>
            <input type="text" name="phone">
        </div>
        <div class="serch">查詢</div>
    </div>
    <div class="query">
        <Table border  :columns="columns1" :data="data1"  @on-selection-change="selectChange1" class="post"></Table>
    </div>
    <div class="page">
        <div class="btns">
            <div class="add_goods"  @click="openCreatePage">添加商品</div>
            <div class="delete">批量刪除</div>
        </div>
        
        <Page :total="100" show-total show-elevator prev-text='上一頁' next-text='下一頁'/>
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
                    title: '商品編號',
                    key: 'order1'
                },
                {
                    title: '名稱',
                    key: 'order2'
                },
                {
                    title: '售價',
                    key: 'order3'
                },
                {
                    title: '年份',
                    key: 'order4'
                },
                {
                    title: '類型',
                    key: 'order5'
                },
                {
                    title:'年產量',
                    key:'order6',
                    
                },
                {
                    title:'國家',
                    key:'order7'
                },
                {
                    title:'酒莊',
                    key:'order8'
                },
                {
                    title:'產品',
                    key:'order9'
                },
                {
                    title:'總剩餘庫存',
                    minWidth:120,
                    key:'order10'
                },
                {
                    title:'分店庫存',
                    key:'order11',
                    render:(h,params)=>{
                        return h('span',{
                            style:{
                                fontSize:'14px',
                                color:'#ED4014',
                                cursor:'pointer'
                            },
                            on: {
                                click: () => {
                                    this.updateData(params)
                                }
                            }
                        },'查看')
                    }
                }
            ],
            data1: [
                {
                    order1:'發哥',
                    order2:'葡萄酒',
                    order3:'1',
                    order4:'12',
                    order5:'紅酒',
                    order6:'www.wdwd.ddd',
                    order7:'',
                    order8:'',
                    order9:'',
                    order10:''
                }
            ],
            createPage:false,
            c_data1:''
        }
    },
    methods:{
        remove (index) {
            this.data1.splice(index, 1);
        },
        selectChange1(selection){
            console.log(selection)
        },
        change(){
            console.log(111)
        },
        openCreatePage(){ //打開創建商品彈窗
            this.createPage = true;
        },
        closeProp(){
            this.createPage = false;
        },
        updateData(data){

        }
    }  
}
</script>
<style scoped>
.page{
    justify-content: space-between;
}
.btns .delete{
    margin-left: 20px;
    background-color: #ED4014;
}
</style>
