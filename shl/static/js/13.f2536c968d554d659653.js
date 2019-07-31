webpackJsonp([13],{

/***/ 558:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(790)
}
var Component = __webpack_require__(215)(
  /* script */
  __webpack_require__(748),
  /* template */
  __webpack_require__(819),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-422402ab",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 568:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    addHerb: '/Zy/addHerb', // 添加中药
    getHerb: '/Zy/getHerb', // 查询中药
    delHerb: '/Zy/delHerb', // 删除中药
    saveHerb: '/Zy/saveHerb', // 修改中药
    savePreion: '/Zy/savePreion', // 新增或保存协定方
    getPreionList: '/Zy/getPreionList', // 获取协定方
    getCaseByPatient: '/Zy/getCaseByPatient', // 6、获取某一个病人的所有病例

    delPatient: '/Zy/delPatient', // 删除病患  -- 


    addClass: '/Zy/addClass', // 添加分类
    delClass: '/Zy/delClass', // 删除分类
    saveClass: '/Zy/saveClass', // 修改分类信息
    getClassByTop: '/Zy/getClassByTop', // 获取所有分类
    savePreionByClass: '/Zy/savePreionByClass', // 根据疾病设置增减药材
    getPreionByClass: '/Zy/getPreionByClass', // 根据分类获取增删的处方
    saveCase: '/Zy/saveCase', // 保存一个病人的病例
    delCase: '/Zy/delCase', // 删除病例

    docDelPreion: '/Zy/docDelPreion', //删除协议方

    addAdminUser: '/Zy/addAdminUser', // 新增管理员
    // editAdminUser:'/Zy/editAdminUser', // 编辑管理员
    delAdminUser: '/Zy/delAdminUser', // 删除管理员
    adminUserList: '/Zy/allDocList', // 管理员列表

    uploadFile: '/Zy/uploadFile', // 上传图片

    docLogin: '/Zy/docLogin', // 登录接口

    getTopClass: '/Zy/getTopClass', // 顶级分类


    //医生系统

    allPatientList: '/Zy/patientList', // 管理员查询患者列表
    // 看病记录
    docGetList: '/Zy/docGetList', // 医生查询自己的看病记录

    // 未开方列表
    docGetCase: '/Zy/docOrderList', // 医生获取可接单列表 
    // docGetCase:'/Zy/docGetCase', // 医生获取可接单列表 （患者远程已支付过诊费的且未开方的）
    docGetCaseById: '/Zy/docGetCaseById', // 医生获取可接单列表 （患者远程已支付过诊费的且未开方的）
    docSaveCase: '/Zy/docSaveCase', // 医生针对患者的主诉
    docChangeCase: '/Zy/docChangeCase', // 医生遇到的病人转给别的医生进行看病开方

    docSaveCaseNew: '/Zy/docSaveCaseNew',

    // 我的患者
    patientList: '/Zy/patientList', // 医生获取自己的病人列表
    getPatientInfo: '/Zy/getPatientInfo', // 获取患者信息
    savePatientInfo: '/Zy/savePatientInfo', // 修改病患信息
    // onePatientList: '/Zy/onePatientList', // 医生查看某一个患者的就诊记录（该患者在此医生下的所有看病记录）
    onePatientList: '/Zy/getOrderByOpenid', // 医生查看某一个患者的就诊记录（该患者在此医生下的所有看病记录）


    // 完善医生信息
    editAdminUser: '/Zy/editAdminUser', // 医生完善信息
    getDocInfo: '/Zy/getDocInfo', // 获取医生详细信息


    // 面对面看病
    addPatient: '/Zy/addPatient', // 添加病患  --


    //患者系统
    patientReg: '/Zy/patientReg', // 患者注册
    patientLogin: '/Zy/patientLogin', // 患者登陆接口
    patientGetCase: '/Zy/patientGetCase', // 患者获取自己的看病记录 包括付款的和未付款的
    patientGetCaseById: '/Zy/patientGetCaseById', // 患者或医生根据病例ID获取病例详情
    getOrderDetail: '/Zy/getOrderDetail', // 患者或医生根据病例ID获取病例详情
    patientSaveCase: '/Zy/patientSaveCase', // 患者填写主诉


    //  管理员系统
    // allPatientList: '/Zy/allPatientList', // 管理员查询患者列表
    manageGetUser: '/Zy/manageGetUser', // 管理员查询患者列表
    allCase: '/Zy/allCase', // 管理员获取所有的病例列表
    manageOrderList: '/Zy/manageOrderList'

});

/***/ }),

/***/ 748:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_path__ = __webpack_require__(568);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            ruleForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            },

            isLogin: true,
            radio: '2',
            userInfo: JSON.parse(localStorage.getItem("userInfo"))
        };
    },
    mounted() {
        window.location.href = window.location.href;
    },
    created() {
        window.location.href = window.location.href;
        console.log(this.$route.path.replace('/login/:id=', ''));
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
                this.$set(this.ruleForm, key, '');
            });
        },

        checkPhone(phone) {
            if (!/^1[3456789]\d{9}$/.test(phone)) {
                this.$message.error("手机号码有误，请重填");
                return false;
            }
        },

        // 登陆  注册
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                // 医生登录
                if (valid && this.isLogin && this.radio == '2' && !this.checkPhone(this.ruleForm.username)) {
                    console.log('登录');

                    this.$api.post(__WEBPACK_IMPORTED_MODULE_0__service_path__["a" /* default */].docLogin, {
                        "username": this.ruleForm.username,
                        "password": this.ruleForm.password
                    }, res => {
                        this.$message.success('操作成功！');
                        console.log(typeof res.is_admin);
                        localStorage.setItem('userInfo', JSON.stringify({
                            userId: res.id,
                            userName: this.ruleForm.username,
                            userType: res.is_admin
                        }));
                        this.$router.push('/index');
                        console.log(JSON.parse(localStorage.getItem("userInfo")));
                    });
                    return;
                }
                // 医生注册
                if (valid && !this.isLogin && this.radio == '2' && !this.checkPhone(this.ruleForm.username)) {
                    console.log('注册');
                    this.$api.post(__WEBPACK_IMPORTED_MODULE_0__service_path__["a" /* default */].addAdminUser, {
                        "username": this.ruleForm.username,
                        "password": this.ruleForm.password
                    }, res => {
                        this.$message.success('操作成功！');
                        this.isLogin = !this.isLogin; // 返回登录窗口
                    });

                    return;
                }

                // 患者注册
                if (valid && !this.isLogin && this.radio == '1' && !this.checkPhone(this.ruleForm.username)) {
                    console.log('注册');
                    this.$api.post(__WEBPACK_IMPORTED_MODULE_0__service_path__["a" /* default */].patientReg, {
                        "username": this.ruleForm.username,
                        "password": this.ruleForm.password,
                        "doc_id": this.docId
                    }, res => {
                        this.$message.success('操作成功！');
                        this.isLogin = !this.isLogin; // 返回登录窗口
                    });

                    return;
                }

                // 患者登录
                if (valid && this.isLogin && this.radio == '1' && !this.checkPhone(this.ruleForm.username)) {
                    console.log('登录');
                    this.$api.post(__WEBPACK_IMPORTED_MODULE_0__service_path__["a" /* default */].patientLogin, {
                        "username": this.ruleForm.username,
                        "password": this.ruleForm.password
                    }, res => {
                        this.$message.success('操作成功！');
                        localStorage.setItem('userInfo', JSON.stringify({
                            userId: res.id,
                            userName: this.ruleForm.username,
                            userType: res.is_admin
                        }));
                        this.$router.push('/index');
                        console.log(JSON.parse(localStorage.getItem("userInfo")));
                    });
                    return;
                }
            });
        }
    },
    watch: {
        $route() {}
    }
});

/***/ }),

/***/ 768:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(548)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 790:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(768);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(549)("6d85aebd", content, true, {});

/***/ }),

/***/ 819:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "login-bg"
  }, [_c('div', {
    staticClass: "login"
  }, [(_vm.isLogin) ? _c('div', {
    staticClass: "message"
  }, [_vm._v("登录")]) : _vm._e(), _vm._v(" "), (!_vm.isLogin) ? _c('div', {
    staticClass: "message"
  }, [_vm._v("注册")]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "ui-mgt-20"
  }, [_c('el-radio', {
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "label": "2"
    },
    model: {
      value: (_vm.radio),
      callback: function($$v) {
        _vm.radio = $$v
      },
      expression: "radio"
    }
  }, [_vm._v(_vm._s(_vm.isLogin ? '医生登录' : '医生注册'))])], 1), _vm._v(" "), (_vm.isLogin) ? _c('div', [_c('el-form', {
    ref: "ruleForm",
    staticClass: "demo-ruleForm ui-mgt-30",
    attrs: {
      "model": _vm.ruleForm,
      "rules": _vm.rules,
      "label-width": "0px"
    }
  }, [_c('el-form-item', {
    attrs: {
      "prop": "username"
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "username"
    },
    model: {
      value: (_vm.ruleForm.username),
      callback: function($$v) {
        _vm.$set(_vm.ruleForm, "username", $$v)
      },
      expression: "ruleForm.username"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "prop": "password"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "password",
      "placeholder": "password"
    },
    nativeOn: {
      "keyup": function($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) { return null; }
        return _vm.submitForm('ruleForm')
      }
    },
    model: {
      value: (_vm.ruleForm.password),
      callback: function($$v) {
        _vm.$set(_vm.ruleForm, "password", $$v)
      },
      expression: "ruleForm.password"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "login-btn"
  }, [_c('el-button', {
    staticClass: "ui-pw-100",
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        return _vm.submitForm('ruleForm')
      }
    }
  }, [_vm._v("登录")])], 1), _vm._v(" "), _c('p', {
    staticClass: "ui-lh-40 ui-font-right"
  }, [_vm._v("还没有账号，"), _c('a', {
    attrs: {
      "href": "javascript:;"
    },
    on: {
      "click": _vm.register
    }
  }, [_vm._v("立即注册")])])], 1)], 1) : _vm._e(), _vm._v(" "), (!_vm.isLogin) ? _c('div', [_c('el-form', {
    ref: "ruleForm",
    staticClass: "demo-ruleForm ui-mgt-30",
    attrs: {
      "model": _vm.ruleForm,
      "rules": _vm.rules,
      "label-width": "0px"
    }
  }, [_c('el-form-item', {
    attrs: {
      "prop": "username"
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "username"
    },
    model: {
      value: (_vm.ruleForm.username),
      callback: function($$v) {
        _vm.$set(_vm.ruleForm, "username", $$v)
      },
      expression: "ruleForm.username"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "prop": "password"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "password",
      "placeholder": "password"
    },
    nativeOn: {
      "keyup": function($event) {
        if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) { return null; }
        return _vm.submitForm('ruleForm')
      }
    },
    model: {
      value: (_vm.ruleForm.password),
      callback: function($$v) {
        _vm.$set(_vm.ruleForm, "password", $$v)
      },
      expression: "ruleForm.password"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "login-btn"
  }, [_c('el-button', {
    staticClass: "ui-pw-100",
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        return _vm.submitForm('ruleForm')
      }
    }
  }, [_vm._v("注册")])], 1), _vm._v(" "), _c('p', {
    staticClass: "ui-lh-40 ui-font-right"
  }, [_vm._v("已有账号，"), _c('a', {
    attrs: {
      "href": "javascript:;"
    },
    on: {
      "click": function($event) {
        _vm.isLogin = !_vm.isLogin
      }
    }
  }, [_vm._v("返回登录")])])], 1)], 1) : _vm._e(), _vm._v(" "), _c('p', {
    staticClass: "ui-lh-32"
  }, [_vm._v("Tips : 请正确填写用户名和密码。")])])])
},staticRenderFns: []}

/***/ })

});