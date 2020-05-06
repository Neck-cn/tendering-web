<template>
  <el-container style="height: 90vh">
    <el-header>
      <div style="padding: 10px;display: flex;">
        <el-select v-model="tendering.status" clearable placeholder="请选择状态" @change="getList()">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input
          prefix-icon="el-icon-search"
          v-model="tendering.title"
          placeholder="请输入标题"
          @keyup.native="getList()"/>
      </div>
    </el-header>
    <el-main>
      <div v-infinite-scroll="loadMore">
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
              <span v-if="tendering.status===0">未审核</span>
              <span v-else-if="tendering.status===1">已审核</span>
              <span v-else>已中标</span>
              <el-button v-if="tendering.status===0" type="danger" @click.stop="deleteTendering(tendering.id)">删除
              </el-button>
            </div>
          </div>
        </el-card>
      </div>
    </el-main>

  </el-container>
</template>

<script>
  import {reqDeleteTendering, reqTenderingList} from "../api";
  import global from '../global/global';

  export default {
    name: "MyTenderings",
    data() {
      return {
        pageCount: 0,
        currentPage: 1,
        pageSize: 20,
        tenderings: [],
        tendering: {
          e_id: 0,
          title: null,
          status: null
        },
        options: [ {
          value: '0',
          label: '未审核'
        },{
          value: '1',
          label: '已审核'
        }, {
          value: '2',
          label: '已中标'
        }],
      }
    }, methods: {
      async loadMore() {
        if (this.currentPage >= this.pageCount) {
          return;
        }
        this.currentPage++;
        let result = await reqTenderingList(this.currentPage, this.pageSize, this.tendering);
        if (result.code === 200) {
          this.tenderings = this.tenderings.concat(result.data.records);
        } else {
          this.$message.error("哎呀，出错了！");
        }
      },
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
        this.currentPage=1;
        let result = await reqTenderingList(this.currentPage, this.pageSize, this.tendering);
        if (result.code === 200) {
          this.pageCount = result.data.pages;
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
      this.tendering.e_id = global.user.id;
      let result = await reqTenderingList(this.currentPage, this.pageSize, this.tendering);
      if (result.code === 200) {
        this.pageCount = result.data.pages;
        this.tenderings = result.data.records;
      } else {
        this.$message.error("哎呀，出错了！");
      }
    }
  }
</script>

<style scoped>
</style>
