<template>
  <el-main>
    <el-form :rules="Rules" ref="user" :model="user">
      <el-form-item label="用户名" prop="username">
        <el-input size="small" v-model="user.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input size="small" type="password" v-model="user.password"/>
      </el-form-item>

      <div style="display: flex;justify-content: space-around">
        <el-button type="primary" @click="login('user')">提交</el-button>
        <el-button native-type="reset" type="primary">重置</el-button>
      </div>
    </el-form>
  </el-main>
</template>

<script>
  import {reqPwdLogin} from "../api";
  import global from '../global/global';

  export default {
    name: "Login",
    data() {
      return {
        user: {
          username: "",
          password: "",
        },
        Rules: {
          username: [{required: true, message: "用户名不能为空"}],
          password: [{required: true, message: "密码不能为空"}, {min: 9, message: "密码长度必须大于等于九位"}],
        },
      }
    }, methods: {
       login(user) {
        this.$refs[user].validate(async(valid) => {
          if (valid) {
            let time = new Date().getTime();
            // console.log(time);
            const fun_aes = require("../api/aes.js");
            let srcs = fun_aes.CryptoJS.enc.Utf8.parse(this.user.password);
            const key = fun_aes.CryptoJS.enc.Utf8.parse(require("../api/md5.js").hex_md5(time.toString()));
            const encrypted = fun_aes.CryptoJS.AES.encrypt(srcs, key, {
              mode: fun_aes.CryptoJS.mode.ECB,
              padding: fun_aes.CryptoJS.pad.Pkcs7
            });
            let password = require("../api/base64.js").Base64.encode(encrypted.toString());
            let result=await reqPwdLogin(this.user.username,password,time);
            if(result.code===200){
              if(result.data ==null){
                this.$message.error("用户名或密码错误！");
                this.$router.push("/My/Login");
              }else{
                this.$cookies.set("username", this.user.username, 60 * 60);
                this.$cookies.set("password", this.user.password, 60 * 60);
                this.$message({
                  message:"登录成功！",
                  type:"success"
                });
                global.token = result.data.token;
                global.user = result.data.enterprise;
                this.$router.push("/black");
              }
            }else{
              this.$message.error("哎呀，出错了！");
            }

          }
        });
      },
    }, created() {
    }
  }
//   :style="{backgroundImage: 'url(' + url + ')',backgroundRepeat:'no-repeat',backgroundSize:'100%'}"
</script>

<style scoped>

</style>
