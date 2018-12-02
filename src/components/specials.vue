<template>
<div class="wrappar">
    <div class="title">設置活動</div>
        <div class="activity">
            <Table border  :columns="columns1" :data="data1"  class="post"></Table>
        </div>
        <div class="page">
            <div class="add_goods" @click="openModel">添加</div>
            <Page :total="100" show-total show-elevator prev-text='上一頁' next-text='下一頁'/>
        </div> 
    <div class="prop_model" v-show="propModel">
        <div class="_box">
            <div class="contant">
                <div class="tit">添加活動</div>
                <div class="list"style="width:100%;">
                    <table style="width:100%;">
                        <tr>
                            <td style="text-align:right">活動類型:</td>
                            <td>
                                <Input v-model="a_types"  placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">活動名稱:</td>
                            <td>
                                <Input v-model="a_types"  placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">商品編號1:</td>
                            <td>
                                <Input v-model="a_types"  placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">商品編號2:</td>
                            <td>
                                <Input v-model="a_types"  placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">商品編號3:</td>
                            <td>
                                <Input v-model="a_types"  placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">活動時間:</td>
                            <td>
                                <DatePicker type="daterange" placement="bottom-end" placeholder="選擇日期" style="width: 300px"></DatePicker>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">頁面鏈接:</td>
                            <td>
                                <Input v-model="a_types"  placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="btns">
                    <div class="cancel" @click='closeModel'>取消</div>
                    <div class="sure">確定</div>
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
                    title: '活動編號',
                    key: 'order1',
                    minWidth:105
                },
                {
                    title: '活動名稱',
                    key: 'order2',
                    minWidth:165
                },
                {
                    title: '開始時間',
                    key: 'order3',
                    minWidth:165
                },
                {
                    title: '結束時間',
                    key: 'order4',
                    minWidth:165
                },
                {
                    title: '商品編號',
                    key: 'order5',
                    minWidth:165
                },
                {
                    title: '頁面鏈接',
                    key: 'order6',
                    minWidth:165
                },
                {
                    title:'編輯',
                    key:'order7',
                    minWidth:105,
                    render:(h,params)=>{
                        return h('Button',{
                            props:{
                                size:'small',
                                type:'info'
                            }
                        },'修改')
                    }
                }
            ],
            data1: [
                {
                    order1: '200元',
                    order2: '2019.05.18-2019.05.21',
                    order3: '20%',
                    order4:'所有',
                    order5:'充值送券',
                    order6:'充值10000送200'
                },
                {
                    order1: '200元',
                    order2: '2019.05.18-2019.05.21',
                    order3: '20%',
                    order4:'所有',
                    order5:'充值送券',
                    order6:'充值10000送200'
                },
                {
                    order1: '200元',
                    order2: '2019.05.18-2019.05.21',
                    order3: '20%',
                    order4:'所有',
                    order5:'充值送券',
                    order6:'充值10000送200'
                },
                {
                    order1: '200元',
                    order2: '2019.05.18-2019.05.21',
                    order3: '20%',
                    order4:'所有',
                    order5:'充值送券',
                    order6:'充值10000送200'
                },
                {
                    order1: '200元',
                    order2: '2019.05.18-2019.05.21',
                    order3: '20%',
                    order4:'所有',
                    order5:'充值送券',
                    order6:'充值10000送200'
                },
            ],
            a_types:'',
            single:false,
            propModel:false,
            zhekList:[
                {
                    value:'50元',
                    label:'50元'
                },
                {
                    value:'100元',
                    label:'100元'
                },
                {
                    value:'250元',
                    label:'250元'
                }
            ]
        }
    },
    methods:{
        openModel(){
            this.propModel = true;
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
.tit{
    width: 430px;
    height: 36px;
    background-color: #009688;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 36px;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 30px;
}
._box{
    width: 600px;
    height: 680px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -340px 0 0 -300px;
    border-radius: 4px;
    background-color: #fff;
}
.contant{
    width: 90%;
    margin: 0 auto;
}

.btns{
    width: 100%;
    justify-content: center;
    margin-top: 30px;
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
table tr td{
    height: 60px;
    text-align: center;
}
</style>
