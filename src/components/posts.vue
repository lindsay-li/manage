<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>日期：</span>
            <input type="text" >
        </div>
        <div class="option">
            <span>类型：</span>
            <input type="text" name="phone">
        </div>
        <div class="option">
            <span>评分：</span>
            <input type="text" name="time">
        </div>
        <div class="serch">查询</div>
    </div>
    <div class="posts">
        <Table border  :columns="columns1" :data="data1"  @on-selection-change="selectChange" class="post"></Table>
    </div>
    <div class="page">
        <div class="delet">批量删除</div>
        <Page :total="100" show-total show-elevator prev-text='上一页' next-text='下一页'/>
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
                    title: '日期',
                    key: 'order1'
                },
                {
                    title: '类型',
                    key: 'order2'
                },
                {
                    title: '名称',
                    key: 'order3'
                },
                {
                    title: '内容',
                    key: 'order4',
                    width:400
                },
                {
                    title: '分享数',
                    key: 'order5'
                },
                {
                    title:'收藏数',
                    key:'order6'
                },
                {
                    title:'评分',
                    key:'order7'
                },
                {
                    title:'留言',
                    key:'order8'
                },
                {
                    title:'删除贴文',
                    key:'order9',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
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
    },
    methods:{
        remove (index) {
            this.data1.splice(index, 1);
        },
        selectChange(selection){
            console.log(selection)
        }
    }
}
</script>
<style scoped>
.page{
    justify-content: space-between;
}
</style>
