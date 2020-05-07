<template>
  <el-container style="height: 90vh">
    <el-main>
      <div class="tendering-main">
        <el-card class="tendering-body">
          <div slot="header" class="clearfix">
            <span>预招标</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="moreTendering(1)">更多</el-button>
          </div>
          <div v-for="tendering in tendering_ready" :key="tendering.id">
            <div class="el-link" @click="tenderingDetail(tendering)">{{tendering.title}}</div>
            <hr class="hr-dashed">
          </div>
        </el-card>
        <el-card class="tendering-body">
          <div slot="header" class="clearfix">
            <span>招标中</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="moreTendering(2)">更多</el-button>
          </div>
          <div v-for="tendering in tendering_running" :key="tendering.id">
            <div class="el-link" @click="tenderingDetail(tendering)">{{tendering.title}}</div>
            <hr class="hr-dashed">
          </div>
        </el-card>
        <el-card class="tendering-body">
          <div slot="header" class="clearfix">
            <span>已中标</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="moreTendering(3)">更多</el-button>
          </div>
          <div v-for="tendering in tendering_complete" :key="tendering.id">
            <div class="el-link" @click="tenderingDetail(tendering)">{{tendering.title}}</div>
            <hr class="hr-dashed">
          </div>
        </el-card>
      </div>
      <el-card class="excellent-bid">
        <div slot="header" class="clearfix">
          <span>优秀竞标企业</span>
        </div>
        <div class="excellent-bid-items">
          <div v-for="enterprise in excellent_bid_up" :key="enterprise.id">
            <el-link :underline="false" @click.stop="navigatePage(enterprise)">{{enterprise.name}}</el-link>
          </div>
        </div>
        <hr>
        <div class="excellent-bid-items">
          <div v-for="enterprise in excellent_bid_down" :key="enterprise.id">
            <el-link :underline="false" @click.stop="navigatePage(enterprise)">{{enterprise.name}}</el-link>
          </div>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
  import {getEnterDetail, getExcellentInfo, reqTenderingList} from "../api";

  export default {
    name: "Tenderings",
    data() {
      return {
        tendering_ready: [],
        tendering_running: [],
        tendering_complete: [],
        excellent_bid_up: [],
        excellent_bid_down: [],
      }
    }, methods: {
      tenderingDetail(tendering) {
        this.$router.push({name: 'TenderingDetail', query: {tendering: tendering}})
      },
      moreTendering(method) {
        this.$router.push({name: 'TenderingList', query: {method: method}})
      },navigatePage(enterprise){
        location.href=enterprise.site_url;
      }
    }, created() {
      reqTenderingList(1, 9, {
        status: 1,
        start_time: new Date().getTime(),
        method: 1
      }).then((res) => {
        if (res.code === 200) {
          this.tendering_ready = res.data.records
        } else {
          this.$message.error("哎呀，出错了！");
        }
      });
      reqTenderingList(1, 9, {
        start_time: new Date().getTime(),
        end_time: new Date().getTime(),
        status: 1
      }).then((res) => {
        if (res.code === 200) {
          this.tendering_running = res.data.records
        } else {
          this.$message.error("哎呀，出错了！");
        }
      });
      reqTenderingList(1, 9, {
        status: 2
      }).then((res) => {
        if (res.code === 200) {
          this.tendering_complete = res.data.records
        } else {
          this.$message.error("哎呀，出错了！");
        }
      });
      getExcellentInfo(1, 5).then((res) => {
        if (res.code === 200) {
          this.excellent_bid_up = res.data.records;
          this.excellent_bid_up.forEach((enter)=>{
            getEnterDetail(enter.e_id).then((res)=>{
              if (res.code === 200) {
                enter.site_url = res.data.site_url;
              } else {
                this.$message.error("哎呀，出错了！");
              }
            })
          })
        } else {
          this.$message.error("哎呀，出错了！");
        }
      });
      getExcellentInfo(2, 5).then((res) => {
        if (res.code === 200) {
          this.excellent_bid_down = res.data.records
        } else {
          this.$message.error("哎呀，出错了！");
        }
      });
    }

  }
</script>

<style scoped>
  .excellent-bid {
    height: 22vh;
    margin-top: 14px;
  }

  .excellent-bid-items {
    display: flex;
    flex-direction: row;
  }

  .excellent-bid-item {
    margin: 0 14px;
  }

  .tendering-main {
    display: flex;
    height: 60vh;
    align-items: center;
    justify-content: space-between;
  }

  .tendering-body {
    height: 60vh;
    width: 52vh;
  }

  .hr-dashed {
    border: 1px dashed #000
  }
</style>
