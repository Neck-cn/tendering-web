<template>
  <el-main style="height:90vh">
    <el-card v-loading="loading">
      <div>
        企业全称：<span v-text="user.name"/>
      </div>
      <div>
        地址：<span v-text="user.address"/>
      </div>
      <div>
        企业网址 ：
        <el-link :href="user.site_url">{{user.site_url}}</el-link>
      </div>
      <div>
        手机号：<span v-text="user.phone"/>
      </div>
      <div>
        邮箱：<span v-text="user.e_mail"/>
      </div>
      <div>
        企业经营许可证：
        <el-image
          fit="contain"
          :src="user.certificates"/>
      </div>
      <el-button type="primary" style="width: 100%;" round
                 @click="updateClick">修改信息
      </el-button>
    </el-card>
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="tempUser" ref="tempUser" :rules="Rules">
        <el-form-item label="企业全称" prop="name">
          <el-input v-model="tempUser.name"/>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="tempUser.address"/>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="tempUser.phone"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="e_mail">
          <el-input v-model="tempUser.e_mail"/>
        </el-form-item>
        <el-form-item label="企业网址" prop="site_url">
          <el-input v-model="tempUser.site_url"/>
        </el-form-item>
        <el-form-item type="password" label="密码" prop="password">
          <el-input v-model="tempUser.password"/>
        </el-form-item>
        <el-form-item type="password" label="确认密码" prop="cpassword">
          <el-input v-model="tempUser.cpassword"/>
        </el-form-item>
        <el-form-item label="企业经营许可证" prop="certificates">
          <el-upload
            class="avatar-uploader"
            :action="imgUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <el-image v-if="tempUser.certificates" :src="tempUser.certificates" class="avatar"/>
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
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
  import global from '../global/global';

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
        imgUpload: global.BASE_URL + "/upload",
        loading: false,
        dialogFormVisible: false,
        user: {
          id: "",
          password: "",
          name: "",//企业全称
          address: "",
          phone: "",
          certificates: "",
          site_url: "",
        },
        tempUser: {
          id: "",
          password: "",
          cpassword: "",
          name: "",//企业全称
          address: "",
          phone: "",
          certificates: "",
          e_mail: "",
          site_url: "",
        },
        Rules: {
          e_mail: [
            {required: true, message: "邮箱不能为空"},
            {type: "email", message: "邮箱格式不正确"}
          ],
          name: [{required: true, message: "企业名称不能为空"}],
          phone: [
            {required: true, message: "手机号不能为空"},
            {min: 11, message: "手机号不正确"},
            {max: 11, message: "手机号不正确"},
          ],
          address: [{required: true, message: "地址不能为空"}],
          site_url: [{required: true, message: "企业网址不能为空"}],
          certificates: [{required: true, message: "企业资质证书不能为空"}],
          password: [{min: 9, message: "密码长度必须大于等于九位"}],
          cpassword: [{validator: validatePass, trigger: 'blur'}]
        },
      }
    }, methods: {
      updateClick() {
        this.tempUser = Object.assign(this.tempUser, this.user);
        this.tempUser.password = this.tempUser.cpassword = "";
        this.dialogFormVisible = true;
      },
      updateInfo(tempUser) {
        this.$refs[tempUser].validate(async (valid) => {
          if (valid) {
            this.tempUser.id = this.user.id;
            let result = await reqModifyEnterprise(this.tempUser);
            if (result.code === 200) {
              this.$message({
                type: "success",
                message: "修改成功！",
              });
              this.user = this.tempUser;
              global.user=this.user;
              window.sessionStorage.setItem('user', JSON.stringify(this.user));
              this.dialogFormVisible = false;
            } else {
              this.$message.error("哎呀，出错啦！");
            }
          }
        });
      }, handleAvatarSuccess(res) {
        this.tempUser.certificates = res.data;
      }
    }, created() {
      this.user = global.user;
    }
  }
</script>

<style scoped>
  div {
    margin: 10px;
  }

  .el-image {
    height: 40vh;
  }
</style>
