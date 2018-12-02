<template>
<div class="wrappar">
    <div class="title">客服信件</div>
    <div class="activity">
        <Table border  :columns="columns1" :data="data1" @on-row-click="openModel" class="post"></Table>
    </div>
    <div class="page">
        <Page :total="100" show-total show-elevator prev-text='上一頁' next-text='下一頁'/>
    </div>
    <div class="prop_model" v-show="propModel">
        <div class="_box">
            <div class="contant">
                <div class="tit">客服信件</div>
                <div class="list"style="width:100%;">
                    <div class="letter">
                        <span>发件人：</span>
                        <span>ddd</span>
                    </div>
                    <div class="text_contant">
                        内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                        内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                        内容内容内容内容内容内容内容内容内容内容内容内容内容vv内容内容
                        内容内容内容内容内容内容内容内容内容内容内容内容内容内容
                    </div>
                    <div class="huifu">
                        <Input v-model="value6" type="textarea" :rows="4" placeholder="输入内容" />
                    </div>
                </div>
                <div class="btns">
                    <div class="sure">回复</div>
                </div>
            </div>
            <div class="close" @click="closeModel">
                ×
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
                    title: '发件人',
                    key: 'order1',
                    minWidth:130
                },
                {
                    title: '内容',
                    key: 'order2',
                    minWidth:200
                },
                {
                    title: '时间',
                    key: 'order3',
                    minWidth:160
                }
            ],
            data1: [
                {
                    order1: '温暖的琴弦',
                    order2: '82年拉菲价值不菲，认真品尝后发现有问题...',
                    order3: '2018-02-03'
                },
                {
                    order1: '温暖的琴弦',
                    order2: '82年拉菲价值不菲，认真品尝后发现有问题...',
                    order3: '2018-02-03'
                },
                {
                    order1: '温暖的琴弦',
                    order2: '82年拉菲价值不菲，认真品尝后发现有问题...',
                    order3: '2018-02-03'
                }
            ],
            propModel:false,
            value6:''
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
    justify-content: flex-end;
    margin-top: 30px;
}
.sure{
    width: 136px;
    height:40px;
    line-height: 40px; 
}
.letter,
.text_contant,
.huifu{
    width: 100%;
    margin-bottom: 20px;
}
.text_contant{
    background-color: #ccc;
}
.close{
    width: 36px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 30px;
    color: #17233d;
    cursor: pointer;
}
</style>
