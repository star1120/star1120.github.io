<template>
    <div class="login-bg">

        <div class="login">

            <div class="message" v-if="isLogin">登录</div>
            <div class="message" v-if="!isLogin">注册</div>

            <!--登录类型-->
            <div class="ui-mgt-20">
                <!-- <el-radio v-model="radio" label="1">{{isLogin?'患者登录':'患者注册'}}</el-radio> -->
                <el-radio style="display:none;" v-model="radio" label="2">{{isLogin?'医生登录':'医生注册'}}</el-radio>
            </div>

            <!--登录-->
            <div v-if="isLogin">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px"
                         class="demo-ruleForm ui-mgt-30">
                    <el-form-item prop="username">
                        <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="password" v-model="ruleForm.password"
                                  @keyup.enter.native="submitForm('ruleForm')"></el-input>
                    </el-form-item>
                    <div class="login-btn">
                        <el-button class="ui-pw-100" type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    </div>
                    <p class="ui-lh-40 ui-font-right">还没有账号，<a href="javascript:;" @click="register">立即注册</a></p>
                </el-form>
            </div>

            <!-- 注册 -->
            <div v-if="!isLogin">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px"
                         class="demo-ruleForm ui-mgt-30">
                    <el-form-item prop="username">
                        <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="password" v-model="ruleForm.password"
                                  @keyup.enter.native="submitForm('ruleForm')"></el-input>
                    </el-form-item>
                    <div class="login-btn">
                        <el-button class="ui-pw-100" type="primary" @click="submitForm('ruleForm')">注册</el-button>
                    </div>
                    <p class="ui-lh-40 ui-font-right">已有账号，<a href="javascript:;" @click="isLogin=!isLogin">返回登录</a></p>
                </el-form>
            </div>

            <p class="ui-lh-32">Tips : 请正确填写用户名和密码。</p>

        </div>

    </div>
</template>
<script>
    import path from "../../service/path";

    export default {
        data() {
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                },

                isLogin: true,
                radio: '2',
                userInfo:JSON.parse(localStorage.getItem("userInfo")),
            }
        },
        mounted(){
            window.location.href=window.location.href
        },
        created() {
            window.location.href=window.location.href
            console.log(this.$route.path.replace('/login/:id=', ''))
        },
        computed: {
            docId() {
                return this.$route.path.replace('/login/:id=', '');
            }
        },
        methods: {
            // 切换到注册页面
            register() {
                this.isLogin = !this.isLogin; // 返回登录窗口
                Object.keys(this.ruleForm).forEach(key => {
                    this.$set(this.ruleForm, key, '')
                })
            },

            checkPhone(phone){
                if(!(/^1[3456789]\d{9}$/.test(phone))){ 
                    this.$message.error("手机号码有误，请重填");  
                    return false; 
                }
            },

            // 登陆  注册
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    // 医生登录
                    if (valid && this.isLogin && this.radio=='2' && !this.checkPhone(this.ruleForm.username)) {
                        console.log('登录')

                        this.$api.post(path.docLogin, {
                            "username": this.ruleForm.username,
                            "password": this.ruleForm.password,
                        }, (res) => {
                            this.$message.success('操作成功！');
                            console.log(typeof res.is_admin)
                            localStorage.setItem('userInfo', JSON.stringify({
                                userId:res.id,
                                userName:this.ruleForm.username,
                                userType:res.is_admin
                            }));
                            this.$router.push('/index');
                            console.log(JSON.parse(localStorage.getItem("userInfo")));
                        })
                        return
                    }
                    // 医生注册
                    if (valid && !this.isLogin && this.radio=='2' && !this.checkPhone(this.ruleForm.username)) {
                        console.log('注册')
                        this.$api.post(path.addAdminUser, {
                            "username": this.ruleForm.username,
                            "password": this.ruleForm.password,
                        },  (res) => {
                            this.$message.success('操作成功！');
                            this.isLogin = !this.isLogin; // 返回登录窗口
                        })

                        return
                    }

                    // 患者注册
                    if (valid && !this.isLogin && this.radio=='1' && !this.checkPhone(this.ruleForm.username)) {
                        console.log('注册')
                        this.$api.post(path.patientReg, {
                            "username": this.ruleForm.username,
                            "password": this.ruleForm.password,
                            "doc_id": this.docId,
                        }, (res) => {
                            this.$message.success('操作成功！');
                            this.isLogin = !this.isLogin; // 返回登录窗口
                        })

                        return
                    }

                    // 患者登录
                    if (valid && this.isLogin && this.radio=='1' && !this.checkPhone(this.ruleForm.username)) {
                        console.log('登录')
                        this.$api.post(path.patientLogin, {
                            "username": this.ruleForm.username,
                            "password": this.ruleForm.password,
                        }, (res) => {
                            this.$message.success('操作成功！');
                            localStorage.setItem('userInfo', JSON.stringify({
                                userId:res.id,
                                userName:this.ruleForm.username,
                                userType:res.is_admin
                            }));
                            this.$router.push('/index');
                            console.log(JSON.parse(localStorage.getItem("userInfo")))
                        })
                        return
                    }

                });
            }
        },
        watch:{
            $route(){

            },
        }
    }
</script>
<style lang="scss" scoped>
</style>
