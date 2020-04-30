<template>
  <el-container style="height: 86vh">
    <el-header style="padding-top: 20px;">
      <el-page-header @back="goBack" content="详情页面">
      </el-page-header>
    </el-header>
    <el-main class="main">
      <el-card shadow="never">
        <h1 v-text="tendering.title"/>
        <div v-html="tendering.content"></div>
      </el-card>
      <el-card v-if="bid.t_e_id!==0" shadow="never">
        <div>企业名：<span v-text="enterprise.name"/></div>
        <div>地址：<span v-text="enterprise.address"/></div>
        <div>手机号：<span v-text="enterprise.phone"/></div>
        <div>邮箱：<span v-text="enterprise.e_mail"/></div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
  import {getEnterDetail, reqTenderingInfo} from "../api";

  export default {
    name: "MyTenderingsDetail",
    data() {
      return {
        bid: {
          id: 1,
          e_id: "",//招标企业id
          t_id: "",
          t_e_id: "",
          content: "",
          status: "",//招标状态
          time: "",
          title: "",
          src: "",
          name: "",
        },
        tendering: {},
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
      }
    },
    async created() {
      this.bid = this.$route.query.bid;
      if (this.bid.t_e_id !== 0) {
        getEnterDetail(this.bid.t_e_id).then((res) => {
          this.enterprise = res.data;
        });
      }
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
