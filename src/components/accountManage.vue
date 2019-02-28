<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>用戶名：</span>
            <Input type="text" v-model="inputValue.user" style="width:160px"/>
        </div>
        <div class="option">
            <span>手機號：</span>
            <Input type="text" name="phone" v-model="inputValue.phone" style="width:160px"/>
        </div>
        <!-- <div class="option">
            <span>創建時間：</span>
            <input type="text" name="time"v-model="inputValue.time">
            <Date-picker type="date" placeholder="選擇日期" style="width: 150px" @on-change="timeChange" ></Date-picker>
        </div> -->
        <div class="option">
            <span>城市：</span>
            <Input type="text" name="city" v-model="inputValue.city" style="width:160px"/>
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
                <!-- <Input type="text" v-model="editValue.sex" v-if="editIndex === index" /> -->
                <Select v-model="editValue.sex" v-if="editIndex === index">
                    <Option v-for="(item,index) in sexList" :value="item.value" :key="index">{{ item.label }}</Option>
                </Select>
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
            <template slot="rolename" slot-scope="{row}">
                <!-- <Input type="text" v-model="editValue.rolename" v-if="editIndex === index" /> -->
                <!-- <Select v-model="editValue.roleId" multiple  v-if="editIndex === index">
                    <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select> -->
                <div class="rolename" @click="changeRole(row)">
                    <span v-text="row.rolename?row.rolename.join(','):''"></span>
                </div>
                <!-- <span v-else>{{ row.rolename }}</span> -->
            </template>
            <template slot="shop_ids" slot-scope="{row,index}">
                <!-- <div>{{getShopname(row.shop_ids)}}</div> -->
                <div v-if="editIndex === index">
                    <Select v-model="editValue.shop_ids" multiple >
                        <Option v-for="item in shopData" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <Tooltip :content="getShopname(row.shop_ids)" v-else>
                    {{getShopname(row.shop_ids)}}
                </Tooltip>
                
            </template>
            <template slot="action" slot-scope="{row,index}">
                <div v-if="editIndex === index">
                    <Button size='small' type="primary" @click="saveHandle(row,row.id)" style="margin-right:5px">保存</Button>
                    <Button size='small' type="error" @click="editIndex = -1">取消</Button>
                </div>
                <div v-else>
                    <Button size='small' type="primary" @click="editHandle(row,index)" style="margin-right:5px">編輯</Button>
                    <Button size='small' type="error" @click="remove(row)">刪除</Button>
                </div>
            </template>
        </Table>
    </div>
    <div class="page">
        <div class="_btn">
            <div class="send" @click="openModel">新增賬戶</div>
            <!-- <div class="b_delete" >批量刪除</div> -->
        </div>
        <Page :total="total" show-total show-elevator prev-text='上一頁' next-text='下一頁' @on-change="pageChange"/>
    </div> 
    <div class="prop_model" v-show="propModel">
        <div class="_box">
            <div class="contant">
                <div class="tit">添加用戶</div>
                <div class="list" style="width:100%;">
                    <table style="width:100%;">
                        <tr>
                            <td style="text-align:right">用戶名:</td>
                            <td>
                                <Input v-model="setuser.username"  placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">用户账号:</td>
                            <td>
                                <Input v-model="setuser.user_no"  placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">密碼:</td>
                            <td>
                                <Input v-model="setuser.pwda"  placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">確認密碼:</td>
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
    <div class="prop_model" v-show="roleModel">
        <div class="_role">
            <div class="contant">
                <div class="r_tit">添加角色</div>
                <div class="list" style="width:100%;">
                    <!-- <Select v-model="roleId" multiple >
                        <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select> -->
                    <CheckboxGroup v-model="fruit">
                        <Checkbox :label="item.label" v-for="item in roleList" :key="item.value"></Checkbox>
                    </CheckboxGroup>
                </div>
                <div class="btns">
                    <div class="cancel" @click='closeModel'>取消</div>
                    <div class="sure" @click="setRoleHandle">確定</div>
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
            user_id:'',
            roleModel:false,
            roleId:['3'],
            fruit:[],
            sexList:[
                {
                    label:'男',
                    value:1,
                },
                {
                    label:'女',
                    value:2
                }
            ],
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
                password:"",
                shop_ids:[]
            },
            editIndex:-1,
            setuser:{
                username:'',
                pwda:'',
                pwdb:'',
                user_no:''
            },
            roleList:[],
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
                    title: '用戶名稱',
                    slot: 'username',
                    minWidth:120
                },
                {
                    title: '用戶賬號',
                    slot: 'user_no',
                    minWidth:120
                },
                {
                    title: '用戶密碼',
                    slot: 'password',
                    minWidth:120
                },
                {
                    title:'所屬角色',
                    slot:'rolename',
                    minWidth:200,
                },
                {
                    title: '負責門店id',
                    slot: 'shop_ids',
                    ellipsis:true,
                    tooltip:true,
                    minWidth:180
                },
                {
                    title: '性別',
                    slot: 'sex',
                    minWidth:85
                },
                {
                    title: '生日',
                    slot: 'birth',
                    minWidth:160
                },
                {
                    title: '手機號碼',
                    slot: 'tel',
                    minWidth:160
                },
                {
                    title: '郵箱',
                    slot: 'email',
                    minWidth:180
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
                    title: '創建時間',
                    key: 'create_time',
                    minWidth:160
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
            current:0,  //當前頁碼
            shopData:[], //門店集合

        }
    },
    created(){
        this.getroleid();
        this.getShop();
        this.getList(0);
    },
    methods:{
        searchList(){ //查詢用戶
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
                    content: '<h3>請輸入查詢參數</h3>'
                });
               return;
           }
            this.$http('zAdminUserService','findDatas',data)
            .then((res)=>{
                console.log('res',res)
                if(res.rows.length>0){
                    for(let i=0;i<res.rows.length;i++){
                        if(res.rows[i].sex==1){
                            res.rows[i].sex = '男';
                        }else if(res.rows[i].sex ==2){
                            res.rows[i].sex = '女';
                        }else{
                            res.rows[i].sex ='未知';
                        }
                        var rolename = [];
                        var roleid = [];
                        if(res.rows[i].rolename){
                            var role = res.rows[i].rolename.split(',');
                            for(let j =0;j<role.length;j++){
                                var str = role[j].split('#');
                                rolename.push(str[1]);
                                roleid.push(str[0])
                            }
                        }
                        res.rows[i].create_time =res.rows[i].create_time? this.$changeTime(res.rows[i].create_time):'';
                        res.rows[i].rolename = rolename;
                        res.rows[i].roleId = roleid;      
                    }
                    this.data1 = res.rows;
                }else{
                    this.$Message.warning('未查詢到數據');
                }
            })
        },
        setUserHandle(){ //新增賬戶
            if(!this.setuser.username){
                this.$Modal.info({title:'用戶名不能為空'})
                return
            }
            if(!this.setuser.user_no){
                this.$Modal.info({title:'用戶账号不能為空'})
                return
            }
            if(!this.setuser.pwda){
                this.$Modal.info({title:'密碼不能為空'})
                return
            }
            if(this.setuser.pwda != this.setuser.pwdb){
                this.$Modal.info({title:'兩次輸入密碼不一致'})
                return
            }
            var data = {
                    username:this.setuser.username,
                    password:this.setuser.pwda,
                    user_no:this.setuser.user_no
                }
            this.$http('zAdminUserService','addOrUpdate',data)
            .then((res)=>{
                console.log(res)
                if(res.result == 'fail'){
                   
                }else if(res.result == 'success'){
                    this.propModel = false;
                    this.$Message.success(res.message);
                    this.getList(0);
                }else{
                     this.$Message.error(res.message)
                }
            })
        },
        getList(start){ //h獲取用戶列表數據
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
                        var rolename = [];
                        var roleid = [];
                        if(res.rows[i].rolename){
                            var role = res.rows[i].rolename.split(',');
                            for(let j =0;j<role.length;j++){
                                var str = role[j].split('#');
                                rolename.push(str[1]);
                                roleid.push(str[0])
                            }
                        }
                        res.rows[i].create_time = res.rows[i].create_time?this.$changeTime(res.rows[i].create_time):'';
                        res.rows[i].rolename = rolename;
                        res.rows[i].roleId = roleid;
                    }
                    this.data1 = res.rows;
                    this.total = res.total;
                }
            })
        },
        getroleid(){
            var data = {
                start:0,
                rows:40
            }
            this.$http('zAdminRoleService','findDatas',data)
            .then(res=>{
                if(res.rows){
                    var arr= [];
                    for(let i=0;i<res.rows.length;i++){
                        var obj = {};
                        obj.value = res.rows[i].id;
                        obj.label = res.rows[i].r_name;
                        arr.push(obj);
                    }
                this.roleList = arr;
                console.log('role',this.roleList)
                }
            })
        },
        openModel(){
            this.propModel = true;
        },
        closeModel(){
            this.propModel = false;
            this.roleModel = false;
             var data = {
                    username:this.setuser.username,
                    password:this.setuser.pwda,
                    user_no:this.setuser.user_no
                }
            this.setuser={
                username:'',
                pwda:'',
                pwdb:'',
                user_no:''
            }
        },
        remove (row){ //刪除數據
            console.log(1)
            this.$Modal.confirm({
                title: '警告',
                content: '<h3>此操作將刪除數據，是否繼續？</h3>',
                onOk: () => {
                    var data = {
                        id:row.id
                    }
                    this.$http('zAdminUserService','deleteData',data)
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
        saveHandle(row,id){ //保存修改數據
            this.editIndex = -1;
            var newrow = row;
            var data = { };
            newrow.sex = newrow.sex == '男'?(newrow.sex == '女'?2:1):3
            // if(newrow.sex=='男'){
            //     newrow.sex = 1;
            // }else if(newrow.sex =='女'){
            //     newrow.sex = 2;
            // }else{
            //     newrow.sex =3;
            // }
            for(let key in this.editValue){  //參數沒改變的就不傳接口
                if(this.editValue[key] != newrow[key]){
                    data[key] = this.editValue[key];
                }
            }
            // data = this.editValue
            data.city = this.editValue.city
            data.birth = this.editValue.birth
            data.tel = this.editValue.tel
            data.addr = this.editValue.addr
            data.email = this.editValue.email
            data.id = id
            if(data.shop_ids){
                data.shop_ids = data.shop_ids.join(',')
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
        editHandle(row,index){//編輯table數據
            this.editValue={
                city:row.city,
                sex:row.sex == '男'?(row.sex == '女'?2:1):3,
                birth:row.birth,
                tel:row.tel,
                addr:row.addr,
                email:row.email,
                user_no:row.user_no,
                username:row.username,
                password:row.password,
                shop_ids:row.shop_ids?row.shop_ids.split(','):''
            }
            this.editIndex = index;
        },
        pageChange(index){ //頁碼切換
            console.log(index)
            this.current = index;
            this.getList(this.current);
        },
        changeRole(row){  //點擊編輯角色
            this.fruit = row.rolename;
            this.roleModel = true;
            this.user_id = row.id;
        },
        getShop(){  //獲取所有門店數據
            var data = {
                start:0,
                rows:1000
            }
            this.$http('orderShopService','findDatas',data)
            .then(res=>{
                console.log(res)
                if(res.rows){
                    var arr = [];
                    for(let i =0;i<res.rows.length;i++){
                        var obj = {}
                        obj.id = res.rows[i].id;
                        obj.name = res.rows[i].name;
                        obj.value = res.rows[i].id;
                        obj.label = res.rows[i].name;
                        arr.push(obj)
                    }
                    this.shopData = arr;
                }
            })
        },
        getShopname(ids){
            if(!ids){return}
            var idArr = ids.split(',');
            var str = '';
            for(let i=0;i<this.shopData.length;i++){
                if(idArr.indexOf(this.shopData[i].id+'') >= 0){
                    str += this.shopData[i].name + ','
                }
            }
            return str
        },
        setRoleHandle(){ //角色點擊確定
            console.log(this.fruit)
            this.roleModel = false;
            var roleid = [];
            for(let i =0;i<this.roleList.length;i++){
                for(let j =0;j<this.fruit.length;j++){
                    if(this.roleList[i].label == this.fruit[j]){
                        roleid.push(this.roleList[i].value)
                    }
                }
            }
            var data = {
                user_id:this.user_id,
                roleIds:roleid.join(',')
            }
            this.$http('zAdminUserService','addUserRole',data)
            .then(res=>{
                if(res.result == 'success'){
                    this.$Message.success('修改成功');
                    this.getList(this.current);
                }else{
                    this.$Message.error(res.message);
                }
            })
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
.btns{
    display: flex;
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
.r_tit{
    width: 80px;
    height: 36px;
    background-color: #009688;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    line-height: 36px;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
}
._box{
    width: 600px;
    height: 410px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -205px 0 0 -300px;
    border-radius: 4px;
    background-color: #fff;
}
._role{
    width: 400px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -150px 0 0 -100px;
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
    position: absolute;
    bottom: 10px;
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
.rolename{
    height: 40px;
    cursor: pointer;
    position: relative;
    line-height: 40px;
}
.rolename::after{
    display: inline-block;
    content: "";
    width: 32px;
    height: 32px;
    background: url(../assets/edit.png) 0 0 no-repeat;
    background-size:80%; 
    position: absolute;
    top: 8px;
    right: 0px;
}
</style>
