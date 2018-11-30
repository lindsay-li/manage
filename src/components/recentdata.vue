<template>
<div class="recent">
    <div class="title">即時數據</div>
    <Table :columns="columns1" :data="data1" border  size='large' ></Table>
</div>  
</template>
<script>
export default {
    data(){
        return{
            columns1: [
                {
                    title: '時間',
                    key: 'order1'
                },
                {
                    title: '總訂單數',
                    key: 'order2'
                },
                {
                    title: 'APP訂單數',
                    key: 'order3'
                },
                {
                    title: 'web訂單數',
                    key: 'order4'
                },
                {
                    title: '線下訂單數(門市專用)',
                    key: 'order5'
                },
                {
                    title: '總訂單金額',
                    key: 'order6'
                },
                {
                    title: 'APP訂單金額',
                    key: 'order7'
                },
                {
                    title: 'web訂單金額',
                    key: 'order8'
                },
                {
                    title: '線下訂單金額(門市專用)',
                    key: 'order9'
                },
                {
                    title: '平均訂單金額',
                    key: 'order10'
                },
                {
                    title: 'APP平均訂單金額',
                    key: 'order11'
                },
                {
                    title: 'web平均訂單金額',
                    key: 'order12'
                },
                {
                    title: '線下平均訂單金額(門市專用)',
                    key: 'order13'
                },
                {
                    title: '總會員數',
                    key: 'order14'
                },
                {
                    title: 'web登入人數(IP排重)',
                    key: 'order15'
                },
                {
                    title: 'APP登入人數(排重)',
                    key: 'order16'
                },
                {
                    title: '一次購物人數&佔比',
                    key: 'order17'
                },
                {
                    title: '二次購物人數&佔比',
                    key: 'order18'
                },
                {
                    title: '未次購物人數&佔比',
                    key: 'order19'
                },
            ],
            data1: [
                {
                    order1: '昨日',
                    order2: 3,
                    order3: 4,
                    order4: 5,
                    order5: 6,
                    order6: 7,
                    order7: 7,
                    order8: 9,
                    order9: 0,
                    order10: 3,
                    order11: 4,
                    order12: 5,
                    order13: 5,
                    order14: 4,  
                },
                {
                    order1: '前七日',
                    order2: 3,
                    order3: 4,
                    order4: 5,
                    order5: 6,
                    order6: 7,
                    order7: 7,
                    order8: 9,
                    order9: 0,
                    order10: 3,
                    order11: 4,
                    order12: 5,
                    order13: 5,
                    order14: 4,    
                },
                {
                    order1: '前三十日',
                    order2: 3,
                    order3: 4,
                    order4: 5,
                    order5: 6,
                    order6: 7,
                    order7: 7,
                    order8: 9,
                    order9: 0,
                    order10: 3,
                    order11: 4,
                    order12: 5,
                    order13: 5,
                    order14: 4,                    
                }
            ]
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
