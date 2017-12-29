<template>
    <div>
        <p class="mb10">业务负责人</p>
        <el-select @change="selectItem" v-model="val" placeholder="请选择">
            <el-option
            v-for="item in listData"
            :key="item.id"
            :label="item.contacts_name"
            :value="item.id">
            </el-option>
        </el-select>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                val: 1
            }
        },
        props: {
            model: {
                
            },
            listData: {
                type: Array,
                default: []
            }
        },
        computed:{
            
        },
        methods:{
            selectItem(data) {
                console.log(this.val);
                this.val = data;
                this.$emit('selectItem')
            }
        }
    }
</script>
<style scoped>
    
</style>
