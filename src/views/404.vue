<template>
    <div class="whole_page">
        <el-row type="flex" class="row-bg" justify="center" style="padding-top: 10%;">
            <el-col :span="6">
                <p class="wrong_word"> Someting`s wrong here...</p>
                <p class="back_word"> We can`t find the page you`re looking for</p>
                <p class="back_word"> Head back home. </p>

                <el-button class="home_btn" type="primary" plain @click="backToHome">Home</el-button>
            </el-col>
            <el-col :span="3" :offset="3">
                <p class="sign_why"> ? </p>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  export default {
    name: "nonePage",
    methods:{
      backToHome:function(){
        this.$router.push('/')
      }
    }
  };
</script>

<style scoped>
    .whole_page {
        height: 100%;
        background-color: #f9fafc;
    }
    .row-bg {
        padding: 10px 0;
    }
    .wrong_word {
        font-size: 30px;
    }
    .back_word {
        font-size: 16px;
        color: #515151;
        margin-left: 0;
    }
    .home_btn {
        margin-top: 20px;
    }
    .sign_why {
        font-size: 180px;
        font-weight: 400;
        line-height: 150px;
        margin-top: 70px;
        color: #3d3d3d;
    }
</style>