<template>
<div class="wrappar">
    <div class="_title">客服信件</div>
    <div class="handle">
        <Table border  :columns="columns1" :data="data1" @on-row-click="selectChange1"  class="post">
            <template slot-scope="{ row, index }" slot="type">
                <div>{{types(row.type)}}</div>
            </template>
            <template slot-scope="{ row, index }" slot="status">
                <div>
                    <Select v-model="row.status" style="width:100%" @on-change="selectChange">
                        <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
            </template>
            <template slot-scope="{ row, index }" slot="img">
                <div v-if="row.img" @click="showImg(row.img)" class="pics">
                    <img :src="row.img" style="width:100%"/>
                </div>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="error" size="small" @click="deletes(row.id)">刪除</Button>
            </template>
        </Table>
    </div>
    <div class="page">
        <Page :total="total" show-total show-elevator prev-text='上一頁' next-text='下一頁' @on-change="pageChange"/>
    </div>
    <Modal title="View Image" v-model="visible">
        <img :src="imgNotice" v-if="visible" style="width: 100%">
    </Modal>
    <div class="prop_model" v-show="propModel">
        <div class="_box">
            <div class="contant">
                <div class="tit">客服信件</div>
                <div class="close" @click='closeModel'>x</div>
                <div class="list"style="width:100%;">
                    <table style="width:100%;">
                        <tr>
                            <td >发件人:</td>
                            <td style="text-align:left;">
                                {{inputValue.user_id}}
                            </td>
                        </tr>
                        <tr>
                            <td style="vertical-align:top;height:140px">内容:</td>
                            <td style="background-color:#eee">
                                <!-- <Input v-model="inputValue.msg"  readonly type="textarea" :rows="5" style="background-color:transparent" /> -->
                                <div class="msgrow">{{inputValue.msg}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td style="height:90px">图文消息:</td>
                            <td>
                                <div style="width:100%;height:78px;" v-if="inputValue.imgs">
                                    <img :src="inputValue.imgs" alt="" style="height:100%">
                                </div>
                                
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right;height:140px"></td>
                            <td>
                                <Input v-model="inputValue.reply"  type="textarea" :rows="5" placeholder="點擊輸入"  />
                            </td>
                        </tr>
                        <tr>
                            <td style="height:90px">图文回复:</td>
                            <td>
                                <div v-if="iSimage">
                                    <input type="file" class="files" @change="fileChanged" ref="file" multiple="multiple" name="file" accept="image/jpg,image/jpeg,image/png,image/bmp">
                                    <Button icon="ios-cloud-upload-outline" @click="addpic">點擊上傳</Button>
                                </div>
                                <div class="pic" v-else style="width:100%;height:78px;" >
                                    <img :src="files[0].src" style="height:100%"/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right;height:60px" colspan="2">
                                <Button type="primary" @click="sureBtn">回复</Button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>   
</template>
<script>
export default {
    data(){
        return{
            columns1: [
                {
                    title: '內容',
                    key: 'msg',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:200
                },
                {
                    title: '圖片消息',
                    slot: 'img',
                    minWidth:180
                },
                {
                    title: '用戶id',
                    key: 'user_id',
                    width:120
                },
                {
                    title: '問題id',
                    key: 'pid',
                    width:120
                },
                {
                    title: '發送對象',
                    slot: 'type',
                    width:120
                },
                {
                    title:'狀態',
                    slot:'status',
                    width:120
                },
                {
                    title:'操作',
                    slot:'action',
                    width:90
                }
            ],
            data1: [],
            loading:false,
            total:0,
            current:0,
            statusList:[
                {value:0,label:'未回覆'},
                {value:1,label:'已回覆'}
            ],
            statusData:'',
            id:'',
            visible:false,
            imgNotice:"",
            inputValue:{
                user_id:"",
                msg:'',
                reply:"",
                img:'',
                imgs:''
            },
            propModel:false,
            files:[],
            iSimage:true,
        }
    },
    created(){
        this.getList(0)
    },
    methods:{
        getList(start){
            var data = {
               start:start,
               rows:10 
            }
            this.loading = true;
            this.$http('mesmanageService','findDatas',data)
            .then(res=>{
                console.log(res)
                this.loading = false;
                if(res.rows.length>0){
                    this.data1 = res.rows;
                    this.total = res.total;
                }
            })
        },
        pageChange(index){ //切換頁數
            this.current = index==1?0:(index-1)*10;
            this.getList(this.current);
            
        },
        types(type){
            if(!type){return}
            var str = '';
            if(type==1){
                str = '管理員'
            }else if(type ==2){
                str = '用戶'
            }
            return str
        },
        selectChange(value){
            console.log(value)
            this.revise(value)
        },
        selectChange1(row){
            console.log(row)
            this.id = row.id
            this.inputValue.user_id = row.user_id
            this.inputValue.msg = row.msg
            this.inputValue.imgs = row.img
            this.openModel()
        },
        revise(value){ //修改狀態
            var data = {
                status:parseInt(value),
                id:this.id
            }
            this.$http('mesmanageService','addOrUpdate',data)
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
        deletes(id){
            this.$Modal.confirm({
                title: '警告',
                content: '<h3>此操作將刪除數據，是否繼續？</h3>',
                onOk: () => {
                     var data = {id:id};
                    this.$http('mesmanageService','deleteData',data)
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
        showImg(img){
            this.imgNotice = img;
            this.visible = true
        },
        openModel(){
            this.propModel = true;
        },
        closeModel(){
            this.propModel = false;
            this.inputValue={
                        user_id:"",
                        msg:'',
                        reply:"",
                        img:'',
                        imgs:''
                    }
        },
        sureBtn(){ //增加
            console.log(this.inputValue)
            var value = {
                user_id:this.inputValue.user_id,
                type:2,
                status:1
            }
            if(this.inputValue.reply){
                value.msg = this.inputValue.reply
            }
            if(this.inputValue.img){
                value.img = this.inputValue.img
            }
            var data = value;
            this.$http('mesmanageService','addOrUpdate',data)
            .then(res=>{
                this.propModel = false;
                if(res.result == 'success'){
                    this.$Message.success('回复成功');
                    this.getList(this.current);
                    this.inputValue={
                        user_id:"",
                        msg:'',
                        reply:"",
                        img:'',
                        imgs:''
                    }
                }else{
                    this.$Message.error(res.message);
                }
            })
        },
        fileChanged(e){
            const list = this.$refs.file.files
            for (let i = 0; i < list.length; i++) {
                if (!this.isContain(list[i])) {
                    const item = {
                        name: list[i].name,
                        size: list[i].size,
                        file: list[i],
                    }
                    this.html5Reader(list[i], item);
                    this.files.push(item);
                }
            }
            console.log(this.files)
            if(list.length > 0) {
                let form = new FormData();  
                form.append('file', list[0]) 
                this.$http('','',form,2)
                .then(res=>{
                    console.log(res)
                    if(res.result=='success'){
                        this.$Message.success(res.message);
                        this.iSimage = false;
                        this.inputValue.img = res.data;
                    }else{
                        this.$Message.error(res.message);
                    }
                })
            }
            this.$refs.file.value = '';
        },
        addpic(){
            this.$refs.file.click();
        },
          // 將圖片文件轉成BASE64格式
        html5Reader(file, item){
            const reader = new FileReader()
            reader.onload = (e) => {
                this.$set(item, 'src', e.target.result)
            }
            reader.readAsDataURL(file)
        },
        isContain(file) {
            return this.files.find((item) => item.name === file.name && item.size === file.size)
        },
        setPic(url){
            var data = {
                path:url
            }
            this.$http('moPictureService','addOrUpdate',data)
            .then(res=>{
                if(res.result == 'success'){
                    this.inputValue.image = res.data.id;
                }else{
                    this.$Message.error(res.message);
                }
            })
        },
    }
}
</script>
<style scoped>
._title{
    width: 100%;
    height: 36px;
    background-color: #2D8CF0;
    border-radius: 4px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    line-height: 36px;
    margin-bottom: 30px;
}
.pics{
    height: 58px;
    width: 120px;
}
.tit{
    width: 430px;
    height: 36px;
    background-color: #009688;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 36px;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 30px;
}
._box{
    width: 600px;
    height: 680px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -340px 0 0 -300px;
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
table tr td{
    height: 40px;
    text-align: center;
}
.close{
    width: 50px;
    height: 50px;
    font-size: 34px;
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
}
.msgrow{
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    text-align: left;
}
input[type="file"] {
    display: none;
}
</style>
