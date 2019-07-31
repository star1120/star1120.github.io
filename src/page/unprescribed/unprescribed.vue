<template>
    <div class="myPatient">
        <v-top></v-top>
        <!--<div class="ui-flex ui-flex-wrap ui-mgt-15 ui-mgb-15">-->
        <!--&lt;!&ndash;<div class="ui-w-160 ui-mgr-6">&ndash;&gt;-->
        <!--&lt;!&ndash;<el-input size="mini" placeholder="姓名/手机号" v-model="searchData"></el-input>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--<div class="ui-flex-1"></div>-->
        <!--<el-button size="mini" type="primary" @click="">开方</el-button>-->
        <!--</div>-->
        <div class='patient_table'>
            <el-table
                    :data="docGetCases"
                    border
                    style="width: 100%">
                <el-table-column
                    prop="ordersn"
                    label="处方编号"
                    width="150">
                </el-table-column>
                <el-table-column
                        label="主诉"
                        width="200"
                >
                    <template slot-scope="scope">
                        <div class="textOverflow">
                            {{scope.row.complaint}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="患者资料"
                >
                    <template slot-scope="scope">
                        <span class="bigImg" v-for="(url,index) in scope.row.patienturl" :key="index">
                        <img @click="uploadImgPreviewImg(url)" style="width: 100px; height: 100px;" :src="url"/>
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
                        label="就诊时间"
                        width="150"
                >
                </el-table-column>
                <el-table-column
                    prop="costprice"
                    label="挂号费"
                    width="120"
                    v-if="userInfo.userType == 0"
                > 
                </el-table-column>

                <el-table-column
                    prop="price"
                    label="订单费用"
                    width="120"
                    v-if="userInfo.userType == 1"
                >
                </el-table-column>

                <el-table-column
                    prop="docname"
                    label="开方医生"
                    width="120"
                    v-if="userInfo.userType == 1"
                >
                </el-table-column>
                <!-- <el-table-column
                        prop="status"
                        label="状态"
                        width="120"
                >
                </el-table-column> -->


<!-- 
                <el-table-column
                        prop="remark"
                        label="备注"
                        width="120"
                >
                </el-table-column>
 -->

                <!-- <el-table-column
                        prop="url"
                        label="患者上传的图片"
                        width="120"
                >
                    <template slot-scope="scope">
                        <img style="width: 100px; height: 100px;" :src="scope.row.url"/>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="doc_url"
                        label="医生上传的图片"
                        width="120"
                >
                    <template slot-scope="scope">
                        <img style="width: 100px; height: 100px;" :src="scope.row.doc_url"/>
                    </template>
                </el-table-column> -->

                <el-table-column
                        label="操作"
                        width="100"
                >
                    <template slot-scope="scope">
                        <!--<el-button @click="detial(scope.row)" type="text" size="small">详情</el-button>-->
                        <!-- <el-button @click="zhuandan(scope.row)" type="text" size="small">转单</el-button> -->
                        <el-button @click="visitShow(scope.row)" type="text" size="small">开方</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 分页 -->
        <div class="pages" id="pages">
            <pages ref="pages" v-on:getList="docGetCase" v-if="total" :total="total"></pages>
        </div>

        <!-- 处方弹窗 -->
        <prescription ref="prescriptions" v-if="prescriptionShow"
                      @getList="docGetCase" :docOrder="docOrder"
                      v-on:closePrescription="prescriptionShow=false"></prescription>

        <!-- 转单 -->
        <el-dialog
                title="提示"
                :visible.sync="centerDialogVisible"
                width="300px">
            <div class="ui-flex ui-mgb-20">
                <span class="ui-lh-32">接单医生：</span>
                <el-select v-model="docId" size="small" placeholder="请选择">
                    <el-option
                            v-for="item in allCaseList"
                            :key="item.id"
                            :label="item.username"
                            :value="item.id">
                    </el-option>
                </el-select>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="centerDialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="changeCase">确 定</el-button>
            </span>
        </el-dialog>


         <!-- 上传图片-查看大图 -->
        <el-dialog :modal="false" title="查看大图" width="80%" :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
            <div class="ui-pdb-20"></div>
        </el-dialog>

    </div>
</template>

<script>
    import path from "../../service/path";
    import pages from '../components/pages.vue';
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
                docGetCases: [], // 所有患者
                searchData: '', // 患者检索字段
                patientId: '', // 当前患者id
                isEdit: '', // 是否编辑
                total: null, // 总条数
                prescriptionShow: false,
                centerDialogVisible: false,
                dialogImageUrl: '', // 图片地址
                dialogVisible: false, // 上传照片
                allCaseList: '', // 所有医生
                docId: '', // 转淡医生
                caseId: '', // 当前案例
                userInfo: JSON.parse(localStorage.getItem("userInfo"))
            };
        },
        created() {
            // 6、管理员列表
            this.docGetCase();

            this.getAllCaseList();
        },
        methods: {
            // 未开方列表
            docGetCase({pageNo = 1, pageSize = 10} = {}) {
                const that = this;
                if(this.userInfo.userType==0){
                    this.$api.post(path.docGetCase, {
                        "pageNo": pageNo,
                        "pageSize": pageSize,
                        "status": 1
                    }, function (res) {
                        that.docGetCases = res.data;
                        that.total = res.total;
                    })
                }else if(this.userInfo.userType==1){
                    this.$api.get(path.manageOrderList, {
                        "pageNo": pageNo,
                        "pageSize": pageSize,
                        "status": 1
                    }, function (res) {
                        that.docGetCases = res.data;
                        that.total = res.total;
                    })
                }
            },

            // 开方
            visitShow(row) {
                this.prescriptionShow = true;
                this.docOrder = row
                setTimeout(() => {
                    this.$refs.prescriptions.getCaseDetial(row.id,false);
                    this.$refs.prescriptions.changeActive(1,true);
                }, 200)
            },

            // 转单
            zhuandan(row) {
                this.caseId=row.id;
                this.centerDialogVisible = true;
            },
            
            uploadImgPreviewImg(src){
                this.dialogImageUrl = src;
                this.dialogVisible = true;
            },

            // 所有医生列表
            getAllCaseList({pageNo = 1, pageSize = 100} = {}) {
                const that = this;
                this.$api.post(path.adminUserList, {
                    "user_id": '',
                    "pageNo": pageNo,
                    "pageSize": pageSize,
                }, function (res) {
                    that.allCaseList = res.data;
                })
            },

            // 确认接单
            changeCase() {
                this.$api.post(path.docChangeCase, {
                    "caseId": this.caseId,
                    "changeDocId": this.docId,
                }, (res) => {
                    this.centerDialogVisible = false;
                    this.docGetCase();
                })
            },


        },
        components: {
            'pages': pages,
            'prescription': prescription,
            VTop
        },

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
        #pages {
            position: absolute;
            bottom: 0;
            right: 0;
        }

    }

    .textOverflow {
        width:200px;
        word-break:break-all;
        display:-webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient:vertical;
        overflow:hidden;
    }
</style>


