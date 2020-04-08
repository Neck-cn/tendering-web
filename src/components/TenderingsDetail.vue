<template>
  <el-container style="height: 86vh">
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
      this.tendering = this.$route.query.tendering;
      this.my
    }
  }
</script>

<style scoped>
</style>
