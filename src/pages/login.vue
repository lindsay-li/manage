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
                    <input type="text" placeholder="請輸入驗證碼" v-model="code" @keyup.enter="toLogin">
                </div> 
                <div class="code_img" @click="getCode">
                    {{code_svg}}
                </div>
            </div>
            
            <!-- <div class="logoin">
                <span @click="login">登錄</span>
            </div> -->
            <div class="btns">
                <Button type="primary" :loading="loading" @click="toLogin" style="width:400px;margin:0 auto">
                    <span v-if="!loading">登錄</span>
                    <span v-else>登錄中</span>
                </Button>
            </div>
            
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
           code_svg:'',
           captchaId:'', //验证码ID
           loading:false
       }
   },
    created(){
        this.getCode();    
    },
    methods:{
        toLogin(){
            if(!this.account){
                this.$Modal.warning({
                    title: '警告',
                    content: '请输入账户名！'
                });
                return;
            }
            if(!this.pwd){
                this.$Modal.warning({
                    title: '警告',
                    content: '请输入密码！'
                });
                return;
            }
            if(!this.code){
                this.$Modal.warning({
                    title: '警告',
                    content: '请输入验证码！'
                });
                return;
            }
            if(!this.validateCode(this.code)){
                this.$Modal.warning({
                    title: '警告',
                    content: '验证码错误！'
                });
                this.getCode();
                return;
            }
            this.loading = true;
            var datas = {
                user_no:this.account,
                user_pwd:this.pwd  
            }
            // this.$http.post(`/api/op/in?service=zAdminUserService&method=login&data={"user_no":"${this.account}","user_pwd":"${this.pwd}"}`)
            this.$http('zAdminUserService','login',datas)
            .then((res)=>{
                this.loading = false;
                console.log(res);
                if(res.result=='success'){
                    sessionStorage.setItem('user_info',JSON.stringify(res.data));
                    this.$message.success('登录成功');
                    this.$router.push({path:'/cruxdata'});
                }else{
                    this.$Modal.error({
                        content: res.message
                    }); 
                }
            })
        },
        getCode(){//获取验证码
            // this.$http.post('/api',{api:'user',method:'getCaptcha'})
            // .then((res)=>{
            //     console.log(res);
            //     if(res.status=='success'){
            //         this.code_svg = res.result.captchaData;
            //         this.captchaId = res.result.captchaId;
            //     }else{
            //         this.$Modal.error({
            //             content: res.result.remarks
            //         }); 
            //     }
            // })
            var code = '';
            var codeLength = 6; //验证码的长度
            var codeChars = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
            'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的
            for (var i = 0; i < codeLength; i++) 
            {
                var charNum = Math.floor(Math.random() * 52);
                code += codeChars[charNum];
            }
            console.log(code)
            this.code_svg = code;
        },
        validateCode(code){
            console.log(code.toUpperCase())
            console.log(this.code_svg.toUpperCase())
             if (code.toUpperCase() == this.code_svg.toUpperCase()){
                return true;
            }else {
                return false;
            }        
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
    color: blue;
    letter-spacing: 3px;
    font-size: 20px;
    font-weight: bold;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
    background-color: #eee;
    border-radius: 4px;
}
.code input{
    width: 160px;
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
.btns{
    width: 100%;
    padding-bottom: 30px;
    display: flex;
    justify-content: center;
}
</style>
