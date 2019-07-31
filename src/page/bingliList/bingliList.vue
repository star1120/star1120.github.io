<template>
    <div class="myPatient">
        <div class="ui-flex">
            看病记录
        </div>
        <div class="ui-flex ui-flex-wrap ui-mgt-15 ui-mgb-15">
            <!--<div class="ui-w-160 ui-mgr-6">-->
                <!--<el-input size="mini" placeholder="姓名/手机号" v-model="searchData"></el-input>-->
            <!--</div>-->
            <div class="ui-flex-1"></div>
            <!-- <el-button size="mini" type="primary" @click="prescriptionShow=true">看病</el-button> -->
        </div>
        <div class='patient_table'>

            <el-table
                    :data="docGetLists"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="ordersn"
                        label="处方编号"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="complaint"
                        label="主诉"
                        width="160"
                >
                </el-table-column>
                <el-table-column
                        label="患者资料"
                        width="120"
                >
                    <template slot-scope="scope">
                        <span class="bigImg" v-for="(url,index) in scope.row.patienturl" :key="index">
                        <img style="width: 100px; height: 100px;" :src="url"/>
                        <!--<i class="fa fa-search-plus" @click="lookBigImg(url)"></i>-->
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="patientname"
                        label="就诊人"
                        width="120"
                >
                </el-table-column>

                <el-table-column
                        prop="patientmobile"
                        label="电话"
                        width="120"
                >
                </el-table-column>
                <el-table-column
                        prop="paytime"
                        label="开方时间"
                        width="120"
                >
                </el-table-column>

                <el-table-column
                        prop="costprice"
                        label="挂号费"
                >
                </el-table-column>
                <el-table-column
                        prop="status"
                        label="状态"
                >
                </el-table-column>

                <el-table-column
                        label="操作"
                        width="100"
                >
                    <template slot-scope="scope">
                        <el-button @click="anliDetial(scope.row)" type="text" size="small">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>

        <!-- 处方弹窗 -->
        <patientCase ref="prescriptions" @docGetList="docGetList" v-if="prescriptionShow"
                      v-on:closePrescription="prescriptionShow=false"></patientCase>

    </div>
</template>

<script>
    import path from "../../service/path";
    import patientCase from '../prescription/patientCase.vue';
    export default {
        data() {
            return {
                docGetLists: [], // 所有患者
                disabled:false,
                prescriptionShow: false, // 处方弹窗
                row:'',
                userInfo:JSON.parse(localStorage.getItem("userInfo")),
            };
        },
        created() {
            // 6、管理员列表
            this.docGetList();
        },
        methods: {
            // 获取管理员列表
            docGetList() {
                this.$api.get(path.onePatientList, {"openid": this.$route.query.openid}, (res) => {
                    this.docGetLists = res
                })
            },

           // 查看病例详情
            anliDetial(row){
                this.rowId=row.id;
                this.prescriptionShow=true;
                setTimeout(() => {
                    this.$refs.prescriptions.getCaseDetial(row.id);
                },20)
            },
        },
        components: {
            'patientCase': patientCase,
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


