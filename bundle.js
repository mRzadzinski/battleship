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
/* harmony export */   "addGameplayListeners": () => (/* binding */ addGameplayListeners),
/* harmony export */   "populateBoardHTML": () => (/* binding */ populateBoardHTML),
/* harmony export */   "randomBtn": () => (/* binding */ randomBtn),
/* harmony export */   "resetGridHTML": () => (/* binding */ resetGridHTML),
/* harmony export */   "startBtn": () => (/* binding */ startBtn)
/* harmony export */ });
/* harmony import */ var _shipTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipTypes */ "./src/modules/shipTypes.js");
/* harmony import */ var _img_github_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../img/github.png */ "./src/img/github.png");
/* eslint-disable prefer-destructuring */


var gameContainer = document.querySelector('.game-container');
var gitImg = document.querySelector('#github');
var startBtn = document.querySelector('.start');
var randomBtn = document.querySelector('.random');
var left = document.querySelector('.left');
var right = document.querySelector('.right');
var options = document.querySelector('.options');
var row = document.createElement('div');
var square = document.createElement('div');
var playerBoard = document.createElement('div');
gameContainer.classList.add('shrink');
gitImg.src = _img_github_png__WEBPACK_IMPORTED_MODULE_1__;
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
    if (!squareObj.occupied && !squareObj.hitTaken) {
      squareHTML.style.backgroundColor = 'rgb(31, 41, 55)';
    } else if (squareObj.occupied && !squareObj.hitTaken && player !== 'ai') {
      if (squareObj.shipType === _shipTypes__WEBPACK_IMPORTED_MODULE_0__["default"][4].type) {
        squareHTML.style.backgroundColor = _shipTypes__WEBPACK_IMPORTED_MODULE_0__["default"][4].color;
      } else if (squareObj.shipType === _shipTypes__WEBPACK_IMPORTED_MODULE_0__["default"][3].type) {
        squareHTML.style.backgroundColor = _shipTypes__WEBPACK_IMPORTED_MODULE_0__["default"][3].color;
      } else if (squareObj.shipType === _shipTypes__WEBPACK_IMPORTED_MODULE_0__["default"][2].type) {
        squareHTML.style.backgroundColor = _shipTypes__WEBPACK_IMPORTED_MODULE_0__["default"][2].color;
      } else if (squareObj.shipType === _shipTypes__WEBPACK_IMPORTED_MODULE_0__["default"][1].type) {
        squareHTML.style.backgroundColor = _shipTypes__WEBPACK_IMPORTED_MODULE_0__["default"][1].color;
      } else if (squareObj.shipType === _shipTypes__WEBPACK_IMPORTED_MODULE_0__["default"][0].type) {
        squareHTML.style.backgroundColor = _shipTypes__WEBPACK_IMPORTED_MODULE_0__["default"][0].color;
      }
    } else if (!squareObj.occupied && squareObj.hitTaken) {
      squareHTML.style.backgroundColor = 'rgb(88, 88, 88)';
    } else if (squareObj.occupied && squareObj.hitTaken) {
      squareHTML.style.backgroundColor = 'rgb(98, 0, 0)';
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
function addGameplayListeners(aiObject, playerObject) {
  aiBoard.childNodes.forEach(function (rowHTML) {
    rowHTML.childNodes.forEach(function (sq) {
      var sqX = +sq.getAttribute('data-x');
      var sqY = +sq.getAttribute('data-y');
      sq.addEventListener('click', function () {
        var attack = aiObject.gameboard.receiveAttack(sqX, sqY);
        if (attack && !playerObject.gameWon) {
          aiObject.randomAttack(playerObject.gameboard);
        }
        populateBoardHTML('player', playerObject.gameboard.grid);
        populateBoardHTML('ai', aiObject.gameboard.grid);
        if (aiObject.gameboard.gameLost) {
          removeGridListeners();
          console.log('you won');
        } else if (playerObject.gameboard.gameLost) {
          removeGridListeners();
          console.log('you loose');
        }
      });
    });
  });
}
startBtn.onclick = function () {
  aiBoard.style.display = 'flex';
  options.style.display = 'none';
  removeGridListeners();
};


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
        square.hitTaken = true;
      } else if (square.occupied && !square.hitTaken) {
        square.hitTaken = true;
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

// ai.gameboard.grid[0].occupied = true;
// ai.gameboard.grid[0].hitTaken = true;

// ai.gameboard.grid[10].occupied = false;
// ai.gameboard.grid[10].hitTaken = true;

// ai.gameboard.grid[2].occupied = true;
// ai.gameboard.grid[2].hitTaken = false;

// ai.gameboard.grid[3].occupied = false;
// ai.gameboard.grid[3].hitTaken = false;

(0,_DOM__WEBPACK_IMPORTED_MODULE_1__.populateBoardHTML)('ai', ai.gameboard.grid);
console.log(ai.gameboard.grid);

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
_DOM__WEBPACK_IMPORTED_MODULE_1__.startBtn.addEventListener('click', function () {
  // Check if fleet is deployed
  var fleetDeployed = [];
  player.gameboard.grid.forEach(function (sq) {
    if (sq.occupied) fleetDeployed.push(true);
  });
  // If not, deploy randomly
  if (fleetDeployed.length !== 17) {
    _DOM__WEBPACK_IMPORTED_MODULE_1__.randomBtn.click();
  }
  (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.addGameplayListeners)(ai, player);
});
_DOM__WEBPACK_IMPORTED_MODULE_1__.startBtn.click();

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
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  display: flex;\n  flex-direction: column;\n  background-color: #1f2937;\n  margin: 0;\n  padding: 0;\n  width: 100vw;\n  min-width: 950px;\n  height: 100vh;\n  min-height: 650px;\n  font-family: 'Roboto Mono', monospace; }\n\n.title {\n  width: 100vw;\n  height: 130px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: white;\n  font-family: 'Unbounded', cursive;\n  font-size: 80px;\n  margin-top: 30px; }\n\n.score {\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  width: 100%;\n  top: 25%;\n  z-index: 1;\n  color: white;\n  text-align: center;\n  font-size: 45px; }\n\n.game-container.shrink {\n  transform: scale(0.6); }\n\n.game-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 100px;\n  width: 100vw;\n  height: 100%;\n  color: white; }\n  .game-container .left,\n  .game-container .right {\n    display: flex;\n    align-items: center;\n    width: 50vw;\n    height: 500px;\n    margin-top: -2%; }\n  .game-container .left {\n    justify-content: end; }\n  .game-container .right {\n    justify-content: start; }\n  .game-container .options {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    flex-shrink: 0;\n    gap: 20px;\n    width: 380px;\n    height: 500px;\n    text-align: center;\n    font-size: 33px;\n    line-height: 52px; }\n    .game-container .options .rotate-instruction {\n      height: 135px;\n      border-bottom: 2px solid white; }\n    .game-container .options .random-deployment {\n      display: flex; }\n\n.board {\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 0;\n  width: 400px;\n  height: 400px;\n  border: solid 1px white; }\n  .board .row {\n    display: flex;\n    flex-direction: row;\n    flex-grow: 1; }\n\n.square {\n  flex-grow: 1;\n  border: solid 1px white; }\n\n.footer {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 70px;\n  width: 100vw;\n  text-align: center;\n  font-size: 15px;\n  color: #c8c8c8; }\n\n#github {\n  height: 27px;\n  width: 27px;\n  padding-bottom: 0.2vh;\n  transition: 0.3s; }\n\n#github:hover {\n  transform: scale(1.1); }\n\n.button {\n  position: relative;\n  display: inline-block;\n  margin: 25px 10px 0 10px;\n  width: 190px;\n  transform: scale(0.83);\n  line-height: 21px; }\n\n.button a {\n  color: white;\n  font-family: Helvetica, sans-serif;\n  font-weight: bold;\n  font-size: 25px;\n  text-align: center;\n  text-decoration: none;\n  background-color: #b55e4b;\n  display: block;\n  position: relative;\n  padding: 20px 40px;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  text-shadow: 0px 1px 0px #000;\n  filter: dropshadow(color=#000, offx=0 px, offy=1 px);\n  -webkit-box-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n  -moz-box-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n  box-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  border-radius: 5px; }\n\n.button a:active {\n  top: 10px;\n  background-color: #b55e4b;\n  -webkit-box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100;\n  -moz-box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100;\n  box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100; }\n\n.button.start a,\n.button.start a:active {\n  background-color: #c31212; }\n\n.button:after {\n  content: '';\n  height: 100%;\n  width: 100%;\n  padding: 4px;\n  position: absolute;\n  bottom: -15px;\n  left: -4px;\n  z-index: -1;\n  background-color: #2b1800;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  border-radius: 5px; }\n", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"AAEA;EACC,aAAa;EACb,sBAAsB;EACtB,yBAAiC;EACjC,SAAS;EACT,UAAU;EAEV,YAAY;EACZ,gBAAgB;EAChB,aAAa;EACb,iBAAiB;EAEjB,qCAAqC,EAAA;;AAGtC;EACC,YAAY;EACZ,aAAa;EAEb,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,iCAAiC;EACjC,eAAe;EACf,gBAAgB,EAAA;;AAGjB;EACC,kBAAkB;EAClB,aAAa;EACb,uBAAuB;EAEvB,WAAW;EACX,QAAQ;EACR,UAAU;EAEV,YAAY;EACZ,kBAAkB;EAClB,eAAe,EAAA;;AAGhB;EACC,qBAAoB,EAAA;;AAGrB;EACC,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,UAAU;EAEV,YAAY;EACZ,YAAY;EACZ,YAAY,EAAA;EARb;;IAaE,aAAa;IACb,mBAAmB;IAEnB,WAAW;IACX,aAAa;IACb,eAAe,EAAA;EAlBjB;IAsBE,oBAAoB,EAAA;EAtBtB;IAyBE,sBAAsB,EAAA;EAzBxB;IA6BE,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,sBAAsB;IACtB,cAAc;IACd,SAAS;IAET,YAAY;IACZ,aAAa;IACb,kBAAkB;IAClB,eAAe;IACf,iBAAiB,EAAA;IAxCnB;MA2CG,aAAa;MACb,8BAA8B,EAAA;IA5CjC;MAgDG,aAAa,EAAA;;AAKhB;EACC,aAAa;EACb,sBAAsB;EACtB,cAAc;EAEd,YAAY;EACZ,aAAa;EACb,uBAAuB,EAAA;EAPxB;IAUE,aAAa;IACb,mBAAmB;IACnB,YAAY,EAAA;;AAId;EACC,YAAY;EACZ,uBAAuB,EAAA;;AAGxB;EACC,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf,cAAyB,EAAA;;AAG1B;EACC,YAAY;EACZ,WAAW;EACX,qBAAqB;EACrB,gBAAgB,EAAA;;AAGjB;EACC,qBAAqB,EAAA;;AAKtB;EACC,kBAAkB;EAClB,qBAAqB;EACrB,wBAAwB;EAExB,YAAY;EACZ,sBAAqB;EACrB,iBAAiB,EAAA;;AAGlB;EACC,YAAY;EACZ,kCAAkC;EAClC,iBAAiB;EACjB,eAAe;EACf,kBAAkB;EAClB,qBAAqB;EACrB,yBAAkC;EAClC,cAAc;EACd,kBAAkB;EAClB,kBAAkB;EAElB,6CAA6C;EAC7C,6BAA6B;EAC7B,oDAAkD;EAElD,0DAA0D;EAC1D,uDAAuD;EACvD,kDAAkD;EAElD,0BAA0B;EAC1B,uBAAuB;EACvB,kBAAkB,EAAA;;AAGnB;EACC,SAAS;EACT,yBAAkC;EAElC,iEAAiE;EACjE,8DAA8D;EAC9D,yDAAyD,EAAA;;AAG1D;;EAEC,yBAAyB,EAAA;;AAG1B;EACC,WAAW;EACX,YAAY;EACZ,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,aAAa;EACb,UAAU;EACV,WAAW;EACX,yBAAyB;EACzB,0BAA0B;EAC1B,uBAAuB;EACvB,kBAAkB,EAAA","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@600&family=Unbounded:wght@800&display=swap');\n\nbody {\n\tdisplay: flex;\n\tflex-direction: column;\n\tbackground-color: rgb(31, 41, 55);\n\tmargin: 0;\n\tpadding: 0;\n\n\twidth: 100vw;\n\tmin-width: 950px;\n\theight: 100vh;\n\tmin-height: 650px;\n\n\tfont-family: 'Roboto Mono', monospace;\n}\n\n.title {\n\twidth: 100vw;\n\theight: 130px;\n\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tcolor: white;\n\tfont-family: 'Unbounded', cursive;\n\tfont-size: 80px;\n\tmargin-top: 30px;\n}\n\n.score {\n\tposition: absolute;\n\tdisplay: flex;\n\tjustify-content: center;\n\n\twidth: 100%;\n\ttop: 25%;\n\tz-index: 1;\n\n\tcolor: white;\n\ttext-align: center;\n\tfont-size: 45px;\n}\n\n.game-container.shrink {\n\ttransform: scale(.6);\n}\n\n.game-container {\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tgap: 100px;\n\n\twidth: 100vw;\n\theight: 100%;\n\tcolor: white;\n\n\n\t.left,\n\t.right {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\n\t\twidth: 50vw;\n\t\theight: 500px;\n\t\tmargin-top: -2%;\n\t}\n\n\t.left {\n\t\tjustify-content: end;\n\t}\n\t.right {\n\t\tjustify-content: start;\n\t}\n\n\t.options {\n\t\tdisplay: flex;\n\t\tjustify-content: center;\n\t\talign-items: center;\n\t\tflex-direction: column;\n\t\tflex-shrink: 0;\n\t\tgap: 20px;\n\n\t\twidth: 380px;\n\t\theight: 500px;\n\t\ttext-align: center;\n\t\tfont-size: 33px;\n\t\tline-height: 52px;\n\n\t\t.rotate-instruction {\n\t\t\theight: 135px;\n\t\t\tborder-bottom: 2px solid white;\n\t\t}\n\n\t\t.random-deployment {\n\t\t\tdisplay: flex;\n\t\t}\n\t}\n}\n\n.board {\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex-shrink: 0;\n\n\twidth: 400px;\n\theight: 400px;\n\tborder: solid 1px white;\n\n\t.row {\n\t\tdisplay: flex;\n\t\tflex-direction: row;\n\t\tflex-grow: 1;\n\t}\n}\n\n.square {\n\tflex-grow: 1;\n\tborder: solid 1px white;\n}\n\n.footer {\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\theight: 70px;\n\twidth: 100vw;\n\ttext-align: center;\n\tfont-size: 15px;\n\tcolor: rgb(200, 200, 200);\n}\n\n#github {\n\theight: 27px;\n\twidth: 27px;\n\tpadding-bottom: 0.2vh;\n\ttransition: 0.3s;\n}\n\n#github:hover {\n\ttransform: scale(1.1);\n}\n\n// Button from https://dev.to/webdeasy/top-20-css-buttons-animations-f41\n// author jemware. Adjusted a bit to my own needs.\n.button {\n\tposition: relative;\n\tdisplay: inline-block;\n\tmargin: 25px 10px 0 10px;\n\n\twidth: 190px;\n\ttransform: scale(.83);\n\tline-height: 21px;\n}\n\n.button a {\n\tcolor: white;\n\tfont-family: Helvetica, sans-serif;\n\tfont-weight: bold;\n\tfont-size: 25px;\n\ttext-align: center;\n\ttext-decoration: none;\n\tbackground-color: rgb(181, 94, 75);\n\tdisplay: block;\n\tposition: relative;\n\tpadding: 20px 40px;\n\n\t-webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n\ttext-shadow: 0px 1px 0px #000;\n\tfilter: dropshadow(color=#000, offx=0px, offy=1px);\n\n\t-webkit-box-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n\t-moz-box-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n\tbox-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n\n\t-webkit-border-radius: 5px;\n\t-moz-border-radius: 5px;\n\tborder-radius: 5px;\n}\n\n.button a:active {\n\ttop: 10px;\n\tbackground-color: rgb(181, 94, 75);\n\n\t-webkit-box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100;\n\t-moz-box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100;\n\tbox-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100;\n}\n\n.button.start a,\n.button.start a:active {\n\tbackground-color: #c31212;\n}\n\n.button:after {\n\tcontent: '';\n\theight: 100%;\n\twidth: 100%;\n\tpadding: 4px;\n\tposition: absolute;\n\tbottom: -15px;\n\tleft: -4px;\n\tz-index: -1;\n\tbackground-color: #2b1800;\n\t-webkit-border-radius: 5px;\n\t-moz-border-radius: 5px;\n\tborder-radius: 5px;\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NmQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBc0I7QUFHQztBQUNJO0FBRU87QUFDSyIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9ET00uanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL2ZhY3Rvcmllcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL2ZhY3Rvcmllcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL2ZhY3Rvcmllcy9zaGlwLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9nYW1lTG9vcC5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vc3JjL21vZHVsZXMvc2hpcFR5cGVzLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9zcmMvc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL3NyYy9zdHlsZS5zY3NzPzc1YmEiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vc3JjL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItZGVzdHJ1Y3R1cmluZyAqL1xuaW1wb3J0IHNoaXBUeXBlcyBmcm9tICcuL3NoaXBUeXBlcyc7XG5pbXBvcnQgZ2l0SWNvbiBmcm9tICcuLi9pbWcvZ2l0aHViLnBuZyc7XG5cbmNvbnN0IGdhbWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1jb250YWluZXInKTtcbmNvbnN0IGdpdEltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnaXRodWInKTtcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0Jyk7XG5jb25zdCByYW5kb21CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmFuZG9tJyk7XG5jb25zdCBsZWZ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxlZnQnKTtcbmNvbnN0IHJpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJpZ2h0Jyk7XG5jb25zdCBvcHRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9wdGlvbnMnKTtcbmNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5sZXQgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuZ2FtZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzaHJpbmsnKTtcblxuZ2l0SW1nLnNyYyA9IGdpdEljb247XG5cbnBsYXllckJvYXJkLmNsYXNzTGlzdC5hZGQoJ2JvYXJkJyk7XG5yb3cuY2xhc3NMaXN0LmFkZCgncm93Jyk7XG5zcXVhcmUuY2xhc3NMaXN0LmFkZCgnc3F1YXJlJyk7XG5cbi8vIENyZWF0ZSBncmlkXG5mb3IgKGxldCBpID0gMTsgaSA8IDExOyBpKyspIHtcblx0cGxheWVyQm9hcmQuYXBwZW5kQ2hpbGQocm93LmNsb25lTm9kZSgpKTtcblxuXHRmb3IgKGxldCBqID0gMTsgaiA8IDExOyBqKyspIHtcblx0XHRjb25zdCB0ZW1wU3F1YXJlID0gc3F1YXJlLmNsb25lTm9kZSgpO1xuXHRcdHRlbXBTcXVhcmUuc2V0QXR0cmlidXRlKCdkYXRhLXgnLCBqKTtcblx0XHR0ZW1wU3F1YXJlLnNldEF0dHJpYnV0ZSgnZGF0YS15JywgaSk7XG5cblx0XHRwbGF5ZXJCb2FyZC5sYXN0Q2hpbGQuYXBwZW5kQ2hpbGQodGVtcFNxdWFyZSk7XG5cdH1cbn1cblxubGV0IGFpQm9hcmQgPSBwbGF5ZXJCb2FyZC5jbG9uZU5vZGUodHJ1ZSk7XG5wbGF5ZXJCb2FyZC5jbGFzc0xpc3QuYWRkKCdwbGF5ZXItYm9hcmQnKTtcbmFpQm9hcmQuY2xhc3NMaXN0LmFkZCgnYWktYm9hcmQnKTtcbmFpQm9hcmQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxubGVmdC5hcHBlbmRDaGlsZChwbGF5ZXJCb2FyZCk7XG5yaWdodC5hcHBlbmRDaGlsZChhaUJvYXJkKTtcblxuZnVuY3Rpb24gaGVscGVyQ2hvb3NlUGxheWVyR3JpZChwbGF5ZXIpIHtcblx0bGV0IGdyaWRIVE1MO1xuXG5cdGlmIChwbGF5ZXIgPT09ICdwbGF5ZXInKSB7XG5cdFx0Z3JpZEhUTUwgPSBwbGF5ZXJCb2FyZDtcblx0fSBlbHNlIGlmIChwbGF5ZXIgPT09ICdhaScpIHtcblx0XHRncmlkSFRNTCA9IGFpQm9hcmQ7XG5cdH1cblx0cmV0dXJuIGdyaWRIVE1MO1xufVxuXG5mdW5jdGlvbiBwb3B1bGF0ZUJvYXJkSFRNTChwbGF5ZXIsIGdyaWRPYmplY3QpIHtcblx0Y29uc3QgZ3JpZEhUTUwgPSBoZWxwZXJDaG9vc2VQbGF5ZXJHcmlkKHBsYXllcik7XG5cdGxldCBzcXVhcmVIVE1MO1xuXG5cdC8vIEZpbmQgSFRNTCBlcXVpdmFsZW50IG9mIHNxdWFyZSBvYmplY3QgYnkgY29vcmRpbmF0ZXNcblx0Z3JpZE9iamVjdC5mb3JFYWNoKChzcXVhcmVPYmopID0+IHtcblx0XHRncmlkSFRNTC5jaGlsZE5vZGVzLmZvckVhY2goKHJvd0hUTUwpID0+IHtcblx0XHRcdHJvd0hUTUwuY2hpbGROb2Rlcy5mb3JFYWNoKChzcSkgPT4ge1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0c3F1YXJlT2JqLnggPT09ICtzcS5nZXRBdHRyaWJ1dGUoJ2RhdGEteCcpICYmXG5cdFx0XHRcdFx0c3F1YXJlT2JqLnkgPT09ICtzcS5nZXRBdHRyaWJ1dGUoJ2RhdGEteScpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHNxdWFyZUhUTUwgPSBzcTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHRpZiAoIXNxdWFyZU9iai5vY2N1cGllZCAmJiAhc3F1YXJlT2JqLmhpdFRha2VuKSB7XG5cdFx0XHRzcXVhcmVIVE1MLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2IoMzEsIDQxLCA1NSknO1xuXHRcdH0gZWxzZSBpZiAoc3F1YXJlT2JqLm9jY3VwaWVkICYmICFzcXVhcmVPYmouaGl0VGFrZW4gJiYgcGxheWVyICE9PSAnYWknKSB7XG5cdFx0XHRpZiAoc3F1YXJlT2JqLnNoaXBUeXBlID09PSBzaGlwVHlwZXNbNF0udHlwZSkge1xuXHRcdFx0XHRzcXVhcmVIVE1MLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHNoaXBUeXBlc1s0XS5jb2xvcjtcblx0XHRcdH0gZWxzZSBpZiAoc3F1YXJlT2JqLnNoaXBUeXBlID09PSBzaGlwVHlwZXNbM10udHlwZSkge1xuXHRcdFx0XHRzcXVhcmVIVE1MLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHNoaXBUeXBlc1szXS5jb2xvcjtcblx0XHRcdH0gZWxzZSBpZiAoc3F1YXJlT2JqLnNoaXBUeXBlID09PSBzaGlwVHlwZXNbMl0udHlwZSkge1xuXHRcdFx0XHRzcXVhcmVIVE1MLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHNoaXBUeXBlc1syXS5jb2xvcjtcblx0XHRcdH0gZWxzZSBpZiAoc3F1YXJlT2JqLnNoaXBUeXBlID09PSBzaGlwVHlwZXNbMV0udHlwZSkge1xuXHRcdFx0XHRzcXVhcmVIVE1MLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHNoaXBUeXBlc1sxXS5jb2xvcjtcblx0XHRcdH0gZWxzZSBpZiAoc3F1YXJlT2JqLnNoaXBUeXBlID09PSBzaGlwVHlwZXNbMF0udHlwZSkge1xuXHRcdFx0XHRzcXVhcmVIVE1MLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHNoaXBUeXBlc1swXS5jb2xvcjtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKCFzcXVhcmVPYmoub2NjdXBpZWQgJiYgc3F1YXJlT2JqLmhpdFRha2VuKSB7XG5cdFx0XHRzcXVhcmVIVE1MLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2IoODgsIDg4LCA4OCknO1xuXHRcdH0gZWxzZSBpZiAoc3F1YXJlT2JqLm9jY3VwaWVkICYmIHNxdWFyZU9iai5oaXRUYWtlbikge1xuXHRcdFx0c3F1YXJlSFRNTC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDk4LCAwLCAwKSc7XG5cdFx0fVxuXHR9KTtcbn1cblxuZnVuY3Rpb24gcmVzZXRHcmlkSFRNTChwbGF5ZXIpIHtcblx0Y29uc3QgZ3JpZEhUTUwgPSBoZWxwZXJDaG9vc2VQbGF5ZXJHcmlkKHBsYXllcik7XG5cblx0Z3JpZEhUTUwuY2hpbGROb2Rlcy5mb3JFYWNoKChyb3dIVE1MKSA9PiB7XG5cdFx0cm93SFRNTC5jaGlsZE5vZGVzLmZvckVhY2goKHNxKSA9PiB7XG5cdFx0XHRzcS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDMxLCA0MSwgNTUpJztcblx0XHR9KTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUdyaWRMaXN0ZW5lcnMoKSB7XG5cdGNvbnN0IHBsYXllckJvYXJkQ2xvbmUgPSBwbGF5ZXJCb2FyZC5jbG9uZU5vZGUodHJ1ZSk7XG5cdGNvbnN0IGFpQm9hcmRDbG9uZSA9IGFpQm9hcmQuY2xvbmVOb2RlKHRydWUpO1xuXG5cdHBsYXllckJvYXJkLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHBsYXllckJvYXJkQ2xvbmUsIHBsYXllckJvYXJkKTtcblx0YWlCb2FyZC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChhaUJvYXJkQ2xvbmUsIGFpQm9hcmQpO1xuXG5cdHBsYXllckJvYXJkID0gcGxheWVyQm9hcmRDbG9uZTtcblx0YWlCb2FyZCA9IGFpQm9hcmRDbG9uZTtcbn1cblxuZnVuY3Rpb24gYWRkRmxlZXREZXBsb3ltZW50TGlzdGVuZXIob3JpZW50YXRpb24sIGdhbWVib2FyZE9iaikge1xuXHRyZW1vdmVHcmlkTGlzdGVuZXJzKCk7XG5cblx0cGxheWVyQm9hcmQuY2hpbGROb2Rlcy5mb3JFYWNoKChyb3dIVE1MKSA9PiB7XG5cdFx0cm93SFRNTC5jaGlsZE5vZGVzLmZvckVhY2goKHNxKSA9PiB7XG5cdFx0XHRjb25zdCBzcVggPSArc3EuZ2V0QXR0cmlidXRlKCdkYXRhLXgnKTtcblx0XHRcdGNvbnN0IHNxWSA9ICtzcS5nZXRBdHRyaWJ1dGUoJ2RhdGEteScpO1xuXHRcdFx0bGV0IHNoaXBUeXBlT2JqO1xuXHRcdFx0bGV0IHNoaXBMZW5ndGg7XG5cblx0XHRcdC8vIENoZWNrIGlmIHBhcnRpY3VsYXIgc2hpcCB0eXBlIGhhcyBiZWVuIGFscmVhZHkgZGVwbG95ZWRcblx0XHRcdGlmICghZ2FtZWJvYXJkT2JqLmdyaWQuc29tZSgoZWwpID0+IGVsLnNoaXBUeXBlID09PSBzaGlwVHlwZXNbMF0udHlwZSkpIHtcblx0XHRcdFx0c2hpcExlbmd0aCA9IHNoaXBUeXBlc1swXS5sZW5ndGg7XG5cdFx0XHRcdHNoaXBUeXBlT2JqID0gc2hpcFR5cGVzWzBdO1xuXHRcdFx0fSBlbHNlIGlmIChcblx0XHRcdFx0IWdhbWVib2FyZE9iai5ncmlkLnNvbWUoKGVsKSA9PiBlbC5zaGlwVHlwZSA9PT0gc2hpcFR5cGVzWzFdLnR5cGUpXG5cdFx0XHQpIHtcblx0XHRcdFx0c2hpcExlbmd0aCA9IHNoaXBUeXBlc1sxXS5sZW5ndGg7XG5cdFx0XHRcdHNoaXBUeXBlT2JqID0gc2hpcFR5cGVzWzFdO1xuXHRcdFx0fSBlbHNlIGlmIChcblx0XHRcdFx0IWdhbWVib2FyZE9iai5ncmlkLnNvbWUoKGVsKSA9PiBlbC5zaGlwVHlwZSA9PT0gc2hpcFR5cGVzWzJdLnR5cGUpXG5cdFx0XHQpIHtcblx0XHRcdFx0c2hpcExlbmd0aCA9IHNoaXBUeXBlc1syXS5sZW5ndGg7XG5cdFx0XHRcdHNoaXBUeXBlT2JqID0gc2hpcFR5cGVzWzJdO1xuXHRcdFx0fSBlbHNlIGlmIChcblx0XHRcdFx0IWdhbWVib2FyZE9iai5ncmlkLnNvbWUoKGVsKSA9PiBlbC5zaGlwVHlwZSA9PT0gc2hpcFR5cGVzWzNdLnR5cGUpXG5cdFx0XHQpIHtcblx0XHRcdFx0c2hpcExlbmd0aCA9IHNoaXBUeXBlc1szXS5sZW5ndGg7XG5cdFx0XHRcdHNoaXBUeXBlT2JqID0gc2hpcFR5cGVzWzNdO1xuXHRcdFx0fSBlbHNlIGlmIChcblx0XHRcdFx0IWdhbWVib2FyZE9iai5ncmlkLnNvbWUoKGVsKSA9PiBlbC5zaGlwVHlwZSA9PT0gc2hpcFR5cGVzWzRdLnR5cGUpXG5cdFx0XHQpIHtcblx0XHRcdFx0c2hpcExlbmd0aCA9IHNoaXBUeXBlc1s0XS5sZW5ndGg7XG5cdFx0XHRcdHNoaXBUeXBlT2JqID0gc2hpcFR5cGVzWzRdO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDaGVjayBpZiBzaGlwIGNhbiBiZSBidWlsdFxuXHRcdFx0Y29uc3Qgbm9TcGFjZSA9IGdhbWVib2FyZE9iai5jaGVja1NwYWNlRm9yU2hpcChcblx0XHRcdFx0c3FYLFxuXHRcdFx0XHRzcVksXG5cdFx0XHRcdHNoaXBMZW5ndGgsXG5cdFx0XHRcdG9yaWVudGF0aW9uXG5cdFx0XHQpO1xuXG5cdFx0XHQvLyBTaG93IG9uIGdyaWQgaWYgc2hpcCBjYW4gYmUgYWRkZWRcblx0XHRcdHNxLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcblx0XHRcdFx0aWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcblx0XHRcdFx0XHRmb3IgKGxldCBpID0gc3FYOyBpIDwgc3FYICsgc2hpcExlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRpZiAoaSA+IDEwKSBicmVhaztcblxuXHRcdFx0XHRcdFx0cGxheWVyQm9hcmQuY2hpbGROb2Rlcy5mb3JFYWNoKChydykgPT4ge1xuXHRcdFx0XHRcdFx0XHRydy5jaGlsZE5vZGVzLmZvckVhY2goKHNxcikgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0XHRcdCtzcXIuZ2V0QXR0cmlidXRlKCdkYXRhLXgnKSA9PT0gaSAmJlxuXHRcdFx0XHRcdFx0XHRcdFx0K3Nxci5nZXRBdHRyaWJ1dGUoJ2RhdGEteScpID09PSBzcVlcblx0XHRcdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdC8vIElmIHNoaXAgY2FuJ3QgYmUgYnVpbHQgZ3JheSBvdXQgc3F1YXJlc1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKG5vU3BhY2UpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0c3FyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2IoODgsIDg4LCA4OCknO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBPdGhlcndpc2Ugc2hvdyBwcm9wZXIgc2hpcCBjb2xvclxuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0c3FyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHNoaXBUeXBlT2JqLmNvbG9yO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcblx0XHRcdFx0XHRmb3IgKGxldCBpID0gc3FZOyBpIDwgc3FZICsgc2hpcExlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRpZiAoaSA+IDEwKSBicmVhaztcblxuXHRcdFx0XHRcdFx0cGxheWVyQm9hcmQuY2hpbGROb2Rlcy5mb3JFYWNoKChydykgPT4ge1xuXHRcdFx0XHRcdFx0XHRydy5jaGlsZE5vZGVzLmZvckVhY2goKHNxcikgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0XHRcdCtzcXIuZ2V0QXR0cmlidXRlKCdkYXRhLXgnKSA9PT0gc3FYICYmXG5cdFx0XHRcdFx0XHRcdFx0XHQrc3FyLmdldEF0dHJpYnV0ZSgnZGF0YS15JykgPT09IGlcblx0XHRcdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChub1NwYWNlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNxci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDg4LCA4OCwgODgpJztcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNxci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzaGlwVHlwZU9iai5jb2xvcjtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gV2hlbiBsZWF2aW5nIGdyaWQgY2VsbCByZW1vdmUgZGVwbG95bWVudCBpbmRpY2F0aW9uXG5cdFx0XHRzcS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuXHRcdFx0XHRwb3B1bGF0ZUJvYXJkSFRNTCgncGxheWVyJywgZ2FtZWJvYXJkT2JqLmdyaWQpO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vIE9uIGNsaWNrIGFkZCBzaGlwIHRvIHBsYXllcidzIGJvYXJkIG9iamVjdFxuXHRcdFx0c3EuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRcdGlmICghbm9TcGFjZSkge1xuXHRcdFx0XHRcdGdhbWVib2FyZE9iai5hZGRTaGlwKHNxWCwgc3FZLCBvcmllbnRhdGlvbiwgc2hpcFR5cGVPYmoudHlwZSk7XG5cdFx0XHRcdFx0cmVtb3ZlR3JpZExpc3RlbmVycygpO1xuXHRcdFx0XHRcdGFkZEZsZWV0RGVwbG95bWVudExpc3RlbmVyKG9yaWVudGF0aW9uLCBnYW1lYm9hcmRPYmopO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZEdhbWVwbGF5TGlzdGVuZXJzKGFpT2JqZWN0LCBwbGF5ZXJPYmplY3QpIHtcblx0YWlCb2FyZC5jaGlsZE5vZGVzLmZvckVhY2goKHJvd0hUTUwpID0+IHtcblx0XHRyb3dIVE1MLmNoaWxkTm9kZXMuZm9yRWFjaCgoc3EpID0+IHtcblx0XHRcdGNvbnN0IHNxWCA9ICtzcS5nZXRBdHRyaWJ1dGUoJ2RhdGEteCcpO1xuXHRcdFx0Y29uc3Qgc3FZID0gK3NxLmdldEF0dHJpYnV0ZSgnZGF0YS15Jyk7XG5cblx0XHRcdHNxLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0XHRjb25zdCBhdHRhY2sgPSBhaU9iamVjdC5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhzcVgsIHNxWSk7XG5cdFx0XHRcdGlmIChhdHRhY2sgJiYgIXBsYXllck9iamVjdC5nYW1lV29uKSB7XG5cdFx0XHRcdFx0YWlPYmplY3QucmFuZG9tQXR0YWNrKHBsYXllck9iamVjdC5nYW1lYm9hcmQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cG9wdWxhdGVCb2FyZEhUTUwoJ3BsYXllcicsIHBsYXllck9iamVjdC5nYW1lYm9hcmQuZ3JpZCk7XG5cdFx0XHRcdHBvcHVsYXRlQm9hcmRIVE1MKCdhaScsIGFpT2JqZWN0LmdhbWVib2FyZC5ncmlkKTtcblxuXHRcdFx0XHRpZiAoYWlPYmplY3QuZ2FtZWJvYXJkLmdhbWVMb3N0KSB7XG5cdFx0XHRcdFx0cmVtb3ZlR3JpZExpc3RlbmVycygpO1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCd5b3Ugd29uJylcblx0XHRcdFx0fSBlbHNlIGlmIChwbGF5ZXJPYmplY3QuZ2FtZWJvYXJkLmdhbWVMb3N0KSB7XG5cdFx0XHRcdFx0cmVtb3ZlR3JpZExpc3RlbmVycygpO1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCd5b3UgbG9vc2UnKVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSk7XG59XG5cbnN0YXJ0QnRuLm9uY2xpY2sgPSAoKSA9PiB7XG5cdGFpQm9hcmQuc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcblx0b3B0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRyZW1vdmVHcmlkTGlzdGVuZXJzKCk7XG59O1xuXG5leHBvcnQge1xuXHRzdGFydEJ0bixcblx0cmFuZG9tQnRuLFxuXHRwb3B1bGF0ZUJvYXJkSFRNTCxcblx0cmVzZXRHcmlkSFRNTCxcblx0YWRkRmxlZXREZXBsb3ltZW50TGlzdGVuZXIsXG5cdGFkZEdhbWVwbGF5TGlzdGVuZXJzLFxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWxvb3AtZnVuYyAqL1xuaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwJztcblxuZnVuY3Rpb24gR2FtZWJvYXJkKCkge1xuXHRsZXQgZ3JpZDtcblxuXHRjb25zdCBjcmVhdGVHcmlkID0gKCkgPT4ge1xuXHRcdGNvbnN0IGdyaWRBcnJheSA9IFtdO1xuXHRcdGZvciAobGV0IGkgPSAxOyBpIDwgMTE7IGkrKykge1xuXHRcdFx0Zm9yIChsZXQgaiA9IDE7IGogPCAxMTsgaisrKSB7XG5cdFx0XHRcdGdyaWRBcnJheS5wdXNoKHtcblx0XHRcdFx0XHR4OiBpLFxuXHRcdFx0XHRcdHk6IGosXG5cdFx0XHRcdFx0b2NjdXBpZWQ6IGZhbHNlLFxuXHRcdFx0XHRcdHNoaXBUeXBlOiBmYWxzZSxcblx0XHRcdFx0XHRoaXRUYWtlbjogZmFsc2UsXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRncmlkID0gZ3JpZEFycmF5O1xuXHR9O1xuXHRjcmVhdGVHcmlkKCk7XG5cblx0cmV0dXJuIHtcblx0XHRncmlkLFxuXHRcdGdhbWVMb3N0OiBmYWxzZSxcblxuXHRcdGNsZWFyR3JpZCgpIHtcblx0XHRcdHRoaXMuZ3JpZC5mb3JFYWNoKChzcXVhcmUpID0+IHtcblx0XHRcdFx0c3F1YXJlLm9jY3VwaWVkID0gZmFsc2U7XG5cdFx0XHRcdHNxdWFyZS5zaGlwVHlwZSA9IGZhbHNlO1xuXHRcdFx0XHRzcXVhcmUuaGl0VGFrZW4gPSBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvLyBDaGVjayBpZiB0aGVyZSBpcyBzcGFjZSB0byBjcmVhdGUgc2hpcCBhbmQgY29vcmRzIGFyZSBpbiByYW5nZVxuXHRcdGNoZWNrU3BhY2VGb3JTaGlwKHhDb29yZCwgeUNvb3JkLCBsZW5ndGgsIG9yaWVudGF0aW9uKSB7XG5cdFx0XHRjb25zdCBzdGFydFNxdWFyZSA9IHRoaXMuZ2V0U3F1YXJlKHhDb29yZCwgeUNvb3JkKTtcblx0XHRcdGxldCBub1NwYWNlID0gZmFsc2U7XG5cblx0XHRcdGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG5cdFx0XHRcdGZvciAobGV0IGkgPSB4Q29vcmQ7IGkgPCB4Q29vcmQgKyBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGlmIChpID4gMTApIHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdHRoaXMuZ3JpZC5mb3JFYWNoKChzcXVhcmUpID0+IHtcblx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0c3F1YXJlLnggPT09IGkgJiZcblx0XHRcdFx0XHRcdFx0c3F1YXJlLnkgPT09IHN0YXJ0U3F1YXJlLnkgJiZcblx0XHRcdFx0XHRcdFx0c3F1YXJlLm9jY3VwaWVkXG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0bm9TcGFjZSA9IHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IHlDb29yZDsgaSA8IHlDb29yZCArIGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0aWYgKGkgPiAxMCkgcmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0dGhpcy5ncmlkLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0XHRzcXVhcmUueCA9PT0gc3RhcnRTcXVhcmUueCAmJlxuXHRcdFx0XHRcdFx0XHRzcXVhcmUueSA9PT0gaSAmJlxuXHRcdFx0XHRcdFx0XHRzcXVhcmUub2NjdXBpZWRcblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRub1NwYWNlID0gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG5vU3BhY2U7XG5cdFx0fSxcblxuXHRcdGFkZFNoaXAoeENvb3JkLCB5Q29vcmQsIG9yaWVudGF0aW9uLCBzaGlwVHlwZSkge1xuXHRcdFx0Y29uc3Qgc3RhcnRTcXVhcmUgPSB0aGlzLmdldFNxdWFyZSh4Q29vcmQsIHlDb29yZCk7XG5cdFx0XHRsZXQgbGVuZ3RoO1xuXG5cdFx0XHRpZiAoc2hpcFR5cGUgPT09ICdQYXRyb2wgQm9hdCcpIHtcblx0XHRcdFx0bGVuZ3RoID0gMjtcblx0XHRcdH0gZWxzZSBpZiAoc2hpcFR5cGUgPT09ICdTdWJtYXJpbmUnKSB7XG5cdFx0XHRcdGxlbmd0aCA9IDM7XG5cdFx0XHR9IGVsc2UgaWYgKHNoaXBUeXBlID09PSAnRGVzdHJveWVyJykge1xuXHRcdFx0XHRsZW5ndGggPSAzO1xuXHRcdFx0fSBlbHNlIGlmIChzaGlwVHlwZSA9PT0gJ0JhdHRsZXNoaXAnKSB7XG5cdFx0XHRcdGxlbmd0aCA9IDQ7XG5cdFx0XHR9IGVsc2UgaWYgKHNoaXBUeXBlID09PSAnQ2FycmllcicpIHtcblx0XHRcdFx0bGVuZ3RoID0gNTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHN0YXJ0U3F1YXJlLm9jY3VwaWVkKSByZXR1cm4gZmFsc2U7XG5cblx0XHRcdGNvbnN0IG5vU3BhY2UgPSB0aGlzLmNoZWNrU3BhY2VGb3JTaGlwKFxuXHRcdFx0XHR4Q29vcmQsXG5cdFx0XHRcdHlDb29yZCxcblx0XHRcdFx0bGVuZ3RoLFxuXHRcdFx0XHRvcmllbnRhdGlvblxuXHRcdFx0KTtcblx0XHRcdGlmIChub1NwYWNlKSByZXR1cm4gZmFsc2U7XG5cblx0XHRcdC8vIEJ1aWxkIHNoaXBcblx0XHRcdGNvbnN0IG5ld1NoaXAgPSBTaGlwKGxlbmd0aCk7XG5cdFx0XHRpZiAob3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuXHRcdFx0XHRmb3IgKGxldCBpID0geENvb3JkOyBpIDwgeENvb3JkICsgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR0aGlzLmdyaWQuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS54ID09PSBpICYmXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS55ID09PSBzdGFydFNxdWFyZS55ICYmXG5cdFx0XHRcdFx0XHRcdCFzcXVhcmUub2NjdXBpZWRcblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRzcXVhcmUub2NjdXBpZWQgPSBuZXdTaGlwO1xuXHRcdFx0XHRcdFx0XHRzcXVhcmUuc2hpcFR5cGUgPSBzaGlwVHlwZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuXHRcdFx0XHRmb3IgKGxldCBpID0geUNvb3JkOyBpIDwgeUNvb3JkICsgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR0aGlzLmdyaWQuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS54ID09PSBzdGFydFNxdWFyZS54ICYmXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS55ID09PSBpICYmXG5cdFx0XHRcdFx0XHRcdCFzcXVhcmUub2NjdXBpZWRcblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRzcXVhcmUub2NjdXBpZWQgPSBuZXdTaGlwO1xuXHRcdFx0XHRcdFx0XHRzcXVhcmUuc2hpcFR5cGUgPSBzaGlwVHlwZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblxuXHRcdHJhbmRvbUZsZWV0UGxhY2VtZW50KCkge1xuXHRcdFx0dGhpcy5yYW5kb21TaGlwUGxhY2VtZW50KCdQYXRyb2wgQm9hdCcpO1xuXHRcdFx0dGhpcy5yYW5kb21TaGlwUGxhY2VtZW50KCdTdWJtYXJpbmUnKTtcblx0XHRcdHRoaXMucmFuZG9tU2hpcFBsYWNlbWVudCgnRGVzdHJveWVyJyk7XG5cdFx0XHR0aGlzLnJhbmRvbVNoaXBQbGFjZW1lbnQoJ0JhdHRsZXNoaXAnKTtcblx0XHRcdHRoaXMucmFuZG9tU2hpcFBsYWNlbWVudCgnQ2FycmllcicpO1xuXHRcdH0sXG5cblx0XHRyYW5kb21TaGlwUGxhY2VtZW50KHNoaXBUeXBlKSB7XG5cdFx0XHRsZXQgc2hpcEJ1aWx0ID0gZmFsc2U7XG5cblx0XHRcdHdoaWxlICghc2hpcEJ1aWx0KSB7XG5cdFx0XHRcdGxldCBvcmllbnRhdGlvbjtcblx0XHRcdFx0Y29uc3Qgb3JpZW50YXRpb25OdW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKSArIDE7XG5cdFx0XHRcdGNvbnN0IHhDb29yZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG5cdFx0XHRcdGNvbnN0IHlDb29yZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG5cblx0XHRcdFx0aWYgKG9yaWVudGF0aW9uTnVtYmVyID09PSAxKSB7XG5cdFx0XHRcdFx0b3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0b3JpZW50YXRpb24gPSAndmVydGljYWwnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0c2hpcEJ1aWx0ID0gdGhpcy5hZGRTaGlwKHhDb29yZCwgeUNvb3JkLCBvcmllbnRhdGlvbiwgc2hpcFR5cGUpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRnZXRTcXVhcmUoeENvb3JkLCB5Q29vcmQpIHtcblx0XHRcdHJldHVybiB0aGlzLmdyaWQuZmluZChcblx0XHRcdFx0KHNxdWFyZSkgPT4gc3F1YXJlLnggPT09IHhDb29yZCAmJiBzcXVhcmUueSA9PT0geUNvb3JkXG5cdFx0XHQpO1xuXHRcdH0sXG5cblx0XHRyZWNlaXZlQXR0YWNrKHhDb29yZCwgeUNvb3JkKSB7XG5cdFx0XHRjb25zdCBzcXVhcmUgPSB0aGlzLmdyaWQuZmluZCgoc3EpID0+IHNxLnggPT09IHhDb29yZCAmJiBzcS55ID09PSB5Q29vcmQpO1xuXG5cdFx0XHRpZiAoc3F1YXJlLmhpdFRha2VuKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmICghc3F1YXJlLm9jY3VwaWVkICYmICFzcXVhcmUuaGl0VGFrZW4pIHtcblx0XHRcdFx0c3F1YXJlLmhpdFRha2VuID0gdHJ1ZTtcblx0XHRcdH0gZWxzZSBpZiAoc3F1YXJlLm9jY3VwaWVkICYmICFzcXVhcmUuaGl0VGFrZW4pIHtcblx0XHRcdFx0c3F1YXJlLmhpdFRha2VuID0gdHJ1ZTtcblx0XHRcdFx0c3F1YXJlLm9jY3VwaWVkLnRha2VIaXQoKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuY2hlY2tGbGVldENvbmRpdGlvbigpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblxuXHRcdGNoZWNrRmxlZXRDb25kaXRpb24oKSB7XG5cdFx0XHRjb25zdCBmbGVldERlcGxveWVkID0gdGhpcy5ncmlkLnNvbWUoKHNxdWFyZSkgPT4gc3F1YXJlLm9jY3VwaWVkKTtcblx0XHRcdGNvbnN0IGZsZWV0QWxpdmUgPSB0aGlzLmdyaWQuc29tZShcblx0XHRcdFx0KHNxdWFyZSkgPT4gc3F1YXJlLm9jY3VwaWVkICYmICFzcXVhcmUuaGl0VGFrZW5cblx0XHRcdCk7XG5cdFx0XHRpZiAoZmxlZXREZXBsb3llZCAmJiAhZmxlZXRBbGl2ZSkge1xuXHRcdFx0XHR0aGlzLmdhbWVMb3N0ID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9LFxuXHR9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkJztcblxuZnVuY3Rpb24gUGxheWVyKCkge1xuXHRyZXR1cm4ge1xuXHRcdGdhbWVib2FyZDogR2FtZWJvYXJkKCksXG5cdFx0Z2FtZVdvbjogZmFsc2UsXG5cblx0XHRhdHRhY2soeENvb3JkLCB5Q29vcmQsIGVuZW15Qm9hcmQpIHtcblx0XHRcdGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh4Q29vcmQsIHlDb29yZCk7XG5cdFx0XHRpZiAoZW5lbXlCb2FyZC5nYW1lTG9zdCkge1xuXHRcdFx0XHR0aGlzLmdhbWVXb24gPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRyYW5kb21BdHRhY2soZW5lbXlCb2FyZCkge1xuXHRcdFx0bGV0IHNob3RGaXJlZCA9IGZhbHNlO1xuXG5cdFx0XHR3aGlsZSAoIXNob3RGaXJlZCkge1xuXHRcdFx0XHRjb25zdCB4Q29vcmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuXHRcdFx0XHRjb25zdCB5Q29vcmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuXG5cdFx0XHRcdHNob3RGaXJlZCA9IGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh4Q29vcmQsIHlDb29yZCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChlbmVteUJvYXJkLmdhbWVMb3N0KSB7XG5cdFx0XHRcdHRoaXMuZ2FtZVdvbiA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSxcblx0fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiZnVuY3Rpb24gU2hpcChsZW5ndGgpIHtcblx0cmV0dXJuIHtcblx0XHRsZW5ndGgsXG5cdFx0aGl0c1Rha2VuOiAwLFxuXHRcdGlzU3VuazogZmFsc2UsXG5cblx0XHR0YWtlSGl0KCkge1xuXHRcdFx0dGhpcy5oaXRzVGFrZW4gKz0gMTtcblx0XHRcdHRoaXMuY2hlY2tIUCgpO1xuXHRcdH0sXG5cblx0XHRjaGVja0hQKCkge1xuXHRcdFx0aWYgKHRoaXMuaGl0c1Rha2VuID49IHRoaXMubGVuZ3RoKSB7XG5cdFx0XHRcdHRoaXMuaXNTdW5rID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9LFxuXHR9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiaW1wb3J0IFBsYXllciBmcm9tICcuL2ZhY3Rvcmllcy9wbGF5ZXInO1xuaW1wb3J0IHtcblx0c3RhcnRCdG4sXG5cdHJhbmRvbUJ0bixcblx0cG9wdWxhdGVCb2FyZEhUTUwsXG5cdHJlc2V0R3JpZEhUTUwsXG5cdGFkZEZsZWV0RGVwbG95bWVudExpc3RlbmVyLFxuXHRhZGRHYW1lcGxheUxpc3RlbmVycyxcbn0gZnJvbSAnLi9ET00nO1xuXG4vLyBJbml0aWFsaXplIHBsYXllcnNcbmNvbnN0IHBsYXllciA9IFBsYXllcigpO1xuY29uc3QgYWkgPSBQbGF5ZXIoKTtcblxuLy8gQUkgcmFuZG9tIGZsZWV0IGRlcGxveW1lbnRcbmFpLmdhbWVib2FyZC5yYW5kb21GbGVldFBsYWNlbWVudCgpO1xuXG4vLyBhaS5nYW1lYm9hcmQuZ3JpZFswXS5vY2N1cGllZCA9IHRydWU7XG4vLyBhaS5nYW1lYm9hcmQuZ3JpZFswXS5oaXRUYWtlbiA9IHRydWU7XG5cbi8vIGFpLmdhbWVib2FyZC5ncmlkWzEwXS5vY2N1cGllZCA9IGZhbHNlO1xuLy8gYWkuZ2FtZWJvYXJkLmdyaWRbMTBdLmhpdFRha2VuID0gdHJ1ZTtcblxuLy8gYWkuZ2FtZWJvYXJkLmdyaWRbMl0ub2NjdXBpZWQgPSB0cnVlO1xuLy8gYWkuZ2FtZWJvYXJkLmdyaWRbMl0uaGl0VGFrZW4gPSBmYWxzZTtcblxuLy8gYWkuZ2FtZWJvYXJkLmdyaWRbM10ub2NjdXBpZWQgPSBmYWxzZTtcbi8vIGFpLmdhbWVib2FyZC5ncmlkWzNdLmhpdFRha2VuID0gZmFsc2U7XG5cbnBvcHVsYXRlQm9hcmRIVE1MKCdhaScsIGFpLmdhbWVib2FyZC5ncmlkKTtcblxuY29uc29sZS5sb2cgKGFpLmdhbWVib2FyZC5ncmlkKVxuXG4vLyBQbGF5ZXIgcmFuZG9tIGZsZWV0IGRlcGxveW1lbnRcbnJhbmRvbUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0cGxheWVyLmdhbWVib2FyZC5jbGVhckdyaWQoKTtcblx0cmVzZXRHcmlkSFRNTCgncGxheWVyJyk7XG5cdHBsYXllci5nYW1lYm9hcmQucmFuZG9tRmxlZXRQbGFjZW1lbnQoKTtcblx0cG9wdWxhdGVCb2FyZEhUTUwoJ3BsYXllcicsIHBsYXllci5nYW1lYm9hcmQuZ3JpZCk7XG59KTtcblxuLy8gUGxheWVyIG1hbnVhbCBmbGVldCBkZXBsb3ltZW50XG5sZXQgb3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG5cbmFkZEZsZWV0RGVwbG95bWVudExpc3RlbmVyKG9yaWVudGF0aW9uLCBwbGF5ZXIuZ2FtZWJvYXJkKTtcblxuLy8gVG9nZ2xlIHNoaXAgb3JpZW50YXRpb25cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcblx0aWYgKGUuY29kZSA9PT0gJ0tleVInKSB7XG5cdFx0aWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcblx0XHRcdG9yaWVudGF0aW9uID0gJ3ZlcnRpY2FsJztcblx0XHR9IGVsc2UgaWYgKG9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG5cdFx0XHRvcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcblx0XHR9XG5cdFx0cmVzZXRHcmlkSFRNTCgncGxheWVyJyk7XG5cdFx0cG9wdWxhdGVCb2FyZEhUTUwoJ3BsYXllcicsIHBsYXllci5nYW1lYm9hcmQuZ3JpZCk7XG4gICAgICAgIGFkZEZsZWV0RGVwbG95bWVudExpc3RlbmVyKG9yaWVudGF0aW9uLCBwbGF5ZXIuZ2FtZWJvYXJkKTtcblx0fVxufSk7XG5cbnN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHQvLyBDaGVjayBpZiBmbGVldCBpcyBkZXBsb3llZFxuXHRjb25zdCBmbGVldERlcGxveWVkID0gW107XG5cdHBsYXllci5nYW1lYm9hcmQuZ3JpZC5mb3JFYWNoKHNxID0+IHtcblx0XHRpZiAoc3Eub2NjdXBpZWQpIGZsZWV0RGVwbG95ZWQucHVzaCh0cnVlKTtcblx0fSk7XHRcblx0Ly8gSWYgbm90LCBkZXBsb3kgcmFuZG9tbHlcblx0aWYgKGZsZWV0RGVwbG95ZWQubGVuZ3RoICE9PSAxNykge1xuXHRcdHJhbmRvbUJ0bi5jbGljaygpO1xuXHR9XG5cblx0YWRkR2FtZXBsYXlMaXN0ZW5lcnMoYWksIHBsYXllcik7XG59KTtcblxuc3RhcnRCdG4uY2xpY2soKTsiLCJjb25zdCBzaGlwVHlwZXMgPSBbXG5cdHsgdHlwZTogJ0NhcnJpZXInLCBsZW5ndGg6IDUsIGNvbG9yOiAncmdiKDI1MCwgMTA4LCA1NiknIH0sXG5cdHsgdHlwZTogJ0JhdHRsZXNoaXAnLCBsZW5ndGg6IDQsIGNvbG9yOiAncmdiKDI1NSwgMTU1LCAxMzMpJyB9LFxuXHR7IHR5cGU6ICdEZXN0cm95ZXInLCBsZW5ndGg6IDMsIGNvbG9yOiAncmdiKDI0NiwgMjE1LCA2MCknIH0sXG5cdHsgdHlwZTogJ1N1Ym1hcmluZScsIGxlbmd0aDogMywgY29sb3I6ICdyZ2IoMCwgMTg0LCAxNDQpJyB9LFxuXHR7IHR5cGU6ICdQYXRyb2wgQm9hdCcsIGxlbmd0aDogMiwgY29sb3I6ICdyZ2IoODAsIDE4MCwgMjI2KScgfSxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IHNoaXBUeXBlczsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJvYm90bytNb25vOndnaHRANjAwJmZhbWlseT1VbmJvdW5kZWQ6d2dodEA4MDAmZGlzcGxheT1zd2FwKTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxZjI5Mzc7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgbWluLXdpZHRoOiA5NTBweDtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBtaW4taGVpZ2h0OiA2NTBweDtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIE1vbm8nLCBtb25vc3BhY2U7IH1cXG5cXG4udGl0bGUge1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMzBweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBjb2xvcjogd2hpdGU7XFxuICBmb250LWZhbWlseTogJ1VuYm91bmRlZCcsIGN1cnNpdmU7XFxuICBmb250LXNpemU6IDgwcHg7XFxuICBtYXJnaW4tdG9wOiAzMHB4OyB9XFxuXFxuLnNjb3JlIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgdG9wOiAyNSU7XFxuICB6LWluZGV4OiAxO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiA0NXB4OyB9XFxuXFxuLmdhbWUtY29udGFpbmVyLnNocmluayB7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDAuNik7IH1cXG5cXG4uZ2FtZS1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMTAwcHg7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBjb2xvcjogd2hpdGU7IH1cXG4gIC5nYW1lLWNvbnRhaW5lciAubGVmdCxcXG4gIC5nYW1lLWNvbnRhaW5lciAucmlnaHQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICB3aWR0aDogNTB2dztcXG4gICAgaGVpZ2h0OiA1MDBweDtcXG4gICAgbWFyZ2luLXRvcDogLTIlOyB9XFxuICAuZ2FtZS1jb250YWluZXIgLmxlZnQge1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGVuZDsgfVxcbiAgLmdhbWUtY29udGFpbmVyIC5yaWdodCB7XFxuICAgIGp1c3RpZnktY29udGVudDogc3RhcnQ7IH1cXG4gIC5nYW1lLWNvbnRhaW5lciAub3B0aW9ucyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBmbGV4LXNocmluazogMDtcXG4gICAgZ2FwOiAyMHB4O1xcbiAgICB3aWR0aDogMzgwcHg7XFxuICAgIGhlaWdodDogNTAwcHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgZm9udC1zaXplOiAzM3B4O1xcbiAgICBsaW5lLWhlaWdodDogNTJweDsgfVxcbiAgICAuZ2FtZS1jb250YWluZXIgLm9wdGlvbnMgLnJvdGF0ZS1pbnN0cnVjdGlvbiB7XFxuICAgICAgaGVpZ2h0OiAxMzVweDtcXG4gICAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgd2hpdGU7IH1cXG4gICAgLmdhbWUtY29udGFpbmVyIC5vcHRpb25zIC5yYW5kb20tZGVwbG95bWVudCB7XFxuICAgICAgZGlzcGxheTogZmxleDsgfVxcblxcbi5ib2FyZCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGZsZXgtc2hyaW5rOiAwO1xcbiAgd2lkdGg6IDQwMHB4O1xcbiAgaGVpZ2h0OiA0MDBweDtcXG4gIGJvcmRlcjogc29saWQgMXB4IHdoaXRlOyB9XFxuICAuYm9hcmQgLnJvdyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGZsZXgtZ3JvdzogMTsgfVxcblxcbi5zcXVhcmUge1xcbiAgZmxleC1ncm93OiAxO1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggd2hpdGU7IH1cXG5cXG4uZm9vdGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBoZWlnaHQ6IDcwcHg7XFxuICB3aWR0aDogMTAwdnc7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDE1cHg7XFxuICBjb2xvcjogI2M4YzhjODsgfVxcblxcbiNnaXRodWIge1xcbiAgaGVpZ2h0OiAyN3B4O1xcbiAgd2lkdGg6IDI3cHg7XFxuICBwYWRkaW5nLWJvdHRvbTogMC4ydmg7XFxuICB0cmFuc2l0aW9uOiAwLjNzOyB9XFxuXFxuI2dpdGh1Yjpob3ZlciB7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7IH1cXG5cXG4uYnV0dG9uIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIG1hcmdpbjogMjVweCAxMHB4IDAgMTBweDtcXG4gIHdpZHRoOiAxOTBweDtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMC44Myk7XFxuICBsaW5lLWhlaWdodDogMjFweDsgfVxcblxcbi5idXR0b24gYSB7XFxuICBjb2xvcjogd2hpdGU7XFxuICBmb250LWZhbWlseTogSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBmb250LXNpemU6IDI1cHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYjU1ZTRiO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBwYWRkaW5nOiAyMHB4IDQwcHg7XFxuICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XFxuICB0ZXh0LXNoYWRvdzogMHB4IDFweCAwcHggIzAwMDtcXG4gIGZpbHRlcjogZHJvcHNoYWRvdyhjb2xvcj0jMDAwLCBvZmZ4PTAgcHgsIG9mZnk9MSBweCk7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDAgI2ZmZTVjNCwgMCA4cHggMCAjNmUzZTAwO1xcbiAgLW1vei1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAwICNmZmU1YzQsIDAgOHB4IDAgIzZlM2UwMDtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDAgI2ZmZTVjNCwgMCA4cHggMCAjNmUzZTAwO1xcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHg7XFxuICAtbW96LWJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDsgfVxcblxcbi5idXR0b24gYTphY3RpdmUge1xcbiAgdG9wOiAxMHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2I1NWU0YjtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAjZmZlNWM0LCBpbnNldCAwIC0zcHggMCAjOTE1MTAwO1xcbiAgLW1vei1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAwICNmZmU1YzQsIGluc2V0IDAgLTNweCAwICM5MTUxMDA7XFxuICBib3gtc2hhZG93OiBpbnNldCAwIDFweCAwICNmZmU1YzQsIGluc2V0IDAgLTNweCAwICM5MTUxMDA7IH1cXG5cXG4uYnV0dG9uLnN0YXJ0IGEsXFxuLmJ1dHRvbi5zdGFydCBhOmFjdGl2ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzMxMjEyOyB9XFxuXFxuLmJ1dHRvbjphZnRlciB7XFxuICBjb250ZW50OiAnJztcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgcGFkZGluZzogNHB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOiAtMTVweDtcXG4gIGxlZnQ6IC00cHg7XFxuICB6LWluZGV4OiAtMTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyYjE4MDA7XFxuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDVweDtcXG4gIC1tb3otYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogNXB4OyB9XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBRUE7RUFDQyxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHlCQUFpQztFQUNqQyxTQUFTO0VBQ1QsVUFBVTtFQUVWLFlBQVk7RUFDWixnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLGlCQUFpQjtFQUVqQixxQ0FBcUMsRUFBQTs7QUFHdEM7RUFDQyxZQUFZO0VBQ1osYUFBYTtFQUViLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWixpQ0FBaUM7RUFDakMsZUFBZTtFQUNmLGdCQUFnQixFQUFBOztBQUdqQjtFQUNDLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsdUJBQXVCO0VBRXZCLFdBQVc7RUFDWCxRQUFRO0VBQ1IsVUFBVTtFQUVWLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsZUFBZSxFQUFBOztBQUdoQjtFQUNDLHFCQUFvQixFQUFBOztBQUdyQjtFQUNDLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFVBQVU7RUFFVixZQUFZO0VBQ1osWUFBWTtFQUNaLFlBQVksRUFBQTtFQVJiOztJQWFFLGFBQWE7SUFDYixtQkFBbUI7SUFFbkIsV0FBVztJQUNYLGFBQWE7SUFDYixlQUFlLEVBQUE7RUFsQmpCO0lBc0JFLG9CQUFvQixFQUFBO0VBdEJ0QjtJQXlCRSxzQkFBc0IsRUFBQTtFQXpCeEI7SUE2QkUsYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsc0JBQXNCO0lBQ3RCLGNBQWM7SUFDZCxTQUFTO0lBRVQsWUFBWTtJQUNaLGFBQWE7SUFDYixrQkFBa0I7SUFDbEIsZUFBZTtJQUNmLGlCQUFpQixFQUFBO0lBeENuQjtNQTJDRyxhQUFhO01BQ2IsOEJBQThCLEVBQUE7SUE1Q2pDO01BZ0RHLGFBQWEsRUFBQTs7QUFLaEI7RUFDQyxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLGNBQWM7RUFFZCxZQUFZO0VBQ1osYUFBYTtFQUNiLHVCQUF1QixFQUFBO0VBUHhCO0lBVUUsYUFBYTtJQUNiLG1CQUFtQjtJQUNuQixZQUFZLEVBQUE7O0FBSWQ7RUFDQyxZQUFZO0VBQ1osdUJBQXVCLEVBQUE7O0FBR3hCO0VBQ0MsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsWUFBWTtFQUNaLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLGNBQXlCLEVBQUE7O0FBRzFCO0VBQ0MsWUFBWTtFQUNaLFdBQVc7RUFDWCxxQkFBcUI7RUFDckIsZ0JBQWdCLEVBQUE7O0FBR2pCO0VBQ0MscUJBQXFCLEVBQUE7O0FBS3RCO0VBQ0Msa0JBQWtCO0VBQ2xCLHFCQUFxQjtFQUNyQix3QkFBd0I7RUFFeEIsWUFBWTtFQUNaLHNCQUFxQjtFQUNyQixpQkFBaUIsRUFBQTs7QUFHbEI7RUFDQyxZQUFZO0VBQ1osa0NBQWtDO0VBQ2xDLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLHFCQUFxQjtFQUNyQix5QkFBa0M7RUFDbEMsY0FBYztFQUNkLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFFbEIsNkNBQTZDO0VBQzdDLDZCQUE2QjtFQUM3QixvREFBa0Q7RUFFbEQsMERBQTBEO0VBQzFELHVEQUF1RDtFQUN2RCxrREFBa0Q7RUFFbEQsMEJBQTBCO0VBQzFCLHVCQUF1QjtFQUN2QixrQkFBa0IsRUFBQTs7QUFHbkI7RUFDQyxTQUFTO0VBQ1QseUJBQWtDO0VBRWxDLGlFQUFpRTtFQUNqRSw4REFBOEQ7RUFDOUQseURBQXlELEVBQUE7O0FBRzFEOztFQUVDLHlCQUF5QixFQUFBOztBQUcxQjtFQUNDLFdBQVc7RUFDWCxZQUFZO0VBQ1osV0FBVztFQUNYLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLFVBQVU7RUFDVixXQUFXO0VBQ1gseUJBQXlCO0VBQ3pCLDBCQUEwQjtFQUMxQix1QkFBdUI7RUFDdkIsa0JBQWtCLEVBQUFcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Um9ib3RvK01vbm86d2dodEA2MDAmZmFtaWx5PVVuYm91bmRlZDp3Z2h0QDgwMCZkaXNwbGF5PXN3YXAnKTtcXG5cXG5ib2R5IHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogcmdiKDMxLCA0MSwgNTUpO1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcblxcblxcdHdpZHRoOiAxMDB2dztcXG5cXHRtaW4td2lkdGg6IDk1MHB4O1xcblxcdGhlaWdodDogMTAwdmg7XFxuXFx0bWluLWhlaWdodDogNjUwcHg7XFxuXFxuXFx0Zm9udC1mYW1pbHk6ICdSb2JvdG8gTW9ubycsIG1vbm9zcGFjZTtcXG59XFxuXFxuLnRpdGxlIHtcXG5cXHR3aWR0aDogMTAwdnc7XFxuXFx0aGVpZ2h0OiAxMzBweDtcXG5cXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0Y29sb3I6IHdoaXRlO1xcblxcdGZvbnQtZmFtaWx5OiAnVW5ib3VuZGVkJywgY3Vyc2l2ZTtcXG5cXHRmb250LXNpemU6IDgwcHg7XFxuXFx0bWFyZ2luLXRvcDogMzBweDtcXG59XFxuXFxuLnNjb3JlIHtcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0ZGlzcGxheTogZmxleDtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXG5cXHR3aWR0aDogMTAwJTtcXG5cXHR0b3A6IDI1JTtcXG5cXHR6LWluZGV4OiAxO1xcblxcblxcdGNvbG9yOiB3aGl0ZTtcXG5cXHR0ZXh0LWFsaWduOiBjZW50ZXI7XFxuXFx0Zm9udC1zaXplOiA0NXB4O1xcbn1cXG5cXG4uZ2FtZS1jb250YWluZXIuc2hyaW5rIHtcXG5cXHR0cmFuc2Zvcm06IHNjYWxlKC42KTtcXG59XFxuXFxuLmdhbWUtY29udGFpbmVyIHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0Z2FwOiAxMDBweDtcXG5cXG5cXHR3aWR0aDogMTAwdnc7XFxuXFx0aGVpZ2h0OiAxMDAlO1xcblxcdGNvbG9yOiB3aGl0ZTtcXG5cXG5cXG5cXHQubGVmdCxcXG5cXHQucmlnaHQge1xcblxcdFxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0XFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXG5cXHRcXHR3aWR0aDogNTB2dztcXG5cXHRcXHRoZWlnaHQ6IDUwMHB4O1xcblxcdFxcdG1hcmdpbi10b3A6IC0yJTtcXG5cXHR9XFxuXFxuXFx0LmxlZnQge1xcblxcdFxcdGp1c3RpZnktY29udGVudDogZW5kO1xcblxcdH1cXG5cXHQucmlnaHQge1xcblxcdFxcdGp1c3RpZnktY29udGVudDogc3RhcnQ7XFxuXFx0fVxcblxcblxcdC5vcHRpb25zIHtcXG5cXHRcXHRkaXNwbGF5OiBmbGV4O1xcblxcdFxcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xcblxcdFxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0XFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG5cXHRcXHRmbGV4LXNocmluazogMDtcXG5cXHRcXHRnYXA6IDIwcHg7XFxuXFxuXFx0XFx0d2lkdGg6IDM4MHB4O1xcblxcdFxcdGhlaWdodDogNTAwcHg7XFxuXFx0XFx0dGV4dC1hbGlnbjogY2VudGVyO1xcblxcdFxcdGZvbnQtc2l6ZTogMzNweDtcXG5cXHRcXHRsaW5lLWhlaWdodDogNTJweDtcXG5cXG5cXHRcXHQucm90YXRlLWluc3RydWN0aW9uIHtcXG5cXHRcXHRcXHRoZWlnaHQ6IDEzNXB4O1xcblxcdFxcdFxcdGJvcmRlci1ib3R0b206IDJweCBzb2xpZCB3aGl0ZTtcXG5cXHRcXHR9XFxuXFxuXFx0XFx0LnJhbmRvbS1kZXBsb3ltZW50IHtcXG5cXHRcXHRcXHRkaXNwbGF5OiBmbGV4O1xcblxcdFxcdH1cXG5cXHR9XFxufVxcblxcbi5ib2FyZCB7XFxuXFx0ZGlzcGxheTogZmxleDtcXG5cXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcblxcdGZsZXgtc2hyaW5rOiAwO1xcblxcblxcdHdpZHRoOiA0MDBweDtcXG5cXHRoZWlnaHQ6IDQwMHB4O1xcblxcdGJvcmRlcjogc29saWQgMXB4IHdoaXRlO1xcblxcblxcdC5yb3cge1xcblxcdFxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0XFx0ZmxleC1kaXJlY3Rpb246IHJvdztcXG5cXHRcXHRmbGV4LWdyb3c6IDE7XFxuXFx0fVxcbn1cXG5cXG4uc3F1YXJlIHtcXG5cXHRmbGV4LWdyb3c6IDE7XFxuXFx0Ym9yZGVyOiBzb2xpZCAxcHggd2hpdGU7XFxufVxcblxcbi5mb290ZXIge1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuXFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXHRoZWlnaHQ6IDcwcHg7XFxuXFx0d2lkdGg6IDEwMHZ3O1xcblxcdHRleHQtYWxpZ246IGNlbnRlcjtcXG5cXHRmb250LXNpemU6IDE1cHg7XFxuXFx0Y29sb3I6IHJnYigyMDAsIDIwMCwgMjAwKTtcXG59XFxuXFxuI2dpdGh1YiB7XFxuXFx0aGVpZ2h0OiAyN3B4O1xcblxcdHdpZHRoOiAyN3B4O1xcblxcdHBhZGRpbmctYm90dG9tOiAwLjJ2aDtcXG5cXHR0cmFuc2l0aW9uOiAwLjNzO1xcbn1cXG5cXG4jZ2l0aHViOmhvdmVyIHtcXG5cXHR0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XFxufVxcblxcbi8vIEJ1dHRvbiBmcm9tIGh0dHBzOi8vZGV2LnRvL3dlYmRlYXN5L3RvcC0yMC1jc3MtYnV0dG9ucy1hbmltYXRpb25zLWY0MVxcbi8vIGF1dGhvciBqZW13YXJlLiBBZGp1c3RlZCBhIGJpdCB0byBteSBvd24gbmVlZHMuXFxuLmJ1dHRvbiB7XFxuXFx0cG9zaXRpb246IHJlbGF0aXZlO1xcblxcdGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG5cXHRtYXJnaW46IDI1cHggMTBweCAwIDEwcHg7XFxuXFxuXFx0d2lkdGg6IDE5MHB4O1xcblxcdHRyYW5zZm9ybTogc2NhbGUoLjgzKTtcXG5cXHRsaW5lLWhlaWdodDogMjFweDtcXG59XFxuXFxuLmJ1dHRvbiBhIHtcXG5cXHRjb2xvcjogd2hpdGU7XFxuXFx0Zm9udC1mYW1pbHk6IEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXG5cXHRmb250LXdlaWdodDogYm9sZDtcXG5cXHRmb250LXNpemU6IDI1cHg7XFxuXFx0dGV4dC1hbGlnbjogY2VudGVyO1xcblxcdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTgxLCA5NCwgNzUpO1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcblxcdHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXHRwYWRkaW5nOiAyMHB4IDQwcHg7XFxuXFxuXFx0LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcblxcdHRleHQtc2hhZG93OiAwcHggMXB4IDBweCAjMDAwO1xcblxcdGZpbHRlcjogZHJvcHNoYWRvdyhjb2xvcj0jMDAwLCBvZmZ4PTBweCwgb2ZmeT0xcHgpO1xcblxcblxcdC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAjZmZlNWM0LCAwIDhweCAwICM2ZTNlMDA7XFxuXFx0LW1vei1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAwICNmZmU1YzQsIDAgOHB4IDAgIzZlM2UwMDtcXG5cXHRib3gtc2hhZG93OiBpbnNldCAwIDFweCAwICNmZmU1YzQsIDAgOHB4IDAgIzZlM2UwMDtcXG5cXG5cXHQtd2Via2l0LWJvcmRlci1yYWRpdXM6IDVweDtcXG5cXHQtbW96LWJvcmRlci1yYWRpdXM6IDVweDtcXG5cXHRib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcblxcbi5idXR0b24gYTphY3RpdmUge1xcblxcdHRvcDogMTBweDtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTgxLCA5NCwgNzUpO1xcblxcblxcdC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAjZmZlNWM0LCBpbnNldCAwIC0zcHggMCAjOTE1MTAwO1xcblxcdC1tb3otYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAjZmZlNWM0LCBpbnNldCAwIC0zcHggMCAjOTE1MTAwO1xcblxcdGJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDAgI2ZmZTVjNCwgaW5zZXQgMCAtM3B4IDAgIzkxNTEwMDtcXG59XFxuXFxuLmJ1dHRvbi5zdGFydCBhLFxcbi5idXR0b24uc3RhcnQgYTphY3RpdmUge1xcblxcdGJhY2tncm91bmQtY29sb3I6ICNjMzEyMTI7XFxufVxcblxcbi5idXR0b246YWZ0ZXIge1xcblxcdGNvbnRlbnQ6ICcnO1xcblxcdGhlaWdodDogMTAwJTtcXG5cXHR3aWR0aDogMTAwJTtcXG5cXHRwYWRkaW5nOiA0cHg7XFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcblxcdGJvdHRvbTogLTE1cHg7XFxuXFx0bGVmdDogLTRweDtcXG5cXHR6LWluZGV4OiAtMTtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiAjMmIxODAwO1xcblxcdC13ZWJraXQtYm9yZGVyLXJhZGl1czogNXB4O1xcblxcdC1tb3otYm9yZGVyLXJhZGl1czogNXB4O1xcblxcdGJvcmRlci1yYWRpdXM6IDVweDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgJy4vc3R5bGUuc2Nzcyc7XG5cblxuaW1wb3J0ICcuL21vZHVsZXMvRE9NJztcbmltcG9ydCAnLi9tb2R1bGVzL2dhbWVMb29wJ1xuXG5pbXBvcnQgJy4vbW9kdWxlcy9mYWN0b3JpZXMvc2hpcCc7XG5pbXBvcnQgJy4vbW9kdWxlcy9mYWN0b3JpZXMvZ2FtZWJvYXJkJztcbmltcG9ydCAnLi9tb2R1bGVzL2ZhY3Rvcmllcy9wbGF5ZXInO1xuXG4iXSwibmFtZXMiOlsic2hpcFR5cGVzIiwiZ2l0SWNvbiIsImdhbWVDb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJnaXRJbWciLCJzdGFydEJ0biIsInJhbmRvbUJ0biIsImxlZnQiLCJyaWdodCIsIm9wdGlvbnMiLCJyb3ciLCJjcmVhdGVFbGVtZW50Iiwic3F1YXJlIiwicGxheWVyQm9hcmQiLCJjbGFzc0xpc3QiLCJhZGQiLCJzcmMiLCJpIiwiYXBwZW5kQ2hpbGQiLCJjbG9uZU5vZGUiLCJqIiwidGVtcFNxdWFyZSIsInNldEF0dHJpYnV0ZSIsImxhc3RDaGlsZCIsImFpQm9hcmQiLCJzdHlsZSIsImRpc3BsYXkiLCJoZWxwZXJDaG9vc2VQbGF5ZXJHcmlkIiwicGxheWVyIiwiZ3JpZEhUTUwiLCJwb3B1bGF0ZUJvYXJkSFRNTCIsImdyaWRPYmplY3QiLCJzcXVhcmVIVE1MIiwiZm9yRWFjaCIsInNxdWFyZU9iaiIsImNoaWxkTm9kZXMiLCJyb3dIVE1MIiwic3EiLCJ4IiwiZ2V0QXR0cmlidXRlIiwieSIsIm9jY3VwaWVkIiwiaGl0VGFrZW4iLCJiYWNrZ3JvdW5kQ29sb3IiLCJzaGlwVHlwZSIsInR5cGUiLCJjb2xvciIsInJlc2V0R3JpZEhUTUwiLCJyZW1vdmVHcmlkTGlzdGVuZXJzIiwicGxheWVyQm9hcmRDbG9uZSIsImFpQm9hcmRDbG9uZSIsInBhcmVudE5vZGUiLCJyZXBsYWNlQ2hpbGQiLCJhZGRGbGVldERlcGxveW1lbnRMaXN0ZW5lciIsIm9yaWVudGF0aW9uIiwiZ2FtZWJvYXJkT2JqIiwic3FYIiwic3FZIiwic2hpcFR5cGVPYmoiLCJzaGlwTGVuZ3RoIiwiZ3JpZCIsInNvbWUiLCJlbCIsImxlbmd0aCIsIm5vU3BhY2UiLCJjaGVja1NwYWNlRm9yU2hpcCIsImFkZEV2ZW50TGlzdGVuZXIiLCJydyIsInNxciIsImFkZFNoaXAiLCJhZGRHYW1lcGxheUxpc3RlbmVycyIsImFpT2JqZWN0IiwicGxheWVyT2JqZWN0IiwiYXR0YWNrIiwiZ2FtZWJvYXJkIiwicmVjZWl2ZUF0dGFjayIsImdhbWVXb24iLCJyYW5kb21BdHRhY2siLCJnYW1lTG9zdCIsImNvbnNvbGUiLCJsb2ciLCJvbmNsaWNrIiwiU2hpcCIsIkdhbWVib2FyZCIsImNyZWF0ZUdyaWQiLCJncmlkQXJyYXkiLCJwdXNoIiwiY2xlYXJHcmlkIiwieENvb3JkIiwieUNvb3JkIiwic3RhcnRTcXVhcmUiLCJnZXRTcXVhcmUiLCJuZXdTaGlwIiwicmFuZG9tRmxlZXRQbGFjZW1lbnQiLCJyYW5kb21TaGlwUGxhY2VtZW50Iiwic2hpcEJ1aWx0Iiwib3JpZW50YXRpb25OdW1iZXIiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJmaW5kIiwidGFrZUhpdCIsImNoZWNrRmxlZXRDb25kaXRpb24iLCJmbGVldERlcGxveWVkIiwiZmxlZXRBbGl2ZSIsIlBsYXllciIsImVuZW15Qm9hcmQiLCJzaG90RmlyZWQiLCJoaXRzVGFrZW4iLCJpc1N1bmsiLCJjaGVja0hQIiwiYWkiLCJlIiwiY29kZSIsImNsaWNrIl0sInNvdXJjZVJvb3QiOiIifQ==