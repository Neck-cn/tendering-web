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
        <div v-if="tendering.status!=='3'">
          <h1>参与竞标公司</h1>
          <h4 v-for="(bid,index) in bids" :key="index">
            · <span v-text="bid.e_name"/>
            <el-button @click="showDialog(bid)">详情</el-button>
            <el-button @click="modifyTendering(bid.id,bid.content)">中标</el-button>
          </h4>
        </div>
      </el-card>
      <el-dialog title="竞标信息" :visible.sync="dialogFormVisible">
        <div><span v-text="detail.content"/></div>
        <el-link type="primary" :href="detail.src">竞标书链接</el-link>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
  import {reqBidsList, updateTender, sendEmail, getEnterDetail} from "../api";

  export default {
    name: "MyTenderingsDetail",
    data() {
      return {
        tendering: {
          id: 0,
          content: "",//招标详情
          e_id: "",//招标企业id
          status: "",//招标状态
          start_time: "",
          title: "",
          end_time: "",
          src: "",
          name: "",
          win_id: 0
        },
        bids: [],
        dialogFormVisible: false,
        detail: {
          content: "",
          src: ""
        }
      }
    },
    methods: {
      goBack() {
        this.$router.back();
      },
      async modifyTendering(b_id, content) {
        let result = await getEnterDetail(b_id);
        let tendering = {};
        if (result.code === 200) {
          tendering = this.data;
          sendEmail({
            "address": tendering.e_mail,
            "subject": "您的竞标信息已中标",
            "text": "您发布的竞标信息：" + content + " 已中标，请及时与招标企业联系对接。",
          }).then();
          this.tendering.win_id = b_id;
          this.tendering.status = "2";
          result = await updateTender(this.tendering);
          if (result.code === 200) {
            this.$message.success("操作成功！");
          } else {
            this.$message.error("哎呀，出错了！");
          }
        } else {
          this.$message.error("哎呀，出错了！");
        }
      }, showDialog(bid) {
        this.detail.content = bid.content;
        this.detail.src = bid.src;
        this.dialogFormVisible = true;
      }
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
