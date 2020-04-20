<template>
  <el-container id="app" style="height: 96px">
    <el-header style="padding: 0">
      <el-menu
        text-color="#87CEFA"
        active-text-color="#1989fa"
        style="display: flex;justify-content: flex-end;width: 100%"
        router
        default-active="news"
        mode="horizontal">
        <div
          :style="{backgroundImage: 'url(' + url + ')',backgroundRepeat:'no-repeat',backgroundSize:'100%',width:'94%'}"/>

        <el-menu-item index="/Tenderings" key="招标信息">
          <span slot="title">招标信息</span>
        </el-menu-item>
        <el-menu-item index="/My" key="我的">
          <span slot="title">我的</span>
        </el-menu-item>
      </el-menu>
    </el-header>

  </el-container>
</template>
<script>

    export default {

        data() {
            return {

                url: require('../assets/title.png')
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
        },
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
