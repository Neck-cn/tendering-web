<template>
  <el-container ref="homePage">
    <el-aside width="200px">
      <el-menu
        :default-active="active"
        style="height: 86vh"
        router>
        <div class="User">
          <el-image v-if="!isLogin"
                    style="width: 100px; height: 100px;border-radius: 50%"
                    :src="user.head"/>
          <el-image v-else
                    style="width: 100px; height: 100px;border-radius: 50%"
                    :src="user1.head"/>
          <div v-if="!isLogin"
               style="margin-top:5px;font-size: 14px;display: flex; justify-content:center;width: 100%">
            <router-link to="/My/Login">登录</router-link>
            <router-link to="/My/Register" style="padding-left: 10px">注册</router-link>
          </div>
          <span style="margin-top: 5px" v-else v-text="user.name"/>
        </div>
        <div v-if="isLogin">
          <el-menu-item index="/My/UserInfo">
            <i class="el-icon-menu"/>
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item index="/My/EditTenderings">
            <i class="el-icon-menu"/>
            <span slot="title">发布招标信息</span>
          </el-menu-item>
          <el-menu-item index="/My/MyTenderings">
            <i class="el-icon-menu"/>
            <span slot="title">查看我的招标信息</span>
          </el-menu-item>
          <el-menu-item index="/My/MyBids">
            <i class="el-icon-menu"/>
            <span slot="title">查看我的竞标信息</span>
          </el-menu-item>
          <el-menu-item @click="logout">
            <i class="el-icon-menu"/>
            <span slot="title">注销</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-aside>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
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
        active: "/My/UserInfo",
      }
    },
    methods: {
      logout() {
        this.$confirm('确定要注销?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          global.user=null;
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
    },
    created() {
      if (global.user != null) {
        this.user = global.user;
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
