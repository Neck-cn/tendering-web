<template>
  <el-container>
    <el-header style="padding-top: 20px;display: flex;align-items: center">
      <el-select v-if="isMyNews" v-model="Status" placeholder="ALL" value="" @change="getData()">
        <el-option
          v-for="item in newsStatus"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <el-input
        prefix-icon="el-icon-search"
        v-model="search"
        size="medium"
        @keyup.native="searchNews" placeholder="输入文章标题"
      />
    </el-header>

    <el-main class="main" :v-loading="loading">
      <div style="display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;
      font-size: 50px;color: #8c939d"
           v-if="isNull">
        <div>这里还没有新闻哦</div>
      </div>
      <div v-infinite-scroll="addData">
        <el-card shadow="hover" v-for="(item,index) in NewsList" :key="item.id"
                 style="margin-bottom: 4px;cursor: pointer">
          <div style="display: flex;" @click="newsDetail(item.id)">
            <el-carousel v-if="item.news_img&&item.news_img.length!==0" height="140px"
                         style="flex: 2;margin-right: 8px">
              <el-carousel-item v-for="pic in item.news_img" :key="pic">
                <el-image lazy :src="pic" fit="contain"></el-image>
              </el-carousel-item>
            </el-carousel>
            <div style="display: flex;flex-direction: column;justify-content: space-between;flex:5">
              <span style="font-family: 'Microsoft YaHei',serif;font-size: 25px;font-weight: 800"
                    v-text="item.news_title"></span>
              <div style="display: flex;flex-direction: row;justify-content: space-between;margin-top: 8px">
                <span v-text="item.username"></span>
                <span v-text="formatDate(item.news_time)"></span>
              </div>
            </div>
            <div v-if="isMyNews"
                 style="margin-left: 8px;display: flex;flex-direction:column;justify-content: space-around">
              <span v-if="item.news_status">已审核</span>
              <span v-else>未审核</span>
              <div>
                id:<span v-text="item.id"></span>
              </div>
              <span v-text="item.news_category"></span>
              <el-button type="danger" v-if="isMyNews" @click.stop="deleteNews(item.id,index)">删除</el-button>
            </div>
          </div>
        </el-card>
      </div>
      <el-backtop target=".main"></el-backtop>
      <div style="position: fixed;right: 42px;bottom:100px;width: 40px;height: 40px;
      color: #1989fa;background-color:white;line-height: 40px;text-align: center;
      box-shadow: 0 0 6px rgba(0,0,0, .12);border-radius:50%;cursor:pointer;"
           @click="refreshNews">
        <span>刷新</span>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: "NewsList",
    data() {
      return {
        totalPage: 1,
        currentPage: 1,
        search: "",
        category: "",
        isMyNews: false,
        NewsList: [],
        isNull: false,
        loading: false,
        refresh: false,
        newsStatus: ["ALL", "未审核", "已审核"],
        Status: "",
      }
    },
    watch: {
      $route() {
        this.search = "";
        this.currentPage = 1;
        this.isMyNews = false;
        this.refresh = false;
        this.category = this.$route.query.category;
        this.getData();
      }
    },
    methods: {
      searchNews() {
        this.getData();
      },
      getData() {
        this.currentPage = 1;
        this.loading = true;
        let data;
        if (this.isMyNews)
        {
          let status = null;
          if (this.Status === "已审核")
          {
            status = true;
          } else if (this.Status === "未审核")
            status = false;


          data = this.$qs.stringify({
            currentPage: this.currentPage,
            search: this.search,
            username: this.Variable.user.username,
            news_status: status
          });
        } else
          {
          data = this.$qs.stringify({
            currentPage: this.currentPage,
            search: this.search,
            news_category: this.category,
            isUser: true
          });
        }
        this.$http.post(this.Variable.baseURL + "news/pageQuery", data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }, withCredentials: true
        }).then((res) => {
          this.NewsList = [];
          if (res.data.list.length === 0) {
            this.isNull = true;
          } else {
            this.isNull = false;
            let list = res.data.list;
            list.forEach(function (value) {
              value.news_img = JSON.parse(value.news_img);
            });
            this.totalPage = res.data.totalPage;
            this.NewsList = list;
          }
          this.loading = false;
          if (this.refresh) {
            this.$message({
              type: "success",
              message: "刷新完成"
            });
            this.refresh = false;
          }
        }).catch(() => {
          this.loading = false;
          this.$message.error("哎呀，出错了！")
        })
      },
      addData() {
        if (this.currentPage < this.totalPage) {
          this.currentPage++;
          let data;
          if (this.isMyNews)
          {
            let status = null;
            if (this.Status === "已审核")
            {
              status = true;
            } else if (this.Status === "未审核")
              status = false;

            data = this.$qs.stringify({
              currentPage: this.currentPage,
              search: this.search,
              username: this.Variable.user.username,
              news_status: status
            });
          } else {
            data = this.$qs.stringify({
              currentPage: this.currentPage,
              search: this.search,
              news_category: this.category,
              isUser: true
            });
          }
          this.$http.post(this.Variable.baseURL + "news/pageQuery", data, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }, withCredentials: true
          }).then((res) => {
            let list = res.data.list;
            list.forEach(function (value) {
              value.news_img = JSON.parse(value.news_img);
            });
            this.NewsList.push(...list);
          }).catch(() => {
            this.$message.error("哎呀，出错了！")
          })
        }
      },
      newsDetail(id) {
        if (this.isMyNews) {
          this.$router.push({name: 'MyNewsDetail', query: {id: id}});
        } else {
          this.$router.push({name: 'NewsDetail', query: {id: id}});
        }
      },
      refreshNews() {
        this.NewsList = [];
        this.$message({
          type: "info",
          message: "正在刷新"
        });
        this.refresh = true;
        this.getData();
      },
      deleteNews(id, index) {
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = this.$qs.stringify({
            news_id: id
          });
          this.$http.post(this.Variable.baseURL + "news/deleteNews", data, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }, withCredentials: true
          }).then((res) => {
            if (res.data.flag) {
              this.NewsList.splice(index, 1);
              if (this.NewsList.length === 0)
                this.isNull = true;
              this.$message({
                type: 'success',
                message: res.data.errorMsg
              });
              if (this.NewsList.length < 6)
                this.addData();
            } else {
              this.$message.error(res.errorMsg);
            }
          }).catch(() => {
            this.$message.error("哎呀，出错了！")
          });
        })
      }
    }, created() {
      if (this.Variable.user !== {} && this.$route.query.my === "1")
        this.isMyNews = true;
      this.category = this.$route.query.category;
      this.getData();
    }
  }
</script>

<style scoped>
</style>
