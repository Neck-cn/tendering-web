<template>
  <el-container>
    <el-header  class="header_head" height="100px">
      <div class="nav_layout">
        <img class="logo" src=""  width="60px" height="60px"    style="cursor: pointer" alt />
        <div class="nav_layout_right">
          <div  class="nav_item">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    <img class="head_frame" src="../../assets/images/admin/admin.png"  />
                </span>
              <el-dropdown-menu style="background-color: #0B152E" slot="dropdown">
                <el-dropdown-item >
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
    <el-main>
      <el-dialog
        title="修改"
        :visible.sync="dialogVisible"
        width="60%"
        >
        <div>
          <el-form :inline="true" ref="form" :model="tender_mod" label-width="150px">
            <el-form-item label="招标企业id" >
              <el-input v-model="tender_mod.e_id"></el-input>
            </el-form-item>
            <el-form-item label="招标状态" >
              <el-input v-model="tender_mod.status"></el-input>
            </el-form-item>

            <el-form-item  label="招标开始时间">
              <el-date-picker
                v-model="tender_mod.start_time"
                type="datetime"

                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="招标结束时间">
              <el-date-picker
                v-model="tender_mod.end_time"
                type="datetime"

                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="中标企业id">
            <el-input v-model="tender_mod.win_id"></el-input>
          </el-form-item>
            <el-form-item label="招标标题">
            <el-input v-model="tender_mod.title"></el-input>
          </el-form-item>
            <el-form-item label="招标书地址">
            <el-input v-model="tender_mod.src"></el-input>
          </el-form-item>
            <el-form-item label="招标企业名">
              <el-input v-model="tender_mod.name"></el-input>
            </el-form-item>

            <el-form-item label="招标内容" >
              <el-input type="textarea"  style="height:150px;width: 600px" v-model="tender_mod.content"></el-input>

            </el-form-item>

          </el-form>
        </div>


        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="mod_tender">确 定</el-button>
  </span>
      </el-dialog>
      <h1>招标信息详情  </h1>
      <el-button type="primary" style="float: right" @click="mod"> 修改</el-button>
      <hr>


          <h2>招标标题： {{tender.title}}</h2>

      <table style="width:100%">

        <tr>
          <td>  <h2>招标企业名： {{tender.name}}</h2>
          </td>


        </tr>
        <tr>
          <td style="width: 50%">  <h3>招标信息id: </h3> {{tender.id}}</td>
          <td>  <h3>招标企业id:  </h3> {{tender.e_id}}</td>


        </tr>
        <tr>
          <td>  <h3>招标开始时间： </h3> {{tender.start_time}}</td>
          <td>  <h3>招标结束时间：</h3> {{tender.end_time}}</td>
        </tr>

        <tr>
          <td>  <h3>中标企业id： </h3> {{tender.win_id}}</td>

        </tr>


        <tr>
          <td> <h3> 竞标书地址:</h3>
            <br>
            <a :href="tender.src" style="text-decoration:underline;">{{tender.src}}</a>
           </td>

        </tr>
      </table>
      <h3> 竞标项目内容:</h3>
      <br>
      {{tender.content}}

    </el-main>
  </el-container>
</template>
<script>
    import {getTenderDetail,updateTender} from "../../api";
    import formatDate from "../../global/formatDate";
    export default {
        data(){
            return{

                dialogVisible: false,
                tableData:[
                    {
                        // id:'',
                        // e_id:'',
                        // e_name:'',
                        // content:'',
                        // t_id:'',
                        // time:'',
                        // src:'',
                        // t_title:''
                    }
                ],
                tender:{

                    id:'',
                    e_id:null,
                    e_name:'',
                    content:'',
                    t_id:'',
                    time:'',
                    src:'',
                    win_id:null,
                    start_time:'',
                    end_time:'',
                    t_title:''

                },
                tender_mod:{

                    id:'',
                    e_id:null,
                    e_name:'',
                    content:'',
                    t_id:'',
                    time:'',
                    src:'',
                    win_id:null,
                    start_time:'',
                    end_time:'',
                    t_title:''

                }


            }
        },
        methods:{
            admin(){

                this.$parent.header(false)

            },
            mod(){
                this.tender_mod=this.tender

               this.dialogVisible = true
            },
            async mod_tender(){

              this.tender_mod.start_time=new Date(this.tender_mod.start_time).getTime()
              this.tender_mod.end_time=new Date(this.tender_mod.end_time).getTime()

                let result = await updateTender(this.tender_mod);

                if (result.code === 200) {
                    this.$message.success("修改成功")
                    this.dialogVisible=false
                    this.created()
                }else {
                    this.$message.error("修改失败")
                }
            },
            async created() {

                var id=this.$route.query.id

                let result = await getTenderDetail(id);

                if (result.code === 200) {


                    this.tender=result.data

                    this.tender.start_time=formatDate(result.data.start_time)
                    this.tender.end_time=formatDate(result.data.end_time)

                } else {
                    this.$message.error("哎呀，出错了！");
                }
            },
            quit(){
                window.sessionStorage.clear();
                this.$router.push({
                    path: '/admin/login'
                })
            }


        },
        created() {
            this.admin()
            this.created()
        }
    }
</script>
<style type="text/css">
  .label_text{
    font-family: PingFangSC-Medium;
    font-size: 15px;
    color: #16161D;
    letter-spacing: 0;
    font-weight: bolder;
  }

  .tooltipStyle{
    background: #E84948;
    height: 36px;
    min-width: 100px;
    vertical-align: center;

    color: white;
    cursor:pointer;
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
  .nav_layout_right{
    display: flex;
    align-items: center;
  }
  .header_head{
    border-bottom: 1px solid grey;
    border-color: rgba(151, 151, 151, 0.3);
    padding: 0;
  }
  .nav_item{
    margin-left:20px ;

  }
  .el-header {
    background-color: #101c3d;
    color: white;
    line-height: 60px;

  }
  @media (min-width: 768px) {
    .nav_layout{
      /*display: flex;*/
      /*justify-content: space-between;*/
      /*line-height: 6;*/
      /*padding-left: 18.1%;*/
      /*padding-right: 18.1%;*/
      margin: 0 auto;
      /*//width: 1280px;*/
    }
  }
  h3{
    display: inline;
  }
  .head_frame {
    border: 1px solid rgba(228, 231, 235, 0.2);
    height: 44px;
    width: 44px;
    margin: auto 0;
    vertical-align: middle;
    border-radius: 22px;
  }
  .logo{
    width: 64px;
    height:64px;
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

</style>
