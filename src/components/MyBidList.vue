<template>
  <el-container style="height: 90vh">
    <el-header>
      <div style="padding: 10px;display: flex;">
        <el-input
          prefix-icon="el-icon-search"
          v-model="bid.t_title"
          placeholder="请输入招标项目"
          @keyup.native="getList()"/>
      </div>
    </el-header>
    <el-main>
      <div v-infinite-scroll="loadMore"
           v-loading="loading"
           element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-card shadow="hover" v-for="(bid,index) in bids" :key="index"
                 style="margin-bottom: 4px;cursor: pointer">
          <div style="display: flex;" @click="bidsDetail(bid)">
            <div style="display: flex;flex-direction: column;justify-content: space-between;flex:5">
              <span style="font-family: 'Microsoft YaHei',serif;font-size: 25px;font-weight: 800"
                    v-text="bid.content"/>
              <div style="display: flex;flex-direction: row;margin-top: 8px">
                <div>招标项目：<span v-text="bid.t_title"/></div>
              </div>
            </div>
            <div
              style="margin-left: 8px;display: flex;flex-direction:column;justify-content: space-around">
              <el-link type="primary" :href="bid.src">竞标书</el-link>
              <el-button v-if="bid.t_e_id===0" type="danger" @click.stop="deleteBid(bid.id)">放弃竞标</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </el-main>

  </el-container>
</template>

<script>
  import {reqBidsList, reqDeleteBid} from "../api";
  import global from '../global/global';

  export default {
    name: "MyBids",
    data() {
      return {
        pageCount: 0,
        currentPage: 1,
        pageSize: 10,
        bids: [],
        clientHeight: '',
        categoryOk: false,
        bid: {
          e_id: 0,
          e_name: '',
          t_title: ''
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
          this.$message.info("已经到底啦");
          return;
        }
        this.$message.info("加载中");
        this.isLoading = true;
        this.currentPage++;
        let result = await reqBidsList(this.currentPage, this.pageSize, this.bid);
        if (result.code === 200) {
          this.bids = this.bids.concat(result.data.records);
        } else {
          this.$message.error("哎呀，出错了！");
        }
        this.isLoading = false;
      },
      bidsDetail(bid) {
        this.$router.push({name: 'MyBidsDetail', query: {bid: bid}})
      },
      async getList() {
        this.currentPage = 1;
        let result = await reqBidsList(this.currentPage, this.pageSize, this.bid);
        if (result.code === 200) {
          this.pageCount = result.data.pages;
          this.bids = result.data.records;
        } else {
          this.$message.error("哎呀，出错了！");
        }
      },
      deleteBid(id) {
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let result = await reqDeleteBid(id);
          if (result.code === 200) {
            this.$message({
              type: 'success',
              message: "删除成功！"
            });
            this.$router.replace("/My/MyBids");
          } else {
            this.$message.error("哎呀，出错了！")
          }
        })
      },
    },
    async created() {
      this.bid.e_id = global.user.id;
      let result = await reqBidsList(this.currentPage, this.pageSize, this.bid);
      if (result.code === 200) {
        this.pageCount = result.data.pages;
        this.bids = result.data.records;
      } else {
        this.$message.error("哎呀，出错了！");
      }
      this.loading = false;
    }
  }
</script>

<style scoped>
</style>
