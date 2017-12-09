<template>
    <div>
        <el-row class="tac">
            <el-col :span="12">
                <h5>默认颜色</h5>
                <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    :collapse="isC"
                    @open="handleOpen"
                    @close="handleClose">
                    <el-menu-item index="1">
                            <i class="el-icon-menu"></i>
                            <span>导航一</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span >导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-setting"></i>
                        <span >导航三</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>

    </div>
</template>
<script>
    export default {
        data() {
          return {
              isC: true
          }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
