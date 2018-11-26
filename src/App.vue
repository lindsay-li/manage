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
  color: #17233d;
  font-weight: bold;
}
a:hover{
  color: #17233d;
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
  background-color: #08A2BA;
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
/*临时数据*/
.ivu-table .demo-table-info-row td{
    background-color: #fff;
    color: #515a6e;
    font-weight: bold;
    
}
td .ivu-table-cell,
.ivu-table-header th  {
  text-align: center;
  font-size: 16px;
}
/*posts*/
.post .ivu-table-header th{
  background-color: #2d8cf0;
  color: #fff;
}
.post th.ivu-table-column-center{
  background-color: #fff;
}
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
.option input{
    outline: none;
    border:1px solid #A9A9A9; 
    background-color: #fff;
    width: 150px;
    height: 36px;
    border-radius: 4px;
}
.serch{
    width: 80px;
    height: 36px;
    background-color: #2d8cf0;
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
    margin-top: 20px;
}
.delet,.add_goods{
    width: 180px;
    height: 36px;
    color: #fff;
    line-height: 36px;
    text-align: center;
    border-radius: 4px;
    background-color: #2d8cf0;
    cursor: pointer;
}
</style>
