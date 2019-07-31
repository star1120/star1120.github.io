webpackJsonp([14],{

/***/ 556:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(795)
}
var Component = __webpack_require__(215)(
  /* script */
  __webpack_require__(746),
  /* template */
  __webpack_require__(823),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-60c06377",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 746:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {};
    }
});

/***/ }),

/***/ 773:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(548)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 795:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(773);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(549)("2b1854e6", content, true, {});

/***/ }),

/***/ 823:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "home"
  }, [_c('p', {
    staticClass: "h-title"
  }, [_vm._v("官网主页")])])])
}]}

/***/ })

});