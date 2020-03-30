<template>
  <el-container ref="homePage">
    <el-aside width="200px">
      <el-menu
        :default-active="active"
        :style="menu"
        router>
        <div class="User">
          <el-image v-if="!isLogin"
            style="width: 100px; height: 100px;border-radius: 50%"
            :src="user.head"></el-image>
          <el-image v-else
                    style="width: 100px; height: 100px;border-radius: 50%"
                    :src="user1.head"></el-image>
          <div v-if="!isLogin"
               style="margin-top:5px;font-size: 14px;display: flex; justify-content:center;width: 100%">
            <router-link to="/My/Login">登录</router-link>
            <router-link to="/My/Register" style="padding-left: 10px">注册</router-link>
          </div>
          <span style="margin-top: 5px" v-else v-text="user.name"></span>
        </div>
        <div v-if="isLogin">
          <el-menu-item index="/My/UserInfo">
            <i class="el-icon-menu"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item  index="/My/EditTenderings">
            <i class="el-icon-menu"></i>
            <span slot="title">发布招标信息</span>
          </el-menu-item>
          <el-menu-item  index="/My/MyTenderings">
            <i class="el-icon-menu"></i>
            <span slot="title">查看我的招标信息</span>
          </el-menu-item>
          <el-menu-item  index="/My/MyBids">
            <i class="el-icon-menu"></i>
            <span slot="title">查看我的竞标信息</span>
          </el-menu-item>
          <el-menu-item @click="logout">
            <i class="el-icon-menu"></i>
            <span slot="title">注销</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-aside>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </el-container>
</template>

<script>
  export default {
    name: "my",
    data() {
      return {
        user: {
          head: require('../assets/unLogin.png')
        }, user1: {
          head: require('../assets/loginback.jpg')
        },
        isLogin: false,
        clientHeight: '',
        menu: "",
        active: "/My/UserInfo",
        newsOk: {},
        username:'',
        password:'',
      }
    },
    methods: {
      logout() {
        this.$confirm('确定要注销?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.Variable.user = null;
            this.$cookies.remove("username");
            this.$cookies.remove("password");
            this.$message({
              type: 'success',
              message: '注销成功!'
            });
            this.$router.replace("/black");

        })
      },
      headerSelect(key) {
        this.isNews = key === 'news';
      },
      changeFixed(clientHeight) { //动态修改样式
        this.$refs.homePage.$el.style.height = clientHeight - 80 + 'px';
        let padding = 0;
        if (this.isLogin) {
          if (this.Variable.user.category) {
            padding = clientHeight - 550;
          } else {
            padding = clientHeight - 430;
          }
        } else {
          padding = clientHeight - 260;
        }
        if (padding < 0)
          padding = 0;
        this.menu = "margin-top:1px;padding-bottom:" + padding + "px";
      }
    },
    mounted() {

      if (this.isLogin)
        this.$router.replace("/My/UserInfo");
      else
        this.$router.replace("/My/Register");
      // 获取浏览器可视区域高度
      this.clientHeight = `${document.documentElement.clientHeight}`;
      const that = this;
      window.onresize = function temp() {
        that.clientHeight = `${document.documentElement.clientHeight}`;
      };
    },
    watch: {
      // 如果 `clientHeight` 发生改变，这个函数就会运行
      clientHeight: function () {
        this.changeFixed(this.clientHeight)
      },
      newsOk: {
        handler(val) {
          if (val.ok === true) {
            this.active = "/My/MyNews?my=1";
            this.Variable.ok.ok = false;
          }
        },
        deep: true
      }
    },
    created() {

      if (this.Variable.user != null) {
        this.user = this.Variable.user;
        this.isLogin = true;
      }
    }
  }
</script>

<style scoped>
  .User {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
