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
        <div class="option">
            <span>創建時間：</span>
            <input type="text" name="time">
        </div>
        <div class="option">
            <span>城市：</span>
            <input type="text" name="time">
        </div>
        <div class="serch">查詢</div>
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
                    type:'selection',
                    align:'center',
                    width:60
                },
                {
                    title: '會員編號',
                    key: 'order1',
                    minWidth:105
                },
                {
                    title: '用戶姓名',
                    key: 'order2',
                    minWidth:120
                },
                {
                    title: '性別',
                    key: 'order3',
                    minWidth:85
                },
                {
                    title: '生日',
                    key: 'order4',
                    minWidth:160
                },
                {
                    title: '手機號碼',
                    key: 'order5',
                    minWidth:160
                },
                {
                    title: '電子郵件',
                    key: 'order6',
                    minWidth:165
                },
                {
                    title: '城市',
                    key: 'order7',
                    minWidth:160
                },
                {
                    title: '地址',
                    key: 'order8',
                    minWidth:160
                },
                {
                    title: '創建時間',
                    key: 'order9',
                    minWidth:160
                },
                {
                    title: '登入IP',
                    key: 'order10',
                    minWidth:140
                },
                {
                    title: '登入次數',
                    key: 'order11',
                    minWidth:105
                },
                {
                    title: '最後登入時間',
                    key: 'order12',
                    minWidth:160
                },
                {
                    title: '粉絲數',
                    key: 'order13',
                    minWidth:95
                },
                {
                    title: '追蹤數',
                    key: 'order14',
                    minWidth:95
                },
                {
                    title: '點贊次數',
                    key: 'order15',
                    minWidth:105
                },
                {
                    title: '我的收藏',
                    key: 'order16',
                    minWidth:160
                },
                {
                    title: '權限',
                    key: 'order17',
                    minWidth:130,
                    render:(h,params)=>{
                        return h('Select',
                        {props:{
                            placeholder:'門市'
                        },
                        on:{
                            'on-change':(value)=>{
                                this.selectChange(value)
                            }
                        }},
                        [
                            h('Option',{
                                props:{
                                    value:'門市'
                                }
                            },'門市'),
                            h('Option',{
                                props:{
                                    value:'銷售'
                                }
                            },'銷售')
                        ])
                    }
                },
                {
                    title:'編輯',
                    key:'order18',
                    minWidth:105,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, '刪除')
                        ]);
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
            selectData:'門市'
        }
    },
    methods:{
        selectChange(value){
            console.log(value)
        },
        remove (index) {
            
        }
    }
}
</script>
<style scoped>


</style>
