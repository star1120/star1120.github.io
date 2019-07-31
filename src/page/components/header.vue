<template>
    <div>
        <div class="logo">
            处方管理平台
        </div>
        <div class="hRight">
            <div class="person"><img src="../../assets/head.jpg" alt="">
                {{userInfo.userName}}<i class="fa fa-caret-down"></i>
                <ul>
                    <li @click="setData" v-if="userInfo.userType==0 || userInfo.userType==1">
                        <a href="javascript:void(0)"><i class="fa fa-user"></i>我的资料</a>
                    </li>
                    <li @click="setPatientData" v-if="userInfo.userType==2">
                        <a href="javascript:void(0)"><i class="fa fa-gear"></i>我的资料</a>
                    </li>

                    <li @click="setDizhi" v-if="userInfo.userType==0 || userInfo.userType==1">
                        <a href="javascript:void(0)"><i class="fa fa-gear"></i>生成注册链接</a>
                    </li>

                    <li @click="signOut()">
                        <a href="javascript:void(0)"><i class="fa fa-tv"></i>安全退出</a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 医生编辑资料 -->
        <el-dialog
                title="编辑资料"
                :visible.sync="bingliDialogVisible"
                @close="closeBingliDialog"
                :width="screenWidth>1024?'550px':'96%'">
            <el-form :model="ruleForm" size="small" ref="ruleForm" label-width="100px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username" disabled placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="真是姓名" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
                </el-form-item>

                <el-form-item label="介绍" prop="introduce">
                    <el-input v-model="ruleForm.introduce" placeholder="请输入介绍"></el-input>
                </el-form-item>

                <el-form-item label="上传头像" prop="headpic">
                    <el-upload
                            class="avatar-uploader"
                            :action="uploadFileUrl"
                            :show-file-list="false"
                            name="zy_image"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="ruleForm.headpic" :src="ruleForm.headpic" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>

                </el-form-item>
            </el-form>

            <div class="dialog-footer ui-flex ui-mgt-20 ui-pdb-20">
                <div class="ui-flex-1"></div>
                <el-button size="small" type="primary" @click="addDoc">保存</el-button>
            </div>

        </el-dialog>

        <!-- 编辑病人病例信息 -->
        <el-dialog
                title="提示"
                :visible.sync="bingDialogVisible"
                @close="closeBingliDialog"
                :width="screenWidth>1024?'550px':'96%'">
            <editBingli :patientData="patientData" v-on:closeBingliDialog="bingDialogVisible=false"></editBingli>
        </el-dialog>

        <!-- 生成注册链接 -->
        <el-dialog
                title="生成注册链接"
                :visible.sync="shengVisible"
                width="350px">
            <el-input size="small" v-model="shengData"></el-input>
            <div class="dialog-footer ui-flex ui-mgt-20 ui-pdb-20">
                <div class="ui-flex-1"></div>
                <el-button size="small" type="primary" @click="shengVisible=false">确认</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import path from "../../service/path";
    import editBingli from '../prescription/editBingli.vue';

    export default {
        data() {
            return {
                bingliDialogVisible: false,
                bingDialogVisible: false,
                screenWidth: document.body.clientWidth,   // 这里是给到了一个默认值 （这个很重要）
                // 以上为临时绑定变量
                ruleForm: {},
                uploadFileUrl: path.uploadFile, // 上传图片的地址
                patientData:{},
                userInfo:JSON.parse(localStorage.getItem("userInfo")),
                shengVisible:false,
                shengData:'',
            }
        },

        methods: {
            // 退出
            signOut() {
                localStorage.clear();
                this.$router.push('/login');
            },

            // 关闭编辑个人病历信息 弹窗
            closeBingliDialog() {
                this.bingliDialogVisible = false;
            },


            // 上传头像
            handleAvatarSuccess(res, file) {
                console.log(res)
                this.ruleForm.headpic = res.data;
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },


            // 获取医生信息
            setData() {
                this.bingliDialogVisible = true;
                this.$api.get(path.getDocInfo, {
                    docId: this.userInfo.userId
                }, res => {
                    console.log(res)
                    this.ruleForm = res.data[0];
                })

            },

            // 保存医生信息
            addDoc() {
                console.log(this.ruleForm)
                this.$api.post(path.editAdminUser, {
                    "id": this.userInfo.userId,
                    "name": this.ruleForm.username,
                    "introduce": this.ruleForm.introduce,
                    "headpic": this.ruleForm.headpic,
                }, (res) => {
                    this.$message.success('操作成功！');
                    this.bingliDialogVisible = false;
                })
            },

            // 获取病人信息
            setPatientData(){
                this.bingDialogVisible=true;
                this.$api.post(path.getPatientInfo,{
                    userId:this.userInfo.userId,
                },(res) => {
                    this.patientData=res.data[0];
                })
            },

            // 生成注册标签
            setDizhi(){
                this.shengVisible=true;
                this.shengData=`http://zy.ljj.cn/019/#/login/doc_id=${this.userInfo.userId}`;
            }


        },

        components: {
            'editBingli': editBingli,
        },
        watch:{
            $route(){
                if(JSON.parse(localStorage.getItem('userInfo'))){
                    this.userInfo=JSON.parse(localStorage.getItem('userInfo'));
                }
            },
        }

    };

</script>

<style lang="scss">
    .logo {
        font-size: 18px;
        color: #333333;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }

    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }


</style>
