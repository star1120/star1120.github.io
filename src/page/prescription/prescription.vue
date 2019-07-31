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
                        <div class="item" :class="activeName==1?'on':''" @click="changeActive(1)">处方</div>
                        <div class="item" :class="activeName==2?'on':''" @click="changeActive(2)" v-if="hideProject">病历</div>
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
                        <div class="p_info_cont" v-if="caseData">
                            <span class="avatar">
                                <img :src="caseData.memberInfo.avatar_wechat || ''" alt="">
                            </span>
                            <span style="text-align:center; margin-bottom:10px;">{{caseData.memberInfo.nickname_wechat}}</span>
                            <span><b>患者姓名：</b>{{caseData.memberInfo.realname}}</span>
                            <span><b>性别：</b>{{caseData.memberInfo.gender==1?'男':'女'}}</span>
                            <span><b>患者电话：</b>{{caseData.memberInfo.mobile}}</span>
                            <span><b>所在城市：</b>{{caseData.memberInfo.province}}-{{caseData.memberInfo.city}}</span>
                            <!-- <b>生日</b>
                            <span>{{caseData.memberInfo.birth}}</span>
                            <b>籍贯</b>
                            <span>{{caseData.memberInfo.birthplace}}</span>
                            <b>既往病史</b>
                            <span>{{caseData.memberInfo.history}}</span> -->
                        </div>
                    </div>
                    <!-- 右侧药品信息 -->
                    <div class="ui-flex-1 meta_right_box bg_cff ui-pd-5 s_p_right">
                        <div class="meta_right_box_cont ui-flex ui-flex-wrap">

                            <!-- 处方内容 -->
                            <template v-if="activeName==1">
                                <div class="ui-flex-1 ui-bdr-1 ui-pdr-5">
                                    <!-- 诊断/症状 -->
                                    <div class="ui-flex ui-flex-wrap" v-if="!showCurrentOrder">
                                        <div class="meta_title ui-flex ui-mgt-10">
                                            <div class="ui-lh-32 ui-w-60 ui-font-center">
                                                主诉:
                                            </div>
                                            <div class="ui-flex-1">
                                                <el-input type="textarea" :rows="2" size="small" v-model="caseData.complaint"></el-input>
                                            </div>
                                        </div>

                                        <div class="meta_title ui-flex ui-mgt-10">
                                            <div class=" ui-lh-32 ui-w-60 ui-font-center">
                                                刻诊:
                                            </div>
                                            <div class="ui-flex-1">
                                                <el-input size="small" v-model="caseData.diagnose"></el-input>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- 一药一量 -->
                                    <div class="ui-lh-30 ui-mgt-20 ui-flex ui-flex-wrap" v-if="!showCurrentOrder || isEdit">
                                        <div class="meta_input_select ui-mgt-2 ui-flex">
                                            <!-- <el-select v-model="herbsType" size="small" slot="prepend"
                                                       class="meta_i_select" placeholder="请选择">
                                                <el-option label="中药" value="1"></el-option>
                                                <el-option label="其他" value="2"></el-option>
                                            </el-select> -->
                                            <dropdown :getHerbData="getHerbData" v-on:getHerb="getHerb"
                                                      :herbsType="herbsType" v-on:addHerbs="addHerbs"></dropdown>

                                            <!-- <button class="layui-btn layui-btn-sm layui-btn-normal ui-mgt-2"
                                                    @click="addYaocaiVisible = true">新增药材
                                            </button> -->

                                            <el-select
                                                    v-if="false"
                                                    class="ui-flex-1"
                                                    @change="addHerbs"
                                                    v-model="dosage"
                                                    filterable
                                                    remote
                                                    size="small"
                                                    reserve-keyword
                                                    placeholder="请输入关键词"
                                                    :remote-method="remoteMethod"
                                                    :loading="loading">
                                                <el-option
                                                        v-for="item in getHerbData"
                                                        :key="item.id"
                                                        :label="item.name"
                                                        :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="ui-flex-1"></div>
                                        <div class="meta_select" v-if="!showCurrentOrder">
                                            <button class="layui-btn layui-btn-sm layui-btn-normal" @click="openGelunDialog(item.id)" v-for="(item, index) in topClass" :key="index">{{item.name}}</button>
                                        </div>
                                    </div>
                                    <div id="printTest">

                                        <el-form label-width="100px" v-if="showCurrentOrder">
                                            <el-form-item label="处方编号">
                                                <span>{{caseData.ordersn}}</span>
                                            </el-form-item>
                                            <el-form-item label="姓名" class="printShow">
                                                <span>{{caseData.memberInfo.realname}}</span>
                                            </el-form-item>
                                            <el-form-item label="性别" class="printShow">
                                                <span>{{caseData.memberInfo.gender==1?'男':'女'}}</span>
                                            </el-form-item>
                                            <el-form-item label="患者电话" class="printShow">
                                                <span>{{caseData.memberInfo.mobile}}</span>
                                            </el-form-item>
                                            <el-form-item label="状态" class="printHide">
                                                <span>{{caseData.statusStr}}</span>
                                            </el-form-item>
                                            <el-form-item label="医生诊断">
                                                <el-input v-model="caseData.diagnose" :disabled="!isEdit"></el-input>
                                            </el-form-item>
                                            <el-form-item label="医嘱">
                                                <el-input v-model="caseData.orders" :disabled="!isEdit"></el-input>
                                            </el-form-item>
                                            <el-form-item label="医生上传资料" v-if="caseData.docurl.length" class="printHide">
                                                <span class="bigImg" v-for="(url,index) in caseData.docurl" :key="index">
                                                    <img @click="uploadImgPreviewImg(url)" style="width: 100px; height: 100px;" :src="url"/>
                                                </span>
                                            </el-form-item>
                                        </el-form>
                                        <div class="printShow printH2">RP</div>
                                        <!-- 药品信息 -->
                                        <div class="meta_s_items s_p_cont ui-mgt-10" :class="{showCurrentOrderClass: showCurrentOrder}">
                                            <!-- 处方协定列表药品列表 -->
                                            <div v-if="herbsType=='1'" class="meta_item" :key="index"
                                                v-for="(item,index) in herbs">
                                                <p>{{item.name}}</p>
                                                <div class="ui-flex">
                                                    <span class="ui-pw-20">用量:</span>
                                                    <input class="ui-pw-20 ui-mgr-5" type="text" v-model="item.weight" :disabled="!isEdit">
                                                    <span>g</span>
                                                </div>
                                                <div class="ui-flex">
                                                    <span class="ui-pw-20">煎法:</span>
                                                    <input class="ui-pw-60" type="text" name="" :disabled="!isEdit">
                                                </div>
                                                <i class="fa fa-close" v-if="isEdit" @click="deleteHerbs(index)"></i>
                                            </div>

                                            <!-- 其他 -->
                                            <div v-if="herbsType=='2' && !showCurrentOrder" class="otherBox">
                                                <div class="ui-flex">
                                                    <div class="ui-w-40 ui-lh-32">标题:</div>
                                                    <el-input size="small" placeholder="请输入标题" v-model="caseData.title"
                                                            class="ui-flex-1"></el-input>
                                                </div>
                                                <div class="ui-flex ui-lh-32">内容:</div>
                                                <div class="textarea">
                                                    <el-input
                                                            v-model="caseData.remark"
                                                            type="textarea"
                                                            placeholder="请输入内容">
                                                    </el-input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- </div> -->

                                    <div class="ui-flex ui-mgt-16 ui-flex-wrap" v-if="showCurrentOrder">
                                        <div class="ui-flex-1"></div>
                                        <el-button type="primary" size="mini" class="meta_bot_btn"
                                                :style="screenWidth<=768?'margin: 5px auto;margin-left: 0;':''"
                                                @click="editCases">{{isEditText}}
                                        </el-button>
                                        <el-button type="info" size="mini" class="meta_bot_btn"
                                                :style="screenWidth<=768?'margin: 5px auto;margin-left: 0;':''" @click="print">打印
                                        </el-button>
                                        <div class="ui-flex-1"></div>
                                    </div>

                                    <!-- 添加医嘱 -->
                                    <div class="ui-h-30 ui-lh-30 ui-mgt-5 ui-mgb-5 ui-flex" v-if="!showCurrentOrder">
                                    <!--
                                        <div class="ui-flex ui-mgr-15">
                                            <span class="ui-w-40">剂量：</span>
                                            <span class="ui-w-80 ui-mgr-5">
                                                <el-input v-model="caseData.dose" size="mini" placeholder="请输入剂量"></el-input>
                                            </span>
                                            <span>剂</span>
                                        </div> 
                                    -->
                                        <div class="ui-flex-1">
                                            <span class="ui-w-60">医嘱：</span>
                                            <span class="ui-mgr-6">{{caseData.orders}}</span>
                                            <a href="javascript:;" @click="yizhuVisible=true">+添加医嘱</a>
                                        </div>
                                    </div>

                                    <!-- 底部按钮组 -->
                                    <div class="ui-flex ui-mgt-16 ui-flex-wrap" v-if="!showCurrentOrder">
                                        <div class="ui-flex-1"></div>
                                        <el-button type="primary" size="mini" class="meta_bot_btn"
                                                   :style="screenWidth<=768?'margin: 5px auto;margin-left: 0;':''"
                                                   @click="addPreionDialog = true">存为协定方
                                        </el-button>
                                        <el-button type="primary" size="mini" class="meta_bot_btn"
                                                   :style="screenWidth<=768?'margin: 5px auto;margin-left: 0;':''"
                                                   @click="saveCases">保存
                                        </el-button>
                                        <el-button type="info" size="mini" class="meta_bot_btn"
                                                   :style="screenWidth<=768?'margin: 5px auto;margin-left: 0;':''">打印
                                        </el-button>
                                        <el-button size="mini" class="meta_bot_btn"
                                                   :style="screenWidth<=768?'margin: 5px auto;margin-left: 0;':''">取消
                                        </el-button>
                                        <el-button type="danger" size="mini" class="meta_bot_btn"
                                                   :style="screenWidth<=768?'margin: 5px auto;margin-left: 0;':''"
                                                   @click="clearHerbs">清空处方
                                        </el-button>
                                        <div class="ui-flex-1"></div>
                                    </div>
                                </div>

                                <!-- 右侧内容区域 -->
                                <div class="meta_s_list">

                                    <!-- 上传图片 -->
                                    <div class="s_upload_pic">
                                        <div class="pic_title">
                                            患者上传资料
                                        </div>
                                        <div class="pic_cont">
                                            <span class="bigImg" v-for="(url,index) in caseData.patienturl" :key="index">
                                                <img @click="uploadImgPreviewImg(url)" style="width: 100px; height: 100px;" :src="url"/>
                                            </span>
                                            </br>
                                            </br>
                                            <div>患者主诉：{{caseData.complaint}}</div>
                                            
                                            <!-- <el-upload
                                                    ref="upload"
                                                    :action="uploadFileUrl"
                                                    list-type="picture-card"
                                                    name="zy_image"
                                                    :on-preview="uploadImgPreview"
                                                    :on-remove="uploadImgRemove"
                                                    :on-success="uploadSuccess"
                                                    :on-error="uploadError"
                                            >
                                                <i class="el-icon-plus"></i>
                                            </el-upload> -->
                                        </div>
                                    </div>
                                    

                                    <!-- 上传图片 -->
                                    <div class="s_upload_pic" v-if="!showCurrentOrder">
                                        <div class="pic_title">
                                            医生上传资料
                                        </div>
                                        <div class="pic_cont">
                                            <el-upload
                                                    ref="upload"
                                                    :action="uploadFileUrl"
                                                    list-type="picture-card"
                                                    name="zy_image"
                                                    :on-preview="uploadImgPreview"
                                                    :on-remove="uploadImgRemove"
                                                    :on-success="uploadSuccess"
                                                    :on-error="uploadError"
                                            >
                                                <i class="el-icon-plus"></i>
                                            </el-upload>
                                        </div>
                                    </div>

                                    <!-- 选项卡 -->
                                    <div class="ui-flex s_items ui-mgt-10 ui-pdl-10 ui-bdb-1" v-if="!showCurrentOrder" >
                                        <div class="item" :class="activeId==2?'on':''" @click="changeTabs(2)" id="siren">协定处方</div>
                                        <div class="item" :class="activeId==1?'on':''" @click="changeTabs(1)" id="doc">公共协定方</div>
                                    </div>
                                    
                                    <div class="ui-pdt-10 s_p_lists ui-bdb-1" v-if="!showCurrentOrder" id="choose">
                                        <!-- 协定处方 -->
                                        <div class="agreementPrescription" v-if="activeId==2">

                                            <el-input class="selectPreion" v-model="selectPreionKey_2" size="small"></el-input>
                                            <ul>
                                                <li class="ui-flex" v-for="(item, index) in agreementPartyLists" :key="index"><i
                                                        class="fa fa-medkit ui-w-18 ui-mgt-10 ui-mgl-5"></i><span
                                                        class="ui-pw-75 ui-ellipsis">{{item.name}}</span><span
                                                        class="ui-flex-1"></span>

                                                        <a href="javascript:;" class="ui-w-40" @click="delPreionListData(item.id)">删除</a>
                                                        <a href="javascript:;" class="ui-w-40" @click="getPreionListData(item.id,2)">载入</a>
                                                </li>
                                                <li>
                                                	<pages ref="pages" v-on:getList="getPreionListPage" v-if="total" :total="total"></pages>
                                                </li>
                                            </ul>
                                        </div>

                                        <!-- 历史处方 -->
                                        <div class="agreementPrescription" v-if="activeId==1 && !showCurrentOrder">
                                            <el-input class="selectPreion" v-model="selectPreionKey_1" size="small"></el-input>
                                            <ul>
                                                <li class="ui-flex" v-for="(item, index) in agreementPartyListsAll" :key="index">
                                                    <i class="fa fa-medkit ui-w-18 ui-mgt-10 ui-mgl-5"></i>
                                                    <span class="ui-pw-75 ui-ellipsis">{{item.name}}</span>
                                                    <span class="ui-flex-1"></span>

                                                    <!-- <a href="javascript:;" class="ui-w-40" @click="delPreionListData(item.id)" v-if="userInfo.userType==1">删除</a> -->
                                                    <a href="javascript:;" class="ui-w-40" @click="getPreionListData(item.id,1)">载入</a>
                                                </li>
                                                <li>
                                                	<pages ref="pages" v-on:getList="getPreionListPage" v-if="total" :total="total"></pages>
                                                </li>
                                            </ul>
                                        </div>

                                        <!--<div class="pages">
                                            <pages ref="pages" v-on:getList="getPreionListPage" v-if="total" :total="total"></pages>
                                        </div>-->
                                    </div>
                                </div>
                            </template>

                            <!-- 病例内容 -->
                            <template v-if="activeName==2">
                                <!-- 病例选项卡 -->
                                <bingliTabs ref="bingliTabs"
                                            v-on:getCaseDetial="getCaseDetial"
                                            v-on:uploadImgPreviewImg="uploadImgPreviewImg"></bingliTabs>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 各论 弹窗 -->
        <el-dialog
                title="各论"
                :visible.sync="gelunDialogVisible"
                :width="gelunDialogWidth"
                @close="closeDialog"
        >
            <gelunDialogs_doc ref="gelunDialogs_doc" :topId="topId" :herbs="herbs" v-on:getChildData="getChildData"></gelunDialogs_doc>
        </el-dialog>

        <!-- 编辑病人病例信息 -->
        <el-dialog
                title="提示"
                :visible.sync="bingliDialogVisible"
                @close="closeBingliDialog"
                width="550px">
            <editBingli :patientData="patientData" :isEdit="true"
                        v-on:closeBingliDialog="closeBingliDialog"></editBingli>
        </el-dialog>

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

        <!-- 新增药材 -->
        <el-dialog
                title="新增药材"
                :visible.sync="addYaocaiVisible"
                width="300px">
            <div class="ui-flex">
                <div class="ui-w-100 ui-lh-32">药材名称：</div>
                <el-input size="small" v-model="yaocai"></el-input>
            </div>

            <div class="dialog-footer ui-flex ui-mgt-20 ui-pdb-20">
                <div class="ui-flex-1"></div>
                <el-button size="small" @click="addYaocaiVisible = false">取消</el-button>
                <el-button size="small" type="primary" @click="addYaocai">确认</el-button>
            </div>
        </el-dialog>

        <el-dialog
                title="提示"
                :visible.sync="addPreionDialog"
                width="300px">
            <div class="ui-flex">
                <el-input size="small" v-model="savePreionData.name" placeholder="请输入协议方名称："></el-input>
            </div>
            <div class="ui-flex">
                <el-input size="small" style="margin-top:10px; min-height:50px;" v-model="savePreionData.description" type="textarea" placeholder="请输入协议方备注"></el-input>
            </div>
            <div class="dialog-footer ui-flex ui-mgt-20 ui-pdb-20">
                <div class="ui-flex-1"></div>
                <el-button size="small" @click="addPreionDialog = false">取消</el-button>
                <el-button size="small" type="primary" @click="savePreion">确认</el-button>
            </div>
        </el-dialog>

        <!-- 上传图片-查看大图 -->
        <el-dialog title="查看大图" width="80%" :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
            <div class="ui-pdb-20"></div>
        </el-dialog>

    </div>
</template>

<script>
    import path from "../../service/path";
    import pages from '../components/pages.vue';
    import gelunDialogs_doc from './gelunDialogs_doc.vue';
    import bingliTabs from './bingliTabs.vue';
    import editBingli from './editBingli.vue';
    import brCase from './brCase.vue';
    import dropdown from './dropdown.vue';
    import printJS from 'print-js';


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
                activeId: 2,
                tabsLists: [], // 历史处方  协定处方 参考 列表
                savePreionData: {},
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
                    diagnose: "", // 诊断
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
                openid:'',
                selectPreionKey_1:'',
                selectPreionKey_2:'',
                isEdit: false,
                isEditText: '编辑',
                addPreionDialog: false,
                total: 0
            };
        },
        props: ['rowCase','docOrder'],
        created() {
            this.caseData = {}
            this.caseData.complaint = this.docOrder.complaint || ''
            this.caseData.patienturl = this.docOrder.patienturl || ''
            // 初始化，通过判断屏幕的宽度，确定个人信息是否展示
            if (this.screenWidth <= 1024) {
                this.barsShow = true;
                this.gelunDialogWidth = '98%';
            } else {
                this.barsShow = false;
                this.gelunDialogWidth = '800px';
            }
            // 获取列表
            this.$api.get(path.getTopClass, {}, (res) => {
                this.topClass = res
            })

            // 5、获取协定方
            this.getPreionList(1);
            this.getPreionList(2);

            // 6、获取患者信息
            this.getPatientInfo();

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
            getCaseDetial(id, status, fn){
                this.activeName=1;
                this.isEditText = '编辑'
                this.isEdit = false
                this.showCurrentOrder = status
                this.$api.post(path.getOrderDetail,{
                    id:id,
                },(res) => {
                    this.caseData = res
                    this.herbs = res.preion || []
                    if(fn){
                        fn()
                    }
                })
            },

            getOrderByOpenid(id, fn){
                var that = this
                this.$api.get(path.onePatientList,{
                    openid:id,
                },(res) => {
                    this.getCaseDetial(res.data[0].id, false, ()=>{
                        this.activeName=2;
                    })
                })
            },


            // 顶部 切换选项卡
            changeActive(index, state) {
                var that = this
                this.activeName = index;
                if (index == 2) {
                    setTimeout(() => {
                        that.$refs.bingliTabs.getCaseByPatient(this.docOrder.openid); // 获取某一个病人的所有病例
                        this.caseData = {}
                    }, 200)
                }

                if(state){
                    this.isEdit = true
                }
            },

            // 关闭处方弹窗
            closePrescription() {
                this.$emit('closePrescription');
            },


            // 获取子组件数据
            getChildData(item) {
                this.gelunDialogVisible = item;
            },

            // 打开各论弹窗
            openGelunDialog(id) {
                const that = this;
                this.topId = id;
                this.gelunDialogVisible = true;
                setTimeout(function () {
                    that.$refs.gelunDialogs_doc.getClass();
                }, 200)
            },

            // 纸质病历/拍照 上传图片保存
            // 删除图片
            uploadImgRemove(file, fileList) {
                this.uploadFileLists = fileList; // 已上传列表图片地址
            },
            // 查看大图
            uploadImgPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            // 查看大图
            uploadImgPreviewImg(src) {
                this.dialogImageUrl = src;
                this.dialogVisible = true;
            },
            // 上传成功
            uploadSuccess(res, file, fileList) {
                this.uploadFileLists = fileList; // 已上传列表图片地址
            },

            // 上传失败
            uploadError() {
                this.$message.error('图片上传失败');
            },

            // 6、获取患者信息
            getPatientInfo() {
                const that = this;
                that.$api.get(path.getPatientInfo, {
                    "userId": this.userInfo.userId,
                }, function (res) {
                    // 保存患者信息
                    Object.keys(res.data[0]).forEach(function (key) {
                        that.$set(that.patientData, key, res.data[0][key])
                    })
                })
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

            getPreionListPage({pageNo = 1, pageSize = 10} = {}){
                var test = document.getElementById('doc').getAttribute('class');
                var type = 1;
                if(test == 'item on'){
                    type = 1;
                }else{
                    type = 2;
                }
                this.$api.get(path.getPreionList, {
                    "name": type==1?this.selectPreionKey_1:this.selectPreionKey_2,
                    "isLike": 1,
                    "type": type,
                    "pageNo": pageNo,
                    "pageSize": pageSize
                }, (res) => {
                    type==2?this.agreementPartyLists = res.data:this.agreementPartyListsAll = res.data
                    this.total = res.total
                })
            },
            // 5、获取协定方
            getPreionList(type) {
                this.$api.get(path.getPreionList, {
                    "name": type==1?this.selectPreionKey_1:this.selectPreionKey_2,
                    "isLike": 1,
                    "type": type,
                    "pageNo": 1,
                    "pageSize": 10
                }, (res) => {
                    type==2?this.agreementPartyLists = res.data:this.agreementPartyListsAll = res.data
                    this.total = res.total
                })
            },
            //删除协定方
            delPreionListData(id){
                var that = this
                that.$confirm('此操作将永久删除协议方, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$api.post(path.docDelPreion, {
                        "id": id,
                    }, (res) => {
                        that.getPreionList(2);
                    })
                }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                
            },
            // 通过协定方获取列表数据
            
            getPreionListData(id,type) {
                const that = this;
                let arr = type==2?this.agreementPartyLists:this.agreementPartyListsAll
                arr.forEach(value => {
                    if (value.id == id) {
                        if(that.herbs){
                            JSON.parse(value.preion).forEach((item)=>{
                                that.herbs.push(item)
                            })
                        }else{
                            that.herbs = JSON.parse(value.preion)
                        }
                    }
                })
            },

            // 4、新增或保存协定方
            savePreion() {
                this.$api.post(path.savePreion, {
                    "id": "",
                    "name": this.savePreionData.name,
                    "description": this.savePreionData.description,
                    "list": JSON.stringify(this.herbs),
                    "type": 2
                },  (res) => {
                    this.$message.success('操作成功！');
                    this.getPreionList(1);  // // 5、获取协定方
                    this.herbs = [];
                    this.addPreionDialog = false
                })
            },

            // 6、保存一个病人的病例
            saveCases() {
                let imgUrl = [];
                // 处理附件图片
                this.uploadFileLists.forEach( (value) => {
                    imgUrl.push(value.response.data)
                })

                // 医生
                if(this.userInfo.userType==0 || this.userInfo.userType==1){
                    this.docSaveCase(imgUrl);
                    return
                }

            },
            editCases(){
                if(this.isEditText == '保存'){
                    this.isEditText = '编辑'
                    this.docSaveCase(this.caseData.docurl)
                }else{
                    this.isEdit = true;
                    this.isEditText = '保存'
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
                this.$api.post(path.docSaveCaseNew, {
                    "id": this.docOrder.id, // 病例ID
                    "userId": this.userInfo.userId, // 用户ID
                    "complaint": this.caseData.complaint, //主诉
                    "four_method": this.caseData.four_method, // 望闻问切
                    "aeger": this.caseData.diagnose, // 诊断
                    "preion": JSON.stringify(this.herbs), // 处方
                    "remark": this.caseData.remark, // 备注
                    "title": this.caseData.title, // 备注
                    "dose": this.caseData.dose, //剂量
                    "orders": this.caseData.orders, //医嘱
                    "doc_url": imgUrl?imgUrl.join(","):'',  // 病例附件
                },  (res) => {
                    this.$message.success('操作成功！');
                    this.$emit('getList');
                    this.changeActive(2);
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

            print(){

                const style = `@page { }
                .printShow {
                    display:block!important;
                }
                .printHide {
                    display:none!important;
                }
                .el-form-item {
                    overflow: hidden;
                }
                .el-input__inner {
                    border:none!important;
                }
                .el-form-item__label {
                    text-align: right;
                    float: left;
                    font-size: 14px;
                    color: #606266;
                    line-height: 40px;
                    padding: 0 12px 0 0;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                }
                .el-form-item__content {
                    line-height: 40px;
                    position: relative;
                    font-size: 14px;
                }
                .meta_s_items {
                    overflow:hidden;
                }
                .meta_item {
                    float:left;
                    margin-left: 20px;
                }
                .ui-flex span {
                    float: left;
                }
                .meta_item input {
                    border:none;
                    width: 20px;
                    float:left;
                }
    
                `
                printJS({
                    printable: "printTest", //要打印内容的id
                    type: "html",
                    style: style,
                    css:"https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css",
                    scanStyles: false
                });
            },

            // 切换tabs
            changeTabs(idx) {
                const that = this;
                this.activeId = idx;
                that.getPreionList(idx); 
            }
        },
        components: {
            'pages': pages,
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
            "selectPreionKey_1": function(){
                const that = this;
                setTimeout(function () {
                    that.getPreionList(1)
                }, 200)
            },
            "selectPreionKey_2": function(){
                const that = this;
                setTimeout(function () {
                    that.getPreionList(2)
                }, 200)
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

<style scoped>
    .prescription_dialog .s_upload_pic {
        height: auto;
    }
    .prescription_dialog .s_upload_pic .pic_cont {
        height: auto;
    }
    .selectPreion {
        width: 80%;
        margin : 10px;
    }
    .p_info_cont {
        line-height: 25px!important;
        padding:0 10px!important; 
    }
    .p_info_cont .avatar, .p_info_cont .avatar img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .prescription_dialog .p_info .p_info_cont span {
        padding-left: 0;
    }
    .p_info_cont .avatar {
        text-align: center;
        width: 100%;
        margin: 10px 0;
    }
    .el-form {
        display: flex;
        flex-direction: column;
        width: 300px;
    }
    .el-form-item {
        margin: 5px 0;
       
    }
    .printShow {
        display:none;
    }
    .showCurrentOrderClass {
        overflow-y: auto!important;
        height: auto!important;
    }
    
</style>


<style>
    .el-input.is-disabled .el-input__inner {
        border: none;
        background: none;
    }
    .prescription_dialog .p_info .p_info_cont b {
        margin-left: 0;
    }
    #choose{
    	height: 70%;
    }
</style>