<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>会商品编号：</span>
            <input type="text" >
        </div>
        <div class="option">
            <span>数量：</span>
            <input type="text" name="phone">
        </div>
        <div class="option">
            <span>年份：</span>
            <input type="text" name="time">
        </div>
        <div class="option">
            <span>类型：</span>
            <input type="text" name="time">
        </div>
        <div class="serch">查询</div>
    </div>
    <div class="query">
        <Table border  :columns="columns1" :data="data1"  @on-selection-change="selectChange1" class="post"></Table>
    </div>
    <div class="page">
        <div class="add_goods"  @click="openCreatePage">添加商品</div>
        <Page :total="100" show-total show-elevator prev-text='上一页' next-text='下一页'/>
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
                    title: '商品编号',
                    key: 'order1'
                },
                {
                    title: '名称',
                    key: 'order2'
                },
                {
                    title: '数量',
                    key: 'order3'
                },
                {
                    title: '售价',
                    key: 'order4'
                },
                {
                    title: '年份',
                    key: 'order5'
                },
                {
                    title:'类型',
                    key:'order6',
                    
                },
                {
                    title:'年产量',
                    key:'order7'
                },
                {
                    title:'酒精浓度',
                    key:'order8'
                },
                {
                    title:'适合温度',
                    key:'order9'
                },
                {
                    title:'进口原包装',
                    width:124,
                    key:'order10'
                },
                {
                    title:'酒庄',
                    key:'order11'
                },
                {
                    title:'产品',
                    key:'order12'
                },
                {
                    title:'葡萄品种',
                    key:'order13'
                },
                {
                    title:'酒标照片',
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
                                }, '上传')
                            ]);
                        }else{
                            return h('span', {
                                    
                                }, params.row.order9)
                        }                       
                    }
                },
                {
                    title:'沙龙照',
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
                                }, '上传')
                            ]);
                        }else{
                            return h('span', {
  
                                }, params.row.order9)
                        }                       
                    }
                },
                {
                    title:'详细说明',
                    width:150,
                    key:'order16'
                },
                {
                    title:'编辑',
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
                        },'编辑')
                    }
                }
            ],
            data1: [
                {
                    order1:'发哥',
                    order2:'葡萄酒',
                    order3:'1',
                    order4:'12',
                    order5:'红酒',
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
        openCreatePage(){ //打开创建商品弹窗
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
