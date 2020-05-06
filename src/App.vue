<template>
  <div id="app">
    <app-header v-if="header_show"/>
    <router-view v-if="isRouterAlive"/>
  </div>
</template>
<script>
    import Header from './components/Header'
    import global from "./global/global";
  export default {
    name: 'App',
      components: {
          'app-header':Header,
      },
    data() {
      return {
          header_show:true,
        isRouterAlive: true,
      //  url: require('./assets/title.png')
      }
    },
      methods:{
          //是否显示头部
          header:function (bool) {
              this.header_show = bool;
          }
      },
    created() {
      global.user = JSON.parse(window.sessionStorage.getItem('user'));
    }
  }
</script>

<style>
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .is-horizontal {
    display: none;
  }

  #app {
    max-width: 1200px;
    min-width: 1100px;
    margin: 0 auto;
    background-color: white;
    height: 100vh;
  }

  a {
    display: block;
    text-decoration: none;
    color: black;
  }

  body {
    padding: 0;
  }
</style>
