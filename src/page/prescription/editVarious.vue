<template>
    <div class="">
        <el-form :model="classData" size="small" ref="classData" label-width="100px">
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="classData.name" placeholder="请输入分类名称"></el-input>
            </el-form-item>

            <el-form-item label="排序" prop="sort">
                <el-input v-model="classData.sort" placeholder="请输入分类名称"></el-input>
            </el-form-item>

        </el-form>
        <div class="dialog-footer ui-flex ui-mgt-20 ui-pdb-20">
            <div class="ui-flex-1"></div>
            <el-button size="small" type="primary" v-if="!classData.id" @click="addClass">新增</el-button>
            <el-button size="small" type="primary" v-if="classData.id" @click="editClass">编辑</el-button>
        </div>
    </div>
</template>

<script>
    import path from "../../service/path";
    import moment from "moment";

    const birthFormat = "YYYY-MM-DD";
    export default {
        data() {
            return {
                userInfo:JSON.parse(localStorage.getItem("userInfo")),
            };
        },
        props: [
            "classData"
        ],
        created() {
        },
        mounted() {

        },
        methods: {
            //编辑
            editClass(){
                this.$api.post(path.saveClass, this.classData, (res) => {
                    this.$message.success('操作成功！');
                    this.$emit('getList'); // 刷新列表
                    this.$emit('closeBingliDialog');
                })
            },

            //  新增 和 修改病患信息
            addClass() {
                this.$api.post(path.addClass, {"name":this.classData.name, "parentId": 0, "sort": this.classData.sort}, (res) => {
                    this.$message.success('操作成功！');
                    this.$emit('closeBingliDialog');
                    this.$emit('getList'); // 刷新列表
                })

            },


        },

        watch: {
            $route(){
                if(JSON.parse(localStorage.getItem('userInfo'))){
                    this.userInfo=JSON.parse(localStorage.getItem('userInfo'));
                }
            },
        }
    }

</script>

<style>

</style>


