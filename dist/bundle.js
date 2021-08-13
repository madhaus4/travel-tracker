/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".nav-container {\n  height: 10vh;\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n}\n@media (min-width: 605px) {\n  .nav-container {\n    height: 12vh;\n    font-size: larger;\n  }\n}\n.nav-container div {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n}\n\n.login-section {\n  height: 55vh;\n  width: 80vw;\n  margin: 10vh auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\n.login-form {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  height: 20vh;\n}\n\n.main-container {\n  height: 60vh;\n  margin: 2vh 0 15vh;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n@media (min-width: 605px) {\n  .main-container {\n    height: 67vh;\n  }\n}\n\n.main-section {\n  height: 60vh;\n  width: 85vw;\n  margin: auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n}\n.main-section .main-title {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.main-section .main-content {\n  height: 45vh;\n  width: 70vw;\n  margin-bottom: -80px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-evenly;\n}\n@media (min-width: 605px) {\n  .main-section .main-content {\n    height: 35vh;\n  }\n}\n\n.trip-request-form {\n  display: flex;\n  flex-direction: column;\n}\n@media (min-width: 605px) {\n  .trip-request-form {\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    justify-content: center;\n    align-items: baseline;\n    height: 16vh;\n  }\n}\n\n@media (min-width: 605px) {\n  .formLabel {\n    padding: 0px 5px 0px 10px;\n  }\n}\n\n.trip-price-container {\n  height: fit-content;\n  width: 75vw;\n  padding: 10px;\n  margin: auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.trips-container {\n  height: fit-content;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  align-items: flex-start;\n}\n@media (min-width: 605px) {\n  .trips-container {\n    width: auto;\n  }\n}\n.trips-container div {\n  margin: 10px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n@media (min-width: 605px) {\n  .trips-container div {\n    align-items: flex-start;\n  }\n}\n\n.trips {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n@media (min-width: 600px) {\n  .trips {\n    flex-direction: row;\n    overflow-x: scroll;\n    overflow-y: hidden;\n  }\n}\n@media (min-width: 605px) {\n  .trips {\n    width: 100vw;\n  }\n}\n\n.yes-trip-wrapper {\n  height: 60vh;\n  overflow-y: scroll;\n  overflow-x: hidden;\n}\n\n.no-trip-wrapper {\n  height: 10vh;\n}\n\n.destination-cards {\n  border-radius: 1em;\n  background-color: #5E779647;\n}\n@media (min-width: 605px) {\n  .destination-cards {\n    display: flex;\n    align-items: center;\n  }\n}\n\n.destination-cards {\n  -webkit-transform: scale(1);\n  transform: scale(1);\n  -webkit-transition: 0.3s ease-in-out;\n  transition: 0.3s ease-in-out;\n}\n.destination-cards:hover {\n  -webkit-transform: scale(1.1);\n  transform: scale(1.1);\n}\n\n@media (min-width: 605px) {\n  h5, h6 {\n    align-self: center;\n  }\n}\n\n* {\n  font-family: \"Hind Siliguri\", sans-serif;\n  font-size: 1em;\n  margin: 0;\n}\n\nbody {\n  width: 100%;\n}\n\n.menu-icon {\n  height: 30px;\n  width: 30px;\n}\n\nh1 {\n  font-size: 0.5em;\n}\n\n.login-section {\n  border-radius: 1em;\n  background-color: #A6F5EE;\n  filter: drop-shadow(0px 2px 2px grey);\n  background-image: url(\"https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80\");\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\n.login-title {\n  width: 100%;\n  text-align: center;\n}\n.login-title h3 {\n  font-size: 1.45em;\n  padding: 3px;\n  margin: 5px;\n}\n.login-title p {\n  font-size: 1.25em;\n  padding: 3px;\n}\n\n.main-section {\n  background-image: url(\"https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80\");\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\n.main-section {\n  border-radius: 1em;\n  background-color: #A6F5EE;\n  filter: drop-shadow(0px 2px 2px grey);\n}\n.main-section .main-title {\n  width: 100%;\n}\n.main-section .main-title h3 {\n  font-size: 1.45em;\n  text-align: center;\n  padding: 3px;\n  margin: 5px;\n}\n.main-section .main-title p {\n  font-size: 1.25em;\n  padding: 3px;\n}\n.main-section .main-content {\n  border-radius: 1em;\n  background-color: #ffffff;\n  filter: drop-shadow(0px 2px 2px grey);\n  font-size: smaller;\n}\n\n.trip-price-container {\n  background-color: #df656dd4;\n  border-radius: 1em;\n  filter: drop-shadow(0px 2px 2px grey);\n  text-align: center;\n  color: white;\n}\n\nh4 {\n  color: #315B72;\n  font-size: 1.15em;\n  border-bottom: 1px solid #5292B4;\n  width: 90vw;\n}\n@media (min-width: 605px) {\n  h4 {\n    width: 97vw;\n  }\n}\n\n.travel-photos {\n  height: 35vh;\n  width: 100%;\n}\n@media (min-width: 605px) {\n  .travel-photos {\n    height: 45vh;\n    width: auto;\n  }\n}\n\n.no-trips {\n  text-align: center;\n}\n\n.hidden {\n  display: none;\n}\n\n.btns {\n  width: 40vw;\n  margin: 5px;\n  align-self: center;\n  box-shadow: 0 10px 20px -8px rgba(0, 0, 0, 0.7);\n  border: none;\n  border-radius: 0.25em;\n  text-transform: uppercase;\n}\n.btns:hover {\n  background-color: #5292B4;\n  color: #ffffff;\n  cursor: pointer;\n}\n\n@media (min-width: 768px) {\n  .btns {\n    width: 25vw;\n  }\n}\n\n.custom-shape-divider-top-1628566746-login {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  line-height: 0;\n}\n\n.custom-shape-divider-top-1628566746-login svg {\n  position: relative;\n  display: block;\n  width: calc(100% + 1.3px);\n  height: 50vh;\n  margin-top: -80px;\n}\n\n.custom-shape-divider-top-1628566746-login .shape-fill {\n  fill: #5E779647;\n}\n\n/** For mobile devices **/\n@media (max-width: 767px) {\n  .custom-shape-divider-top-1628566746-login svg {\n    width: calc(100% + 1.3px);\n    height: 40vh;\n    margin-top: 0px;\n  }\n}\n@media (min-width: 768px) {\n  .custom-shape-divider-top-1628566746-login svg {\n    width: calc(100% + 1.3px);\n    height: 57vh;\n    margin-top: -4px;\n  }\n}\n.custom-shape-divider-top-1628566746 {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  line-height: 0;\n}\n\n.custom-shape-divider-top-1628566746 svg {\n  position: relative;\n  display: block;\n  width: calc(100% + 1.3px);\n  height: 50vh;\n  margin-top: -90px;\n}\n\n.custom-shape-divider-top-1628566746 .shape-fill {\n  fill: #5E779647;\n}\n\n/** For mobile devices **/\n@media (max-width: 767px) {\n  .custom-shape-divider-top-1628566746 svg {\n    width: calc(100% + 1.3px);\n    height: 40vh;\n    margin-top: -75px;\n  }\n}", "",{"version":3,"sources":["webpack://./src/css/_layout.scss","webpack://./src/css/main.scss","webpack://./src/css/_abstracts.scss","webpack://./src/css/_base.scss","webpack://./src/css/_components.scss"],"names":[],"mappings":"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","sourcesContent":["// LAYOUT STYLES GO IN HERE, HEIGHT & WIDTH\n\n\n\n// NAV CONTAINER\n.nav-container {\n  height: 10vh;\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  \n  @media (min-width: 605px) {\n    height: 12vh;\n    font-size: larger;\n  }\n\n  div {\n    @include center-items(flex-end);\n  }\n}\n\n\n\n// LOGIN PAGE\n.login-section {\n  height: 55vh;\n  width: 80vw;\n  margin: 10vh auto;\n  @include center-items(center);\n  justify-content: center;\n}\n\n.login-form {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  height: 20vh;\n}\n\n\n\n// MAIN CONTAINER\n.main-container {\n  height: 60vh;\n  margin: 2vh 0 15vh;\n  position: relative;\n  @include center-items(center);\n\n  @media (min-width: 605px) {\n    height: 67vh;\n  }\n}\n\n.main-section {\n  height: 60vh;\n  width: 85vw;\n  margin: auto;\n  @include center-items(center);\n  justify-content: space-around;\n\n  .main-title {\n    @include center-items(center);\n  }\n\n  .main-content {\n    height: 45vh;\n    width: 70vw;\n    margin-bottom: -80px;\n    @include center-items(center);\n    justify-content: space-evenly;\n\n    @media (min-width: 605px) { \n      height: 35vh;\n    }\n  }\n}\n\n\n\n// TRIP REQUEST FORM\n.trip-request-form {\n  display: flex;\n  flex-direction: column;\n\n  @media (min-width: 605px) { \n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    justify-content: center;\n    align-items: baseline;\n    height: 16vh;\n  }\n}\n\n.formLabel {\n  @media (min-width: 605px) {\n    padding: 0px 5px 0px 10px;\n  }\n}\n\n\n\n// TRIP PRICE CONTAINER\n.trip-price-container {\n  height: fit-content;\n  width: 75vw;\n  padding: 10px;\n  margin: auto;\n\n  @include center-items(center);\n}\n\n\n\n// TRIPS CONTAINER\n.trips-container {\n  height: fit-content;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  align-items: flex-start;\n\n  @media (min-width: 605px) { \n    width: auto;\n    // justify-content: none;\n    // align-items: none;\n  }\n    \n    div {\n      margin: 10px;\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      \n      @media (min-width: 605px) {\n        align-items: flex-start;\n        // width: 100vw;\n      }\n    }\n}\n\n.trips {\n  // overflow-y: scroll;\n  // overflow-x: hidden;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  @include for-laptop(); \n\n  @media (min-width: 605px) {\n    width: 100vw;\n  }\n}\n\n.yes-trip-wrapper {\n  height: 60vh;\n  overflow-y: scroll;\n  overflow-x: hidden;\n}\n\n.no-trip-wrapper {\n  height: 10vh;\n}\n\n.destination-cards {\n  border-radius: $radius;\n  background-color: #5E779647;\n\n  @media (min-width: 605px) {\n    display: flex;\n    align-items: center;\n  }\n}\n\n.destination-cards {\n  -webkit-transform: scale(1);\n  transform: scale(1);\n  -webkit-transition: .3s ease-in-out;\n  transition: .3s ease-in-out;\n\n  &:hover {\n    -webkit-transform: scale(1.1);\n    transform: scale(1.1);\n  }\n}\n\nh5, h6 {\n  @media (min-width: 605px) {\n    align-self: center;\n  }\n}\n\n\n",".nav-container {\n  height: 10vh;\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n}\n@media (min-width: 605px) {\n  .nav-container {\n    height: 12vh;\n    font-size: larger;\n  }\n}\n.nav-container div {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n}\n\n.login-section {\n  height: 55vh;\n  width: 80vw;\n  margin: 10vh auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\n.login-form {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  height: 20vh;\n}\n\n.main-container {\n  height: 60vh;\n  margin: 2vh 0 15vh;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n@media (min-width: 605px) {\n  .main-container {\n    height: 67vh;\n  }\n}\n\n.main-section {\n  height: 60vh;\n  width: 85vw;\n  margin: auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n}\n.main-section .main-title {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.main-section .main-content {\n  height: 45vh;\n  width: 70vw;\n  margin-bottom: -80px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-evenly;\n}\n@media (min-width: 605px) {\n  .main-section .main-content {\n    height: 35vh;\n  }\n}\n\n.trip-request-form {\n  display: flex;\n  flex-direction: column;\n}\n@media (min-width: 605px) {\n  .trip-request-form {\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    justify-content: center;\n    align-items: baseline;\n    height: 16vh;\n  }\n}\n\n@media (min-width: 605px) {\n  .formLabel {\n    padding: 0px 5px 0px 10px;\n  }\n}\n\n.trip-price-container {\n  height: fit-content;\n  width: 75vw;\n  padding: 10px;\n  margin: auto;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.trips-container {\n  height: fit-content;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  align-items: flex-start;\n}\n@media (min-width: 605px) {\n  .trips-container {\n    width: auto;\n  }\n}\n.trips-container div {\n  margin: 10px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n@media (min-width: 605px) {\n  .trips-container div {\n    align-items: flex-start;\n  }\n}\n\n.trips {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n}\n@media (min-width: 600px) {\n  .trips {\n    flex-direction: row;\n    overflow-x: scroll;\n    overflow-y: hidden;\n  }\n}\n@media (min-width: 605px) {\n  .trips {\n    width: 100vw;\n  }\n}\n\n.yes-trip-wrapper {\n  height: 60vh;\n  overflow-y: scroll;\n  overflow-x: hidden;\n}\n\n.no-trip-wrapper {\n  height: 10vh;\n}\n\n.destination-cards {\n  border-radius: 1em;\n  background-color: #5E779647;\n}\n@media (min-width: 605px) {\n  .destination-cards {\n    display: flex;\n    align-items: center;\n  }\n}\n\n.destination-cards {\n  -webkit-transform: scale(1);\n  transform: scale(1);\n  -webkit-transition: 0.3s ease-in-out;\n  transition: 0.3s ease-in-out;\n}\n.destination-cards:hover {\n  -webkit-transform: scale(1.1);\n  transform: scale(1.1);\n}\n\n@media (min-width: 605px) {\n  h5, h6 {\n    align-self: center;\n  }\n}\n\n* {\n  font-family: \"Hind Siliguri\", sans-serif;\n  font-size: 1em;\n  margin: 0;\n}\n\nbody {\n  width: 100%;\n}\n\n.menu-icon {\n  height: 30px;\n  width: 30px;\n}\n\nh1 {\n  font-size: 0.5em;\n}\n\n.login-section {\n  border-radius: 1em;\n  background-color: #A6F5EE;\n  filter: drop-shadow(0px 2px 2px grey);\n  background-image: url(\"https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80\");\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\n.login-title {\n  width: 100%;\n  text-align: center;\n}\n.login-title h3 {\n  font-size: 1.45em;\n  padding: 3px;\n  margin: 5px;\n}\n.login-title p {\n  font-size: 1.25em;\n  padding: 3px;\n}\n\n.main-section {\n  background-image: url(\"https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80\");\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\n.main-section {\n  border-radius: 1em;\n  background-color: #A6F5EE;\n  filter: drop-shadow(0px 2px 2px grey);\n}\n.main-section .main-title {\n  width: 100%;\n}\n.main-section .main-title h3 {\n  font-size: 1.45em;\n  text-align: center;\n  padding: 3px;\n  margin: 5px;\n}\n.main-section .main-title p {\n  font-size: 1.25em;\n  padding: 3px;\n}\n.main-section .main-content {\n  border-radius: 1em;\n  background-color: #ffffff;\n  filter: drop-shadow(0px 2px 2px grey);\n  font-size: smaller;\n}\n\n.trip-price-container {\n  background-color: #df656dd4;\n  border-radius: 1em;\n  filter: drop-shadow(0px 2px 2px grey);\n  text-align: center;\n  color: white;\n}\n\nh4 {\n  color: #315B72;\n  font-size: 1.15em;\n  border-bottom: 1px solid #5292B4;\n  width: 90vw;\n}\n@media (min-width: 605px) {\n  h4 {\n    width: 97vw;\n  }\n}\n\n.travel-photos {\n  height: 35vh;\n  width: 100%;\n}\n@media (min-width: 605px) {\n  .travel-photos {\n    height: 45vh;\n    width: auto;\n  }\n}\n\n.no-trips {\n  text-align: center;\n}\n\n.hidden {\n  display: none;\n}\n\n.btns {\n  width: 40vw;\n  margin: 5px;\n  align-self: center;\n  box-shadow: 0 10px 20px -8px rgba(0, 0, 0, 0.7);\n  border: none;\n  border-radius: 0.25em;\n  text-transform: uppercase;\n}\n.btns:hover {\n  background-color: #5292B4;\n  color: #ffffff;\n  cursor: pointer;\n}\n\n@media (min-width: 768px) {\n  .btns {\n    width: 25vw;\n  }\n}\n\n.custom-shape-divider-top-1628566746-login {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  line-height: 0;\n}\n\n.custom-shape-divider-top-1628566746-login svg {\n  position: relative;\n  display: block;\n  width: calc(100% + 1.3px);\n  height: 50vh;\n  margin-top: -80px;\n}\n\n.custom-shape-divider-top-1628566746-login .shape-fill {\n  fill: #5E779647;\n}\n\n/** For mobile devices **/\n@media (max-width: 767px) {\n  .custom-shape-divider-top-1628566746-login svg {\n    width: calc(100% + 1.3px);\n    height: 40vh;\n    margin-top: 0px;\n  }\n}\n@media (min-width: 768px) {\n  .custom-shape-divider-top-1628566746-login svg {\n    width: calc(100% + 1.3px);\n    height: 57vh;\n    margin-top: -4px;\n  }\n}\n.custom-shape-divider-top-1628566746 {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  line-height: 0;\n}\n\n.custom-shape-divider-top-1628566746 svg {\n  position: relative;\n  display: block;\n  width: calc(100% + 1.3px);\n  height: 50vh;\n  margin-top: -90px;\n}\n\n.custom-shape-divider-top-1628566746 .shape-fill {\n  fill: #5E779647;\n}\n\n/** For mobile devices **/\n@media (max-width: 767px) {\n  .custom-shape-divider-top-1628566746 svg {\n    width: calc(100% + 1.3px);\n    height: 40vh;\n    margin-top: -75px;\n  }\n}","// VARIABLES AND MIXINS GO IN HERE\n\n// BASE VARIABLES\n$radius: 1em;\n$drop-shadow: drop-shadow(0px 2px 2px grey);\n\n\n\n// LAYOUT MIXINS\n@mixin center-items($placement) {\n  display: flex;\n  flex-direction: column;\n  align-items: $placement;\n}\n\n@mixin for-laptop() {\n  @media (min-width: 600px) {\n    flex-direction: row;\n    // justify-content: space-around;\n    overflow-x: scroll;\n    overflow-y: hidden;\n  }\n}","// IMAGES, FONTS& WHATEVER I DON'T KNOW WHAT TO DO WITH GOES IN HERE\n  // MARGIN, PADDING, BORDERS, COLORS\n\n\n\n* {\n  font-family: 'Hind Siliguri', sans-serif;\n  font-size: 1em;\n  margin: 0;\n}\n\nbody {\n  // overflow: auto;\n  width: 100%;\n  // margin: 5px;\n}\n\n\n\n// NAV CONTAINER\n.menu-icon {\n  height: 30px;\n  width: 30px;\n}\n\nh1 {\n  font-size: .5em;\n}\n\n\n\n// LOGIN PAGE\n.login-section {\n  border-radius: $radius;\n  background-color: #A6F5EE;\n  filter: $drop-shadow;\n  background-image: url('https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80');\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\n.login-title {\n  width: 100%;\n  text-align: center;\n  \n  h3 {\n    font-size: 1.45em;\n    padding: 3px;\n    margin: 5px;\n  }\n\n  p {\n    font-size: 1.25em;\n    padding: 3px;\n  }\n}\n\n\n\n// MAIN CONTAINER\n.main-section {\n  background-image: url('https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80');\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\n.main-section {\n  border-radius: $radius;\n  background-color: #A6F5EE;\n  filter: $drop-shadow;\n\n  .main-title {\n    width: 100%;\n  \n    h3 {\n      font-size: 1.45em;\n      text-align: center;\n      padding: 3px;\n      margin: 5px;\n    }\n  \n    p {\n      font-size: 1.25em;\n      padding: 3px;\n    }\n  }\n\n  .main-content {\n    border-radius: $radius;\n    background-color: #ffffff;\n    filter: $drop-shadow;\n    font-size: smaller;\n  }\n}\n\n\n// TRIP REQUEST FORM\n\n\n\n\n// TRIP PRICE CONTAINER\n.trip-price-container {\n  // background-color: #A6F5EE;\n  background-color: #df656dd4;\n  // background-color: #ab4b52;\n  border-radius: $radius;\n  filter: $drop-shadow;\n  text-align: center;\n  color: white;\n}\n\n\n\n// TRIPS CONTAINER\nh4 {\n  // color: #5292B4;\n  color: #315B72;\n  font-size: 1.15em;\n  border-bottom: 1px solid #5292B4;\n  width: 90vw;\n\n  @media (min-width: 605px) {\n    width: 97vw;\n  }\n}\n\n.travel-photos {\n  height: 35vh;\n  width: 100%;\n\n  @media (min-width: 605px) {\n    height: 45vh;\n    width: auto;\n  }\n}\n\n.no-trips {\n  text-align: center;\n}\n\n.hidden {\n  display: none;\n}\n\n\n// hsl(114deg 76% 41% / 17%);\n// #00ffb147\n// #5eff001c\n// #8DFBD1\n\n","// BUTTONS/ WIDGET STYLES GO IN HERE\n\n// TRIP REQUEST FORM\n.btns {\n  width: 40vw;\n  margin: 5px;\n  align-self: center;\n  box-shadow: 0 10px 20px -8px rgba(0, 0, 0, 0.7);\n  border: none;\n  border-radius: .25em;\n  text-transform: uppercase;\n  \n  &:hover {\n    background-color: #5292B4;\n    color: #ffffff;\n    cursor: pointer;\n  }\n}\n\n.btns {\n  @media (min-width: 768px) {\n    width: 25vw;\n  }\n}\n\n\n// TRIANGLE HEADER\n// ON LOGIN PAGE\n.custom-shape-divider-top-1628566746-login {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  line-height: 0;\n}\n\n.custom-shape-divider-top-1628566746-login svg {\n  position: relative;\n  display: block;\n  width: calc(100% + 1.3px);\n  height: 50vh;\n  margin-top: -80px;\n}\n\n.custom-shape-divider-top-1628566746-login \n.shape-fill {\n  fill: #5E779647;\n}\n\n/** For mobile devices **/\n@media (max-width: 767px) {\n  .custom-shape-divider-top-1628566746-login svg {\n    width: calc(100% + 1.3px);\n    height: 40vh;\n    margin-top: 0px;\n  }\n}\n\n@media (min-width: 768px) {\n  .custom-shape-divider-top-1628566746-login svg {\n    width: calc(100% + 1.3px);\n    height: 57vh;\n    margin-top: -4px;\n  }\n}\n\n\n// ON MAIN PAGE\n.custom-shape-divider-top-1628566746 {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  line-height: 0;\n}\n\n.custom-shape-divider-top-1628566746 svg {\n  position: relative;\n  display: block;\n  width: calc(100% + 1.3px);\n  height: 50vh;\n  margin-top: -90px;\n}\n\n.custom-shape-divider-top-1628566746 .shape-fill {\n  fill: #5E779647;\n}\n\n/** For mobile devices **/\n@media (max-width: 767px) {\n  .custom-shape-divider-top-1628566746 svg {\n    width: calc(100% + 1.3px);\n    height: 40vh;\n    margin-top: -75px;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Traveler {
  constructor(traveler) {
    this.id = traveler.id;
    this.name = traveler.name;
    this.travelerType = traveler.travelerType;
    this.allTrips = [];
    this.pastTrips = [];
    this.presentTrips = [];
    this.upcomingTrips = [];
    this.pendingTrips = [];
  }

  findCurrentUserTrips(trips, id) {
    trips.filter(trip => {
      if (trip.userID === id) {
        this.allTrips.push(trip)
      } 
    })
    return this.allTrips 
  }

  findPastTrips(date) {
    this.allTrips.filter(trip => {
      if (trip.date < date && !this.pastTrips.includes(trip)) {
        this.pastTrips.push(trip)
      }
    })
    return this.pastTrips;
  }

  findPresentTrips(date) {
    this.allTrips.filter(trip => {
      if (trip.date === date && !this.presentTrips.includes(trip)) {
        this.presentTrips.push(trip)
      }
    })
    return this.presentTrips;
  }

  findUpcomingTrips(date) {
    this.allTrips.filter(trip => {
      if (trip.date > date && !this.upcomingTrips.includes(trip)) {
        this.upcomingTrips.push(trip)
      }
    })
    return this.upcomingTrips;
  }

  findPendingTrips() {
    this.allTrips.filter(trip => {
      if (trip.status === 'pending' && !this.pendingTrips.includes(trip)) {
        this.pendingTrips.push(trip)
      }
    })
    return this.pendingTrips;
  }

  calculateYearlyTripsTotal(year, destinations) {
    let dates = []
    this.allTrips.forEach(trip => {
      if (trip.date.includes(year)) {
        dates.push(trip)
      }
    })
    let total;
    return destinations.reduce((num, destination) => {
      dates.forEach(date => {
        if (destination.id === date.destinationID) {
          total = (destination.estimatedLodgingCostPerDay * date.duration) + destination.estimatedFlightCostPerPerson
        }
        num = total
      })
      return num;
    }, 0)
  }
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Traveler);

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Trip {
  constructor(currentTrip) {
    this.id = currentTrip.id;
    this.userID = currentTrip.userID;
    this.destinationID = currentTrip.destinationID;
    this.travelers = currentTrip.travelers;
    this.date = currentTrip.date;
    this.duration = currentTrip.duration;
    this.status = currentTrip.status;
    this.suggestedActivities = currentTrip.suggestedActivities;
  }

  findCurrentTrips(trips) {
    return trips.filter(trip => trip.userID === this.userID)
  }

  // TRIP COSTS METHODS
  calculateTripCostPerPerson(destination) {
    const tripCost = (destination.estimatedLodgingCostPerDay * this.duration) + destination.estimatedFlightCostPerPerson
    return tripCost
  }

  calculateTripCostForGroup(trip, destination) {
    const costPerPerson = this.calculateTripCostPerPerson(destination)
    const tripTotal = costPerPerson * trip.travelers
    return tripTotal
  }

  calculateAgentFeePerPerson(destination) {
    const initialTripCost = this.calculateTripCostPerPerson(destination)
    return initialTripCost * .10
  }

  calculateAgentFeeForGroup(trip, destination) {
    const initialTripCost = this.calculateTripCostForGroup(trip, destination)
    return initialTripCost * .10
  }

  returnTripTotalPerPerson(destination) {
    let total = this.calculateTripCostPerPerson(destination) + this.calculateAgentFeePerPerson(destination)
    return total
  }

  returnTripTotalForGroup(trip, destination) {
    let total = this.calculateTripCostForGroup(trip, destination) + this.calculateAgentFeeForGroup(trip, destination)
    return total
  }
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Trip);

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const retrieveData = (data) => {
  return fetch(`http://localhost:3001/api/v1/${data}`)
  .then(response => response.json())
  .then(data => {
    return data
  })
  .catch(err => displayErrorMessage(err));
}

const updateData = (data) => {
  return fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
    .then(response => checkForError(response))
    .then(data => {
      return data
    })
    .catch(err => displayErrorMessage(err))
}

const displayErrorMessage = (error) => {
  const errorField = document.querySelector(".js-error")
  const message = 
    error.message === "Failed to fetch" ? "Something went wrong, please check your internet" : error.message
  errorField.innerText = message  
}

const checkForError = (response) => {
  if (!response.ok) {
    throw new Error("Please make sure that all fields are filled out.")
  } else {
    return response.json()
  }
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({retrieveData, updateData});

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const domUpdates = {

  renderLoginFailedMsg() {
    const incorrectLoginInfo = document.getElementById('incorrectLoginInfo')
    incorrectLoginInfo.classList.remove('hidden')
    incorrectLoginInfo.innerHTML = `Please enter a valid username and password`;
  },

  renderMainPage() {
    const loginPage = document.getElementById('loginPage')
    const mainPage = document.getElementById('mainContainer')
    const tripContainer = document.getElementById('tripContainer')
    loginPage.classList.add('hidden')
    mainPage.classList.remove('hidden')
    tripContainer.classList.remove('hidden')
  },

  renderWelcomeMsg(name) {
    const welcomeMsg = document.querySelector('.main-title')
    welcomeMsg.innerHTML = `
      <h3>Let's Explore this Beautiful World</h3>
      <p><span>${name},</span> You Ready?</p>
    `;
  },

  renderPastTrips(trips, destinations) {
    const pastTrips = document.getElementById('pastTrips')
    pastTrips.classList.add('.yes-trip-wrapper')

    destinations.forEach(destination => {
      trips.forEach(trip => {
        if (destination.id === trip.destinationID) {
          pastTrips.innerHTML += `
            <div class="destination-cards">
              <h5>${destination.destination}</h5>
              <img class="travel-photos" src=${destination.image} alt=${destination.alt}>
              <h6>${trip.date}</h6>
            </div>
          `;
        }
      })
    })
  },

  renderNoPastTrips() {
    const pastTrips = document.getElementById('pastTrips')
    pastTrips.classList.add('.no-trip-wrapper')

    pastTrips.innerHTML = `
      <div>  
        <p>You do not have any past trips yet</p>
      </div>
    `;
  },

  renderPresentTrips(trips, destinations) {
    // const currentTripWrapper = document.getElementById('currentTrips')
    const presentTrips = document.getElementById('currentTripDetails')
    presentTrips.classList.add('.yes-trip-wrapper')
  
    destinations.forEach(destination => {
      trips.forEach(trip => {
        if (destination.id === trip.destinationID) {
          presentTrips.innerHTML += `
            <div class="destination-cards">
              <h5>${destination.destination}</h5>
              <img class="travel-photos" src=${destination.image} alt=${destination.alt}>
              <h6>${trip.date}</h6>
            </div
          `;
        }
      })
    })
  },

  renderNoPresentTrips() {
    // const currentTripWrapper = document.getElementById('currentTripWrapper')
    const presentTrips = document.getElementById('currentTripDetails')
    presentTrips.classList.add('.no-trip-wrapper')

    presentTrips.innerHTML = `
      <div>  
        <p>You're currently not on a trip</p>
      </div>
    `;
  },

  renderUpcomingTrips(trips, destinations) {
    const upcomingTrips = document.getElementById('upcomingTrips')
    upcomingTrips.classList.add('.yes-trip-wrapper')

    destinations.forEach(destination => {
      trips.forEach(trip => {
        if (destination.id === trip.destinationID) {
          upcomingTrips.innerHTML += `
            <div class="destination-cards">
              <h5>${destination.destination}</h5>
              <img class="travel-photos" src=${destination.image} alt=${destination.alt}>
              <h6>${trip.date}</h6>
            </div>  
          `;
        }
      })
    })
  },

  renderNoUpcomingTrips() {
    // const upcomingTripWrapper = document.getElementById('upcomingTripWrapper')
    const upcomingTrips = document.getElementById('upcomingTrips')
    upcomingTrips.classList.add('.no-trip-wrapper')

    upcomingTrips.innerHTML = `
      <div>  
        <p>You do not have any upcoming trips</p>
      </div>
    `;
  },

  renderPendingTrips(trips, destinations) {
    const pendingTrips = document.getElementById('pendingTrips')
    pendingTrips.classList.add('.yes-trip-wrapper')

    // pendingTrips.innerHTML += ''
    destinations.forEach(destination => {
      trips.forEach(trip => {
        if (destination.id === trip.destinationID) {
          pendingTrips.innerHTML += `
            <div class="destination-cards">
              <h5>${destination.destination}</h5>
              <img class="travel-photos" src=${destination.image} alt=${destination.alt}>
              <h6>${trip.date}</h6>
            </div>  
          `;
        }
      })
    })
  },

  renderAdditionalPendingTrips(trip, destinations) {
    const noPendingTripsMsg = document.getElementById('noPendingTripsMsg')
    const pendingTrips = document.getElementById('pendingTrips')
    pendingTrips.classList.add('.yes-trip-wrapper')
    noPendingTripsMsg.innerHTML = ''
    
    destinations.forEach(destination => {
      if (destination.id === trip.destinationID) {
        pendingTrips.innerHTML += `
        <div class="destination-cards">
          <h5>${destination.destination}</h5>
          <img class="travel-photos" src=${destination.image} alt=${destination.alt}>
          <h6>${trip.date}</h6>
        </div>  
      `;
      }
    })
  },

  renderNoPendingTrips() {
    const pendingTrips = document.getElementById('pendingTrips')
    pendingTrips.classList.add('.no-trip-wrapper')

    pendingTrips.innerHTML = `
      <div id="noPendingTripsMsg">  
        <p>You do not have any pending trips</p>
      </div>
    `;
  },

  renderDestinationsDataList(destinations) {
    const destinationsDataList = document.getElementById('destinationsList')
    destinations.forEach(destination => {
      destinationsDataList.innerHTML += `
        <option value="${destination.destination}">
      `;
    })
  },

  renderYearlyTripsTotal(total) {
    const yearlyTripsTotal = document.getElementById('yearlyTotal')
    yearlyTripsTotal.innerHTML = `
      <h1>You've spent $${total} on amazing experiences this year</h1>
    `;
  },

  renderTripPriceRequest(tripInfo) {
    const tripPriceContainer = document.getElementById('tripPriceContainer')
    tripPriceContainer.classList.remove('hidden')

    tripPriceContainer.innerHTML = `
      <p>Thank you for your trip request to visit ${tripInfo.destinationsList}!  A roundtrip flight and ${tripInfo.currentTrip.duration} days for ${tripInfo.currentTrip.travelers} travelers totals: $<strong>${tripInfo.tripTotalCost}</strong>.</p>
      <button class="btns request-trip-btn" id="requestTripBtn" type="submit">Request Trip</button>
    `;
  },

  renderTripRequestMsg() {
    const tripPriceContainer = document.getElementById('tripPriceContainer')
    tripPriceContainer.innerHTML = `
      <p>Your trip request has been sent to your Travel Agent.</p>
    `;
  }  
}
  

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (domUpdates);

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/menu.png");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/next.png");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/boris-baldinger-eUFfY6cwjSU-unsplash.jpg");

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/marek-piwnicki-3Exh4BdB2yA-unsplash.jpg");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/carlos-machado-yGbh_mg9DH8-unsplash.jpg");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/resul-mentes-DbwYNr8RPbg-unsplash.jpg");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _Traveler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _Trip_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _apiCalls_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _images_menu_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);
/* harmony import */ var _images_next_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);
/* harmony import */ var _images_boris_baldinger_eUFfY6cwjSU_unsplash_jpg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(12);
/* harmony import */ var _images_marek_piwnicki_3Exh4BdB2yA_unsplash_jpg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(13);
/* harmony import */ var _images_carlos_machado_yGbh_mg9DH8_unsplash_jpg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(14);
/* harmony import */ var _images_resul_mentes_DbwYNr8RPbg_unsplash_jpg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(15);













// GLOBAL VARIABLES
let travelersData, currentUserData, tripsData, destinationsData;
let currentTraveler, currentTrip;
let date ='2021/08/10';


// QUERY SELECTORS
const checkPriceBtn = document.getElementById('checkPriceBtn')
const continueBtn = document.getElementById('continueBtn')
const userNameField = document.getElementById('userName')
const passwordField = document.getElementById('password')
const checkInField = document.getElementById('startDate')
const checkOutField = document.getElementById('endDate')
const goingToField = document.getElementById('destinationChoice')
const guestsField = document.getElementById('numOfTravelers')
const tripPriceContainer = document.getElementById('tripPriceContainer')

// const requestTripBtn = document.getElementById('requestTripBtn')
// const tripContainer = document.getElementById('tripContainer')


// EVENT LISTENERS
window.addEventListener('load', getFetchedData)
continueBtn.addEventListener('click', displayMainPage)
passwordField.addEventListener('keyup', function(event) {
  if (event.code === 'Enter') {
    continueBtn.click();
  }
})
checkPriceBtn.addEventListener('click', displayTripPriceRequest)
tripPriceContainer.addEventListener('click', function(event) {
  displayNewPendingTrips(event)
})


// DISPLAY MAIN PAGE FUNCTION
function displayMainPage() {
  const userNameInput = getUserInputID()
  if (!userNameInput) {
    _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.renderLoginFailedMsg()
  } else {
    getFetchedData(userNameInput)
    getTrips(userNameInput, tripsData, date)
    verifyLoginInput(userNameInput)
  }
}



// LOGIN FUNCTIONS
function verifyLoginInput(userID) {
  const userInfo = checkUserInputID(userID)
  const passingUsername = `traveler${userInfo.id}`
  const passingPasssword = verifyPassword()

  if (userInfo && passingUsername && passingPasssword) {
    _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.renderMainPage()
    displayTrips(currentTraveler)
  } else if (!userInfo || !passingUsername || !passingPasssword) {
    _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.renderLoginFailedMsg()
    continueBtn.disabled = true;
    clearInputFields()
  }
} 

function getUserInputID() {
  let verifiedUserName = userNameField.value.split()
  let userID = []

  verifiedUserName.forEach(elem => {
    let a = elem.charAt(8)
    let b = elem.charAt(9)
    userID.push(a, b)
  })

  let userID2 = Number(userID.join(''))
  if (userID2) {
    return userID2
  } else if (isNaN()) {
    return false
  }
}

function checkUserInputID(userID) {
  if (userID <= 50 && userID > 0) {
    return true
  } else {
    return false
  }
}

function verifyPassword() {
  if (passwordField.value === 'travel') {
    return true
  } else 
  if (passwordField.value !== 'travel') {
    return false
  }
}

function clearInputFields() {
  if (continueBtn.disabled) {
    userNameField.value = ''
    passwordField.value = ''
    continueBtn.disabled = false;
  } else {
    userNameField.value = ''
    passwordField.value = ''
  }
}



// FETCH FUNCTIONS
function getFetchedData(id) {
  continueBtn.disabled = false;
  Promise.all([
    _apiCalls_js__WEBPACK_IMPORTED_MODULE_3__.default.retrieveData(`travelers`),
    _apiCalls_js__WEBPACK_IMPORTED_MODULE_3__.default.retrieveData(`travelers/${id}`),
    _apiCalls_js__WEBPACK_IMPORTED_MODULE_3__.default.retrieveData(`trips`),
    _apiCalls_js__WEBPACK_IMPORTED_MODULE_3__.default.retrieveData(`destinations`)
  ])
  .then(data => assignFetchedData(data))
}

function assignFetchedData(data) {
    travelersData = data[0].travelers
    currentUserData = data[1]
    tripsData = data[2].trips
    destinationsData = data[3].destinations
    currentTraveler = new _Traveler_js__WEBPACK_IMPORTED_MODULE_1__.default(currentUserData)

    let name = currentTraveler.name.split(' ')
    _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.renderWelcomeMsg(name[0]) 
}



// DISPLAY USER TRIPS
function displayTrips(currentUserID) {
  displayYearlyTripsTotal()
  displayPastTrips(currentUserID, date)
  displayPresentTrips(currentUserID, date)
  displayUpcomingTrips(currentUserID, date)
  displayPendingTrips(currentUserID)
  _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.renderDestinationsDataList(destinationsData)
}

function displayPastTrips(currentUserID, date) {
  const destinations = getDestinationData(currentUserID.id);
  const theseTrips = getPastTrips(currentUserID, date);
  const destinations2 = getDestinationDataByTrip(theseTrips, destinations)

  if (currentTraveler.pastTrips.length > 0) {
    _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.renderPastTrips(theseTrips, destinations2);
  } else {
    _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.renderNoPastTrips()
  }
}

function displayPresentTrips(currentUserID, date) {
  const destinations = getDestinationData(currentUserID.id);
  const theseTrips = getPresentTrips(currentUserID, date);
  const destinations2 = getDestinationDataByTrip(theseTrips, destinations)

  if (currentTraveler.presentTrips.length > 0) {
    _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.renderPresentTrips(theseTrips, destinations2);
  } else {
    _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.renderNoPresentTrips()
  }
}

function displayUpcomingTrips(currentUserID, date) {
  const destinations = getDestinationData(currentUserID.id);
  const theseTrips = getUpcomingTrips(currentUserID, date);
  const destinations2 = getDestinationDataByTrip(theseTrips, destinations);

  if (currentTraveler.upcomingTrips.length > 0) {
    _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.renderUpcomingTrips(theseTrips, destinations2);
  } else {
    _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.renderNoUpcomingTrips()
  }
}

function displayPendingTrips(currentUserID) {
  const destinations = getDestinationData(currentUserID.id);
  const theseTrips = getPendingTrips(currentUserID.id);
  const destinations2 = getDestinationDataByTrip(theseTrips, destinations)
  console.log('theseTrips', theseTrips)
  console.log('destinations2', destinations2)

  if (currentTraveler.pendingTrips.length > 0) {
    _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.renderPendingTrips(theseTrips, destinations2);
  } else {
    _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.renderNoPendingTrips()
  }
}

function displayYearlyTripsTotal() {
  let yearlyTotalTripsAmount = getYearlyTripsTotal()
  _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.renderYearlyTripsTotal(yearlyTotalTripsAmount)
}

function displayTripPriceRequest() {
  const tripTotalCost = getTripPriceRequest()
  _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.renderTripPriceRequest(tripTotalCost)
  checkPriceBtn.disabled = true;
}

function clearTripInputFields() {
  checkInField.value = ''
  checkOutField.value = ''
  goingToField.value = 0
  guestsField.value = ''
  checkPriceBtn.disabled = false;
}



// USER TRIPS HELPER FUNCTIONS
function getTrips(currentUserID, tripsData, date) {
  getUserTrips(currentUserID)
  getPastTrips(tripsData, currentUserID, date)
  getPresentTrips(tripsData, currentUserID, date)
  getUpcomingTrips(tripsData, currentUserID, date)
  getPendingTrips()
  getDestinationData(currentUserID)
}

function getUserTrips(currentUserID) {
  return currentTraveler.findCurrentUserTrips(tripsData, currentUserID)
}

function getPastTrips(date) {
  return currentTraveler.findPastTrips('2021/08/09');
}

function getPresentTrips(date) {
  return currentTraveler.findPresentTrips('2021/08/09')
}

function getUpcomingTrips(date) {
  return currentTraveler.findUpcomingTrips('2021/08/09')
}

function getPendingTrips() {
  return currentTraveler.findPendingTrips()
}

function getDestinationData(currentUserID) {
  let userTrips = getUserTrips(currentUserID)
  let userDestinations = []
  destinationsData.filter(destination => {
    userTrips.forEach(trip => {
      if (destination.id === trip.destinationID) {
        userDestinations.push(destination)
      }
    })
  })
  return [...new Set(userDestinations)];
}

function getDestinationDataByTrip(tripCategory, userDestinations) {
  let destinationArr = []
  tripCategory.filter(trip => {
    userDestinations.forEach(desto => {
      if (trip.destinationID === desto.id) {
        destinationArr.push(desto)
      }
    })
  })
  return [...new Set(destinationArr)]
}

function getYearlyTripsTotal() {
  return currentTraveler.calculateYearlyTripsTotal(2021, destinationsData)
}

function getTripPriceRequest() {
  let startDate = document.getElementById('startDate')
  let endDate = document.getElementById('endDate')
  let destinationsList = document.getElementById('destinationChoice')
  let numOfTravelers = document.getElementById('numOfTravelers')

  startDate = startDate.value
  endDate = endDate.value
  destinationsList = destinationsList.value
  numOfTravelers = numOfTravelers.value

  let findDestinationID = destinationsData.find(destination => destination.destination === destinationsList)
  let tripDuration = new Date(endDate) - new Date(startDate)
  let newStartDate = startDate.split('-').join('/')

  let newTrip = {
    "id": Date.now(), 
    "userID": currentTraveler.id,
    "destinationID": findDestinationID.id, 
    "travelers": Number(numOfTravelers), 
    "date": newStartDate, 
    "duration": (tripDuration / (60*60*24*1000)), 
    "status": "pending", 
    "suggestedActivities": []
  }
  
  currentTrip = new _Trip_js__WEBPACK_IMPORTED_MODULE_2__.default(newTrip)
  _apiCalls_js__WEBPACK_IMPORTED_MODULE_3__.default.updateData(currentTrip)
    .then(_domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.renderAdditionalPendingTrips(currentTrip, destinationsData))

  let tripTotalCost = currentTrip.returnTripTotalForGroup(newTrip, findDestinationID)
  return {currentTrip, destinationsList, tripTotalCost};
}

function displayNewPendingTrips() {
  _domUpdates_js__WEBPACK_IMPORTED_MODULE_4__.default.renderTripRequestMsg()
  clearTripInputFields()
}

// const show = (element) => {
//   element.classList.remove('hidden');
// };

// const hide = (element) => {
//   element.classList.add('hidden');
// };
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map