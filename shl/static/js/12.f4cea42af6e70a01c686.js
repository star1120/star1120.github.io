webpackJsonp([12],{

/***/ 551:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(789)
}
var Component = __webpack_require__(215)(
  /* script */
  __webpack_require__(739),
  /* template */
  __webpack_require__(818),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-421aba05",
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

/***/ 696:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(701)
}
var Component = __webpack_require__(215)(
  /* script */
  __webpack_require__(699),
  /* template */
  __webpack_require__(702),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 699:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      screenWidth: document.body.clientWidth, // 这里是给到了一个默认值 （这个很重要）
      pagingTion: {
        pageNo: 1,
        pageSize: 10
      }

    };
  },
  props: ['total'],
  computed: {
    layout: function () {
      // 初始化，通过判断屏幕的宽度，确定个人信息是否展示
      if (this.screenWidth <= 640) {
        return "prev, next, jumper";
      } else {
        return "prev, pager, next, jumper";
      }
    }
  },
  created() {
    const that = this;
    console.log(that.total);
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 重置分页
    resetPages() {
      this.pagingTion = {
        pageNo: 1,
        pageSize: 10
      };
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagingTion.pageNo = val;
      this.$emit('getList', this.pagingTion);
    }
  }

});

/***/ }),

/***/ 700:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(548)(false);
// imports


// module
exports.push([module.i, ".el-pager li.active{color:#409eff}", ""]);

// exports


/***/ }),

/***/ 701:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(700);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(549)("66234e15", content, true, {});

/***/ }),

/***/ 702:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-pagination', {
    attrs: {
      "current-page": _vm.pagingTion.pageNo,
      "page-size": _vm.pagingTion.pageSize,
      "layout": _vm.layout,
      "total": _vm.total
    },
    on: {
      "size-change": _vm.handleSizeChange,
      "current-change": _vm.handleCurrentChange
    }
  })
},staticRenderFns: []}

/***/ }),

/***/ 734:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
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




var title = [];
/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      barsShows: false,
      barsShow: true,
      screenWidth: document.body.clientWidth, // 这里是给到了一个默认值 （这个很重要）
      userInfo: JSON.parse(localStorage.getItem("userInfo"))
    };
  },
  created() {
    const that = this;
    // 初始化，通过判断屏幕的宽度，确定个人信息是否展示
    if (this.screenWidth <= 1024) {
      this.barsShow = false;
      this.barsShows = true;
    } else {
      this.barsShow = true;
    }
  },
  computed: {
    nowUrl() {
      return this.$route.path.replace("/", "");
    }
  },

  methods: {},
  watch: {
    $route() {
      if (JSON.parse(localStorage.getItem("userInfo"))) {
        this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        console.log(typeof this.userInfo.userType);
      }
    }
  }
});

/***/ }),

/***/ 735:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(548)(false);
// imports


// module
exports.push([module.i, "ul.top_nav{overflow:hidden}ul.top_nav li{float:left;font-size:14px;margin:10px 20px 10px 0}ul.top_nav li i{margin-right:5px}", ""]);

// exports


/***/ }),

/***/ 736:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(735);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(549)("23052799", content, true, {});

/***/ }),

/***/ 737:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(736)
}
var Component = __webpack_require__(215)(
  /* script */
  __webpack_require__(734),
  /* template */
  __webpack_require__(738),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 738:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "nav_right ui-flex-1"
  }, [_c('ul', {
    staticClass: "top_nav"
  }, [(_vm.userInfo.userType == 0 || _vm.userInfo.userType == 1) ? _c('li', {
    class: _vm.nowUrl == 'allPatient' ? 'ac' : ''
  }, [_c('router-link', {
    attrs: {
      "to": "allPatient"
    }
  }, [_c('i', {
    staticClass: "fa fa-address-book-o"
  }), _vm._v("患者列表\n      ")])], 1) : _vm._e(), _vm._v(" "), (_vm.userInfo.userType == 1) ? _c('li', {
    class: _vm.nowUrl == 'adminMana' ? 'ac' : ''
  }, [_c('router-link', {
    attrs: {
      "to": "adminMana"
    }
  }, [_c('i', {
    staticClass: "fa fa-address-book-o"
  }), _vm._v("医生列表\n      ")])], 1) : _vm._e(), _vm._v(" "), (_vm.userInfo.userType == 0 || _vm.userInfo.userType == 1) ? _c('li', {
    class: _vm.nowUrl == 'prescribed' ? 'ac' : ''
  }, [_c('router-link', {
    attrs: {
      "to": "prescribed"
    }
  }, [_c('i', {
    staticClass: "fa fa-address-book-o"
  }), _vm._v("已开方列表\n      ")])], 1) : _vm._e(), _vm._v(" "), (_vm.userInfo.userType == 0 || _vm.userInfo.userType == 1) ? _c('li', {
    class: _vm.nowUrl == 'unprescribed' ? 'ac' : ''
  }, [_c('router-link', {
    attrs: {
      "to": "unprescribed"
    }
  }, [_c('i', {
    staticClass: "fa fa-address-book-o"
  }), _vm._v("未开方列表\n      ")])], 1) : _vm._e()])])
},staticRenderFns: []}

/***/ }),

/***/ 739:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_path__ = __webpack_require__(568);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_pages_vue__ = __webpack_require__(696);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_pages_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_pages_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_top_nav_vue__ = __webpack_require__(737);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_top_nav_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_top_nav_vue__);
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
      screenWidth: document.body.clientWidth, // 这里是给到了一个默认值 （这个很重要）
      // 以上为临时绑定变量
      ruleForm: {
        username: '',
        password: ''
      },
      adminUserLists: [], // 所有患者
      searchData: '', // 患者检索字段
      adminDialogVisible: false, // 管理员信息  弹窗
      patientId: '', // 当前患者id
      isEdit: '', // 是否编辑
      total: null // 总条数
    };
  },
  created() {
    // 6、管理员列表
    this.adminUserList();
  },
  methods: {
    // 获取管理员列表
    adminUserList({ pageNo = 1, pageSize = 10 } = {}) {
      const that = this;
      this.$api.get(__WEBPACK_IMPORTED_MODULE_0__service_path__["a" /* default */].adminUserList, {
        "username": that.searchData,
        "pageNo": pageNo,
        "pageSize": pageSize
      }, function (res) {
        that.adminUserLists = res.data;
        that.total = res.totalCount;
      });
    },

    // 删除管理员
    delAdminUser(row) {
      const that = this;
      that.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(2);
        that.$api.post(__WEBPACK_IMPORTED_MODULE_0__service_path__["a" /* default */].delAdminUser, {
          "id": row.id // 用户ID
        }, function (res) {
          that.$message.success('操作成功！');
          that.adminUserList();
        });
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // 新增管理员
    addAdmin() {
      const that = this;
      that.$api.post(__WEBPACK_IMPORTED_MODULE_0__service_path__["a" /* default */].addAdminUser, {
        "username": that.ruleForm.username,
        "password": that.ruleForm.password,
        "openid": that.ruleForm.openid
      }, function (res) {
        that.$message.success('操作成功！');
        that.adminDialogVisible = false;
      });
    },

    // 编辑管理员
    editAdmin() {
      const that = this;
      that.$api.post(__WEBPACK_IMPORTED_MODULE_0__service_path__["a" /* default */].editAdminUser, {
        "id": that.patientId,
        "name": that.ruleForm.username,
        "password": that.ruleForm.password,
        "openid": that.ruleForm.openid
      }, function (res) {
        that.$message.success('操作成功！');
        that.adminDialogVisible = false;
      });
    },

    // 关闭编辑个人病历信息 弹窗
    closeAdminDialog() {
      const that = this;
      this.adminDialogVisible = false;
      this.$refs.pages.resetPages(); // 重置分页数据
      this.adminUserList(); // 获取列表数据
      Object.keys(that.ruleForm).forEach(function (key) {
        that.$set(that.ruleForm, key, '');
      });
    },

    // 打开编辑弹窗
    edit(row) {
      const that = this;
      this.adminDialogVisible = true;
      this.isEdit = true; // 新增
      that.patientId = row.id; // 患者ID
      Object.keys(row).forEach(function (key) {
        that.$set(that.ruleForm, key, row[key]);
      });
    },

    // 打开新增弹窗
    addPaitent() {
      const that = this;
      this.adminDialogVisible = true;
      this.isEdit = false; // 新增
    }

  },
  components: {
    'pages': __WEBPACK_IMPORTED_MODULE_1__components_pages_vue___default.a,
    VTop: __WEBPACK_IMPORTED_MODULE_2__components_top_nav_vue___default.a
  },

  watch: {
    // 检索狂自动搜索
    "searchData": function () {
      const that = this;
      setTimeout(function () {
        that.adminUserList();
      }, 200);
    }
  }
});

/***/ }),

/***/ 767:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(548)(false);
// imports


// module
exports.push([module.i, ".myPatient[data-v-421aba05]{position:relative;padding-bottom:0;height:100%}.myPatient i[data-v-421aba05]{font-size:12px;color:#999}.myPatient .pages[data-v-421aba05]{position:absolute;bottom:0;right:0}", ""]);

// exports


/***/ }),

/***/ 789:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(767);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(549)("1a76eb4e", content, true, {});

/***/ }),

/***/ 818:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "myPatient"
  }, [_c('v-top'), _vm._v(" "), _c('div', {
    staticClass: "ui-flex"
  }, [_vm._v("\n    管理员列表\n  ")]), _vm._v(" "), _c('div', {
    staticClass: "ui-flex ui-flex-wrap ui-mgt-15 ui-mgb-15"
  }, [_c('div', {
    staticClass: "ui-w-160 ui-mgr-6"
  }, [_c('el-input', {
    attrs: {
      "size": "mini",
      "placeholder": "姓名/手机号"
    },
    model: {
      value: (_vm.searchData),
      callback: function($$v) {
        _vm.searchData = $$v
      },
      expression: "searchData"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "ui-flex-1"
  }), _vm._v(" "), _c('el-button', {
    attrs: {
      "size": "mini",
      "type": "primary"
    },
    on: {
      "click": _vm.addPaitent
    }
  }, [_vm._v("新管理员")])], 1), _vm._v(" "), _c('div', {
    staticClass: "patient_table"
  }, [_c('el-table', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.adminUserLists,
      "height": "100%",
      "border": ""
    }
  }, [_c('el-table-column', {
    attrs: {
      "prop": "username",
      "label": "登陆名"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "openid",
      "label": "openid"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "name",
      "label": "姓名"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "createtime",
      "label": "创建时间",
      "width": "200"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "操作",
      "width": "130"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-button', {
          attrs: {
            "type": "text",
            "size": "small"
          },
          on: {
            "click": function($event) {
              return _vm.edit(scope.row)
            }
          }
        }, [_vm._v("修改")]), _vm._v(" "), _c('el-button', {
          attrs: {
            "type": "text",
            "size": "small"
          },
          on: {
            "click": function($event) {
              return _vm.delAdminUser(scope.row)
            }
          }
        }, [_vm._v("删除")])]
      }
    }])
  })], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "pages"
  }, [(_vm.total) ? _c('pages', {
    ref: "pages",
    attrs: {
      "total": _vm.total
    },
    on: {
      "getPatientInfo": _vm.adminUserList
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "提示",
      "visible": _vm.adminDialogVisible,
      "width": _vm.screenWidth > 1024 ? '300px' : '96%'
    },
    on: {
      "update:visible": function($event) {
        _vm.adminDialogVisible = $event
      },
      "close": _vm.closeAdminDialog
    }
  }, [_c('div', {
    staticClass: "ui-flex"
  }, [_c('div', {
    staticClass: "ui-w-60 ui-lh-32"
  }, [_vm._v("姓名：")]), _vm._v(" "), _c('el-input', {
    attrs: {
      "size": "small"
    },
    model: {
      value: (_vm.ruleForm.username),
      callback: function($$v) {
        _vm.$set(_vm.ruleForm, "username", $$v)
      },
      expression: "ruleForm.username"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "ui-flex"
  }, [_c('div', {
    staticClass: "ui-w-60 ui-lh-32"
  }, [_vm._v("openid：")]), _vm._v(" "), _c('el-input', {
    attrs: {
      "size": "small"
    },
    model: {
      value: (_vm.ruleForm.openid),
      callback: function($$v) {
        _vm.$set(_vm.ruleForm, "openid", $$v)
      },
      expression: "ruleForm.openid"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "ui-flex ui-mgt-15"
  }, [_c('div', {
    staticClass: "ui-w-60 ui-lh-32"
  }, [_vm._v("密码：")]), _vm._v(" "), _c('el-input', {
    attrs: {
      "size": "small"
    },
    model: {
      value: (_vm.ruleForm.password),
      callback: function($$v) {
        _vm.$set(_vm.ruleForm, "password", $$v)
      },
      expression: "ruleForm.password"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "dialog-footer ui-flex ui-mgt-20 ui-pdb-20"
  }, [_c('div', {
    staticClass: "ui-flex-1"
  }), _vm._v(" "), _c('el-button', {
    attrs: {
      "size": "small"
    },
    on: {
      "click": function($event) {
        _vm.adminDialogVisible = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), (!_vm.isEdit) ? _c('el-button', {
    attrs: {
      "size": "small",
      "type": "primary"
    },
    on: {
      "click": _vm.addAdmin
    }
  }, [_vm._v("新增")]) : _vm._e(), _vm._v(" "), (_vm.isEdit) ? _c('el-button', {
    attrs: {
      "size": "small",
      "type": "primary"
    },
    on: {
      "click": _vm.editAdmin
    }
  }, [_vm._v("编辑")]) : _vm._e()], 1)])], 1)
},staticRenderFns: []}

/***/ })

});