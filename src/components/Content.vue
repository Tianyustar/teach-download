<template>
  <div class="whole_page">
    <!-- 首页 -->
    <el-container v-if="!showFile" style="height: 100%">
      <el-row class="homepage_box">
        <el-col :span="12" style="padding: 30px 20px; height: 100%;">
          <img src="../assets/jit.jpg" style="width: 100%;" />
          <p class="homepage_p">
            金陵科技学院土木工程网络教学平台主要是为土木工程专业
            的教师和学生服务,对土木工程专业的主干课程的课程介绍、课件、习题库、软件类课程的教学资源进行细化整合，
            为本专业学生的学习提供一个自主学习的平台，便于学生通过自主研学获取知识，激发学生自主学习的热情，培养学生利用信息技术的意识和能力，锻炼学生分析问题解决问题的能力，促进信息技术与专业课程的整合。
          </p>

          <!-- <p class="homepage_p">绿色建筑技术与虚拟仿真方向通过BIM等软件分析技术，对绿色建筑全寿命周期进行研究评价。注重绿色建筑材料的开发与研究，注重绿色建筑技术、施工组织技术以及运营管理的研究。</p> -->
        </el-col>

        <el-col :span="12" style="padding: 30px 20px; height: 100%;">
          <el-row style="height: 100%;">
            <el-col :span="12" class="homepage_card">
              <div class="card_box">
                <div class="card_head">课程介绍</div>
                <div class="card_list">
                  <li>画法几何与工程制图课程介绍</li>
                  <li>理论力学课程介绍</li>
                  <li>材料力学课程介绍</li>
                  <li>结构力学课程介绍</li>
                  <li>土力学课程介绍</li>
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="homepage_card">
              <div class="card_box">
                <div class="card_head">教学课件</div>
                <div class="card_list">
                  <li>土木工程软件应用</li>
                  <li>基础工程</li>
                  <li>建筑结构抗震</li>
                  <li>材料力学</li>
                  <li>混凝土结构设计原理</li>
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="homepage_card">
              <div class="card_box">
                <div class="card_head">习题库</div>
                <div class="card_list">
                  <li>土力学思考与习题</li>
                  <li>土木工程施工习题</li>
                  <li>土木工程软件应用习题</li>
                  <li>工程测量习题</li>
                  <li>建筑结构抗震习题</li>
                </div>
              </div>
            </el-col>
            <el-col :span="12" class="homepage_card">
              <div class="card_box">
                <div class="card_head">软件参考资料</div>
                <div class="card_list">
                  <li>BIM软件资料</li>
                  <li>PKPM软件资料</li>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-container>

    <!-- 文件预览及下载 -->
    <el-container v-if="showFile" style="height: 100%">
      <!-- 侧边子模块 -->
      <el-aside class="aside_info" width="180px">
        <el-container style="height: 100%;">
          <el-header class="aside_title" height="45px">
            <p class="title_style">
              <i class="el-icon-document"></i>
              {{nowTitle.name}}
            </p>
          </el-header>
          <el-main style="height: 100%;">
            <div
              :class="dir.id ===activeDir ?  'dir_active' : 'dir_text' "
              v-for="dir in dirList"
              :key="dir.id"
              @click="chooseDir(dir.id)"
            >
              <p>{{dir.name}}</p>
            </div>
          </el-main>
        </el-container>
      </el-aside>

      <!-- 文件列表 -->
      <el-main style="padding: 0 0 0 13px;">
        <el-container class="main_box" v-if="!previewPage">
          <el-main v-loading="loadingFile">
            <div
              class="file_box"
              v-for="file in fileList"
              :key="file.id"
              @click="chooseFile(file.url, file.type,file.name)"
            >
              <p>
                <img class="file_icon" :src="require('../assets/'+file.type+'.png')" />
                {{file.name}}
              </p>
            </div>
          </el-main>
          <el-footer style="text-align: center">
            <el-pagination
              layout="prev, pager, next"
              :current-page.sync="currentPage"
              :total="fileTotal"
              @current-change="handleCurrentChange"
            ></el-pagination>
          </el-footer>
        </el-container>
        <el-container class="main_box" v-if="previewPage">
          <Preview :url="this.fileUrl" :type="fileType" :name="this.fileName" :back="handleback"></Preview>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Preview from './Preview'
// var localJs = document.createElement('script');
// localJs.setAttribute('src', "./download.js");
// document.head.appendChild(localJs);
export default {
  name: "Content",
  components: {
    Preview
  },
  data() {
    return {
      showFile: false,
      previewPage: false,
      nowTitle: {},
      titleList: [
        {
          id: 1,
          index: 'intro',
          name: '课程介绍'
        },
        {
          id: 2,
          index: 'course',
          name: '教学课件'
        },
        {
          id: 3,
          index: 'exercise',
          name: '习题库'
        },
        {
          id: 4,
          index: 'refer',
          name: '软件参考资料'
        },
      ],
      dirList: [],
      fileList: [],
      fileTotal: -1,
      currentPage: -1,
      activeDir: -1,
      fileUrl: "",
      fileType: "",
      fileName: "",
      loadingFile: false,
    }
  },
  methods: {

    init() {
      if (this.$route.path === '/') {
        this.showFile = false
        this.previewPage = false
      } else {
        this.showFile = true
        this.previewPage = false // 默认显示文件列表
        this.currentPage = 1
        for (let i = 0; i < this.titleList.length; i++) {
          if (this.$route.params.index === this.titleList[i].index) {
            this.nowTitle = this.titleList[i]
          }
        }
        this.getDirList()
      }
    },
    getDirList() {
      this.$axios.get('/api/node/list', {
        params: {
          parentId: this.nowTitle.id,
          current: this.currentPage,
          size: 8
        }      })
        .then((res) => {
          if (res.data.data.total > 0) {
            if (res.data.data.records[0].type === 'dir') {
              this.dirList = res.data.data.records
              this.activeDir = this.dirList[0].id
              this.getFileList(1)
            } else {
              this.dirList = null
              this.fileList = res.data.data.records
              this.fileTotal = res.data.data.total
            }
          } else {
            this.dirList = null
            this.fileList = null
          }
        })
        .finally(() => {
          this.loadingFile = false
        })
    },
    getFileList(currentPage) {
      let parentId = this.activeDir
      if (this.nowTitle.id === 1 || this.nowTitle.id === 3) {
        parentId = this.nowTitle.id
      }
      this.$axios.get('/api/node/list', {
        params: {
          parentId: parentId,
          current: currentPage,
          size: 8
        }      })
        .then((res) => {
          console.log(res)
          this.fileList = res.data.data.records;
          this.fileTotal = res.data.data.total
        })
        .finally(() => {
          this.loadingFile = false
        })
    },
    chooseDir(value) {
      this.activeDir = value
      this.currentPage = 1
      this.previewPage = false // 默认显示文件列表， lyx mod 11.10
      this.fileList = []
      this.loadingFile = true;
      this.getFileList(this.currentPage)
    },
    chooseFile(value, type, name) {
      this.fileUrl = value;
      this.fileType = type;
      this.fileName = name;
      this.previewPage = true;

    },
    handleCurrentChange(val) {
      this.getFileList(val)
    },
    handleback() {
      this.previewPage = false;
    },
  },
  mounted() {
    this.init()
    this.fileList = []
    this.loadingFile = true;
  },
  watch: {
    '$route'() {
      this.init()
      this.currentPage = 1
      this.fileList = []
      this.loadingFile = true
    }

  }
};
</script>

<style scoped>
.whole_page {
  height: 100%;
}
.aside_info {
  background: url("../assets/triangle-mosaic.png") repeat;
  border-radius: 4px;
  opacity: 0.8;
}
.aside_title {
  background: #38508e;
}
.title_style {
  font-size: 14px;
  line-height: 14px;
  color: white;
  text-align: center;
}

.dir_text p {
  font-size: 14px;
  padding: 2px 3px;
}
.dir_text:hover {
  cursor: pointer;
}
.dir_active p {
  font-size: 14px;
  background: rgba(62, 91, 160, 0.82);
  border-radius: 2px;
  padding: 2px 3px;
  color: white;
}

.main_box {
  height: 100%;
  background: white;
  border-radius: 2px;
}
.file_box {
  padding: 1px 0;
}
.file_box:hover {
  cursor: pointer;
}
.file_box p:hover {
  color: #000;
  font-weight: 400;
}
.file_box p {
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  color: rgba(87, 87, 87, 0.91);
}
.file_icon {
  height: 20px;
  line-height: 20px;
  margin-right: 4px;
}
/* 首页 */
.homepage_box {
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.26);
  border-radius: 3px;
}
.homepage_p {
  font-size: 13px;
  color: #333333;
  text-indent: 2em;
}
.homepage_card {
  height: 50%;
  padding: 0 15px;
}
.card_box {
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 2px 2px 2px #787878;
  border-radius: 3px;
  height: 90%;
  overflow: hidden;
}
.card_head {
  padding: 2px 10px;
  height: 40px;
  font-size: 13px;
  background: rgb(56, 80, 142);
  color: rgba(255, 255, 255, 0.87);
  line-height: 40px;
}
.card_list li {
  list-style: none;
  font-size: 12px;
  margin: 4px 10px;
  max-height: 100px;
}
</style>