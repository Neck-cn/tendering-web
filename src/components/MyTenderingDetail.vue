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
        <div>地址：<span v-text="enterprise.address"/></div>
        <div>手机号：<span v-text="enterprise.phone"/></div>
        <div>邮箱：<span v-text="enterprise.e_mail"/></div>
      </el-card>
      <el-card v-if="tendering.status!==0" style="margin-top: 20px">
        <div>
          <h1>参与投标公司</h1>
          <h4 v-for="(bid,index) in bids" :key="index">
            · <span v-text="bid.e_name"/>
            <el-button @click="showDialog(bid)">详情</el-button>
            <el-button @click="modifyTendering(bid)" v-if="tendering.status===1">中标</el-button>
          </h4>
        </div>
      </el-card>
      <el-dialog title="投标信息" :visible.sync="dialogFormVisible">
        <div><span v-text="detail.content"/></div>
        <el-link type="primary" :href="detail.src">投标书链接</el-link>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
  import {getBidDetail, getEnterDetail, reqBidsList, sendEmail, updateBid, updateTender} from "../api";

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
        },
        enterprise: {
          name: "",
          address: "",
          phone: "",
          e_mail: ""
        }
      }
    },
    methods: {
      goBack() {
        this.$router.back();
      },
      async modifyTendering(bid) {
        let result = await getEnterDetail(bid.e_id);
        let tendering = {};
        if (result.code === 200) {
          tendering = result.data;
          const params = new URLSearchParams();
          params.append('address', tendering.e_mail);
          params.append('subject', "您的竞标信息已中标");
          params.append('text', "您发布的竞标信息：" + bid.content + " 已中标，招标项目为："
            + bid.t_title + "。请及时与招标企业联系对接。");
          sendEmail(params).then();
          this.tendering.win_id = bid.id;
          this.tendering.status = 2;
          bid.t_e_id = this.tendering.e_id;
          updateBid(bid).then();
          result = await updateTender(this.tendering);
          if (result.code === 200) {
            getEnterDetail(bid.e_id).then((res) => {
              this.enterprise = res.data;
            });
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
      if (tendering.win_id !== 0) {
        getBidDetail(tendering.win_id).then((res) => {
          getEnterDetail(res.data.e_id).then((res) => {
            this.enterprise = res.data;
          });
        })
      }
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
