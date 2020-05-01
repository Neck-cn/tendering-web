<template>
  <el-container>
    <el-header class="header_head" height="100px">
      <div class="nav_layout">
        <img class="logo" src="" width="60px" height="60px" style="cursor: pointer" alt/>
        <div class="nav_layout_right">
          <div class="nav_item">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    <img class="head_frame" src="../../assets/images/admin/admin.png"/>
                </span>
              <el-dropdown-menu style="background-color: #0B152E" slot="dropdown">
                <el-dropdown-item>
                  <span class="nav_dropdown_font" @click="dialogFormVisible=true">修改密码</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <a href="#">
                    <span class="nav_dropdown_font" @click="quit">退出登陆</span>
                  </a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>

    </el-header>
    <el-main style="padding: 0">
      <div class="admin-main">
        <div style="padding-top: 10px;padding-left: 10px">
          <el-button type="primary" @click="go_bid">竞标管理</el-button>
          <el-button type="primary" @click="go_tender">招标管理</el-button>
          <el-button type="primary" @click="go_report">举报信息</el-button>
          <el-button type="primary" @click="go_enter">企业管理</el-button>
        </div>
        <div style="display: flex;justify-content: center;align-items: center;height: 70vh">
          <div style="color:white;font-size: 60px;">欢迎访问</div>
        </div>
      </div>
      <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
        <el-form :model="admin" ref="admin" :rules="Rules">
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="admin.password"/>
          </el-form-item>
          <el-form-item label="确认密码" prop="cpassword">
            <el-input type="password" v-model="admin.cpassword"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateInfo('admin')">确 定</el-button>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script>

  import {adminChangePass} from "../../api";

  export default {
    data() {
      let validatePass = (rule, value, callback) => {
        if (this.admin.password !== "") {
          if (value !== this.admin.password) {
            callback(new Error('两次输入密码不一致!'));
          } else callback();
        } else {
          callback();
        }
      };
      return {
        dialogFormVisible: false,
        admin: {
          password: "",
          cpassword: ""
        },
        Rules: {
          password: [{min: 9, message: "密码长度必须大于等于九位"}],
          cpassword: [{validator: validatePass, trigger: 'blur'}]
        },
      }
    },
    methods: {
      admin() {
        this.$parent.header(false)
      },
      updateInfo(admin) {
        this.$refs[admin].validate(async (valid) => {
          if (valid) {
            this.admin.username = "admin";
            let result = await adminChangePass(this.admin);
            if (result.code === 200) {
              this.$message({
                type: "success",
                message: "修改成功！",
              });
              this.dialogFormVisible = false;
            } else {
              this.$message.error("哎呀，出错啦！");
            }
          }
        });
      },
      go_report() {
        this.$router.push({
          path: '/admin/Report'
        })
      },
      go_enter() {
        this.$router.push({
          path: '/admin/enter'
        })
      },
      go_tender() {
        this.$router.push({
          path: '/admin/tender'
        })
      },
      go_bid() {
        this.$router.push({
          path: '/admin/bid'
        })
      },
      quit() {
        window.sessionStorage.clear();
        this.$router.push({
          path: '/admin/login'
        })
      }
    },
    created() {
      this.admin()
    }
  }
</script>
<style type="text/css">
  .label_text {
    font-family: PingFangSC-Medium;
    font-size: 15px;
    color: #16161D;
    letter-spacing: 0;
    font-weight: bolder;
  }

  .tooltipStyle {
    background: #E84948;
    height: 36px;
    min-width: 100px;
    vertical-align: center;

    color: white;
    cursor: pointer;
  }

  /*.el-popper[x-placement^=bottom] .popper__arrow{*/
  /*  border-bottom-color:#E84948;*/
  /*}*/
  /*.el-popper[x-placement^=bottom] .popper__arrow::after{*/
  /*  border-bottom-color:#E84948;*/
  /*}*/
  /*.el-popper[x-placement^=top] /deep/ .popper__arrow{*/
  /*  border-top-color:#E84948;*/
  /*}*/
  /*.el-popper[x-placement^=top] /deep/ .popper__arrow::after{*/
  /*  border-top-color:#E84948;*/
  /*}*/
  .el-loading-spinner {
    top: 85%;
    width: 100%;
    font-size: 25px;
    text-align: center;
    position: absolute;
  }

  .el-loading-spinner i {
    color: white;
  }

  .nav_layout {
    display: flex;
    justify-content: space-between;
    line-height: 6;
    /*padding-left: 100px;*/
    /*padding-right: 150px;*/
  }

  .nav_layout_right {
    display: flex;
    align-items: center;
  }

  .header_head {
    border-bottom: 1px solid grey;
    border-color: rgba(151, 151, 151, 0.3);
    padding: 0;
  }

  .nav_item {
    margin-left: 20px;

  }

  .nav_dropdown_font {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    opacity: 0.8;
    width: 100px;
    color: #FFFFFF;
  }

  .el-header {
    background-color: #101c3d;
    color: white;
    line-height: 60px;

  }

  @media (min-width: 768px) {
    .nav_layout {
      /*display: flex;*/
      /*justify-content: space-between;*/
      /*line-height: 6;*/
      /*padding-left: 18.1%;*/
      /*padding-right: 18.1%;*/
      margin: 0 auto;
      /*width: 1280px;*/
    }
  }

  .head_frame {
    border: 1px solid rgba(228, 231, 235, 0.2);
    height: 44px;
    vertical-align: middle;
    width: 44px;
    border-radius: 22px;
  }

  .logo {
    width: 64px;
    height: 64px;
    margin-top: 15px;
    /*margin: auto auto auto 0;*/
  }
</style>
<style scoped>
  .el-form-item {
    margin-left: 20px;
    margin-right: 100px;
  }

  .middle_size {
    width: 1280px;
    margin: 0 auto;
  }

  .el-table .cell {
    display: table-row-group;
  }


  .label_font {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #16161D;
    letter-spacing: 0;
    text-align: center;

    font-weight: bold;
  }

  .el-select-dropdown__item.hover, .el-select-dropdown__item {
    letter-spacing: 0;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    text-align: center;
    /*font-weight: bolder;*/
  }

  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
    background-color: #3254DC;;


    color: #FFFFFF;

  }

  .el-form-item {
    margin-left: 0px;
    margin-right: 20px;
  }

  .product_input {

  }

  .id_input {

  }

  .time_input {
    width: 100px;
  }

  .type_input {
    width: 100px;

  }

  .state_input {
    width: 100px;

  }

  .form_height {
    height: 100px;
    display: -webkit-box;
  }

  .form_left {
    width: 90%;
  }

  .form_right {
    width: 10%;
  }

  .query_button {
    width: 120px;
  }

  .export_button {
    width: 128px;
  }

  .admin-main {
    height: 80vh;
    background: url('../../assets/tendering.jpg');
    background-size: 100%;
  }

</style>
