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
                <div class="main_box" ></div>

            </el-main>
        </el-container>
    </div>
</template>

<script>
  export default {
    name: "Content",
    data() {
      return {
        showFile:false,
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
        currentPage:1,
        activeDir:-1,
      }
    },
    methods:{
      init() {
        if(this.$route.path === '/') {
          this.showFile = false
        } else {
          this.showFile = true
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
                this.getFileList()
              } else {
                this.dirList = null
                this.fileList = res.data.data.records
              }
            } else {
              this.dirList = null
              this.fileList = null
            }
          })
      },
      getFileList() {
        this.$axios.get('/api/node/list',{
          params:{
            parentId : this.activeDir,
            current: this.currentPage,
            size:8
          }})
          .then( (res) => {
            console.log(res)
            this.fileList =  res.data.data.records;
          })
      },
      chooseDir(value) {
        this.activeDir = value
        this.getFileList()
      },
    },
    mounted() {
      this.init()
    },
    watch:{
      '$route' () {
        this.init()
        this.getDirList()
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

</style>