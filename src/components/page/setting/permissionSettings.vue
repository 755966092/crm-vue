<template>
    <div class="componentsRoot">
        <el-row :gutter="15">
            <el-col :span="8">
                <div class="title">
                    <span>角色</span>
                    <el-button type="text">新建角色</el-button>
                </div>
                <div class="block">
                    <el-cascader
                        expand-trigger="hover"
                        :options="options"
                        v-model="selectedOptions2"
                        @change="handleChange">
                    </el-cascader>
                </div>
                <div id="radioBtn">
                    <el-radio-group v-model="radio3">
                        <el-radio-button class="radioBtn" label="超级管理员"></el-radio-button>
                        <el-radio-button class="radioBtn" label="普通管理员"></el-radio-button>
                        <el-radio-button class="radioBtn" label="普通用户"></el-radio-button>
                    </el-radio-group>
                </div>
            </el-col>
            <el-col :span="16">
                <div>
                    <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
                        <el-tab-pane label="操作权限" name="first">
                            <template v-for="(items, key) in checkBoxData">
                                <p class="checkTitle">{{ key }}</p>
                                <el-row class="checkWrap">
                                    <template v-for="item in items">
                                        <el-col class="checkCol" :span="4">
                                            <el-checkbox @change="checkChange" :name="item.name" v-model="item.checked">
                                                {{item.text}}
                                            </el-checkbox>
                                        </el-col>
                                    </template>
                                </el-row>
                                <!-- <hr> -->
                            </template>
                        </el-tab-pane>
                        <el-tab-pane label="数据权限" name="second">
                            <h3>数据权限(设置该角色的用户可以操作数据的范围)</h3>
                            <div class="mt10">
                                <el-radio v-model="dataPermission" label="1">
                                    <span class="dataLabel">个人</span>
                                    <span class="dataLabelInfo">只能操作自己的数据</span>
                                </el-radio>
                                <el-radio v-model="dataPermission" label="2">
                                    <span class="dataLabel">所属部门</span>
                                    <span class="dataLabelInfo">能操作自己, 自己所属部门的数据</span>
                                </el-radio>
                                <el-radio v-model="dataPermission" label="3">
                                    <span class="dataLabel">所属部门及下属部门</span>
                                    <span class="dataLabelInfo">能操作自己, 自己所属部门及其子部门的数据</span>
                                </el-radio>
                                <el-radio v-model="dataPermission" label="4">
                                    <span class="dataLabel">所属公司</span>
                                    <span class="dataLabelInfo">能操作自己所属公司的数据</span>
                                </el-radio>
                                <el-radio v-model="dataPermission" label="5">
                                    <span class="dataLabel">全部</span>
                                    <span class="dataLabelInfo">能操作所有数据</span>
                                </el-radio>

                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                dataPermission: '1',
                checkBoxData: {
                    '线索': [{
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }],
                    '客户': [{
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }],
                    '合同': [{
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }],
                    '款项': [{
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }],
                    '报表': [{
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }],
                    '系统': [{
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项2',
                        name: "xuanz"
                    }, {
                        checked: true,
                        text: '备选项3',
                        name: "xuanz"
                    }]

                },
                activeName2: "first",
                radio3: "超级管理员",
                options: [{
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [{
                            value: 'yizhi',
                            label: '一致'
                        }, {
                            value: 'fankui',
                            label: '反馈'
                        }, {
                            value: 'xiaolv',
                            label: '效率'
                        }, {
                            value: 'kekong',
                            label: '可控'
                        }]
                    }, {
                        value: 'daohang',
                        label: '导航',
                        children: [{
                            value: 'cexiangdaohang',
                            label: '侧向导航'
                        }, {
                            value: 'dingbudaohang',
                            label: '顶部导航'
                        }]
                    }]
                }, {
                    value: 'zujian',
                    label: '组件',
                    children: [{
                        value: 'basic',
                        label: 'Basic',
                        children: [{
                            value: 'layout',
                            label: 'Layout 布局'
                        }, {
                            value: 'color',
                            label: 'Color 色彩'
                        }, {
                            value: 'typography',
                            label: 'Typography 字体'
                        }, {
                            value: 'icon',
                            label: 'Icon 图标'
                        }, {
                            value: 'button',
                            label: 'Button 按钮'
                        }]
                    }, {
                        value: 'form',
                        label: 'Form',
                        children: [{
                            value: 'radio',
                            label: 'Radio 单选框'
                        }, {
                            value: 'checkbox',
                            label: 'Checkbox 多选框'
                        }, {
                            value: 'input',
                            label: 'Input 输入框'
                        }, {
                            value: 'input-number',
                            label: 'InputNumber 计数器'
                        }, {
                            value: 'select',
                            label: 'Select 选择器'
                        }, {
                            value: 'cascader',
                            label: 'Cascader 级联选择器'
                        }, {
                            value: 'switch',
                            label: 'Switch 开关'
                        }, {
                            value: 'slider',
                            label: 'Slider 滑块'
                        }, {
                            value: 'time-picker',
                            label: 'TimePicker 时间选择器'
                        }, {
                            value: 'date-picker',
                            label: 'DatePicker 日期选择器'
                        }, {
                            value: 'datetime-picker',
                            label: 'DateTimePicker 日期时间选择器'
                        }, {
                            value: 'upload',
                            label: 'Upload 上传'
                        }, {
                            value: 'rate',
                            label: 'Rate 评分'
                        }, {
                            value: 'form',
                            label: 'Form 表单'
                        }]
                    }, {
                        value: 'data',
                        label: 'Data',
                        children: [{
                            value: 'table',
                            label: 'Table 表格'
                        }, {
                            value: 'tag',
                            label: 'Tag 标签'
                        }, {
                            value: 'progress',
                            label: 'Progress 进度条'
                        }, {
                            value: 'tree',
                            label: 'Tree 树形控件'
                        }, {
                            value: 'pagination',
                            label: 'Pagination 分页'
                        }, {
                            value: 'badge',
                            label: 'Badge 标记'
                        }]
                    }, {
                        value: 'notice',
                        label: 'Notice',
                        children: [{
                            value: 'alert',
                            label: 'Alert 警告'
                        }, {
                            value: 'loading',
                            label: 'Loading 加载'
                        }, {
                            value: 'message',
                            label: 'Message 消息提示'
                        }, {
                            value: 'message-box',
                            label: 'MessageBox 弹框'
                        }, {
                            value: 'notification',
                            label: 'Notification 通知'
                        }]
                    }, {
                        value: 'navigation',
                        label: 'Navigation',
                        children: [{
                            value: 'menu',
                            label: 'NavMenu 导航菜单'
                        }, {
                            value: 'tabs',
                            label: 'Tabs 标签页'
                        }, {
                            value: 'breadcrumb',
                            label: 'Breadcrumb 面包屑'
                        }, {
                            value: 'dropdown',
                            label: 'Dropdown 下拉菜单'
                        }, {
                            value: 'steps',
                            label: 'Steps 步骤条'
                        }]
                    }, {
                        value: 'others',
                        label: 'Others',
                        children: [{
                            value: 'dialog',
                            label: 'Dialog 对话框'
                        }, {
                            value: 'tooltip',
                            label: 'Tooltip 文字提示'
                        }, {
                            value: 'popover',
                            label: 'Popover 弹出框'
                        }, {
                            value: 'card',
                            label: 'Card 卡片'
                        }, {
                            value: 'carousel',
                            label: 'Carousel 走马灯'
                        }, {
                            value: 'collapse',
                            label: 'Collapse 折叠面板'
                        }]
                    }]
                }, {
                    value: 'ziyuan',
                    label: '资源',
                    children: [{
                        value: 'axure',
                        label: 'Axure Components'
                    }, {
                        value: 'sketch',
                        label: 'Sketch Templates'
                    }, {
                        value: 'jiaohu',
                        label: '组件交互文档'
                    }]
                }],
                selectedOptions: [],
                selectedOptions2: []
            };
        },
        methods: {
            handleChange(value) {
                console.log(value);
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            checkChange(event) {
                //   console.log(event);
                console.log(this.checkBoxData);


            }
        }
    };
</script>

<style scoped>
    @import "./css/radioBtn.css";

    .radioBtn {
        width: 100%;
        margin: 3px 0;
    }

    .el-cascader {
        width: 100%;
    }

    .el-col {
        padding: 0 5px;
    }

    .block {
        padding-right: 15px;
    }

    .checkTitle {
        margin: 10px 0;
    }

    .checkWrap {
        border-bottom: 1px solid #d9d9d9;
        padding-bottom: 10px;
    }

    .checkCol {
        padding-bottom: 5px;
    }

    .el-radio {
        width: 100%;
        margin: 10px 0;
    }

    .el-radio + .el-radio {
        margin-left: 0;
    }

    .dataLabel {
        display: inline-block;
        width: 250px;
    }

    .dataLabelInfo {
        color: #409EFF;
    }

    .mt10 {
        margin-top: 10px;
    }
</style>
