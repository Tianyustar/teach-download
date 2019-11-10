<template>
    <div class="whole_page">
        <!-- 首页 -->
        <el-container v-if="!showFile" style="height: 100%"></el-container>

        <!-- 文件预览及下载 -->
        <el-container v-if="showFile" style="height: 100%">
            <!-- 侧边子模块 -->
            <el-aside class="aside_info" width="180px">
                <el-container style="height: 100%;">
                    <el-header class="aside_title" height="45px">
                        <p class="title_style"><i class="el-icon-document"></i> {{nowTitle.name}} </p>
                    </el-header>
                    <el-main style="height: 100%;">
                        <div :class="dir.id ===activeDir ?  'dir_active' : 'dir_text' "
                             v-for="dir in dirList"
                             :key="dir.id"
                             @click="chooseDir(dir.id)">
                            <p> {{dir.name}} </p>
                        </div>
                    </el-main>
                </el-container>
            </el-aside>

            <!-- 文件列表 -->
            <el-main style="padding: 0 0 0 13px;">
                <el-container class="main_box" v-if="!reviewPage">
                  <el-main>
                      <div class="file_box"
                           v-for="file in fileList"
                           :key="file.id"
                           @click="chooseFile(file.url, file.type,file.name)">
                          <p><img class="file_icon" :src="require('../assets/'+file.type+'.png')"/> {{file.name}} </p>
                      </div>

                  </el-main>
                    <el-footer style="text-align: center">
                        <el-pagination
                                layout="prev, pager, next"
                                :current-page.sync="currentPage"
                                :total="fileTotal"
                                @current-change="handleCurrentChange">
                        </el-pagination>
                    </el-footer>
                </el-container>
                <el-container class="main_box" v-if="reviewPage">
                             <Review :url="this.fileUrl" :type="fileType" :name="this.fileName" :back="handleback"></Review>
                </el-container>
            </el-main>
        </el-container>

    </div>
</template>

<script>
import Review from './Review'
  export default {
    name: "Content",
    components: {
      Review
    },
    data() {
      return {
        showFile:false,
        reviewPage:false,
        nowTitle:{ },
        titleList:[
          {
            id:1,
            index:'intro',
            name:'课程介绍'
          },
          {
            id:2,
            index:'course',
            name:'教学课件'
          },
          {
            id:3,
            index:'exercise',
            name:'习题库'
          },
          {
            id:4,
            index:'refer',
            name:'软件参考资料'
          },
        ],
        dirList:[],
        fileList:[],
        fileTotal:-1,
        currentPage:-1,
        activeDir:-1,
        fileUrl:"",
        fileType:"",
        fileName:""
      }
    },
    methods:{

      init() {
        if(this.$route.path === '/') {
          this.showFile = false
          this.reviewPage = false 
        } else {
          this.showFile = true
          this.reviewPage = false // 默认显示文件列表
          this.currentPage = 1
          for (let i = 0; i<this.titleList.length; i++) {
            if(this.$route.params.index === this.titleList[i].index) {
              this.nowTitle = this.titleList[i]
            }
          }
          this.getDirList()
        }
      },
      getDirList() {
        this.$axios.get('/api/node/list',{
          params:{
            parentId : this.nowTitle.id,
            current: this.currentPage,
            size:8
          }})
          .then((res) => {
            if(res.data.data.total > 0) {
              if(res.data.data.records[0].type === 'dir') {
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
      },
      getFileList(currentPage) {
        let parentId = this.activeDir
        if(this.nowTitle.id === 1 || this.nowTitle.id === 3) {
          parentId = this.nowTitle.id
        }
        this.$axios.get('/api/node/list',{
          params:{
            parentId : parentId,
            current: currentPage,
            size:8
          }})
          .then( (res) => {
            console.log(res)
            this.fileList =  res.data.data.records;
            this.fileTotal = res.data.data.total
          })
      },
      chooseDir(value) {
        this.activeDir = value
        this.currentPage = 1
        this.reviewPage = false // 默认显示文件列表， lyx mod 11.10
        this.getFileList(this.currentPage)
      },
      chooseFile(value, type, name) {
       this.fileUrl = value;
       this.fileType = type;
       this.fileName = name;
       this.reviewPage = true;

      },
      handleCurrentChange(val) {
        this.getFileList(val)
      },
      handleback(){
        this.reviewPage = false;
      },
    },
    mounted() {
      this.init()
    },
    watch:{
      '$route' () {
        this.init()
        this.currentPage = 1
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
        opacity:0.8;
    }
    .aside_title {
        background: #38508E;
    }
    .title_style {
        font-size: 14px;
        line-height: 14px;
        color: white;
        text-align: center;
    }

    .dir_text p{
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
    .file_box p{
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

</style>