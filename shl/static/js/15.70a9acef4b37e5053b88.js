webpackJsonp([15],{

/***/ 554:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(787)
}
var Component = __webpack_require__(215)(
  /* script */
  __webpack_require__(744),
  /* template */
  __webpack_require__(816),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-34ac25f7",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 744:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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
            dialogVisible: false,
            value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
            tableDataOne: [{
                date: 'cbps.e-chinalife.com/mcss/mcss/index.html#/tabeRsmoniter?',
                name: '1',
                address: '40579'
            }],
            tableData: [{
                date: '2019-04-26 09:56:33',
                name: '222.88.147.36',
                address: 'Chrome 49.0',
                address1: 'Android 6.0',
                address2: '40579'
            }, {
                date: '2019-04-26 09:56:33',
                name: '222.88.147.36',
                address: 'Chrome 49.0',
                address1: 'Android 6.0',
                address2: '40579'
            }, {
                date: '2019-04-26 09:56:33',
                name: '222.88.147.36',
                address: 'Chrome 49.0',
                address1: 'Android 6.0',
                address2: '40579'
            }, {
                date: '2019-04-26 09:56:33',
                name: '222.88.147.36',
                address: 'Chrome 49.0',
                address1: 'Android 6.0',
                address2: '40579'
            }, {
                date: '2019-04-26 09:56:33',
                name: '222.88.147.36',
                address: 'Chrome 49.0',
                address1: 'Android 6.0',
                address2: '40579'
            }]
        };
    },
    created() {},
    methods: {
        //设置表格第一行的颜色
        getRowClass({ row, column, rowIndex, columnIndex }) {
            if (rowIndex == 0) {
                return 'background: #E8F2FB;height:51px;color:#454E63; font-size:16px;';
            } else {
                return '';
            }
        }

    }
});

/***/ }),

/***/ 765:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(548)(false);
// imports


// module
exports.push([module.i, ".ui-flex[data-v-34ac25f7]{display:flex}.ui-flex-1[data-v-34ac25f7]{flex:1}.demo_page .demo_inner_page[data-v-34ac25f7]{padding-bottom:50px}.demo_page .demo_inner_page .top_time[data-v-34ac25f7]{margin-top:18px;margin-bottom:14px}.demo_page .demo_inner_page .title[data-v-34ac25f7]{margin-top:25px;font-size:16px}.el-range-editor--small.el-input__inner[data-v-34ac25f7]{border-radius:16px;border-color:#409eff}", ""]);

// exports


/***/ }),

/***/ 787:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(765);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(549)("63ecc36f", content, true, {});

/***/ }),

/***/ 816:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "demo_page"
  }, [_c('el-button', {
    attrs: {
      "type": "text"
    },
    on: {
      "click": function($event) {
        _vm.dialogVisible = true
      }
    }
  }, [_vm._v("点击打开 Dialog")]), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "Dashboard/慢页面详情",
      "visible": _vm.dialogVisible,
      "width": "1340px"
    },
    on: {
      "update:visible": function($event) {
        _vm.dialogVisible = $event
      }
    }
  }, [_c('div', {
    staticClass: "demo_inner_page"
  }, [_c('div', {
    staticClass: "top_time ui-flex"
  }, [_c('div', {
    staticClass: "ui-flex-1"
  }, [_vm._v("\n                    cbps.e-chinalife.com/mcss/mcss/index.html#/tabeRsmoniter?\n                ")]), _vm._v(" "), _c('el-date-picker', {
    attrs: {
      "size": "small",
      "type": "datetimerange",
      "range-separator": "至",
      "start-placeholder": "开始日期",
      "end-placeholder": "结束日期"
    },
    model: {
      value: (_vm.value1),
      callback: function($$v) {
        _vm.value1 = $$v
      },
      expression: "value1"
    }
  })], 1), _vm._v(" "), _c('el-table', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "border": "",
      "header-cell-style": _vm.getRowClass,
      "data": _vm.tableDataOne
    }
  }, [_c('el-table-column', {
    attrs: {
      "align": "center",
      "prop": "date",
      "label": "页面名称"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "prop": "name",
      "label": "调用总数"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "prop": "address",
      "label": "页面平均加载时间（ms）"
    }
  })], 1), _vm._v(" "), _c('h3', {
    staticClass: "title"
  }, [_vm._v("\n                页面访问详细信息\n            ")]), _vm._v(" "), _c('el-table', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "border": "",
      "header-cell-style": _vm.getRowClass,
      "data": _vm.tableData
    }
  }, [_c('el-table-column', {
    attrs: {
      "width": "150",
      "type": "index",
      "align": "center",
      "label": "序号"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "prop": "date",
      "label": "访问时间"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "prop": "name",
      "label": "访问IP"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "prop": "address",
      "label": "浏览器"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "prop": "address1",
      "label": "操作系统"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "align": "center",
      "prop": "address2",
      "label": "响应时间（ms）"
    }
  })], 1)], 1), _vm._v(" "), _c('span', {
    staticClass: "dialog-footer",
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('el-button', {
    attrs: {
      "type": "primary",
      "size": "small"
    },
    on: {
      "click": function($event) {
        _vm.dialogVisible = false
      }
    }
  }, [_vm._v("关闭")])], 1)])], 1)
},staticRenderFns: []}

/***/ })

});