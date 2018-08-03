<template>
    <div class="photoinfo-container">
        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间: {{ photoinfo.add_time | dataFormat }}</span>
            <span>点击:{{ photoinfo.click }}次</span>
        </p>

        <hr>

        <!-- 缩略图区域 -->
        <vue-preview :slides="thumbImageList" @close="handleClose" class="thumbs"></vue-preview>

        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content"></div>

        <!-- 放置一个现成的评论子组件 -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
// 导入评论子组件
import comment from "../subcomponents/comment.vue"

export default {
  data() {
    return {
      id: this.$route.params.id , // 从路由中获取到的 ID
      photoinfo: {} , // 图片详情
      slide1:[]
    };
  },
  created() {
      this.getPhotoInfo();
      this.getThumbImages();
  },
  methods: {
    getPhotoInfo() {
      // 获取图片的详情
      this.$http.get("api/getimageInfo/" + this.id).then( result => {
          if(result.body.status === 0){
              this.photoinfo = result.body.message[0];
          }
      } );
    },
    getThumbImages(){
        this.$http.get("api/getthumimages/" + this.id).then( result => {
            if(result.body.status === 0){
                result.body.message.forEach(item => {
                    item.w = 600;
                    item.h = 400;
                    this.msrc = item.src
                });
                this.thumbImageList = result.body.message;
            }
        })
    }
  },
  // 注册子组件
  components:{
      'cmt-box': comment
  }
};
</script>

<style lang="scss" scoped>
.photoinfo-container{
    padding: 3px;
    h3{
        color: #26A2FF;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }
    .thumbs{
        img{
            margin: 10px;
            box-shadow:  0 0 8px #999;
        }
    }
}


</style>
