<template>
<div class="wrappar">
    <div class="_title">菜單管理</div>
    <div class="activity">
        <TreeTable border expand-key="id" :expand-type="false" :selectable="false" :columns="columns1" :data="data1" :tree-type="true" height="466px" class="post">
            <template slot="menus" slot-scope="scope">
                <Input type="text" v-model="tables.name" v-if="editIndex === scope.rowIndex" />
                <span v-else>{{ scope.row.m_name }}</span>
            </template>
            <template slot="code" slot-scope="scope">
                <Input type="text" v-model="tables.code" v-if="editIndex === scope.rowIndex" />
                <span v-else>{{ scope.row.m_code }}</span>
            </template>
            <!-- <template slot="time" slot-scope="scope">
                <Input type="text" v-model="tables.time" v-if="editIndex === scope.rowIndex" />
                <span v-else>{{ scope.row.create_time }}</span>
            </template> -->
            <template slot="urls" slot-scope="scope">
                <Input type="text" v-model="tables.url" v-if="editIndex === scope.rowIndex" />
                <span v-else>{{ scope.row.m_url }}</span>
            </template>
            <template slot="m_order" slot-scope="scope">
                <Input-number type="text" v-model="tables.m_order" v-if="editIndex === scope.rowIndex" /></Input-number>
                <span v-else>{{ scope.row.m_order }}</span>
            </template>
            <!-- <template slot="user" slot-scope="scope">
                <Input type="text" v-model="tables.user" v-if="editIndex === scope.rowIndex" />
                <span v-else>{{ scope.row.create_user }}</span>
            </template> -->
            <template slot="status" slot-scope="scope">
                <!-- <Input type="text" v-model="tables.status" v-if="editIndex === scope.rowIndex" /> -->
                <Select v-model="tables.status" v-if="editIndex === scope.rowIndex">
                    <Option v-for="(item,index) in statusList" :value="item.value" :key="index">{{ item.label }}</Option>
                </Select>
                <span v-else>{{ scope.row.status }}</span>
            </template>
            <template slot="likes" slot-scope="scope">
                <div v-if="editIndex === scope.rowIndex">
                    <Button size='small' type="primary" @click="saveHandle(scope.row,scope.row.id,scope.row.pid)" style="margin-right:5px">保存</Button>
                    <Button size='small' type="error" @click="editIndex = -1">取消</Button>
                </div>
                <div v-else>
                    <Button size='small' type="primary" @click="editHandle(scope.row,scope.rowIndex)" style="margin-right:5px">編輯</Button>
                    <Button size='small' type="error" @click="remove(scope.row)">刪除</Button>
                </div>
            </template>
        </TreeTable>
    </div>
    <div class="page">
        <div class="_btn">
            <div class="send" @click="openModel">新增菜單</div>
        </div>
    </div> 
    <div class="prop_model" v-show="propModel">
        <div class="_box">
            <div class="contant">
                <div class="tit">添加用戶</div>
                <div class="list"style="width:100%;">
                    <table style="width:100%;">
                        <tr>
                            <td style="text-align:right">菜單名稱:</td>
                            <td>
                                <Input v-model="menus.name"  placeholder="點擊輸入" style="width: 200px" />
                            </td>
                            <td style="text-align:right">菜單編碼:</td>
                            <td>
                                <Input v-model="menus.code" placeholder="點擊輸入" style="width: 200px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">是否啟用:</td>
                            <td>
                                <Select v-model.sync="menus.status" style="width:200px">
                                    <Option v-for="(item,index) in statusList" :value="item.value" :key="index">{{ item.label }}</Option>
                                </Select>
                            </td>
                            <td style="text-align:right">菜單排序:</td>
                            <td>
                                <!-- <Input  placeholder="點擊輸入" style="width: 200px" /> -->
                                <Input-number :value="0" v-model="menus.order" :max="50" :min="1"  style="width: 200px"></Input-number>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">菜單地址:</td>
                            <td colspan="2">
                                <Input v-model="menus.url" placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">上級菜單:</td>
                            <td colspan="2">
                                <Treeselect v-model="menus.fid"  :options="options" style="width: 302px;margin-left:8px"/>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="btns">
                    <div class="cancel" @click='closeModel'>取消</div>
                    <div class="sure" @click="setMenuHandle">確定</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import Treeselect from '@riophae/vue-treeselect'
  // import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
    data(){
        return{
            propModel:false,
            menus:{
                name:'',
                code:'',
                status:'',
                order:0,
                url:'',
                fid:null
            },
            editIndex:-1,
            tables:{
                name:'',
                code:'',
                url:'',
                status:'',
                order:'',
                m_order:0
            },
            options:[{
                id: '1',
                label: '後臺管理',
                children: [ {
                    id: '0',
                    label: '用戶管理',
                }, {
                    id: '4',
                    label: '菜單管理',
                } ],
                }, {
                id: '2',
                label: '商品管理',
                }, {
                id: '3',
                label: '庫存管理',
                } 
            ],
            statusList:[
                {
                    label:'啟用',
                    value:1,
                },
                {
                    label:'不啟用',
                    value:0
                }
            ],
            columns1:[
                {
                    title: 'ID',
                    key: 'id',
                    align:'center',
                    headerAlign:'center',
                    minWidth:85
                },
                {
                    title: '菜單名稱',
                    key: 'm_name',
                    align:'center',
                    headerAlign:'center',
                    type: 'template',
                    template: 'menus',
                    minWidth:145
                },
                {
                    title: '菜單編碼',
                    key: 'm_code',
                    align:'center',
                    headerAlign:'center',
                    type: 'template',
                    template: 'code',
                    minWidth:105
                },
                {
                    title: '創建時間',
                    key: 'create_time',
                    align:'center',
                    headerAlign:'center',
                    minWidth:140
                },
                {
                    title: '菜單路徑',
                    key: 'm_url',
                    align:'center',
                    headerAlign:'center',
                    type: 'template',
                    template: 'urls',
                    minWidth:160
                },
                {
                    title: '菜單排序',
                    key: 'm_order',
                    align:'center',
                    type: 'template',
                    template: 'm_order',
                    headerAlign:'center',
                    minWidth:105
                },
                {
                    title: '創建人',
                    key: 'create_user',
                    align:'center',
                    headerAlign:'center',
                    minWidth:105
                },
                {
                    title: '狀態',
                    key: 'status',
                    align:'center',
                    headerAlign:'center',
                    type: 'template',
                    template: 'status',
                    minWidth:105
                },
                {
                    title:'操作',
                    key:'likes',
                    align:'center',
                    headerAlign:'center',
                    type: 'template',
                    template: 'likes',
                    minWidth:140
                }
            ],
            data1:[
                {
                    m_name:'後臺管理',
                    m_code:'123',
                    create_time:'2018-12-30',
                    m_url:'/componengts/manage',
                    create_user:'大張偉',
                    status:'0',
                    m_order:1,
                    id:1,
                    children:[
                        {
                            m_name:'用戶管理',
                            m_code:'1456',
                            create_time:'2018-12-30',
                            m_url:'/componengts/manage',
                            create_user:'大張偉',
                            status:'0', 
                            pid:1,
                            id:1
                        },
                        {
                            m_name:'菜單管理',
                            m_code:'ddd',
                            create_time:'2018-12-30',
                            m_url:'/componengts/manage',
                            create_user:'大張偉',
                            status:'0', 
                            pid:1,
                            id:2
                        },
                    ]
                },
                
            ]
        }
    },
    components: { Treeselect },
    created(){
        this.getList();
    },
    methods:{
        getList(){
            var data={
                start:0
            }
            this.$http('zAdminMenuService','findDatas',data)
            .then(res=>{
                console.log(res);
                if(res.rows){
                    var data = res.rows;
                    var arr1 = [];
                    for(let i =0;i<data.length;i++){
                        if(!data[i].pid){
                            data[i].create_time = this.$changeTime(data[i].create_time);
                            data[i].status = data[i].status?'啟用':'未啟用';
                            arr1.push(data[i]);
                        }
                    }
                    for(let k =0;k<arr1.length;k++){
                        var arr= [];
                        for(let j =0;j<data.length;j++){
                            if(data[j].pid && arr1[k].id == data[j].pid){
                                data[j].create_time = this.$changeTime(data[j].create_time);
                                data[j].status = data[j].status?'啟用':'未啟用';
                                arr.push(data[j]);
                            }
                        }
                        arr1[k].children = arr;
                    }
                    console.log(arr1)
                    this.data1 = arr1;
                    this.options = this.getTree(arr1);
                    sessionStorage.setItem('MENULIST',JSON.stringify(this.options));
                }
            })
        },
        editHandle(row,index){ //編輯菜單
            this.tables = {
                name:row.m_name,
                code:row.m_code,
                url:row.m_url,
                m_order:row.m_order,
                status:row.status=='啟用'?1:0,
            }
            this.editIndex = index;
        },
        remove(row){ //刪除菜單
            // this.$Modal.confirm({
            //     title: '警告',
            //     content: '<p>The dialog box will be closed after 2 seconds</p>',
            //     okText:'確定',
            //     cancelText:"取消",
            //     loading:true,
            //     onOk:() => {
                    var data = {
                        id:row.id
                    }
                    this.$http('zAdminMenuService','deleteData',data)
                    .then(res=>{
                        this.$Modal.remove();
                        if(res.result == 'success'){
                            this.$Message.success(res.message);
                            this.getList();
                        }else{
                            this.$Message.warning(res.message);
                        }
                    })
            //     }
            // });
        },
        openModel(){
            this.propModel = true;
        },
        closeModel(){
            this.propModel = false;
        },
        setMenuHandle(){//新建菜單
            console.log(this.menus)
            var da = this.menus;
            var userInfo = JSON.parse(sessionStorage.getItem('user_info'));
            var data = {
                m_url:da.url,
                m_name:da.name,
                m_code:da.code,
                m_order:da.order,
                create_user:userInfo.dbUser.id,
                status:da.status
            }
            if(da.fid){
                data.pid = da.fid
            }
            this.$http('zAdminMenuService','addOrUpdate',data)
            .then(res=>{
                console.log(res);
                if(res.result == 'success'){
                    this.$Message.success(res.message);
                    this.propModel = false;
                    this.getList();
                }else{
                    this.$Message.warning(res.message);
                }
            })
        },
        saveHandle(row,id,pid){ //保存修改數據
            console.log(row,'pid',pid)
            console.log(this.tables)
            var data = {
                id:id
            };
            if(pid){
                data.pid = pid;
            }
            var table = this.tables;
            if(table.name != row.m_name){
                data.m_name = table.name;
            }
            // if(table.code != row.m_code){
                data.m_code = table.code;
            // }
            data.m_order = table.m_order
            if(table.url != row.m_url){
                data.m_url = table.url;
            }
            var da = row.status=='啟用'?1:0;
            if(table.status != da){
                data.status = table.status=='啟用'?1:0;
            }
            this.$http('zAdminMenuService','addOrUpdate',data)
            .then(res=>{
                if(res.result == 'success'){
                    this.$Message.success(res.message);
                    this.editIndex = -1;
                    this.getList();
                }else{
                    this.$Message.warning(res.message);
                }
            })
        },
        getTree (tree = []) { //選擇框樹形結構
            let arr = [];
            if (tree.length !== 0) {
            tree.forEach(item => {
                let obj = {};
                obj.label = item.m_name;
                obj.id = item.id;
                if(item.children) {
                obj.children = this.getTree(item.children);
                }
                arr.push(obj);
            });
        }
        return arr
      },
    }
}
</script>
<style scoped>
@import '../../static/title.css';
.page{
    justify-content: flex-start;
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
    width: 660px;
    height: 450px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -225px 0 0 -330px;
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
    height: 60px;
    text-align: center;
}
</style>
