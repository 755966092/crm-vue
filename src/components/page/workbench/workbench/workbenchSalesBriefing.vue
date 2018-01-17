<template>
    <div>
        <!-- <el-upload
            action="https://crm.tonyliangli.cn/api/UserFile/uploadImg"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-success='success'
            :on-error='error'
            :data = "paramObj"

            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog> -->

            <el-upload
                class="avatar-uploader"
                action="https://crm.tonyliangli.cn/api/UserFile/uploadImg"
                :show-file-list="false"
                 :data = "paramObj"
                :on-success="success"
                >
                <!-- :before-upload="beforeAvatarUpload" -->
                <img  v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

    </div>
</template>
<script>
export default {
  data() {
    return {
        imageUrl: '',
      paramObj: {
          token: '1516159845WPL5'
      }
    };
  },
  methods: {
  
    success(response, file, fileList) {
        this.imageUrl = response.data.list
        console.log(response.data.list);
        console.log(file);
        console.log(fileList);
        
    },
    error(err, file, fileList) {
         console.log(err);
        console.log(file);
        console.log(fileList);
    }
  }
};
</script>
<style scoped>

 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: auto;
    height: 178px;
    display: block;
  }
</style>
