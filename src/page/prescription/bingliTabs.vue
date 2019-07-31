<template>
    <div class="bingliTable">
        <el-table
                :data="caseLists"
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
                    width="60"
            >
            </el-table-column>
            <el-table-column
                    prop="patientmobile"
                    label="电话"
                    width="100"
            >
            </el-table-column>
            <el-table-column
                    prop="paytime"
                    label="就诊时间"
            >
            </el-table-column>
            <el-table-column
                    prop="doctime"
                    label="开方时间"
            >
            </el-table-column>
            <!-- <el-table-column
                    prop="preion"
                    label="处方"
                    width="200"
            >
                <template slot-scope="scope">
          <span v-if="scope.row.preion!='[]'" class="ui-mgr-5" v-for="(g,index) in scope.row.preion" :key="index">
            {{g.name}}<i>{{g.weight}}g</i>
          </span>
                    <span v-if="scope.row.preion=='[]'">
            标题：{{scope.row.title}} <br>内容：{{scope.row.remark}}
          </span>
                    <span>
            <i>(剂量：{{scope.row.dose}} 医嘱：{{scope.row.orders}})</i>
          </span>
                </template>
            </el-table-column> -->
            <el-table-column
                    prop="costprice"
                    label="挂号费"
                    width="120"
            >
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态"
                    width="60"
            >
            </el-table-column>
            <!-- <el-table-column
                    prop="fujian"
                    label="附件"
            >
                <template slot-scope="scope">
          <span class="bigImg" v-for="(url,index) in scope.row.url" :key="index">
            <img :src="url"/>
            <i class="fa fa-search-plus" @click="lookBigImg(url)"></i>
          </span>
                </template>
            </el-table-column> -->

            <el-table-column
                    label="操作"
                    width="100"
            >
                <template slot-scope="scope">
                    <el-button @click="delCase(scope.row)" type="text" size="small">删除</el-button>
                    <el-button @click="detialCase(scope.row)" type="text" size="small">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
    <!-- 分页 -->
        <div class="pages">
            <pages ref="pages" v-on:getList="getCaseByPatientPage" v-if="total" :total="total"></pages>
        </div>

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

    export default {
        data() {
            return {
                caseLists: [], // 所有病例
                dialogImageUrl: '', // 图片地址
                total:0,
                dialogVisible: false, // 上传照片
                openid:'',
                userInfo:JSON.parse(localStorage.getItem("userInfo")),
            };
        },
        methods: {
            // 6、获取某一个病人的所有病例
            getCaseByPatient(openid) {
                const that = this;
                this.openid = openid
                this.$api.get(path.onePatientList, {
                    "openid": openid, // 用户ID
                    "pageNo": 1,
                    "pageSize": 10,
                }, function (res) {
                    that.caseLists = res.data;
                    that.total = res.total;
                })
            },
            getCaseByPatientPage({pageNo = 1, pageSize = 10} = {}) {
                const that = this;
                this.$api.get(path.onePatientList, {
                    "openid": that.openid, // 用户ID
                    "pageNo": pageNo,
                    "pageSize": pageSize,
                }, function (res) {
                    console.log(res)
                    that.caseLists = res.data;
                    that.total = res.total;
                })
            },

            // 查看大图
            lookBigImg(url) {
                let item = {url: url};
                this.$emit('uploadImgPreview', item)
            },

            // 删除病例
            delCase(row) {
                const that = this;
                that.$confirm('此操作将永久删除该病例, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$api.post(path.delCase, {
                        "id": row.id, // 用户ID
                    }, function (res) {
                        that.$message.success('操作成功！');
                        that.getCaseByPatient();
                    })
                }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            uploadImgPreviewImg(src){
                this.dialogImageUrl = src;
                this.dialogVisible = true;
            },

            // 查看详情
            detialCase(row){
                // this.$emit('setActiveName');
                setTimeout(() => {
                    this.$emit('getCaseDetial',row.id, true);
                },20)
            },
        },

        watch: {},
        components: {
            'pages': pages,
        },

    }

</script>

<style lang="scss" scoped>
    // 病例列表
    .bingliTable {
        padding: 20px;
        padding-bottom: 0;
        width: 100%;
        height: calc(100vh - 80px);
        overflow-y: scroll;
        
        i {
            font-size: 12px;
            color: #999999;
        }
        .bigImg {
            img {
                width: 50px;
                height: 50px;
            }
            float: left;
            margin-right: 5px;
            position: relative;
            width: 50px;
            height: 50px;
            display: block;
            cursor: pointer;
            &:hover {
                i {
                    opacity: 1;
                }
            }
            i {
                opacity: 0;
                position: absolute;
                top: 0;
                left: 0;
                text-align: center;
                line-height: 50px;
                width: 100%;
                height: 100%;
                display: block;
                color: #ffffff;
                font-size: 16px;
                background-color: rgba(0, 0, 0, 0.3);
            }
        }
    }
</style>


