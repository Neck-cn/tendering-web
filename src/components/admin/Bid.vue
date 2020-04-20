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
                <el-dropdown-item icon="el-icon-switch-button">
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
      <h1>竞标列表</h1>
      <hr>
      <el-form :inline="true" :model="bid_query"   style="width: 100%">
        <div >
          <el-form-item style="width: 10%">
            <span class="label_font">竞标信息id</span>
            <el-input v-model="bid_query.id" placeholder="竞标信息id " ></el-input>
          </el-form-item>
          <el-form-item style="width: 10%">
            <span class="label_font">竞标企业id</span>
            <el-input v-model="bid_query.e_id" placeholder="竞标企业id"></el-input>
          </el-form-item>
          <el-form-item style="width: 10%">
            <span class="label_font">竞标项目id</span>
            <el-input v-model="bid_query.t_id" placeholder="竞标项目id"></el-input>
          </el-form-item>
<!--          <el-form-item style="width: 10%">-->
<!--            <span class="label_font">竞标信息内容</span>-->
<!--            <el-input v-model="bid_query.content" placeholder="竞标信息内容"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item style="width: 10%">
            <span class="label_font">竞标书地址</span>
            <el-input v-model="bid_query.src" placeholder="竞标书地址"></el-input>
          </el-form-item>
          <el-form-item style="width: 10%">
            <span class="label_font">竞标企业名称</span>
            <el-input v-model="bid_query.e_name" placeholder="竞标企业名称"></el-input>
          </el-form-item>
          <el-form-item style="width: 10%">
            <span class="label_font"> 招标项目标题</span>
            <el-input v-model="bid_query.t_title" placeholder=" 招标项目标题"></el-input>
          </el-form-item>

          <el-form-item>
            <span class="label_font"></span><br>
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
          label="竞标信息id"
          width="65">
        </el-table-column>
        <el-table-column
          prop="e_id"
          label="竞标企业id"
          width="65">
        </el-table-column>
        <el-table-column
          prop="t_id"
          label=竞标项目id">
        </el-table-column>

        <el-table-column
          prop="time"
          width="150"
          label="竞标信息时间">
        </el-table-column>
        <el-table-column
          prop="src"
          label="竞标书地址">
          <template  slot-scope="scope" >
            <a :href="scope.row.src" style="text-decoration:underline;">{{scope.row.src}}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="e_name"
          label="竞标企业名称">

        </el-table-column>

        <el-table-column
          prop="t-title"
          label="招标项目标题">
        </el-table-column>
                <el-table-column
                 width="150"
                  label="操作">
                  <template  slot-scope="scope" >
                    <el-button type="success" size="mini" @click="go_bidDetail(scope.row.id)">详情</el-button>
                    <el-button type="primary" size="mini" @click="deleteBid(scope.row.id)">删除</el-button>
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
      ></el-pagination>

    </el-main>
  </el-container>
</template>
<script>
    import {getBidInfo,deleteBid} from "../../api";
    import formatDate from "../../global/formatDate";
    export default {
        data(){
            return{
                //分页属性
                page: 1,
                size: 10,
                total:10,
                tableData:[],
                bid:{
                    id:'',
                    e_id:'',
                    e_name:'',
                    content:'',
                    t_id:'',
                    time:'',
                    e_title:'',
                    src:''
                },
                bid_query:{
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
                this.bid=this.bid_query
                let result = await getBidInfo(this.page,this.size,this.bid_query);

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


                let result = await getBidInfo(this.page,this.size,this.bid);

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
            go_bidDetail(id){
                this.$router.push({
                    path:'/admin/bidDetail',
                    query:{id:id}
                })
            },
             deleteBid(id) {
                 this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                     confirmButtonText: '确定',
                     cancelButtonText: '取消',
                     type: 'warning'
                 }).then( async() => {
                     let result = await deleteBid(id);

                     if (result.code === 200) {
                         this.$message.success("删除成功！");
                         this.created()
                     } else {
                         this.$message.error("哎呀，出错了！");
                     }
                 })
             },
            quit(){
                window.sessionStorage.clear();
                this.$router.push({
                    path: 'admin/login'
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
