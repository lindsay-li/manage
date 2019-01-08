<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{

    }
  },
  created(){
    // this.$router.push({path:'/login'})
  },
  methods:{

  }
}
</script>

<style>
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color:#17233d;
  font-size: 16px;
  height: 100vh;
}
*{
 list-style: none;
}
a{
  color: #fff;
  /* font-weight: bold; */
}
a:hover{
  color: #fff;
  font-weight: bold;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
box-shadow:0 0 0 60px transparent inset;
-webkit-text-fill-color: transparent;
}
.ivu-dropdown-menu {
    min-width: 90px;
}
.ivu-select-dropdown{
  /* background-color: #08A2BA; */
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title {
    color: #fff;
    font-size: 16px;
}
.ivu-menu-dark {
    background: #283440;
}
.ivu-table-wrapper{
  width: 100%;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover{
  background-color: #009688 !important;
}
.ivu-checkbox-checked .ivu-checkbox-inner{
  border-color: #009688;
  background-color: #009688;
}
.ivu-page-item-active{
  border-color: #009688;
}
.ivu-page-item-active a, .ivu-page-item-active:hover a{
  color: #009688;
}
.ivu-btn-primary{
  background-color: #009688;
  border-color: #009688;
}
.ivu-btn-primary:hover{
  background-color: #009688;
  border-color: #009688;
}
.options .ivu-select{
  width: auto;
}
.btns .ivu-btn{
  height: 50px;
  line-height: 50px;
  padding: 0;
  font-size: 16px;
}
.btns .ivu-btn>.ivu-icon{
  line-height: 1;
}
/*临时数据*/
.ivu-table .demo-table-info-row td{
    background-color: #fff;
    color: #515a6e;
    font-weight: bold;
    
}
td .ivu-table-cell,
.ivu-table-header th  {
  text-align: center;
  font-size: 14px;
}
/*posts*/
/* .post .ivu-table-header th{
  background-color: #009688;
  color: #fff;
} */
/* .post th.ivu-table-column-center{
  background-color: #fff;
} */
/*公共样式*/
.nav{
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}
.option{
    font-weight: bold;
    margin:0 20px;
}
.serch{
    width: 80px;
    height: 36px;
    background-color: #009688;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    line-height: 36px;
    margin-left: 60px;
    cursor: pointer;
}
.page{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 20px;
}
.delete,.add_goods{
    width: 180px;
    height: 36px;
    color: #fff;
    line-height: 36px;
    text-align: center;
    border-radius: 4px;
    background-color: #009688;
    cursor: pointer;
}
._btn{
    display: flex;
}
._btn .b_delete,
._btn .send{
    width: 160px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    cursor:pointer;
    border-radius: 6px;
    background-color: #009688;
    color:#fff;
}
._btn .b_delete{
  background-color: #ED4014;
  margin-left: 20px;
}

.prop_model{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    animation:zoomIn 0.3s ease-out;
}
@keyframes zoomIn{0%{opacity:0;}50%{opacity:1}}
.sure,
.cancel{
  text-align: center;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}
.sure{
  background-color: #009688;
}
.cancel{
  background-color: #ED4014;
}
.title{
    width: 100%;
    height: 50px;
    background-color: #009688;
    border-radius: 4px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    line-height: 50px;
    margin-bottom: 30px;
}

</style>
