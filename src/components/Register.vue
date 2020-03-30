<template>
  <el-main>
    <el-scrollbar style="height: 100%">
      <el-form :rules="Rules" ref="user" :model="user">
        <el-form-item label="用户名" prop="username">
          <el-input size="small" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input size="small" type="password" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="cpassword">
          <el-input size="small" type="password" v-model="user.cpassword"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input size="small" v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="企业地址" prop="address">
          <el-input size="small" v-model="user.address"></el-input>
        </el-form-item>
        <el-form-item label="企业经营许可证" prop="certificates">
          <el-upload
            class="avatar-uploader"
            :action="imgUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <el-image v-if="user.certificates" :src="user.certificates" class="avatar"/>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="手机号" prop="phone" >
          <el-input type="tel" maxlength="11" placeholder="手机号" v-model="user.phone"/>

          <button :disabled="!rightPhone" class="get_verification" :class="{right_phone:rightPhone}" @click.prevent="getCode">
            {{computedTime>0 ? `已发送(${computedTime}s)` :'获取验证码'}}</button>
        </el-form-item>



        <el-form-item label="验证码" prop="code">
          <el-input type="tel" maxlength="8" placeholder="验证码" v-model="user.code"/>

        </el-form-item>
        <div style="display: flex;justify-content: space-around">
          <el-button type="primary" @click="register('user')">提交</el-button>
          <el-button native-type="reset" type="primary">重置</el-button>
        </div>
      </el-form>
    </el-scrollbar>
  </el-main>
</template>
<script>
  import {reqRegister, reqSendCode} from "../api";

  export default {
    name: "Register",
    data() {
      let validatePass = (rule, value, callback) => {
        if (value !== this.user.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        imgUpload: this.Variable.baseURL + "/upload",


        computedTime:0,
        user: {
          username: "",
          phone:"",
          address: "",
          password: "",
          certificates: "",
          name: "",
          cpassword: "",
          code: ""
        },
        Rules: {
          username: [{required: true, message: "用户名不能为空"}],
          name: [{required: true, message: "企业名称不能为空"}],
          certificates: [{required: true, message: "企业经营许可证不能为空"}],
          password: [{required: true, message: "密码不能为空"}, {min: 9, message: "密码长度必须大于等于九位"}],
          code: [{required: true, message: "验证码不能为空"}],
          cpassword: [{required: true, message: "确认密码不能为空"},
            {validator: validatePass, trigger: 'blur'}],
          address: [{required: true, message: "企业地址不能为空"}],
          phone: [{required: true, message: "手机号不能为空"}],
        }
      }
    },
    computed:{
      rightPhone(){
        return /^1\d{10}$/.test(this.user.phone) ;
      }
    },
    methods: {
      async getCode(){
        //获取倒计时
        if(!this.computedTime)
        {
          this.computedTime=30;
          this.intervalid=setInterval(()=>{

            this.computedTime--;
            if(this.computedTime<=0){
              //停止计数
              clearInterval(this.intervalid);
            }
          },1000)
          //发送ajax请求，获得对应手机号的短信验证码
          const result=await reqSendCode(this.user.phone);
          if(result.code===200){
            //显示提示
            this.showAlert(result.msg)
            //停止倒计时
            if(this.computedTime){
              this.computedTime=0
              clearInterval(this.intervalid);
              this.intervalid=undefined
            }
          }
        }
      },
      handleAvatarSuccess(res) {
        this.user.certificates = res.data;
      },  register(user) {
        this.$refs[user].validate(async (valid) => {
          if (valid) {
            let result=await reqRegister( this.user.username,this.user.password,this.user.phone,this.user.name,
              this.user.address,this.user.certificates,this.user.code);
            if(result.code===200){

              this.$message({
                message:"注册成功！",
                type:"success"
              });
              this.$router.replace("/My/Login");
            }else{

              this.$message.error("哎呀，出错啦！");
            }


          }
        });
      },
    }, created() {

    }
  }
</script>

<style scoped>
  .avatar-uploader{
    width: 80px;
    height: 80px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }

  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
  .get_verification{
    position:absolute;
    top:75%;
    right :10px;
    transform :translateY(-50%);
    border: 0;
    color :#ccc;
    font-size :14px;
    background :transparent;
  }
    .right_phone{
      color :black;
    }





</style>
