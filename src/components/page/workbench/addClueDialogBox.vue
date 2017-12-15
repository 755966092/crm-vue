<template>
    <div>
        <el-dialog
            title="新增线索"
            :visible.sync="dialogVisible.demo"
        >
            <div style="width:100%">
                <span class="iptName">线索类型:</span>
                <el-select v-model="clueType" @change="clueTypeChange" placeholder="请选择">
                    <el-option
                        v-for="item in clueTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div style="width:100%">
                <span class="iptName">线索来源:</span>
                <el-select v-model="sourceTypeValue" placeholder="请选择">
                    <el-option
                        v-for="item in sourceTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>

            <div>
                <span class="iptName">名称:</span>
                <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <div style="width:100%">
                <span class="iptName">学制:</span>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div style="width:100%">
                <span class="iptName">等级:</span>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div style="width:100%">
                <span class="iptName">省:</span>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div style="width:100%">
                <span class="iptName">市:</span>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div style="width:100%">
                <span class="iptName">县:</span>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div>
                <span class="iptName">地址:</span>
                <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <div>
                <span class="iptName">联系人姓名:</span>
                <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <div>
                <span class="iptName">职务:</span>
                <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <div>
                <span class="iptName">手机:</span>
                <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <div>
                <span class="iptName">微信:</span>
                <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <div>
                <span class="iptName">QQ:</span>
                <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <div>
                <span class="iptName">邮箱:</span>
                <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                    </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "add-clue-dialog-box",
        props: {
            dialogVisible: {
                // type: Boolean,
                // default: false
            }
        },
        data() {
            return {
            }
        },
        methods: {
            handleClose() {

            },
        },
        updated() {
            console.log('数据更新'+JSON.stringify(this.$props.dialogVisible,null,4))
        }


    }
</script>

<style scoped>

</style>
