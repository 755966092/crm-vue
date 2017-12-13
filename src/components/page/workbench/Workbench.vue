<template>
    <div class="componentsRoot">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: "workbench",
  data() {
    return {
    
    };
  },
  methods: {
  
  },
  created() {
   
  }
};
</script>

<style scoped>
@import "css/workbench.css";

.el-col-16 {
  padding: 0 20px;
}

.text {
  padding: 10px;
  border-bottom: 1px solid #d9d9d9;
}

.text:last-child {
  border: 0;
}

.mt20 {
  margin-top: 20px;
}

.cardTitle {
  display: inline-block;
  height: 34px;
  line-height: 34px;
}

.listText {
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}

.text .el-col {
  height: 60px;
  padding: 10px 0;
}

.listTitle {
  line-height: 40px;
}

.listTextColor {
  color: #999;
}
</style>
