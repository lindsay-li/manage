<template>
<div class="wrappar">
    <div class="title">出貨資料核對</div>
    <div class="nav">
        <div class="option">
            <input type="text" placeholder="輸入搜索條件，用‘|’隔開">
        </div>
        <div class="option">
            <span>開始時間</span>
            <DatePicker type="date" placeholder="Select date" ></DatePicker>
        </div>
        <div class="option">
            <span>結束時間：</span>
            <DatePicker type="date" placeholder="Select date" ></DatePicker>
        </div>
        <div class="serch">搜索</div>
    </div>
    <div class="handle">
        <Table border  :columns="columns1" :data="data1"   class="post"></Table>
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
                    title: '訂單日期',
                    key: 'order1',
                    minWidth:110
                },
                {
                    title: '收貨日期',
                    key: 'order2',
                    minWidth:110
                },
                {
                    title: '訂單編號',
                    key: 'order3',
                    minWidth:110
                },
                {
                    title: '配送編號',
                    key: 'order4',
                    width:110
                },
                {
                    title: '數量',
                    key: 'order5',
                    minWidth:85
                },
                {
                    title:'商品名稱',
                    key:'order6',
                    minWidth:110
                },
                {
                    title:'商品編號',
                    key:'order7',
                    minWidth:110
                },
                {
                    title:'銷售金額',
                    key:'order8',
                    minWidth:110
                },
                {
                    title:'發票編號',
                    key:'order9',
                    minWidth:110
                },
                {
                    title:'訂單狀態',
                    key:'order10',
                    minWidth:110
                },
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
       
    }
}
</script>
<style scoped>

</style>
