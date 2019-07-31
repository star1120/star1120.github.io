<template>
    <div class="myPatient">
        <v-top></v-top>
        <div class='patient_table'>

            <el-table
                    :data="docGetLists"
                    border
                    style="width: 100%">
                <el-table-column
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="patientName"
                        label="患者姓名"
                        width="160"
                >
                </el-table-column>
                <el-table-column
                        prop="complaint"
                        label="主诉"
                        width="160"
                >
                </el-table-column>
                <el-table-column
                        prop="preion"
                        label="处方"
                        width="100"
                >
                    <!--<template slot-scope="scope">-->
                      <!--<span v-if="scope.row.preion!='[]'" class="ui-mgr-5" v-for="(g,index) in scope.row.preion" :key="index">-->
                        <!--{{g.name}}<i>{{g.weight}}g</i>-->
                      <!--</span>-->
                                    <!--<span v-if="scope.row.preion=='[]'">-->
                        <!--标题：{{scope.row.title}} <br>内容：{{scope.row.remark}}-->
                      <!--</span>-->
                                    <!--<span>-->
                        <!--<i>(剂量：{{scope.row.dose}} 医嘱：{{scope.row.orders}})</i>-->
                      <!--</span>-->
                    <!--</template>-->
                </el-table-column>
                <!-- <el-table-column
                        prop="aeger"
                        label="诊断"
                        width="120"
                >
                </el-table-column> -->
                <el-table-column
                        prop="dose"
                        label="剂量"
                >
                </el-table-column>

                <el-table-column
                        prop="orders"
                        label="医嘱"
                >
                </el-table-column>
                <!-- <el-table-column
                        prop="doc_name"
                        label="医生名字"
                        width="120"
                >
                </el-table-column> -->
                <!-- <el-table-column
                        prop="statusStr"
                        label="状态"
                        width="120"
                >
                </el-table-column> -->
                <el-table-column
                        prop="remark"
                        label="备注"
                >
                </el-table-column>

                <!-- <el-table-column
                        prop="doc_url"
                        label="医生上传的图片"
                >
                    <template slot-scope="scope">
                      <span class="bigImg" v-for="(url,index) in scope.row.doc_url" :key="index">
                        <img style="width: 100px; height: 100px;" :src="scope.row.doc_url"/>
                          <i class="fa fa-search-plus" @click="lookBigImg(url)"></i>
                      </span>
                    </template>
                </el-table-column> -->

                <el-table-column
                        label="操作"
                        width="200"
                >
                    <template slot-scope="scope">
                        <el-button @click="detial(scope.row)" type="text" size="small">患者详情</el-button>
                        <el-button @click="anliDetial(scope.row)" type="text" size="small">处方详情</el-button>
                        <el-button @click="anliDetial(scope.row)" type="text" size="small">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>


        </div>



        <!-- 处方弹窗 -->
        <prescription ref="prescriptions" @docGetList="docGetList" :rowCase="row" v-if="prescriptionShow"
                      v-on:closePrescription="prescriptionShow=false"></prescription>


        <!-- 编辑病人病例信息 -->
        <el-dialog
                title="提示"
                :visible.sync="bingliDialogVisible"
                :width="screenWidth>1024?'550px':'96%'">
            <editBingli :patientData="patientData" :disabled="disabled"
                        v-on:closeBingliDialog="bingliDialogVisible=false" @getList="bingliDialogVisible=false"></editBingli>
        </el-dialog>
    </div>
</template>

<script>
    import path from "../../service/path";
    import editBingli from '../prescription/editBingli.vue';
    import prescription from '../prescription/prescription.vue';
    import VTop from '../components/top_nav.vue';
    export default {
        data() {
            return {
                screenWidth: document.body.clientWidth,   // 这里是给到了一个默认值 （这个很重要）
                // 以上为临时绑定变量
                ruleForm: {
                    username: '',
                    password: ''
                },
                docGetLists: [], // 所有患者
                searchData: '', // 患者检索字段
                adminDialogVisible: false, // 管理员信息  弹窗
                patientId: '', // 当前患者id
                isEdit: '', // 是否编辑
                total: null, // 总条数

                bingliDialogVisible:false,
                disabled:false,
                patientData:{},

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

                let url='';
                if(this.userInfo.userType==0){url=path.docGetList;} // 医生
                if(this.userInfo.userType==1){url=path.allCase;} // 管理员

                this.$api.post(url, {}, (res) => {
                    this.docGetLists = res;
                })
            },

            // 查看患者详情
            detial(row){
                this.disabled=true;
                this.bingliDialogVisible = true;
                this.$api.get(path.getPatientInfo,{
                    userId:row.userId,
                },(res) => {
                    this.patientData=res.data[0];
                })
            },

           // 查看病例详情
            anliDetial(row){
                this.row=row;
                this.patientId=row.userId;
                this.prescriptionShow=true;
                setTimeout( () => {
                    this.$refs.prescriptions.getCaseDetial(row.userId)
                }, 200)
            },

        },
        components: {
            'editBingli': editBingli,
            'prescription': prescription,
            VTop
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


