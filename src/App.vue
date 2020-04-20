<template>
  <div id="app">
    <app-header v-if="header_show"></app-header>
    <router-view v-if="isRouterAlive"/>
  </div>
</template>
<script>
    import Header from './components/Header'
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

      // if (this.$cookies.isKey("username") && this.$cookies.isKey("password")) {
      //   this.isRouterAlive = false;
      //   let data = this.$qs.stringify({
      //     username: this.$cookies.get("username"),
      //     password: this.$cookies.get("password")
      //   });
      //   this.$http.post(this.Variable.baseURL + "user/login", data, {
      //     headers: {
      //       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      //     },
      //     withCredentials: true
      //   }).then(function (res) {
      //     if (res.body.flag) {
      //       this.Variable.user = res.data.data;
      //       this.$cookies.set("username", res.data.data.username, 60 * 60);
      //       this.$cookies.set("password", res.data.data.password, 60 * 60);
      //     } else {
      //       this.$message.error(res.data.errorMsg);
      //     }
      //     this.isRouterAlive = true;
      //   }).catch(() => {
      //     this.isRouterAlive = true;
      //   });
      // }
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
