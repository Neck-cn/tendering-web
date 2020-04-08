<template>
  <el-container style="height: 86vh">

    <el-main>
      <div>
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
        pageSize: 20,
        tenderings: [],
        clientHeight: '',
        categoryOk: false
      }
    }, methods: {
      tenderingsDetail(tendering) {

        this.$router.push({name: 'TenderingsDetail', query: {tendering: tendering}})

      },
      async getList() {
        let query = "";
        let result = await reqTenderingList(this.currentPage, this.pageSize, {query});
        if (result.code === 200) {
          this.tenderings = result.data;

        } else {
          this.$message.error("哎呀，出错了！");
        }
      },
    }, async created() {
      let query = "";
      let result = await reqTenderingList(this.currentPage, this.pageSize, {query});
      if (result.code === 200) {
        this.tenderings = result.data.records;
      } else {
        this.$message.error("哎呀，出错了！");
      }
    }

  }
</script>

<style scoped>
</style>
