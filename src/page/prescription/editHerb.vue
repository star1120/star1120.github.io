<template>
    <div class="">
        <el-form :model="herbData" size="small" ref="herbData" label-width="100px">
            <el-form-item label="中药名称" prop="name">
                <el-input v-model="herbData.name" placeholder="请输入中药名称"></el-input>
            </el-form-item>

            <el-form-item label="拼音简码" prop="pinyin" v-if="!disabled">
                <el-input v-model="herbData.pinyin" placeholder="请输入拼音简码"></el-input>
            </el-form-item>

            <el-form-item label="单位" prop="unit">
                <el-input v-model="herbData.unit" placeholder="请输入单位"></el-input>
            </el-form-item>


        </el-form>
        <div class="dialog-footer ui-flex ui-mgt-20 ui-pdb-20">
            <div class="ui-flex-1"></div>
            <el-button size="small" type="primary" v-if="!herbData.id" @click="addHerb">新增</el-button>
            <el-button size="small" type="primary" v-if="herbData.id && !disabled" @click="editHerb">编辑</el-button>
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
            "herbData","disabled"
        ],
        created() {
        },
        mounted() {
          console.log(this.disabled)
        },
        methods: {
            //编辑
            editHerb(){
                this.herbData.birth = moment(this.herbData.birth).format(birthFormat);
                this.$api.get(path.saveHerb, this.herbData, (res) => {
                    this.$message.success('操作成功！');
                    this.$emit('getList'); // 刷新列表
                    this.$emit('closeBingliDialog');
                })
            },

            //  新增 和 修改病患信息
            addHerb() {
                this.$api.get(path.addHerb, this.herbData, (res) => {
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


