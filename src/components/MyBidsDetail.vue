<template>
  <el-container>
    <el-header style="padding-top: 20px;">
      <el-page-header @back="goBack" content="详情页面">
      </el-page-header>
    </el-header>
    <el-main class="main">
      <el-card shadow="never" style="margin-bottom: 30px;">
        <h1 v-text="tendering.title"/>
        <div v-html="tendering.content"></div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
  import {reqTenderingInfo} from "../api";

  export default {
    name: "MyTenderingsDetail",
    data() {
      return {
        bid: {
          id: 1,
          e_id: "",//招标企业id
          t_id: "",
          content: "",
          status: "",//招标状态
          time: "",
          title: "",
          src: "",
          name: "",
        },
        tendering: {}
      }
    },
    methods: {
      goBack() {
        this.$router.back();
      }
    },
    async created() {
      this.bid = this.$route.query.bid;
      let result = await reqTenderingInfo(this.bid.t_id);
      if (result.code === 200) {
        this.tendering = result.data;
      } else {
        this.$message.error("哎呀，出错了！");
      }
    }
  }
</script>

<style scoped>
</style>
