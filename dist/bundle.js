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
/* eslint-disable prefer-destructuring */


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
  playerBoard.lastChild.setAttribute('data-y', i);
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
      var sqX = +sq.getAttribute('data-x');
      var sqY = +sq.getAttribute('data-y');
      var shipTypeObj;
      var shipLength;

      // Check if particular ship type has been already deployed
      if (!gameboardObj.grid.some(function (el) {
        return el.shipType === _shipTypes__WEBPACK_IMPORTED_MODULE_0__["default"][0].type;
      })) {
        shipLength = _shipTypes__WEBPACK_IMPORTED_MODULE_0__["default"][0].length;
        shipTypeObj = _shipTypes__WEBPACK_IMPORTED_MODULE_0__["default"][0];
      } else if (!gameboardObj.grid.some(function (el) {
        return el.shipType === _shipTypes__WEBPACK_IMPORTED_MODULE_0__["default"][1].type;
      })) {
        shipLength = _shipTypes__WEBPACK_IMPORTED_MODULE_0__["default"][1].length;
        shipTypeObj = _shipTypes__WEBPACK_IMPORTED_MODULE_0__["default"][1];
      } else if (!gameboardObj.grid.some(function (el) {
        return el.shipType === _shipTypes__WEBPACK_IMPORTED_MODULE_0__["default"][2].type;
      })) {
        shipLength = _shipTypes__WEBPACK_IMPORTED_MODULE_0__["default"][2].length;
        shipTypeObj = _shipTypes__WEBPACK_IMPORTED_MODULE_0__["default"][2];
      } else if (!gameboardObj.grid.some(function (el) {
        return el.shipType === _shipTypes__WEBPACK_IMPORTED_MODULE_0__["default"][3].type;
      })) {
        shipLength = _shipTypes__WEBPACK_IMPORTED_MODULE_0__["default"][3].length;
        shipTypeObj = _shipTypes__WEBPACK_IMPORTED_MODULE_0__["default"][3];
      } else if (!gameboardObj.grid.some(function (el) {
        return el.shipType === _shipTypes__WEBPACK_IMPORTED_MODULE_0__["default"][4].type;
      })) {
        shipLength = _shipTypes__WEBPACK_IMPORTED_MODULE_0__["default"][4].length;
        shipTypeObj = _shipTypes__WEBPACK_IMPORTED_MODULE_0__["default"][4];
      }

      // Check if ship can be built
      var noSpace = gameboardObj.checkSpaceForShip(sqX, sqY, shipLength, orientation);

      // Show on grid if ship can be added
      sq.addEventListener('mouseover', function () {
        if (orientation === 'horizontal') {
          var _loop = function _loop(_i) {
            if (_i > 10) return "break";
            playerBoard.childNodes.forEach(function (rw) {
              rw.childNodes.forEach(function (sqr) {
                if (+sqr.getAttribute('data-x') === _i && +sqr.getAttribute('data-y') === sqY) {
                  // If ship can't be built gray out squares
                  if (noSpace) {
                    sqr.style.backgroundColor = 'rgb(88, 88, 88)';
                    // Otherwise show proper ship color
                  } else {
                    sqr.style.backgroundColor = shipTypeObj.color;
                  }
                }
              });
            });
          };
          for (var _i = sqX; _i < sqX + shipLength; _i++) {
            var _ret = _loop(_i);
            if (_ret === "break") break;
          }
        } else if (orientation === 'vertical') {
          var _loop2 = function _loop2(_i2) {
            if (_i2 > 10) return "break";
            playerBoard.childNodes.forEach(function (rw) {
              rw.childNodes.forEach(function (sqr) {
                if (+sqr.getAttribute('data-x') === sqX && +sqr.getAttribute('data-y') === _i2) {
                  if (noSpace) {
                    sqr.style.backgroundColor = 'rgb(88, 88, 88)';
                  } else {
                    sqr.style.backgroundColor = shipTypeObj.color;
                  }
                }
              });
            });
          };
          for (var _i2 = sqY; _i2 < sqY + shipLength; _i2++) {
            var _ret2 = _loop2(_i2);
            if (_ret2 === "break") break;
          }
        }
      });

      // When leaving grid cell remove deployment indication
      sq.addEventListener('mouseleave', function () {
        populateBoardHTML('player', gameboardObj.grid);
      });

      // On click add ship to player's board object
      sq.addEventListener('click', function () {
        if (!noSpace) {
          gameboardObj.addShip(sqX, sqY, orientation, shipTypeObj.type);
          removeGridListeners();
          addFleetDeploymentListener(orientation, gameboardObj);
        }
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
      var noSpace = false;
      if (orientation === 'horizontal') {
        var _loop = function _loop(i) {
          if (i > 10) return {
            v: true
          };
          _this.grid.forEach(function (square) {
            if (square.x === i && square.y === startSquare.y && square.occupied) {
              noSpace = true;
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
              noSpace = true;
            }
          });
        };
        for (var _i = yCoord; _i < yCoord + length; _i++) {
          var _ret2 = _loop2(_i);
          if (_typeof(_ret2) === "object") return _ret2.v;
        }
      }
      return noSpace;
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
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM */ "./src/modules/DOM.js");



// Initialize players
var player = (0,_factories_player__WEBPACK_IMPORTED_MODULE_0__["default"])();
var ai = (0,_factories_player__WEBPACK_IMPORTED_MODULE_0__["default"])();

// AI random fleet deployment
ai.gameboard.randomFleetPlacement();

// Player random fleet deployment
_DOM__WEBPACK_IMPORTED_MODULE_1__.randomBtn.addEventListener('click', function () {
  player.gameboard.clearGrid();
  (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.resetGridHTML)('player');
  player.gameboard.randomFleetPlacement();
  (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.populateBoardHTML)('player', player.gameboard.grid);
});

// Player manual fleet deployment
var orientation = 'horizontal';
(0,_DOM__WEBPACK_IMPORTED_MODULE_1__.addFleetDeploymentListener)(orientation, player.gameboard);

// Toggle ship orientation
document.addEventListener('keypress', function (e) {
  if (e.code === 'KeyR') {
    if (orientation === 'horizontal') {
      orientation = 'vertical';
    } else if (orientation === 'vertical') {
      orientation = 'horizontal';
    }
    (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.resetGridHTML)('player');
    (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.populateBoardHTML)('player', player.gameboard.grid);
    (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.addFleetDeploymentListener)(orientation, player.gameboard);
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
var shipTypes = [{
  type: 'Carrier',
  length: 5,
  color: 'rgb(250, 108, 56)'
}, {
  type: 'Battleship',
  length: 4,
  color: 'rgb(255, 155, 133)'
}, {
  type: 'Destroyer',
  length: 3,
  color: 'rgb(246, 215, 60)'
}, {
  type: 'Submarine',
  length: 3,
  color: 'rgb(0, 184, 144)'
}, {
  type: 'Patrol Boat',
  length: 2,
  color: 'rgb(80, 180, 226)'
}];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ3pELElBQUk7O0FBRUo7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ3JFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O1VDZkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDZkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQXNCO0FBR0M7QUFDSTtBQUVPO0FBQ0siLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vc3JjL21vZHVsZXMvRE9NLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9mYWN0b3JpZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9mYWN0b3JpZXMvcGxheWVyLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9mYWN0b3JpZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vc3JjL21vZHVsZXMvZ2FtZUxvb3AuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL3NoaXBUeXBlcy5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vc3JjL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9zcmMvc3R5bGUuc2Nzcz83NWJhIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL3NyYy9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcHJlZmVyLWRlc3RydWN0dXJpbmcgKi9cbmltcG9ydCBzaGlwVHlwZXMgZnJvbSAnLi9zaGlwVHlwZXMnO1xuaW1wb3J0IGdpdEljb24gZnJvbSAnLi4vaW1nL2dpdGh1Yi5wbmcnO1xuXG5jb25zdCBnaXRJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ2l0aHViJyk7XG5naXRJbWcuc3JjID0gZ2l0SWNvbjtcblxuY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnQnKTtcbmNvbnN0IHJhbmRvbUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYW5kb20nKTtcblxuY29uc3QgbGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZWZ0Jyk7XG5jb25zdCByaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yaWdodCcpO1xuXG5jb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xubGV0IHBsYXllckJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbnBsYXllckJvYXJkLmNsYXNzTGlzdC5hZGQoJ2JvYXJkJyk7XG5yb3cuY2xhc3NMaXN0LmFkZCgncm93Jyk7XG5zcXVhcmUuY2xhc3NMaXN0LmFkZCgnc3F1YXJlJyk7XG5cbi8vIENyZWF0ZSBncmlkXG5mb3IgKGxldCBpID0gMTsgaSA8IDExOyBpKyspIHtcblx0cGxheWVyQm9hcmQuYXBwZW5kQ2hpbGQocm93LmNsb25lTm9kZSgpKTtcblx0cGxheWVyQm9hcmQubGFzdENoaWxkLnNldEF0dHJpYnV0ZSgnZGF0YS15JywgaSk7XG5cdGZvciAobGV0IGogPSAxOyBqIDwgMTE7IGorKykge1xuXHRcdGNvbnN0IHRlbXBTcXVhcmUgPSBzcXVhcmUuY2xvbmVOb2RlKCk7XG5cdFx0dGVtcFNxdWFyZS5zZXRBdHRyaWJ1dGUoJ2RhdGEteCcsIGopO1xuXHRcdHRlbXBTcXVhcmUuc2V0QXR0cmlidXRlKCdkYXRhLXknLCBpKTtcblxuXHRcdHBsYXllckJvYXJkLmxhc3RDaGlsZC5hcHBlbmRDaGlsZCh0ZW1wU3F1YXJlKTtcblx0fVxufVxuXG5sZXQgYWlCb2FyZCA9IHBsYXllckJvYXJkLmNsb25lTm9kZSh0cnVlKTtcbnBsYXllckJvYXJkLmNsYXNzTGlzdC5hZGQoJ3BsYXllci1ib2FyZCcpO1xuYWlCb2FyZC5jbGFzc0xpc3QuYWRkKCdhaS1ib2FyZCcpO1xuYWlCb2FyZC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG5sZWZ0LmFwcGVuZENoaWxkKHBsYXllckJvYXJkKTtcbnJpZ2h0LmFwcGVuZENoaWxkKGFpQm9hcmQpO1xuXG5mdW5jdGlvbiBoZWxwZXJDaG9vc2VQbGF5ZXJHcmlkKHBsYXllcikge1xuXHRsZXQgZ3JpZEhUTUw7XG5cblx0aWYgKHBsYXllciA9PT0gJ3BsYXllcicpIHtcblx0XHRncmlkSFRNTCA9IHBsYXllckJvYXJkO1xuXHR9IGVsc2UgaWYgKHBsYXllciA9PT0gJ2FpJykge1xuXHRcdGdyaWRIVE1MID0gYWlCb2FyZDtcblx0fVxuXHRyZXR1cm4gZ3JpZEhUTUw7XG59XG5cbmZ1bmN0aW9uIHBvcHVsYXRlQm9hcmRIVE1MKHBsYXllciwgZ3JpZE9iamVjdCkge1xuXHRjb25zdCBncmlkSFRNTCA9IGhlbHBlckNob29zZVBsYXllckdyaWQocGxheWVyKTtcblx0bGV0IHNxdWFyZUhUTUw7XG5cblx0Ly8gRmluZCBIVE1MIGVxdWl2YWxlbnQgb2Ygc3F1YXJlIG9iamVjdCBieSBjb29yZGluYXRlc1xuXHRncmlkT2JqZWN0LmZvckVhY2goKHNxdWFyZU9iaikgPT4ge1xuXHRcdGdyaWRIVE1MLmNoaWxkTm9kZXMuZm9yRWFjaCgocm93SFRNTCkgPT4ge1xuXHRcdFx0cm93SFRNTC5jaGlsZE5vZGVzLmZvckVhY2goKHNxKSA9PiB7XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRzcXVhcmVPYmoueCA9PT0gK3NxLmdldEF0dHJpYnV0ZSgnZGF0YS14JykgJiZcblx0XHRcdFx0XHRzcXVhcmVPYmoueSA9PT0gK3NxLmdldEF0dHJpYnV0ZSgnZGF0YS15Jylcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0c3F1YXJlSFRNTCA9IHNxO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdGlmIChzcXVhcmVPYmoub2NjdXBpZWQpIHtcblx0XHRcdGlmIChzcXVhcmVPYmouc2hpcFR5cGUgPT09ICdQYXRyb2wgQm9hdCcpIHtcblx0XHRcdFx0c3F1YXJlSFRNTC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDgwLCAxODAsIDIyNiknO1xuXHRcdFx0fSBlbHNlIGlmIChzcXVhcmVPYmouc2hpcFR5cGUgPT09ICdTdWJtYXJpbmUnKSB7XG5cdFx0XHRcdHNxdWFyZUhUTUwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYigwLCAxODQsIDE0NCknO1xuXHRcdFx0fSBlbHNlIGlmIChzcXVhcmVPYmouc2hpcFR5cGUgPT09ICdEZXN0cm95ZXInKSB7XG5cdFx0XHRcdHNxdWFyZUhUTUwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYigyNDYsIDIxNSwgNjApJztcblx0XHRcdH0gZWxzZSBpZiAoc3F1YXJlT2JqLnNoaXBUeXBlID09PSAnQmF0dGxlc2hpcCcpIHtcblx0XHRcdFx0c3F1YXJlSFRNTC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDI1NSwgMTU1LCAxMzMpJztcblx0XHRcdH0gZWxzZSBpZiAoc3F1YXJlT2JqLnNoaXBUeXBlID09PSAnQ2FycmllcicpIHtcblx0XHRcdFx0c3F1YXJlSFRNTC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDI1MCwgMTA4LCA1NiknO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRzcXVhcmVIVE1MLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2IoMzEsIDQxLCA1NSknO1xuXHRcdH1cblx0fSk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0R3JpZEhUTUwocGxheWVyKSB7XG5cdGNvbnN0IGdyaWRIVE1MID0gaGVscGVyQ2hvb3NlUGxheWVyR3JpZChwbGF5ZXIpO1xuXG5cdGdyaWRIVE1MLmNoaWxkTm9kZXMuZm9yRWFjaCgocm93SFRNTCkgPT4ge1xuXHRcdHJvd0hUTUwuY2hpbGROb2Rlcy5mb3JFYWNoKChzcSkgPT4ge1xuXHRcdFx0c3Euc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYigzMSwgNDEsIDU1KSc7XG5cdFx0fSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiByZW1vdmVHcmlkTGlzdGVuZXJzKCkge1xuXHRjb25zdCBwbGF5ZXJCb2FyZENsb25lID0gcGxheWVyQm9hcmQuY2xvbmVOb2RlKHRydWUpO1xuXHRjb25zdCBhaUJvYXJkQ2xvbmUgPSBhaUJvYXJkLmNsb25lTm9kZSh0cnVlKTtcblxuXHRwbGF5ZXJCb2FyZC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChwbGF5ZXJCb2FyZENsb25lLCBwbGF5ZXJCb2FyZCk7XG5cdGFpQm9hcmQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoYWlCb2FyZENsb25lLCBhaUJvYXJkKTtcblxuXHRwbGF5ZXJCb2FyZCA9IHBsYXllckJvYXJkQ2xvbmU7XG5cdGFpQm9hcmQgPSBhaUJvYXJkQ2xvbmU7XG59XG5cbmZ1bmN0aW9uIGFkZEZsZWV0RGVwbG95bWVudExpc3RlbmVyKG9yaWVudGF0aW9uLCBnYW1lYm9hcmRPYmopIHtcblx0cmVtb3ZlR3JpZExpc3RlbmVycygpO1xuXG5cdHBsYXllckJvYXJkLmNoaWxkTm9kZXMuZm9yRWFjaCgocm93SFRNTCkgPT4ge1xuXHRcdHJvd0hUTUwuY2hpbGROb2Rlcy5mb3JFYWNoKChzcSkgPT4ge1xuXHRcdFx0Y29uc3Qgc3FYID0gK3NxLmdldEF0dHJpYnV0ZSgnZGF0YS14Jyk7XG5cdFx0XHRjb25zdCBzcVkgPSArc3EuZ2V0QXR0cmlidXRlKCdkYXRhLXknKTtcblx0XHRcdGxldCBzaGlwVHlwZU9iajtcblx0XHRcdGxldCBzaGlwTGVuZ3RoO1xuXG5cdFx0XHQvLyBDaGVjayBpZiBwYXJ0aWN1bGFyIHNoaXAgdHlwZSBoYXMgYmVlbiBhbHJlYWR5IGRlcGxveWVkXG5cdFx0XHRpZiAoIWdhbWVib2FyZE9iai5ncmlkLnNvbWUoKGVsKSA9PiBlbC5zaGlwVHlwZSA9PT0gc2hpcFR5cGVzWzBdLnR5cGUpKSB7XG5cdFx0XHRcdHNoaXBMZW5ndGggPSBzaGlwVHlwZXNbMF0ubGVuZ3RoO1xuXHRcdFx0XHRzaGlwVHlwZU9iaiA9IHNoaXBUeXBlc1swXTtcblx0XHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRcdCFnYW1lYm9hcmRPYmouZ3JpZC5zb21lKChlbCkgPT4gZWwuc2hpcFR5cGUgPT09IHNoaXBUeXBlc1sxXS50eXBlKVxuXHRcdFx0KSB7XG5cdFx0XHRcdHNoaXBMZW5ndGggPSBzaGlwVHlwZXNbMV0ubGVuZ3RoO1xuXHRcdFx0XHRzaGlwVHlwZU9iaiA9IHNoaXBUeXBlc1sxXTtcblx0XHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRcdCFnYW1lYm9hcmRPYmouZ3JpZC5zb21lKChlbCkgPT4gZWwuc2hpcFR5cGUgPT09IHNoaXBUeXBlc1syXS50eXBlKVxuXHRcdFx0KSB7XG5cdFx0XHRcdHNoaXBMZW5ndGggPSBzaGlwVHlwZXNbMl0ubGVuZ3RoO1xuXHRcdFx0XHRzaGlwVHlwZU9iaiA9IHNoaXBUeXBlc1syXTtcblx0XHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRcdCFnYW1lYm9hcmRPYmouZ3JpZC5zb21lKChlbCkgPT4gZWwuc2hpcFR5cGUgPT09IHNoaXBUeXBlc1szXS50eXBlKVxuXHRcdFx0KSB7XG5cdFx0XHRcdHNoaXBMZW5ndGggPSBzaGlwVHlwZXNbM10ubGVuZ3RoO1xuXHRcdFx0XHRzaGlwVHlwZU9iaiA9IHNoaXBUeXBlc1szXTtcblx0XHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRcdCFnYW1lYm9hcmRPYmouZ3JpZC5zb21lKChlbCkgPT4gZWwuc2hpcFR5cGUgPT09IHNoaXBUeXBlc1s0XS50eXBlKVxuXHRcdFx0KSB7XG5cdFx0XHRcdHNoaXBMZW5ndGggPSBzaGlwVHlwZXNbNF0ubGVuZ3RoO1xuXHRcdFx0XHRzaGlwVHlwZU9iaiA9IHNoaXBUeXBlc1s0XTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2hlY2sgaWYgc2hpcCBjYW4gYmUgYnVpbHRcblx0XHRcdGNvbnN0IG5vU3BhY2UgPSBnYW1lYm9hcmRPYmouY2hlY2tTcGFjZUZvclNoaXAoXG5cdFx0XHRcdHNxWCxcblx0XHRcdFx0c3FZLFxuXHRcdFx0XHRzaGlwTGVuZ3RoLFxuXHRcdFx0XHRvcmllbnRhdGlvblxuXHRcdFx0KTtcblxuXHRcdFx0Ly8gU2hvdyBvbiBncmlkIGlmIHNoaXAgY2FuIGJlIGFkZGVkXG5cdFx0XHRzcS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XG5cdFx0XHRcdGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IHNxWDsgaSA8IHNxWCArIHNoaXBMZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0aWYgKGkgPiAxMCkgYnJlYWs7XG5cblx0XHRcdFx0XHRcdHBsYXllckJvYXJkLmNoaWxkTm9kZXMuZm9yRWFjaCgocncpID0+IHtcblx0XHRcdFx0XHRcdFx0cncuY2hpbGROb2Rlcy5mb3JFYWNoKChzcXIpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdFx0XHQrc3FyLmdldEF0dHJpYnV0ZSgnZGF0YS14JykgPT09IGkgJiZcblx0XHRcdFx0XHRcdFx0XHRcdCtzcXIuZ2V0QXR0cmlidXRlKCdkYXRhLXknKSA9PT0gc3FZXG5cdFx0XHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBJZiBzaGlwIGNhbid0IGJlIGJ1aWx0IGdyYXkgb3V0IHNxdWFyZXNcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChub1NwYWNlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNxci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDg4LCA4OCwgODgpJztcblx0XHRcdFx0XHRcdFx0XHRcdC8vIE90aGVyd2lzZSBzaG93IHByb3BlciBzaGlwIGNvbG9yXG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzcXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gc2hpcFR5cGVPYmouY29sb3I7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIGlmIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuXHRcdFx0XHRcdGZvciAobGV0IGkgPSBzcVk7IGkgPCBzcVkgKyBzaGlwTGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGlmIChpID4gMTApIGJyZWFrO1xuXG5cdFx0XHRcdFx0XHRwbGF5ZXJCb2FyZC5jaGlsZE5vZGVzLmZvckVhY2goKHJ3KSA9PiB7XG5cdFx0XHRcdFx0XHRcdHJ3LmNoaWxkTm9kZXMuZm9yRWFjaCgoc3FyKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0XHRcdFx0K3Nxci5nZXRBdHRyaWJ1dGUoJ2RhdGEteCcpID09PSBzcVggJiZcblx0XHRcdFx0XHRcdFx0XHRcdCtzcXIuZ2V0QXR0cmlidXRlKCdkYXRhLXknKSA9PT0gaVxuXHRcdFx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKG5vU3BhY2UpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0c3FyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2IoODgsIDg4LCA4OCknO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0c3FyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHNoaXBUeXBlT2JqLmNvbG9yO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBXaGVuIGxlYXZpbmcgZ3JpZCBjZWxsIHJlbW92ZSBkZXBsb3ltZW50IGluZGljYXRpb25cblx0XHRcdHNxLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG5cdFx0XHRcdHBvcHVsYXRlQm9hcmRIVE1MKCdwbGF5ZXInLCBnYW1lYm9hcmRPYmouZ3JpZCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gT24gY2xpY2sgYWRkIHNoaXAgdG8gcGxheWVyJ3MgYm9hcmQgb2JqZWN0XG5cdFx0XHRzcS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdFx0aWYgKCFub1NwYWNlKSB7XG5cdFx0XHRcdFx0Z2FtZWJvYXJkT2JqLmFkZFNoaXAoc3FYLCBzcVksIG9yaWVudGF0aW9uLCBzaGlwVHlwZU9iai50eXBlKTtcblx0XHRcdFx0XHRyZW1vdmVHcmlkTGlzdGVuZXJzKCk7XG5cdFx0XHRcdFx0YWRkRmxlZXREZXBsb3ltZW50TGlzdGVuZXIob3JpZW50YXRpb24sIGdhbWVib2FyZE9iaik7XG5cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0pO1xufVxuXG5leHBvcnQge1xuXHRzdGFydEJ0bixcblx0cmFuZG9tQnRuLFxuXHRwb3B1bGF0ZUJvYXJkSFRNTCxcblx0cmVzZXRHcmlkSFRNTCxcblx0YWRkRmxlZXREZXBsb3ltZW50TGlzdGVuZXIsXG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tbG9vcC1mdW5jICovXG5pbXBvcnQgU2hpcCBmcm9tICcuL3NoaXAnO1xuXG5mdW5jdGlvbiBHYW1lYm9hcmQoKSB7XG5cdGxldCBncmlkO1xuXG5cdGNvbnN0IGNyZWF0ZUdyaWQgPSAoKSA9PiB7XG5cdFx0Y29uc3QgZ3JpZEFycmF5ID0gW107XG5cdFx0Zm9yIChsZXQgaSA9IDE7IGkgPCAxMTsgaSsrKSB7XG5cdFx0XHRmb3IgKGxldCBqID0gMTsgaiA8IDExOyBqKyspIHtcblx0XHRcdFx0Z3JpZEFycmF5LnB1c2goe1xuXHRcdFx0XHRcdHg6IGksXG5cdFx0XHRcdFx0eTogaixcblx0XHRcdFx0XHRvY2N1cGllZDogZmFsc2UsXG5cdFx0XHRcdFx0c2hpcFR5cGU6IGZhbHNlLFxuXHRcdFx0XHRcdGhpdFRha2VuOiBmYWxzZSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGdyaWQgPSBncmlkQXJyYXk7XG5cdH07XG5cdGNyZWF0ZUdyaWQoKTtcblxuXHRyZXR1cm4ge1xuXHRcdGdyaWQsXG5cdFx0Z2FtZUxvc3Q6IGZhbHNlLFxuXG5cdFx0Y2xlYXJHcmlkKCkge1xuXHRcdFx0dGhpcy5ncmlkLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuXHRcdFx0XHRzcXVhcmUub2NjdXBpZWQgPSBmYWxzZTtcblx0XHRcdFx0c3F1YXJlLnNoaXBUeXBlID0gZmFsc2U7XG5cdFx0XHRcdHNxdWFyZS5oaXRUYWtlbiA9IGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdC8vIENoZWNrIGlmIHRoZXJlIGlzIHNwYWNlIHRvIGNyZWF0ZSBzaGlwIGFuZCBjb29yZHMgYXJlIGluIHJhbmdlXG5cdFx0Y2hlY2tTcGFjZUZvclNoaXAoeENvb3JkLCB5Q29vcmQsIGxlbmd0aCwgb3JpZW50YXRpb24pIHtcblx0XHRcdGNvbnN0IHN0YXJ0U3F1YXJlID0gdGhpcy5nZXRTcXVhcmUoeENvb3JkLCB5Q29vcmQpO1xuXHRcdFx0bGV0IG5vU3BhY2UgPSBmYWxzZTtcblxuXHRcdFx0aWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IHhDb29yZDsgaSA8IHhDb29yZCArIGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0aWYgKGkgPiAxMCkgcmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0dGhpcy5ncmlkLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0XHRzcXVhcmUueCA9PT0gaSAmJlxuXHRcdFx0XHRcdFx0XHRzcXVhcmUueSA9PT0gc3RhcnRTcXVhcmUueSAmJlxuXHRcdFx0XHRcdFx0XHRzcXVhcmUub2NjdXBpZWRcblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRub1NwYWNlID0gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuXHRcdFx0XHRmb3IgKGxldCBpID0geUNvb3JkOyBpIDwgeUNvb3JkICsgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRpZiAoaSA+IDEwKSByZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR0aGlzLmdyaWQuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS54ID09PSBzdGFydFNxdWFyZS54ICYmXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS55ID09PSBpICYmXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS5vY2N1cGllZFxuXHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdG5vU3BhY2UgPSB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbm9TcGFjZTtcblx0XHR9LFxuXG5cdFx0YWRkU2hpcCh4Q29vcmQsIHlDb29yZCwgb3JpZW50YXRpb24sIHNoaXBUeXBlKSB7XG5cdFx0XHRjb25zdCBzdGFydFNxdWFyZSA9IHRoaXMuZ2V0U3F1YXJlKHhDb29yZCwgeUNvb3JkKTtcblx0XHRcdGxldCBsZW5ndGg7XG5cblx0XHRcdGlmIChzaGlwVHlwZSA9PT0gJ1BhdHJvbCBCb2F0Jykge1xuXHRcdFx0XHRsZW5ndGggPSAyO1xuXHRcdFx0fSBlbHNlIGlmIChzaGlwVHlwZSA9PT0gJ1N1Ym1hcmluZScpIHtcblx0XHRcdFx0bGVuZ3RoID0gMztcblx0XHRcdH0gZWxzZSBpZiAoc2hpcFR5cGUgPT09ICdEZXN0cm95ZXInKSB7XG5cdFx0XHRcdGxlbmd0aCA9IDM7XG5cdFx0XHR9IGVsc2UgaWYgKHNoaXBUeXBlID09PSAnQmF0dGxlc2hpcCcpIHtcblx0XHRcdFx0bGVuZ3RoID0gNDtcblx0XHRcdH0gZWxzZSBpZiAoc2hpcFR5cGUgPT09ICdDYXJyaWVyJykge1xuXHRcdFx0XHRsZW5ndGggPSA1O1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoc3RhcnRTcXVhcmUub2NjdXBpZWQpIHJldHVybiBmYWxzZTtcblxuXHRcdFx0Y29uc3Qgbm9TcGFjZSA9IHRoaXMuY2hlY2tTcGFjZUZvclNoaXAoXG5cdFx0XHRcdHhDb29yZCxcblx0XHRcdFx0eUNvb3JkLFxuXHRcdFx0XHRsZW5ndGgsXG5cdFx0XHRcdG9yaWVudGF0aW9uXG5cdFx0XHQpO1xuXHRcdFx0aWYgKG5vU3BhY2UpIHJldHVybiBmYWxzZTtcblxuXHRcdFx0Ly8gQnVpbGQgc2hpcFxuXHRcdFx0Y29uc3QgbmV3U2hpcCA9IFNoaXAobGVuZ3RoKTtcblx0XHRcdGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG5cdFx0XHRcdGZvciAobGV0IGkgPSB4Q29vcmQ7IGkgPCB4Q29vcmQgKyBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdHRoaXMuZ3JpZC5mb3JFYWNoKChzcXVhcmUpID0+IHtcblx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0c3F1YXJlLnggPT09IGkgJiZcblx0XHRcdFx0XHRcdFx0c3F1YXJlLnkgPT09IHN0YXJ0U3F1YXJlLnkgJiZcblx0XHRcdFx0XHRcdFx0IXNxdWFyZS5vY2N1cGllZFxuXHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdHNxdWFyZS5vY2N1cGllZCA9IG5ld1NoaXA7XG5cdFx0XHRcdFx0XHRcdHNxdWFyZS5zaGlwVHlwZSA9IHNoaXBUeXBlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKG9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG5cdFx0XHRcdGZvciAobGV0IGkgPSB5Q29vcmQ7IGkgPCB5Q29vcmQgKyBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdHRoaXMuZ3JpZC5mb3JFYWNoKChzcXVhcmUpID0+IHtcblx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0c3F1YXJlLnggPT09IHN0YXJ0U3F1YXJlLnggJiZcblx0XHRcdFx0XHRcdFx0c3F1YXJlLnkgPT09IGkgJiZcblx0XHRcdFx0XHRcdFx0IXNxdWFyZS5vY2N1cGllZFxuXHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdHNxdWFyZS5vY2N1cGllZCA9IG5ld1NoaXA7XG5cdFx0XHRcdFx0XHRcdHNxdWFyZS5zaGlwVHlwZSA9IHNoaXBUeXBlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9LFxuXG5cdFx0cmFuZG9tRmxlZXRQbGFjZW1lbnQoKSB7XG5cdFx0XHR0aGlzLnJhbmRvbVNoaXBQbGFjZW1lbnQoJ1BhdHJvbCBCb2F0Jyk7XG5cdFx0XHR0aGlzLnJhbmRvbVNoaXBQbGFjZW1lbnQoJ1N1Ym1hcmluZScpO1xuXHRcdFx0dGhpcy5yYW5kb21TaGlwUGxhY2VtZW50KCdEZXN0cm95ZXInKTtcblx0XHRcdHRoaXMucmFuZG9tU2hpcFBsYWNlbWVudCgnQmF0dGxlc2hpcCcpO1xuXHRcdFx0dGhpcy5yYW5kb21TaGlwUGxhY2VtZW50KCdDYXJyaWVyJyk7XG5cdFx0fSxcblxuXHRcdHJhbmRvbVNoaXBQbGFjZW1lbnQoc2hpcFR5cGUpIHtcblx0XHRcdGxldCBzaGlwQnVpbHQgPSBmYWxzZTtcblxuXHRcdFx0d2hpbGUgKCFzaGlwQnVpbHQpIHtcblx0XHRcdFx0bGV0IG9yaWVudGF0aW9uO1xuXHRcdFx0XHRjb25zdCBvcmllbnRhdGlvbk51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpICsgMTtcblx0XHRcdFx0Y29uc3QgeENvb3JkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcblx0XHRcdFx0Y29uc3QgeUNvb3JkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcblxuXHRcdFx0XHRpZiAob3JpZW50YXRpb25OdW1iZXIgPT09IDEpIHtcblx0XHRcdFx0XHRvcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRvcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRzaGlwQnVpbHQgPSB0aGlzLmFkZFNoaXAoeENvb3JkLCB5Q29vcmQsIG9yaWVudGF0aW9uLCBzaGlwVHlwZSk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdGdldFNxdWFyZSh4Q29vcmQsIHlDb29yZCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZ3JpZC5maW5kKFxuXHRcdFx0XHQoc3F1YXJlKSA9PiBzcXVhcmUueCA9PT0geENvb3JkICYmIHNxdWFyZS55ID09PSB5Q29vcmRcblx0XHRcdCk7XG5cdFx0fSxcblxuXHRcdHJlY2VpdmVBdHRhY2soeENvb3JkLCB5Q29vcmQpIHtcblx0XHRcdGNvbnN0IHNxdWFyZSA9IHRoaXMuZ3JpZC5maW5kKChzcSkgPT4gc3EueCA9PT0geENvb3JkICYmIHNxLnkgPT09IHlDb29yZCk7XG5cblx0XHRcdGlmIChzcXVhcmUuaGl0VGFrZW4pIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCFzcXVhcmUub2NjdXBpZWQgJiYgIXNxdWFyZS5oaXRUYWtlbikge1xuXHRcdFx0XHRzcXVhcmUuaGl0VGFrZW4gPSAnbWlzcyc7XG5cdFx0XHR9IGVsc2UgaWYgKHNxdWFyZS5vY2N1cGllZCAmJiAhc3F1YXJlLmhpdFRha2VuKSB7XG5cdFx0XHRcdHNxdWFyZS5oaXRUYWtlbiA9ICdkYW1hZ2UnO1xuXHRcdFx0XHRzcXVhcmUub2NjdXBpZWQudGFrZUhpdCgpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5jaGVja0ZsZWV0Q29uZGl0aW9uKCk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9LFxuXG5cdFx0Y2hlY2tGbGVldENvbmRpdGlvbigpIHtcblx0XHRcdGNvbnN0IGZsZWV0RGVwbG95ZWQgPSB0aGlzLmdyaWQuc29tZSgoc3F1YXJlKSA9PiBzcXVhcmUub2NjdXBpZWQpO1xuXHRcdFx0Y29uc3QgZmxlZXRBbGl2ZSA9IHRoaXMuZ3JpZC5zb21lKFxuXHRcdFx0XHQoc3F1YXJlKSA9PiBzcXVhcmUub2NjdXBpZWQgJiYgIXNxdWFyZS5oaXRUYWtlblxuXHRcdFx0KTtcblx0XHRcdGlmIChmbGVldERlcGxveWVkICYmICFmbGVldEFsaXZlKSB7XG5cdFx0XHRcdHRoaXMuZ2FtZUxvc3QgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH0sXG5cdH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmQnO1xuXG5mdW5jdGlvbiBQbGF5ZXIoKSB7XG5cdHJldHVybiB7XG5cdFx0Z2FtZWJvYXJkOiBHYW1lYm9hcmQoKSxcblx0XHRnYW1lV29uOiBmYWxzZSxcblxuXHRcdGF0dGFjayh4Q29vcmQsIHlDb29yZCwgZW5lbXlCb2FyZCkge1xuXHRcdFx0ZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHhDb29yZCwgeUNvb3JkKTtcblx0XHRcdGlmIChlbmVteUJvYXJkLmdhbWVMb3N0KSB7XG5cdFx0XHRcdHRoaXMuZ2FtZVdvbiA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHJhbmRvbUF0dGFjayhlbmVteUJvYXJkKSB7XG5cdFx0XHRsZXQgc2hvdEZpcmVkID0gZmFsc2U7XG5cblx0XHRcdHdoaWxlICghc2hvdEZpcmVkKSB7XG5cdFx0XHRcdGNvbnN0IHhDb29yZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG5cdFx0XHRcdGNvbnN0IHlDb29yZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG5cblx0XHRcdFx0c2hvdEZpcmVkID0gZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHhDb29yZCwgeUNvb3JkKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGVuZW15Qm9hcmQuZ2FtZUxvc3QpIHtcblx0XHRcdFx0dGhpcy5nYW1lV29uID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9LFxuXHR9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCJmdW5jdGlvbiBTaGlwKGxlbmd0aCkge1xuXHRyZXR1cm4ge1xuXHRcdGxlbmd0aCxcblx0XHRoaXRzVGFrZW46IDAsXG5cdFx0aXNTdW5rOiBmYWxzZSxcblxuXHRcdHRha2VIaXQoKSB7XG5cdFx0XHR0aGlzLmhpdHNUYWtlbiArPSAxO1xuXHRcdFx0dGhpcy5jaGVja0hQKCk7XG5cdFx0fSxcblxuXHRcdGNoZWNrSFAoKSB7XG5cdFx0XHRpZiAodGhpcy5oaXRzVGFrZW4gPj0gdGhpcy5sZW5ndGgpIHtcblx0XHRcdFx0dGhpcy5pc1N1bmsgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH0sXG5cdH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gJy4vZmFjdG9yaWVzL3BsYXllcic7XG5pbXBvcnQge1xuXHRzdGFydEJ0bixcblx0cmFuZG9tQnRuLFxuXHRwb3B1bGF0ZUJvYXJkSFRNTCxcblx0cmVzZXRHcmlkSFRNTCxcblx0YWRkRmxlZXREZXBsb3ltZW50TGlzdGVuZXIsXG59IGZyb20gJy4vRE9NJztcblxuLy8gSW5pdGlhbGl6ZSBwbGF5ZXJzXG5jb25zdCBwbGF5ZXIgPSBQbGF5ZXIoKTtcbmNvbnN0IGFpID0gUGxheWVyKCk7XG5cbi8vIEFJIHJhbmRvbSBmbGVldCBkZXBsb3ltZW50XG5haS5nYW1lYm9hcmQucmFuZG9tRmxlZXRQbGFjZW1lbnQoKTtcblxuLy8gUGxheWVyIHJhbmRvbSBmbGVldCBkZXBsb3ltZW50XG5yYW5kb21CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdHBsYXllci5nYW1lYm9hcmQuY2xlYXJHcmlkKCk7XG5cdHJlc2V0R3JpZEhUTUwoJ3BsYXllcicpO1xuXHRwbGF5ZXIuZ2FtZWJvYXJkLnJhbmRvbUZsZWV0UGxhY2VtZW50KCk7XG5cdHBvcHVsYXRlQm9hcmRIVE1MKCdwbGF5ZXInLCBwbGF5ZXIuZ2FtZWJvYXJkLmdyaWQpO1xufSk7XG5cbi8vIFBsYXllciBtYW51YWwgZmxlZXQgZGVwbG95bWVudFxubGV0IG9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xuXG5hZGRGbGVldERlcGxveW1lbnRMaXN0ZW5lcihvcmllbnRhdGlvbiwgcGxheWVyLmdhbWVib2FyZCk7XG5cbi8vIFRvZ2dsZSBzaGlwIG9yaWVudGF0aW9uXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB7XG5cdGlmIChlLmNvZGUgPT09ICdLZXlSJykge1xuXHRcdGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG5cdFx0XHRvcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCc7XG5cdFx0fSBlbHNlIGlmIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuXHRcdFx0b3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG5cdFx0fVxuXHRcdHJlc2V0R3JpZEhUTUwoJ3BsYXllcicpO1xuXHRcdHBvcHVsYXRlQm9hcmRIVE1MKCdwbGF5ZXInLCBwbGF5ZXIuZ2FtZWJvYXJkLmdyaWQpO1xuICAgICAgICBhZGRGbGVldERlcGxveW1lbnRMaXN0ZW5lcihvcmllbnRhdGlvbiwgcGxheWVyLmdhbWVib2FyZCk7XG5cdH1cbn0pO1xuXG4vLyBwbGF5ZXIuZ2FtZWJvYXJkLmFkZFNoaXAoMSwgMSwgJ2hvcml6b250YWwnLCAnQ2FycmllcicpO1xuLy8gcGxheWVyLmdhbWVib2FyZC5hZGRTaGlwKDMsIDIsICdob3Jpem9udGFsJywgJ1BhdHJvbCBCb2F0Jyk7XG4vLyBwbGF5ZXIuZ2FtZWJvYXJkLmFkZFNoaXAoNSwgNCwgJ2hvcml6b250YWwnLCAnU3VibWFyaW5lJyk7XG4vLyBwbGF5ZXIuZ2FtZWJvYXJkLmFkZFNoaXAoMiwgNiwgJ2hvcml6b250YWwnLCAnRGVzdHJveWVyJyk7XG4vLyBwbGF5ZXIuZ2FtZWJvYXJkLmFkZFNoaXAoNywgNiwgJ3ZlcnRpY2FsJywgJ0JhdHRsZXNoaXAnKTtcbiIsImNvbnN0IHNoaXBUeXBlcyA9IFtcblx0eyB0eXBlOiAnQ2FycmllcicsIGxlbmd0aDogNSwgY29sb3I6ICdyZ2IoMjUwLCAxMDgsIDU2KScgfSxcblx0eyB0eXBlOiAnQmF0dGxlc2hpcCcsIGxlbmd0aDogNCwgY29sb3I6ICdyZ2IoMjU1LCAxNTUsIDEzMyknIH0sXG5cdHsgdHlwZTogJ0Rlc3Ryb3llcicsIGxlbmd0aDogMywgY29sb3I6ICdyZ2IoMjQ2LCAyMTUsIDYwKScgfSxcblx0eyB0eXBlOiAnU3VibWFyaW5lJywgbGVuZ3RoOiAzLCBjb2xvcjogJ3JnYigwLCAxODQsIDE0NCknIH0sXG5cdHsgdHlwZTogJ1BhdHJvbCBCb2F0JywgbGVuZ3RoOiAyLCBjb2xvcjogJ3JnYig4MCwgMTgwLCAyMjYpJyB9LFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgc2hpcFR5cGVzOyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Um9ib3RvK01vbm86d2dodEA2MDAmZmFtaWx5PVVuYm91bmRlZDp3Z2h0QDgwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJib2R5IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzFmMjkzNztcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICB3aWR0aDogMTAwdnc7XFxuICBtaW4td2lkdGg6IDk1MHB4O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIG1pbi1oZWlnaHQ6IDY1MHB4O1xcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8gTW9ubycsIG1vbm9zcGFjZTsgfVxcblxcbi50aXRsZSB7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEzMHB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGZvbnQtZmFtaWx5OiAnVW5ib3VuZGVkJywgY3Vyc2l2ZTtcXG4gIGZvbnQtc2l6ZTogODBweDtcXG4gIG1hcmdpbi10b3A6IDMwcHg7IH1cXG5cXG4uZ2FtZS1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMTAwcHg7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBjb2xvcjogd2hpdGU7IH1cXG4gIC5nYW1lLWNvbnRhaW5lciAubGVmdCxcXG4gIC5nYW1lLWNvbnRhaW5lciAucmlnaHQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICB3aWR0aDogNTB2dztcXG4gICAgaGVpZ2h0OiA1MDBweDtcXG4gICAgbWFyZ2luLXRvcDogLTIlOyB9XFxuICAuZ2FtZS1jb250YWluZXIgLmxlZnQge1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGVuZDsgfVxcbiAgLmdhbWUtY29udGFpbmVyIC5yaWdodCB7XFxuICAgIGp1c3RpZnktY29udGVudDogc3RhcnQ7IH1cXG4gIC5nYW1lLWNvbnRhaW5lciAub3B0aW9ucyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBmbGV4LXNocmluazogMDtcXG4gICAgZ2FwOiAyMHB4O1xcbiAgICB3aWR0aDogMzgwcHg7XFxuICAgIGhlaWdodDogNTAwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgZm9udC1zaXplOiAzM3B4O1xcbiAgICBsaW5lLWhlaWdodDogNTJweDsgfVxcbiAgICAuZ2FtZS1jb250YWluZXIgLm9wdGlvbnMgLnJvdGF0ZS1pbnN0cnVjdGlvbiB7XFxuICAgICAgaGVpZ2h0OiAxMzVweDtcXG4gICAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgd2hpdGU7IH1cXG4gICAgLmdhbWUtY29udGFpbmVyIC5vcHRpb25zIC5yYW5kb20tZGVwbG95bWVudCB7XFxuICAgICAgZGlzcGxheTogZmxleDsgfVxcblxcbi5ib2FyZCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGZsZXgtc2hyaW5rOiAwO1xcbiAgd2lkdGg6IDQwMHB4O1xcbiAgaGVpZ2h0OiA0MDBweDtcXG4gIGJvcmRlcjogc29saWQgMXB4IHdoaXRlOyB9XFxuICAuYm9hcmQgLnJvdyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGZsZXgtZ3JvdzogMTsgfVxcblxcbi5zcXVhcmUge1xcbiAgZmxleC1ncm93OiAxO1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggd2hpdGU7IH1cXG5cXG4uZm9vdGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBoZWlnaHQ6IDcwcHg7XFxuICB3aWR0aDogMTAwdnc7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDE1cHg7XFxuICBjb2xvcjogI2M4YzhjODsgfVxcblxcbiNnaXRodWIge1xcbiAgaGVpZ2h0OiAyN3B4O1xcbiAgd2lkdGg6IDI3cHg7XFxuICBwYWRkaW5nLWJvdHRvbTogMC4ydmg7XFxuICB0cmFuc2l0aW9uOiAwLjNzOyB9XFxuXFxuI2dpdGh1Yjpob3ZlciB7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7IH1cXG5cXG4uYnV0dG9uIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIG1hcmdpbjogMjVweCAxMHB4IDAgMTBweDtcXG4gIHdpZHRoOiAxOTBweDtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMC44Myk7XFxuICBsaW5lLWhlaWdodDogMjFweDsgfVxcblxcbi5idXR0b24gYSB7XFxuICBjb2xvcjogd2hpdGU7XFxuICBmb250LWZhbWlseTogSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBmb250LXNpemU6IDI1cHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYjU1ZTRiO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBwYWRkaW5nOiAyMHB4IDQwcHg7XFxuICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XFxuICB0ZXh0LXNoYWRvdzogMHB4IDFweCAwcHggIzAwMDtcXG4gIGZpbHRlcjogZHJvcHNoYWRvdyhjb2xvcj0jMDAwLCBvZmZ4PTAgcHgsIG9mZnk9MSBweCk7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDAgI2ZmZTVjNCwgMCA4cHggMCAjNmUzZTAwO1xcbiAgLW1vei1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAwICNmZmU1YzQsIDAgOHB4IDAgIzZlM2UwMDtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDAgI2ZmZTVjNCwgMCA4cHggMCAjNmUzZTAwO1xcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHg7XFxuICAtbW96LWJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDsgfVxcblxcbi5idXR0b24gYTphY3RpdmUge1xcbiAgdG9wOiAxMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2I1NWU0YjtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAjZmZlNWM0LCBpbnNldCAwIC0zcHggMCAjOTE1MTAwO1xcbiAgLW1vei1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAwICNmZmU1YzQsIGluc2V0IDAgLTNweCAwICM5MTUxMDA7XFxuICBib3gtc2hhZG93OiBpbnNldCAwIDFweCAwICNmZmU1YzQsIGluc2V0IDAgLTNweCAwICM5MTUxMDA7IH1cXG5cXG4uYnV0dG9uLnN0YXJ0IGEsXFxuLmJ1dHRvbi5zdGFydCBhOmFjdGl2ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzMxMjEyOyB9XFxuXFxuLmJ1dHRvbjphZnRlciB7XFxuICBjb250ZW50OiAnJztcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgcGFkZGluZzogNHB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOiAtMTVweDtcXG4gIGxlZnQ6IC00cHg7XFxuICB6LWluZGV4OiAtMTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyYjE4MDA7XFxuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDVweDtcXG4gIC1tb3otYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogNXB4OyB9XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBRUE7RUFDQyxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHlCQUFpQztFQUNqQyxTQUFTO0VBQ1QsVUFBVTtFQUVWLFlBQVk7RUFDWixnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLGlCQUFpQjtFQUVqQixxQ0FBcUMsRUFBQTs7QUFHdEM7RUFDQyxZQUFZO0VBQ1osYUFBYTtFQUViLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWixpQ0FBaUM7RUFDakMsZUFBZTtFQUNmLGdCQUFnQixFQUFBOztBQUdqQjtFQUNDLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFVBQVU7RUFFVixZQUFZO0VBQ1osWUFBWTtFQUNaLFlBQVksRUFBQTtFQVJiOztJQVlFLGFBQWE7SUFDYixtQkFBbUI7SUFFbkIsV0FBVztJQUNYLGFBQWE7SUFDYixlQUFlLEVBQUE7RUFqQmpCO0lBcUJFLG9CQUFvQixFQUFBO0VBckJ0QjtJQXdCRSxzQkFBc0IsRUFBQTtFQXhCeEI7SUE0QkUsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsc0JBQXNCO0lBQ3RCLGNBQWM7SUFDZCxTQUFTO0lBRVQsWUFBWTtJQUNaLGFBQWE7SUFDYixrQkFBa0I7SUFDbEIsZUFBZTtJQUNmLGlCQUFpQixFQUFBO0lBdkNuQjtNQTBDRyxhQUFhO01BQ2IsOEJBQThCLEVBQUE7SUEzQ2pDO01BK0NHLGFBQWEsRUFBQTs7QUFLaEI7RUFDQyxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLGNBQWM7RUFFZCxZQUFZO0VBQ1osYUFBYTtFQUNiLHVCQUF1QixFQUFBO0VBUHhCO0lBVUUsYUFBYTtJQUNiLG1CQUFtQjtJQUNuQixZQUFZLEVBQUE7O0FBSWQ7RUFDQyxZQUFZO0VBQ1osdUJBQXVCLEVBQUE7O0FBR3hCO0VBQ0MsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsWUFBWTtFQUNaLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLGNBQXlCLEVBQUE7O0FBRzFCO0VBQ0MsWUFBWTtFQUNaLFdBQVc7RUFDWCxxQkFBcUI7RUFDckIsZ0JBQWdCLEVBQUE7O0FBR2pCO0VBQ0MscUJBQXFCLEVBQUE7O0FBS3RCO0VBQ0Msa0JBQWtCO0VBQ2xCLHFCQUFxQjtFQUNyQix3QkFBd0I7RUFFeEIsWUFBWTtFQUNaLHNCQUFxQjtFQUNyQixpQkFBaUIsRUFBQTs7QUFHbEI7RUFDQyxZQUFZO0VBQ1osa0NBQWtDO0VBQ2xDLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLHFCQUFxQjtFQUNyQix5QkFBa0M7RUFDbEMsY0FBYztFQUNkLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFFbEIsNkNBQTZDO0VBQzdDLDZCQUE2QjtFQUM3QixvREFBa0Q7RUFFbEQsMERBQTBEO0VBQzFELHVEQUF1RDtFQUN2RCxrREFBa0Q7RUFFbEQsMEJBQTBCO0VBQzFCLHVCQUF1QjtFQUN2QixrQkFBa0IsRUFBQTs7QUFHbkI7RUFDQyxTQUFTO0VBQ1QseUJBQWtDO0VBRWxDLGlFQUFpRTtFQUNqRSw4REFBOEQ7RUFDOUQseURBQXlELEVBQUE7O0FBRzFEOztFQUVDLHlCQUF5QixFQUFBOztBQUcxQjtFQUNDLFdBQVc7RUFDWCxZQUFZO0VBQ1osV0FBVztFQUNYLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLFVBQVU7RUFDVixXQUFXO0VBQ1gseUJBQXlCO0VBQ3pCLDBCQUEwQjtFQUMxQix1QkFBdUI7RUFDdkIsa0JBQWtCLEVBQUFcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Um9ib3RvK01vbm86d2dodEA2MDAmZmFtaWx5PVVuYm91bmRlZDp3Z2h0QDgwMCZkaXNwbGF5PXN3YXAnKTtcXG5cXG5ib2R5IHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogcmdiKDMxLCA0MSwgNTUpO1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcblxcblxcdHdpZHRoOiAxMDB2dztcXG5cXHRtaW4td2lkdGg6IDk1MHB4O1xcblxcdGhlaWdodDogMTAwdmg7XFxuXFx0bWluLWhlaWdodDogNjUwcHg7XFxuXFxuXFx0Zm9udC1mYW1pbHk6ICdSb2JvdG8gTW9ubycsIG1vbm9zcGFjZTtcXG59XFxuXFxuLnRpdGxlIHtcXG5cXHR3aWR0aDogMTAwdnc7XFxuXFx0aGVpZ2h0OiAxMzBweDtcXG5cXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0Y29sb3I6IHdoaXRlO1xcblxcdGZvbnQtZmFtaWx5OiAnVW5ib3VuZGVkJywgY3Vyc2l2ZTtcXG5cXHRmb250LXNpemU6IDgwcHg7XFxuXFx0bWFyZ2luLXRvcDogMzBweDtcXG59XFxuXFxuLmdhbWUtY29udGFpbmVyIHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0Z2FwOiAxMDBweDtcXG5cXG5cXHR3aWR0aDogMTAwdnc7XFxuXFx0aGVpZ2h0OiAxMDAlO1xcblxcdGNvbG9yOiB3aGl0ZTtcXG5cXG5cXHQubGVmdCxcXG5cXHQucmlnaHQge1xcblxcdFxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0XFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXG5cXHRcXHR3aWR0aDogNTB2dztcXG5cXHRcXHRoZWlnaHQ6IDUwMHB4O1xcblxcdFxcdG1hcmdpbi10b3A6IC0yJTtcXG5cXHR9XFxuXFxuXFx0LmxlZnQge1xcblxcdFxcdGp1c3RpZnktY29udGVudDogZW5kO1xcblxcdH1cXG5cXHQucmlnaHQge1xcblxcdFxcdGp1c3RpZnktY29udGVudDogc3RhcnQ7XFxuXFx0fVxcblxcblxcdC5vcHRpb25zIHtcXG5cXHRcXHRkaXNwbGF5OiBmbGV4O1xcblxcdFxcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xcblxcdFxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0XFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG5cXHRcXHRmbGV4LXNocmluazogMDtcXG5cXHRcXHRnYXA6IDIwcHg7XFxuXFxuXFx0XFx0d2lkdGg6IDM4MHB4O1xcblxcdFxcdGhlaWdodDogNTAwcHg7XFxuXFx0XFx0dGV4dC1hbGlnbjogY2VudGVyO1xcblxcdFxcdGZvbnQtc2l6ZTogMzNweDtcXG5cXHRcXHRsaW5lLWhlaWdodDogNTJweDtcXG5cXG5cXHRcXHQucm90YXRlLWluc3RydWN0aW9uIHtcXG5cXHRcXHRcXHRoZWlnaHQ6IDEzNXB4O1xcblxcdFxcdFxcdGJvcmRlci1ib3R0b206IDJweCBzb2xpZCB3aGl0ZTtcXG5cXHRcXHR9XFxuXFxuXFx0XFx0LnJhbmRvbS1kZXBsb3ltZW50IHtcXG5cXHRcXHRcXHRkaXNwbGF5OiBmbGV4O1xcblxcdFxcdH1cXG5cXHR9XFxufVxcblxcbi5ib2FyZCB7XFxuXFx0ZGlzcGxheTogZmxleDtcXG5cXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcblxcdGZsZXgtc2hyaW5rOiAwO1xcblxcblxcdHdpZHRoOiA0MDBweDtcXG5cXHRoZWlnaHQ6IDQwMHB4O1xcblxcdGJvcmRlcjogc29saWQgMXB4IHdoaXRlO1xcblxcblxcdC5yb3cge1xcblxcdFxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0XFx0ZmxleC1kaXJlY3Rpb246IHJvdztcXG5cXHRcXHRmbGV4LWdyb3c6IDE7XFxuXFx0fVxcbn1cXG5cXG4uc3F1YXJlIHtcXG5cXHRmbGV4LWdyb3c6IDE7XFxuXFx0Ym9yZGVyOiBzb2xpZCAxcHggd2hpdGU7XFxufVxcblxcbi5mb290ZXIge1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuXFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXHRoZWlnaHQ6IDcwcHg7XFxuXFx0d2lkdGg6IDEwMHZ3O1xcblxcdHRleHQtYWxpZ246IGNlbnRlcjtcXG5cXHRmb250LXNpemU6IDE1cHg7XFxuXFx0Y29sb3I6IHJnYigyMDAsIDIwMCwgMjAwKTtcXG59XFxuXFxuI2dpdGh1YiB7XFxuXFx0aGVpZ2h0OiAyN3B4O1xcblxcdHdpZHRoOiAyN3B4O1xcblxcdHBhZGRpbmctYm90dG9tOiAwLjJ2aDtcXG5cXHR0cmFuc2l0aW9uOiAwLjNzO1xcbn1cXG5cXG4jZ2l0aHViOmhvdmVyIHtcXG5cXHR0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XFxufVxcblxcbi8vIEJ1dHRvbiBmcm9tIGh0dHBzOi8vZGV2LnRvL3dlYmRlYXN5L3RvcC0yMC1jc3MtYnV0dG9ucy1hbmltYXRpb25zLWY0MVxcbi8vIGF1dGhvciBqZW13YXJlLiBBZGp1c3RlZCBhIGJpdCB0byBteSBvd24gbmVlZHMuXFxuLmJ1dHRvbiB7XFxuXFx0cG9zaXRpb246IHJlbGF0aXZlO1xcblxcdGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG5cXHRtYXJnaW46IDI1cHggMTBweCAwIDEwcHg7XFxuXFxuXFx0d2lkdGg6IDE5MHB4O1xcblxcdHRyYW5zZm9ybTogc2NhbGUoLjgzKTtcXG5cXHRsaW5lLWhlaWdodDogMjFweDtcXG59XFxuXFxuLmJ1dHRvbiBhIHtcXG5cXHRjb2xvcjogd2hpdGU7XFxuXFx0Zm9udC1mYW1pbHk6IEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXG5cXHRmb250LXdlaWdodDogYm9sZDtcXG5cXHRmb250LXNpemU6IDI1cHg7XFxuXFx0dGV4dC1hbGlnbjogY2VudGVyO1xcblxcdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTgxLCA5NCwgNzUpO1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcblxcdHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXHRwYWRkaW5nOiAyMHB4IDQwcHg7XFxuXFxuXFx0LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcblxcdHRleHQtc2hhZG93OiAwcHggMXB4IDBweCAjMDAwO1xcblxcdGZpbHRlcjogZHJvcHNoYWRvdyhjb2xvcj0jMDAwLCBvZmZ4PTBweCwgb2ZmeT0xcHgpO1xcblxcblxcdC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAjZmZlNWM0LCAwIDhweCAwICM2ZTNlMDA7XFxuXFx0LW1vei1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAwICNmZmU1YzQsIDAgOHB4IDAgIzZlM2UwMDtcXG5cXHRib3gtc2hhZG93OiBpbnNldCAwIDFweCAwICNmZmU1YzQsIDAgOHB4IDAgIzZlM2UwMDtcXG5cXG5cXHQtd2Via2l0LWJvcmRlci1yYWRpdXM6IDVweDtcXG5cXHQtbW96LWJvcmRlci1yYWRpdXM6IDVweDtcXG5cXHRib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcblxcbi5idXR0b24gYTphY3RpdmUge1xcblxcdHRvcDogMTBweDtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTgxLCA5NCwgNzUpO1xcblxcblxcdC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAjZmZlNWM0LCBpbnNldCAwIC0zcHggMCAjOTE1MTAwO1xcblxcdC1tb3otYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAjZmZlNWM0LCBpbnNldCAwIC0zcHggMCAjOTE1MTAwO1xcblxcdGJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDAgI2ZmZTVjNCwgaW5zZXQgMCAtM3B4IDAgIzkxNTEwMDtcXG59XFxuXFxuLmJ1dHRvbi5zdGFydCBhLFxcbi5idXR0b24uc3RhcnQgYTphY3RpdmUge1xcblxcdGJhY2tncm91bmQtY29sb3I6ICNjMzEyMTI7XFxufVxcblxcbi5idXR0b246YWZ0ZXIge1xcblxcdGNvbnRlbnQ6ICcnO1xcblxcdGhlaWdodDogMTAwJTtcXG5cXHR3aWR0aDogMTAwJTtcXG5cXHRwYWRkaW5nOiA0cHg7XFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcblxcdGJvdHRvbTogLTE1cHg7XFxuXFx0bGVmdDogLTRweDtcXG5cXHR6LWluZGV4OiAtMTtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiAjMmIxODAwO1xcblxcdC13ZWJraXQtYm9yZGVyLXJhZGl1czogNXB4O1xcblxcdC1tb3otYm9yZGVyLXJhZGl1czogNXB4O1xcblxcdGJvcmRlci1yYWRpdXM6IDVweDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vc3R5bGUuc2Nzcyc7XG5cblxuaW1wb3J0ICcuL21vZHVsZXMvRE9NJztcbmltcG9ydCAnLi9tb2R1bGVzL2dhbWVMb29wJ1xuXG5pbXBvcnQgJy4vbW9kdWxlcy9mYWN0b3JpZXMvc2hpcCc7XG5pbXBvcnQgJy4vbW9kdWxlcy9mYWN0b3JpZXMvZ2FtZWJvYXJkJztcbmltcG9ydCAnLi9tb2R1bGVzL2ZhY3Rvcmllcy9wbGF5ZXInO1xuXG4iXSwibmFtZXMiOlsic2hpcFR5cGVzIiwiZ2l0SWNvbiIsImdpdEltZyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInNyYyIsInN0YXJ0QnRuIiwicmFuZG9tQnRuIiwibGVmdCIsInJpZ2h0Iiwicm93IiwiY3JlYXRlRWxlbWVudCIsInNxdWFyZSIsInBsYXllckJvYXJkIiwiY2xhc3NMaXN0IiwiYWRkIiwiaSIsImFwcGVuZENoaWxkIiwiY2xvbmVOb2RlIiwibGFzdENoaWxkIiwic2V0QXR0cmlidXRlIiwiaiIsInRlbXBTcXVhcmUiLCJhaUJvYXJkIiwic3R5bGUiLCJkaXNwbGF5IiwiaGVscGVyQ2hvb3NlUGxheWVyR3JpZCIsInBsYXllciIsImdyaWRIVE1MIiwicG9wdWxhdGVCb2FyZEhUTUwiLCJncmlkT2JqZWN0Iiwic3F1YXJlSFRNTCIsImZvckVhY2giLCJzcXVhcmVPYmoiLCJjaGlsZE5vZGVzIiwicm93SFRNTCIsInNxIiwieCIsImdldEF0dHJpYnV0ZSIsInkiLCJvY2N1cGllZCIsInNoaXBUeXBlIiwiYmFja2dyb3VuZENvbG9yIiwicmVzZXRHcmlkSFRNTCIsInJlbW92ZUdyaWRMaXN0ZW5lcnMiLCJwbGF5ZXJCb2FyZENsb25lIiwiYWlCb2FyZENsb25lIiwicGFyZW50Tm9kZSIsInJlcGxhY2VDaGlsZCIsImFkZEZsZWV0RGVwbG95bWVudExpc3RlbmVyIiwib3JpZW50YXRpb24iLCJnYW1lYm9hcmRPYmoiLCJzcVgiLCJzcVkiLCJzaGlwVHlwZU9iaiIsInNoaXBMZW5ndGgiLCJncmlkIiwic29tZSIsImVsIiwidHlwZSIsImxlbmd0aCIsIm5vU3BhY2UiLCJjaGVja1NwYWNlRm9yU2hpcCIsImFkZEV2ZW50TGlzdGVuZXIiLCJydyIsInNxciIsImNvbG9yIiwiYWRkU2hpcCIsIlNoaXAiLCJHYW1lYm9hcmQiLCJjcmVhdGVHcmlkIiwiZ3JpZEFycmF5IiwicHVzaCIsImhpdFRha2VuIiwiZ2FtZUxvc3QiLCJjbGVhckdyaWQiLCJ4Q29vcmQiLCJ5Q29vcmQiLCJzdGFydFNxdWFyZSIsImdldFNxdWFyZSIsIm5ld1NoaXAiLCJyYW5kb21GbGVldFBsYWNlbWVudCIsInJhbmRvbVNoaXBQbGFjZW1lbnQiLCJzaGlwQnVpbHQiLCJvcmllbnRhdGlvbk51bWJlciIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImZpbmQiLCJyZWNlaXZlQXR0YWNrIiwidGFrZUhpdCIsImNoZWNrRmxlZXRDb25kaXRpb24iLCJmbGVldERlcGxveWVkIiwiZmxlZXRBbGl2ZSIsIlBsYXllciIsImdhbWVib2FyZCIsImdhbWVXb24iLCJhdHRhY2siLCJlbmVteUJvYXJkIiwicmFuZG9tQXR0YWNrIiwic2hvdEZpcmVkIiwiaGl0c1Rha2VuIiwiaXNTdW5rIiwiY2hlY2tIUCIsImFpIiwiZSIsImNvZGUiXSwic291cmNlUm9vdCI6IiJ9