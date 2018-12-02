<template>
<div class="wrappar">
    <div class="title">設置活動</div>
    <div class="activity">
        <Table border  :columns="columns1" :data="data1"  class="post"></Table>
    </div>
    <div class="page">
        <div class="btns">
            <div class="b_delete">刪除活動</div>
            <div class="send" @click="openModel">新增活動</div>
        </div>
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
                            <td style="text-align:right">活動時間:</td>
                            <td>
                                <DatePicker type="daterange" placement="bottom-end" placeholder="選擇日期" style="width: 300px"></DatePicker>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">活動圖:</td>
                            <td>
                                <Input v-model="a_types"  placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">活動贈品:</td>
                            <td>
                                <Input v-model="a_types"  placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">需球夠量:</td>
                            <td>
                                <Input v-model="a_types"  placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">活動說明:</td>
                            <td>
                                <Input v-model="a_types" type="textarea" placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">是否完成購物:</td>
                            <td>
                                <Checkbox v-model="single"></Checkbox>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">活動密碼:</td>
                            <td>
                                <Input v-model="a_types"  placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">完成活動日期:</td>
                            <td>
                                <DatePicker type="daterange" placement="bottom-end" placeholder="選擇日期" style="width: 300px"></DatePicker>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">完成圖片:</td>
                            <td>
                                <Upload action="//jsonplaceholder.typicode.com/posts/">
                                    <Button icon="ios-cloud-upload-outline">上傳</Button>
                                </Upload>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">完成說明:</td>
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
                    title: '活動日期',
                    key: 'order1',
                    minWidth:165
                },
                {
                    title: '活動類型',
                    key: 'order2',
                    minWidth:125
                },
                {
                    title: '活動名稱',
                    key: 'order3',
                    minWidth:165
                },
                {
                    title: '活動贈品',
                    key: 'order4',
                    minWidth:165
                },
                {
                    title: '需球時間',
                    key: 'order5',
                    minWidth:165
                },
                {
                    title: '說明',
                    key: 'order6',
                    minWidth:165
                },
                {
                    title:'更多操作',
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
.page .btns{
    width: auto;
    margin-top: 0;
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
    height: 780px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -390px 0 0 -300px;
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
    height: 45px;
    text-align: center;
}
</style>
