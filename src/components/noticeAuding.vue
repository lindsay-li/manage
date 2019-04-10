<template>
<div class="wrappar">
    <div class="_title" style="margin-bottom:20px;">公告審核</div>
    <div class="nav">
        <div class="option">
            <span>狀態：</span>
            <Select v-model="seach_status"  @on-change="selectChange_seach" style="width:160px;">
                <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
    </div>
    <div class="notice">
        <Table border  :columns="columns1" :data="data1" @on-row-click="selectChange1" >
            <template slot-scope="{row,index}" slot="type">
                <div>{{types(row.TYPE)}}</div>
            </template>
            <template slot-scope="{row,index}" slot="status">
                <!-- <div>{{row.audit_status==0?'未讀':'已讀'}}</div> -->
                <div>
                    <Select v-model="row.audit_status"  @on-change="selectChange">
                        <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
            </template>
            <template slot-scope="{row,index}" slot="action">
                <Button type="error" size='small' @click="remove(row.id)">刪除</Button>
            </template>
        </Table>
    </div>
    <div class="page">
        <!-- <div class="add_goods" @click="openPropModel">新增通知</div> -->
        <Page :total="total" show-total show-elevator prev-text='上一頁' next-text='下一頁' @on-change="pageChange"/>
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
                    title: '類型',
                    slot: 'type',
                    minWidth:140
                },
                {
                    title: '內容',
                    key: 'msg',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:180
                },
                // {
                //     title: '發送人id',
                //     key: 'from_user_id',
                //     minWidth:120
                // },
                // {
                //     title: '接收人id',
                //     key: 'to_user_id',
                //     minWidth:120
                // },
                {
                    title:'時間',
                    key:'time',
                    minWidth:150
                },
                {
                    title:'其它',
                    key:'other',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:140,
                },
                {
                    title:'狀態',
                    slot:'status',
                    minWidth:120,
                },
                {
                    title:'操作',
                    slot:'action',
                    minWidth:90,
                },
            ],
            data1: [],
            userList:[],
            noticeList:[],
            noticeLists:[
                {value:11,label:'活動消息'},
                {value:12,label:'商品促銷消息'},
                {value:13,label:'一些系統通知'}
            ],
            propModel:false,
            loading:false,
            total:0,
            current:0,
            statusList:[
                {value:0,label:'未審核'},
                {value:1,label:'已審核'}
            ],
            id:'',
            seach_status:''
        }
    },
    created(){
        this.getList(0);
    },
    methods:{
        getList(start,obj){
            var data = {};
            if(obj || obj===0){
                data.audit_status = obj;
            }
            data.start = start;
            data.rows = 10
            this.loading = true;
            this.$http('messageLogService','findDatas',data)
            .then(res=>{
                console.log(res)
                this.loading = false;
                if(res.rows){
                    for(let i=0;i<res.rows.length;i++){
                        res.rows[i].time = res.rows[i].time?this.$changeTime(res.rows[i].time):"";
                    }
                    this.data1 = res.rows;
                    this.total = res.total;
                }
            })
        },
        remove(id){
            this.$Modal.confirm({
                title: '警告',
                content: '<h3>此操作將刪除數據，是否繼續？</h3>',
                onOk: () => {
                     var data = {id:id};
                    this.$http('messageLogService','deleteData',data)
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
        selectChange1(row){
            this.id = row.id
        },
        revise(status){ //修改狀態
            var data = {
                audit_status:status,
                id:this.id
            }
            this.$http('messageLogService','addOrUpdate',data)
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
        selectChange(value){
            console.log(value)
            this.revise(value)
        },
        selectChange_seach(value){
            this.getList(0,value);
        },
        pageChange(index){ //切換頁數
            this.current = index==1?0:(index-1)*10;
            if(this.seach_status){
                this.getList(this.current,this.seach_status);
            }else{
                this.getList(this.current)
            }
            
        },
        types(type){
            if(!type){return}
            var str ='';
            switch(type){
                case 1:
                   str = '文章被留言';
                   break;
                case 2:
                   str = '文章留言被評論';
                   break;
                case 3:
                   str = '酒被評價';
                   break;
                case 4:
                   str = '評價被評論';
                   break;
                case 5:
                   str = '新增關注';
                   break;
                case 6:
                   str = '訂單創建';
                   break;
                case 7:
                   str = '訂單確認';
                   break;
                case 8:
                   str = '訂單取消';
                   break;
                case 9:
                   str = '訂單發貨';
                   break;
                case 10:
                   str = '訂單完成';
                   break;
                case 11:
                   str = '活動消息';
                   break;
                case 12:
                   str = '商品促銷消息';
                   break;
                case 13:
                   str = '一些系統通知';
                   break;
            }
            return str
            
        }
    }
   
}
</script>
<style scoped>
.page{
    justify-content: flex-end;
}
._title{
    width: 100%;
    height: 36px;
    background-color: #2D8CF0;
    border-radius: 4px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    line-height: 36px;
    /* margin-bottom: 30px; */
}

</style>
