<template>
  <el-container style="height: 90vh">
    <el-header style="padding-top: 20px;">
      <el-page-header @back="goBack" content="详情页面">
      </el-page-header>
    </el-header>
    <el-main class="main">
      <el-card shadow="never" style="margin-bottom: 30px;">
        <h1 v-text="tendering.title"/>
        <div v-html="tendering.content"/>
        <el-link type="primary" :href="tendering.src">招标书链接</el-link>
      </el-card>
      <el-card v-if="tendering.status===2">
        <h1>中标企业信息</h1>
        <div>企业名：<span v-text="enterprise.name"/></div>
      </el-card>
      <el-card v-if="display > 1" style="margin-top: 20px">
        <h1>参与竞标公司</h1>
        <h4 v-for="(bid,index) in bids" :key="index">· <span v-text="bid.e_name"/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button v-if="display===3" type="primary" size="mini" @click="showDialog(bid)">详情</el-button>
          <el-button type="danger" size="mini" @click="reportBid(bid)">举报</el-button>
        </h4>
      </el-card>
      <div
        v-if="display===2"
        class="start-bid el-link el-radio"
        @click="checkBid">
        发起<br>竞标
      </div>
      <el-dialog title="发起竞标" :visible.sync="dialogFormVisible">
        <el-form :model="bid">
          <el-form-item label="竞标内容" prop="content">
            <el-input v-model="bid.content" autocomplete="off"/>
          </el-form-item>
          <el-form-item prop="src">
            <el-upload
              :action="url"
              :on-success="uploadFileSuccess"
              :on-exceed="handleExceed"
              :on-remove="handleRemove"
              :limit="1">
              <el-button type="primary">上传竞标书</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="insertBid">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="举报企业" :visible.sync="reportDialogFormVisible">
        <el-form :model="report">
          <el-form-item label="举报内容" prop="content">
            <el-input v-model="report.content" autocomplete="off"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="reportDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="insertReport">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="竞标信息" :visible.sync="dialogBidVisible">
        <div><span v-text="detail.content"/></div>
        <el-link type="primary" :href="detail.src">竞标书链接</el-link>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogBidVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
  import {getBidDetail, getEnterDetail, insertBid, insertReport, reqBidsList, sendEmail} from "../api";
  import global from '../global/global';

  export default {
    name: "TenderingsDetail",
    data() {
      return {
        display: 0,
        tendering: {
          id: 1,
          content: "",//招标详情
          e_id: "",//招标企业id
          status: "",//招标状态
          start_time: "",
          title: "",
          end_time: "",
          src: "",
          name: "",
        },
        bids: [],
        bid: {
          t_id: 0,
          t_title: "",
          e_id: 0,
          content: "",
          time: "",
          src: "",
          e_name: ""
        },
        report: {
          bid: 0,
          content: "",
          e_id: 0,
          r_name: "",
          e_name: "",
          time: null
        },
        dialogFormVisible: false,
        reportDialogFormVisible: false,
        dialogBidVisible: false,
        url: global.baseURL + "/upload",
        enterprise: {},
        detail: {}
      }
    },
    methods: {
      checkBid() {
        if (global.user === null) {
          this.$message.error('请先登录');
          return;
        } else if (this.tendering.e_id === global.user.id) {
          this.$message.error('无法给自己竞标');
          return;
        }
        this.dialogFormVisible = true;
      },
      async insertReport() {
        this.report.time = new Date().getTime();
        let res = await insertReport(this.report);
        if (res.data === 1) {
          this.$message.success("操作成功");
        } else {
          this.$message.error('操作失败');
        }
        this.reportDialogFormVisible = false;
      },
      showDialog(bid) {
        this.detail.content = bid.content;
        this.detail.src = bid.src;
        this.dialogBidVisible = true;
      },
      reportBid(bid) {
        if (global.user === null) {
          this.$message.error('请先登录');
          return;
        }
        this.report.bid = bid.id;
        this.report.e_id = bid.e_id;
        this.report.r_name = global.user.name;
        this.report.e_name = bid.e_name;
        this.reportDialogFormVisible = true;
      },
      goBack() {
        this.$router.back();
      }, async insertBid() {
        this.bid.t_id = this.tendering.id;
        this.bid.t_title = this.tendering.title;
        this.bid.e_id = global.user.id;
        this.bid.e_name = global.user.name;
        let date = new Date();
        this.bid.time = date.getTime();
        let result = await getEnterDetail(this.tendering.e_id);
        let res = await insertBid(this.bid);
        const params = new URLSearchParams();
        params.append('address', result.data.e_mail);
        params.append('subject', "您的招标信息有人投标啦");
        params.append('text', "您发布的招标信息：" + this.tendering.title + " 有人投标，投标内容为："
          + this.bid.content + "。请及时查看。");
        sendEmail(params).then();
        if (res.data === 1) {
          this.$message.success("操作成功");
          reqBidsList(1, 1000, {
            t_id: this.tendering.id
          }).then((res) => {
            this.bids = res.data.records;
          });
        } else {
          this.$message.error('操作失败');
        }
        this.dialogFormVisible = false;
      }, uploadFileSuccess(res) {
        this.bid.src = res.data;
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handleRemove(file, fileList) {
        this.bid.src = null;
      },
    }, async created() {
      this.tendering = this.$route.query.tendering;
      let time = new Date().getTime();
      if (this.tendering.status === 2) {
        this.display = 3;
      } else if (this.tendering.start_time > time) {
        this.display = 1;
      } else if (this.tendering.start_time < time && this.tendering.end_time > time) {
        this.display = 2;
      }
      if (this.tendering.win_id !== 0) {
        getBidDetail(this.tendering.win_id).then((res) => {
          getEnterDetail(res.data.e_id).then((res) => {
            this.enterprise = res.data;
          });
        })
      }
      let tendering = this.tendering;
      let result = await reqBidsList(1, 1000, {
        t_id: tendering.id
      });
      if (result.code === 200) {
        this.bids = result.data.records;
      } else {
        this.$message.error("哎呀，出错了！");
      }
    }
  }
</script>

<style scoped>
  .start-bid {
    padding: 1rem;
    background-color: #3a8ee6;
    color: black;
    position: fixed;
    bottom: 5rem;
    right: 12rem;
    z-index: 9999;
    border-radius: 50%
  }
</style>
