<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>名稱：</span>
            <input type="text" >
        </div>
        <div class="option">
            <span>類型：</span>
            <input type="text" name="phone">
        </div>
        <div class="option">
            <span>酒莊：</span>
            <input type="text" name="time">
        </div>
        <div class="option">
            <span>葡萄品種：</span>
            <input type="text" name="time">
        </div>
        <div class="serch">查詢</div>
    </div>
    <div class="car">
        <Table border  :columns="columns1" :data="data1"  @on-selection-change="selectChange1" class="post"></Table>
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
                    title: '名稱',
                    key: 'order1'
                },
                {
                    title: '類型',
                    key: 'order2'
                },
                {
                    title: '年產量',
                    key: 'order3'
                },
                {
                    title: '適合溫度',
                    key: 'order4'
                },
                {
                    title: '酒莊',
                    key: 'order5'
                },
                {
                    title:'產品',
                    key:'order6',
                    
                },
                {
                    title:'葡萄品種',
                    key:'order7'
                },
                {
                    title:'市場估值',
                    key:'order8'
                },
                {
                    title:'酒標照片',
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
                                }, '上傳')
                            ]);
                        }else{
                            return h('span', {
                                    
                                }, params.row.order9)
                            
                        }
                        
                    }
                },
                {
                    title:'沙龍照',
                    key:'order10'
                },
            ],
            data1: [
                {
                    order1:'發哥',
                    order2:'葡萄酒',
                    order3:'1',
                    order4:'12',
                    order5:'紅酒',
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
