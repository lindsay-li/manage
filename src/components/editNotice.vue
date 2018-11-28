<template>
<div class="wrappar">
    <div class="nav">
        <div class="titles">查询</div>
    </div>
    <div class="notice">
        <Table border  :columns="columns1" :data="data1"  @on-selection-change="selectChange1"></Table>
    </div>
    <div class="page">
        <Page :total="100" show-total show-elevator prev-text='上一页' next-text='下一页'/>
    </div>
    <div class="n_model">
        <div class="n_box">
            <div class="n_content">
                <div class="n_title">新增公告</div>
                <table>
                    <tr>
                        <td>公告种类</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>发送用户</td>
                        <td></td>
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
                        <td>内容</td>
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
                                type:'small'
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
                
            ]
        }
    },
    methods:{
        openPropModel(){
            
        }
    }
   
}
</script>
<style scoped>
.titles{
    width: 100%;
    height: 36px;
    background-color: #009688;
    border-radius: 4px;
    line-height: 36px;
    text-align: center;
    color: #fff;
}

</style>
