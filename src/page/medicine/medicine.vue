<template>
    <div class="myPatient">
        <div class="ui-flex">
            中草药数据库
        </div>
        <div class="ui-flex ui-flex-wrap ui-mgt-15 ui-mgb-15">
            <div class="ui-w-160 ui-mgr-6">
                <el-input size="mini" placeholder="中草药名称/简码" v-model="searchData"></el-input>
            </div>
            <div class="ui-flex-1"></div>
            <el-button size="mini" type="primary" @click="addMedicine">新增中草药</el-button>
        </div>
        <div class='patient_table'>
            <el-table
                    :data="medicineLists"
                    height="100%"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="中草药名称">
                    <template slot-scope="scope">
                        <a href="javascript:;" @click="caseShow(scope.row)">{{scope.row.name}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="pinyin"
                        label="拼音简码"
                >
                </el-table-column>
                <el-table-column
                        prop="unit"
                        label="单位"
                >
                </el-table-column>
                <el-table-column
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-button @click="editMedicine(scope.row)" type="text" size="small">修改</el-button>
                        <el-button @click="delMedicine(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 分页 -->
        <div class="pages">
            <pages ref="pages" v-on:getList="getMedicineList" v-if="total" :total="total"></pages>
        </div>
        <!-- 编辑病人病例信息 -->
        <el-dialog
                title="提示"
                :visible.sync="bingliDialogVisible"
                @close="closeBingliDialog"
                :width="screenWidth>1024?'550px':'96%'">
            <editHerb :herbData="herbData" :disabled="disabled"
                        v-on:closeBingliDialog="closeBingliDialog" @getList="getMedicineList"></editHerb>
        </el-dialog>
    </div>
</template>

<script>
    import path from "../../service/path";
    import pages from '../components/pages.vue';
    import editHerb from '../prescription/editHerb.vue';

    export default {
        data() {
            return {
                screenWidth: document.body.clientWidth,   // 这里是给到了一个默认值 （这个很重要）
                // 以上为临时绑定变量

                medicineLists: [], // 所有患者
                searchData: '', // 患者检索字段
                prescriptionShow: false, // 处方弹窗

                // 病人病历信息
                bingliDialogVisible: false, // 病人病例信息  弹窗
                herbData: { // 患者病历信息信息
                },
                total: null, // 总条数
                disabled:false,
                userInfo:JSON.parse(localStorage.getItem("userInfo")),
            };
        },
        created() {
            // 6、获取所有中草药
            this.getMedicineList();
        },
        methods: {
            // 6、6、获取所有中草药
            getMedicineList({pageNo = 1, pageSize = 10} = {}) {

                let url=path.getHerb;
                // if(this.userInfo.userType==0){url=path.patientList;} // 医生
                // if(this.userInfo.userType==1){url=path.allPatientList;} // 管理员

                this.$api.get(url, {
                    "name": this.searchData,
                    "pageNo": pageNo,
                    "pageSize": pageSize,
                }, (res) => {
                    this.medicineLists = res.data;
                    this.total = res.total;
                })
            },
        
            // 关闭编辑个人病历信息 弹窗
            closeBingliDialog() {
                this.bingliDialogVisible = false;
                this.$refs.pages.resetPages(); // 重置分页数据
            },

            // 打开编辑弹窗
            editMedicine(row,disabled) {
                this.disabled= false;
                this.bingliDialogVisible = true;
                this.herbData=row
            },

            // 打开新增弹窗
            addMedicine() {
                this.disabled=true;
                this.bingliDialogVisible = true;
                this.herbData={}; // 清空病人信息
            },

            // 删除患者
            delMedicine(row) {
                const that = this;
                that.$confirm('此操作将永久删除该中草药, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$api.get(path.delHerb, {
                        "id": row.id,
                    }, function (res) {
                        that.$message.success('操作成功！');
                        that.getMedicineList();
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
            'editHerb': editHerb,
        },

        watch: {
            // 检索狂自动搜索
            "searchData": function () {
                const that = this;
                setTimeout(function () {
                    that.getMedicineList();
                }, 200)
            },

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


