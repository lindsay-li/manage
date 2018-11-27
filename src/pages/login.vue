<template>
<div class="wrapper">
    <div class="content">
        <div class="title">巴克斯运营管理平台</div>
        <div class="register">
            <div class="box">
                <Icon type="ios-contact" size='36'/><input type="text" placeholder="请输入登录名">    
            </div>   
            <div class="box">
                <Icon type="ios-lock" size='36'/><input type="password" placeholder="请输入密码">    
            </div>
            <div class="box box_code">
                <div class="code">
                    <input type="text" placeholder="请输入验证码">
                </div> 
                <div class="code_img">
                    <img src="../assets/u31.png" alt="">
                </div>
            </div>
            
            <div class="logoin">
                <span>登录</span>
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

       }
   },

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
