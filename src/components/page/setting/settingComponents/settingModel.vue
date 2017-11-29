<template>
  <div>
      <!-- <el-button type="text" @dialogVisible="dialogVisible = true">点击打开 Dialog</el-button> -->
        <el-dialog
        title="提示"
        :visible.sync="dialogVisibleW"
        width="30%"
        :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleW = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisibleW = false">确 定</el-button>
        </span>
        </el-dialog>
  </div>
</template>


<script>
  export default {
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        }
    },
    created() {

    },
    data() {
      return {
        dialogVisibleW: this.dialogVisible
      };
    },
    computed: {
        dialogVisibleW() {
            ret
        }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>