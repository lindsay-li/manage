<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>會商品編號：</span>
            <input type="text" >
        </div>
        <div class="option">
            <span>數量：</span>
            <input type="text" name="phone">
        </div>
        <div class="option">
            <span>年份：</span>
            <input type="text" name="time">
        </div>
        <div class="option">
            <span>類型：</span>
            <input type="text" name="time">
        </div>
        <div class="serch">查詢</div>
    </div>
    <div class="query">
        <Table border  :columns="columns1" :data="data1"  @on-selection-change="selectChange1" class="post"></Table>
    </div>
    <div class="page">
        <div class="add_goods"  @click="openCreatePage">添加商品</div>
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
                    title: '數量',
                    key: 'order3'
                },
                {
                    title: '售價',
                    key: 'order4'
                },
                {
                    title: '年份',
                    key: 'order5'
                },
                {
                    title:'類型',
                    key:'order6',
                    
                },
                {
                    title:'年產量',
                    key:'order7'
                },
                {
                    title:'酒精濃度',
                    key:'order8'
                },
                {
                    title:'適合溫度',
                    key:'order9'
                },
                {
                    title:'進口原包裝',
                    width:124,
                    key:'order10'
                },
                {
                    title:'酒莊',
                    key:'order11'
                },
                {
                    title:'產品',
                    key:'order12'
                },
                {
                    title:'葡萄品種',
                    key:'order13'
                },
                {
                    title:'酒標照片',
                    key:'order14',
                    render: (h, params) => {
                        if(params.row.order9==''){
                            return h('Upload',
                            {
                                props:{
                                    action:"//jsonplaceholder.typicode.com/posts/",
                                    onSuccess:this.change
                                },
                                
                            }, [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        fontSize: '14px'
                                    },
                                }, '上傳')
                            ]);
                        }else{
                            return h('span', {
                                    
                                }, params.row.order9)
                        }                       
                    }
                },
                {
                    title:'沙龍照',
                    key:'order15',
                    render: (h, params) => {
                        if(params.row.order9==''){
                            return h('Upload',
                            {
                                props:{
                                    action:"//jsonplaceholder.typicode.com/posts/",
                                    onSuccess:this.change
                                },    
                            }, [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        fontSize: '14px'
                                    },
                                }, '上傳')
                            ]);
                        }else{
                            return h('span', {
  
                                }, params.row.order9)
                        }                       
                    }
                },
                {
                    title:'詳細說明',
                    width:150,
                    key:'order16'
                },
                {
                    title:'編輯',
                    key:'order17',
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
                        },'編輯')
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
                    order10:'',
                    order11:'',
                    order12:'',
                    order13:'ddd.png',
                    order14:'ww.jpg',
                    order15:'xxxxxx',
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
</style>
