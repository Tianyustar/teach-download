<template>
  <div class="whole_page">
    <el-container style="height: 100%">
      <!-- 导航栏 -->
      <el-header>
        <el-row class="header">
          <el-col :span="12">
            <p class="head_title"> 土木工程教学中心 </p>
          </el-col>
          <el-col :span="24" >
            <el-menu
                    :default-active="activePath"
                    class="menu_style"
                    mode="horizontal"
                    @select="handleSelect"
                    background-color="#38508E"
                    text-color="rgba(228, 228, 228, 0.60)"
                    active-text-color="#fff"
                    style="border-radius: 10px;"
                    router>
              <el-menu-item index="/">首页</el-menu-item>
              <el-menu-item index="/content/intro">课程介绍</el-menu-item>
              <el-menu-item index="/content/course">教学课件</el-menu-item>
              <el-menu-item index="/content/exercise">习题库</el-menu-item>
              <el-menu-item index="/content/refer">软件参考资料</el-menu-item>
            </el-menu>
          </el-col>

        </el-row>

      </el-header>

      <!-- 主要内容面板 -->
      <el-main style="height: 100%; margin-top: 65px">
          <Content>  </Content>
      </el-main>

      <!-- 尾部版权设定 -->
      <el-footer>
        <div class="footer">
          <p>111111</p>
        </div>
      </el-footer>
    </el-container>

  </div>
</template>

<script>
import Content from '../components/Content'
export default {
  name: "home",
  components: {
    Content
  },
  data() {
    return{
      activePath :"/home"
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      //console.log(key, keyPath);
    }
  },
  mounted(){
      this.activePath = this.$route.path;
  }

};
</script>
<style scoped>
  .el-menu {
    padding-left: 10px;
  }
  .el-menu-item {
    height: 40px;
    line-height: 40px;
  }
  .whole_page {
    height: 100%;
  }

  .header {
    height: 20px;
  }
  .head_title {
    color: #38508E;
    color: rgba(240, 240, 240, 0.78);
    font-size: 1.7em;
    height: 26px;
  }
  .menu_style {
    margin-top: 10px;
  }

  .footer {

  }
</style>
