<template>
<div class="wrapper" style="background-color: #141a48;margin: 0px;overflow: hidden;">
    <div id="canvascontainer" ref='can'></div>
    <div class="content">
        <div class="title">巴克斯運營管理平臺</div>
        <div class="register">
            <div class="box">
                <div class="icon">
                    <Icon type="ios-contact" size='24'/>
                </div>
                <input type="text" placeholder="請輸入登錄名" v-model="account">    
            </div>   
            <div class="box">
                <div  class="icon">
                    <Icon type="ios-lock" size='24'/>
                </div>
                <input type="password" placeholder="請輸入密碼" v-model="pwd">    
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
            <div class="btns llogin">
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
    mounted () {
        container = document.createElement( 'div' );
        this.$refs.can.appendChild( container );  

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 1000;

        scene = new THREE.Scene();

        particles = new Array();

        var PI2 = Math.PI * 2;
        var material = new THREE.ParticleCanvasMaterial( {

            color: 0x0078de,
            program: function ( context ) {

                context.beginPath();
                context.arc( 0, 0, 1, 0, PI2, true );
                context.fill();

            }

        } );

        var i = 0;

        for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

            for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

            particle = particles[ i ++ ] = new THREE.Particle( material );
            particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
            particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
            scene.add( particle );

            }

        }

        renderer = new THREE.CanvasRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        //

        window.addEventListener( 'resize', onWindowResize, false );

        animate();
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
                    this.$Message.success('登录成功');
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
var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;

var container;
var camera, scene, renderer;

var particles, particle, count = 0;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


// animate();

function init() {

  

}

function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function onDocumentMouseMove( event ) {

  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;

}

function onDocumentTouchStart( event ) {

  if ( event.touches.length === 1 ) {

    event.preventDefault();

    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;

  }

}

function onDocumentTouchMove( event ) {

  if ( event.touches.length === 1 ) {

    event.preventDefault();

    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;

  }

}

//

function animate() {

  requestAnimationFrame( animate );

  render();


}

function render() {

  camera.position.x += ( mouseX - camera.position.x ) * .05;
  camera.position.y += ( - mouseY - camera.position.y ) * .05;
  camera.lookAt( scene.position );

  var i = 0;

  for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

    for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

      particle = particles[ i++ ];
      particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) + ( Math.sin( ( iy + count ) * 0.5 ) * 50 );
      particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 2 + ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 2;

    }

  }

  renderer.render( scene, camera );

  count += 0.1;
}
</script>
<style scoped>
.wrapper{
    width: 100%;
    height: 100%;
    font-size: 18px; 
}
.content{
    width: 500px;
    position: absolute;
    top: 40%;
    left: 50%;
    margin-left:-250px;
    margin-top:-235px;
    background-color: rgba(0,0,0,0.1);
    box-shadow: 0 0 0 #141a48; 
}
.title{
    background-color: transparent;
    font-size: 36px;
    color: #eee;
    font-weight: bolder;
    text-align: center;
    padding-bottom: 40px;
}
.register{
    background-color: transparent;
    border-radius: 10px;
    overflow: hidden;
}
input{
    border: 0;
    outline: none;
    background-color: transparent;
}
input::-webkit-input-placeholder{
     color: #ccc;
}
.box{
    width: 400px;
    height:50px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: #EEEEEE; */
    margin: 40px auto 40px;
    border-radius: 4px;
}
.box  .icon{
    height: 100%;
    background-color: #EEEEEE;
    line-height: 50px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}
.box input{
    width: 379px;
    height: 50px;
    line-height: 50px;
    /* margin-left: 20px; */
    border: 1px solid #2D8CF0;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    box-sizing: border-box;
    border-left: none;
    color: #fff;
}

.box_code{
    background-color: transparent;
    justify-content: space-between;
}
.code{
   width: 160px;
   height: 50px;
   /* background-color: #E8EAEC; */
   /* border-radius: 10px;  */
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
    border:1px solid #2D8CF0;
    border-radius: 4px;
    color: #fff;
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
    background-color: #2D8CF0;
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
