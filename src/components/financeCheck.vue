<template>
<div class="wrappar">
    <div class="title">財務核對</div>
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
                    title: 'APP營收總額',
                    key: 'order1',
                    minWidth:130
                },
                {
                    title: 'WEB營收總額',
                    key: 'order2',
                    minWidth:130
                },
                {
                    title: '門市營收總額',
                    key: 'order3',
                    minWidth:130
                },
                {
                    title: '總營收金額',
                    key: 'order4',
                    width:130
                },
                {
                    title: '運費支出',
                    key: 'order5',
                    minWidth:130
                }
            ],
            data1: [
                {
                    order1: '121545',
                    order2: '121545',
                    order3: 121545,
                    order4: '12154',
                    order5:121545
                }
            ]
        }
    },
    methods:{
        
    }
}
</script>
<style scoped>

</style>
