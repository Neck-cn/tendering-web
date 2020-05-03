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
    <el-main style="height: 80vh">
      <h1>企业列表</h1>
      <hr>
      <el-form :inline="true" :model="enter_query"   style="width: 100%">
        <div >
          <el-form-item style="width: 10%">
            <span class="label_font">企业id</span>
            <el-input v-model="enter_query.id" placeholder="企业id "/>
          </el-form-item>
          <el-form-item style="width: 10%">
            <span class="label_font">企业用户名</span>
            <el-input v-model="enter_query.username" placeholder="企业用户名"/>
          </el-form-item>
          <el-form-item style="width: 10%">
            <span class="label_font">企业名称</span>
            <el-input v-model="enter_query.name" placeholder="企业名称"/>
          </el-form-item>
          <el-form-item style="width: 10%">
            <span class="label_font">企业地址</span>
            <el-input v-model="enter_query.address" placeholder="企业地址"/>
          </el-form-item>
          <el-form-item style="width: 10%">
            <span class="label_font">企业手机</span>
            <el-input v-model="enter_query.phone" placeholder="企业手机"/>
          </el-form-item>



          <el-form-item>
            <span class="label_font"/><br>
            <el-button type="primary" icon="el-icon-search" @click="select" class="query_button">
              查询
            </el-button>
          </el-form-item>

        </div>
      </el-form>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="企业id"
          width="65">
        </el-table-column>
        <el-table-column
          prop="username"
          label="企业用户名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label=企业名称">
        </el-table-column>

        <el-table-column
          prop="address"
          width="150"
          label="企业地址">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="企业手机">
        </el-table-column>
        <el-table-column
          prop="certificates"
          label="企业资质证书">
          <template  slot-scope="scope" >
            <img  style="height: 50px;width: 120px" :src="scope.row.certificates" alt="">
          </template>
        </el-table-column>

        <el-table-column
          width="150"
          label="操作">
          <template  slot-scope="scope" >
            <el-button type="success" size="mini" @click="go_enterDetail(scope.row.id)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="size"
        :total="total"
        layout="total, prev, pager, next, jumper"
      />

    </el-main>
  </el-container>
</template>
<script>
    import {getEnterInfo} from "../../api";
    import formatDate from "../../global/formatDate";
    export default {
        data(){
            return{
                //分页属性
                page: 1,
                size: 10,
                total:10,
                tableData:[],
                enter:{
                    id:'',
                    e_id:'',
                    e_name:'',
                    content:'',
                    t_id:'',
                    time:'',
                    e_title:'',
                    src:''
                },
                enter_query:{
                    id:'',
                    e_id:'',
                    e_name:'',
                    content:'',
                    t_id:'',
                    time:'',
                    e_title:'',
                    src:''
                }

            }
        },
        methods:{
            admin(){
                this.$parent.header(false)
            },
            async select(){
                this.page=1
                this.enter=this.enter_query;
                let result = await getEnterInfo(this.page,this.size,this.enter_query);

                if (result.code === 200) {
                    this.tableData = result.data.records;
                    for (var i in result.data.records){
                        this.tableData[i].time=formatDate(result.data.records[i].time)
                    }
                    this.total = result.data.total;
                } else {
                    this.$message.error("哎呀，出错了！");
                }
            },
            async created() {


                let result = await getEnterInfo(this.page,this.size,this.enter);

                if (result.code === 200) {
                    this.tableData = result.data.records;
                    for (var i in result.data.records){
                        this.tableData[i].time=formatDate(result.data.records[i].time)
                    }
                    this.total = result.data.total;
                } else {
                    this.$message.error("哎呀，出错了！");
                }
            },
            //设置当前页
            handleCurrentChange(val) {
                this.page=val

                // 获取请求数据
                this.created()

            },
            go_enterDetail(id){
                this.$router.push({
                    path:'/admin/EnterpriseDetail',
                    query:{id:id}
                })
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
