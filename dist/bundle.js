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
/* harmony export */   "restartBtn": () => (/* binding */ restartBtn),
/* harmony export */   "startBtn": () => (/* binding */ startBtn)
/* harmony export */ });
/* harmony import */ var _shipTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipTypes */ "./src/modules/shipTypes.js");
/* harmony import */ var _img_github_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../img/github.png */ "./src/img/github.png");
/* eslint-disable prefer-destructuring */


var gameContainer = document.querySelector('.game-container');
var score = document.querySelector('.score');
var restartBtn = document.querySelector('.restart');
var gitImg = document.querySelector('#github');
var startBtn = document.querySelector('.start');
var randomBtn = document.querySelector('.random');
var left = document.querySelector('.left');
var right = document.querySelector('.right');
var options = document.querySelector('.options');
var row = document.createElement('div');
var square = document.createElement('div');
var playerBoard = document.createElement('div');
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
function endGame(winner) {
  gameContainer.classList.add('shrink');
  if (winner === 'player') {
    playerBoard.classList.add('winner');
    aiBoard.classList.add('loser');
    score.innerHTML = 'You won!';
  } else if (winner === 'ai') {
    playerBoard.classList.add('loser');
    aiBoard.classList.add('winner');
    score.innerHTML = 'AI won!';
  }
  score.style.display = 'flex';
  restartBtn.style.display = 'flex';
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
          endGame('player');
        } else if (playerObject.gameboard.gameLost) {
          removeGridListeners();
          endGame('ai');
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
restartBtn.onclick = function () {
  resetGridHTML('player');
  resetGridHTML('ai');
  gameContainer.classList.remove('shrink');
  aiBoard.style.display = 'none';
  options.style.display = 'flex';
  score.style.display = 'none';
  restartBtn.style.display = 'none';
  playerBoard.classList.remove('winner', 'loser');
  aiBoard.classList.remove('winner', 'loser');
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
      var fleetAlive = this.grid.some(function (square) {
        return square.occupied && !square.hitTaken;
      });
      if (!fleetAlive) {
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
_DOM__WEBPACK_IMPORTED_MODULE_1__.restartBtn.addEventListener('click', function () {
  player.gameboard.clearGrid();
  ai.gameboard.clearGrid();
  (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.addFleetDeploymentListener)(orientation, player.gameboard);
});

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
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  display: flex;\n  flex-direction: column;\n  background-color: #1f2937;\n  margin: 0;\n  padding: 0;\n  width: 100vw;\n  min-width: 950px;\n  height: 100vh;\n  min-height: 720px;\n  font-family: 'Roboto Mono', monospace; }\n\n.title {\n  width: 100vw;\n  height: 130px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: white;\n  font-family: 'Unbounded', cursive;\n  font-size: 80px;\n  margin-top: 30px; }\n\n.score {\n  display: none;\n  position: absolute;\n  justify-content: center;\n  width: 100%;\n  top: 23%;\n  z-index: 1;\n  color: white;\n  text-align: center;\n  font-size: 40px;\n  transition: all 1s; }\n\n.restart {\n  display: none;\n  position: absolute;\n  justify-content: center;\n  width: 100%;\n  bottom: 15%;\n  transform: scale(0.85);\n  transition: all 1s; }\n\n.game-container.shrink {\n  transform: scale(0.6); }\n\n.loser {\n  box-shadow: 0px 0px 29px 16px #620000; }\n\n.winner {\n  box-shadow: 0px 0px 29px 16px #006200; }\n\n.game-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 100px;\n  width: 100vw;\n  height: 100%;\n  color: white;\n  transition: transform 1s; }\n  .game-container .left,\n  .game-container .right {\n    display: flex;\n    align-items: center;\n    width: 50vw;\n    height: 500px;\n    margin-top: -2%; }\n  .game-container .left {\n    justify-content: end; }\n  .game-container .right {\n    justify-content: start; }\n  .game-container .options {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    flex-shrink: 0;\n    gap: 20px;\n    width: 380px;\n    height: 500px;\n    text-align: center;\n    font-size: 33px;\n    line-height: 52px; }\n    .game-container .options .rotate-instruction {\n      height: 135px;\n      border-bottom: 2px solid white; }\n    .game-container .options .random-deployment {\n      display: flex; }\n\n.board {\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 0;\n  width: 400px;\n  height: 400px;\n  border: solid 1px white; }\n  .board .row {\n    display: flex;\n    flex-direction: row;\n    flex-grow: 1; }\n\n.square {\n  flex-grow: 1;\n  border: solid 1px white; }\n\n.footer {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 70px;\n  width: 100vw;\n  margin-bottom: 5px;\n  text-align: center;\n  font-size: 15px;\n  color: #c8c8c8; }\n\n#github {\n  height: 27px;\n  width: 27px;\n  padding-bottom: 0.2vh;\n  transition: 0.3s; }\n\n#github:hover {\n  transform: scale(1.1); }\n\n.button {\n  position: relative;\n  display: inline-block;\n  margin: 25px 10px 0 10px;\n  width: 190px;\n  transform: scale(0.83);\n  line-height: 21px; }\n\n.button a {\n  color: white;\n  font-family: Helvetica, sans-serif;\n  font-weight: bold;\n  font-size: 25px;\n  text-align: center;\n  text-decoration: none;\n  background-color: #b55e4b;\n  display: block;\n  position: relative;\n  padding: 20px 40px;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  text-shadow: 0px 1px 0px #000;\n  filter: dropshadow(color=#000, offx=0 px, offy=1 px);\n  -webkit-box-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n  -moz-box-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n  box-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  border-radius: 5px; }\n\n.button a:active {\n  top: 10px;\n  background-color: #b55e4b;\n  -webkit-box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100;\n  -moz-box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100;\n  box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100; }\n\n.button.start a,\n.button.start a:active,\n.button.restart-btn a,\n.button.restart a:active {\n  background-color: #c31212; }\n\n.button:after {\n  content: '';\n  height: 100%;\n  width: 100%;\n  padding: 4px;\n  position: absolute;\n  bottom: -15px;\n  left: -4px;\n  z-index: -1;\n  background-color: #2b1800;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  border-radius: 5px; }\n", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"AAEA;EACC,aAAa;EACb,sBAAsB;EACtB,yBAAiC;EACjC,SAAS;EACT,UAAU;EAEV,YAAY;EACZ,gBAAgB;EAChB,aAAa;EACb,iBAAiB;EAEjB,qCAAqC,EAAA;;AAGtC;EACC,YAAY;EACZ,aAAa;EAEb,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,iCAAiC;EACjC,eAAe;EACf,gBAAgB,EAAA;;AAGjB;EACC,aAAa;EACb,kBAAkB;EAClB,uBAAuB;EAEvB,WAAW;EACX,QAAQ;EACR,UAAU;EAEV,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf,kBAAkB,EAAA;;AAGnB;EACC,aAAa;EACb,kBAAkB;EAClB,uBAAuB;EAEvB,WAAW;EACX,WAAW;EACX,sBAAqB;EACrB,kBAAkB,EAAA;;AAInB;EACC,qBAAoB,EAAA;;AAGrB;EACC,qCAA+C,EAAA;;AAGhD;EACC,qCAA+C,EAAA;;AAIhD;EACC,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,UAAU;EAEV,YAAY;EACZ,YAAY;EACZ,YAAY;EACZ,wBAAwB,EAAA;EATzB;;IAcE,aAAa;IACb,mBAAmB;IAEnB,WAAW;IACX,aAAa;IACb,eAAe,EAAA;EAnBjB;IAuBE,oBAAoB,EAAA;EAvBtB;IA0BE,sBAAsB,EAAA;EA1BxB;IA8BE,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,sBAAsB;IACtB,cAAc;IACd,SAAS;IAET,YAAY;IACZ,aAAa;IACb,kBAAkB;IAClB,eAAe;IACf,iBAAiB,EAAA;IAzCnB;MA4CG,aAAa;MACb,8BAA8B,EAAA;IA7CjC;MAiDG,aAAa,EAAA;;AAKhB;EACC,aAAa;EACb,sBAAsB;EACtB,cAAc;EAEd,YAAY;EACZ,aAAa;EACb,uBAAuB,EAAA;EAPxB;IAUE,aAAa;IACb,mBAAmB;IACnB,YAAY,EAAA;;AAId;EACC,YAAY;EACZ,uBAAuB,EAAA;;AAGxB;EACC,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EAEnB,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAElB,kBAAkB;EAClB,eAAe;EACf,cAAyB,EAAA;;AAG1B;EACC,YAAY;EACZ,WAAW;EACX,qBAAqB;EACrB,gBAAgB,EAAA;;AAGjB;EACC,qBAAqB,EAAA;;AAKtB;EACC,kBAAkB;EAClB,qBAAqB;EACrB,wBAAwB;EAExB,YAAY;EACZ,sBAAqB;EACrB,iBAAiB,EAAA;;AAGlB;EACC,YAAY;EACZ,kCAAkC;EAClC,iBAAiB;EACjB,eAAe;EACf,kBAAkB;EAClB,qBAAqB;EACrB,yBAAkC;EAClC,cAAc;EACd,kBAAkB;EAClB,kBAAkB;EAElB,6CAA6C;EAC7C,6BAA6B;EAC7B,oDAAkD;EAElD,0DAA0D;EAC1D,uDAAuD;EACvD,kDAAkD;EAElD,0BAA0B;EAC1B,uBAAuB;EACvB,kBAAkB,EAAA;;AAGnB;EACC,SAAS;EACT,yBAAkC;EAElC,iEAAiE;EACjE,8DAA8D;EAC9D,yDAAyD,EAAA;;AAG1D;;;;EAIC,yBAAyB,EAAA;;AAG1B;EACC,WAAW;EACX,YAAY;EACZ,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,aAAa;EACb,UAAU;EACV,WAAW;EACX,yBAAyB;EACzB,0BAA0B;EAC1B,uBAAuB;EACvB,kBAAkB,EAAA","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@600&family=Unbounded:wght@800&display=swap');\n\nbody {\n\tdisplay: flex;\n\tflex-direction: column;\n\tbackground-color: rgb(31, 41, 55);\n\tmargin: 0;\n\tpadding: 0;\n\n\twidth: 100vw;\n\tmin-width: 950px;\n\theight: 100vh;\n\tmin-height: 720px;\n\n\tfont-family: 'Roboto Mono', monospace;\n}\n\n.title {\n\twidth: 100vw;\n\theight: 130px;\n\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tcolor: white;\n\tfont-family: 'Unbounded', cursive;\n\tfont-size: 80px;\n\tmargin-top: 30px;\n}\n\n.score {\n\tdisplay: none;\n\tposition: absolute;\n\tjustify-content: center;\n\n\twidth: 100%;\n\ttop: 23%;\n\tz-index: 1;\n\n\tcolor: white;\n\ttext-align: center;\n\tfont-size: 40px;\n\ttransition: all 1s;\n}\n\n.restart {\n\tdisplay: none;\n\tposition: absolute;\n\tjustify-content: center;\n\n\twidth: 100%;\n\tbottom: 15%;\n\ttransform: scale(.85);\n\ttransition: all 1s;\n}\n\n// Endgame stylization\n.game-container.shrink {\n\ttransform: scale(.6);\n}\n\n.loser {\n\tbox-shadow: 0px 0px 29px 16px rgba(98, 0, 0, 1);\n}\n\n.winner {\n\tbox-shadow: 0px 0px 29px 16px rgba(0, 98, 0, 1);\n}\n// </Endgame stylization>\n\n.game-container {\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tgap: 100px;\n\n\twidth: 100vw;\n\theight: 100%;\n\tcolor: white;\n\ttransition: transform 1s;\n\n\n\t.left,\n\t.right {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\n\t\twidth: 50vw;\n\t\theight: 500px;\n\t\tmargin-top: -2%;\n\t}\n\n\t.left {\n\t\tjustify-content: end;\n\t}\n\t.right {\n\t\tjustify-content: start;\n\t}\n\n\t.options {\n\t\tdisplay: flex;\n\t\tjustify-content: center;\n\t\talign-items: center;\n\t\tflex-direction: column;\n\t\tflex-shrink: 0;\n\t\tgap: 20px;\n\n\t\twidth: 380px;\n\t\theight: 500px;\n\t\ttext-align: center;\n\t\tfont-size: 33px;\n\t\tline-height: 52px;\n\n\t\t.rotate-instruction {\n\t\t\theight: 135px;\n\t\t\tborder-bottom: 2px solid white;\n\t\t}\n\n\t\t.random-deployment {\n\t\t\tdisplay: flex;\n\t\t}\n\t}\n}\n\n.board {\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex-shrink: 0;\n\n\twidth: 400px;\n\theight: 400px;\n\tborder: solid 1px white;\n\n\t.row {\n\t\tdisplay: flex;\n\t\tflex-direction: row;\n\t\tflex-grow: 1;\n\t}\n}\n\n.square {\n\tflex-grow: 1;\n\tborder: solid 1px white;\n}\n\n.footer {\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\n\theight: 70px;\n\twidth: 100vw;\n\tmargin-bottom: 5px;\n\n\ttext-align: center;\n\tfont-size: 15px;\n\tcolor: rgb(200, 200, 200);\n}\n\n#github {\n\theight: 27px;\n\twidth: 27px;\n\tpadding-bottom: 0.2vh;\n\ttransition: 0.3s;\n}\n\n#github:hover {\n\ttransform: scale(1.1);\n}\n\n// Button from https://dev.to/webdeasy/top-20-css-buttons-animations-f41\n// author jemware. Adjusted a bit to my own needs.\n.button {\n\tposition: relative;\n\tdisplay: inline-block;\n\tmargin: 25px 10px 0 10px;\n\n\twidth: 190px;\n\ttransform: scale(.83);\n\tline-height: 21px;\n}\n\n.button a {\n\tcolor: white;\n\tfont-family: Helvetica, sans-serif;\n\tfont-weight: bold;\n\tfont-size: 25px;\n\ttext-align: center;\n\ttext-decoration: none;\n\tbackground-color: rgb(181, 94, 75);\n\tdisplay: block;\n\tposition: relative;\n\tpadding: 20px 40px;\n\n\t-webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n\ttext-shadow: 0px 1px 0px #000;\n\tfilter: dropshadow(color=#000, offx=0px, offy=1px);\n\n\t-webkit-box-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n\t-moz-box-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n\tbox-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n\n\t-webkit-border-radius: 5px;\n\t-moz-border-radius: 5px;\n\tborder-radius: 5px;\n}\n\n.button a:active {\n\ttop: 10px;\n\tbackground-color: rgb(181, 94, 75);\n\n\t-webkit-box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100;\n\t-moz-box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100;\n\tbox-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100;\n}\n\n.button.start a,\n.button.start a:active,\n.button.restart-btn a,\n.button.restart a:active {\n\tbackground-color: #c31212;\n}\n\n.button:after {\n\tcontent: '';\n\theight: 100%;\n\twidth: 100%;\n\tpadding: 4px;\n\tposition: absolute;\n\tbottom: -15px;\n\tleft: -4px;\n\tz-index: -1;\n\tbackground-color: #2b1800;\n\t-webkit-border-radius: 5px;\n\t-moz-border-radius: 5px;\n\tborder-radius: 5px;\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7VUNmQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NmQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBc0I7QUFHQztBQUNJO0FBRU87QUFDSyIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9ET00uanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL2ZhY3Rvcmllcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL2ZhY3Rvcmllcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL2ZhY3Rvcmllcy9zaGlwLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9nYW1lTG9vcC5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vc3JjL21vZHVsZXMvc2hpcFR5cGVzLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9zcmMvc3R5bGUuc2NzcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL3NyYy9zdHlsZS5zY3NzPzc1YmEiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vc3JjL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItZGVzdHJ1Y3R1cmluZyAqL1xuaW1wb3J0IHNoaXBUeXBlcyBmcm9tICcuL3NoaXBUeXBlcyc7XG5pbXBvcnQgZ2l0SWNvbiBmcm9tICcuLi9pbWcvZ2l0aHViLnBuZyc7XG5cbmNvbnN0IGdhbWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1jb250YWluZXInKTtcbmNvbnN0IHNjb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjb3JlJyk7XG5jb25zdCByZXN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3RhcnQnKTtcbmNvbnN0IGdpdEltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnaXRodWInKTtcbmNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0Jyk7XG5jb25zdCByYW5kb21CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmFuZG9tJyk7XG5jb25zdCBsZWZ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxlZnQnKTtcbmNvbnN0IHJpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJpZ2h0Jyk7XG5jb25zdCBvcHRpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9wdGlvbnMnKTtcbmNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5sZXQgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuZ2l0SW1nLnNyYyA9IGdpdEljb247XG5cbnBsYXllckJvYXJkLmNsYXNzTGlzdC5hZGQoJ2JvYXJkJyk7XG5yb3cuY2xhc3NMaXN0LmFkZCgncm93Jyk7XG5zcXVhcmUuY2xhc3NMaXN0LmFkZCgnc3F1YXJlJyk7XG5cbi8vIENyZWF0ZSBncmlkXG5mb3IgKGxldCBpID0gMTsgaSA8IDExOyBpKyspIHtcblx0cGxheWVyQm9hcmQuYXBwZW5kQ2hpbGQocm93LmNsb25lTm9kZSgpKTtcblxuXHRmb3IgKGxldCBqID0gMTsgaiA8IDExOyBqKyspIHtcblx0XHRjb25zdCB0ZW1wU3F1YXJlID0gc3F1YXJlLmNsb25lTm9kZSgpO1xuXHRcdHRlbXBTcXVhcmUuc2V0QXR0cmlidXRlKCdkYXRhLXgnLCBqKTtcblx0XHR0ZW1wU3F1YXJlLnNldEF0dHJpYnV0ZSgnZGF0YS15JywgaSk7XG5cblx0XHRwbGF5ZXJCb2FyZC5sYXN0Q2hpbGQuYXBwZW5kQ2hpbGQodGVtcFNxdWFyZSk7XG5cdH1cbn1cblxubGV0IGFpQm9hcmQgPSBwbGF5ZXJCb2FyZC5jbG9uZU5vZGUodHJ1ZSk7XG5wbGF5ZXJCb2FyZC5jbGFzc0xpc3QuYWRkKCdwbGF5ZXItYm9hcmQnKTtcbmFpQm9hcmQuY2xhc3NMaXN0LmFkZCgnYWktYm9hcmQnKTtcbmFpQm9hcmQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxubGVmdC5hcHBlbmRDaGlsZChwbGF5ZXJCb2FyZCk7XG5yaWdodC5hcHBlbmRDaGlsZChhaUJvYXJkKTtcblxuZnVuY3Rpb24gaGVscGVyQ2hvb3NlUGxheWVyR3JpZChwbGF5ZXIpIHtcblx0bGV0IGdyaWRIVE1MO1xuXG5cdGlmIChwbGF5ZXIgPT09ICdwbGF5ZXInKSB7XG5cdFx0Z3JpZEhUTUwgPSBwbGF5ZXJCb2FyZDtcblx0fSBlbHNlIGlmIChwbGF5ZXIgPT09ICdhaScpIHtcblx0XHRncmlkSFRNTCA9IGFpQm9hcmQ7XG5cdH1cblx0cmV0dXJuIGdyaWRIVE1MO1xufVxuXG5mdW5jdGlvbiBwb3B1bGF0ZUJvYXJkSFRNTChwbGF5ZXIsIGdyaWRPYmplY3QpIHtcblx0Y29uc3QgZ3JpZEhUTUwgPSBoZWxwZXJDaG9vc2VQbGF5ZXJHcmlkKHBsYXllcik7XG5cdGxldCBzcXVhcmVIVE1MO1xuXG5cdC8vIEZpbmQgSFRNTCBlcXVpdmFsZW50IG9mIHNxdWFyZSBvYmplY3QgYnkgY29vcmRpbmF0ZXNcblx0Z3JpZE9iamVjdC5mb3JFYWNoKChzcXVhcmVPYmopID0+IHtcblx0XHRncmlkSFRNTC5jaGlsZE5vZGVzLmZvckVhY2goKHJvd0hUTUwpID0+IHtcblx0XHRcdHJvd0hUTUwuY2hpbGROb2Rlcy5mb3JFYWNoKChzcSkgPT4ge1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0c3F1YXJlT2JqLnggPT09ICtzcS5nZXRBdHRyaWJ1dGUoJ2RhdGEteCcpICYmXG5cdFx0XHRcdFx0c3F1YXJlT2JqLnkgPT09ICtzcS5nZXRBdHRyaWJ1dGUoJ2RhdGEteScpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHNxdWFyZUhUTUwgPSBzcTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHRpZiAoIXNxdWFyZU9iai5vY2N1cGllZCAmJiAhc3F1YXJlT2JqLmhpdFRha2VuKSB7XG5cdFx0XHRzcXVhcmVIVE1MLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2IoMzEsIDQxLCA1NSknO1xuXHRcdH0gZWxzZSBpZiAoc3F1YXJlT2JqLm9jY3VwaWVkICYmICFzcXVhcmVPYmouaGl0VGFrZW4gJiYgcGxheWVyICE9PSAnYWknKSB7XG5cdFx0XHRpZiAoc3F1YXJlT2JqLnNoaXBUeXBlID09PSBzaGlwVHlwZXNbNF0udHlwZSkge1xuXHRcdFx0XHRzcXVhcmVIVE1MLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHNoaXBUeXBlc1s0XS5jb2xvcjtcblx0XHRcdH0gZWxzZSBpZiAoc3F1YXJlT2JqLnNoaXBUeXBlID09PSBzaGlwVHlwZXNbM10udHlwZSkge1xuXHRcdFx0XHRzcXVhcmVIVE1MLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHNoaXBUeXBlc1szXS5jb2xvcjtcblx0XHRcdH0gZWxzZSBpZiAoc3F1YXJlT2JqLnNoaXBUeXBlID09PSBzaGlwVHlwZXNbMl0udHlwZSkge1xuXHRcdFx0XHRzcXVhcmVIVE1MLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHNoaXBUeXBlc1syXS5jb2xvcjtcblx0XHRcdH0gZWxzZSBpZiAoc3F1YXJlT2JqLnNoaXBUeXBlID09PSBzaGlwVHlwZXNbMV0udHlwZSkge1xuXHRcdFx0XHRzcXVhcmVIVE1MLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHNoaXBUeXBlc1sxXS5jb2xvcjtcblx0XHRcdH0gZWxzZSBpZiAoc3F1YXJlT2JqLnNoaXBUeXBlID09PSBzaGlwVHlwZXNbMF0udHlwZSkge1xuXHRcdFx0XHRzcXVhcmVIVE1MLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHNoaXBUeXBlc1swXS5jb2xvcjtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKCFzcXVhcmVPYmoub2NjdXBpZWQgJiYgc3F1YXJlT2JqLmhpdFRha2VuKSB7XG5cdFx0XHRzcXVhcmVIVE1MLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2IoODgsIDg4LCA4OCknO1xuXHRcdH0gZWxzZSBpZiAoc3F1YXJlT2JqLm9jY3VwaWVkICYmIHNxdWFyZU9iai5oaXRUYWtlbikge1xuXHRcdFx0c3F1YXJlSFRNTC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDk4LCAwLCAwKSc7XG5cdFx0fVxuXHR9KTtcbn1cblxuZnVuY3Rpb24gcmVzZXRHcmlkSFRNTChwbGF5ZXIpIHtcblx0Y29uc3QgZ3JpZEhUTUwgPSBoZWxwZXJDaG9vc2VQbGF5ZXJHcmlkKHBsYXllcik7XG5cblx0Z3JpZEhUTUwuY2hpbGROb2Rlcy5mb3JFYWNoKChyb3dIVE1MKSA9PiB7XG5cdFx0cm93SFRNTC5jaGlsZE5vZGVzLmZvckVhY2goKHNxKSA9PiB7XG5cdFx0XHRzcS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDMxLCA0MSwgNTUpJztcblx0XHR9KTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUdyaWRMaXN0ZW5lcnMoKSB7XG5cdGNvbnN0IHBsYXllckJvYXJkQ2xvbmUgPSBwbGF5ZXJCb2FyZC5jbG9uZU5vZGUodHJ1ZSk7XG5cdGNvbnN0IGFpQm9hcmRDbG9uZSA9IGFpQm9hcmQuY2xvbmVOb2RlKHRydWUpO1xuXG5cdHBsYXllckJvYXJkLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHBsYXllckJvYXJkQ2xvbmUsIHBsYXllckJvYXJkKTtcblx0YWlCb2FyZC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChhaUJvYXJkQ2xvbmUsIGFpQm9hcmQpO1xuXG5cdHBsYXllckJvYXJkID0gcGxheWVyQm9hcmRDbG9uZTtcblx0YWlCb2FyZCA9IGFpQm9hcmRDbG9uZTtcbn1cblxuZnVuY3Rpb24gYWRkRmxlZXREZXBsb3ltZW50TGlzdGVuZXIob3JpZW50YXRpb24sIGdhbWVib2FyZE9iaikge1xuXHRyZW1vdmVHcmlkTGlzdGVuZXJzKCk7XG5cblx0cGxheWVyQm9hcmQuY2hpbGROb2Rlcy5mb3JFYWNoKChyb3dIVE1MKSA9PiB7XG5cdFx0cm93SFRNTC5jaGlsZE5vZGVzLmZvckVhY2goKHNxKSA9PiB7XG5cdFx0XHRjb25zdCBzcVggPSArc3EuZ2V0QXR0cmlidXRlKCdkYXRhLXgnKTtcblx0XHRcdGNvbnN0IHNxWSA9ICtzcS5nZXRBdHRyaWJ1dGUoJ2RhdGEteScpO1xuXHRcdFx0bGV0IHNoaXBUeXBlT2JqO1xuXHRcdFx0bGV0IHNoaXBMZW5ndGg7XG5cblx0XHRcdC8vIENoZWNrIGlmIHBhcnRpY3VsYXIgc2hpcCB0eXBlIGhhcyBiZWVuIGFscmVhZHkgZGVwbG95ZWRcblx0XHRcdGlmICghZ2FtZWJvYXJkT2JqLmdyaWQuc29tZSgoZWwpID0+IGVsLnNoaXBUeXBlID09PSBzaGlwVHlwZXNbMF0udHlwZSkpIHtcblx0XHRcdFx0c2hpcExlbmd0aCA9IHNoaXBUeXBlc1swXS5sZW5ndGg7XG5cdFx0XHRcdHNoaXBUeXBlT2JqID0gc2hpcFR5cGVzWzBdO1xuXHRcdFx0fSBlbHNlIGlmIChcblx0XHRcdFx0IWdhbWVib2FyZE9iai5ncmlkLnNvbWUoKGVsKSA9PiBlbC5zaGlwVHlwZSA9PT0gc2hpcFR5cGVzWzFdLnR5cGUpXG5cdFx0XHQpIHtcblx0XHRcdFx0c2hpcExlbmd0aCA9IHNoaXBUeXBlc1sxXS5sZW5ndGg7XG5cdFx0XHRcdHNoaXBUeXBlT2JqID0gc2hpcFR5cGVzWzFdO1xuXHRcdFx0fSBlbHNlIGlmIChcblx0XHRcdFx0IWdhbWVib2FyZE9iai5ncmlkLnNvbWUoKGVsKSA9PiBlbC5zaGlwVHlwZSA9PT0gc2hpcFR5cGVzWzJdLnR5cGUpXG5cdFx0XHQpIHtcblx0XHRcdFx0c2hpcExlbmd0aCA9IHNoaXBUeXBlc1syXS5sZW5ndGg7XG5cdFx0XHRcdHNoaXBUeXBlT2JqID0gc2hpcFR5cGVzWzJdO1xuXHRcdFx0fSBlbHNlIGlmIChcblx0XHRcdFx0IWdhbWVib2FyZE9iai5ncmlkLnNvbWUoKGVsKSA9PiBlbC5zaGlwVHlwZSA9PT0gc2hpcFR5cGVzWzNdLnR5cGUpXG5cdFx0XHQpIHtcblx0XHRcdFx0c2hpcExlbmd0aCA9IHNoaXBUeXBlc1szXS5sZW5ndGg7XG5cdFx0XHRcdHNoaXBUeXBlT2JqID0gc2hpcFR5cGVzWzNdO1xuXHRcdFx0fSBlbHNlIGlmIChcblx0XHRcdFx0IWdhbWVib2FyZE9iai5ncmlkLnNvbWUoKGVsKSA9PiBlbC5zaGlwVHlwZSA9PT0gc2hpcFR5cGVzWzRdLnR5cGUpXG5cdFx0XHQpIHtcblx0XHRcdFx0c2hpcExlbmd0aCA9IHNoaXBUeXBlc1s0XS5sZW5ndGg7XG5cdFx0XHRcdHNoaXBUeXBlT2JqID0gc2hpcFR5cGVzWzRdO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDaGVjayBpZiBzaGlwIGNhbiBiZSBidWlsdFxuXHRcdFx0Y29uc3Qgbm9TcGFjZSA9IGdhbWVib2FyZE9iai5jaGVja1NwYWNlRm9yU2hpcChcblx0XHRcdFx0c3FYLFxuXHRcdFx0XHRzcVksXG5cdFx0XHRcdHNoaXBMZW5ndGgsXG5cdFx0XHRcdG9yaWVudGF0aW9uXG5cdFx0XHQpO1xuXG5cdFx0XHQvLyBTaG93IG9uIGdyaWQgaWYgc2hpcCBjYW4gYmUgYWRkZWRcblx0XHRcdHNxLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcblx0XHRcdFx0aWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcblx0XHRcdFx0XHRmb3IgKGxldCBpID0gc3FYOyBpIDwgc3FYICsgc2hpcExlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRpZiAoaSA+IDEwKSBicmVhaztcblxuXHRcdFx0XHRcdFx0cGxheWVyQm9hcmQuY2hpbGROb2Rlcy5mb3JFYWNoKChydykgPT4ge1xuXHRcdFx0XHRcdFx0XHRydy5jaGlsZE5vZGVzLmZvckVhY2goKHNxcikgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0XHRcdCtzcXIuZ2V0QXR0cmlidXRlKCdkYXRhLXgnKSA9PT0gaSAmJlxuXHRcdFx0XHRcdFx0XHRcdFx0K3Nxci5nZXRBdHRyaWJ1dGUoJ2RhdGEteScpID09PSBzcVlcblx0XHRcdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdC8vIElmIHNoaXAgY2FuJ3QgYmUgYnVpbHQgZ3JheSBvdXQgc3F1YXJlc1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKG5vU3BhY2UpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0c3FyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2IoODgsIDg4LCA4OCknO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBPdGhlcndpc2Ugc2hvdyBwcm9wZXIgc2hpcCBjb2xvclxuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0c3FyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHNoaXBUeXBlT2JqLmNvbG9yO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcblx0XHRcdFx0XHRmb3IgKGxldCBpID0gc3FZOyBpIDwgc3FZICsgc2hpcExlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRpZiAoaSA+IDEwKSBicmVhaztcblxuXHRcdFx0XHRcdFx0cGxheWVyQm9hcmQuY2hpbGROb2Rlcy5mb3JFYWNoKChydykgPT4ge1xuXHRcdFx0XHRcdFx0XHRydy5jaGlsZE5vZGVzLmZvckVhY2goKHNxcikgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0XHRcdCtzcXIuZ2V0QXR0cmlidXRlKCdkYXRhLXgnKSA9PT0gc3FYICYmXG5cdFx0XHRcdFx0XHRcdFx0XHQrc3FyLmdldEF0dHJpYnV0ZSgnZGF0YS15JykgPT09IGlcblx0XHRcdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChub1NwYWNlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNxci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDg4LCA4OCwgODgpJztcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNxci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzaGlwVHlwZU9iai5jb2xvcjtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gV2hlbiBsZWF2aW5nIGdyaWQgY2VsbCByZW1vdmUgZGVwbG95bWVudCBpbmRpY2F0aW9uXG5cdFx0XHRzcS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuXHRcdFx0XHRwb3B1bGF0ZUJvYXJkSFRNTCgncGxheWVyJywgZ2FtZWJvYXJkT2JqLmdyaWQpO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vIE9uIGNsaWNrIGFkZCBzaGlwIHRvIHBsYXllcidzIGJvYXJkIG9iamVjdFxuXHRcdFx0c3EuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRcdGlmICghbm9TcGFjZSkge1xuXHRcdFx0XHRcdGdhbWVib2FyZE9iai5hZGRTaGlwKHNxWCwgc3FZLCBvcmllbnRhdGlvbiwgc2hpcFR5cGVPYmoudHlwZSk7XG5cdFx0XHRcdFx0cmVtb3ZlR3JpZExpc3RlbmVycygpO1xuXHRcdFx0XHRcdGFkZEZsZWV0RGVwbG95bWVudExpc3RlbmVyKG9yaWVudGF0aW9uLCBnYW1lYm9hcmRPYmopO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGVuZEdhbWUod2lubmVyKSB7XG4gICAgZ2FtZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzaHJpbmsnKTtcblxuICAgIGlmICh3aW5uZXIgPT09ICdwbGF5ZXInKSB7XG4gICAgICAgIHBsYXllckJvYXJkLmNsYXNzTGlzdC5hZGQoJ3dpbm5lcicpO1xuICAgICAgICBhaUJvYXJkLmNsYXNzTGlzdC5hZGQoJ2xvc2VyJyk7XG4gICAgICAgIHNjb3JlLmlubmVySFRNTCA9ICdZb3Ugd29uISdcbiAgICB9IGVsc2UgaWYgKHdpbm5lciA9PT0gJ2FpJykge1xuICAgICAgICBwbGF5ZXJCb2FyZC5jbGFzc0xpc3QuYWRkKCdsb3NlcicpO1xuICAgICAgICBhaUJvYXJkLmNsYXNzTGlzdC5hZGQoJ3dpbm5lcicpO1xuICAgICAgICBzY29yZS5pbm5lckhUTUwgPSAnQUkgd29uISdcbiAgICB9XG5cbiAgICBzY29yZS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgIHJlc3RhcnRCdG4uc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcbn1cblxuZnVuY3Rpb24gYWRkR2FtZXBsYXlMaXN0ZW5lcnMoYWlPYmplY3QsIHBsYXllck9iamVjdCkge1xuXHRhaUJvYXJkLmNoaWxkTm9kZXMuZm9yRWFjaCgocm93SFRNTCkgPT4ge1xuXHRcdHJvd0hUTUwuY2hpbGROb2Rlcy5mb3JFYWNoKChzcSkgPT4ge1xuXHRcdFx0Y29uc3Qgc3FYID0gK3NxLmdldEF0dHJpYnV0ZSgnZGF0YS14Jyk7XG5cdFx0XHRjb25zdCBzcVkgPSArc3EuZ2V0QXR0cmlidXRlKCdkYXRhLXknKTtcblxuXHRcdFx0c3EuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGF0dGFjayA9IGFpT2JqZWN0LmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHNxWCwgc3FZKTtcblx0XHRcdFx0aWYgKGF0dGFjayAmJiAhcGxheWVyT2JqZWN0LmdhbWVXb24pIHtcblx0XHRcdFx0XHRhaU9iamVjdC5yYW5kb21BdHRhY2socGxheWVyT2JqZWN0LmdhbWVib2FyZCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRwb3B1bGF0ZUJvYXJkSFRNTCgncGxheWVyJywgcGxheWVyT2JqZWN0LmdhbWVib2FyZC5ncmlkKTtcblx0XHRcdFx0cG9wdWxhdGVCb2FyZEhUTUwoJ2FpJywgYWlPYmplY3QuZ2FtZWJvYXJkLmdyaWQpO1xuXG5cdFx0XHRcdGlmIChhaU9iamVjdC5nYW1lYm9hcmQuZ2FtZUxvc3QpIHtcblx0XHRcdFx0XHRyZW1vdmVHcmlkTGlzdGVuZXJzKCk7XG5cdFx0XHRcdFx0ZW5kR2FtZSgncGxheWVyJyk7XG5cdFx0XHRcdH0gZWxzZSBpZiAocGxheWVyT2JqZWN0LmdhbWVib2FyZC5nYW1lTG9zdCkge1xuXHRcdFx0XHRcdHJlbW92ZUdyaWRMaXN0ZW5lcnMoKTtcblx0XHRcdFx0XHRlbmRHYW1lKCdhaScpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSk7XG59XG5cbnN0YXJ0QnRuLm9uY2xpY2sgPSAoKSA9PiB7XG5cdGFpQm9hcmQuc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcblx0b3B0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRyZW1vdmVHcmlkTGlzdGVuZXJzKCk7XG59O1xuXG5yZXN0YXJ0QnRuLm9uY2xpY2sgPSAoKSA9PiB7XG5cdHJlc2V0R3JpZEhUTUwoJ3BsYXllcicpO1xuXHRyZXNldEdyaWRIVE1MKCdhaScpO1xuXG5cdGdhbWVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2hyaW5rJyk7XG5cdGFpQm9hcmQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0b3B0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgIHNjb3JlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgcmVzdGFydEJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG5cdHBsYXllckJvYXJkLmNsYXNzTGlzdC5yZW1vdmUoJ3dpbm5lcicsICdsb3NlcicpO1xuICAgIGFpQm9hcmQuY2xhc3NMaXN0LnJlbW92ZSgnd2lubmVyJywgJ2xvc2VyJyk7XG59O1xuXG5leHBvcnQge1xuXHRzdGFydEJ0bixcblx0cmFuZG9tQnRuLFxuXHRyZXN0YXJ0QnRuLFxuXHRwb3B1bGF0ZUJvYXJkSFRNTCxcblx0cmVzZXRHcmlkSFRNTCxcblx0YWRkRmxlZXREZXBsb3ltZW50TGlzdGVuZXIsXG5cdGFkZEdhbWVwbGF5TGlzdGVuZXJzLFxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWxvb3AtZnVuYyAqL1xuaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwJztcblxuZnVuY3Rpb24gR2FtZWJvYXJkKCkge1xuXHRsZXQgZ3JpZDtcblxuXHRjb25zdCBjcmVhdGVHcmlkID0gKCkgPT4ge1xuXHRcdGNvbnN0IGdyaWRBcnJheSA9IFtdO1xuXHRcdGZvciAobGV0IGkgPSAxOyBpIDwgMTE7IGkrKykge1xuXHRcdFx0Zm9yIChsZXQgaiA9IDE7IGogPCAxMTsgaisrKSB7XG5cdFx0XHRcdGdyaWRBcnJheS5wdXNoKHtcblx0XHRcdFx0XHR4OiBpLFxuXHRcdFx0XHRcdHk6IGosXG5cdFx0XHRcdFx0b2NjdXBpZWQ6IGZhbHNlLFxuXHRcdFx0XHRcdHNoaXBUeXBlOiBmYWxzZSxcblx0XHRcdFx0XHRoaXRUYWtlbjogZmFsc2UsXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRncmlkID0gZ3JpZEFycmF5O1xuXHR9O1xuXHRjcmVhdGVHcmlkKCk7XG5cblx0cmV0dXJuIHtcblx0XHRncmlkLFxuXHRcdGdhbWVMb3N0OiBmYWxzZSxcblxuXHRcdGNsZWFyR3JpZCgpIHtcblx0XHRcdHRoaXMuZ3JpZC5mb3JFYWNoKChzcXVhcmUpID0+IHtcblx0XHRcdFx0c3F1YXJlLm9jY3VwaWVkID0gZmFsc2U7XG5cdFx0XHRcdHNxdWFyZS5zaGlwVHlwZSA9IGZhbHNlO1xuXHRcdFx0XHRzcXVhcmUuaGl0VGFrZW4gPSBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvLyBDaGVjayBpZiB0aGVyZSBpcyBzcGFjZSB0byBjcmVhdGUgc2hpcCBhbmQgY29vcmRzIGFyZSBpbiByYW5nZVxuXHRcdGNoZWNrU3BhY2VGb3JTaGlwKHhDb29yZCwgeUNvb3JkLCBsZW5ndGgsIG9yaWVudGF0aW9uKSB7XG5cdFx0XHRjb25zdCBzdGFydFNxdWFyZSA9IHRoaXMuZ2V0U3F1YXJlKHhDb29yZCwgeUNvb3JkKTtcblx0XHRcdGxldCBub1NwYWNlID0gZmFsc2U7XG5cblx0XHRcdGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG5cdFx0XHRcdGZvciAobGV0IGkgPSB4Q29vcmQ7IGkgPCB4Q29vcmQgKyBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGlmIChpID4gMTApIHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdHRoaXMuZ3JpZC5mb3JFYWNoKChzcXVhcmUpID0+IHtcblx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0c3F1YXJlLnggPT09IGkgJiZcblx0XHRcdFx0XHRcdFx0c3F1YXJlLnkgPT09IHN0YXJ0U3F1YXJlLnkgJiZcblx0XHRcdFx0XHRcdFx0c3F1YXJlLm9jY3VwaWVkXG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0bm9TcGFjZSA9IHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IHlDb29yZDsgaSA8IHlDb29yZCArIGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0aWYgKGkgPiAxMCkgcmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0dGhpcy5ncmlkLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0XHRzcXVhcmUueCA9PT0gc3RhcnRTcXVhcmUueCAmJlxuXHRcdFx0XHRcdFx0XHRzcXVhcmUueSA9PT0gaSAmJlxuXHRcdFx0XHRcdFx0XHRzcXVhcmUub2NjdXBpZWRcblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRub1NwYWNlID0gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG5vU3BhY2U7XG5cdFx0fSxcblxuXHRcdGFkZFNoaXAoeENvb3JkLCB5Q29vcmQsIG9yaWVudGF0aW9uLCBzaGlwVHlwZSkge1xuXHRcdFx0Y29uc3Qgc3RhcnRTcXVhcmUgPSB0aGlzLmdldFNxdWFyZSh4Q29vcmQsIHlDb29yZCk7XG5cdFx0XHRsZXQgbGVuZ3RoO1xuXG5cdFx0XHRpZiAoc2hpcFR5cGUgPT09ICdQYXRyb2wgQm9hdCcpIHtcblx0XHRcdFx0bGVuZ3RoID0gMjtcblx0XHRcdH0gZWxzZSBpZiAoc2hpcFR5cGUgPT09ICdTdWJtYXJpbmUnKSB7XG5cdFx0XHRcdGxlbmd0aCA9IDM7XG5cdFx0XHR9IGVsc2UgaWYgKHNoaXBUeXBlID09PSAnRGVzdHJveWVyJykge1xuXHRcdFx0XHRsZW5ndGggPSAzO1xuXHRcdFx0fSBlbHNlIGlmIChzaGlwVHlwZSA9PT0gJ0JhdHRsZXNoaXAnKSB7XG5cdFx0XHRcdGxlbmd0aCA9IDQ7XG5cdFx0XHR9IGVsc2UgaWYgKHNoaXBUeXBlID09PSAnQ2FycmllcicpIHtcblx0XHRcdFx0bGVuZ3RoID0gNTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHN0YXJ0U3F1YXJlLm9jY3VwaWVkKSByZXR1cm4gZmFsc2U7XG5cblx0XHRcdGNvbnN0IG5vU3BhY2UgPSB0aGlzLmNoZWNrU3BhY2VGb3JTaGlwKFxuXHRcdFx0XHR4Q29vcmQsXG5cdFx0XHRcdHlDb29yZCxcblx0XHRcdFx0bGVuZ3RoLFxuXHRcdFx0XHRvcmllbnRhdGlvblxuXHRcdFx0KTtcblx0XHRcdGlmIChub1NwYWNlKSByZXR1cm4gZmFsc2U7XG5cblx0XHRcdC8vIEJ1aWxkIHNoaXBcblx0XHRcdGNvbnN0IG5ld1NoaXAgPSBTaGlwKGxlbmd0aCk7XG5cdFx0XHRpZiAob3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuXHRcdFx0XHRmb3IgKGxldCBpID0geENvb3JkOyBpIDwgeENvb3JkICsgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR0aGlzLmdyaWQuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS54ID09PSBpICYmXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS55ID09PSBzdGFydFNxdWFyZS55ICYmXG5cdFx0XHRcdFx0XHRcdCFzcXVhcmUub2NjdXBpZWRcblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRzcXVhcmUub2NjdXBpZWQgPSBuZXdTaGlwO1xuXHRcdFx0XHRcdFx0XHRzcXVhcmUuc2hpcFR5cGUgPSBzaGlwVHlwZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuXHRcdFx0XHRmb3IgKGxldCBpID0geUNvb3JkOyBpIDwgeUNvb3JkICsgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR0aGlzLmdyaWQuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS54ID09PSBzdGFydFNxdWFyZS54ICYmXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS55ID09PSBpICYmXG5cdFx0XHRcdFx0XHRcdCFzcXVhcmUub2NjdXBpZWRcblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRzcXVhcmUub2NjdXBpZWQgPSBuZXdTaGlwO1xuXHRcdFx0XHRcdFx0XHRzcXVhcmUuc2hpcFR5cGUgPSBzaGlwVHlwZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblxuXHRcdHJhbmRvbUZsZWV0UGxhY2VtZW50KCkge1xuXHRcdFx0dGhpcy5yYW5kb21TaGlwUGxhY2VtZW50KCdQYXRyb2wgQm9hdCcpO1xuXHRcdFx0dGhpcy5yYW5kb21TaGlwUGxhY2VtZW50KCdTdWJtYXJpbmUnKTtcblx0XHRcdHRoaXMucmFuZG9tU2hpcFBsYWNlbWVudCgnRGVzdHJveWVyJyk7XG5cdFx0XHR0aGlzLnJhbmRvbVNoaXBQbGFjZW1lbnQoJ0JhdHRsZXNoaXAnKTtcblx0XHRcdHRoaXMucmFuZG9tU2hpcFBsYWNlbWVudCgnQ2FycmllcicpO1xuXHRcdH0sXG5cblx0XHRyYW5kb21TaGlwUGxhY2VtZW50KHNoaXBUeXBlKSB7XG5cdFx0XHRsZXQgc2hpcEJ1aWx0ID0gZmFsc2U7XG5cblx0XHRcdHdoaWxlICghc2hpcEJ1aWx0KSB7XG5cdFx0XHRcdGxldCBvcmllbnRhdGlvbjtcblx0XHRcdFx0Y29uc3Qgb3JpZW50YXRpb25OdW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKSArIDE7XG5cdFx0XHRcdGNvbnN0IHhDb29yZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG5cdFx0XHRcdGNvbnN0IHlDb29yZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG5cblx0XHRcdFx0aWYgKG9yaWVudGF0aW9uTnVtYmVyID09PSAxKSB7XG5cdFx0XHRcdFx0b3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0b3JpZW50YXRpb24gPSAndmVydGljYWwnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0c2hpcEJ1aWx0ID0gdGhpcy5hZGRTaGlwKHhDb29yZCwgeUNvb3JkLCBvcmllbnRhdGlvbiwgc2hpcFR5cGUpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRnZXRTcXVhcmUoeENvb3JkLCB5Q29vcmQpIHtcblx0XHRcdHJldHVybiB0aGlzLmdyaWQuZmluZChcblx0XHRcdFx0KHNxdWFyZSkgPT4gc3F1YXJlLnggPT09IHhDb29yZCAmJiBzcXVhcmUueSA9PT0geUNvb3JkXG5cdFx0XHQpO1xuXHRcdH0sXG5cblx0XHRyZWNlaXZlQXR0YWNrKHhDb29yZCwgeUNvb3JkKSB7XG5cdFx0XHRjb25zdCBzcXVhcmUgPSB0aGlzLmdyaWQuZmluZCgoc3EpID0+IHNxLnggPT09IHhDb29yZCAmJiBzcS55ID09PSB5Q29vcmQpO1xuXG5cdFx0XHRpZiAoc3F1YXJlLmhpdFRha2VuKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmICghc3F1YXJlLm9jY3VwaWVkICYmICFzcXVhcmUuaGl0VGFrZW4pIHtcblx0XHRcdFx0c3F1YXJlLmhpdFRha2VuID0gdHJ1ZTtcblx0XHRcdH0gZWxzZSBpZiAoc3F1YXJlLm9jY3VwaWVkICYmICFzcXVhcmUuaGl0VGFrZW4pIHtcblx0XHRcdFx0c3F1YXJlLmhpdFRha2VuID0gdHJ1ZTtcblx0XHRcdFx0c3F1YXJlLm9jY3VwaWVkLnRha2VIaXQoKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuY2hlY2tGbGVldENvbmRpdGlvbigpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblxuXHRcdGNoZWNrRmxlZXRDb25kaXRpb24oKSB7XG5cdFx0XHRjb25zdCBmbGVldEFsaXZlID0gdGhpcy5ncmlkLnNvbWUoXG5cdFx0XHRcdChzcXVhcmUpID0+IHNxdWFyZS5vY2N1cGllZCAmJiAhc3F1YXJlLmhpdFRha2VuXG5cdFx0XHQpO1xuXHRcdFx0aWYgKCFmbGVldEFsaXZlKSB7XG5cdFx0XHRcdHRoaXMuZ2FtZUxvc3QgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH0sXG5cdH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmQnO1xuXG5mdW5jdGlvbiBQbGF5ZXIoKSB7XG5cdHJldHVybiB7XG5cdFx0Z2FtZWJvYXJkOiBHYW1lYm9hcmQoKSxcblx0XHRnYW1lV29uOiBmYWxzZSxcblxuXHRcdGF0dGFjayh4Q29vcmQsIHlDb29yZCwgZW5lbXlCb2FyZCkge1xuXHRcdFx0ZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHhDb29yZCwgeUNvb3JkKTtcblx0XHRcdGlmIChlbmVteUJvYXJkLmdhbWVMb3N0KSB7XG5cdFx0XHRcdHRoaXMuZ2FtZVdvbiA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHJhbmRvbUF0dGFjayhlbmVteUJvYXJkKSB7XG5cdFx0XHRsZXQgc2hvdEZpcmVkID0gZmFsc2U7XG5cblx0XHRcdHdoaWxlICghc2hvdEZpcmVkKSB7XG5cdFx0XHRcdGNvbnN0IHhDb29yZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG5cdFx0XHRcdGNvbnN0IHlDb29yZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG5cblx0XHRcdFx0c2hvdEZpcmVkID0gZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHhDb29yZCwgeUNvb3JkKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGVuZW15Qm9hcmQuZ2FtZUxvc3QpIHtcblx0XHRcdFx0dGhpcy5nYW1lV29uID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9LFxuXHR9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCJmdW5jdGlvbiBTaGlwKGxlbmd0aCkge1xuXHRyZXR1cm4ge1xuXHRcdGxlbmd0aCxcblx0XHRoaXRzVGFrZW46IDAsXG5cdFx0aXNTdW5rOiBmYWxzZSxcblxuXHRcdHRha2VIaXQoKSB7XG5cdFx0XHR0aGlzLmhpdHNUYWtlbiArPSAxO1xuXHRcdFx0dGhpcy5jaGVja0hQKCk7XG5cdFx0fSxcblxuXHRcdGNoZWNrSFAoKSB7XG5cdFx0XHRpZiAodGhpcy5oaXRzVGFrZW4gPj0gdGhpcy5sZW5ndGgpIHtcblx0XHRcdFx0dGhpcy5pc1N1bmsgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH0sXG5cdH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gJy4vZmFjdG9yaWVzL3BsYXllcic7XG5pbXBvcnQge1xuXHRzdGFydEJ0bixcblx0cmFuZG9tQnRuLFxuXHRyZXN0YXJ0QnRuLFxuXHRwb3B1bGF0ZUJvYXJkSFRNTCxcblx0cmVzZXRHcmlkSFRNTCxcblx0YWRkRmxlZXREZXBsb3ltZW50TGlzdGVuZXIsXG5cdGFkZEdhbWVwbGF5TGlzdGVuZXJzLFxufSBmcm9tICcuL0RPTSc7XG5cbi8vIEluaXRpYWxpemUgcGxheWVyc1xuY29uc3QgcGxheWVyID0gUGxheWVyKCk7XG5jb25zdCBhaSA9IFBsYXllcigpO1xuXG4vLyBBSSByYW5kb20gZmxlZXQgZGVwbG95bWVudFxuYWkuZ2FtZWJvYXJkLnJhbmRvbUZsZWV0UGxhY2VtZW50KCk7XG5cbmNvbnNvbGUubG9nIChhaS5nYW1lYm9hcmQuZ3JpZClcblxuLy8gUGxheWVyIHJhbmRvbSBmbGVldCBkZXBsb3ltZW50XG5yYW5kb21CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdHBsYXllci5nYW1lYm9hcmQuY2xlYXJHcmlkKCk7XG5cdHJlc2V0R3JpZEhUTUwoJ3BsYXllcicpO1xuXHRwbGF5ZXIuZ2FtZWJvYXJkLnJhbmRvbUZsZWV0UGxhY2VtZW50KCk7XG5cdHBvcHVsYXRlQm9hcmRIVE1MKCdwbGF5ZXInLCBwbGF5ZXIuZ2FtZWJvYXJkLmdyaWQpO1xufSk7XG5cbi8vIFBsYXllciBtYW51YWwgZmxlZXQgZGVwbG95bWVudFxubGV0IG9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xuXG5hZGRGbGVldERlcGxveW1lbnRMaXN0ZW5lcihvcmllbnRhdGlvbiwgcGxheWVyLmdhbWVib2FyZCk7XG5cbi8vIFRvZ2dsZSBzaGlwIG9yaWVudGF0aW9uXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB7XG5cdGlmIChlLmNvZGUgPT09ICdLZXlSJykge1xuXHRcdGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG5cdFx0XHRvcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCc7XG5cdFx0fSBlbHNlIGlmIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuXHRcdFx0b3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG5cdFx0fVxuXHRcdHJlc2V0R3JpZEhUTUwoJ3BsYXllcicpO1xuXHRcdHBvcHVsYXRlQm9hcmRIVE1MKCdwbGF5ZXInLCBwbGF5ZXIuZ2FtZWJvYXJkLmdyaWQpO1xuICAgICAgICBhZGRGbGVldERlcGxveW1lbnRMaXN0ZW5lcihvcmllbnRhdGlvbiwgcGxheWVyLmdhbWVib2FyZCk7XG5cdH1cbn0pO1xuXG5zdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0Ly8gQ2hlY2sgaWYgZmxlZXQgaXMgZGVwbG95ZWRcblx0Y29uc3QgZmxlZXREZXBsb3llZCA9IFtdO1xuXHRwbGF5ZXIuZ2FtZWJvYXJkLmdyaWQuZm9yRWFjaChzcSA9PiB7XG5cdFx0aWYgKHNxLm9jY3VwaWVkKSBmbGVldERlcGxveWVkLnB1c2godHJ1ZSk7XG5cdH0pO1x0XG5cdC8vIElmIG5vdCwgZGVwbG95IHJhbmRvbWx5XG5cdGlmIChmbGVldERlcGxveWVkLmxlbmd0aCAhPT0gMTcpIHtcblx0XHRyYW5kb21CdG4uY2xpY2soKTtcblx0fVxuXG5cdGFkZEdhbWVwbGF5TGlzdGVuZXJzKGFpLCBwbGF5ZXIpO1xufSk7XG5cbnJlc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdHBsYXllci5nYW1lYm9hcmQuY2xlYXJHcmlkKCk7XG5cdGFpLmdhbWVib2FyZC5jbGVhckdyaWQoKTtcblxuXHRhZGRGbGVldERlcGxveW1lbnRMaXN0ZW5lcihvcmllbnRhdGlvbiwgcGxheWVyLmdhbWVib2FyZCk7XG59KTsiLCJjb25zdCBzaGlwVHlwZXMgPSBbXG5cdHsgdHlwZTogJ0NhcnJpZXInLCBsZW5ndGg6IDUsIGNvbG9yOiAncmdiKDI1MCwgMTA4LCA1NiknIH0sXG5cdHsgdHlwZTogJ0JhdHRsZXNoaXAnLCBsZW5ndGg6IDQsIGNvbG9yOiAncmdiKDI1NSwgMTU1LCAxMzMpJyB9LFxuXHR7IHR5cGU6ICdEZXN0cm95ZXInLCBsZW5ndGg6IDMsIGNvbG9yOiAncmdiKDI0NiwgMjE1LCA2MCknIH0sXG5cdHsgdHlwZTogJ1N1Ym1hcmluZScsIGxlbmd0aDogMywgY29sb3I6ICdyZ2IoMCwgMTg0LCAxNDQpJyB9LFxuXHR7IHR5cGU6ICdQYXRyb2wgQm9hdCcsIGxlbmd0aDogMiwgY29sb3I6ICdyZ2IoODAsIDE4MCwgMjI2KScgfSxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IHNoaXBUeXBlczsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJvYm90bytNb25vOndnaHRANjAwJmZhbWlseT1VbmJvdW5kZWQ6d2dodEA4MDAmZGlzcGxheT1zd2FwKTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxZjI5Mzc7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgbWluLXdpZHRoOiA5NTBweDtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBtaW4taGVpZ2h0OiA3MjBweDtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIE1vbm8nLCBtb25vc3BhY2U7IH1cXG5cXG4udGl0bGUge1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMzBweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBjb2xvcjogd2hpdGU7XFxuICBmb250LWZhbWlseTogJ1VuYm91bmRlZCcsIGN1cnNpdmU7XFxuICBmb250LXNpemU6IDgwcHg7XFxuICBtYXJnaW4tdG9wOiAzMHB4OyB9XFxuXFxuLnNjb3JlIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgdG9wOiAyMyU7XFxuICB6LWluZGV4OiAxO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiA0MHB4O1xcbiAgdHJhbnNpdGlvbjogYWxsIDFzOyB9XFxuXFxuLnJlc3RhcnQge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3R0b206IDE1JTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMC44NSk7XFxuICB0cmFuc2l0aW9uOiBhbGwgMXM7IH1cXG5cXG4uZ2FtZS1jb250YWluZXIuc2hyaW5rIHtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMC42KTsgfVxcblxcbi5sb3NlciB7XFxuICBib3gtc2hhZG93OiAwcHggMHB4IDI5cHggMTZweCAjNjIwMDAwOyB9XFxuXFxuLndpbm5lciB7XFxuICBib3gtc2hhZG93OiAwcHggMHB4IDI5cHggMTZweCAjMDA2MjAwOyB9XFxuXFxuLmdhbWUtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDEwMHB4O1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDFzOyB9XFxuICAuZ2FtZS1jb250YWluZXIgLmxlZnQsXFxuICAuZ2FtZS1jb250YWluZXIgLnJpZ2h0IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgd2lkdGg6IDUwdnc7XFxuICAgIGhlaWdodDogNTAwcHg7XFxuICAgIG1hcmdpbi10b3A6IC0yJTsgfVxcbiAgLmdhbWUtY29udGFpbmVyIC5sZWZ0IHtcXG4gICAganVzdGlmeS1jb250ZW50OiBlbmQ7IH1cXG4gIC5nYW1lLWNvbnRhaW5lciAucmlnaHQge1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHN0YXJ0OyB9XFxuICAuZ2FtZS1jb250YWluZXIgLm9wdGlvbnMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgZmxleC1zaHJpbms6IDA7XFxuICAgIGdhcDogMjBweDtcXG4gICAgd2lkdGg6IDM4MHB4O1xcbiAgICBoZWlnaHQ6IDUwMHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGZvbnQtc2l6ZTogMzNweDtcXG4gICAgbGluZS1oZWlnaHQ6IDUycHg7IH1cXG4gICAgLmdhbWUtY29udGFpbmVyIC5vcHRpb25zIC5yb3RhdGUtaW5zdHJ1Y3Rpb24ge1xcbiAgICAgIGhlaWdodDogMTM1cHg7XFxuICAgICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHdoaXRlOyB9XFxuICAgIC5nYW1lLWNvbnRhaW5lciAub3B0aW9ucyAucmFuZG9tLWRlcGxveW1lbnQge1xcbiAgICAgIGRpc3BsYXk6IGZsZXg7IH1cXG5cXG4uYm9hcmQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBmbGV4LXNocmluazogMDtcXG4gIHdpZHRoOiA0MDBweDtcXG4gIGhlaWdodDogNDAwcHg7XFxuICBib3JkZXI6IHNvbGlkIDFweCB3aGl0ZTsgfVxcbiAgLmJvYXJkIC5yb3cge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBmbGV4LWdyb3c6IDE7IH1cXG5cXG4uc3F1YXJlIHtcXG4gIGZsZXgtZ3JvdzogMTtcXG4gIGJvcmRlcjogc29saWQgMXB4IHdoaXRlOyB9XFxuXFxuLmZvb3RlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgaGVpZ2h0OiA3MHB4O1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxNXB4O1xcbiAgY29sb3I6ICNjOGM4Yzg7IH1cXG5cXG4jZ2l0aHViIHtcXG4gIGhlaWdodDogMjdweDtcXG4gIHdpZHRoOiAyN3B4O1xcbiAgcGFkZGluZy1ib3R0b206IDAuMnZoO1xcbiAgdHJhbnNpdGlvbjogMC4zczsgfVxcblxcbiNnaXRodWI6aG92ZXIge1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpOyB9XFxuXFxuLmJ1dHRvbiB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBtYXJnaW46IDI1cHggMTBweCAwIDEwcHg7XFxuICB3aWR0aDogMTkwcHg7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDAuODMpO1xcbiAgbGluZS1oZWlnaHQ6IDIxcHg7IH1cXG5cXG4uYnV0dG9uIGEge1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgZm9udC1mYW1pbHk6IEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgZm9udC1zaXplOiAyNXB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2I1NWU0YjtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgcGFkZGluZzogMjBweCA0MHB4O1xcbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcbiAgdGV4dC1zaGFkb3c6IDBweCAxcHggMHB4ICMwMDA7XFxuICBmaWx0ZXI6IGRyb3BzaGFkb3coY29sb3I9IzAwMCwgb2ZmeD0wIHB4LCBvZmZ5PTEgcHgpO1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAwICNmZmU1YzQsIDAgOHB4IDAgIzZlM2UwMDtcXG4gIC1tb3otYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAjZmZlNWM0LCAwIDhweCAwICM2ZTNlMDA7XFxuICBib3gtc2hhZG93OiBpbnNldCAwIDFweCAwICNmZmU1YzQsIDAgOHB4IDAgIzZlM2UwMDtcXG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgLW1vei1ib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7IH1cXG5cXG4uYnV0dG9uIGE6YWN0aXZlIHtcXG4gIHRvcDogMTBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNiNTVlNGI7XFxuICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDAgI2ZmZTVjNCwgaW5zZXQgMCAtM3B4IDAgIzkxNTEwMDtcXG4gIC1tb3otYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAjZmZlNWM0LCBpbnNldCAwIC0zcHggMCAjOTE1MTAwO1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAjZmZlNWM0LCBpbnNldCAwIC0zcHggMCAjOTE1MTAwOyB9XFxuXFxuLmJ1dHRvbi5zdGFydCBhLFxcbi5idXR0b24uc3RhcnQgYTphY3RpdmUsXFxuLmJ1dHRvbi5yZXN0YXJ0LWJ0biBhLFxcbi5idXR0b24ucmVzdGFydCBhOmFjdGl2ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzMxMjEyOyB9XFxuXFxuLmJ1dHRvbjphZnRlciB7XFxuICBjb250ZW50OiAnJztcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgcGFkZGluZzogNHB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOiAtMTVweDtcXG4gIGxlZnQ6IC00cHg7XFxuICB6LWluZGV4OiAtMTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyYjE4MDA7XFxuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDVweDtcXG4gIC1tb3otYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogNXB4OyB9XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBRUE7RUFDQyxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHlCQUFpQztFQUNqQyxTQUFTO0VBQ1QsVUFBVTtFQUVWLFlBQVk7RUFDWixnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLGlCQUFpQjtFQUVqQixxQ0FBcUMsRUFBQTs7QUFHdEM7RUFDQyxZQUFZO0VBQ1osYUFBYTtFQUViLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWixpQ0FBaUM7RUFDakMsZUFBZTtFQUNmLGdCQUFnQixFQUFBOztBQUdqQjtFQUNDLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIsdUJBQXVCO0VBRXZCLFdBQVc7RUFDWCxRQUFRO0VBQ1IsVUFBVTtFQUVWLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLGtCQUFrQixFQUFBOztBQUduQjtFQUNDLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIsdUJBQXVCO0VBRXZCLFdBQVc7RUFDWCxXQUFXO0VBQ1gsc0JBQXFCO0VBQ3JCLGtCQUFrQixFQUFBOztBQUluQjtFQUNDLHFCQUFvQixFQUFBOztBQUdyQjtFQUNDLHFDQUErQyxFQUFBOztBQUdoRDtFQUNDLHFDQUErQyxFQUFBOztBQUloRDtFQUNDLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFVBQVU7RUFFVixZQUFZO0VBQ1osWUFBWTtFQUNaLFlBQVk7RUFDWix3QkFBd0IsRUFBQTtFQVR6Qjs7SUFjRSxhQUFhO0lBQ2IsbUJBQW1CO0lBRW5CLFdBQVc7SUFDWCxhQUFhO0lBQ2IsZUFBZSxFQUFBO0VBbkJqQjtJQXVCRSxvQkFBb0IsRUFBQTtFQXZCdEI7SUEwQkUsc0JBQXNCLEVBQUE7RUExQnhCO0lBOEJFLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLHNCQUFzQjtJQUN0QixjQUFjO0lBQ2QsU0FBUztJQUVULFlBQVk7SUFDWixhQUFhO0lBQ2Isa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZixpQkFBaUIsRUFBQTtJQXpDbkI7TUE0Q0csYUFBYTtNQUNiLDhCQUE4QixFQUFBO0lBN0NqQztNQWlERyxhQUFhLEVBQUE7O0FBS2hCO0VBQ0MsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixjQUFjO0VBRWQsWUFBWTtFQUNaLGFBQWE7RUFDYix1QkFBdUIsRUFBQTtFQVB4QjtJQVVFLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsWUFBWSxFQUFBOztBQUlkO0VBQ0MsWUFBWTtFQUNaLHVCQUF1QixFQUFBOztBQUd4QjtFQUNDLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBRW5CLFlBQVk7RUFDWixZQUFZO0VBQ1osa0JBQWtCO0VBRWxCLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsY0FBeUIsRUFBQTs7QUFHMUI7RUFDQyxZQUFZO0VBQ1osV0FBVztFQUNYLHFCQUFxQjtFQUNyQixnQkFBZ0IsRUFBQTs7QUFHakI7RUFDQyxxQkFBcUIsRUFBQTs7QUFLdEI7RUFDQyxrQkFBa0I7RUFDbEIscUJBQXFCO0VBQ3JCLHdCQUF3QjtFQUV4QixZQUFZO0VBQ1osc0JBQXFCO0VBQ3JCLGlCQUFpQixFQUFBOztBQUdsQjtFQUNDLFlBQVk7RUFDWixrQ0FBa0M7RUFDbEMsaUJBQWlCO0VBQ2pCLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIscUJBQXFCO0VBQ3JCLHlCQUFrQztFQUNsQyxjQUFjO0VBQ2Qsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUVsQiw2Q0FBNkM7RUFDN0MsNkJBQTZCO0VBQzdCLG9EQUFrRDtFQUVsRCwwREFBMEQ7RUFDMUQsdURBQXVEO0VBQ3ZELGtEQUFrRDtFQUVsRCwwQkFBMEI7RUFDMUIsdUJBQXVCO0VBQ3ZCLGtCQUFrQixFQUFBOztBQUduQjtFQUNDLFNBQVM7RUFDVCx5QkFBa0M7RUFFbEMsaUVBQWlFO0VBQ2pFLDhEQUE4RDtFQUM5RCx5REFBeUQsRUFBQTs7QUFHMUQ7Ozs7RUFJQyx5QkFBeUIsRUFBQTs7QUFHMUI7RUFDQyxXQUFXO0VBQ1gsWUFBWTtFQUNaLFdBQVc7RUFDWCxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixVQUFVO0VBQ1YsV0FBVztFQUNYLHlCQUF5QjtFQUN6QiwwQkFBMEI7RUFDMUIsdUJBQXVCO0VBQ3ZCLGtCQUFrQixFQUFBXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJvYm90bytNb25vOndnaHRANjAwJmZhbWlseT1VbmJvdW5kZWQ6d2dodEA4MDAmZGlzcGxheT1zd2FwJyk7XFxuXFxuYm9keSB7XFxuXFx0ZGlzcGxheTogZmxleDtcXG5cXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcblxcdGJhY2tncm91bmQtY29sb3I6IHJnYigzMSwgNDEsIDU1KTtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG5cXG5cXHR3aWR0aDogMTAwdnc7XFxuXFx0bWluLXdpZHRoOiA5NTBweDtcXG5cXHRoZWlnaHQ6IDEwMHZoO1xcblxcdG1pbi1oZWlnaHQ6IDcyMHB4O1xcblxcblxcdGZvbnQtZmFtaWx5OiAnUm9ib3RvIE1vbm8nLCBtb25vc3BhY2U7XFxufVxcblxcbi50aXRsZSB7XFxuXFx0d2lkdGg6IDEwMHZ3O1xcblxcdGhlaWdodDogMTMwcHg7XFxuXFxuXFx0ZGlzcGxheTogZmxleDtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXHRhbGlnbi1pdGVtczogY2VudGVyO1xcblxcdGNvbG9yOiB3aGl0ZTtcXG5cXHRmb250LWZhbWlseTogJ1VuYm91bmRlZCcsIGN1cnNpdmU7XFxuXFx0Zm9udC1zaXplOiA4MHB4O1xcblxcdG1hcmdpbi10b3A6IDMwcHg7XFxufVxcblxcbi5zY29yZSB7XFxuXFx0ZGlzcGxheTogbm9uZTtcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuXFxuXFx0d2lkdGg6IDEwMCU7XFxuXFx0dG9wOiAyMyU7XFxuXFx0ei1pbmRleDogMTtcXG5cXG5cXHRjb2xvcjogd2hpdGU7XFxuXFx0dGV4dC1hbGlnbjogY2VudGVyO1xcblxcdGZvbnQtc2l6ZTogNDBweDtcXG5cXHR0cmFuc2l0aW9uOiBhbGwgMXM7XFxufVxcblxcbi5yZXN0YXJ0IHtcXG5cXHRkaXNwbGF5OiBub25lO1xcblxcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXG5cXHR3aWR0aDogMTAwJTtcXG5cXHRib3R0b206IDE1JTtcXG5cXHR0cmFuc2Zvcm06IHNjYWxlKC44NSk7XFxuXFx0dHJhbnNpdGlvbjogYWxsIDFzO1xcbn1cXG5cXG4vLyBFbmRnYW1lIHN0eWxpemF0aW9uXFxuLmdhbWUtY29udGFpbmVyLnNocmluayB7XFxuXFx0dHJhbnNmb3JtOiBzY2FsZSguNik7XFxufVxcblxcbi5sb3NlciB7XFxuXFx0Ym94LXNoYWRvdzogMHB4IDBweCAyOXB4IDE2cHggcmdiYSg5OCwgMCwgMCwgMSk7XFxufVxcblxcbi53aW5uZXIge1xcblxcdGJveC1zaGFkb3c6IDBweCAwcHggMjlweCAxNnB4IHJnYmEoMCwgOTgsIDAsIDEpO1xcbn1cXG4vLyA8L0VuZGdhbWUgc3R5bGl6YXRpb24+XFxuXFxuLmdhbWUtY29udGFpbmVyIHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0Z2FwOiAxMDBweDtcXG5cXG5cXHR3aWR0aDogMTAwdnc7XFxuXFx0aGVpZ2h0OiAxMDAlO1xcblxcdGNvbG9yOiB3aGl0ZTtcXG5cXHR0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMXM7XFxuXFxuXFxuXFx0LmxlZnQsXFxuXFx0LnJpZ2h0IHtcXG5cXHRcXHRkaXNwbGF5OiBmbGV4O1xcblxcdFxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFxuXFx0XFx0d2lkdGg6IDUwdnc7XFxuXFx0XFx0aGVpZ2h0OiA1MDBweDtcXG5cXHRcXHRtYXJnaW4tdG9wOiAtMiU7XFxuXFx0fVxcblxcblxcdC5sZWZ0IHtcXG5cXHRcXHRqdXN0aWZ5LWNvbnRlbnQ6IGVuZDtcXG5cXHR9XFxuXFx0LnJpZ2h0IHtcXG5cXHRcXHRqdXN0aWZ5LWNvbnRlbnQ6IHN0YXJ0O1xcblxcdH1cXG5cXG5cXHQub3B0aW9ucyB7XFxuXFx0XFx0ZGlzcGxheTogZmxleDtcXG5cXHRcXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXHRcXHRhbGlnbi1pdGVtczogY2VudGVyO1xcblxcdFxcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuXFx0XFx0ZmxleC1zaHJpbms6IDA7XFxuXFx0XFx0Z2FwOiAyMHB4O1xcblxcblxcdFxcdHdpZHRoOiAzODBweDtcXG5cXHRcXHRoZWlnaHQ6IDUwMHB4O1xcblxcdFxcdHRleHQtYWxpZ246IGNlbnRlcjtcXG5cXHRcXHRmb250LXNpemU6IDMzcHg7XFxuXFx0XFx0bGluZS1oZWlnaHQ6IDUycHg7XFxuXFxuXFx0XFx0LnJvdGF0ZS1pbnN0cnVjdGlvbiB7XFxuXFx0XFx0XFx0aGVpZ2h0OiAxMzVweDtcXG5cXHRcXHRcXHRib3JkZXItYm90dG9tOiAycHggc29saWQgd2hpdGU7XFxuXFx0XFx0fVxcblxcblxcdFxcdC5yYW5kb20tZGVwbG95bWVudCB7XFxuXFx0XFx0XFx0ZGlzcGxheTogZmxleDtcXG5cXHRcXHR9XFxuXFx0fVxcbn1cXG5cXG4uYm9hcmQge1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG5cXHRmbGV4LXNocmluazogMDtcXG5cXG5cXHR3aWR0aDogNDAwcHg7XFxuXFx0aGVpZ2h0OiA0MDBweDtcXG5cXHRib3JkZXI6IHNvbGlkIDFweCB3aGl0ZTtcXG5cXG5cXHQucm93IHtcXG5cXHRcXHRkaXNwbGF5OiBmbGV4O1xcblxcdFxcdGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuXFx0XFx0ZmxleC1ncm93OiAxO1xcblxcdH1cXG59XFxuXFxuLnNxdWFyZSB7XFxuXFx0ZmxleC1ncm93OiAxO1xcblxcdGJvcmRlcjogc29saWQgMXB4IHdoaXRlO1xcbn1cXG5cXG4uZm9vdGVyIHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFxuXFx0aGVpZ2h0OiA3MHB4O1xcblxcdHdpZHRoOiAxMDB2dztcXG5cXHRtYXJnaW4tYm90dG9tOiA1cHg7XFxuXFxuXFx0dGV4dC1hbGlnbjogY2VudGVyO1xcblxcdGZvbnQtc2l6ZTogMTVweDtcXG5cXHRjb2xvcjogcmdiKDIwMCwgMjAwLCAyMDApO1xcbn1cXG5cXG4jZ2l0aHViIHtcXG5cXHRoZWlnaHQ6IDI3cHg7XFxuXFx0d2lkdGg6IDI3cHg7XFxuXFx0cGFkZGluZy1ib3R0b206IDAuMnZoO1xcblxcdHRyYW5zaXRpb246IDAuM3M7XFxufVxcblxcbiNnaXRodWI6aG92ZXIge1xcblxcdHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcXG59XFxuXFxuLy8gQnV0dG9uIGZyb20gaHR0cHM6Ly9kZXYudG8vd2ViZGVhc3kvdG9wLTIwLWNzcy1idXR0b25zLWFuaW1hdGlvbnMtZjQxXFxuLy8gYXV0aG9yIGplbXdhcmUuIEFkanVzdGVkIGEgYml0IHRvIG15IG93biBuZWVkcy5cXG4uYnV0dG9uIHtcXG5cXHRwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xcblxcdG1hcmdpbjogMjVweCAxMHB4IDAgMTBweDtcXG5cXG5cXHR3aWR0aDogMTkwcHg7XFxuXFx0dHJhbnNmb3JtOiBzY2FsZSguODMpO1xcblxcdGxpbmUtaGVpZ2h0OiAyMXB4O1xcbn1cXG5cXG4uYnV0dG9uIGEge1xcblxcdGNvbG9yOiB3aGl0ZTtcXG5cXHRmb250LWZhbWlseTogSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcblxcdGZvbnQtd2VpZ2h0OiBib2xkO1xcblxcdGZvbnQtc2l6ZTogMjVweDtcXG5cXHR0ZXh0LWFsaWduOiBjZW50ZXI7XFxuXFx0dGV4dC1kZWNvcmF0aW9uOiBub25lO1xcblxcdGJhY2tncm91bmQtY29sb3I6IHJnYigxODEsIDk0LCA3NSk7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxuXFx0cG9zaXRpb246IHJlbGF0aXZlO1xcblxcdHBhZGRpbmc6IDIwcHggNDBweDtcXG5cXG5cXHQtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XFxuXFx0dGV4dC1zaGFkb3c6IDBweCAxcHggMHB4ICMwMDA7XFxuXFx0ZmlsdGVyOiBkcm9wc2hhZG93KGNvbG9yPSMwMDAsIG9mZng9MHB4LCBvZmZ5PTFweCk7XFxuXFxuXFx0LXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAwICNmZmU1YzQsIDAgOHB4IDAgIzZlM2UwMDtcXG5cXHQtbW96LWJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDAgI2ZmZTVjNCwgMCA4cHggMCAjNmUzZTAwO1xcblxcdGJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDAgI2ZmZTVjNCwgMCA4cHggMCAjNmUzZTAwO1xcblxcblxcdC13ZWJraXQtYm9yZGVyLXJhZGl1czogNXB4O1xcblxcdC1tb3otYm9yZGVyLXJhZGl1czogNXB4O1xcblxcdGJvcmRlci1yYWRpdXM6IDVweDtcXG59XFxuXFxuLmJ1dHRvbiBhOmFjdGl2ZSB7XFxuXFx0dG9wOiAxMHB4O1xcblxcdGJhY2tncm91bmQtY29sb3I6IHJnYigxODEsIDk0LCA3NSk7XFxuXFxuXFx0LXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAwICNmZmU1YzQsIGluc2V0IDAgLTNweCAwICM5MTUxMDA7XFxuXFx0LW1vei1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAwICNmZmU1YzQsIGluc2V0IDAgLTNweCAwICM5MTUxMDA7XFxuXFx0Ym94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAjZmZlNWM0LCBpbnNldCAwIC0zcHggMCAjOTE1MTAwO1xcbn1cXG5cXG4uYnV0dG9uLnN0YXJ0IGEsXFxuLmJ1dHRvbi5zdGFydCBhOmFjdGl2ZSxcXG4uYnV0dG9uLnJlc3RhcnQtYnRuIGEsXFxuLmJ1dHRvbi5yZXN0YXJ0IGE6YWN0aXZlIHtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiAjYzMxMjEyO1xcbn1cXG5cXG4uYnV0dG9uOmFmdGVyIHtcXG5cXHRjb250ZW50OiAnJztcXG5cXHRoZWlnaHQ6IDEwMCU7XFxuXFx0d2lkdGg6IDEwMCU7XFxuXFx0cGFkZGluZzogNHB4O1xcblxcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG5cXHRib3R0b206IC0xNXB4O1xcblxcdGxlZnQ6IC00cHg7XFxuXFx0ei1pbmRleDogLTE7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogIzJiMTgwMDtcXG5cXHQtd2Via2l0LWJvcmRlci1yYWRpdXM6IDVweDtcXG5cXHQtbW96LWJvcmRlci1yYWRpdXM6IDVweDtcXG5cXHRib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xuXG5cbmltcG9ydCAnLi9tb2R1bGVzL0RPTSc7XG5pbXBvcnQgJy4vbW9kdWxlcy9nYW1lTG9vcCdcblxuaW1wb3J0ICcuL21vZHVsZXMvZmFjdG9yaWVzL3NoaXAnO1xuaW1wb3J0ICcuL21vZHVsZXMvZmFjdG9yaWVzL2dhbWVib2FyZCc7XG5pbXBvcnQgJy4vbW9kdWxlcy9mYWN0b3JpZXMvcGxheWVyJztcblxuIl0sIm5hbWVzIjpbInNoaXBUeXBlcyIsImdpdEljb24iLCJnYW1lQ29udGFpbmVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwic2NvcmUiLCJyZXN0YXJ0QnRuIiwiZ2l0SW1nIiwic3RhcnRCdG4iLCJyYW5kb21CdG4iLCJsZWZ0IiwicmlnaHQiLCJvcHRpb25zIiwicm93IiwiY3JlYXRlRWxlbWVudCIsInNxdWFyZSIsInBsYXllckJvYXJkIiwic3JjIiwiY2xhc3NMaXN0IiwiYWRkIiwiaSIsImFwcGVuZENoaWxkIiwiY2xvbmVOb2RlIiwiaiIsInRlbXBTcXVhcmUiLCJzZXRBdHRyaWJ1dGUiLCJsYXN0Q2hpbGQiLCJhaUJvYXJkIiwic3R5bGUiLCJkaXNwbGF5IiwiaGVscGVyQ2hvb3NlUGxheWVyR3JpZCIsInBsYXllciIsImdyaWRIVE1MIiwicG9wdWxhdGVCb2FyZEhUTUwiLCJncmlkT2JqZWN0Iiwic3F1YXJlSFRNTCIsImZvckVhY2giLCJzcXVhcmVPYmoiLCJjaGlsZE5vZGVzIiwicm93SFRNTCIsInNxIiwieCIsImdldEF0dHJpYnV0ZSIsInkiLCJvY2N1cGllZCIsImhpdFRha2VuIiwiYmFja2dyb3VuZENvbG9yIiwic2hpcFR5cGUiLCJ0eXBlIiwiY29sb3IiLCJyZXNldEdyaWRIVE1MIiwicmVtb3ZlR3JpZExpc3RlbmVycyIsInBsYXllckJvYXJkQ2xvbmUiLCJhaUJvYXJkQ2xvbmUiLCJwYXJlbnROb2RlIiwicmVwbGFjZUNoaWxkIiwiYWRkRmxlZXREZXBsb3ltZW50TGlzdGVuZXIiLCJvcmllbnRhdGlvbiIsImdhbWVib2FyZE9iaiIsInNxWCIsInNxWSIsInNoaXBUeXBlT2JqIiwic2hpcExlbmd0aCIsImdyaWQiLCJzb21lIiwiZWwiLCJsZW5ndGgiLCJub1NwYWNlIiwiY2hlY2tTcGFjZUZvclNoaXAiLCJhZGRFdmVudExpc3RlbmVyIiwicnciLCJzcXIiLCJhZGRTaGlwIiwiZW5kR2FtZSIsIndpbm5lciIsImlubmVySFRNTCIsImFkZEdhbWVwbGF5TGlzdGVuZXJzIiwiYWlPYmplY3QiLCJwbGF5ZXJPYmplY3QiLCJhdHRhY2siLCJnYW1lYm9hcmQiLCJyZWNlaXZlQXR0YWNrIiwiZ2FtZVdvbiIsInJhbmRvbUF0dGFjayIsImdhbWVMb3N0Iiwib25jbGljayIsInJlbW92ZSIsIlNoaXAiLCJHYW1lYm9hcmQiLCJjcmVhdGVHcmlkIiwiZ3JpZEFycmF5IiwicHVzaCIsImNsZWFyR3JpZCIsInhDb29yZCIsInlDb29yZCIsInN0YXJ0U3F1YXJlIiwiZ2V0U3F1YXJlIiwibmV3U2hpcCIsInJhbmRvbUZsZWV0UGxhY2VtZW50IiwicmFuZG9tU2hpcFBsYWNlbWVudCIsInNoaXBCdWlsdCIsIm9yaWVudGF0aW9uTnVtYmVyIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZmluZCIsInRha2VIaXQiLCJjaGVja0ZsZWV0Q29uZGl0aW9uIiwiZmxlZXRBbGl2ZSIsIlBsYXllciIsImVuZW15Qm9hcmQiLCJzaG90RmlyZWQiLCJoaXRzVGFrZW4iLCJpc1N1bmsiLCJjaGVja0hQIiwiYWkiLCJjb25zb2xlIiwibG9nIiwiZSIsImNvZGUiLCJmbGVldERlcGxveWVkIiwiY2xpY2siXSwic291cmNlUm9vdCI6IiJ9