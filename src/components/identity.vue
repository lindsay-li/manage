<template>
<div class="wrappar">
    <div class="_title">身份驗證</div>
    <div class="nav">
        <div class="option">
            <span>用戶名稱：</span>
            <Input type="text" style="width:160px" v-model="searchData.user"/>
        </div>
        <div class="option">
            <span>會員編號：</span>
            <Input type="text" name="time" style="width:160px" v-model="searchData.id"/>
        </div>
        <div class="serch" @click='search'>查詢</div>
    </div>
    <div class="goods">
        <Table border  :columns="columns1" :data="data1" :loading="loading" @on-row-click="selectChange1" class="post">
            <template slot="front_card" slot-scope="{row,index}">
                <div v-if="row.front_card" class="pics" @click="modalImage(row.front_card)">
                    <img :src="row.front_card" style="width:100%"/>
                </div>
            </template>
            <template slot="reverse_card" slot-scope="{row,index}">
                <div v-if="row.reverse_card" class="pics" @click="modalImage(row.reverse_card)">
                    <img :src="row.reverse_card" style="width:100%"/>
                </div>
            </template>
            <template slot="action" slot-scope="{row,index}">
                <div v-if="row.lock==1">身份認證成功</div>
                <div v-else>
                    <Select v-model="row.lock" @on-change="selectChange">
                        <Option v-for="item in lockList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
            </template>
        </Table>
    </div>
    <Modal title="View Image" v-model="visible">
        <img :src="viewImage" v-if="visible" style="width: 100%">
    </Modal>
    <div class="page">
        <!-- <div class="_btn">
            <div class="send" @click="openModel">新增</div>
        </div> -->
        <Page :total="total" show-total show-elevator prev-text='上一頁' next-text='下一頁'  @on-change="pageChange"/>
    </div>
</div>        
</template>
<script>
export default {
    data(){
        return{
            columns1: [
                {
                    title: '會員編號',
                    key: 'id',
                    minWidth:100
                },
                {
                    title: '用戶名',
                    key: 'user',
                    minWidth:140
                },
                {
                    title:'驗證照片(正)',
                    slot:'front_card',
                    minWidth:130
                },
                {
                    title:'驗證照片(反)',
                    slot:'reverse_card',
                    minWidth:130
                },
                // {
                //     title:'密碼',
                //     key:'password',
                //     ellipsis:true,
                //     tooltip:true,
                //     minWidth:120
                // },
                {
                    title:'電話',
                    key:'phone',
                    minWidth:130
                },
                {
                    title:'狀態',
                    slot:'action',
                    minWidth:140
                },
            ],
            data1: [],
            total:0,
            current:0,
            propModel:false,
            loading:false,
            visible:false,
            viewImage:'',
            inputValue:{
                winery:'',
                grade:''
            },
            lockList:[
                {value:0,label:'待上傳'},
                {value:1,label:'認證成功'},
                {value:2,label:'待認證'},
                {value:3,label:'駁回'}
            ],
            id:'',
            searchData:{
                user:'',
                id:""
            }
        }
    },
    created(){
        this.getList(0)
    },
    methods:{
        getList(start){
            var data = {
                start:start,
                rows:5
            }
            this.loading = true;
            this.$http('userService','findDatas',data)
            .then(res=>{
                console.log(res)
                this.loading = false
                if(res.rows){
                    var arr = res.rows
                    this.data1 = arr;
                    this.total = res.total;
                }
            })
        },
        selectChange(value){
            console.log(value)
            this.revise(value)
        },
        selectChange1(row){
            console.log(row)
            this.id = row.id
        },
        search(){
            var data = {};
            if(this.searchData.user){
                data.user = this.searchData.user
            }
            if(this.searchData.id){
                data.id = this.searchData.id
            }
            data.start =0
            data.rows = 5
            this.loading = true;
            this.$http('userService','findDatas',data)
            .then(res=>{
                console.log(res)
                this.loading = false
                if(res.rows){
                    var arr = res.rows
                    this.data1 = arr;
                    this.total = res.total;
                }
            })
        },
        revise(value){ //修改狀態
            var data = {
                lock:value,
                id:this.id
            }
            this.$http('userService','addOrUpdate',data)
            .then(res=>{
                if(res.result=='success'){
                    this.$Message.success('修改成功');
                    this.getList(this.current);
                    this.id = '';
                }else{
                    this.$Message.error('操作失敗');
                }
            })
        },
        remove (id) {
            this.$Modal.confirm({
                title: '警告',
                content: '<h3>此操作將刪除數據，是否繼續？</h3>',
                onOk: () => {
                     var data = {id:id};
                    this.$http('userService','deleteData',data)
                    .then(res=>{
                        if(res.result == 'success'){
                            this.$Message.success('刪除成功');
                            this.getList(this.current);
                        }else{
                            this.$Message.error('操作失敗');
                        }
                    })
                },
                onCancel: () => {
                }
            })  
        },
        pageChange(index){ //切換頁數
            this.current = index==1?0:(index-1)*5;
            this.getList(this.current);
        },
        modalImage(img){
            this.visible = true
            this.viewImage = img
        }
    }  
}
</script>
<style scoped>
@import '../../static/title.css';
.wrapper{
    position: relative;
}
.page{
    justify-content: flex-end;
}
/* .page{
    justify-content: space-between;
} */
._box{
    width: 360px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -125px 0 0 -150px;
    border-radius: 4px;
    background-color: #fff;
}
.contant{
    width: 90%;
    margin: 0 auto;
}
.btns{
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 30px;
    position: absolute;
    bottom: 20px;
}
.cancel,
.sure{
    width: 136px;
    height:40px;
    line-height: 40px; 
}
.sure{
    margin-left: 20px;
}
.tit{
    width: 100px;
    height: 36px;
    background-color: #009688;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 36px;
    margin-left: 20px;
    margin-top: 30px;
    margin-bottom: 30px;
}
table td{
    height: 45px;
}
.pics{
    height: 58px;
    width: 120px;
}
</style>
