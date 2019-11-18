<template>
  <div class="review_content">
    <!--文件review -->
    <el-main class="review_main">
      <el-row type="flex" justify="space-between" class="review_head">
        <span class="file_name" :title="this.name">{{this.name}}</span>
        <span>
          <el-button size="small" icon="el-icon-download" type="primary" @click="download_file">下载</el-button>
          <el-button icon="el-icon-back" size="small" @click="back" type="danger">返回</el-button>
        </span>
      </el-row>
      <el-row class="review_window">
        <iframe
          v-if="isOffice[this.type] && this.type == 'doc'"
          :src="'https://view.officeapps.live.com/op/view.aspx?src='+this.url"
          width="100%"
          height="100%"
          frameborder="1"
        ></iframe>
        <!-- 公共服务，需要改进 -->
        <iframe
          class="iframe_preview"
          v-if="isOffice[this.type]  && this.type == 'ppt'"
          :src="'http://120.77.155.191:8012/onlinePreview?url='+this.url"
          width="100%"
          height="100%"
          frameborder="1"
        ></iframe>

        <embed
          class="iframe_preview"
          v-if="!isOffice[this.type]"
          :src="this.url"
          type="application/pdf"
          width="100%"
          height="100%"
        />
      </el-row>
    </el-main>
  </div>
</template>

<script>
export default {
  name: "Content",
  props: {
    url: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    back: {
      type: Function,
      default: undefined
    },
    name: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isOffice: { 'doc': true, 'ppt': true, 'pdf': false },
      isDoc: { 'doc': true }
    }
  },
  mounted() {
    console.log(this.url)
  },
  methods: {
    download_file() {
      console.log("doww")
      // window.open(this.url)
      // download(this.url)
      var form = document.createElement('form')
      form.setAttribute('method', 'get')
      form.setAttribute('action', this.url)
      document.body.append(form)
      form.submit()

    }
  },

};
</script>

<style scoped>
.review_content {
  padding: 1px 0;
  height: 100%;
}
.review_main {
  height: 100%;
}
.review_window {
  height: calc(100% - 45px);
}
.file_name {
  line-height: 32px;
  overflow: hidden;
  width: 500px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.review_head {
  margin-bottom: 10px;
}
.iframe_preview {
  border: none;
}
iframe {
  border: none;
}
</style>