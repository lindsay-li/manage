<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>分类查看：</span>
            <Select  style="width:160px" @on-change="selecserch">
                <Option v-for="item in selectserch" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
    </div>
    <div class="new_article">
        <Table border  :columns="columns1" :data="data1"  class="post" :loading="loading">
            <template slot="action" slot-scope="{row,index}">
                <Button size="small" type="error" @click="remove(row.id)">删除</Button>
            </template>
        </Table>
    </div>
    <div class="page">
        <div class="_btn">
            <div class="send" @click="openModel">新增文章</div>
        </div>
        <Page :total="total" show-total show-elevator prev-text='上一頁' next-text='下一頁' @on-change="pageChange"/>
    </div>
    <div class="prop_model" v-show="propUpModel">
        <div class="a_box">
            <div class="a_content">
                <div class="a_title">新增文章</div>
                <div class="a_tit aflex">
                    <span>文章標題：</span>
                    <Input v-model="inputValue.title"  style="width: 486px" />
                </div>
                <div class="a_pic aflex">
                    <span>內文圖片：</span>
                    <div style="width:486px">
                        <div class="demo-upload-list" v-for="item in uploadList">
                            <template v-if="item.status === 'finished'">
                                <img :src="item.url">
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                </div>
                            </template>
                            <template v-else>
                                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                            </template>
                        </div>
                        <Upload
                            ref="upload"
                            :show-upload-list="false"
                            :default-file-list="defaultList"
                            :on-success="handleSuccess"
                            :format="['jpg','jpeg','png']"
                            :max-size="2048"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            :before-upload="handleBeforeUpload"
                            multiple
                            type="drag"
                            action="//jsonplaceholder.typicode.com/posts/"
                            style="display: inline-block;width:58px;">
                            <div style="width: 58px;height:58px;line-height: 58px;">
                                <Icon type="ios-camera" size="20"></Icon>
                            </div>
                        </Upload>
                        <Modal title="View Image" v-model="visible">
                            <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
                        </Modal>
                    </div>
                </div>
                <div class="a_video aflex">
                    <span>置頂音频、视频：</span>
                    <Upload
                        multiple
                        action="//jsonplaceholder.typicode.com/posts/">
                        <Button style="width:486px">上傳</Button>
                    </Upload>
                </div>
                <div class="classify aflex">
                    <span>文章分類：</span>
                    <Select v-model="inputValue.tag" style="width:486px">
                        <Option v-for="item in tagList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="a_article aflex">
                    <span>內容：</span>
                    <Input v-model="inputValue.content" type="textarea" :rows='5' style="width: 486px" />
                </div>
                <div class="btns">
                    <div class="cancel" @click="closeModels">取消</div>
                    <div class="sure" @click="suerBtn">確定</div>
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
            columns1:[
                {
                    type:'selection',
                    width:60,
                    align:'center'
                },
                {
                    title: '發佈時間',
                    key: 'time',
                    minWidth:160
                },
                {
                    title: '文章標題',
                    key: 'title',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:160
                },
                {
                    title: '创建人id',
                    key: 'user_id',
                    minWidth:110
                },
                {
                    title: '文章內容',
                    key: 'content',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:160
                },
                {
                    title: '插入內文圖片',
                    key: 'photos',
                    minWidth:160
                },
                {
                    title:'置頂音乐',
                    key:'audio',
                    minWidth:160
                },
                {
                    title:'置頂影片',
                    key:'video',
                    minWidth:160
                },
                {
                    title:'文章分類',
                    key:'tag',
                    minWidth:110
                },
                {
                    title:'操作',
                    slot:'action',
                    width:90
                }
            ],
            data1: [],
            total:0,
            current:0,
            tags:['生活','酒庄','活动','深度','大师','特色','名人'],
            tagList:[
                {value:1,label:'生活'},
                {value:2,label:'酒庄'},
                {value:3,label:'活动'},
                {value:4,label:'深度'},
                {value:5,label:'大师'},
                {value:6,label:'特色'},
                {value:7,label:'名人'},
            ],
            inputValue:{
                user_id:'',
                tag:'',
                title:'',
                content:''
            },
            userId:'',
            selectData:'',
            s_modelData:"",
            a_tit:'',
            keyword:'',
            a_article:'',
            propUpModel:false,
            contrastData:[],
            selectserch:[
                {
                    value:'生活',
                    label:'生活'
                },
                {
                    value:'酒庄',
                    label:'酒庄'
                },
                {
                    value:'活动',
                    label:'活动'
                },
                {
                    value:'深度',
                    label:'深度'
                },
                {
                    value:'大师',
                    label:'大师'
                },
                {
                    value:'特色',
                    label:'特色'
                },
                {
                    value:'名人',
                    label:'名人'
                }
            ],
            defaultList: [],
            imgName: '',
            visible: false,
            uploadList: []
        }
    },
    created(){
        this.getList(0);
        var userinfo = JSON.parse(sessionStorage.getItem('user_info'));
        this.userId = userinfo.dbUser.id;
    },
    methods:{
        getList(start){
            var data = {
                start:start,
                rows:10
            }
            this.loading = true;
            this.$http('articleService','findDatas',data)
            .then(res=>{
                console.log(res)
                this.loading = false;
                if(res.rows){
                    var arr = res.rows;
                    for(let i =0;i<arr.length;i++){
                        console.log(1)
                        arr[i].time = this.$changeTime(arr[i].time);
                        arr[i].tag = this.tags[arr[i].tag-1];
                    }
                    this.total = res.total;
                    this.data1 = arr;
                    this.contrastData = arr;
                }
            })
            .catch(err=>{
                this.loading = false;
            })
        },
        pageChange(index){ //切换页数
            this.current = index==1?0:(index-1)*10;
            this.getList(this.current);
        },
        openModel(){
            this.propUpModel = true;
        },
        closeModels(){
            this.propUpModel = false;
        },
        remove (id) {
            this.$Modal.confirm({
                title: '警告',
                content: '<h3>此操作将删除数据，是否继续？</h3>',
                onOk: () => {
                    var data = {id:id};
                    this.$http('articleService','deleteData',data)
                    .then(res=>{
                        if(res.result == 'success'){
                            this.$Message.success('删除成功');
                            this.getList(this.current);
                        }else{
                            this.$Message.error('操作失败');
                        }
                    })
                },
                onCancel: () => {
                }
            })
        },
        suerBtn(){
            if(!this.inputValue.title){
                this.$Message.error('请填写文章标题')
                return
            }
            var value = this.inputValue;
            value.user_id = this.userId;
            var data = value;
            this.$http('articleService','addOrUpdate',data)
            .then(res=>{
                this.propUpModel = false;
                if(res.result == 'success'){
                    this.$Message.success('新增成功');
                    this.getList(this.current);
                }else{
                    this.$Message.error(res.message);
                }
            })
        },
        selecserch(val){
            var data = this.contrastData;
            var arr = [];
            for(let i =0;i<data.length;i++){
                if(val == data[i].tag){
                    arr.push(data[i]);
                }
            }
            this.data1 = arr;
        },
        handleView (name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove (file) {
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess (res, file) {
            file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
            file.name = '7eb99afb9d5f317c912f08b5212fd69a';
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: 'The file format is incorrect',
                desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: 'Exceeding file size limit',
                desc: 'File  ' + file.name + ' is too large, no more than 2M.'
            });
        },
        handleBeforeUpload () {
            const check = this.uploadList.length < 5;
            if (!check) {
                this.$Notice.warning({
                    title: 'Up to five pictures can be uploaded.'
                });
            }
            return check;
        }
    },
    mounted () {
        this.uploadList = this.$refs.upload.fileList;
    }
}
</script>
<style scoped>
.page{
    justify-content: space-between;
}
.a_box{
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -300px 0 0 -275px;
    width: 720px;
    height: 550px;
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
</style>
