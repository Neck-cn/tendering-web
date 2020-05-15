<template>
  <el-container style="height: 90vh">
    <el-header style="padding-top: 20px;">
      <el-page-header @back="goBack" :content="title">
      </el-page-header>
    </el-header>
    <el-main>
      <div class="tendering-list" v-infinite-scroll="loadMore"
           v-loading="loading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-card shadow="hover" v-for="(tendering,index) in tenderings" :key="index"
                 style="margin-bottom: 4px;cursor: pointer">
          <div style="display: flex;" @click="tenderingsDetail(tendering)">

            <div style="display: flex;flex-direction: column;justify-content: space-between;flex:5">
              <span style="font-family: 'Microsoft YaHei',serif;font-size: 25px;font-weight: 800"
                    v-text="tendering.title"/>
              <div style="display: flex;flex-direction: row;margin-top: 8px">
                <div>开始时间：<span v-text="formatDate(tendering.start_time)"/></div>
                <div style="margin-left: 200px">结束时间：<span v-text="formatDate(tendering.end_time)"/></div>
                <div style="margin-left: 250px">企业名：<span v-text="tendering.name"/></div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <div
        class="refresh el-link"
        @click="getList">
        刷新
      </div>

    </el-main>

  </el-container>
</template>

<script>
  import {reqTenderingList} from "../api";

  export default {
    name: "Tenderings",
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        tenderings: [],
        title: '',
        categoryOk: false,
        tendering: {
          start_time: new Date().getTime(),
          end_time: new Date().getTime(),
          status: 1
        },
        loading: true,
        isLoading: false
      }
    }, methods: {
      async loadMore() {
        if (this.isLoading === true) {
          return;
        }
        if (this.currentPage >= this.pageCount) {
          this.$message.info("已经到底了");
          return;
        }
        this.$message.info("加载中");
        this.isLoading = true;
        this.currentPage++;
        let result = await reqTenderingList(this.currentPage, this.pageSize, this.tendering);
        if (result.code === 200) {
          this.tenderings = this.tenderings.concat(result.data.records);
        } else {
          this.$message.error("哎呀，出错了！");
        }
        this.isLoading = false;
      },
      tenderingsDetail(tendering) {
        this.$router.push({name: 'TenderingDetail', query: {tendering: tendering}})
      },
      goBack() {
        this.$router.back();
      },
      async getList() {
        this.tenderings=[];
        this.loading = true;
        this.currentPage = 1;
        let result = await reqTenderingList(this.currentPage, this.pageSize, this.tendering);
        if (result.code === 200) {
          this.pageCount = result.data.pages;
          this.tenderings = result.data.records;
        } else {
          this.$message.error("哎呀，出错了！");
        }
        this.loading=false;
      },
    }, async created() {
      let method = this.$route.query.method;
      switch (method) {
        case 1:
          this.title = "预招标列表";
          this.tendering.status = 1;
          this.tendering.start_time = new Date().getTime();
          this.tendering.method = 1;
          break;
        case 2:
          this.title = "招标中列表";
          this.tendering.status = 1;
          this.tendering.start_time = new Date().getTime();
          this.tendering.end_time = new Date().getTime();
          break;
        case 3:
          this.title = "已中标列表";
          this.tendering.status = 2;
          break;
      }
      let result = await reqTenderingList(this.currentPage, this.pageSize, this.tendering);
      if (result.code === 200) {
        this.pageCount = result.data.pages;
        this.tenderings = result.data.records;
      } else {
        this.$message.error("哎呀，出错了！");
      }
      this.loading = false;
    }
  }
</script>

<style scoped>
  .refresh {
    padding: 1rem;
    background-color: #3a8ee6;
    position: fixed;
    bottom: 5rem;
    right: 12rem;
    z-index: 9999;
    border-radius: 50%
  }
</style>
