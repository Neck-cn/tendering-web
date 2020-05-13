<template>
  <el-container>
    <el-header style="padding: 0">
      <el-menu
        text-color="#87CEFA"
        active-text-color="#1989fa"
        style="display: flex;justify-content: flex-end;width: 100%"
        router
        default-active="news"
        mode="horizontal">
        <div
          :style="{backgroundImage: 'url(' + url + ')',backgroundRepeat:'no-repeat',backgroundSize:'100%',width:'94%'}"/>

        <el-menu-item index="/Tenderings" key="招标信息">
          <span slot="title">招标信息</span>
        </el-menu-item>
        <el-menu-item index="/My" key="我的">
          <span slot="title">我的</span>
        </el-menu-item>
      </el-menu>
    </el-header>

  </el-container>
</template>
<script>

  export default {

    data() {
      return {
        url: require('../assets/title.png')
      }
    },
    methods: {
      //是否显示头部
      header: function (bool) {
        this.header_show = bool;
      }
    },
    created() {
    },
  }
</script>
<style>
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .is-horizontal {
    display: none;
  }

  a {
    display: block;
    text-decoration: none;
    color: black;
  }

  body {
    padding: 0;
  }
</style>
