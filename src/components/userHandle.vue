<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>用戶名：</span>
            <input type="text" >
        </div>
        <div class="option">
            <span>手機號：</span>
            <input type="text" name="phone">
        </div>
        <div class="serch">查詢</div>
    </div>
    <div class="handle">
        <Table border  :columns="columns1" :data="data1"  @on-selection-change="selectChange" @on-row-click="clickRows" class="post"></Table>
    </div>
    <div class="page">
        <Page :total="100" show-total show-elevator prev-text='上一頁' next-text='下一頁'/>
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
                    title: '會員編號',
                    key: 'order1',
                    minWidth:105
                },
                {
                    title: '用戶姓名',
                    key: 'order2',
                    minWidth:105
                },
                {
                    title: '手機號碼',
                    key: 'order3',
                    minWidth:105
                },
                {
                    title: '電子郵件',
                    key: 'order4',
                    width:400
                },
                {
                    title: '錢包金額',
                    key: 'order5',
                    minWidth:105
                },
                {
                    title:'折扣券',
                    key:'order6',
                    minWidth:105
                },
                {
                    title:'狀態',
                    key:'order7',
                    minWidth:105
                },
                {
                    title:'個人喜好',
                    key:'order8',
                    minWidth:105
                },
                {
                    title:'會員等級',
                    key:'order9',
                    minWidth:105
                }
            ],
            data1: [
                {
                    order1: 'wx121545',
                    order2: '王老師',
                    order3: 18356454545,
                    order4: 'wang@sina.cn',
                    order5:500,
                    order6:100,
                    order7:'未使用',
                    order8:'82年拉菲',
                    order9:'鑽石5'
                },
                {
                    order1: 'wx121545',
                    order2: '王老師',
                    order3: 18356454545,
                    order4: 'wang@sina.cn',
                    order5:500,
                    order6:100,
                    order7:'未使用',
                    order8:'82年拉菲',
                    order9:'鑽石5'
                },
                {
                    order1: 'wx121545',
                    order2: '王老師',
                    order3: 18356454545,
                    order4: 'wang@sina.cn',
                    order5:500,
                    order6:100,
                    order7:'未使用',
                    order8:'82年拉菲',
                    order9:'鑽石5'
                },
                {
                    order1: 'wx121545',
                    order2: '王老師',
                    order3: 18356454545,
                    order4: 'wang@sina.cn',
                    order5:500,
                    order6:100,
                    order7:'未使用',
                    order8:'82年拉菲',
                    order9:'鑽石5'
                },
                {
                    order1: 'wx121545',
                    order2: '王老師',
                    order3: 18356454545,
                    order4: 'wang@sina.cn',
                    order5:500,
                    order6:100,
                    order7:'未使用',
                    order8:'82年拉菲',
                    order9:'鑽石5'
                },
            ]
        }
    },
    methods:{
        selectChange(selection){//勾选
            console.log(selection)
        },
        clickRows(data,index){//单机某一行触发
            console.log('data',data)
            console.log(index)
        }
    }
}
</script>
<style scoped>

</style>
