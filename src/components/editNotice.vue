<template>
<div class="wrappar">
    <div class="nav">
        <div class="titles">公告&广告</div>
    </div>
    <div class="notice">
        <Table border  :columns="columns1" :data="data1"  @on-selection-change="selectChange1"></Table>
    </div>
    <div class="page">
        <div class="add_goods" @click="openPropModel">新增公告</div>
        <Page :total="100" show-total show-elevator prev-text='上一页' next-text='下一页'/>
    </div>
    <div class="prop_model" v-show="propModel">
        <div class="n_box">
            <div class="n_content">
                <div class="n_title">新增公告</div>
                <table style="width:100%">
                    <tr>
                        <td>公告种类</td>
                        <td>
                            <Select v-model="selectData" style="width:220px;">
                                <Option v-for="item in noticeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td>发送用户</td>
                        <td>
                            <Select v-model="selectData" style="width:220px;">
                                <Option v-for="item in userList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td>标题</td>
                        <td>xxx活动</td>
                    </tr>
                    <tr>
                        <td>发送时间</td>
                        <td>2019/2/2</td>
                    </tr>
                    <tr>
                        <td>结束时间</td>
                        <td>2019/2/2</td>
                    </tr>
                    <tr>
                        <td style="height:110px;">内容</td>
                        <td>2019/2/2....</td>
                    </tr>
                    <tr>
                        <td>夹带折扣券</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>连接</td>
                        <td>www...ds</td>
                    </tr>
                </table>
                <div class="_btns">
                    <div class="sure">确定</div>
                    <div class="cancel" @click="closeModel">取消</div>
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
                    title: '类型',
                    key: 'order1',
                    minWidth:105
                },
                {
                    title: '内容',
                    key: 'order2',
                    minWidth:180
                },
                {
                    title: '连接',
                    key: 'order3',
                    minWidth:160
                },
                {
                    title: '是否审核',
                    key: 'order4',
                    minWidth:85
                },
                {
                    title:'是否上架',
                    key:'order5',
                    minWidth:85,
                },
                {
                    title:'当前状态',
                    key:'order6',
                    minWidth:85,
                },
                {
                    title:'修改',
                    key:'order7',
                    minWidth:85,
                    render:(h,params)=>{
                        return h('Button',{
                            props:{
                                size:'small'
                            },
                            on:{
                                click:()=>{
                                    this.openPropModel();
                                }
                            }
                        },'修改')
                    }
                },
            ],
            data1: [
                {
                    order1: '公告',
                    order2: '红酒新增',
                    order3: 'www.dadd.cn',
                    order4: '否',
                    order5:'否',
                    order6:'正在审核',
                },
                
            ],
            userList:[],
            noticeList:[],
            propModel:false
        }
    },
    methods:{
        openPropModel(){
            this.propModel = true;  
        },
        selectChange1(){

        },
        closeModel(){
            this.propModel = false;
        }
    }
   
}
</script>
<style scoped>
.page{
    justify-content: space-between;
}
.titles{
    width: 100%;
    height: 36px;
    background-color: #009688;
    border-radius: 4px;
    line-height: 36px;
    text-align: center;
    color: #fff;
}
.n_box{
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -290px 0 0 -300px;
    width: 600px;
    height: 580px;
    background-color:#fff;
    border-radius: 4px; 
}
.n_content{
    width: 90%;
    margin: 0 auto;
}
.n_title{
    width: 100%;
    height: 36px;
    background-color: #009688;
    border-radius: 4px;
    color: #fff;
    line-height: 36px;
    text-align: center;
    margin: 20px 0;
}
table,table tr th, table tr td { border:1px solid #555;text-align: center;font-size: 14px; }
table{
    border-collapse: collapse;
    padding:2px;
}
table tr td:first-child{
    width: 120px;
}
table tr td{
    height: 40px;
}
._btns{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 25px;
}
._btns .sure,
._btns .cancel{
    width: 110px;
    height: 32px;
    line-height: 32px;
}
._btns .cancel{
    margin-left: 20px;
}
</style>
