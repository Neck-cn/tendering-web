<template>
  <el-container ref="homePage">

    <el-main>
      <ul>
        <li v-for="(bid,index) in bids" :key="index">
          <div @click="bidsDetail(bid)">{{bid.name}}</div>
        </li>
      </ul>

    </el-main>

  </el-container>
</template>

<script>
  import {reqBidsList} from "../api";

  export default {
    name: "MyBids",
    data() {
      return {
        currentPage: 1,
        pageSize: 20,
        bids: [],
        clientHeight: '',
        menu:"margin-top: 1px;",
        categoryOk:false
      }
    }, methods: {
      bidsDetail(bid) {

        this.$router.push({name: 'MyBidsDetail', query: {bid: bid}})

      },

      selectCategory(key) {
        this.$router.replace({name: 'NewsList', query: {category: key}});
      },
      changeFixed(clientHeight) { //动态修改样式
        this.$refs.homePage.$el.style.height = clientHeight - 80 + 'px';
        if(this.categoryOk) {
          let padding = clientHeight - 70 - this.categorys.length * 60;
          if (padding < 0)
            padding = 0;
          this.menu = "margin-top:1px;padding-bottom:" + padding + 'px';
        }
      }
    }, mounted() {
      // 获取浏览器可视区域高度
      this.clientHeight = `${document.documentElement.clientHeight}`;
      const that = this;
      window.onresize = function temp() {
        that.clientHeight = `${document.documentElement.clientHeight}`;
      };
    },
    watch: {
      // 如果 `clientHeight` 发生改变，这个函数就会运行
      clientHeight: function () {
        this.changeFixed(this.clientHeight)
      },categorys:function () {
        this.categoryOk=true;
        let padding=this.clientHeight-70-this.categorys.length*60;
        if(padding<0)
          padding=0;
        this.menu="margin-top:1px;padding-bottom:"+padding+'px';
      }
    }, async created() {
      let query = "";
      let result = await reqBidsList(this.currentPage, this.pageSize, {query});
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
