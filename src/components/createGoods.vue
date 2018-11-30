<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>商品編號：</span>
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
    <div class="goods">
        <Table border  :columns="columns1" :data="data1"  @on-selection-change="selectChange1" class="post"></Table>
    </div>
    <div class="page">
        <div class="add_goods"  @click="openCreatePage">添加商品</div>
        <Page :total="100" show-total show-elevator prev-text='上一頁' next-text='下一頁'/>
    </div>
    <!-- 創建商品彈窗 -->
    <div class="create_model" v-show="createPage">
        <div class="create_box">
            <div class="c_title">建立商品</div>
            <div class="c_table">
                <table  >
                    <tr>
                        <td>商品編號</td>
                        <td>名稱</td>
                        <td>數量</td>
                        <td>售價</td>
                        <td>年份</td>
                        <td>類型</td>
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
                        <td>年產量</td>
                        <td>酒精濃度</td>
                        <td>適合溫度</td>
                        <td>進口原包裝</td>
                        <td>酒莊</td>
                        <td>葡萄品種</td>
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
                        <td>酒標照片</td>
                        <td>沙龍照</td>
                        <td>詳細說明</td>
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
                <div class="cancel" @click='closeProp'>取消</div>
                <div class="sure">確定</div>
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
                    key:'order10'
                },
                {
                    title:'酒莊',
                    key:'order11'
                },
                {
                    title:'葡萄品種',
                    key:'order12'
                },
                {
                    title:'酒標照片',
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
                    title:'詳細說明',
                    key:'order15'
                },
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
        }
    }  
}
</script>
<style scoped>
.wrapper{
    position: relative;
}
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
    margin: -220px 0 0 -380px;
    width: 720px;
    height: 440px;
    background-color:#fff;
    border-radius: 4px; 
}
.c_title{
    width: 90%;
    height:38px;
    border-radius: 6px;
    background-color: #169BD5;
    text-align: center;
    line-height: 38px;
    font-size: 16px;
    color: #fff;
    font-weight: 600;
    margin: 20px auto ;
}
.c_table{
    width: 90%;
    height: 220px;
    margin: 0 auto 30px;
}
table,table tr th, table tr td { border:1px solid #555; }
table{
    border-collapse: collapse;
    padding:2px;
}
td{
    /* width: 98px; */
    height: 37px;
    box-sizing: border-box;
    line-height: 30px;
    text-align: center;
    /* border: 1px solid #555; */
    /* border-left:0;
    border-bottom: 0; */
}

td input{
    width: 98%;
    height: 98%;
    border: none;
    outline: none;
    text-align: center;
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
    margin-left: 30px;
}
</style>
