<template>
  <el-container style="height: 86vh">
    <el-header>
      <el-input v-model="tendering.title" placeholder="请输入标题"/>
    </el-header>
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
              </div>
            </div>
            <div
              style="margin-left: 8px;display: flex;flex-direction:column;justify-content: space-around">
              <span v-if="tendering.status">已审核</span>
              <span v-else>未审核</span>
              <div>
                id:<span v-text="tendering.id"/>
              </div>
              <el-button type="danger" @click.stop="deleteTendering(tendering.id)">删除</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </el-main>

  </el-container>
</template>

<script>
  import {reqDeleteTendering, reqTenderingList} from "../api";

  export default {
    name: "MyTenderings",
    data() {
      return {
        currentPage: 1,
        pageSize: 20,
        tenderings: [],
        tendering: {
          id: 0,
          title: null,
          status: null
        }
      }
    }, methods: {
      deleteTendering(id) {
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let result = await reqDeleteTendering(id);
          if (result.code === 200) {
            this.$message({
              type: 'success',
              message: "删除成功！"
            });
            this.$router.replace("/My/MyTenderings");
          } else {
            this.$message.error("哎呀，出错了！")
          }
        })
      },
      tenderingsDetail(tendering) {
        this.$router.push({name: 'MyTenderingsDetail', query: {tendering: tendering}})
      },
      async getList() {
        let result = await reqTenderingList(this.currentPage, this.pageSize, this.tendering);
        if (result.code === 200) {
          this.tenderings = result.data.records;
        } else {
          this.$message.error("哎呀，出错了！");
        }
      },
      selectCategory(key) {
        this.$router.replace({name: 'NewsList', query: {category: key}});
      }
    },
    async created() {
      this.tendering.id = global.user.id;
      console.log(this.tendering.id);
      let result = await reqTenderingList(this.currentPage, this.pageSize, this.tendering);
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
