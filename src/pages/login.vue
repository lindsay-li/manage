<template>
<div class="wrapper">
    <div class="content">
        <div class="title">巴克斯運營管理平臺</div>
        <div class="register">
            <div class="box">
                <Icon type="ios-contact" size='36'/><input type="text" placeholder="請輸入登錄名" v-model="account">    
            </div>   
            <div class="box">
                <Icon type="ios-lock" size='36'/><input type="password" placeholder="請輸入密碼" v-model="pwd">    
            </div>
            <div class="box box_code">
                <div class="code">
                    <input type="text" placeholder="請輸入驗證碼" v-model="code">
                </div> 
                <div class="code_img">
                    <img src="../assets/u31.png" alt="">
                </div>
            </div>
            
            <!-- <div class="logoin">
                <span @click="login">登錄</span>
            </div> -->
            <Button type="primary" :loading="loading" @click="toLogin" style="width:400px;margin:0 auto">
                <span v-if="!loading">登錄</span>
                <span v-else>登錄中</span>
            </Button>
        </div>    
    </div>    
</div>    
</template>
<script>
export default {
   name:'login',
   data(){
       return{
           account:'',
           pwd:'',
           code:'',
           loading:false
       }
   },
    created(){
            
    },
    methods:{
        toLogin(){
            if(this.account != '' && this.pwd != ''){
                this.loading = true;
                this.$http.post('http://www.bakesi.com/login',{account:this.account,password:this.pwd})
                .then((res)=>{
                    this.loading = false;
                    var data = JSON.parse(res.data);
                    if(data.code==0){
                        sessionStorage.setItem('user_info',JSON.stringify(data.data));
                        this.$router.push({path:'/'})
                    }else{
                       this.$Modal.error({
                            title: '错误',
                            content: '错误的账户名或密码',
                        }); 
                    }
                })
            }else{
                this.$Modal.warning({
                        title: '警告',
                        content: '请输入账户名或密码！'
                    });
                this.loading = false;
            }
            var postdata = qs.stringify({
                grade:encodeURI("小学2015级"),
                school: encodeURI("上海市控江二村小学")
            });
        }
        
    }
}
</script>
<style scoped>
.wrapper{
    background-color: #009688;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 18px; 
}
.content{
    width: 500px;
}
.title{
    font-size: 36px;
    color: #fff;
    font-weight: bolder;
    text-align: center;
    padding-bottom: 40px;
}
.register{
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
}
input{
    border: 0;
    outline: none;
    background-color: transparent;
}
input::-webkit-input-placeholder{
     color: #7C7C7A;
}
.box{
    width: 400px;
    height:50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #E8EAEC;
    margin: 40px auto 40px;
    border-radius: 10px;
}
.box input{
    width: 320px;
    height: 48px;
    margin-left: 20px;
}

.box_code{
    background-color: transparent;
    justify-content: space-between;
}
.code{
   width: 210px;
   height: 50px;
   background-color: #E8EAEC;
   border-radius: 10px; 
}
.code_img{
    width:135px;
    height: 50px;
    cursor: pointer;
}
img{
    width: 100%;
    height: 100%;
}
.logoin{
    width: 400px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    background-color: #009688;
    border-radius: 10px;
    margin: 0 auto 30px;
    cursor: pointer;
}
</style>
