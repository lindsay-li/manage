<template>
<div class="wrapper">
    <div class="activity">
        <TreeTable border expand-key="m_name" :expand-type="false" :selectable="true" :columns="columns1" :data="data1" :tree-type="true" class="post">
            <template slot="likes" slot-scope="scope">
                <Button type="primary" @click="show(scope)">编辑</Button>
                <Button type="error" @click="remove(scope)">删除</Button>
            </template>
        </TreeTable>
    </div>
    <div class="page">
        <div class="_btn">
            <div class="send" @click="openModel">新增菜单</div>
        </div>
    </div> 
    <div class="prop_model" v-show="propModel">
        <div class="_box">
            <div class="contant">
                <div class="tit">添加用户</div>
                <div class="list"style="width:100%;">
                    <table style="width:100%;">
                        <tr>
                            <td style="text-align:right">菜单名称:</td>
                            <td>
                                <Input v-model="menus.name"  placeholder="點擊輸入" style="width: 200px" />
                            </td>
                            <td style="text-align:right">菜单编码:</td>
                            <td>
                                <Input v-model="menus.code" placeholder="點擊輸入" style="width: 200px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">是否启用:</td>
                            <td>
                                <i-select v-model.sync="menus.status" style="width:200px">
                                    <i-option v-for="(item,index) in statusList" :value="item.value" :key="index">{{ item.label }}</i-option>
                                </i-select>
                            </td>
                            <td style="text-align:right">菜单排序:</td>
                            <td>
                                <!-- <Input  placeholder="點擊輸入" style="width: 200px" /> -->
                                <Input-number :value="0" v-model="menus.order" :max="10" :min="1"  style="width: 200px"></Input-number>
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">菜单地址:</td>
                            <td colspan="2">
                                <Input v-model="menus.url" placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">上级菜单:</td>
                            <td colspan="2">
                                <Treeselect v-model="menus.fid"  :options="options" style="width: 302px;margin-left:8px"/>
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
            options:[{
                id: '1',
                label: '后台管理',
                children: [ {
                    id: '0',
                    label: '用户管理',
                }, {
                    id: '4',
                    label: '菜单管理',
                } ],
                }, {
                id: '2',
                label: '商品管理',
                }, {
                id: '3',
                label: '库存管理',
                } 
            ],
            statusList:[
                {
                    label:'启用',
                    value:1,
                },
                {
                    label:'不启用',
                    value:0
                }
            ],
            columns1:[
                {
                    title: '菜单名称',
                    key: 'm_name',
                    align:'center',
                    headerAlign:'center',
                    minWidth:145
                },
                {
                    title: '菜单编码',
                    key: 'm_code',
                    align:'center',
                    headerAlign:'center',
                    minWidth:105
                },
                {
                    title: '创建时间',
                    key: 'create_time',
                    align:'center',
                    headerAlign:'center',
                    minWidth:140
                },
                {
                    title: '菜单路径',
                    key: 'm_url',
                    align:'center',
                    headerAlign:'center',
                    minWidth:160
                },
                {
                    title: '创建人',
                    key: 'create_user',
                    align:'center',
                    headerAlign:'center',
                    minWidth:105
                },
                {
                    title: '状态',
                    key: 'status',
                    align:'center',
                    headerAlign:'center',
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
                    m_name:'后台管理',
                    m_code:'123',
                    create_time:'2018-12-30',
                    m_url:'/componengts/manage',
                    create_user:'大张伟',
                    status:'0',
                    m_order:1,
                    id:1,
                    children:[
                        {
                            m_name:'用户管理',
                            m_code:'1456',
                            create_time:'2018-12-30',
                            m_url:'/componengts/manage',
                            create_user:'大张伟',
                            status:'0', 
                            pid:1,
                            id:1
                        },
                        {
                            m_name:'菜单管理',
                            m_code:'ddd',
                            create_time:'2018-12-30',
                            m_url:'/componengts/manage',
                            create_user:'大张伟',
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
                start:0,
                rows:60
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
                            data[i].status = data[i].status?'启用':'未启用';
                            arr1.push(data[i]);
                        }
                    }
                    for(let k =0;k<arr1.length;k++){
                        var arr= [];
                        for(let j =0;j<data.length;j++){
                            if(data[j].pid && arr1[k].id == data[j].pid){
                                data[j].create_time = this.$changeTime(data[j].create_time);
                                data[j].status = data[j].status?'启用':'未启用';
                                arr.push(data[j]);
                            }
                        }
                        arr1[k].children = arr;
                    }
                    
                    console.log(arr1)
                    this.data1 = arr1;
                }
            })
        },
        show(data){
            console.log(data)
        },
        remove(data){

        },
        openModel(){
            this.propModel = true;
        },
        closeModel(){
            this.propModel = false;
        },
        setUserHandle(){
            console.log(this.menus)
        }
    }
}
</script>
<style scoped>
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
