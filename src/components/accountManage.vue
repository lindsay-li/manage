<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>用户名：</span>
            <Input type="text" v-model="inputValue.user" style="width:160px"/>
        </div>
        <div class="option">
            <span>手机号：</span>
            <Input type="text" name="phone"v-model="inputValue.phone" style="width:160px"/>
        </div>
        <!-- <div class="option">
            <span>创建时间：</span>
            <input type="text" name="time"v-model="inputValue.time">
            <Date-picker type="date" placeholder="选择日期" style="width: 150px" @on-change="timeChange" ></Date-picker>
        </div> -->
        <div class="option">
            <span>城市：</span>
            <Input type="text" name="city"v-model="inputValue.city" style="width:160px"/>
        </div>
        <div class="serch" @click="searchList">查詢</div>
    </div>
    <div class="activity">
        <Table border  :columns="columns1" :data="data1"  class="post">
            <template slot="username" slot-scope="{row,index}">
                <Input type="text" v-model="editValue.username" v-if="editIndex === index" />
                <span v-else>{{ row.username }}</span>
            </template>
            <template slot="user_no" slot-scope="{row,index}">
                <Input type="text" v-model="editValue.user_no" v-if="editIndex === index" />
                <span v-else>{{ row.user_no }}</span>
            </template>
            <template slot="sex" slot-scope="{row,index}">
                <Input type="text" v-model="editValue.sex" v-if="editIndex === index" />
                <span v-else>{{ row.sex }}</span>
            </template>
            <template slot="birth" slot-scope="{row,index}">
                <Input type="text" v-model="editValue.birth" v-if="editIndex === index" />
                <span v-else>{{ row.birth }}</span>
            </template>
            <template slot="tel" slot-scope="{row,index}">
                <Input type="text" v-model="editValue.tel" v-if="editIndex === index" />
                <span v-else>{{ row.tel }}</span>
            </template>
            <template slot="addr" slot-scope="{row,index}">
                <Input type="text" v-model="editValue.addr" v-if="editIndex === index" />
                <span v-else>{{ row.addr }}</span>
            </template>
            <template slot="city" slot-scope="{row,index}">
                <Input type="text" v-model="editValue.city" v-if="editIndex === index" />
                <span v-else>{{ row.city }}</span>
            </template>
            <template slot="email" slot-scope="{row,index}">
                <Input type="text" v-model="editValue.email" v-if="editIndex === index" />
                <span v-else>{{ row.email }}</span>
            </template>
            <template slot="password" slot-scope="{row,index}">
                <Input type="text" v-model="editValue.password" v-if="editIndex === index" />
                <span v-else>{{ row.password }}</span>
            </template>
            <template slot="action" slot-scope="{row,index}">
                <div v-if="editIndex === index">
                    <Button size='small' type="primary" @click="saveHandle(row,row.id)" style="margin-right:5px">保存</Button>
                    <Button size='small' type="error" @click="editIndex = -1">取消</Button>
                </div>
                <div v-else>
                    <Button size='small' type="primary" @click="editHandle(row,index)" style="margin-right:5px">编辑</Button>
                    <Button size='small' type="error" @click="remove(row)">删除</Button>
                </div>
            </template>
        </Table>
    </div>
    <div class="page">
        <div class="_btn">
            <div class="send" @click="openModel">新增账户</div>
            <!-- <div class="b_delete" >批量删除</div> -->
        </div>
        <Page :total="total" show-total show-elevator prev-text='上一頁' next-text='下一頁' @on-change="pageChange"/>
    </div> 
    <div class="prop_model" v-show="propModel">
        <div class="_box">
            <div class="contant">
                <div class="tit">添加用户</div>
                <div class="list"style="width:100%;">
                    <table style="width:100%;">
                        <tr>
                            <td style="text-align:right">用户名:</td>
                            <td>
                                <Input v-model="setuser.username"  placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">密码:</td>
                            <td>
                                <Input v-model="setuser.pwda"  placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">确认密码:</td>
                            <td>
                                <Input v-model="setuser.pwdb"  placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="btns">
                    <div class="cancel" @click='closeModel'>取消</div>
                    <div class="sure" @click="setUserHandle">確定</div>
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
            total:0,
            inputValue:{
                user:'',
                phone:'',
                city:''
            },
            editValue:{
                city:'',
                sex:'',
                birth:'',
                tel:'',
                addr:'',
                email:'',
                user_no:'',
                username:'',
                password:""
            },
            editIndex:-1,
            setuser:{
                username:'',
                pwda:'',
                pwdb:''
            },
            columns1: [
                {
                    type:'selection',
                    align:'center',
                    width:60
                },
                {
                    title: 'ID',
                    key: 'id',
                    minWidth:85
                },
                {
                    title: '用户姓名',
                    slot: 'username',
                    minWidth:120
                },
                {
                    title: '用户账号',
                    slot: 'user_no',
                    minWidth:120
                },
                {
                    title: '用户密码',
                    slot: 'password',
                    minWidth:120
                },
                {
                    title: '性别',
                    slot: 'sex',
                    minWidth:85
                },
                {
                    title: '生日',
                    slot: 'birth',
                    minWidth:160
                },
                {
                    title: '手机号码',
                    slot: 'tel',
                    minWidth:160
                },
                {
                    title: '邮箱',
                    slot: 'email',
                    minWidth:165
                },
                {
                    title: '城市',
                    slot: 'city',
                    minWidth:160
                },
                {
                    title: '地址',
                    slot: 'addr',
                    minWidth:160
                },
                {
                    title: '创建时间',
                    key: 'create_time',
                    minWidth:160
                },
                {
                    title: '后台用户等级',
                    key: 'user_level',
                    minWidth:130
                },
                {
                    title: '负责门店id',
                    key: 'shop_ids',
                    minWidth:120
                },
                {
                    title:'操作',
                    slot:'action',
                    minWidth:135
                }
            ],
            data1: [],
            a_types:'',
            single:false,
            propModel:false,
            current:0,  //当前页码
        }
    },
    created(){
        this.getList(0);
    },
    methods:{
        searchList(){ //查询用户
            var data = {};
            if(this.inputValue.user){
                data.username = this.inputValue.user;
            }
            if(this.inputValue.phone){
                data.tel = this.inputValue.phone;
            }
            if(this.inputValue.city){
                data.city = this.inputValue.city;
            }
           var len = Object.keys(data);
           if(len == 0){
               this.$Modal.warning({
                    title:'警告',
                    content: '<h3>请输入查询参数</h3>'
                });
               return;
           }
            this.$http('zAdminUserService','findDatas',data)
            .then((res)=>{
                console.log('res',res)
                if(res.rows){
                    for(let i=0;i<res.rows.length;i++){
                        if(res.rows[i].sex==1){
                            res.rows[i].sex = '男';
                        }else if(res.rows[i].sex ==2){
                            res.rows[i].sex = '女';
                        }else{
                            res.rows[i].sex ='未知';
                        }
                        res.rows[i].create_time = this.$changeTime(res.rows[i].create_time);
                    }
                    this.data1 = res.rows;
                }else{
                    this.$Message.warning('未查询到数据');
                }
            })
        },
        setUserHandle(){ //新增账户
            if(!this.setuser.username){
                this.$Modal.info({title:'用户名不能为空'})
                return
            }
            if(!this.setuser.pwda){
                this.$Modal.info({title:'密码不能为空'})
                return
            }
            if(this.setuser.pwda != this.setuser.pwdb){
                this.$Modal.info({title:'两次输入密码不一致'})
                return
            }
            var data = {
                    username:this.setuser.username,
                    password:this.setuser.pwda
                }
            this.$http('zAdminUserService','addOrUpdate',data)
            .then((res)=>{
                console.log(res)
                if(res.result == 'fail'){
                    this.$Message.error({title:res.message})
                }else if(res.result == 'success'){
                    this.$Message.success({title:res.message});
                    this.getList(0);
                }
            })
        },
        getList(start){ //h获取用户列表数据
        var curt =start>0?(start-1)*10:0
            var data = {
                    start:curt,
                    rows:10
                }
            this.$http('zAdminUserService','findDatas',data)
            .then((res)=>{
                if(res.rows){
                    for(let i=0;i<res.rows.length;i++){
                        if(res.rows[i].sex==1){
                            res.rows[i].sex = '男';
                        }else if(res.rows[i].sex ==2){
                            res.rows[i].sex = '女';
                        }else{
                            res.rows[i].sex ='未知';
                        }
                        res.rows[i].create_time = this.$changeTime(res.rows[i].create_time);
                    }
                    this.data1 = res.rows;
                    this.total = res.total;
                }
            })
        },
        openModel(){
            this.propModel = true;
        },
        closeModel(){
            this.propModel = false;
        },
        remove (row){ //删除数据
            console.log(1)
            this.$Modal.confirm({
                title: '警告',
                content: '<h3>此操作将删除数据，是否继续？</h3>',
                onOk: () => {
                    var data = {
                        id:row.id
                    }
                    this.$http('zAdminUserService','deleteData',data)
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
        saveHandle(row,id){ //保存修改数据
            this.editIndex = -1;
            var newrow = row;
            var data = {};
            newrow.sex = newrow.sex == '男'?(newrow.sex == '女'?2:1):3
            if(newrow.sex=='男'){
                newrow.sex = 1;
            }else if(newrow.sex =='女'){
                newrow.sex = 2;
            }else{
                newrow.sex =3;
            }
            for(let key in this.editValue){  //参数没改变的就不传接口
                if(this.editValue[key] != newrow[key]){
                    data[key] = this.editValue[key];
                }
            }
            this.$http('zAdminUserService','addOrUpdate',data)
            .then(res=>{
                if(res.result == 'success'){
                    this.$Message.success('修改成功');
                    this.getList(this.current);
                }else{
                    this.$Message.error(res.message);
                }
            })

        },
        editHandle(row,index){//编辑table数据
            this.editValue={
                city:row.city,
                sex:row.sex,
                birth:row.birth,
                tel:row.tel,
                addr:row.addr,
                email:row.email,
                user_no:row.user_no,
                username:row.username,
                password:row.password
            }
            this.editIndex = index;
        },
        pageChange(index){ //页码切换
            console.log(index)
            this.current = index;
            this.getList(this.current);
        }
    }
}
</script>
<style scoped>

.page{
    justify-content: space-between;
}
.page .btns{
    width: auto;
    margin-top: 0;
}
.btns .send{
    margin-left: 0;
}
.btns .b_delete{
    margin-left: 20px;
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
    height: 380px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -190px 0 0 -300px;
    border-radius: 4px;
    background-color: #fff;
}
.contant{
    width: 90%;
    margin: 0 auto;
}

.btns{
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
    height: 60px;
    text-align: center;
}
</style>
