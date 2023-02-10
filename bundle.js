/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/DOMmanipulation.js":
/*!****************************************!*\
  !*** ./src/modules/DOMmanipulation.js ***!
  \****************************************/
/***/ (() => {



/***/ }),

/***/ "./src/modules/factories/gameboard.js":
/*!********************************************!*\
  !*** ./src/modules/factories/gameboard.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/* eslint-disable no-loop-func */
function Gameboard() {
  var grid;
  var createGrid = function createGrid() {
    var gridArray = [];
    for (var i = 1; i < 11; i++) {
      for (var j = 1; j < 11; j++) {
        gridArray.push({
          x: i,
          y: j,
          occupied: false,
          shipType: false,
          hitTaken: false
        });
      }
    }
    grid = gridArray;
  };
  createGrid();
  return {
    grid: grid,
    gameLost: false,
    addShip: function addShip(xCoord, yCoord, orientation, shipType, shipFactory) {
      var _this = this;
      var startSquare;
      var length;
      if (shipType === 'Patrol Boat') {
        length = 2;
      } else if (shipType === 'Submarine') {
        length = 3;
      } else if (shipType === 'Destroyer') {
        length = 3;
      } else if (shipType === 'Battleship') {
        length = 4;
      } else if (shipType === 'Carrier') {
        length = 5;
      }
      this.grid.forEach(function (square) {
        if (square.x === xCoord && square.y === yCoord) {
          startSquare = square;
        }
      });
      if (startSquare.occupied) return false;

      // Check if there is space to create ship and coords are in range
      var cantBuild = false;
      if (orientation === 'horizontal') {
        var _loop = function _loop(i) {
          if (i > 10) return {
            v: false
          };
          _this.grid.forEach(function (square) {
            if (square.x === i && square.y === startSquare.y && square.occupied) {
              cantBuild = true;
            }
          });
        };
        for (var i = xCoord; i < xCoord + length; i++) {
          var _ret = _loop(i);
          if (_typeof(_ret) === "object") return _ret.v;
        }
      } else if (orientation === 'vertical') {
        var _loop2 = function _loop2(_i) {
          if (_i > 10) return {
            v: false
          };
          _this.grid.forEach(function (square) {
            if (square.x === startSquare.x && square.y === _i && square.occupied) {
              cantBuild = true;
            }
          });
        };
        for (var _i = yCoord; _i < yCoord + length; _i++) {
          var _ret2 = _loop2(_i);
          if (_typeof(_ret2) === "object") return _ret2.v;
        }
      }
      if (cantBuild) return false;

      // Build ship
      var newShip = shipFactory(length);
      if (orientation === 'horizontal') {
        var _loop3 = function _loop3(_i2) {
          _this.grid.forEach(function (square) {
            if (square.x === _i2 && square.y === startSquare.y && !square.occupied) {
              square.occupied = newShip;
              square.shipType = shipType;
            }
          });
        };
        for (var _i2 = xCoord; _i2 < xCoord + length; _i2++) {
          _loop3(_i2);
        }
      } else if (orientation === 'vertical') {
        var _loop4 = function _loop4(_i3) {
          _this.grid.forEach(function (square) {
            if (square.x === startSquare.x && square.y === _i3 && !square.occupied) {
              square.occupied = newShip;
              square.shipType = shipType;
            }
          });
        };
        for (var _i3 = yCoord; _i3 < yCoord + length; _i3++) {
          _loop4(_i3);
        }
      }
    },
    getSquare: function getSquare(xCoord, yCoord) {
      return this.grid.find(function (square) {
        return square.x === xCoord && square.y === yCoord;
      });
    },
    receiveAttack: function receiveAttack(xCoord, yCoord) {
      var square = this.grid.find(function (sq) {
        return sq.x === xCoord && sq.y === yCoord;
      });
      if (!square.occupied && !square.hitTaken) {
        square.hitTaken = 'miss';
      } else if (square.occupied && !square.hitTaken) {
        square.hitTaken = 'damage';
        square.occupied.takeHit();
      } else if (square.occupied && square.hitTaken) {
        return true;
      }
      this.checkFleetCondition();
    },
    checkFleetCondition: function checkFleetCondition() {
      var fleetDeployed = this.grid.some(function (square) {
        return square.occupied;
      });
      var fleetAlive = this.grid.some(function (square) {
        return square.occupied && !square.hitTaken;
      });
      if (fleetDeployed && !fleetAlive) {
        this.gameLost = true;
      }
    }
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./src/modules/factories/player.js":
/*!*****************************************!*\
  !*** ./src/modules/factories/player.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/modules/factories/gameboard.js");

function Player() {
  return {
    gameboard: (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])(),
    gameWon: false,
    attack: function attack(xCoord, yCoord, enemyBoard) {
      enemyBoard.receiveAttack(xCoord, yCoord);
      if (enemyBoard.gameLost) {
        this.gameWon = true;
      }
    },
    randomAttack: function randomAttack(enemyBoard) {
      var shotFired = false;
      while (!shotFired) {
        var xCoord = Math.floor(Math.random() * 10) + 1;
        var yCoord = Math.floor(Math.random() * 10) + 1;
        var attackStatus = enemyBoard.receiveAttack(xCoord, yCoord);
        if (!attackStatus) {
          shotFired = true;
        }
      }
      if (enemyBoard.gameLost) {
        this.gameWon = true;
      }
    }
  };
}
var player = Player();
var enemyBoard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
player.randomAttack(enemyBoard);
player.randomAttack(enemyBoard);
player.randomAttack(enemyBoard);
player.randomAttack(enemyBoard);
player.randomAttack(enemyBoard);
console.log(enemyBoard.grid);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/modules/factories/ship.js":
/*!***************************************!*\
  !*** ./src/modules/factories/ship.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function Ship(length) {
  return {
    length: length,
    hitsTaken: 0,
    isSunk: false,
    takeHit: function takeHit() {
      this.hitsTaken += 1;
      this.checkHP();
    },
    checkHP: function checkHP() {
      if (this.hitsTaken >= this.length) {
        this.isSunk = true;
      }
    }
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss ***!
  \*****************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  background-color: gray; }\n", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"AAAA;EACI,sBAAsB,EAAA","sourcesContent":["body {\n    background-color: gray;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./style.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
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
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
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
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _modules_DOMmanipulation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/DOMmanipulation */ "./src/modules/DOMmanipulation.js");
/* harmony import */ var _modules_DOMmanipulation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_DOMmanipulation__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_factories_ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/factories/ship */ "./src/modules/factories/ship.js");
/* harmony import */ var _modules_factories_gameboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/factories/gameboard */ "./src/modules/factories/gameboard.js");
/* harmony import */ var _modules_factories_player__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/factories/player */ "./src/modules/factories/player.js");





})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FzQjtBQUNhO0FBQ0Q7QUFDSyIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9mYWN0b3JpZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9mYWN0b3JpZXMvcGxheWVyLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9mYWN0b3JpZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vc3JjL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9zcmMvc3R5bGUuc2Nzcz83NWJhIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL3NyYy9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tbG9vcC1mdW5jICovXG5mdW5jdGlvbiBHYW1lYm9hcmQoKSB7XG5cdGxldCBncmlkO1xuXG5cdGNvbnN0IGNyZWF0ZUdyaWQgPSAoKSA9PiB7XG5cdFx0Y29uc3QgZ3JpZEFycmF5ID0gW107XG5cdFx0Zm9yIChsZXQgaSA9IDE7IGkgPCAxMTsgaSsrKSB7XG5cdFx0XHRmb3IgKGxldCBqID0gMTsgaiA8IDExOyBqKyspIHtcblx0XHRcdFx0Z3JpZEFycmF5LnB1c2goe1xuXHRcdFx0XHRcdHg6IGksXG5cdFx0XHRcdFx0eTogaixcblx0XHRcdFx0XHRvY2N1cGllZDogZmFsc2UsXG5cdFx0XHRcdFx0c2hpcFR5cGU6IGZhbHNlLFxuXHRcdFx0XHRcdGhpdFRha2VuOiBmYWxzZSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGdyaWQgPSBncmlkQXJyYXk7XG5cdH07XG5cdGNyZWF0ZUdyaWQoKTtcblxuXHRyZXR1cm4ge1xuXHRcdGdyaWQsXG5cdFx0Z2FtZUxvc3Q6IGZhbHNlLFxuXG5cdFx0YWRkU2hpcCh4Q29vcmQsIHlDb29yZCwgb3JpZW50YXRpb24sIHNoaXBUeXBlLCBzaGlwRmFjdG9yeSkge1xuXHRcdFx0bGV0IHN0YXJ0U3F1YXJlO1xuXHRcdFx0bGV0IGxlbmd0aDtcblxuXHRcdFx0aWYgKHNoaXBUeXBlID09PSAnUGF0cm9sIEJvYXQnKSB7XG5cdFx0XHRcdGxlbmd0aCA9IDI7XG5cdFx0XHR9IGVsc2UgaWYgKHNoaXBUeXBlID09PSAnU3VibWFyaW5lJykge1xuXHRcdFx0XHRsZW5ndGggPSAzO1xuXHRcdFx0fSBlbHNlIGlmIChzaGlwVHlwZSA9PT0gJ0Rlc3Ryb3llcicpIHtcblx0XHRcdFx0bGVuZ3RoID0gMztcblx0XHRcdH0gZWxzZSBpZiAoc2hpcFR5cGUgPT09ICdCYXR0bGVzaGlwJykge1xuXHRcdFx0XHRsZW5ndGggPSA0O1xuXHRcdFx0fSBlbHNlIGlmIChzaGlwVHlwZSA9PT0gJ0NhcnJpZXInKSB7XG5cdFx0XHRcdGxlbmd0aCA9IDU7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuZ3JpZC5mb3JFYWNoKChzcXVhcmUpID0+IHtcblx0XHRcdFx0aWYgKHNxdWFyZS54ID09PSB4Q29vcmQgJiYgc3F1YXJlLnkgPT09IHlDb29yZCkge1xuXHRcdFx0XHRcdHN0YXJ0U3F1YXJlID0gc3F1YXJlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKHN0YXJ0U3F1YXJlLm9jY3VwaWVkKSByZXR1cm4gZmFsc2U7XG5cblx0XHRcdC8vIENoZWNrIGlmIHRoZXJlIGlzIHNwYWNlIHRvIGNyZWF0ZSBzaGlwIGFuZCBjb29yZHMgYXJlIGluIHJhbmdlXG5cdFx0XHRsZXQgY2FudEJ1aWxkID0gZmFsc2U7XG5cdFx0XHRpZiAob3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuXHRcdFx0XHRmb3IgKGxldCBpID0geENvb3JkOyBpIDwgeENvb3JkICsgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRpZiAoaSA+IDEwKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0dGhpcy5ncmlkLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0XHRzcXVhcmUueCA9PT0gaSAmJlxuXHRcdFx0XHRcdFx0XHRzcXVhcmUueSA9PT0gc3RhcnRTcXVhcmUueSAmJlxuXHRcdFx0XHRcdFx0XHRzcXVhcmUub2NjdXBpZWRcblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRjYW50QnVpbGQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKG9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG5cdFx0XHRcdGZvciAobGV0IGkgPSB5Q29vcmQ7IGkgPCB5Q29vcmQgKyBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGlmIChpID4gMTApIHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR0aGlzLmdyaWQuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS54ID09PSBzdGFydFNxdWFyZS54ICYmXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS55ID09PSBpICYmXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS5vY2N1cGllZFxuXHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdGNhbnRCdWlsZCA9IHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChjYW50QnVpbGQpIHJldHVybiBmYWxzZTtcblxuXHRcdFx0Ly8gQnVpbGQgc2hpcFxuXHRcdFx0Y29uc3QgbmV3U2hpcCA9IHNoaXBGYWN0b3J5KGxlbmd0aCk7XG5cdFx0XHRpZiAob3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuXHRcdFx0XHRmb3IgKGxldCBpID0geENvb3JkOyBpIDwgeENvb3JkICsgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR0aGlzLmdyaWQuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS54ID09PSBpICYmXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS55ID09PSBzdGFydFNxdWFyZS55ICYmXG5cdFx0XHRcdFx0XHRcdCFzcXVhcmUub2NjdXBpZWRcblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRzcXVhcmUub2NjdXBpZWQgPSBuZXdTaGlwO1xuXHRcdFx0XHRcdFx0XHRzcXVhcmUuc2hpcFR5cGUgPSBzaGlwVHlwZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuXHRcdFx0XHRmb3IgKGxldCBpID0geUNvb3JkOyBpIDwgeUNvb3JkICsgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR0aGlzLmdyaWQuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS54ID09PSBzdGFydFNxdWFyZS54ICYmXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS55ID09PSBpICYmXG5cdFx0XHRcdFx0XHRcdCFzcXVhcmUub2NjdXBpZWRcblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRzcXVhcmUub2NjdXBpZWQgPSBuZXdTaGlwO1xuXHRcdFx0XHRcdFx0XHRzcXVhcmUuc2hpcFR5cGUgPSBzaGlwVHlwZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRnZXRTcXVhcmUoeENvb3JkLCB5Q29vcmQpIHtcblx0XHRcdHJldHVybiB0aGlzLmdyaWQuZmluZChcblx0XHRcdFx0KHNxdWFyZSkgPT4gc3F1YXJlLnggPT09IHhDb29yZCAmJiBzcXVhcmUueSA9PT0geUNvb3JkXG5cdFx0XHQpO1xuXHRcdH0sXG5cblx0XHRyZWNlaXZlQXR0YWNrKHhDb29yZCwgeUNvb3JkKSB7XG5cdFx0XHRjb25zdCBzcXVhcmUgPSB0aGlzLmdyaWQuZmluZCgoc3EpID0+IHNxLnggPT09IHhDb29yZCAmJiBzcS55ID09PSB5Q29vcmQpO1xuXG5cdFx0XHRpZiAoIXNxdWFyZS5vY2N1cGllZCAmJiAhc3F1YXJlLmhpdFRha2VuKSB7XG5cdFx0XHRcdHNxdWFyZS5oaXRUYWtlbiA9ICdtaXNzJztcblx0XHRcdH0gZWxzZSBpZiAoc3F1YXJlLm9jY3VwaWVkICYmICFzcXVhcmUuaGl0VGFrZW4pIHtcblx0XHRcdFx0c3F1YXJlLmhpdFRha2VuID0gJ2RhbWFnZSc7XG5cdFx0XHRcdHNxdWFyZS5vY2N1cGllZC50YWtlSGl0KCk7XG5cdFx0XHR9IGVsc2UgaWYgKHNxdWFyZS5vY2N1cGllZCAmJiBzcXVhcmUuaGl0VGFrZW4pIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmNoZWNrRmxlZXRDb25kaXRpb24oKTtcblx0XHR9LFxuXG5cdFx0Y2hlY2tGbGVldENvbmRpdGlvbigpIHtcblx0XHRcdGNvbnN0IGZsZWV0RGVwbG95ZWQgPSB0aGlzLmdyaWQuc29tZSgoc3F1YXJlKSA9PiBzcXVhcmUub2NjdXBpZWQpO1xuXHRcdFx0Y29uc3QgZmxlZXRBbGl2ZSA9IHRoaXMuZ3JpZC5zb21lKFxuXHRcdFx0XHQoc3F1YXJlKSA9PiBzcXVhcmUub2NjdXBpZWQgJiYgIXNxdWFyZS5oaXRUYWtlblxuXHRcdFx0KTtcblx0XHRcdGlmIChmbGVldERlcGxveWVkICYmICFmbGVldEFsaXZlKSB7XG5cdFx0XHRcdHRoaXMuZ2FtZUxvc3QgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH0sXG5cdH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmQnO1xuXG5mdW5jdGlvbiBQbGF5ZXIoKSB7XG5cdHJldHVybiB7XG5cdFx0Z2FtZWJvYXJkOiBHYW1lYm9hcmQoKSxcblx0XHRnYW1lV29uOiBmYWxzZSxcblxuXHRcdGF0dGFjayh4Q29vcmQsIHlDb29yZCwgZW5lbXlCb2FyZCkge1xuXHRcdFx0ZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHhDb29yZCwgeUNvb3JkKTtcblx0XHRcdGlmIChlbmVteUJvYXJkLmdhbWVMb3N0KSB7XG5cdFx0XHRcdHRoaXMuZ2FtZVdvbiA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHJhbmRvbUF0dGFjayhlbmVteUJvYXJkKSB7XG5cdFx0XHRsZXQgc2hvdEZpcmVkID0gZmFsc2U7XG5cblx0XHRcdHdoaWxlICghc2hvdEZpcmVkKSB7XG5cdFx0XHRcdGNvbnN0IHhDb29yZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG5cdFx0XHRcdGNvbnN0IHlDb29yZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG5cdFx0XHRcdGNvbnN0IGF0dGFja1N0YXR1cyA9IGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh4Q29vcmQsIHlDb29yZCk7XG5cblx0XHRcdFx0aWYgKCFhdHRhY2tTdGF0dXMpIHtcblx0XHRcdFx0XHRzaG90RmlyZWQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChlbmVteUJvYXJkLmdhbWVMb3N0KSB7XG5cdFx0XHRcdHRoaXMuZ2FtZVdvbiA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSxcblx0fTtcbn1cblxuY29uc3QgcGxheWVyID0gUGxheWVyKCk7XG5jb25zdCBlbmVteUJvYXJkID0gR2FtZWJvYXJkKCk7XG5wbGF5ZXIucmFuZG9tQXR0YWNrKGVuZW15Qm9hcmQpO1xucGxheWVyLnJhbmRvbUF0dGFjayhlbmVteUJvYXJkKTtcbnBsYXllci5yYW5kb21BdHRhY2soZW5lbXlCb2FyZCk7XG5wbGF5ZXIucmFuZG9tQXR0YWNrKGVuZW15Qm9hcmQpO1xucGxheWVyLnJhbmRvbUF0dGFjayhlbmVteUJvYXJkKTtcbmNvbnNvbGUubG9nKGVuZW15Qm9hcmQuZ3JpZCk7XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImZ1bmN0aW9uIFNoaXAobGVuZ3RoKSB7XG5cdHJldHVybiB7XG5cdFx0bGVuZ3RoLFxuXHRcdGhpdHNUYWtlbjogMCxcblx0XHRpc1N1bms6IGZhbHNlLFxuXG5cdFx0dGFrZUhpdCgpIHtcblx0XHRcdHRoaXMuaGl0c1Rha2VuICs9IDE7XG5cdFx0XHR0aGlzLmNoZWNrSFAoKTtcblx0XHR9LFxuXG5cdFx0Y2hlY2tIUCgpIHtcblx0XHRcdGlmICh0aGlzLmhpdHNUYWtlbiA+PSB0aGlzLmxlbmd0aCkge1xuXHRcdFx0XHR0aGlzLmlzU3VuayA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSxcblx0fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcDsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcImJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTsgfVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0ksc0JBQXNCLEVBQUFcIixcInNvdXJjZXNDb250ZW50XCI6W1wiYm9keSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vc3R5bGUuc2Nzcyc7XG5pbXBvcnQgJy4vbW9kdWxlcy9ET01tYW5pcHVsYXRpb24nO1xuaW1wb3J0ICcuL21vZHVsZXMvZmFjdG9yaWVzL3NoaXAnO1xuaW1wb3J0ICcuL21vZHVsZXMvZmFjdG9yaWVzL2dhbWVib2FyZCc7XG5pbXBvcnQgJy4vbW9kdWxlcy9mYWN0b3JpZXMvcGxheWVyJztcbiJdLCJuYW1lcyI6WyJHYW1lYm9hcmQiLCJncmlkIiwiY3JlYXRlR3JpZCIsImdyaWRBcnJheSIsImkiLCJqIiwicHVzaCIsIngiLCJ5Iiwib2NjdXBpZWQiLCJzaGlwVHlwZSIsImhpdFRha2VuIiwiZ2FtZUxvc3QiLCJhZGRTaGlwIiwieENvb3JkIiwieUNvb3JkIiwib3JpZW50YXRpb24iLCJzaGlwRmFjdG9yeSIsInN0YXJ0U3F1YXJlIiwibGVuZ3RoIiwiZm9yRWFjaCIsInNxdWFyZSIsImNhbnRCdWlsZCIsIm5ld1NoaXAiLCJnZXRTcXVhcmUiLCJmaW5kIiwicmVjZWl2ZUF0dGFjayIsInNxIiwidGFrZUhpdCIsImNoZWNrRmxlZXRDb25kaXRpb24iLCJmbGVldERlcGxveWVkIiwic29tZSIsImZsZWV0QWxpdmUiLCJQbGF5ZXIiLCJnYW1lYm9hcmQiLCJnYW1lV29uIiwiYXR0YWNrIiwiZW5lbXlCb2FyZCIsInJhbmRvbUF0dGFjayIsInNob3RGaXJlZCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImF0dGFja1N0YXR1cyIsInBsYXllciIsImNvbnNvbGUiLCJsb2ciLCJTaGlwIiwiaGl0c1Rha2VuIiwiaXNTdW5rIiwiY2hlY2tIUCJdLCJzb3VyY2VSb290IjoiIn0=