<template>
    <div>
        <div class="prescription_dialog">
            <!-- 关闭按钮 -->
            <i class="p_close fa fa-close" @click="closePrescription"></i>
            <div class="meta_right_box right_box_cont">
                <!-- 顶部 -->
                <div class="ui-h-42 ui-flex ui-size-14 ui-bdb-1 bg_cff">
                  <div class="ui-w-120 ui-font-center ui-lh-48">今日门诊</div>
                    <div class="s_bars" @click="switchBars">
                        <i class="fa fa-bars"></i>
                    </div>
                    <div class="ui-flex-1 ui-flex s_items ui-mgt-10">
                        <div class="item on">病历</div>
                    </div>
                </div>

                <!-- 内容区 -->
                <div class="ui-flex">
                    <!-- 左侧用户信息 -->
                    <div class="p_info ui-bdr-1"
                         :style="barsShow?'width: 0;margin-right: 0;':'width: 119px;margin-right: 10px;'">
                        <div class="ui-h-42 ui-bdb-1 ui-lh-42 ui-flex">
                            <div class="ui-w-60 ui-pdl-8">信息</div>
                            <div class="ui-w-60 ui-pdr-8 ui-font-right p_edit" @click="bingliDialogVisible=true">编辑
                            </div>
                        </div>
                        <div class="p_info_cont">
                            <b>{{patientData.name}}</b>
                            <span>{{patientData.sexStr}}</span>
                            <span>{{patientData.age}}岁</span>
                            <b>生日</b>
                            <span>{{patientData.birth}}</span>
                            <b>籍贯</b>
                            <span>{{patientData.birthplace}}</span>
                            <b>既往病史</b>
                            <span>{{patientData.history}}</span>
                        </div>
                    </div>
                    <!-- 右侧药品信息 -->
                    <div class="ui-flex-1 meta_right_box bg_cff ui-pd-5 s_p_right">
                        <div class="meta_right_box_cont ui-flex ui-flex-wrap">
                            <!-- 病例内容 -->
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 医嘱 -->
        <el-dialog
                title="医嘱"
                :visible.sync="yizhuVisible"
                width="300px">
            <el-input type="textarea" :rows="2" size="small" v-model="caseData.orders"></el-input>
            <div class="dialog-footer ui-flex ui-mgt-20 ui-pdb-20">
                <div class="ui-flex-1"></div>
                <el-button size="small" type="primary" @click="yizhuVisible=false">确认</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import path from "../../service/path";
    import gelunDialogs_doc from './gelunDialogs_doc.vue';
    import bingliTabs from './bingliTabs.vue';
    import editBingli from './editBingli.vue';
    import brCase from './brCase.vue';
    import dropdown from './dropdown.vue';

    export default {
        data() {
            return {
                barsShow: false,
                screenWidth: document.body.clientWidth,   // 这里是给到了一个默认值 （这个很重要）
                // 以上为临时绑定变量
                uploadFileUrl: path.uploadFile, // 上传图片的地址
                dialogImageUrl: '', // 图片地址
                dialogVisible: false, // 上传照片
                uploadFileLists: [], // 上传图片成功后的服务器地址的列表

                // 多级下拉
                agreementParty: [], //协定方检索字段
                agreementPartyLists: [], // 协定方列表
                agreementPartyListsAll: [], // 协定方列表
                gelunDialogVisible: false, // 各论弹窗
                gelunDialogWidth: '800px', // 弹窗宽度
                loading: false,
                getHerbData: [], // 中药查询结果
                dosage: "", // 药量
                herbs: [],
                herbsType: '1', // 筛选类型
                getHerbs: '', // 手机端检索中药

                typeRadio: '1',// 药房类型
                preionLists: [], // 协定方列表
                // 右侧
                activeId: 1,
                tabsLists: [], // 历史处方  协定处方 参考 列表

                // 病人病历信息
                bingliDialogVisible: false, // 病人病例信息  弹窗
                patientData: { // 患者病历信息信息
                    userId: '', // 患者ID
                    name: '', // 病人名称
                    age: '', // 年龄
                    sex: '', // 性别  0：未知 1：男 2：女
                    phone: '', // 手机号或固话
                    birthplace: '', // 籍贯
                    birth: '', // 出生年月
                    history: '',  // 病史
                    sexStr: '',
                },

                // 病历相关参数
                caseData: {
                    id: '', // 病例ID
                    complaint: "", //主诉
                    four_method: "", // 望闻问切
                    aeger: "", // 诊断
                    title: "", // 标题
                    remark: "", // 备注
                    dose: "", //剂量
                    orders: "", //医嘱
                },

                yizhuVisible: false, // 医嘱弹窗
                activeName: 1,// 顶部菜单切换

                addYaocaiVisible: false, // 新增药材弹窗
                yaocai: "", // 新增药材

                userInfo:JSON.parse(localStorage.getItem("userInfo")),
                topClass: [],
                topId: 0,
            };
        },
        props: [],
        created() {
            // 初始化，通过判断屏幕的宽度，确定个人信息是否展示
            if (this.screenWidth <= 1024) {
                this.barsShow = true;
                this.gelunDialogWidth = '98%';
            } else {
                this.barsShow = false;
                this.gelunDialogWidth = '800px';
            }
         
        },
        computed:{
            hideProject(){
                if(this.userInfo.userType==0||this.userInfo.userType==1){
                    return true
                }else{
                    return false
                }
            }
        },
        methods: {
            // 获取案例详情
            getCaseDetial(id){
                this.$api.post(path.getOrderDetail,{
                    id: id,
                },(res) => {
                    this.caseData = res
                })
            },

            // 关闭处方弹窗
            closePrescription() {
                this.$emit('closePrescription');
            },


            // 获取子组件数据
            getChildData(item) {
                this.gelunDialogVisible = item;
            },

            // 关闭编辑个人病历信息 弹窗
            closeBingliDialog() {
                this.bingliDialogVisible = false;
                this.getPatientInfo(); // 重新加载个人信息
            },

            // 关闭和展开 个人信息窗口
            switchBars() {
                this.barsShow = !this.barsShow;
            },

            // 远程检索中药 （一药一量检索）
            remoteMethod(query) {
                const that = this;
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.getHerb(query);
                    }, 200);
                } else {
                    that.getHerbData = [];
                }
            },

            // 调接口，获取药材列表
            getHerb(query) {
                const that = this;
                if (query !== '') {
                    setTimeout(() => {
                        that.loading = false;
                        that.$api.get(path.getHerb, {
                            "name": query,
                            "isLike": 1,
                            "pageNo": 1,
                            "pageSize": 100
                        }, function (res) {
                            that.getHerbData = res.data;
                        })
                    }, 200);
                } else {
                    that.getHerbData = [];
                }
            },

            // 2、添加中药
            addYaocai() {
                const that = this;
                this.$api.get(path.addHerb, {
                    "name": that.yaocai,
                }, function (res) {
                    that.addYaocaiVisible = false;
                    that.$message.success('操作成功！');
                })
            },

            // 动态生成处方协定药品列表
            addHerbs(vid) {
                const that = this;
                let go = false;
                // 判断药品是否重复添加
                that.herbs.forEach((val) => {
                    if (val.id == vid) {
                        this.$message.warning('请勿重复添加药品')
                        go = true;
                    }
                })
                if (go) {
                    go = false;
                    return
                }
                ;  // 终止执行
                let obj = {};
                obj = this.getHerbData.find((item) => {//这里的userList就是上面遍历的数据源
                    return item.id === vid;//筛选出匹配数据
                });
                this.herbs.push(obj);
                // 获取药材后，清空筛选数据
                this.getHerbData = [];
                this.dosage = "";
            },

            // 删除某个药材
            deleteHerbs(index) {
                this.herbs.splice(index, 1);
            },

            // 5、获取协定方
            getPreionList(type) {
                this.$api.post(path.getPreionList, {
                    "name": "",
                    "isLike": 0,
                    "type": type,
                    "pageNo": 1,
                    "pageSize": 100
                }, (res) => {
                    type==2?this.agreementPartyLists = res:this.agreementPartyListsAll = res

                })
            },

            // 通过协定方获取列表数据
            getPreionListData(id) {
                const that = this;
                that.agreementPartyLists.forEach(value => {
                    if (value.id == id) {
                        that.herbs = JSON.parse(value.preion);
                    }
                })
            },

            // 4、新增或保存协定方
            savePreion() {
                const that = this;
                this.$prompt('请输入协议方名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value}) => {
                    that.$api.post(path.savePreion, {
                        "id": "",
                        "name": value,
                        "list": JSON.stringify(this.herbs),
                    }, function (res) {
                        that.$message.success('操作成功！');
                        that.getPreionList();  // // 5、获取协定方
                        this.herbs = [];
                    })
                }).catch(() => {
                    that.$message.warning('取消操作！');
                });
            },

            // 6、保存一个病人的病例
            saveCases() {
                let imgUrl = [];
                // 处理附件图片
                this.uploadFileLists.forEach( (value) => {
                    imgUrl.push(value.response.data)
                })
                console.log(this.userInfo.userType)
                // 病人
                if(this.userInfo.userType==2){
                    this.patientSaveCase(imgUrl);
                    return
                }
                // 医生
                if(this.userInfo.userType==0 || this.userInfo.userType==1){
                    this.docSaveCase(imgUrl);
                    return
                }

            },
            // 病人保存病例
            patientSaveCase(imgUrl){
                this.$api.post(path.patientSaveCase, {
                    "id": this.caseData.id, // 病例ID
                    "complaint": this.caseData.complaint, //主诉
                    "remark": this.caseData.remark, // 备注
                    "url": imgUrl.join(","),  // 病例附件
                },  (res) => {
                    this.$message.success('操作成功！');
                    this.$emit('docGetList');
                    this.$emit('closePrescription');
                    this.resetCase();
                })

            },

            // 医生保存病例
            docSaveCase(imgUrl){
                // 上传附件
                console.log(imgUrl.join(","))
                this.$api.post(path.docSaveCaseNew, {
                    "id": this.docOrder.id, // 病例ID
                    "userId": this.userInfo.userId, // 用户ID
                    "complaint": this.caseData.complaint, //主诉
                    "four_method": this.caseData.four_method, // 望闻问切
                    "aeger": this.caseData.aeger, // 诊断
                    "preion": JSON.stringify(this.herbs), // 处方
                    "remark": this.caseData.remark, // 备注
                    "title": this.caseData.title, // 备注
                    "dose": this.caseData.dose, //剂量
                    "orders": this.caseData.orders, //医嘱
                    "doc_url": imgUrl.join(","),  // 病例附件
                },  (res) => {
                    this.$message.success('操作成功！');
                    this.$emit('getList');
                    this.resetCase();
                })
            },

            // 重置
            resetCase(){
                Object.keys(this.caseData).forEach( (key) => {
                    this.$set(this.caseData, key, '');
                })
                this.herbs = []; // 清空药方列表
                this.uploadFileLists = []; // 清空病例附件
                this.$refs.upload.clearFiles(); // 清空已上传的附件
            },

            // 关闭各论弹窗
            closeDialog() {
                // this.preions=[{id:'',type:'',name:'',weight:''}];
            },

            // 清空处方
            clearHerbs() {
                this.herbs = [];
            },

            // 切换tabs
            changeTabs(idx) {
                const that = this;
                this.activeId = idx;
                switch (idx) {
                    case 1:
                        that.getPreionList(1);  // 获取协议方
                        break;
                    case 2:
                        that.getPreionList(2);
                        break;
                    case 3:

                        break;
                }
            }
        },
        components: {
            'gelunDialogs_doc': gelunDialogs_doc,
            'bingliTabs': bingliTabs,
            'editBingli': editBingli,
            'brCase': brCase,
            'dropdown': dropdown,
        },
        watch: {
            // 监听类型，如果类型为 1  清空相关数据
            "typeRadio": function () {
                if (this.typeRadio == "1") {
                    this.herbs = [];
                    this.dosage = "";
                }
            },
            // 监听药材类别
            "herbsType": function () {
                const that = this;
                if (this.herbsType == '1') {
                    that.$set(that.caseData, 'title', '');
                    that.$set(that.caseData, 'remark', '');
                }

                if (this.herbsType == '2') {
                    this.herbs = [];
                }
            }
        }
    }
</script>

<style>
    .prescription_dialog .s_upload_pic {
        height: auto;
    }
    .prescription_dialog .s_upload_pic .pic_cont {
        height: auto;
    }
</style>


