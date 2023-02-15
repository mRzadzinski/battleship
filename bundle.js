/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/DOM.js":
/*!****************************!*\
  !*** ./src/modules/DOM.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addFleetDeploymentListener": () => (/* binding */ addFleetDeploymentListener),
/* harmony export */   "populateBoardHTML": () => (/* binding */ populateBoardHTML),
/* harmony export */   "randomBtn": () => (/* binding */ randomBtn),
/* harmony export */   "resetGridHTML": () => (/* binding */ resetGridHTML),
/* harmony export */   "startBtn": () => (/* binding */ startBtn)
/* harmony export */ });
/* harmony import */ var _shipTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipTypes */ "./src/modules/shipTypes.js");
/* harmony import */ var _img_github_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../img/github.png */ "./src/img/github.png");


var gitImg = document.querySelector('#github');
gitImg.src = _img_github_png__WEBPACK_IMPORTED_MODULE_1__;
var startBtn = document.querySelector('.start');
var randomBtn = document.querySelector('.random');
var left = document.querySelector('.left');
var right = document.querySelector('.right');
var row = document.createElement('div');
var square = document.createElement('div');
var playerBoard = document.createElement('div');
playerBoard.classList.add('board');
row.classList.add('row');
square.classList.add('square');

// Create grid
for (var i = 1; i < 11; i++) {
  playerBoard.appendChild(row.cloneNode());
  for (var j = 1; j < 11; j++) {
    var tempSquare = square.cloneNode();
    tempSquare.setAttribute('data-x', j);
    tempSquare.setAttribute('data-y', i);
    playerBoard.lastChild.appendChild(tempSquare);
  }
}
var aiBoard = playerBoard.cloneNode(true);
playerBoard.classList.add('player-board');
aiBoard.classList.add('ai-board');
aiBoard.style.display = 'none';
left.appendChild(playerBoard);
right.appendChild(aiBoard);
function helperChoosePlayerGrid(player) {
  var gridHTML;
  if (player === 'player') {
    gridHTML = playerBoard;
  } else if (player === 'ai') {
    gridHTML = aiBoard;
  }
  return gridHTML;
}
function populateBoardHTML(player, gridObject) {
  var gridHTML = helperChoosePlayerGrid(player);
  var squareHTML;

  // Find HTML equivalent of square object by coordinates
  gridObject.forEach(function (squareObj) {
    gridHTML.childNodes.forEach(function (rowHTML) {
      rowHTML.childNodes.forEach(function (sq) {
        if (squareObj.x === +sq.getAttribute('data-x') && squareObj.y === +sq.getAttribute('data-y')) {
          squareHTML = sq;
        }
      });
    });
    if (squareObj.occupied) {
      if (squareObj.shipType === 'Patrol Boat') {
        squareHTML.style.backgroundColor = 'rgb(80, 180, 226)';
      } else if (squareObj.shipType === 'Submarine') {
        squareHTML.style.backgroundColor = 'rgb(0, 184, 144)';
      } else if (squareObj.shipType === 'Destroyer') {
        squareHTML.style.backgroundColor = 'rgb(246, 215, 60)';
      } else if (squareObj.shipType === 'Battleship') {
        squareHTML.style.backgroundColor = 'rgb(255, 155, 133)';
      } else if (squareObj.shipType === 'Carrier') {
        squareHTML.style.backgroundColor = 'rgb(250, 108, 56)';
      }
    } else {
      squareHTML.style.backgroundColor = 'rgb(31, 41, 55)';
    }
  });
}
function resetGridHTML(player) {
  var gridHTML = helperChoosePlayerGrid(player);
  gridHTML.childNodes.forEach(function (rowHTML) {
    rowHTML.childNodes.forEach(function (sq) {
      sq.style.backgroundColor = 'rgb(31, 41, 55)';
    });
  });
}
function removeGridListeners() {
  var playerBoardClone = playerBoard.cloneNode(true);
  var aiBoardClone = aiBoard.cloneNode(true);
  playerBoard.parentNode.replaceChild(playerBoardClone, playerBoard);
  aiBoard.parentNode.replaceChild(aiBoardClone, aiBoard);
  playerBoard = playerBoardClone;
  aiBoard = aiBoardClone;
}
function addFleetDeploymentListener(orientation, gameboardObj) {
  removeGridListeners();
  playerBoard.childNodes.forEach(function (rowHTML) {
    rowHTML.childNodes.forEach(function (sq) {
      var sqX = sq.getAttribute('data-x');
      var sqY = sq.getAttribute('data-y');

      // Show on grid if ship can be added
      sq.addEventListener('mouseover', function () {
        if (!gameboardObj.grid.some(function (el) {
          return el.shipType === 'Carrier';
        })) {
          var noSpace = gameboardObj.checkSpaceForShip(sqX, sqY, 5, orientation);
          console.log(noSpace);
        }
      });
      // When leaving grid cell remove deployment indication
      sq.addEventListener('mouseleave', function () {
        populateBoardHTML('player', gameboardObj.grid);
      });
    });
  });
}


/***/ }),

/***/ "./src/modules/factories/gameboard.js":
/*!********************************************!*\
  !*** ./src/modules/factories/gameboard.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/modules/factories/ship.js");
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
    clearGrid: function clearGrid() {
      this.grid.forEach(function (square) {
        square.occupied = false;
        square.shipType = false;
        square.hitTaken = false;
      });
    },
    // Check if there is space to create ship and coords are in range
    checkSpaceForShip: function checkSpaceForShip(xCoord, yCoord, length, orientation) {
      var _this = this;
      var startSquare = this.getSquare(xCoord, yCoord);
      var cantBuild = false;
      if (orientation === 'horizontal') {
        var _loop = function _loop(i) {
          if (i > 10) return {
            v: true
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
            v: true
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
      return cantBuild;
    },
    addShip: function addShip(xCoord, yCoord, orientation, shipType) {
      var _this2 = this;
      var startSquare = this.getSquare(xCoord, yCoord);
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
      if (startSquare.occupied) return false;
      var noSpace = this.checkSpaceForShip(xCoord, yCoord, length, orientation);
      if (noSpace) return false;

      // Build ship
      var newShip = (0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(length);
      if (orientation === 'horizontal') {
        var _loop3 = function _loop3(i) {
          _this2.grid.forEach(function (square) {
            if (square.x === i && square.y === startSquare.y && !square.occupied) {
              square.occupied = newShip;
              square.shipType = shipType;
            }
          });
        };
        for (var i = xCoord; i < xCoord + length; i++) {
          _loop3(i);
        }
      } else if (orientation === 'vertical') {
        var _loop4 = function _loop4(_i2) {
          _this2.grid.forEach(function (square) {
            if (square.x === startSquare.x && square.y === _i2 && !square.occupied) {
              square.occupied = newShip;
              square.shipType = shipType;
            }
          });
        };
        for (var _i2 = yCoord; _i2 < yCoord + length; _i2++) {
          _loop4(_i2);
        }
      }
      return true;
    },
    randomFleetPlacement: function randomFleetPlacement() {
      this.randomShipPlacement('Patrol Boat');
      this.randomShipPlacement('Submarine');
      this.randomShipPlacement('Destroyer');
      this.randomShipPlacement('Battleship');
      this.randomShipPlacement('Carrier');
    },
    randomShipPlacement: function randomShipPlacement(shipType) {
      var shipBuilt = false;
      while (!shipBuilt) {
        var orientation = void 0;
        var orientationNumber = Math.floor(Math.random() * 2) + 1;
        var xCoord = Math.floor(Math.random() * 10) + 1;
        var yCoord = Math.floor(Math.random() * 10) + 1;
        if (orientationNumber === 1) {
          orientation = 'horizontal';
        } else {
          orientation = 'vertical';
        }
        shipBuilt = this.addShip(xCoord, yCoord, orientation, shipType);
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
      if (square.hitTaken) {
        return false;
      }
      if (!square.occupied && !square.hitTaken) {
        square.hitTaken = 'miss';
      } else if (square.occupied && !square.hitTaken) {
        square.hitTaken = 'damage';
        square.occupied.takeHit();
      }
      this.checkFleetCondition();
      return true;
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
        shotFired = enemyBoard.receiveAttack(xCoord, yCoord);
      }
      if (enemyBoard.gameLost) {
        this.gameWon = true;
      }
    }
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/modules/factories/ship.js":
/*!***************************************!*\
  !*** ./src/modules/factories/ship.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ "./src/modules/gameLoop.js":
/*!*********************************!*\
  !*** ./src/modules/gameLoop.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _factories_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factories/player */ "./src/modules/factories/player.js");
/* harmony import */ var _shipTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shipTypes */ "./src/modules/shipTypes.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOM */ "./src/modules/DOM.js");




// Initialize players
var player = (0,_factories_player__WEBPACK_IMPORTED_MODULE_0__["default"])();
var ai = (0,_factories_player__WEBPACK_IMPORTED_MODULE_0__["default"])();

// AI random fleet deployment
ai.gameboard.randomFleetPlacement();

// Player random fleet deployment
_DOM__WEBPACK_IMPORTED_MODULE_2__.randomBtn.addEventListener('click', function () {
  player.gameboard.clearGrid();
  (0,_DOM__WEBPACK_IMPORTED_MODULE_2__.resetGridHTML)('player');
  player.gameboard.randomFleetPlacement();
  (0,_DOM__WEBPACK_IMPORTED_MODULE_2__.populateBoardHTML)('player', player.gameboard.grid);
});

// Player manual fleet deployment
var orientation = 'horizontal';
(0,_DOM__WEBPACK_IMPORTED_MODULE_2__.addFleetDeploymentListener)(orientation, player.gameboard);

// Toggle ship orientation
document.addEventListener('keypress', function (e) {
  if (e.code === 'KeyR') {
    if (orientation === 'horizontal') {
      orientation = 'vertical';
    } else if (orientation === 'vertical') {
      orientation = 'horizontal';
    }
    (0,_DOM__WEBPACK_IMPORTED_MODULE_2__.addFleetDeploymentListener)(orientation, player.gameboard);
  }
});

// player.gameboard.addShip(1, 1, 'horizontal', 'Carrier');
// player.gameboard.addShip(3, 2, 'horizontal', 'Patrol Boat');
// player.gameboard.addShip(5, 4, 'horizontal', 'Submarine');
// player.gameboard.addShip(2, 6, 'horizontal', 'Destroyer');
// player.gameboard.addShip(7, 6, 'vertical', 'Battleship');

/***/ }),

/***/ "./src/modules/shipTypes.js":
/*!**********************************!*\
  !*** ./src/modules/shipTypes.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var shipTypes = ['Carrier', 'Battleship', 'Submarine', 'Destroyer', 'Patrol Boat'];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shipTypes);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss ***!
  \*****************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@600&family=Unbounded:wght@800&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  display: flex;\n  flex-direction: column;\n  background-color: #1f2937;\n  margin: 0;\n  padding: 0;\n  width: 100vw;\n  min-width: 950px;\n  height: 100vh;\n  min-height: 650px;\n  font-family: 'Roboto Mono', monospace; }\n\n.title {\n  width: 100vw;\n  height: 130px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: white;\n  font-family: 'Unbounded', cursive;\n  font-size: 80px;\n  margin-top: 30px; }\n\n.game-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 100px;\n  width: 100vw;\n  height: 100%;\n  color: white; }\n  .game-container .left,\n  .game-container .right {\n    display: flex;\n    align-items: center;\n    width: 50vw;\n    height: 500px;\n    margin-top: -2%; }\n  .game-container .left {\n    justify-content: end; }\n  .game-container .right {\n    justify-content: start; }\n  .game-container .options {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    flex-shrink: 0;\n    gap: 20px;\n    width: 380px;\n    height: 500px;\n    text-align: center;\n    font-size: 33px;\n    line-height: 52px; }\n    .game-container .options .rotate-instruction {\n      height: 135px;\n      border-bottom: 2px solid white; }\n    .game-container .options .random-deployment {\n      display: flex; }\n\n.board {\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 0;\n  width: 400px;\n  height: 400px;\n  border: solid 1px white; }\n  .board .row {\n    display: flex;\n    flex-direction: row;\n    flex-grow: 1; }\n\n.square {\n  flex-grow: 1;\n  border: solid 1px white; }\n\n.footer {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 70px;\n  width: 100vw;\n  text-align: center;\n  font-size: 15px;\n  color: #c8c8c8; }\n\n#github {\n  height: 27px;\n  width: 27px;\n  padding-bottom: 0.2vh;\n  transition: 0.3s; }\n\n#github:hover {\n  transform: scale(1.1); }\n\n.button {\n  position: relative;\n  display: inline-block;\n  margin: 25px 10px 0 10px;\n  width: 190px;\n  transform: scale(0.83);\n  line-height: 21px; }\n\n.button a {\n  color: white;\n  font-family: Helvetica, sans-serif;\n  font-weight: bold;\n  font-size: 25px;\n  text-align: center;\n  text-decoration: none;\n  background-color: #b55e4b;\n  display: block;\n  position: relative;\n  padding: 20px 40px;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  text-shadow: 0px 1px 0px #000;\n  filter: dropshadow(color=#000, offx=0 px, offy=1 px);\n  -webkit-box-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n  -moz-box-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n  box-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  border-radius: 5px; }\n\n.button a:active {\n  top: 10px;\n  background-color: #b55e4b;\n  -webkit-box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100;\n  -moz-box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100;\n  box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100; }\n\n.button.start a,\n.button.start a:active {\n  background-color: #c31212; }\n\n.button:after {\n  content: '';\n  height: 100%;\n  width: 100%;\n  padding: 4px;\n  position: absolute;\n  bottom: -15px;\n  left: -4px;\n  z-index: -1;\n  background-color: #2b1800;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  border-radius: 5px; }\n", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"AAEA;EACC,aAAa;EACb,sBAAsB;EACtB,yBAAiC;EACjC,SAAS;EACT,UAAU;EAEV,YAAY;EACZ,gBAAgB;EAChB,aAAa;EACb,iBAAiB;EAEjB,qCAAqC,EAAA;;AAGtC;EACC,YAAY;EACZ,aAAa;EAEb,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,iCAAiC;EACjC,eAAe;EACf,gBAAgB,EAAA;;AAGjB;EACC,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,UAAU;EAEV,YAAY;EACZ,YAAY;EACZ,YAAY,EAAA;EARb;;IAYE,aAAa;IACb,mBAAmB;IAEnB,WAAW;IACX,aAAa;IACb,eAAe,EAAA;EAjBjB;IAqBE,oBAAoB,EAAA;EArBtB;IAwBE,sBAAsB,EAAA;EAxBxB;IA4BE,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,sBAAsB;IACtB,cAAc;IACd,SAAS;IAET,YAAY;IACZ,aAAa;IACb,kBAAkB;IAClB,eAAe;IACf,iBAAiB,EAAA;IAvCnB;MA0CG,aAAa;MACb,8BAA8B,EAAA;IA3CjC;MA+CG,aAAa,EAAA;;AAKhB;EACC,aAAa;EACb,sBAAsB;EACtB,cAAc;EAEd,YAAY;EACZ,aAAa;EACb,uBAAuB,EAAA;EAPxB;IAUE,aAAa;IACb,mBAAmB;IACnB,YAAY,EAAA;;AAId;EACC,YAAY;EACZ,uBAAuB,EAAA;;AAGxB;EACC,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf,cAAyB,EAAA;;AAG1B;EACC,YAAY;EACZ,WAAW;EACX,qBAAqB;EACrB,gBAAgB,EAAA;;AAGjB;EACC,qBAAqB,EAAA;;AAKtB;EACC,kBAAkB;EAClB,qBAAqB;EACrB,wBAAwB;EAExB,YAAY;EACZ,sBAAqB;EACrB,iBAAiB,EAAA;;AAGlB;EACC,YAAY;EACZ,kCAAkC;EAClC,iBAAiB;EACjB,eAAe;EACf,kBAAkB;EAClB,qBAAqB;EACrB,yBAAkC;EAClC,cAAc;EACd,kBAAkB;EAClB,kBAAkB;EAElB,6CAA6C;EAC7C,6BAA6B;EAC7B,oDAAkD;EAElD,0DAA0D;EAC1D,uDAAuD;EACvD,kDAAkD;EAElD,0BAA0B;EAC1B,uBAAuB;EACvB,kBAAkB,EAAA;;AAGnB;EACC,SAAS;EACT,yBAAkC;EAElC,iEAAiE;EACjE,8DAA8D;EAC9D,yDAAyD,EAAA;;AAG1D;;EAEC,yBAAyB,EAAA;;AAG1B;EACC,WAAW;EACX,YAAY;EACZ,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,aAAa;EACb,UAAU;EACV,WAAW;EACX,yBAAyB;EACzB,0BAA0B;EAC1B,uBAAuB;EACvB,kBAAkB,EAAA","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@600&family=Unbounded:wght@800&display=swap');\n\nbody {\n\tdisplay: flex;\n\tflex-direction: column;\n\tbackground-color: rgb(31, 41, 55);\n\tmargin: 0;\n\tpadding: 0;\n\n\twidth: 100vw;\n\tmin-width: 950px;\n\theight: 100vh;\n\tmin-height: 650px;\n\n\tfont-family: 'Roboto Mono', monospace;\n}\n\n.title {\n\twidth: 100vw;\n\theight: 130px;\n\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tcolor: white;\n\tfont-family: 'Unbounded', cursive;\n\tfont-size: 80px;\n\tmargin-top: 30px;\n}\n\n.game-container {\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tgap: 100px;\n\n\twidth: 100vw;\n\theight: 100%;\n\tcolor: white;\n\n\t.left,\n\t.right {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\n\t\twidth: 50vw;\n\t\theight: 500px;\n\t\tmargin-top: -2%;\n\t}\n\n\t.left {\n\t\tjustify-content: end;\n\t}\n\t.right {\n\t\tjustify-content: start;\n\t}\n\n\t.options {\n\t\tdisplay: flex;\n\t\tjustify-content: center;\n\t\talign-items: center;\n\t\tflex-direction: column;\n\t\tflex-shrink: 0;\n\t\tgap: 20px;\n\n\t\twidth: 380px;\n\t\theight: 500px;\n\t\ttext-align: center;\n\t\tfont-size: 33px;\n\t\tline-height: 52px;\n\n\t\t.rotate-instruction {\n\t\t\theight: 135px;\n\t\t\tborder-bottom: 2px solid white;\n\t\t}\n\n\t\t.random-deployment {\n\t\t\tdisplay: flex;\n\t\t}\n\t}\n}\n\n.board {\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex-shrink: 0;\n\n\twidth: 400px;\n\theight: 400px;\n\tborder: solid 1px white;\n\n\t.row {\n\t\tdisplay: flex;\n\t\tflex-direction: row;\n\t\tflex-grow: 1;\n\t}\n}\n\n.square {\n\tflex-grow: 1;\n\tborder: solid 1px white;\n}\n\n.footer {\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\theight: 70px;\n\twidth: 100vw;\n\ttext-align: center;\n\tfont-size: 15px;\n\tcolor: rgb(200, 200, 200);\n}\n\n#github {\n\theight: 27px;\n\twidth: 27px;\n\tpadding-bottom: 0.2vh;\n\ttransition: 0.3s;\n}\n\n#github:hover {\n\ttransform: scale(1.1);\n}\n\n// Button from https://dev.to/webdeasy/top-20-css-buttons-animations-f41\n// author jemware. Adjusted a bit to my own needs.\n.button {\n\tposition: relative;\n\tdisplay: inline-block;\n\tmargin: 25px 10px 0 10px;\n\n\twidth: 190px;\n\ttransform: scale(.83);\n\tline-height: 21px;\n}\n\n.button a {\n\tcolor: white;\n\tfont-family: Helvetica, sans-serif;\n\tfont-weight: bold;\n\tfont-size: 25px;\n\ttext-align: center;\n\ttext-decoration: none;\n\tbackground-color: rgb(181, 94, 75);\n\tdisplay: block;\n\tposition: relative;\n\tpadding: 20px 40px;\n\n\t-webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n\ttext-shadow: 0px 1px 0px #000;\n\tfilter: dropshadow(color=#000, offx=0px, offy=1px);\n\n\t-webkit-box-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n\t-moz-box-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n\tbox-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n\n\t-webkit-border-radius: 5px;\n\t-moz-border-radius: 5px;\n\tborder-radius: 5px;\n}\n\n.button a:active {\n\ttop: 10px;\n\tbackground-color: rgb(181, 94, 75);\n\n\t-webkit-box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100;\n\t-moz-box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100;\n\tbox-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100;\n}\n\n.button.start a,\n.button.start a:active {\n\tbackground-color: #c31212;\n}\n\n.button:after {\n\tcontent: '';\n\theight: 100%;\n\twidth: 100%;\n\tpadding: 4px;\n\tposition: absolute;\n\tbottom: -15px;\n\tleft: -4px;\n\tz-index: -1;\n\tbackground-color: #2b1800;\n\t-webkit-border-radius: 5px;\n\t-moz-border-radius: 5px;\n\tborder-radius: 5px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



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

/***/ }),

/***/ "./src/img/github.png":
/*!****************************!*\
  !*** ./src/img/github.png ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "3febced75f95c7070397.png";

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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _modules_DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/DOM */ "./src/modules/DOM.js");
/* harmony import */ var _modules_gameLoop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/gameLoop */ "./src/modules/gameLoop.js");
/* harmony import */ var _modules_factories_ship__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/factories/ship */ "./src/modules/factories/ship.js");
/* harmony import */ var _modules_factories_gameboard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/factories/gameboard */ "./src/modules/factories/gameboard.js");
/* harmony import */ var _modules_factories_player__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/factories/player */ "./src/modules/factories/player.js");






})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQW9DO0FBQ0k7QUFFeEMsSUFBTUUsTUFBTSxHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxTQUFTLENBQUM7QUFDaERGLE1BQU0sQ0FBQ0csR0FBRyxHQUFHSiw0Q0FBTztBQUVwQixJQUFNSyxRQUFRLEdBQUdILFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFFBQVEsQ0FBQztBQUNqRCxJQUFNRyxTQUFTLEdBQUdKLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFNBQVMsQ0FBQztBQUVuRCxJQUFNSSxJQUFJLEdBQUdMLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLE9BQU8sQ0FBQztBQUM1QyxJQUFNSyxLQUFLLEdBQUdOLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFFBQVEsQ0FBQztBQUU5QyxJQUFNTSxHQUFHLEdBQUdQLFFBQVEsQ0FBQ1EsYUFBYSxDQUFDLEtBQUssQ0FBQztBQUN6QyxJQUFNQyxNQUFNLEdBQUdULFFBQVEsQ0FBQ1EsYUFBYSxDQUFDLEtBQUssQ0FBQztBQUM1QyxJQUFJRSxXQUFXLEdBQUdWLFFBQVEsQ0FBQ1EsYUFBYSxDQUFDLEtBQUssQ0FBQztBQUUvQ0UsV0FBVyxDQUFDQyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFDbENMLEdBQUcsQ0FBQ0ksU0FBUyxDQUFDQyxHQUFHLENBQUMsS0FBSyxDQUFDO0FBQ3hCSCxNQUFNLENBQUNFLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFFBQVEsQ0FBQzs7QUFFOUI7QUFDQSxLQUFLLElBQUlDLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxFQUFFLEVBQUVBLENBQUMsRUFBRSxFQUFFO0VBQzVCSCxXQUFXLENBQUNJLFdBQVcsQ0FBQ1AsR0FBRyxDQUFDUSxTQUFTLEVBQUUsQ0FBQztFQUN4QyxLQUFLLElBQUlDLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxFQUFFLEVBQUVBLENBQUMsRUFBRSxFQUFFO0lBQzVCLElBQU1DLFVBQVUsR0FBR1IsTUFBTSxDQUFDTSxTQUFTLEVBQUU7SUFDckNFLFVBQVUsQ0FBQ0MsWUFBWSxDQUFDLFFBQVEsRUFBRUYsQ0FBQyxDQUFDO0lBQ3BDQyxVQUFVLENBQUNDLFlBQVksQ0FBQyxRQUFRLEVBQUVMLENBQUMsQ0FBQztJQUVwQ0gsV0FBVyxDQUFDUyxTQUFTLENBQUNMLFdBQVcsQ0FBQ0csVUFBVSxDQUFDO0VBQzlDO0FBQ0Q7QUFFQSxJQUFJRyxPQUFPLEdBQUdWLFdBQVcsQ0FBQ0ssU0FBUyxDQUFDLElBQUksQ0FBQztBQUN6Q0wsV0FBVyxDQUFDQyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxjQUFjLENBQUM7QUFDekNRLE9BQU8sQ0FBQ1QsU0FBUyxDQUFDQyxHQUFHLENBQUMsVUFBVSxDQUFDO0FBQ2pDUSxPQUFPLENBQUNDLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07QUFFOUJqQixJQUFJLENBQUNTLFdBQVcsQ0FBQ0osV0FBVyxDQUFDO0FBQzdCSixLQUFLLENBQUNRLFdBQVcsQ0FBQ00sT0FBTyxDQUFDO0FBRTFCLFNBQVNHLHNCQUFzQixDQUFDQyxNQUFNLEVBQUU7RUFDdkMsSUFBSUMsUUFBUTtFQUVaLElBQUlELE1BQU0sS0FBSyxRQUFRLEVBQUU7SUFDeEJDLFFBQVEsR0FBR2YsV0FBVztFQUN2QixDQUFDLE1BQU0sSUFBSWMsTUFBTSxLQUFLLElBQUksRUFBRTtJQUMzQkMsUUFBUSxHQUFHTCxPQUFPO0VBQ25CO0VBQ0EsT0FBT0ssUUFBUTtBQUNoQjtBQUVBLFNBQVNDLGlCQUFpQixDQUFDRixNQUFNLEVBQUVHLFVBQVUsRUFBRTtFQUM5QyxJQUFNRixRQUFRLEdBQUdGLHNCQUFzQixDQUFDQyxNQUFNLENBQUM7RUFDL0MsSUFBSUksVUFBVTs7RUFFZDtFQUNBRCxVQUFVLENBQUNFLE9BQU8sQ0FBQyxVQUFDQyxTQUFTLEVBQUs7SUFDakNMLFFBQVEsQ0FBQ00sVUFBVSxDQUFDRixPQUFPLENBQUMsVUFBQ0csT0FBTyxFQUFLO01BQ3hDQSxPQUFPLENBQUNELFVBQVUsQ0FBQ0YsT0FBTyxDQUFDLFVBQUNJLEVBQUUsRUFBSztRQUNsQyxJQUNDSCxTQUFTLENBQUNJLENBQUMsS0FBSyxDQUFDRCxFQUFFLENBQUNFLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFDMUNMLFNBQVMsQ0FBQ00sQ0FBQyxLQUFLLENBQUNILEVBQUUsQ0FBQ0UsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUN6QztVQUNEUCxVQUFVLEdBQUdLLEVBQUU7UUFDaEI7TUFDRCxDQUFDLENBQUM7SUFDSCxDQUFDLENBQUM7SUFFRixJQUFJSCxTQUFTLENBQUNPLFFBQVEsRUFBRTtNQUN2QixJQUFJUCxTQUFTLENBQUNRLFFBQVEsS0FBSyxhQUFhLEVBQUU7UUFDekNWLFVBQVUsQ0FBQ1AsS0FBSyxDQUFDa0IsZUFBZSxHQUFHLG1CQUFtQjtNQUN2RCxDQUFDLE1BQU0sSUFBSVQsU0FBUyxDQUFDUSxRQUFRLEtBQUssV0FBVyxFQUFFO1FBQzlDVixVQUFVLENBQUNQLEtBQUssQ0FBQ2tCLGVBQWUsR0FBRyxrQkFBa0I7TUFDdEQsQ0FBQyxNQUFNLElBQUlULFNBQVMsQ0FBQ1EsUUFBUSxLQUFLLFdBQVcsRUFBRTtRQUM5Q1YsVUFBVSxDQUFDUCxLQUFLLENBQUNrQixlQUFlLEdBQUcsbUJBQW1CO01BQ3ZELENBQUMsTUFBTSxJQUFJVCxTQUFTLENBQUNRLFFBQVEsS0FBSyxZQUFZLEVBQUU7UUFDL0NWLFVBQVUsQ0FBQ1AsS0FBSyxDQUFDa0IsZUFBZSxHQUFHLG9CQUFvQjtNQUN4RCxDQUFDLE1BQU0sSUFBSVQsU0FBUyxDQUFDUSxRQUFRLEtBQUssU0FBUyxFQUFFO1FBQzVDVixVQUFVLENBQUNQLEtBQUssQ0FBQ2tCLGVBQWUsR0FBRyxtQkFBbUI7TUFDdkQ7SUFDRCxDQUFDLE1BQU07TUFDTlgsVUFBVSxDQUFDUCxLQUFLLENBQUNrQixlQUFlLEdBQUcsaUJBQWlCO0lBQ3JEO0VBR0QsQ0FBQyxDQUFDO0FBQ0g7QUFFQSxTQUFTQyxhQUFhLENBQUNoQixNQUFNLEVBQUU7RUFDOUIsSUFBTUMsUUFBUSxHQUFHRixzQkFBc0IsQ0FBQ0MsTUFBTSxDQUFDO0VBRS9DQyxRQUFRLENBQUNNLFVBQVUsQ0FBQ0YsT0FBTyxDQUFDLFVBQUNHLE9BQU8sRUFBSztJQUN4Q0EsT0FBTyxDQUFDRCxVQUFVLENBQUNGLE9BQU8sQ0FBQyxVQUFDSSxFQUFFLEVBQUs7TUFDbENBLEVBQUUsQ0FBQ1osS0FBSyxDQUFDa0IsZUFBZSxHQUFHLGlCQUFpQjtJQUM3QyxDQUFDLENBQUM7RUFDSCxDQUFDLENBQUM7QUFDSDtBQUVBLFNBQVNFLG1CQUFtQixHQUFHO0VBQzlCLElBQU1DLGdCQUFnQixHQUFHaEMsV0FBVyxDQUFDSyxTQUFTLENBQUMsSUFBSSxDQUFDO0VBQ3BELElBQU00QixZQUFZLEdBQUd2QixPQUFPLENBQUNMLFNBQVMsQ0FBQyxJQUFJLENBQUM7RUFFNUNMLFdBQVcsQ0FBQ2tDLFVBQVUsQ0FBQ0MsWUFBWSxDQUFDSCxnQkFBZ0IsRUFBRWhDLFdBQVcsQ0FBQztFQUNsRVUsT0FBTyxDQUFDd0IsVUFBVSxDQUFDQyxZQUFZLENBQUNGLFlBQVksRUFBRXZCLE9BQU8sQ0FBQztFQUV0RFYsV0FBVyxHQUFHZ0MsZ0JBQWdCO0VBQzlCdEIsT0FBTyxHQUFHdUIsWUFBWTtBQUN2QjtBQUVBLFNBQVNHLDBCQUEwQixDQUFDQyxXQUFXLEVBQUVDLFlBQVksRUFBRTtFQUM5RFAsbUJBQW1CLEVBQUU7RUFFckIvQixXQUFXLENBQUNxQixVQUFVLENBQUNGLE9BQU8sQ0FBQyxVQUFDRyxPQUFPLEVBQUs7SUFDM0NBLE9BQU8sQ0FBQ0QsVUFBVSxDQUFDRixPQUFPLENBQUMsVUFBQ0ksRUFBRSxFQUFLO01BQ2xDLElBQU1nQixHQUFHLEdBQUdoQixFQUFFLENBQUNFLFlBQVksQ0FBQyxRQUFRLENBQUM7TUFDckMsSUFBTWUsR0FBRyxHQUFHakIsRUFBRSxDQUFDRSxZQUFZLENBQUMsUUFBUSxDQUFDOztNQUVyQztNQUNBRixFQUFFLENBQUNrQixnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsWUFBTTtRQUN0QyxJQUFJLENBQUNILFlBQVksQ0FBQ0ksSUFBSSxDQUFDQyxJQUFJLENBQUMsVUFBQ0MsRUFBRTtVQUFBLE9BQUtBLEVBQUUsQ0FBQ2hCLFFBQVEsS0FBSyxTQUFTO1FBQUEsRUFBQyxFQUFFO1VBQy9ELElBQU1pQixPQUFPLEdBQUdQLFlBQVksQ0FBQ1EsaUJBQWlCLENBQUNQLEdBQUcsRUFBRUMsR0FBRyxFQUFFLENBQUMsRUFBRUgsV0FBVyxDQUFDO1VBQ3hFVSxPQUFPLENBQUNDLEdBQUcsQ0FBQ0gsT0FBTyxDQUFDO1FBQ3JCO01BQ0QsQ0FBQyxDQUFDO01BQ0Y7TUFDQXRCLEVBQUUsQ0FBQ2tCLGdCQUFnQixDQUFDLFlBQVksRUFBRSxZQUFNO1FBQ3ZDekIsaUJBQWlCLENBQUMsUUFBUSxFQUFFc0IsWUFBWSxDQUFDSSxJQUFJLENBQUM7TUFDL0MsQ0FBQyxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0VBQ0gsQ0FBQyxDQUFDO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbElBO0FBQzBCO0FBRTFCLFNBQVNRLFNBQVMsR0FBRztFQUNwQixJQUFJUixJQUFJO0VBRVIsSUFBTVMsVUFBVSxHQUFHLFNBQWJBLFVBQVUsR0FBUztJQUN4QixJQUFNQyxTQUFTLEdBQUcsRUFBRTtJQUNwQixLQUFLLElBQUlqRCxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcsRUFBRSxFQUFFQSxDQUFDLEVBQUUsRUFBRTtNQUM1QixLQUFLLElBQUlHLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxFQUFFLEVBQUVBLENBQUMsRUFBRSxFQUFFO1FBQzVCOEMsU0FBUyxDQUFDQyxJQUFJLENBQUM7VUFDZDdCLENBQUMsRUFBRXJCLENBQUM7VUFDSnVCLENBQUMsRUFBRXBCLENBQUM7VUFDSnFCLFFBQVEsRUFBRSxLQUFLO1VBQ2ZDLFFBQVEsRUFBRSxLQUFLO1VBQ2YwQixRQUFRLEVBQUU7UUFDWCxDQUFDLENBQUM7TUFDSDtJQUNEO0lBQ0FaLElBQUksR0FBR1UsU0FBUztFQUNqQixDQUFDO0VBQ0RELFVBQVUsRUFBRTtFQUVaLE9BQU87SUFDTlQsSUFBSSxFQUFKQSxJQUFJO0lBQ0phLFFBQVEsRUFBRSxLQUFLO0lBRWZDLFNBQVMsdUJBQUc7TUFDWCxJQUFJLENBQUNkLElBQUksQ0FBQ3ZCLE9BQU8sQ0FBQyxVQUFDcEIsTUFBTSxFQUFLO1FBQzdCQSxNQUFNLENBQUM0QixRQUFRLEdBQUcsS0FBSztRQUN2QjVCLE1BQU0sQ0FBQzZCLFFBQVEsR0FBRyxLQUFLO1FBQ3ZCN0IsTUFBTSxDQUFDdUQsUUFBUSxHQUFHLEtBQUs7TUFDeEIsQ0FBQyxDQUFDO0lBQ0gsQ0FBQztJQUVEO0lBQ0FSLGlCQUFpQiw2QkFBQ1csTUFBTSxFQUFFQyxNQUFNLEVBQUVDLE1BQU0sRUFBRXRCLFdBQVcsRUFBRTtNQUFBO01BQ3RELElBQU11QixXQUFXLEdBQUcsSUFBSSxDQUFDQyxTQUFTLENBQUNKLE1BQU0sRUFBRUMsTUFBTSxDQUFDO01BQ2xELElBQUlJLFNBQVMsR0FBRyxLQUFLO01BRXJCLElBQUl6QixXQUFXLEtBQUssWUFBWSxFQUFFO1FBQUEsOEJBQ2M7VUFDOUMsSUFBSWxDLENBQUMsR0FBRyxFQUFFO1lBQUEsR0FBUztVQUFJO1VBQ3ZCLEtBQUksQ0FBQ3VDLElBQUksQ0FBQ3ZCLE9BQU8sQ0FBQyxVQUFDcEIsTUFBTSxFQUFLO1lBQzdCLElBQ0NBLE1BQU0sQ0FBQ3lCLENBQUMsS0FBS3JCLENBQUMsSUFDZEosTUFBTSxDQUFDMkIsQ0FBQyxLQUFLa0MsV0FBVyxDQUFDbEMsQ0FBQyxJQUMxQjNCLE1BQU0sQ0FBQzRCLFFBQVEsRUFDZDtjQUNEbUMsU0FBUyxHQUFHLElBQUk7WUFDakI7VUFDRCxDQUFDLENBQUM7UUFDSCxDQUFDO1FBWEQsS0FBSyxJQUFJM0QsQ0FBQyxHQUFHc0QsTUFBTSxFQUFFdEQsQ0FBQyxHQUFHc0QsTUFBTSxHQUFHRSxNQUFNLEVBQUV4RCxDQUFDLEVBQUU7VUFBQTtVQUFBO1FBQUE7TUFZOUMsQ0FBQyxNQUFNLElBQUlrQyxXQUFXLEtBQUssVUFBVSxFQUFFO1FBQUEsaUNBQ1M7VUFDOUMsSUFBSWxDLEVBQUMsR0FBRyxFQUFFO1lBQUEsR0FBUztVQUFJO1VBQ3ZCLEtBQUksQ0FBQ3VDLElBQUksQ0FBQ3ZCLE9BQU8sQ0FBQyxVQUFDcEIsTUFBTSxFQUFLO1lBQzdCLElBQ0NBLE1BQU0sQ0FBQ3lCLENBQUMsS0FBS29DLFdBQVcsQ0FBQ3BDLENBQUMsSUFDMUJ6QixNQUFNLENBQUMyQixDQUFDLEtBQUt2QixFQUFDLElBQ2RKLE1BQU0sQ0FBQzRCLFFBQVEsRUFDZDtjQUNEbUMsU0FBUyxHQUFHLElBQUk7WUFDakI7VUFDRCxDQUFDLENBQUM7UUFDSCxDQUFDO1FBWEQsS0FBSyxJQUFJM0QsRUFBQyxHQUFHdUQsTUFBTSxFQUFFdkQsRUFBQyxHQUFHdUQsTUFBTSxHQUFHQyxNQUFNLEVBQUV4RCxFQUFDLEVBQUU7VUFBQTtVQUFBO1FBQUE7TUFZOUM7TUFDQSxPQUFPMkQsU0FBUztJQUNqQixDQUFDO0lBRURDLE9BQU8sbUJBQUNOLE1BQU0sRUFBRUMsTUFBTSxFQUFFckIsV0FBVyxFQUFFVCxRQUFRLEVBQUU7TUFBQTtNQUM5QyxJQUFNZ0MsV0FBVyxHQUFHLElBQUksQ0FBQ0MsU0FBUyxDQUFDSixNQUFNLEVBQUVDLE1BQU0sQ0FBQztNQUNsRCxJQUFJQyxNQUFNO01BRVYsSUFBSS9CLFFBQVEsS0FBSyxhQUFhLEVBQUU7UUFDL0IrQixNQUFNLEdBQUcsQ0FBQztNQUNYLENBQUMsTUFBTSxJQUFJL0IsUUFBUSxLQUFLLFdBQVcsRUFBRTtRQUNwQytCLE1BQU0sR0FBRyxDQUFDO01BQ1gsQ0FBQyxNQUFNLElBQUkvQixRQUFRLEtBQUssV0FBVyxFQUFFO1FBQ3BDK0IsTUFBTSxHQUFHLENBQUM7TUFDWCxDQUFDLE1BQU0sSUFBSS9CLFFBQVEsS0FBSyxZQUFZLEVBQUU7UUFDckMrQixNQUFNLEdBQUcsQ0FBQztNQUNYLENBQUMsTUFBTSxJQUFJL0IsUUFBUSxLQUFLLFNBQVMsRUFBRTtRQUNsQytCLE1BQU0sR0FBRyxDQUFDO01BQ1g7TUFFQSxJQUFJQyxXQUFXLENBQUNqQyxRQUFRLEVBQUUsT0FBTyxLQUFLO01BRXRDLElBQU1rQixPQUFPLEdBQUcsSUFBSSxDQUFDQyxpQkFBaUIsQ0FDckNXLE1BQU0sRUFDTkMsTUFBTSxFQUNOQyxNQUFNLEVBQ050QixXQUFXLENBQ1g7TUFDRCxJQUFJUSxPQUFPLEVBQUUsT0FBTyxLQUFLOztNQUV6QjtNQUNBLElBQU1tQixPQUFPLEdBQUdmLGlEQUFJLENBQUNVLE1BQU0sQ0FBQztNQUM1QixJQUFJdEIsV0FBVyxLQUFLLFlBQVksRUFBRTtRQUFBLGdDQUNjO1VBQzlDLE1BQUksQ0FBQ0ssSUFBSSxDQUFDdkIsT0FBTyxDQUFDLFVBQUNwQixNQUFNLEVBQUs7WUFDN0IsSUFDQ0EsTUFBTSxDQUFDeUIsQ0FBQyxLQUFLckIsQ0FBQyxJQUNkSixNQUFNLENBQUMyQixDQUFDLEtBQUtrQyxXQUFXLENBQUNsQyxDQUFDLElBQzFCLENBQUMzQixNQUFNLENBQUM0QixRQUFRLEVBQ2Y7Y0FDRDVCLE1BQU0sQ0FBQzRCLFFBQVEsR0FBR3FDLE9BQU87Y0FDekJqRSxNQUFNLENBQUM2QixRQUFRLEdBQUdBLFFBQVE7WUFDM0I7VUFDRCxDQUFDLENBQUM7UUFDSCxDQUFDO1FBWEQsS0FBSyxJQUFJekIsQ0FBQyxHQUFHc0QsTUFBTSxFQUFFdEQsQ0FBQyxHQUFHc0QsTUFBTSxHQUFHRSxNQUFNLEVBQUV4RCxDQUFDLEVBQUU7VUFBQTtRQUFBO01BWTlDLENBQUMsTUFBTSxJQUFJa0MsV0FBVyxLQUFLLFVBQVUsRUFBRTtRQUFBLGtDQUNTO1VBQzlDLE1BQUksQ0FBQ0ssSUFBSSxDQUFDdkIsT0FBTyxDQUFDLFVBQUNwQixNQUFNLEVBQUs7WUFDN0IsSUFDQ0EsTUFBTSxDQUFDeUIsQ0FBQyxLQUFLb0MsV0FBVyxDQUFDcEMsQ0FBQyxJQUMxQnpCLE1BQU0sQ0FBQzJCLENBQUMsS0FBS3ZCLEdBQUMsSUFDZCxDQUFDSixNQUFNLENBQUM0QixRQUFRLEVBQ2Y7Y0FDRDVCLE1BQU0sQ0FBQzRCLFFBQVEsR0FBR3FDLE9BQU87Y0FDekJqRSxNQUFNLENBQUM2QixRQUFRLEdBQUdBLFFBQVE7WUFDM0I7VUFDRCxDQUFDLENBQUM7UUFDSCxDQUFDO1FBWEQsS0FBSyxJQUFJekIsR0FBQyxHQUFHdUQsTUFBTSxFQUFFdkQsR0FBQyxHQUFHdUQsTUFBTSxHQUFHQyxNQUFNLEVBQUV4RCxHQUFDLEVBQUU7VUFBQTtRQUFBO01BWTlDO01BQ0EsT0FBTyxJQUFJO0lBQ1osQ0FBQztJQUVEOEQsb0JBQW9CLGtDQUFHO01BQ3RCLElBQUksQ0FBQ0MsbUJBQW1CLENBQUMsYUFBYSxDQUFDO01BQ3ZDLElBQUksQ0FBQ0EsbUJBQW1CLENBQUMsV0FBVyxDQUFDO01BQ3JDLElBQUksQ0FBQ0EsbUJBQW1CLENBQUMsV0FBVyxDQUFDO01BQ3JDLElBQUksQ0FBQ0EsbUJBQW1CLENBQUMsWUFBWSxDQUFDO01BQ3RDLElBQUksQ0FBQ0EsbUJBQW1CLENBQUMsU0FBUyxDQUFDO0lBQ3BDLENBQUM7SUFFREEsbUJBQW1CLCtCQUFDdEMsUUFBUSxFQUFFO01BQzdCLElBQUl1QyxTQUFTLEdBQUcsS0FBSztNQUVyQixPQUFPLENBQUNBLFNBQVMsRUFBRTtRQUNsQixJQUFJOUIsV0FBVztRQUNmLElBQU0rQixpQkFBaUIsR0FBR0MsSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUMzRCxJQUFNZCxNQUFNLEdBQUdZLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDakQsSUFBTWIsTUFBTSxHQUFHVyxJQUFJLENBQUNDLEtBQUssQ0FBQ0QsSUFBSSxDQUFDRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDO1FBRWpELElBQUlILGlCQUFpQixLQUFLLENBQUMsRUFBRTtVQUM1Qi9CLFdBQVcsR0FBRyxZQUFZO1FBQzNCLENBQUMsTUFBTTtVQUNOQSxXQUFXLEdBQUcsVUFBVTtRQUN6QjtRQUVBOEIsU0FBUyxHQUFHLElBQUksQ0FBQ0osT0FBTyxDQUFDTixNQUFNLEVBQUVDLE1BQU0sRUFBRXJCLFdBQVcsRUFBRVQsUUFBUSxDQUFDO01BQ2hFO0lBQ0QsQ0FBQztJQUVEaUMsU0FBUyxxQkFBQ0osTUFBTSxFQUFFQyxNQUFNLEVBQUU7TUFDekIsT0FBTyxJQUFJLENBQUNoQixJQUFJLENBQUM4QixJQUFJLENBQ3BCLFVBQUN6RSxNQUFNO1FBQUEsT0FBS0EsTUFBTSxDQUFDeUIsQ0FBQyxLQUFLaUMsTUFBTSxJQUFJMUQsTUFBTSxDQUFDMkIsQ0FBQyxLQUFLZ0MsTUFBTTtNQUFBLEVBQ3REO0lBQ0YsQ0FBQztJQUVEZSxhQUFhLHlCQUFDaEIsTUFBTSxFQUFFQyxNQUFNLEVBQUU7TUFDN0IsSUFBTTNELE1BQU0sR0FBRyxJQUFJLENBQUMyQyxJQUFJLENBQUM4QixJQUFJLENBQUMsVUFBQ2pELEVBQUU7UUFBQSxPQUFLQSxFQUFFLENBQUNDLENBQUMsS0FBS2lDLE1BQU0sSUFBSWxDLEVBQUUsQ0FBQ0csQ0FBQyxLQUFLZ0MsTUFBTTtNQUFBLEVBQUM7TUFFekUsSUFBSTNELE1BQU0sQ0FBQ3VELFFBQVEsRUFBRTtRQUNwQixPQUFPLEtBQUs7TUFDYjtNQUNBLElBQUksQ0FBQ3ZELE1BQU0sQ0FBQzRCLFFBQVEsSUFBSSxDQUFDNUIsTUFBTSxDQUFDdUQsUUFBUSxFQUFFO1FBQ3pDdkQsTUFBTSxDQUFDdUQsUUFBUSxHQUFHLE1BQU07TUFDekIsQ0FBQyxNQUFNLElBQUl2RCxNQUFNLENBQUM0QixRQUFRLElBQUksQ0FBQzVCLE1BQU0sQ0FBQ3VELFFBQVEsRUFBRTtRQUMvQ3ZELE1BQU0sQ0FBQ3VELFFBQVEsR0FBRyxRQUFRO1FBQzFCdkQsTUFBTSxDQUFDNEIsUUFBUSxDQUFDK0MsT0FBTyxFQUFFO01BQzFCO01BQ0EsSUFBSSxDQUFDQyxtQkFBbUIsRUFBRTtNQUMxQixPQUFPLElBQUk7SUFDWixDQUFDO0lBRURBLG1CQUFtQixpQ0FBRztNQUNyQixJQUFNQyxhQUFhLEdBQUcsSUFBSSxDQUFDbEMsSUFBSSxDQUFDQyxJQUFJLENBQUMsVUFBQzVDLE1BQU07UUFBQSxPQUFLQSxNQUFNLENBQUM0QixRQUFRO01BQUEsRUFBQztNQUNqRSxJQUFNa0QsVUFBVSxHQUFHLElBQUksQ0FBQ25DLElBQUksQ0FBQ0MsSUFBSSxDQUNoQyxVQUFDNUMsTUFBTTtRQUFBLE9BQUtBLE1BQU0sQ0FBQzRCLFFBQVEsSUFBSSxDQUFDNUIsTUFBTSxDQUFDdUQsUUFBUTtNQUFBLEVBQy9DO01BQ0QsSUFBSXNCLGFBQWEsSUFBSSxDQUFDQyxVQUFVLEVBQUU7UUFDakMsSUFBSSxDQUFDdEIsUUFBUSxHQUFHLElBQUk7TUFDckI7SUFDRDtFQUNELENBQUM7QUFDRjtBQUVBLGlFQUFlTCxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7QUM3TFk7QUFFcEMsU0FBUzRCLE1BQU0sR0FBRztFQUNqQixPQUFPO0lBQ05DLFNBQVMsRUFBRTdCLHNEQUFTLEVBQUU7SUFDdEI4QixPQUFPLEVBQUUsS0FBSztJQUVkQyxNQUFNLGtCQUFDeEIsTUFBTSxFQUFFQyxNQUFNLEVBQUV3QixVQUFVLEVBQUU7TUFDbENBLFVBQVUsQ0FBQ1QsYUFBYSxDQUFDaEIsTUFBTSxFQUFFQyxNQUFNLENBQUM7TUFDeEMsSUFBSXdCLFVBQVUsQ0FBQzNCLFFBQVEsRUFBRTtRQUN4QixJQUFJLENBQUN5QixPQUFPLEdBQUcsSUFBSTtNQUNwQjtJQUNELENBQUM7SUFFREcsWUFBWSx3QkFBQ0QsVUFBVSxFQUFFO01BQ3hCLElBQUlFLFNBQVMsR0FBRyxLQUFLO01BRXJCLE9BQU8sQ0FBQ0EsU0FBUyxFQUFFO1FBQ2xCLElBQU0zQixNQUFNLEdBQUdZLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDakQsSUFBTWIsTUFBTSxHQUFHVyxJQUFJLENBQUNDLEtBQUssQ0FBQ0QsSUFBSSxDQUFDRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDO1FBRWpEYSxTQUFTLEdBQUdGLFVBQVUsQ0FBQ1QsYUFBYSxDQUFDaEIsTUFBTSxFQUFFQyxNQUFNLENBQUM7TUFDckQ7TUFFQSxJQUFJd0IsVUFBVSxDQUFDM0IsUUFBUSxFQUFFO1FBQ3hCLElBQUksQ0FBQ3lCLE9BQU8sR0FBRyxJQUFJO01BQ3BCO0lBQ0Q7RUFDRCxDQUFDO0FBQ0Y7QUFFQSxpRUFBZUYsTUFBTTs7Ozs7Ozs7Ozs7Ozs7QUMvQnJCLFNBQVM3QixJQUFJLENBQUNVLE1BQU0sRUFBRTtFQUNyQixPQUFPO0lBQ05BLE1BQU0sRUFBTkEsTUFBTTtJQUNOMEIsU0FBUyxFQUFFLENBQUM7SUFDWkMsTUFBTSxFQUFFLEtBQUs7SUFFYlosT0FBTyxxQkFBRztNQUNULElBQUksQ0FBQ1csU0FBUyxJQUFJLENBQUM7TUFDbkIsSUFBSSxDQUFDRSxPQUFPLEVBQUU7SUFDZixDQUFDO0lBRURBLE9BQU8scUJBQUc7TUFDVCxJQUFJLElBQUksQ0FBQ0YsU0FBUyxJQUFJLElBQUksQ0FBQzFCLE1BQU0sRUFBRTtRQUNsQyxJQUFJLENBQUMyQixNQUFNLEdBQUcsSUFBSTtNQUNuQjtJQUNEO0VBQ0QsQ0FBQztBQUNGO0FBRUEsaUVBQWVyQyxJQUFJOzs7Ozs7Ozs7Ozs7OztBQ25CcUI7QUFDSjtBQU9yQjs7QUFFZjtBQUNBLElBQU1uQyxNQUFNLEdBQUdnRSw2REFBTSxFQUFFO0FBQ3ZCLElBQU1VLEVBQUUsR0FBR1YsNkRBQU0sRUFBRTs7QUFFbkI7QUFDQVUsRUFBRSxDQUFDVCxTQUFTLENBQUNkLG9CQUFvQixFQUFFOztBQUVuQztBQUNBdkUsNERBQTBCLENBQUMsT0FBTyxFQUFFLFlBQU07RUFDekNvQixNQUFNLENBQUNpRSxTQUFTLENBQUN2QixTQUFTLEVBQUU7RUFDNUIxQixtREFBYSxDQUFDLFFBQVEsQ0FBQztFQUN2QmhCLE1BQU0sQ0FBQ2lFLFNBQVMsQ0FBQ2Qsb0JBQW9CLEVBQUU7RUFDdkNqRCx1REFBaUIsQ0FBQyxRQUFRLEVBQUVGLE1BQU0sQ0FBQ2lFLFNBQVMsQ0FBQ3JDLElBQUksQ0FBQztBQUNuRCxDQUFDLENBQUM7O0FBRUY7QUFDQSxJQUFJTCxXQUFXLEdBQUcsWUFBWTtBQUU5QkQsZ0VBQTBCLENBQUNDLFdBQVcsRUFBRXZCLE1BQU0sQ0FBQ2lFLFNBQVMsQ0FBQzs7QUFFekQ7QUFDQXpGLFFBQVEsQ0FBQ21ELGdCQUFnQixDQUFDLFVBQVUsRUFBRSxVQUFDZ0QsQ0FBQyxFQUFLO0VBQzVDLElBQUlBLENBQUMsQ0FBQ0MsSUFBSSxLQUFLLE1BQU0sRUFBRTtJQUN0QixJQUFJckQsV0FBVyxLQUFLLFlBQVksRUFBRTtNQUNqQ0EsV0FBVyxHQUFHLFVBQVU7SUFDekIsQ0FBQyxNQUFNLElBQUlBLFdBQVcsS0FBSyxVQUFVLEVBQUU7TUFDdENBLFdBQVcsR0FBRyxZQUFZO0lBQzNCO0lBQ01ELGdFQUEwQixDQUFDQyxXQUFXLEVBQUV2QixNQUFNLENBQUNpRSxTQUFTLENBQUM7RUFDaEU7QUFDRCxDQUFDLENBQUM7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM5Q0EsSUFBTTVGLFNBQVMsR0FBRyxDQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLFdBQVcsRUFDWCxXQUFXLEVBQ1gsYUFBYSxDQUNiO0FBRUQsaUVBQWVBLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1J4QjtBQUMwRztBQUNqQjtBQUN6Riw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GLDRKQUE0SjtBQUM1SjtBQUNBLGdEQUFnRCxrQkFBa0IsMkJBQTJCLDhCQUE4QixjQUFjLGVBQWUsaUJBQWlCLHFCQUFxQixrQkFBa0Isc0JBQXNCLDRDQUE0QyxZQUFZLGlCQUFpQixrQkFBa0Isa0JBQWtCLDRCQUE0Qix3QkFBd0IsaUJBQWlCLHNDQUFzQyxvQkFBb0IsdUJBQXVCLHFCQUFxQixrQkFBa0IsNEJBQTRCLHdCQUF3QixlQUFlLGlCQUFpQixpQkFBaUIsbUJBQW1CLHNEQUFzRCxvQkFBb0IsMEJBQTBCLGtCQUFrQixvQkFBb0Isd0JBQXdCLDJCQUEyQiw2QkFBNkIsNEJBQTRCLCtCQUErQiw4QkFBOEIsb0JBQW9CLDhCQUE4QiwwQkFBMEIsNkJBQTZCLHFCQUFxQixnQkFBZ0IsbUJBQW1CLG9CQUFvQix5QkFBeUIsc0JBQXNCLDBCQUEwQixvREFBb0Qsc0JBQXNCLHlDQUF5QyxtREFBbUQsd0JBQXdCLFlBQVksa0JBQWtCLDJCQUEyQixtQkFBbUIsaUJBQWlCLGtCQUFrQiw4QkFBOEIsaUJBQWlCLG9CQUFvQiwwQkFBMEIscUJBQXFCLGFBQWEsaUJBQWlCLDhCQUE4QixhQUFhLGtCQUFrQiw0QkFBNEIsd0JBQXdCLGlCQUFpQixpQkFBaUIsdUJBQXVCLG9CQUFvQixxQkFBcUIsYUFBYSxpQkFBaUIsZ0JBQWdCLDBCQUEwQix1QkFBdUIsbUJBQW1CLDRCQUE0QixhQUFhLHVCQUF1QiwwQkFBMEIsNkJBQTZCLGlCQUFpQiwyQkFBMkIsd0JBQXdCLGVBQWUsaUJBQWlCLHVDQUF1QyxzQkFBc0Isb0JBQW9CLHVCQUF1QiwwQkFBMEIsOEJBQThCLG1CQUFtQix1QkFBdUIsdUJBQXVCLGtEQUFrRCxrQ0FBa0MseURBQXlELCtEQUErRCw0REFBNEQsdURBQXVELCtCQUErQiw0QkFBNEIseUJBQXlCLHNCQUFzQixjQUFjLDhCQUE4QixzRUFBc0UsbUVBQW1FLGdFQUFnRSw4Q0FBOEMsZ0NBQWdDLG1CQUFtQixnQkFBZ0IsaUJBQWlCLGdCQUFnQixpQkFBaUIsdUJBQXVCLGtCQUFrQixlQUFlLGdCQUFnQiw4QkFBOEIsK0JBQStCLDRCQUE0Qix5QkFBeUIsU0FBUyxpRkFBaUYsVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksbUJBQW1CLE1BQU0sVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxXQUFXLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLGVBQWUsTUFBTSxVQUFVLFlBQVksV0FBVyxVQUFVLGVBQWUsT0FBTyxrQkFBa0IsT0FBTyxrQkFBa0IsT0FBTyxXQUFXLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxXQUFXLGlCQUFpQixPQUFPLFdBQVcsaUJBQWlCLE9BQU8saUJBQWlCLE1BQU0sVUFBVSxZQUFZLFdBQVcsVUFBVSxVQUFVLGlCQUFpQixNQUFNLFVBQVUsWUFBWSxpQkFBaUIsS0FBSyxVQUFVLGtCQUFrQixNQUFNLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLFdBQVcsaUJBQWlCLE1BQU0sVUFBVSxVQUFVLFlBQVksbUJBQW1CLE1BQU0sa0JBQWtCLE1BQU0sWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLG1CQUFtQixNQUFNLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLG1CQUFtQixNQUFNLFVBQVUsWUFBWSxhQUFhLGFBQWEsbUJBQW1CLE9BQU8sa0JBQWtCLE1BQU0sVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLDBKQUEwSixVQUFVLGtCQUFrQiwyQkFBMkIsc0NBQXNDLGNBQWMsZUFBZSxtQkFBbUIscUJBQXFCLGtCQUFrQixzQkFBc0IsNENBQTRDLEdBQUcsWUFBWSxpQkFBaUIsa0JBQWtCLG9CQUFvQiw0QkFBNEIsd0JBQXdCLGlCQUFpQixzQ0FBc0Msb0JBQW9CLHFCQUFxQixHQUFHLHFCQUFxQixrQkFBa0IsNEJBQTRCLHdCQUF3QixlQUFlLG1CQUFtQixpQkFBaUIsaUJBQWlCLHdCQUF3QixvQkFBb0IsMEJBQTBCLG9CQUFvQixvQkFBb0Isc0JBQXNCLEtBQUssYUFBYSwyQkFBMkIsS0FBSyxZQUFZLDZCQUE2QixLQUFLLGdCQUFnQixvQkFBb0IsOEJBQThCLDBCQUEwQiw2QkFBNkIscUJBQXFCLGdCQUFnQixxQkFBcUIsb0JBQW9CLHlCQUF5QixzQkFBc0Isd0JBQXdCLDZCQUE2QixzQkFBc0IsdUNBQXVDLE9BQU8sNEJBQTRCLHNCQUFzQixPQUFPLEtBQUssR0FBRyxZQUFZLGtCQUFrQiwyQkFBMkIsbUJBQW1CLG1CQUFtQixrQkFBa0IsNEJBQTRCLFlBQVksb0JBQW9CLDBCQUEwQixtQkFBbUIsS0FBSyxHQUFHLGFBQWEsaUJBQWlCLDRCQUE0QixHQUFHLGFBQWEsa0JBQWtCLDRCQUE0Qix3QkFBd0IsaUJBQWlCLGlCQUFpQix1QkFBdUIsb0JBQW9CLDhCQUE4QixHQUFHLGFBQWEsaUJBQWlCLGdCQUFnQiwwQkFBMEIscUJBQXFCLEdBQUcsbUJBQW1CLDBCQUEwQixHQUFHLDJJQUEySSx1QkFBdUIsMEJBQTBCLDZCQUE2QixtQkFBbUIsMEJBQTBCLHNCQUFzQixHQUFHLGVBQWUsaUJBQWlCLHVDQUF1QyxzQkFBc0Isb0JBQW9CLHVCQUF1QiwwQkFBMEIsdUNBQXVDLG1CQUFtQix1QkFBdUIsdUJBQXVCLG9EQUFvRCxrQ0FBa0MsdURBQXVELGlFQUFpRSw0REFBNEQsdURBQXVELGlDQUFpQyw0QkFBNEIsdUJBQXVCLEdBQUcsc0JBQXNCLGNBQWMsdUNBQXVDLHdFQUF3RSxtRUFBbUUsOERBQThELEdBQUcsOENBQThDLDhCQUE4QixHQUFHLG1CQUFtQixnQkFBZ0IsaUJBQWlCLGdCQUFnQixpQkFBaUIsdUJBQXVCLGtCQUFrQixlQUFlLGdCQUFnQiw4QkFBOEIsK0JBQStCLDRCQUE0Qix1QkFBdUIsR0FBRyxxQkFBcUI7QUFDL2hSO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7O0FDUjFCOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0EscUZBQXFGO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixpQkFBaUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHFCQUFxQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzRkFBc0YscUJBQXFCO0FBQzNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzREFBc0QscUJBQXFCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNwRmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxjQUFjO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkQSxNQUErRjtBQUMvRixNQUFxRjtBQUNyRixNQUE0RjtBQUM1RixNQUErRztBQUMvRyxNQUF3RztBQUN4RyxNQUF3RztBQUN4RyxNQUE0STtBQUM1STtBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLDRIQUFPOzs7O0FBSXNGO0FBQzlHLE9BQU8saUVBQWUsNEhBQU8sSUFBSSxtSUFBYyxHQUFHLG1JQUFjLFlBQVksRUFBQzs7Ozs7Ozs7Ozs7QUMxQmhFOztBQUViOztBQUVBO0FBQ0E7O0FBRUEsa0JBQWtCLHdCQUF3QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEscUJBQXFCLDZCQUE2QjtBQUNsRDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN2R2E7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0RBQXNEOztBQUV0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDdENhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDVmE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJOztBQUVqRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ1hhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtEQUFrRDtBQUNsRDs7QUFFQTtBQUNBLDBDQUEwQztBQUMxQzs7QUFFQTs7QUFFQTtBQUNBLGlGQUFpRjtBQUNqRjs7QUFFQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RCxJQUFJOztBQUVKOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNyRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztVQ2ZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2ZBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0FzQjtBQUdDO0FBQ0k7QUFFTztBQUNLIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL0RPTS5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vc3JjL21vZHVsZXMvZmFjdG9yaWVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vc3JjL21vZHVsZXMvZmFjdG9yaWVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vc3JjL21vZHVsZXMvZmFjdG9yaWVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL2dhbWVMb29wLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9zaGlwVHlwZXMuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL3NyYy9zdHlsZS5zY3NzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vc3JjL3N0eWxlLnNjc3M/NzViYSIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9zcmMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzaGlwVHlwZXMgZnJvbSAnLi9zaGlwVHlwZXMnO1xuaW1wb3J0IGdpdEljb24gZnJvbSAnLi4vaW1nL2dpdGh1Yi5wbmcnO1xuXG5jb25zdCBnaXRJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ2l0aHViJyk7XG5naXRJbWcuc3JjID0gZ2l0SWNvbjtcblxuY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnQnKTtcbmNvbnN0IHJhbmRvbUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYW5kb20nKTtcblxuY29uc3QgbGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZWZ0Jyk7XG5jb25zdCByaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yaWdodCcpO1xuXG5jb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xubGV0IHBsYXllckJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbnBsYXllckJvYXJkLmNsYXNzTGlzdC5hZGQoJ2JvYXJkJyk7XG5yb3cuY2xhc3NMaXN0LmFkZCgncm93Jyk7XG5zcXVhcmUuY2xhc3NMaXN0LmFkZCgnc3F1YXJlJyk7XG5cbi8vIENyZWF0ZSBncmlkXG5mb3IgKGxldCBpID0gMTsgaSA8IDExOyBpKyspIHtcblx0cGxheWVyQm9hcmQuYXBwZW5kQ2hpbGQocm93LmNsb25lTm9kZSgpKTtcblx0Zm9yIChsZXQgaiA9IDE7IGogPCAxMTsgaisrKSB7XG5cdFx0Y29uc3QgdGVtcFNxdWFyZSA9IHNxdWFyZS5jbG9uZU5vZGUoKTtcblx0XHR0ZW1wU3F1YXJlLnNldEF0dHJpYnV0ZSgnZGF0YS14Jywgaik7XG5cdFx0dGVtcFNxdWFyZS5zZXRBdHRyaWJ1dGUoJ2RhdGEteScsIGkpO1xuXG5cdFx0cGxheWVyQm9hcmQubGFzdENoaWxkLmFwcGVuZENoaWxkKHRlbXBTcXVhcmUpO1xuXHR9XG59XG5cbmxldCBhaUJvYXJkID0gcGxheWVyQm9hcmQuY2xvbmVOb2RlKHRydWUpO1xucGxheWVyQm9hcmQuY2xhc3NMaXN0LmFkZCgncGxheWVyLWJvYXJkJyk7XG5haUJvYXJkLmNsYXNzTGlzdC5hZGQoJ2FpLWJvYXJkJyk7XG5haUJvYXJkLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbmxlZnQuYXBwZW5kQ2hpbGQocGxheWVyQm9hcmQpO1xucmlnaHQuYXBwZW5kQ2hpbGQoYWlCb2FyZCk7XG5cbmZ1bmN0aW9uIGhlbHBlckNob29zZVBsYXllckdyaWQocGxheWVyKSB7XG5cdGxldCBncmlkSFRNTDtcblxuXHRpZiAocGxheWVyID09PSAncGxheWVyJykge1xuXHRcdGdyaWRIVE1MID0gcGxheWVyQm9hcmQ7XG5cdH0gZWxzZSBpZiAocGxheWVyID09PSAnYWknKSB7XG5cdFx0Z3JpZEhUTUwgPSBhaUJvYXJkO1xuXHR9XG5cdHJldHVybiBncmlkSFRNTDtcbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVCb2FyZEhUTUwocGxheWVyLCBncmlkT2JqZWN0KSB7XG5cdGNvbnN0IGdyaWRIVE1MID0gaGVscGVyQ2hvb3NlUGxheWVyR3JpZChwbGF5ZXIpO1xuXHRsZXQgc3F1YXJlSFRNTDtcblxuXHQvLyBGaW5kIEhUTUwgZXF1aXZhbGVudCBvZiBzcXVhcmUgb2JqZWN0IGJ5IGNvb3JkaW5hdGVzXG5cdGdyaWRPYmplY3QuZm9yRWFjaCgoc3F1YXJlT2JqKSA9PiB7XG5cdFx0Z3JpZEhUTUwuY2hpbGROb2Rlcy5mb3JFYWNoKChyb3dIVE1MKSA9PiB7XG5cdFx0XHRyb3dIVE1MLmNoaWxkTm9kZXMuZm9yRWFjaCgoc3EpID0+IHtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdHNxdWFyZU9iai54ID09PSArc3EuZ2V0QXR0cmlidXRlKCdkYXRhLXgnKSAmJlxuXHRcdFx0XHRcdHNxdWFyZU9iai55ID09PSArc3EuZ2V0QXR0cmlidXRlKCdkYXRhLXknKVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRzcXVhcmVIVE1MID0gc3E7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0aWYgKHNxdWFyZU9iai5vY2N1cGllZCkge1xuXHRcdFx0aWYgKHNxdWFyZU9iai5zaGlwVHlwZSA9PT0gJ1BhdHJvbCBCb2F0Jykge1xuXHRcdFx0XHRzcXVhcmVIVE1MLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2IoODAsIDE4MCwgMjI2KSc7XG5cdFx0XHR9IGVsc2UgaWYgKHNxdWFyZU9iai5zaGlwVHlwZSA9PT0gJ1N1Ym1hcmluZScpIHtcblx0XHRcdFx0c3F1YXJlSFRNTC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDAsIDE4NCwgMTQ0KSc7XG5cdFx0XHR9IGVsc2UgaWYgKHNxdWFyZU9iai5zaGlwVHlwZSA9PT0gJ0Rlc3Ryb3llcicpIHtcblx0XHRcdFx0c3F1YXJlSFRNTC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDI0NiwgMjE1LCA2MCknO1xuXHRcdFx0fSBlbHNlIGlmIChzcXVhcmVPYmouc2hpcFR5cGUgPT09ICdCYXR0bGVzaGlwJykge1xuXHRcdFx0XHRzcXVhcmVIVE1MLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2IoMjU1LCAxNTUsIDEzMyknO1xuXHRcdFx0fSBlbHNlIGlmIChzcXVhcmVPYmouc2hpcFR5cGUgPT09ICdDYXJyaWVyJykge1xuXHRcdFx0XHRzcXVhcmVIVE1MLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2IoMjUwLCAxMDgsIDU2KSc7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNxdWFyZUhUTUwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYigzMSwgNDEsIDU1KSc7XG5cdFx0fVxuXHRcdFxuXG5cdH0pO1xufVxuXG5mdW5jdGlvbiByZXNldEdyaWRIVE1MKHBsYXllcikge1xuXHRjb25zdCBncmlkSFRNTCA9IGhlbHBlckNob29zZVBsYXllckdyaWQocGxheWVyKTtcblxuXHRncmlkSFRNTC5jaGlsZE5vZGVzLmZvckVhY2goKHJvd0hUTUwpID0+IHtcblx0XHRyb3dIVE1MLmNoaWxkTm9kZXMuZm9yRWFjaCgoc3EpID0+IHtcblx0XHRcdHNxLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2IoMzEsIDQxLCA1NSknO1xuXHRcdH0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlR3JpZExpc3RlbmVycygpIHtcblx0Y29uc3QgcGxheWVyQm9hcmRDbG9uZSA9IHBsYXllckJvYXJkLmNsb25lTm9kZSh0cnVlKTtcblx0Y29uc3QgYWlCb2FyZENsb25lID0gYWlCb2FyZC5jbG9uZU5vZGUodHJ1ZSk7XG5cblx0cGxheWVyQm9hcmQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQocGxheWVyQm9hcmRDbG9uZSwgcGxheWVyQm9hcmQpO1xuXHRhaUJvYXJkLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGFpQm9hcmRDbG9uZSwgYWlCb2FyZCk7XG5cblx0cGxheWVyQm9hcmQgPSBwbGF5ZXJCb2FyZENsb25lO1xuXHRhaUJvYXJkID0gYWlCb2FyZENsb25lO1xufVxuXG5mdW5jdGlvbiBhZGRGbGVldERlcGxveW1lbnRMaXN0ZW5lcihvcmllbnRhdGlvbiwgZ2FtZWJvYXJkT2JqKSB7XG5cdHJlbW92ZUdyaWRMaXN0ZW5lcnMoKTtcblxuXHRwbGF5ZXJCb2FyZC5jaGlsZE5vZGVzLmZvckVhY2goKHJvd0hUTUwpID0+IHtcblx0XHRyb3dIVE1MLmNoaWxkTm9kZXMuZm9yRWFjaCgoc3EpID0+IHtcblx0XHRcdGNvbnN0IHNxWCA9IHNxLmdldEF0dHJpYnV0ZSgnZGF0YS14Jyk7XG5cdFx0XHRjb25zdCBzcVkgPSBzcS5nZXRBdHRyaWJ1dGUoJ2RhdGEteScpO1xuXG5cdFx0XHQvLyBTaG93IG9uIGdyaWQgaWYgc2hpcCBjYW4gYmUgYWRkZWRcblx0XHRcdHNxLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcblx0XHRcdFx0aWYgKCFnYW1lYm9hcmRPYmouZ3JpZC5zb21lKChlbCkgPT4gZWwuc2hpcFR5cGUgPT09ICdDYXJyaWVyJykpIHtcblx0XHRcdFx0XHRjb25zdCBub1NwYWNlID0gZ2FtZWJvYXJkT2JqLmNoZWNrU3BhY2VGb3JTaGlwKHNxWCwgc3FZLCA1LCBvcmllbnRhdGlvbik7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2cobm9TcGFjZSlcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHQvLyBXaGVuIGxlYXZpbmcgZ3JpZCBjZWxsIHJlbW92ZSBkZXBsb3ltZW50IGluZGljYXRpb25cblx0XHRcdHNxLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG5cdFx0XHRcdHBvcHVsYXRlQm9hcmRIVE1MKCdwbGF5ZXInLCBnYW1lYm9hcmRPYmouZ3JpZCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSk7XG59XG5cbmV4cG9ydCB7XG5cdHN0YXJ0QnRuLFxuXHRyYW5kb21CdG4sXG5cdHBvcHVsYXRlQm9hcmRIVE1MLFxuXHRyZXNldEdyaWRIVE1MLFxuXHRhZGRGbGVldERlcGxveW1lbnRMaXN0ZW5lcixcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1sb29wLWZ1bmMgKi9cbmltcG9ydCBTaGlwIGZyb20gJy4vc2hpcCc7XG5cbmZ1bmN0aW9uIEdhbWVib2FyZCgpIHtcblx0bGV0IGdyaWQ7XG5cblx0Y29uc3QgY3JlYXRlR3JpZCA9ICgpID0+IHtcblx0XHRjb25zdCBncmlkQXJyYXkgPSBbXTtcblx0XHRmb3IgKGxldCBpID0gMTsgaSA8IDExOyBpKyspIHtcblx0XHRcdGZvciAobGV0IGogPSAxOyBqIDwgMTE7IGorKykge1xuXHRcdFx0XHRncmlkQXJyYXkucHVzaCh7XG5cdFx0XHRcdFx0eDogaSxcblx0XHRcdFx0XHR5OiBqLFxuXHRcdFx0XHRcdG9jY3VwaWVkOiBmYWxzZSxcblx0XHRcdFx0XHRzaGlwVHlwZTogZmFsc2UsXG5cdFx0XHRcdFx0aGl0VGFrZW46IGZhbHNlLFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Z3JpZCA9IGdyaWRBcnJheTtcblx0fTtcblx0Y3JlYXRlR3JpZCgpO1xuXG5cdHJldHVybiB7XG5cdFx0Z3JpZCxcblx0XHRnYW1lTG9zdDogZmFsc2UsXG5cblx0XHRjbGVhckdyaWQoKSB7XG5cdFx0XHR0aGlzLmdyaWQuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG5cdFx0XHRcdHNxdWFyZS5vY2N1cGllZCA9IGZhbHNlO1xuXHRcdFx0XHRzcXVhcmUuc2hpcFR5cGUgPSBmYWxzZTtcblx0XHRcdFx0c3F1YXJlLmhpdFRha2VuID0gZmFsc2U7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0Ly8gQ2hlY2sgaWYgdGhlcmUgaXMgc3BhY2UgdG8gY3JlYXRlIHNoaXAgYW5kIGNvb3JkcyBhcmUgaW4gcmFuZ2Vcblx0XHRjaGVja1NwYWNlRm9yU2hpcCh4Q29vcmQsIHlDb29yZCwgbGVuZ3RoLCBvcmllbnRhdGlvbikge1xuXHRcdFx0Y29uc3Qgc3RhcnRTcXVhcmUgPSB0aGlzLmdldFNxdWFyZSh4Q29vcmQsIHlDb29yZCk7XG5cdFx0XHRsZXQgY2FudEJ1aWxkID0gZmFsc2U7XG5cblx0XHRcdGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG5cdFx0XHRcdGZvciAobGV0IGkgPSB4Q29vcmQ7IGkgPCB4Q29vcmQgKyBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGlmIChpID4gMTApIHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdHRoaXMuZ3JpZC5mb3JFYWNoKChzcXVhcmUpID0+IHtcblx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0c3F1YXJlLnggPT09IGkgJiZcblx0XHRcdFx0XHRcdFx0c3F1YXJlLnkgPT09IHN0YXJ0U3F1YXJlLnkgJiZcblx0XHRcdFx0XHRcdFx0c3F1YXJlLm9jY3VwaWVkXG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0Y2FudEJ1aWxkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuXHRcdFx0XHRmb3IgKGxldCBpID0geUNvb3JkOyBpIDwgeUNvb3JkICsgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRpZiAoaSA+IDEwKSByZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR0aGlzLmdyaWQuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS54ID09PSBzdGFydFNxdWFyZS54ICYmXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS55ID09PSBpICYmXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS5vY2N1cGllZFxuXHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdGNhbnRCdWlsZCA9IHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBjYW50QnVpbGQ7XG5cdFx0fSxcblxuXHRcdGFkZFNoaXAoeENvb3JkLCB5Q29vcmQsIG9yaWVudGF0aW9uLCBzaGlwVHlwZSkge1xuXHRcdFx0Y29uc3Qgc3RhcnRTcXVhcmUgPSB0aGlzLmdldFNxdWFyZSh4Q29vcmQsIHlDb29yZCk7XG5cdFx0XHRsZXQgbGVuZ3RoO1xuXG5cdFx0XHRpZiAoc2hpcFR5cGUgPT09ICdQYXRyb2wgQm9hdCcpIHtcblx0XHRcdFx0bGVuZ3RoID0gMjtcblx0XHRcdH0gZWxzZSBpZiAoc2hpcFR5cGUgPT09ICdTdWJtYXJpbmUnKSB7XG5cdFx0XHRcdGxlbmd0aCA9IDM7XG5cdFx0XHR9IGVsc2UgaWYgKHNoaXBUeXBlID09PSAnRGVzdHJveWVyJykge1xuXHRcdFx0XHRsZW5ndGggPSAzO1xuXHRcdFx0fSBlbHNlIGlmIChzaGlwVHlwZSA9PT0gJ0JhdHRsZXNoaXAnKSB7XG5cdFx0XHRcdGxlbmd0aCA9IDQ7XG5cdFx0XHR9IGVsc2UgaWYgKHNoaXBUeXBlID09PSAnQ2FycmllcicpIHtcblx0XHRcdFx0bGVuZ3RoID0gNTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHN0YXJ0U3F1YXJlLm9jY3VwaWVkKSByZXR1cm4gZmFsc2U7XG5cblx0XHRcdGNvbnN0IG5vU3BhY2UgPSB0aGlzLmNoZWNrU3BhY2VGb3JTaGlwKFxuXHRcdFx0XHR4Q29vcmQsXG5cdFx0XHRcdHlDb29yZCxcblx0XHRcdFx0bGVuZ3RoLFxuXHRcdFx0XHRvcmllbnRhdGlvblxuXHRcdFx0KTtcblx0XHRcdGlmIChub1NwYWNlKSByZXR1cm4gZmFsc2U7XG5cblx0XHRcdC8vIEJ1aWxkIHNoaXBcblx0XHRcdGNvbnN0IG5ld1NoaXAgPSBTaGlwKGxlbmd0aCk7XG5cdFx0XHRpZiAob3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuXHRcdFx0XHRmb3IgKGxldCBpID0geENvb3JkOyBpIDwgeENvb3JkICsgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR0aGlzLmdyaWQuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS54ID09PSBpICYmXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS55ID09PSBzdGFydFNxdWFyZS55ICYmXG5cdFx0XHRcdFx0XHRcdCFzcXVhcmUub2NjdXBpZWRcblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRzcXVhcmUub2NjdXBpZWQgPSBuZXdTaGlwO1xuXHRcdFx0XHRcdFx0XHRzcXVhcmUuc2hpcFR5cGUgPSBzaGlwVHlwZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuXHRcdFx0XHRmb3IgKGxldCBpID0geUNvb3JkOyBpIDwgeUNvb3JkICsgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR0aGlzLmdyaWQuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS54ID09PSBzdGFydFNxdWFyZS54ICYmXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS55ID09PSBpICYmXG5cdFx0XHRcdFx0XHRcdCFzcXVhcmUub2NjdXBpZWRcblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRzcXVhcmUub2NjdXBpZWQgPSBuZXdTaGlwO1xuXHRcdFx0XHRcdFx0XHRzcXVhcmUuc2hpcFR5cGUgPSBzaGlwVHlwZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblxuXHRcdHJhbmRvbUZsZWV0UGxhY2VtZW50KCkge1xuXHRcdFx0dGhpcy5yYW5kb21TaGlwUGxhY2VtZW50KCdQYXRyb2wgQm9hdCcpO1xuXHRcdFx0dGhpcy5yYW5kb21TaGlwUGxhY2VtZW50KCdTdWJtYXJpbmUnKTtcblx0XHRcdHRoaXMucmFuZG9tU2hpcFBsYWNlbWVudCgnRGVzdHJveWVyJyk7XG5cdFx0XHR0aGlzLnJhbmRvbVNoaXBQbGFjZW1lbnQoJ0JhdHRsZXNoaXAnKTtcblx0XHRcdHRoaXMucmFuZG9tU2hpcFBsYWNlbWVudCgnQ2FycmllcicpO1xuXHRcdH0sXG5cblx0XHRyYW5kb21TaGlwUGxhY2VtZW50KHNoaXBUeXBlKSB7XG5cdFx0XHRsZXQgc2hpcEJ1aWx0ID0gZmFsc2U7XG5cblx0XHRcdHdoaWxlICghc2hpcEJ1aWx0KSB7XG5cdFx0XHRcdGxldCBvcmllbnRhdGlvbjtcblx0XHRcdFx0Y29uc3Qgb3JpZW50YXRpb25OdW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKSArIDE7XG5cdFx0XHRcdGNvbnN0IHhDb29yZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG5cdFx0XHRcdGNvbnN0IHlDb29yZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG5cblx0XHRcdFx0aWYgKG9yaWVudGF0aW9uTnVtYmVyID09PSAxKSB7XG5cdFx0XHRcdFx0b3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0b3JpZW50YXRpb24gPSAndmVydGljYWwnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0c2hpcEJ1aWx0ID0gdGhpcy5hZGRTaGlwKHhDb29yZCwgeUNvb3JkLCBvcmllbnRhdGlvbiwgc2hpcFR5cGUpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRnZXRTcXVhcmUoeENvb3JkLCB5Q29vcmQpIHtcblx0XHRcdHJldHVybiB0aGlzLmdyaWQuZmluZChcblx0XHRcdFx0KHNxdWFyZSkgPT4gc3F1YXJlLnggPT09IHhDb29yZCAmJiBzcXVhcmUueSA9PT0geUNvb3JkXG5cdFx0XHQpO1xuXHRcdH0sXG5cblx0XHRyZWNlaXZlQXR0YWNrKHhDb29yZCwgeUNvb3JkKSB7XG5cdFx0XHRjb25zdCBzcXVhcmUgPSB0aGlzLmdyaWQuZmluZCgoc3EpID0+IHNxLnggPT09IHhDb29yZCAmJiBzcS55ID09PSB5Q29vcmQpO1xuXG5cdFx0XHRpZiAoc3F1YXJlLmhpdFRha2VuKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmICghc3F1YXJlLm9jY3VwaWVkICYmICFzcXVhcmUuaGl0VGFrZW4pIHtcblx0XHRcdFx0c3F1YXJlLmhpdFRha2VuID0gJ21pc3MnO1xuXHRcdFx0fSBlbHNlIGlmIChzcXVhcmUub2NjdXBpZWQgJiYgIXNxdWFyZS5oaXRUYWtlbikge1xuXHRcdFx0XHRzcXVhcmUuaGl0VGFrZW4gPSAnZGFtYWdlJztcblx0XHRcdFx0c3F1YXJlLm9jY3VwaWVkLnRha2VIaXQoKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuY2hlY2tGbGVldENvbmRpdGlvbigpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblxuXHRcdGNoZWNrRmxlZXRDb25kaXRpb24oKSB7XG5cdFx0XHRjb25zdCBmbGVldERlcGxveWVkID0gdGhpcy5ncmlkLnNvbWUoKHNxdWFyZSkgPT4gc3F1YXJlLm9jY3VwaWVkKTtcblx0XHRcdGNvbnN0IGZsZWV0QWxpdmUgPSB0aGlzLmdyaWQuc29tZShcblx0XHRcdFx0KHNxdWFyZSkgPT4gc3F1YXJlLm9jY3VwaWVkICYmICFzcXVhcmUuaGl0VGFrZW5cblx0XHRcdCk7XG5cdFx0XHRpZiAoZmxlZXREZXBsb3llZCAmJiAhZmxlZXRBbGl2ZSkge1xuXHRcdFx0XHR0aGlzLmdhbWVMb3N0ID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9LFxuXHR9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkJztcblxuZnVuY3Rpb24gUGxheWVyKCkge1xuXHRyZXR1cm4ge1xuXHRcdGdhbWVib2FyZDogR2FtZWJvYXJkKCksXG5cdFx0Z2FtZVdvbjogZmFsc2UsXG5cblx0XHRhdHRhY2soeENvb3JkLCB5Q29vcmQsIGVuZW15Qm9hcmQpIHtcblx0XHRcdGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh4Q29vcmQsIHlDb29yZCk7XG5cdFx0XHRpZiAoZW5lbXlCb2FyZC5nYW1lTG9zdCkge1xuXHRcdFx0XHR0aGlzLmdhbWVXb24gPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRyYW5kb21BdHRhY2soZW5lbXlCb2FyZCkge1xuXHRcdFx0bGV0IHNob3RGaXJlZCA9IGZhbHNlO1xuXG5cdFx0XHR3aGlsZSAoIXNob3RGaXJlZCkge1xuXHRcdFx0XHRjb25zdCB4Q29vcmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuXHRcdFx0XHRjb25zdCB5Q29vcmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuXG5cdFx0XHRcdHNob3RGaXJlZCA9IGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh4Q29vcmQsIHlDb29yZCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChlbmVteUJvYXJkLmdhbWVMb3N0KSB7XG5cdFx0XHRcdHRoaXMuZ2FtZVdvbiA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSxcblx0fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiZnVuY3Rpb24gU2hpcChsZW5ndGgpIHtcblx0cmV0dXJuIHtcblx0XHRsZW5ndGgsXG5cdFx0aGl0c1Rha2VuOiAwLFxuXHRcdGlzU3VuazogZmFsc2UsXG5cblx0XHR0YWtlSGl0KCkge1xuXHRcdFx0dGhpcy5oaXRzVGFrZW4gKz0gMTtcblx0XHRcdHRoaXMuY2hlY2tIUCgpO1xuXHRcdH0sXG5cblx0XHRjaGVja0hQKCkge1xuXHRcdFx0aWYgKHRoaXMuaGl0c1Rha2VuID49IHRoaXMubGVuZ3RoKSB7XG5cdFx0XHRcdHRoaXMuaXNTdW5rID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9LFxuXHR9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiaW1wb3J0IFBsYXllciBmcm9tICcuL2ZhY3Rvcmllcy9wbGF5ZXInO1xuaW1wb3J0IHNoaXBUeXBlcyBmcm9tICcuL3NoaXBUeXBlcyc7XG5pbXBvcnQge1xuXHRzdGFydEJ0bixcblx0cmFuZG9tQnRuLFxuXHRwb3B1bGF0ZUJvYXJkSFRNTCxcblx0cmVzZXRHcmlkSFRNTCxcblx0YWRkRmxlZXREZXBsb3ltZW50TGlzdGVuZXIsXG59IGZyb20gJy4vRE9NJztcblxuLy8gSW5pdGlhbGl6ZSBwbGF5ZXJzXG5jb25zdCBwbGF5ZXIgPSBQbGF5ZXIoKTtcbmNvbnN0IGFpID0gUGxheWVyKCk7XG5cbi8vIEFJIHJhbmRvbSBmbGVldCBkZXBsb3ltZW50XG5haS5nYW1lYm9hcmQucmFuZG9tRmxlZXRQbGFjZW1lbnQoKTtcblxuLy8gUGxheWVyIHJhbmRvbSBmbGVldCBkZXBsb3ltZW50XG5yYW5kb21CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdHBsYXllci5nYW1lYm9hcmQuY2xlYXJHcmlkKCk7XG5cdHJlc2V0R3JpZEhUTUwoJ3BsYXllcicpO1xuXHRwbGF5ZXIuZ2FtZWJvYXJkLnJhbmRvbUZsZWV0UGxhY2VtZW50KCk7XG5cdHBvcHVsYXRlQm9hcmRIVE1MKCdwbGF5ZXInLCBwbGF5ZXIuZ2FtZWJvYXJkLmdyaWQpO1xufSk7XG5cbi8vIFBsYXllciBtYW51YWwgZmxlZXQgZGVwbG95bWVudFxubGV0IG9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xuXG5hZGRGbGVldERlcGxveW1lbnRMaXN0ZW5lcihvcmllbnRhdGlvbiwgcGxheWVyLmdhbWVib2FyZCk7XG5cbi8vIFRvZ2dsZSBzaGlwIG9yaWVudGF0aW9uXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB7XG5cdGlmIChlLmNvZGUgPT09ICdLZXlSJykge1xuXHRcdGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG5cdFx0XHRvcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCc7XG5cdFx0fSBlbHNlIGlmIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuXHRcdFx0b3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG5cdFx0fVxuICAgICAgICBhZGRGbGVldERlcGxveW1lbnRMaXN0ZW5lcihvcmllbnRhdGlvbiwgcGxheWVyLmdhbWVib2FyZCk7XG5cdH1cbn0pO1xuXG4vLyBwbGF5ZXIuZ2FtZWJvYXJkLmFkZFNoaXAoMSwgMSwgJ2hvcml6b250YWwnLCAnQ2FycmllcicpO1xuLy8gcGxheWVyLmdhbWVib2FyZC5hZGRTaGlwKDMsIDIsICdob3Jpem9udGFsJywgJ1BhdHJvbCBCb2F0Jyk7XG4vLyBwbGF5ZXIuZ2FtZWJvYXJkLmFkZFNoaXAoNSwgNCwgJ2hvcml6b250YWwnLCAnU3VibWFyaW5lJyk7XG4vLyBwbGF5ZXIuZ2FtZWJvYXJkLmFkZFNoaXAoMiwgNiwgJ2hvcml6b250YWwnLCAnRGVzdHJveWVyJyk7XG4vLyBwbGF5ZXIuZ2FtZWJvYXJkLmFkZFNoaXAoNywgNiwgJ3ZlcnRpY2FsJywgJ0JhdHRsZXNoaXAnKTtcbiIsImNvbnN0IHNoaXBUeXBlcyA9IFtcblx0J0NhcnJpZXInLFxuXHQnQmF0dGxlc2hpcCcsXG5cdCdTdWJtYXJpbmUnLFxuXHQnRGVzdHJveWVyJyxcblx0J1BhdHJvbCBCb2F0Jyxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IHNoaXBUeXBlczsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJvYm90bytNb25vOndnaHRANjAwJmZhbWlseT1VbmJvdW5kZWQ6d2dodEA4MDAmZGlzcGxheT1zd2FwKTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxZjI5Mzc7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgbWluLXdpZHRoOiA5NTBweDtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBtaW4taGVpZ2h0OiA2NTBweDtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIE1vbm8nLCBtb25vc3BhY2U7IH1cXG5cXG4udGl0bGUge1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMzBweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBjb2xvcjogd2hpdGU7XFxuICBmb250LWZhbWlseTogJ1VuYm91bmRlZCcsIGN1cnNpdmU7XFxuICBmb250LXNpemU6IDgwcHg7XFxuICBtYXJnaW4tdG9wOiAzMHB4OyB9XFxuXFxuLmdhbWUtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDEwMHB4O1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgY29sb3I6IHdoaXRlOyB9XFxuICAuZ2FtZS1jb250YWluZXIgLmxlZnQsXFxuICAuZ2FtZS1jb250YWluZXIgLnJpZ2h0IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgd2lkdGg6IDUwdnc7XFxuICAgIGhlaWdodDogNTAwcHg7XFxuICAgIG1hcmdpbi10b3A6IC0yJTsgfVxcbiAgLmdhbWUtY29udGFpbmVyIC5sZWZ0IHtcXG4gICAganVzdGlmeS1jb250ZW50OiBlbmQ7IH1cXG4gIC5nYW1lLWNvbnRhaW5lciAucmlnaHQge1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHN0YXJ0OyB9XFxuICAuZ2FtZS1jb250YWluZXIgLm9wdGlvbnMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgZmxleC1zaHJpbms6IDA7XFxuICAgIGdhcDogMjBweDtcXG4gICAgd2lkdGg6IDM4MHB4O1xcbiAgICBoZWlnaHQ6IDUwMHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGZvbnQtc2l6ZTogMzNweDtcXG4gICAgbGluZS1oZWlnaHQ6IDUycHg7IH1cXG4gICAgLmdhbWUtY29udGFpbmVyIC5vcHRpb25zIC5yb3RhdGUtaW5zdHJ1Y3Rpb24ge1xcbiAgICAgIGhlaWdodDogMTM1cHg7XFxuICAgICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHdoaXRlOyB9XFxuICAgIC5nYW1lLWNvbnRhaW5lciAub3B0aW9ucyAucmFuZG9tLWRlcGxveW1lbnQge1xcbiAgICAgIGRpc3BsYXk6IGZsZXg7IH1cXG5cXG4uYm9hcmQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBmbGV4LXNocmluazogMDtcXG4gIHdpZHRoOiA0MDBweDtcXG4gIGhlaWdodDogNDAwcHg7XFxuICBib3JkZXI6IHNvbGlkIDFweCB3aGl0ZTsgfVxcbiAgLmJvYXJkIC5yb3cge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBmbGV4LWdyb3c6IDE7IH1cXG5cXG4uc3F1YXJlIHtcXG4gIGZsZXgtZ3JvdzogMTtcXG4gIGJvcmRlcjogc29saWQgMXB4IHdoaXRlOyB9XFxuXFxuLmZvb3RlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgaGVpZ2h0OiA3MHB4O1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxNXB4O1xcbiAgY29sb3I6ICNjOGM4Yzg7IH1cXG5cXG4jZ2l0aHViIHtcXG4gIGhlaWdodDogMjdweDtcXG4gIHdpZHRoOiAyN3B4O1xcbiAgcGFkZGluZy1ib3R0b206IDAuMnZoO1xcbiAgdHJhbnNpdGlvbjogMC4zczsgfVxcblxcbiNnaXRodWI6aG92ZXIge1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpOyB9XFxuXFxuLmJ1dHRvbiB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBtYXJnaW46IDI1cHggMTBweCAwIDEwcHg7XFxuICB3aWR0aDogMTkwcHg7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDAuODMpO1xcbiAgbGluZS1oZWlnaHQ6IDIxcHg7IH1cXG5cXG4uYnV0dG9uIGEge1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgZm9udC1mYW1pbHk6IEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgZm9udC1zaXplOiAyNXB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2I1NWU0YjtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgcGFkZGluZzogMjBweCA0MHB4O1xcbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcbiAgdGV4dC1zaGFkb3c6IDBweCAxcHggMHB4ICMwMDA7XFxuICBmaWx0ZXI6IGRyb3BzaGFkb3coY29sb3I9IzAwMCwgb2ZmeD0wIHB4LCBvZmZ5PTEgcHgpO1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAwICNmZmU1YzQsIDAgOHB4IDAgIzZlM2UwMDtcXG4gIC1tb3otYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAjZmZlNWM0LCAwIDhweCAwICM2ZTNlMDA7XFxuICBib3gtc2hhZG93OiBpbnNldCAwIDFweCAwICNmZmU1YzQsIDAgOHB4IDAgIzZlM2UwMDtcXG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgLW1vei1ib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7IH1cXG5cXG4uYnV0dG9uIGE6YWN0aXZlIHtcXG4gIHRvcDogMTBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNiNTVlNGI7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDAgI2ZmZTVjNCwgaW5zZXQgMCAtM3B4IDAgIzkxNTEwMDtcXG4gIC1tb3otYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAjZmZlNWM0LCBpbnNldCAwIC0zcHggMCAjOTE1MTAwO1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAjZmZlNWM0LCBpbnNldCAwIC0zcHggMCAjOTE1MTAwOyB9XFxuXFxuLmJ1dHRvbi5zdGFydCBhLFxcbi5idXR0b24uc3RhcnQgYTphY3RpdmUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2MzMTIxMjsgfVxcblxcbi5idXR0b246YWZ0ZXIge1xcbiAgY29udGVudDogJyc7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBhZGRpbmc6IDRweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvdHRvbTogLTE1cHg7XFxuICBsZWZ0OiAtNHB4O1xcbiAgei1pbmRleDogLTE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmIxODAwO1xcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHg7XFxuICAtbW96LWJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDsgfVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUVBO0VBQ0MsYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qix5QkFBaUM7RUFDakMsU0FBUztFQUNULFVBQVU7RUFFVixZQUFZO0VBQ1osZ0JBQWdCO0VBQ2hCLGFBQWE7RUFDYixpQkFBaUI7RUFFakIscUNBQXFDLEVBQUE7O0FBR3RDO0VBQ0MsWUFBWTtFQUNaLGFBQWE7RUFFYixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1osaUNBQWlDO0VBQ2pDLGVBQWU7RUFDZixnQkFBZ0IsRUFBQTs7QUFHakI7RUFDQyxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixVQUFVO0VBRVYsWUFBWTtFQUNaLFlBQVk7RUFDWixZQUFZLEVBQUE7RUFSYjs7SUFZRSxhQUFhO0lBQ2IsbUJBQW1CO0lBRW5CLFdBQVc7SUFDWCxhQUFhO0lBQ2IsZUFBZSxFQUFBO0VBakJqQjtJQXFCRSxvQkFBb0IsRUFBQTtFQXJCdEI7SUF3QkUsc0JBQXNCLEVBQUE7RUF4QnhCO0lBNEJFLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLHNCQUFzQjtJQUN0QixjQUFjO0lBQ2QsU0FBUztJQUVULFlBQVk7SUFDWixhQUFhO0lBQ2Isa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZixpQkFBaUIsRUFBQTtJQXZDbkI7TUEwQ0csYUFBYTtNQUNiLDhCQUE4QixFQUFBO0lBM0NqQztNQStDRyxhQUFhLEVBQUE7O0FBS2hCO0VBQ0MsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixjQUFjO0VBRWQsWUFBWTtFQUNaLGFBQWE7RUFDYix1QkFBdUIsRUFBQTtFQVB4QjtJQVVFLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsWUFBWSxFQUFBOztBQUlkO0VBQ0MsWUFBWTtFQUNaLHVCQUF1QixFQUFBOztBQUd4QjtFQUNDLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWixZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixjQUF5QixFQUFBOztBQUcxQjtFQUNDLFlBQVk7RUFDWixXQUFXO0VBQ1gscUJBQXFCO0VBQ3JCLGdCQUFnQixFQUFBOztBQUdqQjtFQUNDLHFCQUFxQixFQUFBOztBQUt0QjtFQUNDLGtCQUFrQjtFQUNsQixxQkFBcUI7RUFDckIsd0JBQXdCO0VBRXhCLFlBQVk7RUFDWixzQkFBcUI7RUFDckIsaUJBQWlCLEVBQUE7O0FBR2xCO0VBQ0MsWUFBWTtFQUNaLGtDQUFrQztFQUNsQyxpQkFBaUI7RUFDakIsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixxQkFBcUI7RUFDckIseUJBQWtDO0VBQ2xDLGNBQWM7RUFDZCxrQkFBa0I7RUFDbEIsa0JBQWtCO0VBRWxCLDZDQUE2QztFQUM3Qyw2QkFBNkI7RUFDN0Isb0RBQWtEO0VBRWxELDBEQUEwRDtFQUMxRCx1REFBdUQ7RUFDdkQsa0RBQWtEO0VBRWxELDBCQUEwQjtFQUMxQix1QkFBdUI7RUFDdkIsa0JBQWtCLEVBQUE7O0FBR25CO0VBQ0MsU0FBUztFQUNULHlCQUFrQztFQUVsQyxpRUFBaUU7RUFDakUsOERBQThEO0VBQzlELHlEQUF5RCxFQUFBOztBQUcxRDs7RUFFQyx5QkFBeUIsRUFBQTs7QUFHMUI7RUFDQyxXQUFXO0VBQ1gsWUFBWTtFQUNaLFdBQVc7RUFDWCxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixVQUFVO0VBQ1YsV0FBVztFQUNYLHlCQUF5QjtFQUN6QiwwQkFBMEI7RUFDMUIsdUJBQXVCO0VBQ3ZCLGtCQUFrQixFQUFBXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJvYm90bytNb25vOndnaHRANjAwJmZhbWlseT1VbmJvdW5kZWQ6d2dodEA4MDAmZGlzcGxheT1zd2FwJyk7XFxuXFxuYm9keSB7XFxuXFx0ZGlzcGxheTogZmxleDtcXG5cXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcblxcdGJhY2tncm91bmQtY29sb3I6IHJnYigzMSwgNDEsIDU1KTtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG5cXG5cXHR3aWR0aDogMTAwdnc7XFxuXFx0bWluLXdpZHRoOiA5NTBweDtcXG5cXHRoZWlnaHQ6IDEwMHZoO1xcblxcdG1pbi1oZWlnaHQ6IDY1MHB4O1xcblxcblxcdGZvbnQtZmFtaWx5OiAnUm9ib3RvIE1vbm8nLCBtb25vc3BhY2U7XFxufVxcblxcbi50aXRsZSB7XFxuXFx0d2lkdGg6IDEwMHZ3O1xcblxcdGhlaWdodDogMTMwcHg7XFxuXFxuXFx0ZGlzcGxheTogZmxleDtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXHRhbGlnbi1pdGVtczogY2VudGVyO1xcblxcdGNvbG9yOiB3aGl0ZTtcXG5cXHRmb250LWZhbWlseTogJ1VuYm91bmRlZCcsIGN1cnNpdmU7XFxuXFx0Zm9udC1zaXplOiA4MHB4O1xcblxcdG1hcmdpbi10b3A6IDMwcHg7XFxufVxcblxcbi5nYW1lLWNvbnRhaW5lciB7XFxuXFx0ZGlzcGxheTogZmxleDtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXHRhbGlnbi1pdGVtczogY2VudGVyO1xcblxcdGdhcDogMTAwcHg7XFxuXFxuXFx0d2lkdGg6IDEwMHZ3O1xcblxcdGhlaWdodDogMTAwJTtcXG5cXHRjb2xvcjogd2hpdGU7XFxuXFxuXFx0LmxlZnQsXFxuXFx0LnJpZ2h0IHtcXG5cXHRcXHRkaXNwbGF5OiBmbGV4O1xcblxcdFxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFxuXFx0XFx0d2lkdGg6IDUwdnc7XFxuXFx0XFx0aGVpZ2h0OiA1MDBweDtcXG5cXHRcXHRtYXJnaW4tdG9wOiAtMiU7XFxuXFx0fVxcblxcblxcdC5sZWZ0IHtcXG5cXHRcXHRqdXN0aWZ5LWNvbnRlbnQ6IGVuZDtcXG5cXHR9XFxuXFx0LnJpZ2h0IHtcXG5cXHRcXHRqdXN0aWZ5LWNvbnRlbnQ6IHN0YXJ0O1xcblxcdH1cXG5cXG5cXHQub3B0aW9ucyB7XFxuXFx0XFx0ZGlzcGxheTogZmxleDtcXG5cXHRcXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXHRcXHRhbGlnbi1pdGVtczogY2VudGVyO1xcblxcdFxcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuXFx0XFx0ZmxleC1zaHJpbms6IDA7XFxuXFx0XFx0Z2FwOiAyMHB4O1xcblxcblxcdFxcdHdpZHRoOiAzODBweDtcXG5cXHRcXHRoZWlnaHQ6IDUwMHB4O1xcblxcdFxcdHRleHQtYWxpZ246IGNlbnRlcjtcXG5cXHRcXHRmb250LXNpemU6IDMzcHg7XFxuXFx0XFx0bGluZS1oZWlnaHQ6IDUycHg7XFxuXFxuXFx0XFx0LnJvdGF0ZS1pbnN0cnVjdGlvbiB7XFxuXFx0XFx0XFx0aGVpZ2h0OiAxMzVweDtcXG5cXHRcXHRcXHRib3JkZXItYm90dG9tOiAycHggc29saWQgd2hpdGU7XFxuXFx0XFx0fVxcblxcblxcdFxcdC5yYW5kb20tZGVwbG95bWVudCB7XFxuXFx0XFx0XFx0ZGlzcGxheTogZmxleDtcXG5cXHRcXHR9XFxuXFx0fVxcbn1cXG5cXG4uYm9hcmQge1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG5cXHRmbGV4LXNocmluazogMDtcXG5cXG5cXHR3aWR0aDogNDAwcHg7XFxuXFx0aGVpZ2h0OiA0MDBweDtcXG5cXHRib3JkZXI6IHNvbGlkIDFweCB3aGl0ZTtcXG5cXG5cXHQucm93IHtcXG5cXHRcXHRkaXNwbGF5OiBmbGV4O1xcblxcdFxcdGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuXFx0XFx0ZmxleC1ncm93OiAxO1xcblxcdH1cXG59XFxuXFxuLnNxdWFyZSB7XFxuXFx0ZmxleC1ncm93OiAxO1xcblxcdGJvcmRlcjogc29saWQgMXB4IHdoaXRlO1xcbn1cXG5cXG4uZm9vdGVyIHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0aGVpZ2h0OiA3MHB4O1xcblxcdHdpZHRoOiAxMDB2dztcXG5cXHR0ZXh0LWFsaWduOiBjZW50ZXI7XFxuXFx0Zm9udC1zaXplOiAxNXB4O1xcblxcdGNvbG9yOiByZ2IoMjAwLCAyMDAsIDIwMCk7XFxufVxcblxcbiNnaXRodWIge1xcblxcdGhlaWdodDogMjdweDtcXG5cXHR3aWR0aDogMjdweDtcXG5cXHRwYWRkaW5nLWJvdHRvbTogMC4ydmg7XFxuXFx0dHJhbnNpdGlvbjogMC4zcztcXG59XFxuXFxuI2dpdGh1Yjpob3ZlciB7XFxuXFx0dHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xcbn1cXG5cXG4vLyBCdXR0b24gZnJvbSBodHRwczovL2Rldi50by93ZWJkZWFzeS90b3AtMjAtY3NzLWJ1dHRvbnMtYW5pbWF0aW9ucy1mNDFcXG4vLyBhdXRob3IgamVtd2FyZS4gQWRqdXN0ZWQgYSBiaXQgdG8gbXkgb3duIG5lZWRzLlxcbi5idXR0b24ge1xcblxcdHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXHRkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuXFx0bWFyZ2luOiAyNXB4IDEwcHggMCAxMHB4O1xcblxcblxcdHdpZHRoOiAxOTBweDtcXG5cXHR0cmFuc2Zvcm06IHNjYWxlKC44Myk7XFxuXFx0bGluZS1oZWlnaHQ6IDIxcHg7XFxufVxcblxcbi5idXR0b24gYSB7XFxuXFx0Y29sb3I6IHdoaXRlO1xcblxcdGZvbnQtZmFtaWx5OiBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxuXFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XFxuXFx0Zm9udC1zaXplOiAyNXB4O1xcblxcdHRleHQtYWxpZ246IGNlbnRlcjtcXG5cXHR0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogcmdiKDE4MSwgOTQsIDc1KTtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG5cXHRwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFx0cGFkZGluZzogMjBweCA0MHB4O1xcblxcblxcdC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcXG5cXHR0ZXh0LXNoYWRvdzogMHB4IDFweCAwcHggIzAwMDtcXG5cXHRmaWx0ZXI6IGRyb3BzaGFkb3coY29sb3I9IzAwMCwgb2ZmeD0wcHgsIG9mZnk9MXB4KTtcXG5cXG5cXHQtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDAgI2ZmZTVjNCwgMCA4cHggMCAjNmUzZTAwO1xcblxcdC1tb3otYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAjZmZlNWM0LCAwIDhweCAwICM2ZTNlMDA7XFxuXFx0Ym94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAjZmZlNWM0LCAwIDhweCAwICM2ZTNlMDA7XFxuXFxuXFx0LXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHg7XFxuXFx0LW1vei1ib3JkZXItcmFkaXVzOiA1cHg7XFxuXFx0Ym9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG5cXG4uYnV0dG9uIGE6YWN0aXZlIHtcXG5cXHR0b3A6IDEwcHg7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogcmdiKDE4MSwgOTQsIDc1KTtcXG5cXG5cXHQtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDAgI2ZmZTVjNCwgaW5zZXQgMCAtM3B4IDAgIzkxNTEwMDtcXG5cXHQtbW96LWJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDAgI2ZmZTVjNCwgaW5zZXQgMCAtM3B4IDAgIzkxNTEwMDtcXG5cXHRib3gtc2hhZG93OiBpbnNldCAwIDFweCAwICNmZmU1YzQsIGluc2V0IDAgLTNweCAwICM5MTUxMDA7XFxufVxcblxcbi5idXR0b24uc3RhcnQgYSxcXG4uYnV0dG9uLnN0YXJ0IGE6YWN0aXZlIHtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiAjYzMxMjEyO1xcbn1cXG5cXG4uYnV0dG9uOmFmdGVyIHtcXG5cXHRjb250ZW50OiAnJztcXG5cXHRoZWlnaHQ6IDEwMCU7XFxuXFx0d2lkdGg6IDEwMCU7XFxuXFx0cGFkZGluZzogNHB4O1xcblxcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG5cXHRib3R0b206IC0xNXB4O1xcblxcdGxlZnQ6IC00cHg7XFxuXFx0ei1pbmRleDogLTE7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogIzJiMTgwMDtcXG5cXHQtd2Via2l0LWJvcmRlci1yYWRpdXM6IDVweDtcXG5cXHQtbW96LWJvcmRlci1yYWRpdXM6IDVweDtcXG5cXHRib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xuXG5cbmltcG9ydCAnLi9tb2R1bGVzL0RPTSc7XG5pbXBvcnQgJy4vbW9kdWxlcy9nYW1lTG9vcCdcblxuaW1wb3J0ICcuL21vZHVsZXMvZmFjdG9yaWVzL3NoaXAnO1xuaW1wb3J0ICcuL21vZHVsZXMvZmFjdG9yaWVzL2dhbWVib2FyZCc7XG5pbXBvcnQgJy4vbW9kdWxlcy9mYWN0b3JpZXMvcGxheWVyJztcblxuIl0sIm5hbWVzIjpbInNoaXBUeXBlcyIsImdpdEljb24iLCJnaXRJbWciLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzcmMiLCJzdGFydEJ0biIsInJhbmRvbUJ0biIsImxlZnQiLCJyaWdodCIsInJvdyIsImNyZWF0ZUVsZW1lbnQiLCJzcXVhcmUiLCJwbGF5ZXJCb2FyZCIsImNsYXNzTGlzdCIsImFkZCIsImkiLCJhcHBlbmRDaGlsZCIsImNsb25lTm9kZSIsImoiLCJ0ZW1wU3F1YXJlIiwic2V0QXR0cmlidXRlIiwibGFzdENoaWxkIiwiYWlCb2FyZCIsInN0eWxlIiwiZGlzcGxheSIsImhlbHBlckNob29zZVBsYXllckdyaWQiLCJwbGF5ZXIiLCJncmlkSFRNTCIsInBvcHVsYXRlQm9hcmRIVE1MIiwiZ3JpZE9iamVjdCIsInNxdWFyZUhUTUwiLCJmb3JFYWNoIiwic3F1YXJlT2JqIiwiY2hpbGROb2RlcyIsInJvd0hUTUwiLCJzcSIsIngiLCJnZXRBdHRyaWJ1dGUiLCJ5Iiwib2NjdXBpZWQiLCJzaGlwVHlwZSIsImJhY2tncm91bmRDb2xvciIsInJlc2V0R3JpZEhUTUwiLCJyZW1vdmVHcmlkTGlzdGVuZXJzIiwicGxheWVyQm9hcmRDbG9uZSIsImFpQm9hcmRDbG9uZSIsInBhcmVudE5vZGUiLCJyZXBsYWNlQ2hpbGQiLCJhZGRGbGVldERlcGxveW1lbnRMaXN0ZW5lciIsIm9yaWVudGF0aW9uIiwiZ2FtZWJvYXJkT2JqIiwic3FYIiwic3FZIiwiYWRkRXZlbnRMaXN0ZW5lciIsImdyaWQiLCJzb21lIiwiZWwiLCJub1NwYWNlIiwiY2hlY2tTcGFjZUZvclNoaXAiLCJjb25zb2xlIiwibG9nIiwiU2hpcCIsIkdhbWVib2FyZCIsImNyZWF0ZUdyaWQiLCJncmlkQXJyYXkiLCJwdXNoIiwiaGl0VGFrZW4iLCJnYW1lTG9zdCIsImNsZWFyR3JpZCIsInhDb29yZCIsInlDb29yZCIsImxlbmd0aCIsInN0YXJ0U3F1YXJlIiwiZ2V0U3F1YXJlIiwiY2FudEJ1aWxkIiwiYWRkU2hpcCIsIm5ld1NoaXAiLCJyYW5kb21GbGVldFBsYWNlbWVudCIsInJhbmRvbVNoaXBQbGFjZW1lbnQiLCJzaGlwQnVpbHQiLCJvcmllbnRhdGlvbk51bWJlciIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImZpbmQiLCJyZWNlaXZlQXR0YWNrIiwidGFrZUhpdCIsImNoZWNrRmxlZXRDb25kaXRpb24iLCJmbGVldERlcGxveWVkIiwiZmxlZXRBbGl2ZSIsIlBsYXllciIsImdhbWVib2FyZCIsImdhbWVXb24iLCJhdHRhY2siLCJlbmVteUJvYXJkIiwicmFuZG9tQXR0YWNrIiwic2hvdEZpcmVkIiwiaGl0c1Rha2VuIiwiaXNTdW5rIiwiY2hlY2tIUCIsImFpIiwiZSIsImNvZGUiXSwic291cmNlUm9vdCI6IiJ9