<template>
  <el-main>
    <el-card v-loading="loading">
      <div>
        用户名：<span v-text="user.username"></span>
      </div>
      <div>
        企业全称：<span v-text="user.name"></span>
      </div>
      <div>
        地址：<span v-text="user.address"></span>
      </div>
      <div>
        手机号：<span v-text="user.phone"></span>
      </div>
      <div>
        企业经营许可证：<el-image style="width: 100px; height: 100px"
        :src="user.certificates"></el-image>
      </div>
      <el-button type="primary" style="width: 100%;margin-top: 18px" round
                 @click="updateClick">修改信息
      </el-button>
    </el-card>
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="tempUser" ref="tempUser" :rules="Rules">

        <el-form-item label="企业全称" prop="name">
          <el-input v-model="tempUser.name"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="tempUser.address"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
        <el-input v-model="tempUser.phone"></el-input>
      </el-form-item>
        <el-form-item label="企业经营许可证" prop="certificates">
          <el-upload
            class="avatar-uploader"
            :action="imgUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <el-image v-if="tempUser.certificates" :src="tempUser.certificates" class="avatar"/>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateInfo('tempUser')">确 定</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>

  import {reqModifyEnterprise} from "../api";

  export default {
    name: "UserInfo",
    data() {
      let validatePass = (rule, value, callback) => {
        if (this.tempUser.password !== "") {
          if (value !== this.tempUser.password) {
            callback(new Error('两次输入密码不一致!'));
          } else callback();
        } else {
          callback();
        }
      };
      return {
        imgUpload: this.Variable.baseURL + "/upload",
        loading: false,
        dialogFormVisible: false,
        user: {
          id:"",
          username: "",
          password: "",
          name: "",//企业全称
          address: "",
          phone: "",

          certificates: "",

        },
        tempUser: {
          id:"",
          username: "",
          password: "",
          name: "",//企业全称
          address: "",
          phone: "",

          certificates: "",
        },
        Rules: {
          email: [
            {required: true, message: "邮箱不能为空"},
            {type: "email", message: "邮箱格式不正确"}
          ],
          name: [{required: true, message: "昵称不能为空"}],
          head: [{required: true, message: "头像不能为空"}],
          password: [{min: 9, message: "密码长度必须大于等于九位"}],
          cpassword: [{validator: validatePass, trigger: 'blur'}]
        },
        url: this.Variable.baseURL + "upload/img",
      }
    }, methods: {
      updateClick() {
        this.tempUser = Object.assign(this.tempUser, this.user);
        this.tempUser.password = this.tempUser.cpassword = "";
        this.dialogFormVisible = true;
      },
      updateInfo(tempUser) {
        this.$refs[tempUser].validate(async(valid) => {
          if (valid) {
            this.tempUser.id=this.user.id;
            let result= await reqModifyEnterprise(this.tempUser.id,this.tempUser.name,this.tempUser.address,this.tempUser.phone,this.tempUser.certificates);
            if(result.code===200){
              this.$message({
                type: "success",
                message: "修改成功！",
              });
              this.user = this.tempUser;
              this.dialogFormVisible = false;

            }else{

              this.$message.error("哎呀，出错啦！");
            }

          }
        });
      }, handleAvatarSuccess(res) {
        this.tempUser.head = res.url;
      }
    }, created() {
      this.user = this.Variable.user;
    }
  }
</script>

<style scoped>
  div {
    margin: 10px;
  }

  .el-image {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
</style>
