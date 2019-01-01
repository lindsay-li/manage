<template>
<div class="wrappar">
    <div class="nav">
        <div class="option">
            <span>用户名：</span>
            <input type="text" v-model="inputValue.user">
        </div>
        <div class="option">
            <span>手机号：</span>
            <input type="text" name="phone"v-model="inputValue.phone">
        </div>
        <div class="option">
            <span>创建时间：</span>
            <!-- <input type="text" name="time"v-model="inputValue.time"> -->
            <Date-picker type="date" placeholder="选择日期" style="width: 150px" @on-change="timeChange" ></Date-picker>
        </div>
        <div class="option">
            <span>城市：</span>
            <input type="text" name="city"v-model="inputValue.city">
        </div>
        <div class="serch" @click="searchList">查詢</div>
    </div>
    <div class="activity">
        <Table border  :columns="columns1" :data="data1"  class="post"></Table>
    </div>
    <div class="page">
        <div class="btns">
            <div class="send" @click="openModel">添加账户</div>
            <div class="b_delete" >删除账号</div>
        </div>
        <Page :total="100" show-total show-elevator prev-text='上一頁' next-text='下一頁'/>
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
                                <Input v-model="a_types"  placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">密码:</td>
                            <td>
                                <Input v-model="a_types"  placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                        <tr>
                            <td style="text-align:right">确认密码:</td>
                            <td>
                                <Input v-model="a_types"  placeholder="點擊輸入" style="width: 300px" />
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="btns">
                    <div class="cancel" @click='closeModel'>取消</div>
                    <div class="sure">確定</div>
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
            inputValue:{
                user:'',
                phone:'',
                time:'',
                city:''
            },
            columns1: [
                {
                    type:'selection',
                    align:'center',
                    width:60
                },
                {
                    title: '会员編號',
                    key: 'order1',
                    minWidth:105
                },
                {
                    title: '用户姓名',
                    key: 'order2',
                    minWidth:120
                },
                {
                    title: '性别',
                    key: 'order3',
                    minWidth:85
                },
                {
                    title: '生日',
                    key: 'order4',
                    minWidth:160
                },
                {
                    title: '手机号码',
                    key: 'order5',
                    minWidth:160
                },
                {
                    title: '电子邮件',
                    key: 'order6',
                    minWidth:165
                },
                {
                    title: '城市',
                    key: 'order7',
                    minWidth:160
                },
                {
                    title: '地址',
                    key: 'order8',
                    minWidth:160
                },
                {
                    title: '创建时间',
                    key: 'order9',
                    minWidth:160
                },
                {
                    title: '登入IP',
                    key: 'order10',
                    minWidth:140
                },
                {
                    title: '登入次数',
                    key: 'order11',
                    minWidth:105
                },
                {
                    title: '最后登入时间',
                    key: 'order12',
                    minWidth:160
                },
                {
                    title: '粉丝数',
                    key: 'order13',
                    minWidth:95
                },
                {
                    title: '追踪数',
                    key: 'order14',
                    minWidth:95
                },
                {
                    title: '点赞次数',
                    key: 'order15',
                    minWidth:105
                },
                {
                    title: '我的收藏',
                    key: 'order16',
                    minWidth:160
                },
                {
                    title:'編輯',
                    key:'order17',
                    minWidth:135,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.index)
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            data1: [
                {
                    order1: '200元',
                    order2: '2019.05.18-2019.05.21',
                    order3: '20%',
                    order4:'所有',
                    order5:'充值送券',
                    order6:'充值10000送200'
                }
            ],
            a_types:'',
            single:false,
            propModel:false,
            zhekList:[
                {
                    value:'50元',
                    label:'50元'
                },
                {
                    value:'100元',
                    label:'100元'
                },
                {
                    value:'250元',
                    label:'250元'
                }
            ]
        }
    },
    created(){
        this.getList();
    },

    methods:{
        searchList(){
            var data = {
                service:'zAdminUserService',
                method:'findDatas',
                data:JSON.stringify({
                    username:this.inputValue.user,
                    tel:this.inputValue.phone,
                    create_time:this.inputValue.time,
                    city:this.inputValue.city
                }) 
            }
            this.$http.post('/api/op/in',this.$qs.stringify(data))
            .then((res)=>{
                console.log('res',res)
            })
        },
        getList(){
            var data = {
                service:'zAdminUserService',
                method:'findDatas',
                data:JSON.stringify({
                    start:0,
                    rows:20
                })
            }
            this.$http.post('/api/op/in',this.$qs.stringify(data))
            .then((res)=>{
                if(res.rows){
                    var arr = [];
                    for(let i=0;i<res.rows.length;i++){
                        var obj = {};
                        obj.order1 = res.rows[i].id;
                        obj.order2 = res.rows[i].username;
                        var sexs = "";
                        if(res.rows[i].sex==1){
                            sexs = '男';
                        }else if(res.rows[i].sex ==2){
                            sexs = '女';
                        }else{
                            sexs ='未知';
                        }
                        obj.order3 = sexs;
                        obj.order4 = res.rows[i].birth;
                        obj.order5 = res.rows[i].tel;
                        obj.order6 = res.rows[i].email;
                        obj.order7 = res.rows[i].city;
                        obj.order8 = res.rows[i].addr;
                        obj.order9 = this.changeTime(res.rows[i].create_time);
                        // obj.order10 = res.rows[i] 登入ip
                        // obj.order11= res.rows[i] 登入次数
                        // obj.order12 = res.rows[i] 最后登入时间
                        // obj.order13 = res.rows[i] 粉丝数
                        // obj.order14 = res.rows[i] 追踪数
                        // obj.order15 = res.rows[i] 点赞次数
                        // obj.order16 = res.rows[i] 我的收藏
                        arr.push(obj);
                    }
                    this.data1 = arr;
                }
            })
        },
        changeTime(time){
            var date = new Date(time);
            var Y = date.getFullYear();
            var M = date.getMonth() + 1;
            var D = date.getDate();
            var h = date.getHours() >10?date.getHours():'0'+date.getHours();
            var m = date.getMinutes() >10?date.getMinutes():'0' + date.getMinutes();
            return `${Y}-${M}-${D} ${h}:${m}`;
        },
        openModel(){
            this.propModel = true;
        },
        closeModel(){
            this.propModel = false;
        },
        show (index) {
            this.$Modal.info({
                title: 'User Info',
                
            })
        },
        remove (index) {
            
        },
        timeChange(time){
            console.log(time)
            this.inputValue.time = time;
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
