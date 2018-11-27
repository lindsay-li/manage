<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>名称：</span>
            <input type="text" >
        </div>
        <div class="option">
            <span>类型：</span>
            <input type="text" name="phone">
        </div>
        <div class="option">
            <span>酒庄：</span>
            <input type="text" name="time">
        </div>
        <div class="option">
            <span>葡萄品种：</span>
            <input type="text" name="time">
        </div>
        <div class="serch">查询</div>
    </div>
    <div class="car">
        <Table border  :columns="columns1" :data="data1"  @on-selection-change="selectChange1" class="post"></Table>
    </div>
    <div class="page">
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
                    title: '名称',
                    key: 'order1'
                },
                {
                    title: '类型',
                    key: 'order2'
                },
                {
                    title: '年产量',
                    key: 'order3'
                },
                {
                    title: '适合温度',
                    key: 'order4'
                },
                {
                    title: '酒庄',
                    key: 'order5'
                },
                {
                    title:'产品',
                    key:'order6',
                    
                },
                {
                    title:'葡萄品种',
                    key:'order7'
                },
                {
                    title:'市场估值',
                    key:'order8'
                },
                {
                    title:'酒标照片',
                    key:'order9',
                    render: (h, params) => {
                        if(params.row.order9==''){
                            return h('Upload',
                            {
                                props:{
                                    action:"//jsonplaceholder.typicode.com/posts/",
                                    onSuccess:this.change
                                },
                                
                            }, [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        fontSize: '14px'
                                    },
                                    // on: {
                                    //     click: () => {
                                    //         this.remove(params.index)
                                    //     }
                                    // }
                                }, '上传')
                            ]);
                        }else{
                            return h('span', {
                                    
                                }, params.row.order9)
                            
                        }
                        
                    }
                },
                {
                    title:'沙龙照',
                    key:'order10'
                },
            ],
            data1: [
                {
                    order1:'发哥',
                    order2:'葡萄酒',
                    order3:'1',
                    order4:'12',
                    order5:'红酒',
                    order6:'www.wdwd.ddd',
                    order9:''
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
        },
        change(){
            console.log(111)
        }
    }  
}
</script>
<style scoped>

</style>
