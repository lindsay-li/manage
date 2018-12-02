<template>
<div class="wrappar">
    <div class="title">發票另寄</div>
    <div class="nav">
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
                    type:'selection',
                    align:'center',
                    width:60
                },
                {
                    title: '訂單編號',
                    key: 'order1',
                    minWidth:110
                },
                {
                    title: '發票類型',
                    key: 'order2',
                    minWidth:110
                },
                {
                    title: '收件人',
                    key: 'order3',
                    minWidth:120
                },
                {
                    title: '統一編號',
                    key: 'order4',
                    width:120
                },
                {
                    title: '收貨地址',
                    key: 'order5',
                    minWidth:160
                },
                {
                    title:'聯繫電話',
                    key:'order6',
                    minWidth:120
                },
                {
                    title:'編輯狀態',
                    key:'order7',
                    minWidth:110,
                    render:(h,params)=>{
                        return h('Select',{
                            props:{
                                placeholder:'已發送'
                            },
                            on:{
                                'on-change':(value)=>{
                                    this.selectChange(value)
                                }
                            }
                        },[
                            h('Option',{
                                props:{
                                    value:'已發送'
                                }
                            },'已發送'),
                            h('Option',{
                                props:{
                                    value:'待發送'
                                }
                            },'待發送')
                        ])
                    }
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
        selectChange(value){
            console.log(value)
        },
    }
}
</script>
<style scoped>

</style>
