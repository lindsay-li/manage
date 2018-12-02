<template>
<div class="wrappar">
    <div class="title">補發功能</div>
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
                <div class="tit">添加</div>
                <div class="list"style="width:100%;">
                    <table style="width:100%;">
                        <tr>
                            <td style="text-align:right">賬戶編號:</td>
                            <td>
                                <Input v-model="a_types" placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">折扣券:</td>
                            <td>
                                <Input v-model="a_types"  placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">錢包金額:</td>
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
                    title: '賬戶編號',
                    key: 'order1',
                    minWidth:120
                },
                {
                    title: '折扣券補發',
                    key: 'order2',
                    minWidth:130
                },
                {
                    title: '錢包補發',
                    key: 'order3',
                    minWidth:120
                }
            ],
            data1: [
                {
                    order1: 'dc121313',
                    order2: '8.5折',
                    order3: '20元'
                },
                {
                    order1: 'dc121313',
                    order2: '8.5折',
                    order3: '20元'
                },
                {
                    order1: 'dc121313',
                    order2: '8.5折',
                    order3: '20元'
                },
                {
                    order1: 'dc121313',
                    order2: '8.5折',
                    order3: '20元'
                },
                {
                    order1: 'dc121313',
                    order2: '8.5折',
                    order3: '20元'
                },
            ],
            a_types:'',
            propModel:false,
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
    height: 460px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -230px 0 0 -300px;
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
