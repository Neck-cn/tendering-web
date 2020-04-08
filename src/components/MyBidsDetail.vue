<template>
  <el-container>
    <el-header style="padding-top: 20px;">
      <el-page-header @back="goBack" content="详情页面">
      </el-page-header>
    </el-header>
    <el-main class="main">
      <el-card shadow="never" style="margin-bottom: 30px;">
        <h1 v-text="bid.name"/>
        <div v-html="bid.content"/>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: "MyTenderingsDetail",
    data() {
      return {
        bid: {
          id: 1,

          e_id: "",//招标企业id
          t_id: "",
          content:"",
          status: "",//招标状态
          time: "",
          title: "",
          src:"",
          name:"",
        },
      }
    },
    methods: {
      goBack() {
        this.$router.back();
      }
    }, created() {
      this.bid = this.$route.query.bid;
    }
  }
</script>

<style scoped>
</style>
