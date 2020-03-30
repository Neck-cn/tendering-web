<template>
  <el-container>
    <el-header style="padding-top: 20px">
      <el-input
        prefix-icon="el-icon-search"
        v-model="search"
        size="medium"
        @keyup.native="searchTalk" placeholder="输入关键字搜索"
      />
    </el-header>
    <el-main class="main">
      <div style="display: flex;justify-content: center;align-items: center;width: 100%;height: 100%;
      font-size: 50px;color: #8c939d"
           v-if="isNull">
        <div>这里还没有评论哦</div>
      </div>
      <div v-infinite-scroll="addTalk">
        <el-card shadow="hover" v-for="(item,index) in talks" :key="item.talk_id" style="margin-top: 10px">
          <div style="display: flex ;justify-content: space-between;align-items: center;">
            <div style="width:90%;">
              <div style="display: flex;flex-direction: row;justify-content: space-between;margin-bottom: 10px">
                <span v-text="item.username" style="font-size: 12px"></span>
                <span v-text="formatDate(item.talk_time)" style="font-size: 12px"></span>
              </div>
              <span v-text="item.talk_content" style="font-weight: 300;font-size: 14px"></span>
            </div>
            <el-button type="danger" style="margin-left: 4px;" @click="deleteTalks(item.talk_id,index)">删除</el-button>
          </div>
        </el-card>
      </div>
      <el-backtop target=".main"></el-backtop>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: "Talk",
    data() {
      return {
        totalPage: 1,
        currentPage: 1,
        search: "",
        talks: [],
        isNull: false
      }
    }, methods: {
      searchTalk() {
        this.getTalk()
      }, getTalk() {
        this.talks=[];
        this.currentPage=1;
        let data = this.$qs.stringify({
          currentPage: this.currentPage,
          username: this.Variable.user.username,
          search: this.search,
        });
        this.$http.post(this.Variable.baseURL + "talk/pageQuery", data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }, withCredentials: true
        }).then((res) => {
            if (res.data.list.length === 0) {
              this.isNull = true;
            } else {
              this.isNull=false;
              this.talks = res.data.list;
              this.totalPage = res.data.totalPage;
            }
          }
        ).catch(() => {
          this.$message.error("哎呀，出错了！");
        })
      }, addTalk() {
        if (this.currentPage < this.totalPage) {
          this.currentPage++;
          let data = this.$qs.stringify({
            currentPage: this.currentPage,
            username: this.Variable.user.username,
            search: this.search,
          });
          this.$http.post(this.Variable.baseURL + "talk/pageQuery", data, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }, withCredentials: true
          }).then((res) => {
              this.talks.push(...res.data.list);
            }
          ).catch(() => {
            this.$message.error("哎呀，出错了！");
          });
        }
      }, deleteTalks(id, index) {
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = this.$qs.stringify({
            talk_id: id
          });
          this.$http.post(this.Variable.baseURL + "talk/deleteTalk", data, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }, withCredentials: true
          }).then((res) => {
              if (res.data.flag) {
                this.talks.splice(index, 1);
                if(this.talks.length===0)
                  this.isNull=true;
                this.$message({
                  type: 'success',
                  message: res.data.errorMsg
                });
                if (this.talks.length < 6)
                  this.addTalk();
              } else {
                this.$message.error(res.data.errorMsg)
              }
            }
          ).catch(() => {
            this.$message.error("哎呀，出错了！");
          });
        })
      }
    }, created() {
      this.getTalk();
    }
  }
</script>

<style scoped>
</style>
