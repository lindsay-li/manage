<template>
<div class="wrappar">
    <div class="title">設置活動</div>
    <div class="nav">
        <div class="option">
            <span>用戶編號：</span>
            <input type="text" >
        </div>
        <div class="serch">搜索</div>
    </div>
    <div class="activity">
        <Table border  :columns="columns1" :data="data1"  class="post"></Table>
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
                    title: '用戶編號',
                    key: 'order1',
                    minWidth:105
                },
                {
                    title: '用戶名',
                    key: 'order2',
                    minWidth:165
                },
                {
                    title: '設置生日禮品',
                    key: 'order3',
                    minWidth:165,
                    renderHeader:(h,params)=>{
                        return h('div',{},[
                            h('p',{},'設置生日禮品'),
                            h('p',{},'(特價商品、折扣券)')
                        ])
                    }
                },
                {
                    title: '發送時間',
                    key: 'order4',
                    minWidth:165
                },
                {
                    title: '活動執行時間',
                    key: 'order5',
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
                },
                {
                    order1: '200元',
                    order2: '2019.05.18-2019.05.21',
                    order3: '20%',
                    order4:'所有',
                    order5:'充值送券',
                },
                {
                    order1: '200元',
                    order2: '2019.05.18-2019.05.21',
                    order3: '20%',
                    order4:'所有',
                    order5:'充值送券',
                    
                },
                {
                    order1: '200元',
                    order2: '2019.05.18-2019.05.21',
                    order3: '20%',
                    order4:'所有',
                    order5:'充值送券',
                    
                },
                {
                    order1: '200元',
                    order2: '2019.05.18-2019.05.21',
                    order3: '20%',
                    order4:'所有',
                    order5:'充值送券',
                    
                },
            ],
        }
    },
    methods:{
        
    }
}
</script>
<style scoped>
.title{
    width: 100%;
    height: 50px;
    background-color: #009688;
    border-radius: 4px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    line-height: 50px;
    margin-bottom: 30px;
}

</style>
