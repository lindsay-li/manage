<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <input type="text" placeholder="輸入關鍵字、多個用；隔開">
        </div>
        <div class="serch">查詢</div>
    </div>
    <div class="barterHandle">
        <Table border  :columns="columns1" :data="data1"  class="post"></Table>
    </div>
    <div class="page">
        <div class="btns">
            <div class="b_delete">批量刪除</div>
            <div class="send">一鍵發貨</div>
        </div>
        <Page :total="100" show-total show-elevator prev-text='上一頁' next-text='下一頁'/>
    </div>
</div>           
</template>
<script>
export default {
    data(){
        return{
            columns1:[
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '訂單編號',
                    key: 'order1',
                    minWidth:125,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'訂單編號'),h('p',{},'換貨單編號')
                        ]
                        )
                    }
                },
                {
                    title: '訂單編號',
                    key: 'order2',
                    minWidth:125,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'換貨單狀態'),h('p',{},'換貨成立時間'),h('p',{},'換貨狀態時間')
                        ]
                        )
                    }
                },
                {
                    title: '',
                    key: 'order3',
                    minWidth:164,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'換貨原因'),h('p',{},'換貨描述')
                        ]
                        )
                    }
                },
                {
                    title: '',
                    key: 'order4',
                    minWidth:164,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'商品編號'),h('p',{},'商品名稱')
                        ]
                        )
                    }
                },
                {
                    title: '',
                    key: 'order5',
                    minWidth:125,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'數量'),h('p',{},'單價'),h('p',{},'折扣金額'),h('p',{},'銷售金額')
                        ]
                        )
                    },
                    render:(h,params)=>{
                        return h('div',
                        [
                           h('p',{},params.row.order5.name?params.row.order5.name:'--'),h('p',{},params.row.order5.num) 
                        ]
                        )
                    }
                },
                {
                    title:'',
                    key:'order6',
                    minWidth:145,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'折扣活動金額'),h('p',{},'折扣卷折扣金額')
                        ]
                        )
                    },
                },
                {
                    title:'',
                    key:'order7',
                    minWidth:160,
                    renderHeader:(h,params)=>{
                        return h('div',{},
                        [
                            h('p',{},'聯絡人'),h('p',{},'聯絡人電話'),h('p',{},'換貨地址')
                        ]
                        )
                    },
                }
            ],
            data1: [
                {
                    order1:'發哥',
                    order2:'葡萄酒',
                    order3:'1',
                    order4:'12',
                    order5:{name:'',num:'BX124548'},
                    order6:'www.wdwd.ddd',
                    order7:'',
                }
            ],
        }
    },
    methods:{

    }
}
</script>
<style scoped>
input{
    width: 380px;
}
.page{
    justify-content: space-between;
}

</style>
