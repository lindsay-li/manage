<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>商品名称：</span>
            <input type="text" >
        </div>
        <div class="option">
            <span>类型：</span>
            <input type="text" name="phone">
        </div>
        <div class="option">
            <span>售价：</span>
            <input type="text" name="time">
        </div>
        <div class="serch">查询</div>
    </div>
    <div class="car">
        <Table border  :columns="columns1" :data="data1"  @on-selection-change="selectChange1" class="post"></Table>
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
                    title: '用户名称',
                    key: 'order1'
                },
                {
                    title: '商品名称',
                    key: 'order2'
                },
                {
                    title: '数量',
                    key: 'order3'
                },
                {
                    title: '售价',
                    key: 'order4'
                },
                {
                    title: '类型',
                    key: 'order5'
                },
                {
                    title:'操作',
                    key:'order6',
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
                            }, '删除')
                        ]);
                    }
                }
            ],
            data1: [
                {
                    order1:'发哥',
                    order2:'葡萄酒',
                    order3:'1',
                    order4:'12',
                    order5:'红酒'
                }
            ]
        }
    },
    methods:{
        remove (index) {
            this.data1.splice(index, 1);
        },
        selectChange1(selection){
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
