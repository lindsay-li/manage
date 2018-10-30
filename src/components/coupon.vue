<template>
<div class="coupon">
    <div class="nav">
        <div class="option">
            <span>用户名：</span>
            <input type="text" >
        </div>
        <div class="option">
            <span>金额：</span>
            <input type="text" name="phone">
        </div>
        <div class="option">
            <span>使用时间：</span>
            <input type="text" name="time">
        </div>
        <div class="option">
            <span>活动名称：</span>
            <input type="text" name="address">
        </div>
        <div class="serch">查询</div>
    </div>
    <div class="content">
        <Table border  :columns="columns1" :data="data1"></Table>
    </div>
    <div class="page">
        <Page :total="100" show-total show-elevator prev-text='上一页' next-text='下一页'/>
    </div>
</div>    
</template>
<script>
export default {
    name:'coupon',
    data(){
        return{
            columns1: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '活动名称',
                    key: 'order1'
                },
                {
                    title: '金额',
                    key: 'order2'
                },
                {
                    title: '折扣%数',
                    key: 'order3'
                },
                {
                    title: '使用时间',
                    key: 'order4'
                },
                {
                    title: '范围',
                    key: 'order5'
                }
            ],
            data1: [
                {
                    order1: '下载赠送',
                    order2: 200,
                    order3: '5%',
                    order4: '2016/10/03-2018/9/02',
                    order5:'官方APP商品'
                },
                {
                    order1: '下载赠送',
                    order2: 200,
                    order3: '5%',
                    order4: '2016/10/03-2018/9/02',
                    order5:'官方APP商品'
                },
                {
                    order1: '下载赠送',
                    order2: 200,
                    order3: '5%',
                    order4: '2016/10/03-2018/9/02',
                    order5:'官方APP商品'
                },
                {
                    order1: '下载赠送',
                    order2: 200,
                    order3: '5%',
                    order4: '2016/10/03-2018/9/02',
                    order5:'官方APP商品'
                },
                {
                    order1: '下载赠送',
                    order2: 200,
                    order3: '5%',
                    order4: '2016/10/03-2018/9/02',
                    order5:'官方APP商品'
                },
            ]
        }
    }
}
</script>
<style scoped>
.nav{
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}
.option{
    font-weight: bold;
    margin:0 20px;
}
.option input{
    outline: none;
    border:1px solid #A9A9A9; 
    background-color: #fff;
    width: 150px;
    height: 36px;
    border-radius: 4px;
}
.serch{
    width: 80px;
    height: 36px;
    background-color: #2d8cf0;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    line-height: 36px;
    margin-left: 60px;
    cursor: pointer;
}
.page{
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}
</style>
