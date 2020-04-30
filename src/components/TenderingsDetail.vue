<template>
  <el-container style="height: 86vh">
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
      <el-card>
        <h1>参与竞标公司</h1>
        <h4 v-for="(bid,index) in bids" :key="index">· <span v-text="bid.e_name"/></h4>
      </el-card>
      <div style="padding:1rem;background-color:#3a8ee6;position: fixed;bottom: 3rem;right: 10rem;z-index: 9999;"
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
    </el-main>
  </el-container>
</template>

<script>
  import {getEnterDetail, insertBid, reqBidsList, sendEmail} from "../api";
  import global from '../global/global';

  export default {
    name: "TenderingsDetail",
    data() {
      return {
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
          src: ""
        },
        dialogFormVisible: false,

        url: global.baseURL + "/upload",
      }
    },
    methods: {
      checkBid() {
        if (global.user === null) {
          this.$message.error('请先登录');
          return;
        }
        this.dialogFormVisible = true;
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
</style>
