<template>
<div class="wrappar">
    <div class="_title">产品图片管理</div>
    <div class="goods">
        <Table border  :columns="columns1" :data="data1" class="post">
            <template slot="action" slot-scope="{row,index}">
                <Button size="small" type="primary" @click="modify(row)">修改</Button>
                <Button size="small" type="error" @click="remove(row.id)">刪除</Button>
            </template>
        </Table>
    </div>
    <div class="page">
        <div class="_btn">
            <div class="send" @click="openModel">新增</div>
        </div>
        <Page :total="total" show-total show-elevator prev-text='上一頁' next-text='下一頁'  @on-change="pageChange"/>
    </div>
    <div class="prop_model" v-show="propModel">
        <div class="_box">
            <div class="contant">
                <div class="tit">{{t_text}}</div>
                <div class="list">
                    <table style="width:100%;height:200px">
                        <tr>
                            <td style="text-align:right">图片:</td>
                            <td>
                                <div v-show="pics.length ==0">
                                    <input type="file" class="files" @change="fileChanged" ref="file" multiple="multiple" name="file" accept="image/jpg,image/jpeg,image/png,image/bmp">
                                    <div style="width: 58px;height:58px;line-height: 58px;text-align:center;border:1px dashed #888;cursor:pointer" @click="addpic">
                                        <Icon type="ios-camera" size="20"></Icon>
                                    </div>
                                </div>
                                <div class="pics" v-if="pics.length >0"  @click="addpic">
                                    <img :src="files[0].src" style="width:100%;height:100%;">
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="btns">
                    <div class="cancel" @click='closeModel'>取消</div>
                    <div class="sure" @click="newAdd">確定</div>
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
                    title: '图片地址',
                    key: 'path',
                    minWidth:200
                },
                {
                    title:'操作',
                    slot:'action',
                    width:140
                }
            ],
            data1: [],
            total:0,
            current:0,
            propModel:false,
            inputValue:{
                url:'',
            },
            files:[],
            pics:[],
            n:0,
            id:'',
            t_text:'新增'
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
            this.$http('moPictureService','findDatas',data)
            .then(res=>{
                console.log(res)
                if(res.rows){
                    var arr = res.rows
                    this.data1 = arr;
                    this.total = res.total;
                }
            })
        },
        remove (id) {
            this.$Modal.confirm({
                title: '警告',
                content: '<h3>此操作將刪除數據，是否繼續？</h3>',
                onOk: () => {
                     var data = {id:id};
                    this.$http('moPictureService','deleteData',data)
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
        modify(row){//修改
            this.pics=new Array(row.path)
            var file = [];
            var obj = {
                src :row.path
            }
            file.push(obj)
            this.files =file;
            this.id = row.id;
            this.t_text = '修改'
            this.propModel = true;
        },
        newAdd(){
            var data = {
                path:this.pics[0]
            }
            if(this.id){
                data.id = this.id
            }
            this.$http('moPictureService','addOrUpdate',data)
            .then(res=>{
                this.propModel = false;
                if(res.result == 'success'){
                    this.$Message.success('添加成功');
                    this.getList(this.current);
                    this.id = '';
                    this.files = []
                    this.pics = []
                }else{
                    this.$Message.error(res.message);
                    this.id = '';
                }
            })
        },
        pageChange(index){ //切換頁數
            this.current = index==1?0:(index-1)*10;
            this.getList(this.current);
        },
        openModel(){
            this.propModel = true;
            this.t_text = '新增'
        },
        closeModel(){
            this.propModel = false;
            this.files = []
            this.id = ''
        },
        addpic(){
            this.$refs.file.click();
        },
        fileChanged(e){
            const list = this.$refs.file.files
            var file = [];
            for (let i = 0; i < list.length; i++) {
                if (!this.isContain(list[i])) {
                    const item = {
                        name: list[i].name,
                        size: list[i].size,
                        file: list[i],
                    }
                    this.html5Reader(list[i], item);
                    file.push(item);
                    this.files = file;
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
                        // this.files[this.n].status = 'finished';
                        // this.pics.push(res.data);
                        this.pics = new Array(res.data);
                        // this.n++;
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
@import '../../static/title.css';
.wrapper{
    position: relative;
}
.page{
    justify-content: space-between;
}
._box{
    width: 360px;
    height: 360px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -180px 0 0 -150px;
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
input[type="file"] {
    display: none;
}
.pics{
    width: 78px;
    height:78px;
}

</style>
