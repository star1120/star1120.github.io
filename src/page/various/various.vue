<template>
    <div class="myPatient">
        <!-- <div class="ui-flex">
            患者
        </div> -->
        <div class="ui-flex ui-flex-wrap ui-mgt-15 ui-mgb-15">
            <!-- <div class="ui-w-160 ui-mgr-6">
                <el-input size="mini" placeholder="姓名/手机号" v-model="searchData"></el-input>
            </div> -->
            <div class="ui-flex-1"></div>
            <el-button size="mini" type="primary" @click="addVarious">新增</el-button>
        </div>
        <div class='patient_table'>
            <el-table
                    :data="topClassList"
                    height="100%"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="sort"
                        label="排序"
                        width="100"
                >
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="类别"
                >
                    <template slot-scope="scope">
                        <el-button @click="openDialog(scope.row)" type="text" size="small">{{scope.row.name}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="240"
                >
                    <template slot-scope="scope">
                        <el-button @click="editPaitent(scope.row)" type="text" size="small">修改</el-button>
                        <el-button @click="delPatient(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog
                :title="gelunTitle"
                :visible.sync="gelunDialogVisible"
                :width="gelunDialogWidth"
                @close="closeDialog"
        >
            <gelunDialogs ref="gelunDialogs" :herbs="herbs" :topId="topId" v-on:getChildData="getChildData"></gelunDialogs>
        </el-dialog>

        <el-dialog
                title="提示"
                :visible.sync="bingliDialogVisible"
                @close="closeBingliDialog"
                :width="screenWidth>1024?'550px':'96%'">
            <editVarious :classData="classData"
                        v-on:closeBingliDialog="closeBingliDialog" @getList="getTopClass"></editVarious>
        </el-dialog>
    </div>
</template>

<script>
    import path from "../../service/path";
    import editVarious from '../prescription/editVarious.vue';
    import gelunDialogs from '../prescription/gelunDialogs.vue';

    export default {
        data() {
            return {
                screenWidth: document.body.clientWidth,   // 这里是给到了一个默认值 （这个很重要）
                // 以上为临时绑定变量
                topClassList: [], // 所有患者
                gelunTitle: '', // 患者检索字段
                herbs: [],
                topId: 0,
                classData: {},
                // 病人病历信息
                bingliDialogVisible: false, // 病人病例信息  弹窗
                gelunDialogWidth: '800px', // 总条数
                gelunDialogVisible: false,
                userInfo:JSON.parse(localStorage.getItem("userInfo")),
            };
        },
        created() {
            this.getTopClass();
        },
        methods: {
            getTopClass() {
                // if(this.userInfo.userType==0){url=path.patientList;} // 医生
                // if(this.userInfo.userType==1){url=path.allPatientList;} // 管理员
                this.$api.get(path.getTopClass, {}, (res) => {
                    this.topClassList = res
                })
            },

            openDialog(row) {
                const that = this;
                this.gelunTitle = row.name
                this.topId = row.id
                this.gelunDialogVisible = true;
                setTimeout(function () {
                    that.$refs.gelunDialogs.getClass();
                }, 200)
            },
            // 关闭各论弹窗
            closeDialog() {
                // this.preions=[{id:'',type:'',name:'',weight:''}];
            },
            // 获取子组件数据
            getChildData(item) {
                this.gelunDialogVisible = false;
            },
            closeBingliDialog() {
                this.bingliDialogVisible = false;
            },
            // 打开编辑弹窗
            editPaitent(row) {
                this.bingliDialogVisible = true;
                this.classData = row
            },

            // 打开新增弹窗
            addVarious() {
                this.bingliDialogVisible = true;
                this.classData={}; 
            },

            // 删除患者
            delPatient(row) {
                const that = this;
                that.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$api.get(path.delClass, {
                        "classId": row.id, // 用户ID
                    }, function (res) {
                        that.$message.success('操作成功！');
                        that.getTopClass();
                    })
                }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

        },
        components: {
            'gelunDialogs': gelunDialogs,
            'editVarious': editVarious,
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

<style lang="scss" scoped>
    // 患者列表
    .myPatient {
        position: relative;
        padding-bottom: 0;
        height: 100%;
        i {
            font-size: 12px;
            color: #999999;
        }
        .pages {
            position: absolute;
            bottom: 0;
            right: 0;
        }

    }
</style>

