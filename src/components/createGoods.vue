<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>会员编号：</span>
            <input type="text" >
        </div>
        <div class="option">
            <span>酒名：</span>
            <input type="text" name="phone">
        </div>
        <div class="option">
            <span>数量：</span>
            <input type="text" name="time">
        </div>
        <div class="serch">查询</div>
    </div>
    <div class="goods">
        <Table border  :columns="columns1" :data="data1"  @on-selection-change="selectChange1" class="post"></Table>
    </div>
    <div class="page">
        <div class="add_goods"  @click="openCreatePage">添加商品</div>
        <Page :total="100" show-total show-elevator prev-text='上一页' next-text='下一页'/>
    </div>
    <!-- 创建商品弹窗 -->
    <div class="create_model" v-show="createPage">
        <div class="create_box">
            <div class="c_title">建立商品</div>
            <div class="c_table">
                <table cellspacing='0' cellpadding='0' >
                    <tr>
                        <td>商品编号</td>
                        <td>名称</td>
                        <td>数量</td>
                        <td>售价</td>
                        <td>年份</td>
                        <td>类型</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" v-model="c_data1">
                        </td>
                        <td>
                            <input type="text" v-model="c_data1">
                        </td>
                        <td>
                            <input type="text" v-model="c_data1">
                        </td>
                        <td>
                            <input type="text" v-model="c_data1">
                        </td>
                        <td>
                            <input type="text" v-model="c_data1">
                        </td>
                        <td>
                            <input type="text" v-model="c_data1">
                        </td>
                    </tr>
                    <tr>
                        <td>年产量</td>
                        <td>酒精浓度</td>
                        <td>适合温度</td>
                        <td>进口原包装</td>
                        <td>酒庄</td>
                        <td>葡萄品种</td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" v-model="c_data1">
                        </td>
                        <td>
                            <input type="text" v-model="c_data1">
                        </td>
                        <td>
                            <input type="text" v-model="c_data1">
                        </td>
                        <td>
                            <input type="text" v-model="c_data1">
                        </td>
                        <td>
                            <input type="text" v-model="c_data1">
                        </td>
                        <td>
                            <input type="text" v-model="c_data1">
                        </td>
                    </tr>
                    <tr>
                        <td>酒标照片</td>
                        <td>沙龙照</td>
                        <td>详细说明</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr >
                        <td>
                            <input type="text" v-model="c_data1">
                        </td>
                        <td>
                            <input type="text" v-model="c_data1">
                        </td>
                        <td>
                            <input type="text" v-model="c_data1">
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>
            <div class="c_btns">
                <div class="cancel">取消</div>
                <div class="sure">确定</div>
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
                    key:'order10'
                },
                {
                    title:'酒庄',
                    key:'order11'
                },
                {
                    title:'葡萄品种',
                    key:'order12'
                },
                {
                    title:'酒标照片',
                    key:'order13',
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
                                        fontSize: '16px'
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
                                        fontSize: '16px'
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
                    key:'order15'
                },
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
        }
    }  
}
</script>
<style scoped>
.page{
    justify-content: space-between;
}
.create_model{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
}
.create_box{
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -165px 0 0 -310px;
    width: 620px;
    height: 330px;
    background-color:#fff;
    border-radius: 4px; 
}
.c_title{
    width: 90%;
    height:28px;
    border-radius: 6px;
    background-color: #169BD5;
    text-align: center;
    line-height: 28px;
    font-size: 16px;
    color: #fff;
    font-weight: 600;
    margin: 10px auto ;
}
.c_table{
    width: 90%;
    height: 180px;
    margin: 0 auto 20px;
}
td{
    width: 98px;
    height: 30px;
    box-sizing: border-box;
    line-height: 30px;
    text-align: center;
    border: 1px solid #555;
    border-left:0;
    border-bottom: 0;
}
td input{
    width: 98%;
    height: 98%;
    border: none;
    outline: none;
}
.c_btns{
    width: 100%;
    display: flex;
    justify-content: center;
}
.cancel,
.sure{
    width: 140px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    border-radius: 6px;
    box-sizing: border-box;
}
.cancel{
    color: #222;
    border: 1px solid #999;
}
.sure{
    color: #fff;
    background-color: #169BD5;
}
</style>
