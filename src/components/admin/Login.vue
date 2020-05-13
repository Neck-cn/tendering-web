<template>
  <div id="particles-js">
    <div class="login">
      <div class="login-top">
        管理用户登录
      </div>
      <div class="login-center clearfix">
        <div class="login-center-img"><img src="../../assets/images/admin/name.png"/></div>
        <div class="login-center-input">
          <input type="text" name="" v-model="user.username" placeholder="username" onfocus="this.placeholder=''"
                 onblur="this.placeholder='username'"/>
          <div class="login-center-input-text">username</div>
        </div>
      </div>
      <div class="login-center clearfix">
        <div class="login-center-img"><img src="../../assets/images/admin/password.png"/></div>
        <div class="login-center-input">
          <input type="password" name="" v-model="user.password" placeholder="password" onfocus="this.placeholder=''"
                 onblur="this.placeholder='password'"/>
          <div class="login-center-input-text">password</div>
        </div>
      </div>
      <div class="login-button" @click="login">
        登录
      </div>
    </div>
    <div class="sk-rotating-plane"></div>
  </div>
</template>

<script>
  import {adminPwdLogin} from "../../api";
  import global from '../../global/global';

  export default {
    data() {
      return {
        user: {
          password: "",
          username: ""
        }
      }
    },
    methods: {
      async login() {
        let time = new Date().getTime();
        // console.log(time);
        const fun_aes = require("../../api/aes.js");
        let srcs = fun_aes.CryptoJS.enc.Utf8.parse(this.user.password);
        const key = fun_aes.CryptoJS.enc.Utf8.parse(require("../../api/md5.js").hex_md5(time.toString()));
        const encrypted = fun_aes.CryptoJS.AES.encrypt(srcs, key, {
          mode: fun_aes.CryptoJS.mode.ECB,
          padding: fun_aes.CryptoJS.pad.Pkcs7
        });
        let password = require("../../api/base64.js").Base64.encode(encrypted.toString());
        let result = await adminPwdLogin(this.user.username, password, time);
        if (result.code === 200) {
          if (result.data == null) {
            this.$message.error("用户名或密码错误！");
            this.$router.push("/admin/Login");
          } else {
            this.$cookies.set("username", this.user.username, 60 * 60);
            this.$cookies.set("password", this.user.password, 60 * 60);
            this.$message({
              message: "登录成功！",
              type: "success"
            });
            window.sessionStorage.setItem('token', result.data.token)
            global.token = result.data.token;
            global.user = result.data.enterprise;
            this.$router.push("/admin/admin");
          }
        } else {
          this.$message.error("哎呀，出错了！");
        }
      },
      admin() {
        this.$parent.header(false)
      },
    },
    created() {
      this.admin()
    }
  }
</script>

<style scoped>
  @import '../../assets/css/reset.css';
  @import '../../assets/css/style.css';

  #particles-js {
    display: flex;
    align-items: center;
  }
</style>
