<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>排序方式：</span>
            <Select v-model="selectData" style="width:160px">
                <Option v-for="item in orderList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
        <div class="option">
            <span>發佈時間：</span>
            <input type="text" name="time">
        </div>
        <div class="serch">查詢</div>
    </div>
    <div class="new_article">
        <Table border  :columns="columns1" :data="data1"  class="post"></Table>
    </div>
    <div class="page">
        <div class="btns">
            <div class="b_delete">批量刪除</div>
            <div class="send" @click="openModel">新增文章</div>
        </div>
        <Page :total="100" show-total show-elevator prev-text='上一頁' next-text='下一頁'/>
    </div>
    <div class="prop_model" v-show="propUpModel">
        <div class="a_box">
            <div class="a_content">
                <div class="a_title">新增文章</div>
                <div class="a_tit aflex">
                    <span>文章標題：</span>
                    <Input v-model="a_tit"  style="width: 486px" />
                </div>
                <div class="keyword aflex">
                    <span>設定關鍵字：</span>
                    <Input v-model="keyword"  style="width: 486px" />
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
                    <span>置頂圖片、影片：</span>
                    <Upload
                        multiple
                        action="//jsonplaceholder.typicode.com/posts/">
                        <Button style="width:486px">上傳</Button>
                    </Upload>
                </div>
                <div class="classify aflex">
                    <span>文章分類：</span>
                    <Select v-model="s_modelData" style="width:486px">
                        <Option v-for="item in orderList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="a_article aflex">
                    <span>內文：</span>
                    <Input v-model="a_article" type="textarea" :rows='5' style="width: 486px" />
                </div>
                <div class="a_btns">
                    <div class="a_cancel" @click="closeModels">取消</div>
                    <div class="a_sure">確定</div>
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
                    key: 'order1',
                    minWidth:95
                },
                {
                    title: '文章標題',
                    key: 'order2',
                    minWidth:160
                },
                {
                    title: '設定關鍵字',
                    key: 'order3',
                    minWidth:120
                },
                {
                    title: '內文',
                    key: 'order4',
                    minWidth:130
                },
                {
                    title: '插入內文圖片',
                    key: 'order5',
                    minWidth:124
                },
                {
                    title:'置頂圖片、影片',
                    key:'order6',
                    minWidth:160
                },
                {
                    title:'文章分類',
                    key:'order7',
                    minWidth:120
                }
            ],
            data1: [
                {
                    order1:'2016',
                    order2:'葡萄酒文化',
                    order3:'葡萄酒、文化',
                    order4:'葡萄酒故鄉...',
                    order5:'dsdsd.png',
                    order6:'12315.jpg',
                    order7:'熱門'
                }
            ],
            selectData:'',
            s_modelData:"",
            a_tit:'',
            keyword:'',
            a_article:'',
            propUpModel:false,
            orderList:[
                {
                    value:'最新',
                    label:'最新'
                },
                {
                    value:'熱門',
                    label:'熱門'
                },
                {
                    value:'音影',
                    label:'音影'
                },
                {
                    value:'生活',
                    label:'生活'
                },
                {
                    value:'專欄',
                    label:'專欄'
                },
                {
                    value:'酒莊',
                    label:'酒莊'
                },
                {
                    value:'活動',
                    label:'活動'
                },
                {
                    value:'深度',
                    label:'深度'
                },
                {
                    value:'大師',
                    label:'大師'
                }

            ],
            defaultList: [
                {
                    'name': 'a42bdcc1178e62b4694c830f028db5c0',
                    'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                },
                {
                    'name': 'bc7521e033abdd1e92222d733590f104',
                    'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                }
            ],
            imgName: '',
            visible: false,
            uploadList: []
        }
    },
    methods:{
        openModel(){
            this.propUpModel = true;
        },
        closeModels(){
            this.propUpModel = false;
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
.prop_model{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
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
.a_btns{
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
.a_cancel,
.a_sure{
    width: 140px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    border: 1px solid #666;
    border-radius: 6px;
    cursor:pointer;
}
.a_sure{
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
