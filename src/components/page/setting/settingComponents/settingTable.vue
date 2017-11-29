<template>
  <div>
      <el-table
    ref="multipleTable"
    :data="tableData3"
    tooltip-effect="dark"
    style="width: 100%"
    border
    @selection-change="handleSelectionChange"
   >
    <el-table-column
      type="selection"
      >
    </el-table-column>
    <el-table-column
      sortable
      label="姓名"
      prop="name"
      
      >
      <template  slot-scope="scope">
        <span class="colorBlue" @click="showModel(scope.$index, scope.row,'showModel')">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="role"
      label="角色"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="position"
      label="职务"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column 
     label="操作"
     width="200"
     >
      <template slot-scope="scope">
         <el-button
          size="mini"
          @click="showModel(scope.$index, scope.row, 'selectRole')">更改角色</el-button>
        <el-button
          size="mini"
          @click="showModel(scope.$index, scope.row, 'handover')">交接</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="showModel(scope.$index, scope.row, 'deleteBtn')">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData3: [
        {
          role: "普通用户",
          name: "王小虎2",
          phone: "13290887678",
          position: "员工"
        },
        {
          role: "普通用户",
          name: "王小虎3",
          phone: "13290887678",
          position: "员工"
        },
        {
          role: "普通用户",
          name: "王小虎1",
          phone: "13290887678",
          position: "员工"
        },
        {
          role: "普通用户",
          name: "王小虎5",
          phone: "13290887678",
          position: "员工"
        },
        {
          role: "普通用户",
          name: "王小虎4",
          phone: "13290887678",
          position: "员工"
        },
        {
          role: "普通用户",
          name: "王小虎7",
          phone: "13290887678",
          position: "员工"
        },
        {
          role: "普通用户",
          name: "王小虎6",
          phone: "13290887678",
          position: "员工"
        }
      ],
      multipleSelection: []
    };
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val,event) {
      console.log(event);
      this.multipleSelection = val;
    },
    showModel(row, data, eventName) {
      // 显示模态框
      this.$emit(eventName,row, data);
    },
    handleDelete(row, column) {
      console.log('row:'+row);
      console.log(column);
      
    }
  }
};
</script>
<style>
.colorBlue {
  color: #409EFF;
}
</style>
