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
        <el-row class="footer">
          <el-col span="12">
            <p class="copyright">金陵科技学院土木工程系倾力打造的教学资料分享平台， 学生可通过该平台浏览主干课程并下载习题库</p>
            <p class="copyright">©金陵科技学院土木工程，转载内容版权归作者及来源网站所有，本站原创内容转载请注明来源 </p>
          </el-col>
          <el-col :span="12">
            <p class="link">友情链接：
              <a href="http://jg.jit.edu.cn/">建工学院网站</a>
            </p>
            <p class="link">

              校级精品课程：
              <a href="http://jg.jit.edu.cn/info/1084/1694.htm">基础工程</a> |
              <a href="http://jg.jit.edu.cn/info/1084/1695.htm">工程地质</a> |
              <a href="http://jg.jit.edu.cn/info/1084/1696.htm">土木工程材料</a>
            </p>
            <p class="link">校级研究性课程：
              <a href="http://jg.jit.edu.cn/info/1085/1702.htm">混凝土结构与砌体结构设计</a> |
              <a href="http://jg.jit.edu.cn/info/1085/1703.htm">混凝土结构设计原理</a>
            </p>
          </el-col>
        </el-row>
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
    border-top: 1px solid #929292;
  }
  .copyright {
    font-size: 10px;
    line-height: 10px;
    margin: 5px;
    color: rgba(0, 0, 0, 0.45);
  }
  .link {
    font-size: 10px;
    line-height: 10px;
    margin: 5px;
    color: rgba(0, 0, 0, 0.45);
    /*text-align: center;*/
  }
  .link a {
    text-decoration: none;
  }
  .link a:link {
    color: #3e5ba0
  }
</style>
