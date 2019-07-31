<template>
    <div class="myPatient">
        <v-top></v-top>
        <div class="ui-flex">
            所有患者
        </div>
        <div class="ui-flex ui-flex-wrap ui-mgt-15 ui-mgb-15">
            <div class="ui-w-160 ui-mgr-6">
                <el-input size="mini" placeholder="姓名/手机号" v-model="searchData"></el-input>
            </div>
            <div class="ui-flex-1"></div>
            <!-- <el-button size="mini" type="primary" @click="addPaitent">新增患者</el-button> -->
        </div>
        <div class='patient_table'>
            <el-table
                    :data="patientLists"
                    height="100%"
                    border
                    style="width: 100%">
                <el-table-column
                        type="index"
                        label="序号"
                        width="50"
                >
                </el-table-column>
                <el-table-column
                        prop="realname"
                        label="患者姓名"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="mobile"
                        label="手机号"
                        width="150"
                >
                </el-table-column>
                <el-table-column
                        prop="nickname"
                        label="昵称"
                        width="150"
                >
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="头像"
                >
                    <template slot-scope="scope">
                        <img :src="scope.row.avatar" alt="" width="100px">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="area"
                        label="地区"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="sexStr"
                        label="性别"
                        width="50">
                </el-table-column>
                <el-table-column
                        label="操作"
                >
                    <template slot-scope="scope">
                        <!-- <el-button @click="editPaitent(scope.row,false)" type="text" size="small">修改</el-button>
                        <el-button @click="delPatient(scope.row)" type="text" size="small">删除</el-button>
                        <el-button @click="editPaitent(scope.row,true)" type="text" size="small">详情</el-button>
                        <el-button type="text" size="small" @click="visitShow(scope.row)">就诊</el-button> -->
                        <el-button type="text" size="small" @click="caseShow(scope.row)">看病记录</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 分页 -->
        <div class="pages">
            <pages ref="pages" v-on:getList="getPatientList" v-if="total" :total="total"></pages>
        </div>

        <prescription ref="prescriptions" v-if="prescriptionShow"
                      @getList="getPatientList" :docOrder="patient"
                      v-on:closePrescription="prescriptionShow=false"></prescription>

        <!-- 编辑病人病例信息 -->
        <el-dialog
                title="提示"
                :visible.sync="bingliDialogVisible"
                @close="closeBingliDialog"
                :width="screenWidth>1024?'550px':'96%'">
            <editBingli :patientData="patientData" :disabled="disabled"
                        v-on:closeBingliDialog="closeBingliDialog" @getList="getPatientList"></editBingli>
        </el-dialog>

    </div>
</template>

<script>
    import path from "../../service/path";
    import pages from '../components/pages.vue';
    import editBingli from '../prescription/editBingli.vue';
    import prescription from '../prescription/prescription.vue';
    import VTop from '../components/top_nav.vue';

    export default {
        data() {
            return {
                screenWidth: document.body.clientWidth,   // 这里是给到了一个默认值 （这个很重要）
                // 以上为临时绑定变量

                patientLists: [], // 所有患者
                searchData: '', // 患者检索字段
                prescriptionShow: false, // 处方弹窗

                // 病人病历信息
                bingliDialogVisible: false, // 病人病例信息  弹窗
                patientData: { // 患者病历信息信息
                },
                patient: null, 
                total: null, // 总条数
                disabled:false,
                userInfo: JSON.parse(localStorage.getItem("userInfo"))

            };
        },
        created() {
            // 所有患者列表
            this.getPatientList();
        },
        methods: {
            // 所有患者列表
            getPatientList({pageNo = 1, pageSize = 10} = {}) {
                if(this.userInfo.userType==0){
                    this.$api.post(path.allPatientList, {
                        "name": this.searchData,
                        "pageNo": pageNo,
                        "pageSize": pageSize,
                    }, (res) => {
                        this.patientLists = res.data;
                        this.total = res.total;
                    })
                }else if(this.userInfo.userType==1){
                    this.$api.post(path.manageGetUser, {
                        "name": this.searchData,
                        "pageNo": pageNo,
                        "pageSize": pageSize,
                    }, (res) => {
                        this.patientLists = res.data;
                        this.total = res.total;
                    })
                }
                
            },
           

            // // 就诊
            // visitShow(row) {
            //     const that = this;
            //     this.prescriptionShow = true;
            //     that.patientId = row.openid; // 患者ID
            //     setTimeout(function () {
            //         that.$refs.prescriptions.changeActive(1)
            //     }, 200)
            // },

            // 病例
            caseShow(row) {

                const that = this;
                this.prescriptionShow = true;
                that.patient = row; // 患者ID
                setTimeout(function () {
                    that.$refs.prescriptions.getOrderByOpenid(row.openid);
                    that.$refs.prescriptions.changeActive(2);
                }, 200)
            },

            // 关闭处方弹窗
            closePrescription() {
                this.prescriptionShow = false;
            },

            // 关闭编辑个人病历信息 弹窗
            closeBingliDialog() {
                this.bingliDialogVisible = false;
                this.$refs.pages.resetPages(); // 重置分页数据
            },

            // 打开编辑弹窗
            editPaitent(row,disabled) {
                this.disabled=disabled;
                this.bingliDialogVisible = true;
                this.$api.get(path.getPatientInfo,{
                    userId:row.id,
                    name:row.name,
                },(res) => {
                    this.patientData=res.data[0];
                })
            },

            // 打开新增弹窗
            addPaitent() {
                this.bingliDialogVisible = true;
                this.patientData={}; // 清空病人信息
            },

            // 删除患者
            delPatient(row) {
                const that = this;
                that.$confirm('此操作将永久删除该患者, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$api.post(path.delPatient, {
                        "id": row.id, // 用户ID
                    }, function (res) {
                        that.$message.success('操作成功！');
                        that.getPatientList();
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
            'pages': pages,
            'prescription': prescription,
            'editBingli': editBingli,
            VTop
        },

        watch: {
            // 检索狂自动搜索
            "searchData": function () {
                const that = this;
                setTimeout(function () {
                    console.log(3)
                    that.getPatientList();
                }, 200)
            }

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


