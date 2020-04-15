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
    </el-main>
  </el-container>
</template>

<script>
  import {reqBidsList} from "../api";

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
      }
    },
    methods: {
      goBack() {
        this.$router.back();
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
