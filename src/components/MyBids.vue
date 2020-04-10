<template>
  <el-container style="height: 86vh">
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
      <div>
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
              <span>招标书</span>
              <el-button type="danger" @click.stop="deleteBid(bid.id)">放弃竞标</el-button>
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
        currentPage: 1,
        pageSize: 20,
        bids: [],
        clientHeight: '',
        categoryOk: false,
        bid: {
          e_id: 0,
          e_name: '',
          t_title: ''
        }
      }
    }, methods: {
      bidsDetail(bid) {
        this.$router.push({name: 'MyBidsDetail', query: {bid: bid}})
      },
      async getList() {
        let result = await reqBidsList(this.currentPage, this.pageSize, this.bid);
        if (result.code === 200) {
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
        this.bids = result.data.records;
      } else {
        this.$message.error("哎呀，出错了！");
      }
    }
  }
</script>

<style scoped>
</style>
