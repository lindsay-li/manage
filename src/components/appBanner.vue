<template>
<div class="wrapper">
    <h3 style="color:#009688">app-banner设定</h3>
    <div class="handle">
        <Table border  :columns="columns1" :data="data1"  class="post">
            <template slot-scope="{ row, index }" slot="url">
                <div class="urls" @click="viewImg(row.url)">{{row.url}}</div>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" @click="edit(row)">修改</Button>
                <Button type="error" size="small" @click="deletes(row.id)">刪除</Button>
            </template>
        </Table>
    </div>
    <div class="page">
        <div class="_btn">
            <div class="send" @click="openModel">新增图片</div>
        </div>
        <!-- <Page :total="total" show-total show-elevator prev-text='上一頁' next-text='下一頁' @on-change="pageChange"/> -->
    </div>
    <div class="prop_model" v-show="propUpModel">
        <div class="a_box">
            <div class="a_content">
                <div class="a_title">新增banner</div>
                <div class="a_tit aflex">
                    <span>標題：</span>
                    <Input v-model="inputValue.title"  style="width: 366px" />
                </div>
                <div class="a_tit aflex">
                    <span>图片顺序：</span>
                    <InputNumber  :min="0" v-model="inputValue.order" style="width: 366px;"></InputNumber>
                </div>
                <div class="a_pic aflex">
                    <span>上传圖片：</span>
                    <div style="width:366px;display:flex;">
                        <div class="demo-upload-list" v-for="(item,index) in files" :key="index" >
                            <template >
                                <img :src="item.src" />
                            </template>
                        </div>
                            <input type="file" class="files" @change="fileChanged" ref="file" multiple="multiple" name="file" accept="image/jpg,image/jpeg,image/png,image/bmp">
                            <div style="width: 58px;height:58px;line-height: 58px;text-align:center;border:1px dashed #888;cursor:pointer" @click="addpic">
                                <Icon type="ios-camera" size="20"></Icon>
                            </div>
                    </div>
                </div>
                <div class="a_tit aflex">
                    <span>备注：</span>
                    <Input v-model="inputValue.remark" type="textarea" :rows='2' style="width: 366px" />
                </div>
                <div class="btns">
                    <div class="cancel" @click="closeModels">取消</div>
                    <div class="sure" @click="suerBtn">確定</div>
                </div>
            </div>
        </div>
    </div>
    <Modal title="预览" v-model="visible" >
        <img :src="prop_img" width="100%">
    </Modal>
</div>   
</template>
<script>
export default {
    data(){
        return{
            columns1: [
                {
                    type:'selection',
                    width:60,
                    align:'center'
                },
                {
                    title: '图片顺序',
                    key: 'order',
                    minWidth:120
                },
                {
                    title: '图片地址',
                    slot: 'url',
                    minWidth:180
                },
                {
                    title: '标题',
                    key: 'title',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:120
                },
                {
                    title: '备注',
                    key: 'remark',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:120
                },
                {
                    title:'操作',
                    slot:'action',
                    minWidth:150
                }
            ],
            data1: [],
            loading:false,
            total:0,
            inputValue:{
                order:0,
                url:'',
                title:'',
                remark:''
            },
            current:0,
            statusData:'',
            id:'',
            visible:false,
            prop_img:'',
            files:[],
            pics:[],
            propUpModel:false
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
            this.$http('sowingmapService','findDatas',data)
            .then(res=>{
                console.log(res)
                this.loading = false;
                if(res.rows){
                    this.data1 = res.rows;
                    this.total = res.total;
                }
            })
        },
        pageChange(index){ //切換頁數
            this.current = index==1?0:(index-1)*10;
            this.getList(this.current);
        },
        edit(row){
            if(!row){return}
            this.inputValue={
                order:row.order,
                url:row.url,
                title:row.title,
                remark:row.title
            }
            this.pics = new Array(row.url)
            for(let j=0;j<this.pics.length;j++){
                var obj = {}
                obj.src = this.pics[j]
                this.files.push(obj)
            }
            this.id = row.id;
            this.propUpModel = true;
        },
        openModel(){
            this.propUpModel = true;
        },
        closeModels(){
            this.propUpModel = false;
            this.inputValue={
                order:0,
                url:'',
                title:'',
                remark:''
            }
            this.id = ''
            this.pics = []
            this.files = []
        },
        viewImg(url){
            if(!url){return}
            this.visible = true;
            this.prop_img = url;
        },
        suerBtn(){
            if(!this.inputValue.title){
                this.$Message.error('請填寫文章標題')
                return
            }
            if(!this.inputValue.order && this.inputValue.order !=0){
                this.$Message.error('請填寫圖片順序')
                return
            }
            var data = this.inputValue;
            data.url = this.pics[0];
            var info = '新增成功';
            if(this.id){
                data.id = this.id;
                info = '修改成功';
            }
            this.$http('sowingmapService','addOrUpdate',data)
            .then(res=>{
                this.propUpModel = false;
                this.id = "";
                if(res.result == 'success'){
                    this.$Message.success(info);
                    this.getList(this.current);
                    this.inputValue={
                        order:0,
                        url:'',
                        title:'',
                        remark:''
                    }
                    this.pics = []
                    this.files = []
                }else{
                    this.$Message.error(res.message);
                }
            })
        },
        deletes(id){
            this.$Modal.confirm({
                title: '警告',
                content: '<h3>此操作將刪除數據，是否繼續？</h3>',
                onOk: () => {
                     var data = {id:id};
                    this.$http('sowingmapService','deleteData',data)
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
        addpic(){
            this.$refs.file.click();
        },
        fileChanged(e){
            this.files = [];
            this.pics = [];
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
                        this.pics.push('http://35.220.249.212:8072/op' + res.data);
                    }else{
                        this.$Message.error(res.message);
                    }
                })
            }
            this.$refs.file.value = '';
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
    margin-bottom: 30px;
}
.urls{
    width: 160px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    cursor: pointer;
}
.a_box{
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -190px 0 0 -245px;
    width: 500px;
    height: 380px;
    background-color:#fff;
    border-radius: 4px; 
}
.a_content{
    width: 90%;
    margin: 30px auto 0;
}
.a_title{
    width: 100%;
    text-align: center;
    font-size: 18px;
    margin-bottom: 30px;
}
.aflex{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}
.btns{
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
.cancel,
.sure{
    width: 140px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    border-radius: 6px;
    cursor:pointer;
}
.sure{
    margin-left: 20px;
}
.demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
}
.demo-upload-list img{
    width: 100%;
    height: 100%;
}
.demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
    display: block;
}
.demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
input[type="file"] {
    display: none;
}
.contents{
    width: 120px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    cursor: pointer;
}
.notice{
    font-size: 12px;
    color: #ED4014;
}
</style>
