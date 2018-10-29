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
a{
  color: #17233d;
  font-weight: bold;
}
a:hover{
  color: #17233d;
  font-weight: bold;
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
</style>
