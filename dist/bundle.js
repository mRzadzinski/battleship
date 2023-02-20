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
/* harmony export */   "removeGridListeners": () => (/* binding */ removeGridListeners),
/* harmony export */   "resetGridHTML": () => (/* binding */ resetGridHTML),
/* harmony export */   "restartBtn": () => (/* binding */ restartBtn),
/* harmony export */   "startBtn": () => (/* binding */ startBtn)
/* harmony export */ });
/* harmony import */ var _shipTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipTypes */ "./src/modules/shipTypes.js");
/* harmony import */ var _img_github_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../img/github.png */ "./src/img/github.png");
/* eslint-disable prefer-destructuring */


var gitImg = document.querySelector('#github');
gitImg.src = _img_github_png__WEBPACK_IMPORTED_MODULE_1__;
var gameContainer = document.querySelector('.game-container');
var left = document.querySelector('.left');
var right = document.querySelector('.right');
var options = document.querySelector('.options');
var score = document.querySelector('.score');
var randomBtn = document.querySelector('.random');
var startBtn = document.querySelector('.start');
var restartBtn = document.querySelector('.restart');
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

// eslint-disable-next-line consistent-return
function helperChoosePlayerGrid(player) {
  if (player === 'player') {
    return playerBoard;
  }
  if (player === 'ai') {
    return aiBoard;
  }
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

      // Add ship to player's board object on click
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
    score.innerHTML = 'You won!';
  } else if (winner === 'ai') {
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
        if (attack && !aiObject.gameboard.gameLost) {
          aiObject.aiAttack(playerObject.gameboard);
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
  playerBoard.classList.remove('winner');
  aiBoard.classList.remove('winner');
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
      var _this = this;
      this.grid.forEach(function (square) {
        square.occupied = false;
        square.shipType = false;
        square.hitTaken = false;
        _this.gameLost = false;
      });
    },
    // Check if there is space to create ship and coords are in range
    checkSpaceForShip: function checkSpaceForShip(xCoord, yCoord, length, orientation) {
      var _this2 = this;
      var startSquare = this.getSquare(xCoord, yCoord);
      var noSpace = false;
      if (orientation === 'horizontal') {
        var _loop = function _loop(i) {
          if (i > 10) return {
            v: true
          };
          _this2.grid.forEach(function (square) {
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
          _this2.grid.forEach(function (square) {
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
      var _this3 = this;
      var startSquare = this.getSquare(xCoord, yCoord);
      if (startSquare.occupied) return false;
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
      var noSpace = this.checkSpaceForShip(xCoord, yCoord, length, orientation);
      if (noSpace) return false;

      // Build ship
      if (orientation === 'horizontal') {
        var _loop3 = function _loop3(i) {
          _this3.grid.forEach(function (square) {
            if (square.x === i && square.y === startSquare.y && !square.occupied) {
              square.occupied = true;
              square.shipType = shipType;
            }
          });
        };
        for (var i = xCoord; i < xCoord + length; i++) {
          _loop3(i);
        }
      } else if (orientation === 'vertical') {
        var _loop4 = function _loop4(_i2) {
          _this3.grid.forEach(function (square) {
            if (square.x === startSquare.x && square.y === _i2 && !square.occupied) {
              square.occupied = true;
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
      if (!square.hitTaken) {
        square.hitTaken = true;
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
    damagedEnemy: null,
    lastDamagedEnemy: null,
    attackDirection: null,
    directionsAttacked: [],
    attack: function attack(xCoord, yCoord, enemyBoard) {
      enemyBoard.receiveAttack(xCoord, yCoord);
    },
    randomAttack: function randomAttack(enemyBoard) {
      var shotFired = false;
      var xCoord;
      var yCoord;
      while (!shotFired) {
        xCoord = Math.floor(Math.random() * 10) + 1;
        yCoord = Math.floor(Math.random() * 10) + 1;
        shotFired = enemyBoard.receiveAttack(xCoord, yCoord);
      }

      // Save coords of damaged ship
      var damagedSquare = enemyBoard.getSquare(xCoord, yCoord);
      if (damagedSquare.occupied && damagedSquare.hitTaken) {
        this.damagedEnemy = enemyBoard.getSquare(xCoord, yCoord);
      }
    },
    getPossibleShots: function getPossibleShots(enemyBoard, enemySquare) {
      var left = enemyBoard.getSquare(enemySquare.x - 1, enemySquare.y);
      var right = enemyBoard.getSquare(enemySquare.x + 1, enemySquare.y);
      var top = enemyBoard.getSquare(enemySquare.x, enemySquare.y - 1);
      var bottom = enemyBoard.getSquare(enemySquare.x, enemySquare.y + 1);
      return {
        left: left,
        right: right,
        top: top,
        bottom: bottom
      };
    },
    resetEnemyData: function resetEnemyData() {
      this.damagedEnemy = null;
      this.lastDamagedEnemy = null;
      this.attackDirection = null;
      this.directionsAttacked = [];
    },
    attackWithDirection: function attackWithDirection(enemyBoard) {
      var possibleShots = this.getPossibleShots(enemyBoard, this.lastDamagedEnemy);
      if (this.attackDirection === 'left') {
        if (possibleShots.left && !possibleShots.left.hitTaken && this.lastDamagedEnemy.occupied) {
          enemyBoard.receiveAttack(this.lastDamagedEnemy.x - 1, this.lastDamagedEnemy.y);
          this.lastDamagedEnemy = possibleShots.left;
          // Haven't tried another direction yet
        } else if (this.directionsAttacked.length === 0) {
          this.directionsAttacked.push('left');
          this.attackDirection = 'right';
          // Change attack direction, and start from first damaged ship square
          this.lastDamagedEnemy = this.damagedEnemy;
          this.attackWithDirection(enemyBoard);
          // Both directions attacked
        } else if (this.directionsAttacked.length === 1) {
          this.resetEnemyData();
          this.aiAttack(enemyBoard);
        }
      } else if (this.attackDirection === 'right') {
        if (possibleShots.right && !possibleShots.right.hitTaken && this.lastDamagedEnemy.occupied) {
          enemyBoard.receiveAttack(this.lastDamagedEnemy.x + 1, this.lastDamagedEnemy.y);
          this.lastDamagedEnemy = possibleShots.right;
        } else if (this.directionsAttacked.length === 0) {
          this.directionsAttacked.push('right');
          this.attackDirection = 'left';
          this.lastDamagedEnemy = this.damagedEnemy;
          this.attackWithDirection(enemyBoard);
        } else if (this.directionsAttacked.length === 1) {
          this.resetEnemyData();
          this.aiAttack(enemyBoard);
        }
      } else if (this.attackDirection === 'top') {
        if (possibleShots.top && !possibleShots.top.hitTaken && this.lastDamagedEnemy.occupied) {
          enemyBoard.receiveAttack(this.lastDamagedEnemy.x, this.lastDamagedEnemy.y - 1);
          this.lastDamagedEnemy = possibleShots.top;
        } else if (this.directionsAttacked.length === 0) {
          this.directionsAttacked.push('top');
          this.attackDirection = 'bottom';
          this.lastDamagedEnemy = this.damagedEnemy;
          this.attackWithDirection(enemyBoard);
        } else if (this.directionsAttacked.length === 1) {
          this.resetEnemyData();
          this.aiAttack(enemyBoard);
        }
      } else if (this.attackDirection === 'bottom') {
        if (possibleShots.bottom && !possibleShots.bottom.hitTaken && this.lastDamagedEnemy.occupied) {
          enemyBoard.receiveAttack(this.lastDamagedEnemy.x, this.lastDamagedEnemy.y + 1);
          this.lastDamagedEnemy = possibleShots.bottom;
        } else if (this.directionsAttacked.length === 0) {
          this.directionsAttacked.push('bottom');
          this.attackDirection = 'top';
          this.lastDamagedEnemy = this.damagedEnemy;
          this.attackWithDirection(enemyBoard);
        } else if (this.directionsAttacked.length === 1) {
          this.resetEnemyData();
          this.aiAttack(enemyBoard);
        }
      }
    },
    aiAttack: function aiAttack(enemyBoard) {
      // Random attack hit enemy ship
      if (this.damagedEnemy) {
        var possibleShots = this.getPossibleShots(enemyBoard, this.damagedEnemy);
        if (this.attackDirection) {
          this.attackWithDirection(enemyBoard);

          // Attack direction unspecified
        } else if (!this.attackDirection) {
          if (possibleShots.left && !possibleShots.left.hitTaken) {
            enemyBoard.receiveAttack(this.damagedEnemy.x - 1, this.damagedEnemy.y);
            if (possibleShots.left.occupied && possibleShots.left.hitTaken) {
              this.attackDirection = 'left';
              this.lastDamagedEnemy = possibleShots.left;
            }
          } else if (possibleShots.right && !possibleShots.right.hitTaken) {
            enemyBoard.receiveAttack(this.damagedEnemy.x + 1, this.damagedEnemy.y);
            if (possibleShots.right.occupied && possibleShots.right.hitTaken) {
              this.attackDirection = 'right';
              this.lastDamagedEnemy = possibleShots.right;
            }
          } else if (possibleShots.top && !possibleShots.top.hitTaken) {
            enemyBoard.receiveAttack(this.damagedEnemy.x, this.damagedEnemy.y - 1);
            if (possibleShots.top.occupied && possibleShots.top.hitTaken) {
              this.attackDirection = 'top';
              this.lastDamagedEnemy = possibleShots.top;
            }
          } else if (possibleShots.bottom && !possibleShots.bottom.hitTaken) {
            enemyBoard.receiveAttack(this.damagedEnemy.x, this.damagedEnemy.y + 1);
            if (possibleShots.bottom.occupied && possibleShots.bottom.hitTaken) {
              this.attackDirection = 'bottom';
              this.lastDamagedEnemy = possibleShots.bottom;
            }
          }
        }
      } else if (!this.damagedEnemy) {
        this.randomAttack(enemyBoard);
      }
    }
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

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

// Player random fleet deployment
_DOM__WEBPACK_IMPORTED_MODULE_1__.randomBtn.addEventListener('click', function () {
  player.gameboard.clearGrid();
  (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.resetGridHTML)('player');
  (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.removeGridListeners)();
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
  if (e.code === 'KeyF') {
    player.randomAttack(ai.gameboard);
    ai.aiAttack(player.gameboard);
    (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.populateBoardHTML)('player', player.gameboard.grid);
    (0,_DOM__WEBPACK_IMPORTED_MODULE_1__.populateBoardHTML)('ai', ai.gameboard.grid);
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

  // AI random fleet deployment
  ai.gameboard.randomFleetPlacement();
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
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  display: flex;\n  flex-direction: column;\n  background-color: #1f2937;\n  margin: 0;\n  padding: 0;\n  width: 100vw;\n  min-width: 950px;\n  height: 100vh;\n  min-height: 720px;\n  font-family: 'Roboto Mono', monospace; }\n\n.title {\n  width: 100vw;\n  height: 130px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: white;\n  font-family: 'Unbounded', cursive;\n  font-size: 80px;\n  margin-top: 30px; }\n\n.score {\n  display: none;\n  position: absolute;\n  justify-content: center;\n  width: 100%;\n  top: 23%;\n  z-index: 1;\n  color: white;\n  text-align: center;\n  font-size: 40px;\n  transition: all 1s; }\n\n.restart {\n  display: none;\n  position: absolute;\n  justify-content: center;\n  width: 100%;\n  bottom: 15%;\n  transform: scale(0.85);\n  transition: all 1s; }\n\n.game-container.shrink {\n  transform: scale(0.6); }\n\n.winner {\n  box-shadow: 0px 0px 29px 5px white; }\n\n.game-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 100px;\n  width: 100vw;\n  height: 100%;\n  color: white;\n  transition: transform 1s; }\n  .game-container .left,\n  .game-container .right {\n    display: flex;\n    align-items: center;\n    width: 50vw;\n    height: 500px;\n    margin-top: -2%; }\n  .game-container .left {\n    justify-content: end; }\n  .game-container .right {\n    justify-content: start; }\n  .game-container .options {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    flex-shrink: 0;\n    gap: 20px;\n    width: 380px;\n    height: 500px;\n    text-align: center;\n    font-size: 33px;\n    line-height: 52px; }\n    .game-container .options .rotate-instruction {\n      height: 135px;\n      border-bottom: 2px solid white; }\n    .game-container .options .random-deployment {\n      display: flex; }\n\n.board {\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 0;\n  width: 400px;\n  height: 400px;\n  border: solid 1px white; }\n  .board .row {\n    display: flex;\n    flex-direction: row;\n    flex-grow: 1; }\n\n.square {\n  flex-grow: 1;\n  border: solid 1px white; }\n\n.footer {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 70px;\n  width: 100vw;\n  margin-bottom: 5px;\n  text-align: center;\n  font-size: 15px;\n  color: #c8c8c8; }\n\n#github {\n  height: 27px;\n  width: 27px;\n  padding-bottom: 0.2vh;\n  transition: 0.3s; }\n\n#github:hover {\n  transform: scale(1.1); }\n\n.button {\n  position: relative;\n  display: inline-block;\n  margin: 25px 10px 0 10px;\n  width: 190px;\n  transform: scale(0.83);\n  line-height: 21px; }\n\n.button a {\n  color: white;\n  font-family: Helvetica, sans-serif;\n  font-weight: bold;\n  font-size: 25px;\n  text-align: center;\n  text-decoration: none;\n  background-color: #b55e4b;\n  display: block;\n  position: relative;\n  padding: 20px 40px;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  text-shadow: 0px 1px 0px #000;\n  filter: dropshadow(color=#000, offx=0 px, offy=1 px);\n  -webkit-box-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n  -moz-box-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n  box-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  border-radius: 5px; }\n\n.button a:active {\n  top: 10px;\n  background-color: #b55e4b;\n  -webkit-box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100;\n  -moz-box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100;\n  box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100; }\n\n.button.start a,\n.button.start a:active,\n.button.restart-btn a,\n.button.restart a:active {\n  background-color: #c31212; }\n\n.button:after {\n  content: '';\n  height: 100%;\n  width: 100%;\n  padding: 4px;\n  position: absolute;\n  bottom: -15px;\n  left: -4px;\n  z-index: -1;\n  background-color: #2b1800;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  border-radius: 5px; }\n", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"AAEA;EACC,aAAa;EACb,sBAAsB;EACtB,yBAAiC;EACjC,SAAS;EACT,UAAU;EAEV,YAAY;EACZ,gBAAgB;EAChB,aAAa;EACb,iBAAiB;EAEjB,qCAAqC,EAAA;;AAGtC;EACC,YAAY;EACZ,aAAa;EAEb,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,iCAAiC;EACjC,eAAe;EACf,gBAAgB,EAAA;;AAGjB;EACC,aAAa;EACb,kBAAkB;EAClB,uBAAuB;EAEvB,WAAW;EACX,QAAQ;EACR,UAAU;EAEV,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf,kBAAkB,EAAA;;AAGnB;EACC,aAAa;EACb,kBAAkB;EAClB,uBAAuB;EAEvB,WAAW;EACX,WAAW;EACX,sBAAsB;EACtB,kBAAkB,EAAA;;AAInB;EACC,qBAAqB,EAAA;;AAGtB;EACC,kCAA+C,EAAA;;AAIhD;EACC,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,UAAU;EAEV,YAAY;EACZ,YAAY;EACZ,YAAY;EACZ,wBAAwB,EAAA;EATzB;;IAaE,aAAa;IACb,mBAAmB;IAEnB,WAAW;IACX,aAAa;IACb,eAAe,EAAA;EAlBjB;IAsBE,oBAAoB,EAAA;EAtBtB;IAyBE,sBAAsB,EAAA;EAzBxB;IA6BE,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,sBAAsB;IACtB,cAAc;IACd,SAAS;IAET,YAAY;IACZ,aAAa;IACb,kBAAkB;IAClB,eAAe;IACf,iBAAiB,EAAA;IAxCnB;MA2CG,aAAa;MACb,8BAA8B,EAAA;IA5CjC;MAgDG,aAAa,EAAA;;AAKhB;EACC,aAAa;EACb,sBAAsB;EACtB,cAAc;EAEd,YAAY;EACZ,aAAa;EACb,uBAAuB,EAAA;EAPxB;IAUE,aAAa;IACb,mBAAmB;IACnB,YAAY,EAAA;;AAId;EACC,YAAY;EACZ,uBAAuB,EAAA;;AAGxB;EACC,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EAEnB,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAElB,kBAAkB;EAClB,eAAe;EACf,cAAyB,EAAA;;AAG1B;EACC,YAAY;EACZ,WAAW;EACX,qBAAqB;EACrB,gBAAgB,EAAA;;AAGjB;EACC,qBAAqB,EAAA;;AAKtB;EACC,kBAAkB;EAClB,qBAAqB;EACrB,wBAAwB;EAExB,YAAY;EACZ,sBAAsB;EACtB,iBAAiB,EAAA;;AAGlB;EACC,YAAY;EACZ,kCAAkC;EAClC,iBAAiB;EACjB,eAAe;EACf,kBAAkB;EAClB,qBAAqB;EACrB,yBAAkC;EAClC,cAAc;EACd,kBAAkB;EAClB,kBAAkB;EAElB,6CAA6C;EAC7C,6BAA6B;EAC7B,oDAAkD;EAElD,0DAA0D;EAC1D,uDAAuD;EACvD,kDAAkD;EAElD,0BAA0B;EAC1B,uBAAuB;EACvB,kBAAkB,EAAA;;AAGnB;EACC,SAAS;EACT,yBAAkC;EAElC,iEAAiE;EACjE,8DAA8D;EAC9D,yDAAyD,EAAA;;AAG1D;;;;EAIC,yBAAyB,EAAA;;AAG1B;EACC,WAAW;EACX,YAAY;EACZ,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,aAAa;EACb,UAAU;EACV,WAAW;EACX,yBAAyB;EACzB,0BAA0B;EAC1B,uBAAuB;EACvB,kBAAkB,EAAA","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@600&family=Unbounded:wght@800&display=swap');\n\nbody {\n\tdisplay: flex;\n\tflex-direction: column;\n\tbackground-color: rgb(31, 41, 55);\n\tmargin: 0;\n\tpadding: 0;\n\n\twidth: 100vw;\n\tmin-width: 950px;\n\theight: 100vh;\n\tmin-height: 720px;\n\n\tfont-family: 'Roboto Mono', monospace;\n}\n\n.title {\n\twidth: 100vw;\n\theight: 130px;\n\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tcolor: white;\n\tfont-family: 'Unbounded', cursive;\n\tfont-size: 80px;\n\tmargin-top: 30px;\n}\n\n.score {\n\tdisplay: none;\n\tposition: absolute;\n\tjustify-content: center;\n\n\twidth: 100%;\n\ttop: 23%;\n\tz-index: 1;\n\n\tcolor: white;\n\ttext-align: center;\n\tfont-size: 40px;\n\ttransition: all 1s;\n}\n\n.restart {\n\tdisplay: none;\n\tposition: absolute;\n\tjustify-content: center;\n\n\twidth: 100%;\n\tbottom: 15%;\n\ttransform: scale(0.85);\n\ttransition: all 1s;\n}\n\n// Endgame stylization\n.game-container.shrink {\n\ttransform: scale(0.6);\n}\n\n.winner {\n\tbox-shadow: 0px 0px 29px 5px rgb(255, 255, 255);\n}\n// </Endgame stylization>\n\n.game-container {\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tgap: 100px;\n\n\twidth: 100vw;\n\theight: 100%;\n\tcolor: white;\n\ttransition: transform 1s;\n\n\t.left,\n\t.right {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\n\t\twidth: 50vw;\n\t\theight: 500px;\n\t\tmargin-top: -2%;\n\t}\n\n\t.left {\n\t\tjustify-content: end;\n\t}\n\t.right {\n\t\tjustify-content: start;\n\t}\n\n\t.options {\n\t\tdisplay: flex;\n\t\tjustify-content: center;\n\t\talign-items: center;\n\t\tflex-direction: column;\n\t\tflex-shrink: 0;\n\t\tgap: 20px;\n\n\t\twidth: 380px;\n\t\theight: 500px;\n\t\ttext-align: center;\n\t\tfont-size: 33px;\n\t\tline-height: 52px;\n\n\t\t.rotate-instruction {\n\t\t\theight: 135px;\n\t\t\tborder-bottom: 2px solid white;\n\t\t}\n\n\t\t.random-deployment {\n\t\t\tdisplay: flex;\n\t\t}\n\t}\n}\n\n.board {\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex-shrink: 0;\n\n\twidth: 400px;\n\theight: 400px;\n\tborder: solid 1px white;\n\n\t.row {\n\t\tdisplay: flex;\n\t\tflex-direction: row;\n\t\tflex-grow: 1;\n\t}\n}\n\n.square {\n\tflex-grow: 1;\n\tborder: solid 1px white;\n}\n\n.footer {\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\n\theight: 70px;\n\twidth: 100vw;\n\tmargin-bottom: 5px;\n\n\ttext-align: center;\n\tfont-size: 15px;\n\tcolor: rgb(200, 200, 200);\n}\n\n#github {\n\theight: 27px;\n\twidth: 27px;\n\tpadding-bottom: 0.2vh;\n\ttransition: 0.3s;\n}\n\n#github:hover {\n\ttransform: scale(1.1);\n}\n\n// Button from https://dev.to/webdeasy/top-20-css-buttons-animations-f41\n// author jemware. Adjusted to my own needs.\n.button {\n\tposition: relative;\n\tdisplay: inline-block;\n\tmargin: 25px 10px 0 10px;\n\n\twidth: 190px;\n\ttransform: scale(0.83);\n\tline-height: 21px;\n}\n\n.button a {\n\tcolor: white;\n\tfont-family: Helvetica, sans-serif;\n\tfont-weight: bold;\n\tfont-size: 25px;\n\ttext-align: center;\n\ttext-decoration: none;\n\tbackground-color: rgb(181, 94, 75);\n\tdisplay: block;\n\tposition: relative;\n\tpadding: 20px 40px;\n\n\t-webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n\ttext-shadow: 0px 1px 0px #000;\n\tfilter: dropshadow(color=#000, offx=0px, offy=1px);\n\n\t-webkit-box-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n\t-moz-box-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n\tbox-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n\n\t-webkit-border-radius: 5px;\n\t-moz-border-radius: 5px;\n\tborder-radius: 5px;\n}\n\n.button a:active {\n\ttop: 10px;\n\tbackground-color: rgb(181, 94, 75);\n\n\t-webkit-box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100;\n\t-moz-box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100;\n\tbox-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100;\n}\n\n.button.start a,\n.button.start a:active,\n.button.restart-btn a,\n.button.restart a:active {\n\tbackground-color: #c31212;\n}\n\n.button:after {\n\tcontent: '';\n\theight: 100%;\n\twidth: 100%;\n\tpadding: 4px;\n\tposition: absolute;\n\tbottom: -15px;\n\tleft: -4px;\n\tz-index: -1;\n\tbackground-color: #2b1800;\n\t-webkit-border-radius: 5px;\n\t-moz-border-radius: 5px;\n\tborder-radius: 5px;\n}\n"],"sourceRoot":""}]);
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
/* harmony import */ var _modules_gameLoop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/gameLoop */ "./src/modules/gameLoop.js");


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NmQTs7Ozs7Ozs7Ozs7OztBQ0FzQiIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9ET00uanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL2ZhY3Rvcmllcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL2ZhY3Rvcmllcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL2dhbWVMb29wLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9zaGlwVHlwZXMuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL3NyYy9zdHlsZS5zY3NzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vc3JjL3N0eWxlLnNjc3M/NzViYSIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9zcmMvYXBwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHByZWZlci1kZXN0cnVjdHVyaW5nICovXG5pbXBvcnQgc2hpcFR5cGVzIGZyb20gJy4vc2hpcFR5cGVzJztcbmltcG9ydCBnaXRJY29uIGZyb20gJy4uL2ltZy9naXRodWIucG5nJztcblxuY29uc3QgZ2l0SW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dpdGh1YicpO1xuZ2l0SW1nLnNyYyA9IGdpdEljb247XG5cbmNvbnN0IGdhbWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1jb250YWluZXInKTtcbmNvbnN0IGxlZnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGVmdCcpO1xuY29uc3QgcmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmlnaHQnKTtcbmNvbnN0IG9wdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3B0aW9ucycpO1xuY29uc3Qgc2NvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NvcmUnKTtcblxuY29uc3QgcmFuZG9tQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJhbmRvbScpO1xuY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnQnKTtcbmNvbnN0IHJlc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdGFydCcpO1xuXG5jb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xubGV0IHBsYXllckJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbnBsYXllckJvYXJkLmNsYXNzTGlzdC5hZGQoJ2JvYXJkJyk7XG5yb3cuY2xhc3NMaXN0LmFkZCgncm93Jyk7XG5zcXVhcmUuY2xhc3NMaXN0LmFkZCgnc3F1YXJlJyk7XG5cbi8vIENyZWF0ZSBncmlkXG5mb3IgKGxldCBpID0gMTsgaSA8IDExOyBpKyspIHtcblx0cGxheWVyQm9hcmQuYXBwZW5kQ2hpbGQocm93LmNsb25lTm9kZSgpKTtcblxuXHRmb3IgKGxldCBqID0gMTsgaiA8IDExOyBqKyspIHtcblx0XHRjb25zdCB0ZW1wU3F1YXJlID0gc3F1YXJlLmNsb25lTm9kZSgpO1xuXHRcdHRlbXBTcXVhcmUuc2V0QXR0cmlidXRlKCdkYXRhLXgnLCBqKTtcblx0XHR0ZW1wU3F1YXJlLnNldEF0dHJpYnV0ZSgnZGF0YS15JywgaSk7XG5cblx0XHRwbGF5ZXJCb2FyZC5sYXN0Q2hpbGQuYXBwZW5kQ2hpbGQodGVtcFNxdWFyZSk7XG5cdH1cbn1cblxubGV0IGFpQm9hcmQgPSBwbGF5ZXJCb2FyZC5jbG9uZU5vZGUodHJ1ZSk7XG5wbGF5ZXJCb2FyZC5jbGFzc0xpc3QuYWRkKCdwbGF5ZXItYm9hcmQnKTtcbmFpQm9hcmQuY2xhc3NMaXN0LmFkZCgnYWktYm9hcmQnKTtcbmFpQm9hcmQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxubGVmdC5hcHBlbmRDaGlsZChwbGF5ZXJCb2FyZCk7XG5yaWdodC5hcHBlbmRDaGlsZChhaUJvYXJkKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG5mdW5jdGlvbiBoZWxwZXJDaG9vc2VQbGF5ZXJHcmlkKHBsYXllcikge1xuXHRpZiAocGxheWVyID09PSAncGxheWVyJykge1xuXHRcdHJldHVybiBwbGF5ZXJCb2FyZDtcblx0fVxuXHRpZiAocGxheWVyID09PSAnYWknKSB7XG5cdFx0cmV0dXJuIGFpQm9hcmQ7XG5cdH1cbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVCb2FyZEhUTUwocGxheWVyLCBncmlkT2JqZWN0KSB7XG5cdGNvbnN0IGdyaWRIVE1MID0gaGVscGVyQ2hvb3NlUGxheWVyR3JpZChwbGF5ZXIpO1xuXHRsZXQgc3F1YXJlSFRNTDtcblxuXHQvLyBGaW5kIEhUTUwgZXF1aXZhbGVudCBvZiBzcXVhcmUgb2JqZWN0IGJ5IGNvb3JkaW5hdGVzXG5cdGdyaWRPYmplY3QuZm9yRWFjaCgoc3F1YXJlT2JqKSA9PiB7XG5cdFx0Z3JpZEhUTUwuY2hpbGROb2Rlcy5mb3JFYWNoKChyb3dIVE1MKSA9PiB7XG5cdFx0XHRyb3dIVE1MLmNoaWxkTm9kZXMuZm9yRWFjaCgoc3EpID0+IHtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdHNxdWFyZU9iai54ID09PSArc3EuZ2V0QXR0cmlidXRlKCdkYXRhLXgnKSAmJlxuXHRcdFx0XHRcdHNxdWFyZU9iai55ID09PSArc3EuZ2V0QXR0cmlidXRlKCdkYXRhLXknKVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRzcXVhcmVIVE1MID0gc3E7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0aWYgKCFzcXVhcmVPYmoub2NjdXBpZWQgJiYgIXNxdWFyZU9iai5oaXRUYWtlbikge1xuXHRcdFx0c3F1YXJlSFRNTC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDMxLCA0MSwgNTUpJztcblx0XHR9IGVsc2UgaWYgKHNxdWFyZU9iai5vY2N1cGllZCAmJiAhc3F1YXJlT2JqLmhpdFRha2VuICYmIHBsYXllciAhPT0gJ2FpJykge1xuXHRcdFx0aWYgKHNxdWFyZU9iai5zaGlwVHlwZSA9PT0gc2hpcFR5cGVzWzRdLnR5cGUpIHtcblx0XHRcdFx0c3F1YXJlSFRNTC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzaGlwVHlwZXNbNF0uY29sb3I7XG5cdFx0XHR9IGVsc2UgaWYgKHNxdWFyZU9iai5zaGlwVHlwZSA9PT0gc2hpcFR5cGVzWzNdLnR5cGUpIHtcblx0XHRcdFx0c3F1YXJlSFRNTC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzaGlwVHlwZXNbM10uY29sb3I7XG5cdFx0XHR9IGVsc2UgaWYgKHNxdWFyZU9iai5zaGlwVHlwZSA9PT0gc2hpcFR5cGVzWzJdLnR5cGUpIHtcblx0XHRcdFx0c3F1YXJlSFRNTC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzaGlwVHlwZXNbMl0uY29sb3I7XG5cdFx0XHR9IGVsc2UgaWYgKHNxdWFyZU9iai5zaGlwVHlwZSA9PT0gc2hpcFR5cGVzWzFdLnR5cGUpIHtcblx0XHRcdFx0c3F1YXJlSFRNTC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzaGlwVHlwZXNbMV0uY29sb3I7XG5cdFx0XHR9IGVsc2UgaWYgKHNxdWFyZU9iai5zaGlwVHlwZSA9PT0gc2hpcFR5cGVzWzBdLnR5cGUpIHtcblx0XHRcdFx0c3F1YXJlSFRNTC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzaGlwVHlwZXNbMF0uY29sb3I7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICghc3F1YXJlT2JqLm9jY3VwaWVkICYmIHNxdWFyZU9iai5oaXRUYWtlbikge1xuXHRcdFx0c3F1YXJlSFRNTC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDg4LCA4OCwgODgpJztcblx0XHR9IGVsc2UgaWYgKHNxdWFyZU9iai5vY2N1cGllZCAmJiBzcXVhcmVPYmouaGl0VGFrZW4pIHtcblx0XHRcdHNxdWFyZUhUTUwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYig5OCwgMCwgMCknO1xuXHRcdH1cblx0fSk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0R3JpZEhUTUwocGxheWVyKSB7XG5cdGNvbnN0IGdyaWRIVE1MID0gaGVscGVyQ2hvb3NlUGxheWVyR3JpZChwbGF5ZXIpO1xuXG5cdGdyaWRIVE1MLmNoaWxkTm9kZXMuZm9yRWFjaCgocm93SFRNTCkgPT4ge1xuXHRcdHJvd0hUTUwuY2hpbGROb2Rlcy5mb3JFYWNoKChzcSkgPT4ge1xuXHRcdFx0c3Euc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYigzMSwgNDEsIDU1KSc7XG5cdFx0fSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiByZW1vdmVHcmlkTGlzdGVuZXJzKCkge1xuXHRjb25zdCBwbGF5ZXJCb2FyZENsb25lID0gcGxheWVyQm9hcmQuY2xvbmVOb2RlKHRydWUpO1xuXHRjb25zdCBhaUJvYXJkQ2xvbmUgPSBhaUJvYXJkLmNsb25lTm9kZSh0cnVlKTtcblxuXHRwbGF5ZXJCb2FyZC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChwbGF5ZXJCb2FyZENsb25lLCBwbGF5ZXJCb2FyZCk7XG5cdGFpQm9hcmQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoYWlCb2FyZENsb25lLCBhaUJvYXJkKTtcblxuXHRwbGF5ZXJCb2FyZCA9IHBsYXllckJvYXJkQ2xvbmU7XG5cdGFpQm9hcmQgPSBhaUJvYXJkQ2xvbmU7XG59XG5cbmZ1bmN0aW9uIGFkZEZsZWV0RGVwbG95bWVudExpc3RlbmVyKG9yaWVudGF0aW9uLCBnYW1lYm9hcmRPYmopIHtcblx0cmVtb3ZlR3JpZExpc3RlbmVycygpO1xuXG5cdHBsYXllckJvYXJkLmNoaWxkTm9kZXMuZm9yRWFjaCgocm93SFRNTCkgPT4ge1xuXHRcdHJvd0hUTUwuY2hpbGROb2Rlcy5mb3JFYWNoKChzcSkgPT4ge1xuXHRcdFx0Y29uc3Qgc3FYID0gK3NxLmdldEF0dHJpYnV0ZSgnZGF0YS14Jyk7XG5cdFx0XHRjb25zdCBzcVkgPSArc3EuZ2V0QXR0cmlidXRlKCdkYXRhLXknKTtcblx0XHRcdGxldCBzaGlwVHlwZU9iajtcblx0XHRcdGxldCBzaGlwTGVuZ3RoO1xuXG5cdFx0XHQvLyBDaGVjayBpZiBwYXJ0aWN1bGFyIHNoaXAgdHlwZSBoYXMgYmVlbiBhbHJlYWR5IGRlcGxveWVkXG5cdFx0XHRpZiAoIWdhbWVib2FyZE9iai5ncmlkLnNvbWUoKGVsKSA9PiBlbC5zaGlwVHlwZSA9PT0gc2hpcFR5cGVzWzBdLnR5cGUpKSB7XG5cdFx0XHRcdHNoaXBMZW5ndGggPSBzaGlwVHlwZXNbMF0ubGVuZ3RoO1xuXHRcdFx0XHRzaGlwVHlwZU9iaiA9IHNoaXBUeXBlc1swXTtcblx0XHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRcdCFnYW1lYm9hcmRPYmouZ3JpZC5zb21lKChlbCkgPT4gZWwuc2hpcFR5cGUgPT09IHNoaXBUeXBlc1sxXS50eXBlKVxuXHRcdFx0KSB7XG5cdFx0XHRcdHNoaXBMZW5ndGggPSBzaGlwVHlwZXNbMV0ubGVuZ3RoO1xuXHRcdFx0XHRzaGlwVHlwZU9iaiA9IHNoaXBUeXBlc1sxXTtcblx0XHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRcdCFnYW1lYm9hcmRPYmouZ3JpZC5zb21lKChlbCkgPT4gZWwuc2hpcFR5cGUgPT09IHNoaXBUeXBlc1syXS50eXBlKVxuXHRcdFx0KSB7XG5cdFx0XHRcdHNoaXBMZW5ndGggPSBzaGlwVHlwZXNbMl0ubGVuZ3RoO1xuXHRcdFx0XHRzaGlwVHlwZU9iaiA9IHNoaXBUeXBlc1syXTtcblx0XHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRcdCFnYW1lYm9hcmRPYmouZ3JpZC5zb21lKChlbCkgPT4gZWwuc2hpcFR5cGUgPT09IHNoaXBUeXBlc1szXS50eXBlKVxuXHRcdFx0KSB7XG5cdFx0XHRcdHNoaXBMZW5ndGggPSBzaGlwVHlwZXNbM10ubGVuZ3RoO1xuXHRcdFx0XHRzaGlwVHlwZU9iaiA9IHNoaXBUeXBlc1szXTtcblx0XHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRcdCFnYW1lYm9hcmRPYmouZ3JpZC5zb21lKChlbCkgPT4gZWwuc2hpcFR5cGUgPT09IHNoaXBUeXBlc1s0XS50eXBlKVxuXHRcdFx0KSB7XG5cdFx0XHRcdHNoaXBMZW5ndGggPSBzaGlwVHlwZXNbNF0ubGVuZ3RoO1xuXHRcdFx0XHRzaGlwVHlwZU9iaiA9IHNoaXBUeXBlc1s0XTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2hlY2sgaWYgc2hpcCBjYW4gYmUgYnVpbHRcblx0XHRcdGNvbnN0IG5vU3BhY2UgPSBnYW1lYm9hcmRPYmouY2hlY2tTcGFjZUZvclNoaXAoXG5cdFx0XHRcdHNxWCxcblx0XHRcdFx0c3FZLFxuXHRcdFx0XHRzaGlwTGVuZ3RoLFxuXHRcdFx0XHRvcmllbnRhdGlvblxuXHRcdFx0KTtcblxuXHRcdFx0Ly8gU2hvdyBvbiBncmlkIGlmIHNoaXAgY2FuIGJlIGFkZGVkXG5cdFx0XHRzcS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XG5cdFx0XHRcdGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IHNxWDsgaSA8IHNxWCArIHNoaXBMZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0aWYgKGkgPiAxMCkgYnJlYWs7XG5cblx0XHRcdFx0XHRcdHBsYXllckJvYXJkLmNoaWxkTm9kZXMuZm9yRWFjaCgocncpID0+IHtcblx0XHRcdFx0XHRcdFx0cncuY2hpbGROb2Rlcy5mb3JFYWNoKChzcXIpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdFx0XHQrc3FyLmdldEF0dHJpYnV0ZSgnZGF0YS14JykgPT09IGkgJiZcblx0XHRcdFx0XHRcdFx0XHRcdCtzcXIuZ2V0QXR0cmlidXRlKCdkYXRhLXknKSA9PT0gc3FZXG5cdFx0XHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBJZiBzaGlwIGNhbid0IGJlIGJ1aWx0IGdyYXkgb3V0IHNxdWFyZXNcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChub1NwYWNlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNxci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDg4LCA4OCwgODgpJztcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gT3RoZXJ3aXNlIHNob3cgcHJvcGVyIHNoaXAgY29sb3Jcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNxci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzaGlwVHlwZU9iai5jb2xvcjtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2UgaWYgKG9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IHNxWTsgaSA8IHNxWSArIHNoaXBMZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0aWYgKGkgPiAxMCkgYnJlYWs7XG5cblx0XHRcdFx0XHRcdHBsYXllckJvYXJkLmNoaWxkTm9kZXMuZm9yRWFjaCgocncpID0+IHtcblx0XHRcdFx0XHRcdFx0cncuY2hpbGROb2Rlcy5mb3JFYWNoKChzcXIpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdFx0XHQrc3FyLmdldEF0dHJpYnV0ZSgnZGF0YS14JykgPT09IHNxWCAmJlxuXHRcdFx0XHRcdFx0XHRcdFx0K3Nxci5nZXRBdHRyaWJ1dGUoJ2RhdGEteScpID09PSBpXG5cdFx0XHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAobm9TcGFjZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzcXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYig4OCwgODgsIDg4KSc7XG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzcXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gc2hpcFR5cGVPYmouY29sb3I7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIFdoZW4gbGVhdmluZyBncmlkIGNlbGwgcmVtb3ZlIGRlcGxveW1lbnQgaW5kaWNhdGlvblxuXHRcdFx0c3EuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcblx0XHRcdFx0cG9wdWxhdGVCb2FyZEhUTUwoJ3BsYXllcicsIGdhbWVib2FyZE9iai5ncmlkKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBBZGQgc2hpcCB0byBwbGF5ZXIncyBib2FyZCBvYmplY3Qgb24gY2xpY2tcblx0XHRcdHNxLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0XHRpZiAoIW5vU3BhY2UpIHtcblx0XHRcdFx0XHRnYW1lYm9hcmRPYmouYWRkU2hpcChzcVgsIHNxWSwgb3JpZW50YXRpb24sIHNoaXBUeXBlT2JqLnR5cGUpO1xuXHRcdFx0XHRcdHJlbW92ZUdyaWRMaXN0ZW5lcnMoKTtcblx0XHRcdFx0XHRhZGRGbGVldERlcGxveW1lbnRMaXN0ZW5lcihvcmllbnRhdGlvbiwgZ2FtZWJvYXJkT2JqKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBlbmRHYW1lKHdpbm5lcikge1xuXHRnYW1lQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3NocmluaycpO1xuXG5cdGlmICh3aW5uZXIgPT09ICdwbGF5ZXInKSB7XG5cdFx0cGxheWVyQm9hcmQuY2xhc3NMaXN0LmFkZCgnd2lubmVyJyk7XG5cdFx0c2NvcmUuaW5uZXJIVE1MID0gJ1lvdSB3b24hJztcblx0fSBlbHNlIGlmICh3aW5uZXIgPT09ICdhaScpIHtcblx0XHRhaUJvYXJkLmNsYXNzTGlzdC5hZGQoJ3dpbm5lcicpO1xuXHRcdHNjb3JlLmlubmVySFRNTCA9ICdBSSB3b24hJztcblx0fVxuXG5cdHNjb3JlLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG5cdHJlc3RhcnRCdG4uc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcbn1cblxuZnVuY3Rpb24gYWRkR2FtZXBsYXlMaXN0ZW5lcnMoYWlPYmplY3QsIHBsYXllck9iamVjdCkge1xuXHRhaUJvYXJkLmNoaWxkTm9kZXMuZm9yRWFjaCgocm93SFRNTCkgPT4ge1xuXHRcdHJvd0hUTUwuY2hpbGROb2Rlcy5mb3JFYWNoKChzcSkgPT4ge1xuXHRcdFx0Y29uc3Qgc3FYID0gK3NxLmdldEF0dHJpYnV0ZSgnZGF0YS14Jyk7XG5cdFx0XHRjb25zdCBzcVkgPSArc3EuZ2V0QXR0cmlidXRlKCdkYXRhLXknKTtcblxuXHRcdFx0c3EuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IGF0dGFjayA9IGFpT2JqZWN0LmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHNxWCwgc3FZKTtcblx0XHRcdFx0aWYgKGF0dGFjayAmJiAhYWlPYmplY3QuZ2FtZWJvYXJkLmdhbWVMb3N0KSB7XG5cdFx0XHRcdFx0YWlPYmplY3QuYWlBdHRhY2socGxheWVyT2JqZWN0LmdhbWVib2FyZCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRwb3B1bGF0ZUJvYXJkSFRNTCgncGxheWVyJywgcGxheWVyT2JqZWN0LmdhbWVib2FyZC5ncmlkKTtcblx0XHRcdFx0cG9wdWxhdGVCb2FyZEhUTUwoJ2FpJywgYWlPYmplY3QuZ2FtZWJvYXJkLmdyaWQpO1xuXG5cdFx0XHRcdGlmIChhaU9iamVjdC5nYW1lYm9hcmQuZ2FtZUxvc3QpIHtcblx0XHRcdFx0XHRyZW1vdmVHcmlkTGlzdGVuZXJzKCk7XG5cdFx0XHRcdFx0ZW5kR2FtZSgncGxheWVyJyk7XG5cdFx0XHRcdH0gZWxzZSBpZiAocGxheWVyT2JqZWN0LmdhbWVib2FyZC5nYW1lTG9zdCkge1xuXHRcdFx0XHRcdHJlbW92ZUdyaWRMaXN0ZW5lcnMoKTtcblx0XHRcdFx0XHRlbmRHYW1lKCdhaScpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSk7XG59XG5cbnN0YXJ0QnRuLm9uY2xpY2sgPSAoKSA9PiB7XG5cdGFpQm9hcmQuc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcblx0b3B0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRyZW1vdmVHcmlkTGlzdGVuZXJzKCk7XG59O1xuXG5yZXN0YXJ0QnRuLm9uY2xpY2sgPSAoKSA9PiB7XG5cdHJlc2V0R3JpZEhUTUwoJ3BsYXllcicpO1xuXHRyZXNldEdyaWRIVE1MKCdhaScpO1xuXG5cdGdhbWVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2hyaW5rJyk7XG5cdGFpQm9hcmQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0b3B0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuXHRzY29yZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXHRyZXN0YXJ0QnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cblx0cGxheWVyQm9hcmQuY2xhc3NMaXN0LnJlbW92ZSgnd2lubmVyJyk7XG5cdGFpQm9hcmQuY2xhc3NMaXN0LnJlbW92ZSgnd2lubmVyJyk7XG59O1xuXG5leHBvcnQge1xuXHRzdGFydEJ0bixcblx0cmFuZG9tQnRuLFxuXHRyZXN0YXJ0QnRuLFxuXHRwb3B1bGF0ZUJvYXJkSFRNTCxcblx0cmVzZXRHcmlkSFRNTCxcblx0YWRkRmxlZXREZXBsb3ltZW50TGlzdGVuZXIsXG5cdGFkZEdhbWVwbGF5TGlzdGVuZXJzLFxuXHRyZW1vdmVHcmlkTGlzdGVuZXJzLFxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWxvb3AtZnVuYyAqL1xuXG5mdW5jdGlvbiBHYW1lYm9hcmQoKSB7XG5cdGxldCBncmlkO1xuXG5cdGNvbnN0IGNyZWF0ZUdyaWQgPSAoKSA9PiB7XG5cdFx0Y29uc3QgZ3JpZEFycmF5ID0gW107XG5cdFx0Zm9yIChsZXQgaSA9IDE7IGkgPCAxMTsgaSsrKSB7XG5cdFx0XHRmb3IgKGxldCBqID0gMTsgaiA8IDExOyBqKyspIHtcblx0XHRcdFx0Z3JpZEFycmF5LnB1c2goe1xuXHRcdFx0XHRcdHg6IGksXG5cdFx0XHRcdFx0eTogaixcblx0XHRcdFx0XHRvY2N1cGllZDogZmFsc2UsXG5cdFx0XHRcdFx0c2hpcFR5cGU6IGZhbHNlLFxuXHRcdFx0XHRcdGhpdFRha2VuOiBmYWxzZSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGdyaWQgPSBncmlkQXJyYXk7XG5cdH07XG5cdGNyZWF0ZUdyaWQoKTtcblxuXHRyZXR1cm4ge1xuXHRcdGdyaWQsXG5cdFx0Z2FtZUxvc3Q6IGZhbHNlLFxuXG5cdFx0Y2xlYXJHcmlkKCkge1xuXHRcdFx0dGhpcy5ncmlkLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuXHRcdFx0XHRzcXVhcmUub2NjdXBpZWQgPSBmYWxzZTtcblx0XHRcdFx0c3F1YXJlLnNoaXBUeXBlID0gZmFsc2U7XG5cdFx0XHRcdHNxdWFyZS5oaXRUYWtlbiA9IGZhbHNlO1xuXG5cdFx0XHRcdHRoaXMuZ2FtZUxvc3QgPSBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvLyBDaGVjayBpZiB0aGVyZSBpcyBzcGFjZSB0byBjcmVhdGUgc2hpcCBhbmQgY29vcmRzIGFyZSBpbiByYW5nZVxuXHRcdGNoZWNrU3BhY2VGb3JTaGlwKHhDb29yZCwgeUNvb3JkLCBsZW5ndGgsIG9yaWVudGF0aW9uKSB7XG5cdFx0XHRjb25zdCBzdGFydFNxdWFyZSA9IHRoaXMuZ2V0U3F1YXJlKHhDb29yZCwgeUNvb3JkKTtcblx0XHRcdGxldCBub1NwYWNlID0gZmFsc2U7XG5cblx0XHRcdGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG5cdFx0XHRcdGZvciAobGV0IGkgPSB4Q29vcmQ7IGkgPCB4Q29vcmQgKyBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGlmIChpID4gMTApIHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdHRoaXMuZ3JpZC5mb3JFYWNoKChzcXVhcmUpID0+IHtcblx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0c3F1YXJlLnggPT09IGkgJiZcblx0XHRcdFx0XHRcdFx0c3F1YXJlLnkgPT09IHN0YXJ0U3F1YXJlLnkgJiZcblx0XHRcdFx0XHRcdFx0c3F1YXJlLm9jY3VwaWVkXG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0bm9TcGFjZSA9IHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IHlDb29yZDsgaSA8IHlDb29yZCArIGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0aWYgKGkgPiAxMCkgcmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0dGhpcy5ncmlkLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0XHRzcXVhcmUueCA9PT0gc3RhcnRTcXVhcmUueCAmJlxuXHRcdFx0XHRcdFx0XHRzcXVhcmUueSA9PT0gaSAmJlxuXHRcdFx0XHRcdFx0XHRzcXVhcmUub2NjdXBpZWRcblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRub1NwYWNlID0gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG5vU3BhY2U7XG5cdFx0fSxcblxuXHRcdGFkZFNoaXAoeENvb3JkLCB5Q29vcmQsIG9yaWVudGF0aW9uLCBzaGlwVHlwZSkge1xuXHRcdFx0Y29uc3Qgc3RhcnRTcXVhcmUgPSB0aGlzLmdldFNxdWFyZSh4Q29vcmQsIHlDb29yZCk7XG5cdFx0XHRpZiAoc3RhcnRTcXVhcmUub2NjdXBpZWQpIHJldHVybiBmYWxzZTtcblxuXHRcdFx0bGV0IGxlbmd0aDtcblx0XHRcdGlmIChzaGlwVHlwZSA9PT0gJ1BhdHJvbCBCb2F0Jykge1xuXHRcdFx0XHRsZW5ndGggPSAyO1xuXHRcdFx0fSBlbHNlIGlmIChzaGlwVHlwZSA9PT0gJ1N1Ym1hcmluZScpIHtcblx0XHRcdFx0bGVuZ3RoID0gMztcblx0XHRcdH0gZWxzZSBpZiAoc2hpcFR5cGUgPT09ICdEZXN0cm95ZXInKSB7XG5cdFx0XHRcdGxlbmd0aCA9IDM7XG5cdFx0XHR9IGVsc2UgaWYgKHNoaXBUeXBlID09PSAnQmF0dGxlc2hpcCcpIHtcblx0XHRcdFx0bGVuZ3RoID0gNDtcblx0XHRcdH0gZWxzZSBpZiAoc2hpcFR5cGUgPT09ICdDYXJyaWVyJykge1xuXHRcdFx0XHRsZW5ndGggPSA1O1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBub1NwYWNlID0gdGhpcy5jaGVja1NwYWNlRm9yU2hpcChcblx0XHRcdFx0eENvb3JkLFxuXHRcdFx0XHR5Q29vcmQsXG5cdFx0XHRcdGxlbmd0aCxcblx0XHRcdFx0b3JpZW50YXRpb25cblx0XHRcdCk7XG5cdFx0XHRpZiAobm9TcGFjZSkgcmV0dXJuIGZhbHNlO1xuXG5cdFx0XHQvLyBCdWlsZCBzaGlwXG5cdFx0XHRpZiAob3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuXHRcdFx0XHRmb3IgKGxldCBpID0geENvb3JkOyBpIDwgeENvb3JkICsgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR0aGlzLmdyaWQuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS54ID09PSBpICYmXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS55ID09PSBzdGFydFNxdWFyZS55ICYmXG5cdFx0XHRcdFx0XHRcdCFzcXVhcmUub2NjdXBpZWRcblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRzcXVhcmUub2NjdXBpZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRzcXVhcmUuc2hpcFR5cGUgPSBzaGlwVHlwZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChvcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuXHRcdFx0XHRmb3IgKGxldCBpID0geUNvb3JkOyBpIDwgeUNvb3JkICsgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHR0aGlzLmdyaWQuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS54ID09PSBzdGFydFNxdWFyZS54ICYmXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS55ID09PSBpICYmXG5cdFx0XHRcdFx0XHRcdCFzcXVhcmUub2NjdXBpZWRcblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRzcXVhcmUub2NjdXBpZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRzcXVhcmUuc2hpcFR5cGUgPSBzaGlwVHlwZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblxuXHRcdHJhbmRvbUZsZWV0UGxhY2VtZW50KCkge1xuXHRcdFx0dGhpcy5yYW5kb21TaGlwUGxhY2VtZW50KCdQYXRyb2wgQm9hdCcpO1xuXHRcdFx0dGhpcy5yYW5kb21TaGlwUGxhY2VtZW50KCdTdWJtYXJpbmUnKTtcblx0XHRcdHRoaXMucmFuZG9tU2hpcFBsYWNlbWVudCgnRGVzdHJveWVyJyk7XG5cdFx0XHR0aGlzLnJhbmRvbVNoaXBQbGFjZW1lbnQoJ0JhdHRsZXNoaXAnKTtcblx0XHRcdHRoaXMucmFuZG9tU2hpcFBsYWNlbWVudCgnQ2FycmllcicpO1xuXHRcdH0sXG5cblx0XHRyYW5kb21TaGlwUGxhY2VtZW50KHNoaXBUeXBlKSB7XG5cdFx0XHRsZXQgc2hpcEJ1aWx0ID0gZmFsc2U7XG5cblx0XHRcdHdoaWxlICghc2hpcEJ1aWx0KSB7XG5cdFx0XHRcdGxldCBvcmllbnRhdGlvbjtcblx0XHRcdFx0Y29uc3Qgb3JpZW50YXRpb25OdW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKSArIDE7XG5cdFx0XHRcdGNvbnN0IHhDb29yZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG5cdFx0XHRcdGNvbnN0IHlDb29yZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG5cblx0XHRcdFx0aWYgKG9yaWVudGF0aW9uTnVtYmVyID09PSAxKSB7XG5cdFx0XHRcdFx0b3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0b3JpZW50YXRpb24gPSAndmVydGljYWwnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0c2hpcEJ1aWx0ID0gdGhpcy5hZGRTaGlwKHhDb29yZCwgeUNvb3JkLCBvcmllbnRhdGlvbiwgc2hpcFR5cGUpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRnZXRTcXVhcmUoeENvb3JkLCB5Q29vcmQpIHtcblx0XHRcdHJldHVybiB0aGlzLmdyaWQuZmluZChcblx0XHRcdFx0KHNxdWFyZSkgPT4gc3F1YXJlLnggPT09IHhDb29yZCAmJiBzcXVhcmUueSA9PT0geUNvb3JkXG5cdFx0XHQpO1xuXHRcdH0sXG5cblx0XHRyZWNlaXZlQXR0YWNrKHhDb29yZCwgeUNvb3JkKSB7XG5cdFx0XHRjb25zdCBzcXVhcmUgPSB0aGlzLmdyaWQuZmluZCgoc3EpID0+IHNxLnggPT09IHhDb29yZCAmJiBzcS55ID09PSB5Q29vcmQpO1xuXG5cdFx0XHRpZiAoc3F1YXJlLmhpdFRha2VuKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmICghc3F1YXJlLmhpdFRha2VuKSB7XG5cdFx0XHRcdHNxdWFyZS5oaXRUYWtlbiA9IHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuY2hlY2tGbGVldENvbmRpdGlvbigpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblxuXHRcdGNoZWNrRmxlZXRDb25kaXRpb24oKSB7XG5cdFx0XHRjb25zdCBmbGVldEFsaXZlID0gdGhpcy5ncmlkLnNvbWUoXG5cdFx0XHRcdChzcXVhcmUpID0+IHNxdWFyZS5vY2N1cGllZCAmJiAhc3F1YXJlLmhpdFRha2VuXG5cdFx0XHQpO1xuXG5cdFx0XHRpZiAoIWZsZWV0QWxpdmUpIHtcblx0XHRcdFx0dGhpcy5nYW1lTG9zdCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSxcblx0fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZCc7XG5cbmZ1bmN0aW9uIFBsYXllcigpIHtcblx0cmV0dXJuIHtcblx0XHRnYW1lYm9hcmQ6IEdhbWVib2FyZCgpLFxuXHRcdGRhbWFnZWRFbmVteTogbnVsbCxcblx0XHRsYXN0RGFtYWdlZEVuZW15OiBudWxsLFxuXHRcdGF0dGFja0RpcmVjdGlvbjogbnVsbCxcblx0XHRkaXJlY3Rpb25zQXR0YWNrZWQ6IFtdLFxuXG5cdFx0YXR0YWNrKHhDb29yZCwgeUNvb3JkLCBlbmVteUJvYXJkKSB7XG5cdFx0XHRlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soeENvb3JkLCB5Q29vcmQpO1xuXHRcdH0sXG5cblx0XHRyYW5kb21BdHRhY2soZW5lbXlCb2FyZCkge1xuXHRcdFx0bGV0IHNob3RGaXJlZCA9IGZhbHNlO1xuXHRcdFx0bGV0IHhDb29yZDtcblx0XHRcdGxldCB5Q29vcmQ7XG5cblx0XHRcdHdoaWxlICghc2hvdEZpcmVkKSB7XG5cdFx0XHRcdHhDb29yZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG5cdFx0XHRcdHlDb29yZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG5cblx0XHRcdFx0c2hvdEZpcmVkID0gZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHhDb29yZCwgeUNvb3JkKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2F2ZSBjb29yZHMgb2YgZGFtYWdlZCBzaGlwXG5cdFx0XHRjb25zdCBkYW1hZ2VkU3F1YXJlID0gZW5lbXlCb2FyZC5nZXRTcXVhcmUoeENvb3JkLCB5Q29vcmQpO1xuXHRcdFx0aWYgKGRhbWFnZWRTcXVhcmUub2NjdXBpZWQgJiYgZGFtYWdlZFNxdWFyZS5oaXRUYWtlbikge1xuXHRcdFx0XHR0aGlzLmRhbWFnZWRFbmVteSA9IGVuZW15Qm9hcmQuZ2V0U3F1YXJlKHhDb29yZCwgeUNvb3JkKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Z2V0UG9zc2libGVTaG90cyhlbmVteUJvYXJkLCBlbmVteVNxdWFyZSkge1xuXHRcdFx0Y29uc3QgbGVmdCA9IGVuZW15Qm9hcmQuZ2V0U3F1YXJlKGVuZW15U3F1YXJlLnggLSAxLCBlbmVteVNxdWFyZS55KTtcblx0XHRcdGNvbnN0IHJpZ2h0ID0gZW5lbXlCb2FyZC5nZXRTcXVhcmUoZW5lbXlTcXVhcmUueCArIDEsIGVuZW15U3F1YXJlLnkpO1xuXHRcdFx0Y29uc3QgdG9wID0gZW5lbXlCb2FyZC5nZXRTcXVhcmUoZW5lbXlTcXVhcmUueCwgZW5lbXlTcXVhcmUueSAtIDEpO1xuXHRcdFx0Y29uc3QgYm90dG9tID0gZW5lbXlCb2FyZC5nZXRTcXVhcmUoZW5lbXlTcXVhcmUueCwgZW5lbXlTcXVhcmUueSArIDEpO1xuXG5cdFx0XHRyZXR1cm4geyBsZWZ0LCByaWdodCwgdG9wLCBib3R0b20gfTtcblx0XHR9LFxuXG5cdFx0cmVzZXRFbmVteURhdGEoKSB7XG5cdFx0XHR0aGlzLmRhbWFnZWRFbmVteSA9IG51bGw7XG5cdFx0XHR0aGlzLmxhc3REYW1hZ2VkRW5lbXkgPSBudWxsO1xuXHRcdFx0dGhpcy5hdHRhY2tEaXJlY3Rpb24gPSBudWxsO1xuXHRcdFx0dGhpcy5kaXJlY3Rpb25zQXR0YWNrZWQgPSBbXTtcblx0XHR9LFxuXG5cdFx0YXR0YWNrV2l0aERpcmVjdGlvbihlbmVteUJvYXJkKSB7XG5cdFx0XHRjb25zdCBwb3NzaWJsZVNob3RzID0gdGhpcy5nZXRQb3NzaWJsZVNob3RzKFxuXHRcdFx0XHRlbmVteUJvYXJkLFxuXHRcdFx0XHR0aGlzLmxhc3REYW1hZ2VkRW5lbXlcblx0XHRcdCk7XG5cblx0XHRcdGlmICh0aGlzLmF0dGFja0RpcmVjdGlvbiA9PT0gJ2xlZnQnKSB7XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRwb3NzaWJsZVNob3RzLmxlZnQgJiZcblx0XHRcdFx0XHQhcG9zc2libGVTaG90cy5sZWZ0LmhpdFRha2VuICYmXG5cdFx0XHRcdFx0dGhpcy5sYXN0RGFtYWdlZEVuZW15Lm9jY3VwaWVkXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhcblx0XHRcdFx0XHRcdHRoaXMubGFzdERhbWFnZWRFbmVteS54IC0gMSxcblx0XHRcdFx0XHRcdHRoaXMubGFzdERhbWFnZWRFbmVteS55XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR0aGlzLmxhc3REYW1hZ2VkRW5lbXkgPSBwb3NzaWJsZVNob3RzLmxlZnQ7XG5cdFx0XHRcdFx0Ly8gSGF2ZW4ndCB0cmllZCBhbm90aGVyIGRpcmVjdGlvbiB5ZXRcblx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbnNBdHRhY2tlZC5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHR0aGlzLmRpcmVjdGlvbnNBdHRhY2tlZC5wdXNoKCdsZWZ0Jyk7XG5cdFx0XHRcdFx0dGhpcy5hdHRhY2tEaXJlY3Rpb24gPSAncmlnaHQnO1xuXHRcdFx0XHRcdC8vIENoYW5nZSBhdHRhY2sgZGlyZWN0aW9uLCBhbmQgc3RhcnQgZnJvbSBmaXJzdCBkYW1hZ2VkIHNoaXAgc3F1YXJlXG5cdFx0XHRcdFx0dGhpcy5sYXN0RGFtYWdlZEVuZW15ID0gdGhpcy5kYW1hZ2VkRW5lbXk7XG5cdFx0XHRcdFx0dGhpcy5hdHRhY2tXaXRoRGlyZWN0aW9uKGVuZW15Qm9hcmQpO1xuXHRcdFx0XHRcdC8vIEJvdGggZGlyZWN0aW9ucyBhdHRhY2tlZFxuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uc0F0dGFja2VkLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdHRoaXMucmVzZXRFbmVteURhdGEoKTtcblx0XHRcdFx0XHR0aGlzLmFpQXR0YWNrKGVuZW15Qm9hcmQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuYXR0YWNrRGlyZWN0aW9uID09PSAncmlnaHQnKSB7XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRwb3NzaWJsZVNob3RzLnJpZ2h0ICYmXG5cdFx0XHRcdFx0IXBvc3NpYmxlU2hvdHMucmlnaHQuaGl0VGFrZW4gJiZcblx0XHRcdFx0XHR0aGlzLmxhc3REYW1hZ2VkRW5lbXkub2NjdXBpZWRcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0ZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKFxuXHRcdFx0XHRcdFx0dGhpcy5sYXN0RGFtYWdlZEVuZW15LnggKyAxLFxuXHRcdFx0XHRcdFx0dGhpcy5sYXN0RGFtYWdlZEVuZW15Lnlcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdHRoaXMubGFzdERhbWFnZWRFbmVteSA9IHBvc3NpYmxlU2hvdHMucmlnaHQ7XG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5kaXJlY3Rpb25zQXR0YWNrZWQubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0dGhpcy5kaXJlY3Rpb25zQXR0YWNrZWQucHVzaCgncmlnaHQnKTtcblx0XHRcdFx0XHR0aGlzLmF0dGFja0RpcmVjdGlvbiA9ICdsZWZ0Jztcblx0XHRcdFx0XHR0aGlzLmxhc3REYW1hZ2VkRW5lbXkgPSB0aGlzLmRhbWFnZWRFbmVteTtcblx0XHRcdFx0XHR0aGlzLmF0dGFja1dpdGhEaXJlY3Rpb24oZW5lbXlCb2FyZCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5kaXJlY3Rpb25zQXR0YWNrZWQubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0dGhpcy5yZXNldEVuZW15RGF0YSgpO1xuXHRcdFx0XHRcdHRoaXMuYWlBdHRhY2soZW5lbXlCb2FyZCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAodGhpcy5hdHRhY2tEaXJlY3Rpb24gPT09ICd0b3AnKSB7XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRwb3NzaWJsZVNob3RzLnRvcCAmJlxuXHRcdFx0XHRcdCFwb3NzaWJsZVNob3RzLnRvcC5oaXRUYWtlbiAmJlxuXHRcdFx0XHRcdHRoaXMubGFzdERhbWFnZWRFbmVteS5vY2N1cGllZFxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soXG5cdFx0XHRcdFx0XHR0aGlzLmxhc3REYW1hZ2VkRW5lbXkueCxcblx0XHRcdFx0XHRcdHRoaXMubGFzdERhbWFnZWRFbmVteS55IC0gMVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0dGhpcy5sYXN0RGFtYWdlZEVuZW15ID0gcG9zc2libGVTaG90cy50b3A7XG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5kaXJlY3Rpb25zQXR0YWNrZWQubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0dGhpcy5kaXJlY3Rpb25zQXR0YWNrZWQucHVzaCgndG9wJyk7XG5cdFx0XHRcdFx0dGhpcy5hdHRhY2tEaXJlY3Rpb24gPSAnYm90dG9tJztcblx0XHRcdFx0XHR0aGlzLmxhc3REYW1hZ2VkRW5lbXkgPSB0aGlzLmRhbWFnZWRFbmVteTtcblx0XHRcdFx0XHR0aGlzLmF0dGFja1dpdGhEaXJlY3Rpb24oZW5lbXlCb2FyZCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5kaXJlY3Rpb25zQXR0YWNrZWQubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0dGhpcy5yZXNldEVuZW15RGF0YSgpO1xuXHRcdFx0XHRcdHRoaXMuYWlBdHRhY2soZW5lbXlCb2FyZCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAodGhpcy5hdHRhY2tEaXJlY3Rpb24gPT09ICdib3R0b20nKSB7XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRwb3NzaWJsZVNob3RzLmJvdHRvbSAmJlxuXHRcdFx0XHRcdCFwb3NzaWJsZVNob3RzLmJvdHRvbS5oaXRUYWtlbiAmJlxuXHRcdFx0XHRcdHRoaXMubGFzdERhbWFnZWRFbmVteS5vY2N1cGllZFxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soXG5cdFx0XHRcdFx0XHR0aGlzLmxhc3REYW1hZ2VkRW5lbXkueCxcblx0XHRcdFx0XHRcdHRoaXMubGFzdERhbWFnZWRFbmVteS55ICsgMVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0dGhpcy5sYXN0RGFtYWdlZEVuZW15ID0gcG9zc2libGVTaG90cy5ib3R0b207XG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5kaXJlY3Rpb25zQXR0YWNrZWQubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0dGhpcy5kaXJlY3Rpb25zQXR0YWNrZWQucHVzaCgnYm90dG9tJyk7XG5cdFx0XHRcdFx0dGhpcy5hdHRhY2tEaXJlY3Rpb24gPSAndG9wJztcblx0XHRcdFx0XHR0aGlzLmxhc3REYW1hZ2VkRW5lbXkgPSB0aGlzLmRhbWFnZWRFbmVteTtcblx0XHRcdFx0XHR0aGlzLmF0dGFja1dpdGhEaXJlY3Rpb24oZW5lbXlCb2FyZCk7XG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5kaXJlY3Rpb25zQXR0YWNrZWQubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0dGhpcy5yZXNldEVuZW15RGF0YSgpO1xuXHRcdFx0XHRcdHRoaXMuYWlBdHRhY2soZW5lbXlCb2FyZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0YWlBdHRhY2soZW5lbXlCb2FyZCkge1xuXHRcdFx0Ly8gUmFuZG9tIGF0dGFjayBoaXQgZW5lbXkgc2hpcFxuXHRcdFx0aWYgKHRoaXMuZGFtYWdlZEVuZW15KSB7XG5cdFx0XHRcdGNvbnN0IHBvc3NpYmxlU2hvdHMgPSB0aGlzLmdldFBvc3NpYmxlU2hvdHMoXG5cdFx0XHRcdFx0ZW5lbXlCb2FyZCxcblx0XHRcdFx0XHR0aGlzLmRhbWFnZWRFbmVteVxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdGlmICh0aGlzLmF0dGFja0RpcmVjdGlvbikge1xuXHRcdFx0XHRcdHRoaXMuYXR0YWNrV2l0aERpcmVjdGlvbihlbmVteUJvYXJkKTtcblxuXHRcdFx0XHRcdC8vIEF0dGFjayBkaXJlY3Rpb24gdW5zcGVjaWZpZWRcblx0XHRcdFx0fSBlbHNlIGlmICghdGhpcy5hdHRhY2tEaXJlY3Rpb24pIHtcblx0XHRcdFx0XHRpZiAocG9zc2libGVTaG90cy5sZWZ0ICYmICFwb3NzaWJsZVNob3RzLmxlZnQuaGl0VGFrZW4pIHtcblx0XHRcdFx0XHRcdGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhcblx0XHRcdFx0XHRcdFx0dGhpcy5kYW1hZ2VkRW5lbXkueCAtIDEsXG5cdFx0XHRcdFx0XHRcdHRoaXMuZGFtYWdlZEVuZW15Lnlcblx0XHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRcdGlmIChwb3NzaWJsZVNob3RzLmxlZnQub2NjdXBpZWQgJiYgcG9zc2libGVTaG90cy5sZWZ0LmhpdFRha2VuKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuYXR0YWNrRGlyZWN0aW9uID0gJ2xlZnQnO1xuXHRcdFx0XHRcdFx0XHR0aGlzLmxhc3REYW1hZ2VkRW5lbXkgPSBwb3NzaWJsZVNob3RzLmxlZnQ7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChwb3NzaWJsZVNob3RzLnJpZ2h0ICYmICFwb3NzaWJsZVNob3RzLnJpZ2h0LmhpdFRha2VuKSB7XG5cdFx0XHRcdFx0XHRlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soXG5cdFx0XHRcdFx0XHRcdHRoaXMuZGFtYWdlZEVuZW15LnggKyAxLFxuXHRcdFx0XHRcdFx0XHR0aGlzLmRhbWFnZWRFbmVteS55XG5cdFx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0XHRpZiAocG9zc2libGVTaG90cy5yaWdodC5vY2N1cGllZCAmJiBwb3NzaWJsZVNob3RzLnJpZ2h0LmhpdFRha2VuKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuYXR0YWNrRGlyZWN0aW9uID0gJ3JpZ2h0Jztcblx0XHRcdFx0XHRcdFx0dGhpcy5sYXN0RGFtYWdlZEVuZW15ID0gcG9zc2libGVTaG90cy5yaWdodDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2UgaWYgKHBvc3NpYmxlU2hvdHMudG9wICYmICFwb3NzaWJsZVNob3RzLnRvcC5oaXRUYWtlbikge1xuXHRcdFx0XHRcdFx0ZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKFxuXHRcdFx0XHRcdFx0XHR0aGlzLmRhbWFnZWRFbmVteS54LFxuXHRcdFx0XHRcdFx0XHR0aGlzLmRhbWFnZWRFbmVteS55IC0gMVxuXHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0aWYgKHBvc3NpYmxlU2hvdHMudG9wLm9jY3VwaWVkICYmIHBvc3NpYmxlU2hvdHMudG9wLmhpdFRha2VuKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuYXR0YWNrRGlyZWN0aW9uID0gJ3RvcCc7XG5cdFx0XHRcdFx0XHRcdHRoaXMubGFzdERhbWFnZWRFbmVteSA9IHBvc3NpYmxlU2hvdHMudG9wO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocG9zc2libGVTaG90cy5ib3R0b20gJiYgIXBvc3NpYmxlU2hvdHMuYm90dG9tLmhpdFRha2VuKSB7XG5cdFx0XHRcdFx0XHRlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soXG5cdFx0XHRcdFx0XHRcdHRoaXMuZGFtYWdlZEVuZW15LngsXG5cdFx0XHRcdFx0XHRcdHRoaXMuZGFtYWdlZEVuZW15LnkgKyAxXG5cdFx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdHBvc3NpYmxlU2hvdHMuYm90dG9tLm9jY3VwaWVkICYmXG5cdFx0XHRcdFx0XHRcdHBvc3NpYmxlU2hvdHMuYm90dG9tLmhpdFRha2VuXG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5hdHRhY2tEaXJlY3Rpb24gPSAnYm90dG9tJztcblx0XHRcdFx0XHRcdFx0dGhpcy5sYXN0RGFtYWdlZEVuZW15ID0gcG9zc2libGVTaG90cy5ib3R0b207XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKCF0aGlzLmRhbWFnZWRFbmVteSkge1xuXHRcdFx0XHR0aGlzLnJhbmRvbUF0dGFjayhlbmVteUJvYXJkKTtcblx0XHRcdH1cblx0XHR9LFxuXHR9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gJy4vZmFjdG9yaWVzL3BsYXllcic7XG5pbXBvcnQge1xuXHRzdGFydEJ0bixcblx0cmFuZG9tQnRuLFxuXHRyZXN0YXJ0QnRuLFxuXHRwb3B1bGF0ZUJvYXJkSFRNTCxcblx0cmVzZXRHcmlkSFRNTCxcblx0YWRkRmxlZXREZXBsb3ltZW50TGlzdGVuZXIsXG5cdGFkZEdhbWVwbGF5TGlzdGVuZXJzLFxuXHRyZW1vdmVHcmlkTGlzdGVuZXJzLFxufSBmcm9tICcuL0RPTSc7XG5cbi8vIEluaXRpYWxpemUgcGxheWVyc1xuY29uc3QgcGxheWVyID0gUGxheWVyKCk7XG5jb25zdCBhaSA9IFBsYXllcigpO1xuXG4vLyBQbGF5ZXIgcmFuZG9tIGZsZWV0IGRlcGxveW1lbnRcbnJhbmRvbUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0cGxheWVyLmdhbWVib2FyZC5jbGVhckdyaWQoKTtcblx0cmVzZXRHcmlkSFRNTCgncGxheWVyJyk7XG5cdHJlbW92ZUdyaWRMaXN0ZW5lcnMoKTtcblx0cGxheWVyLmdhbWVib2FyZC5yYW5kb21GbGVldFBsYWNlbWVudCgpO1xuXHRwb3B1bGF0ZUJvYXJkSFRNTCgncGxheWVyJywgcGxheWVyLmdhbWVib2FyZC5ncmlkKTtcbn0pO1xuXG4vLyBQbGF5ZXIgbWFudWFsIGZsZWV0IGRlcGxveW1lbnRcbmxldCBvcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcblxuYWRkRmxlZXREZXBsb3ltZW50TGlzdGVuZXIob3JpZW50YXRpb24sIHBsYXllci5nYW1lYm9hcmQpO1xuXG4vLyBUb2dnbGUgc2hpcCBvcmllbnRhdGlvblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuXHRpZiAoZS5jb2RlID09PSAnS2V5UicpIHtcblx0XHRpZiAob3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuXHRcdFx0b3JpZW50YXRpb24gPSAndmVydGljYWwnO1xuXHRcdH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcblx0XHRcdG9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xuXHRcdH1cblx0XHRyZXNldEdyaWRIVE1MKCdwbGF5ZXInKTtcblx0XHRwb3B1bGF0ZUJvYXJkSFRNTCgncGxheWVyJywgcGxheWVyLmdhbWVib2FyZC5ncmlkKTtcblx0XHRhZGRGbGVldERlcGxveW1lbnRMaXN0ZW5lcihvcmllbnRhdGlvbiwgcGxheWVyLmdhbWVib2FyZCk7XG5cdH1cblxuXHRpZiAoZS5jb2RlID09PSAnS2V5RicpIHtcblx0XHRwbGF5ZXIucmFuZG9tQXR0YWNrKGFpLmdhbWVib2FyZCk7XG5cdFx0YWkuYWlBdHRhY2socGxheWVyLmdhbWVib2FyZCk7XG5cdFx0cG9wdWxhdGVCb2FyZEhUTUwoJ3BsYXllcicsIHBsYXllci5nYW1lYm9hcmQuZ3JpZCk7XG5cdFx0cG9wdWxhdGVCb2FyZEhUTUwoJ2FpJywgYWkuZ2FtZWJvYXJkLmdyaWQpO1xuXHR9XG59KTtcblxuc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdC8vIENoZWNrIGlmIGZsZWV0IGlzIGRlcGxveWVkXG5cdGNvbnN0IGZsZWV0RGVwbG95ZWQgPSBbXTtcblx0cGxheWVyLmdhbWVib2FyZC5ncmlkLmZvckVhY2goKHNxKSA9PiB7XG5cdFx0aWYgKHNxLm9jY3VwaWVkKSBmbGVldERlcGxveWVkLnB1c2godHJ1ZSk7XG5cdH0pO1xuXHQvLyBJZiBub3QsIGRlcGxveSByYW5kb21seVxuXHRpZiAoZmxlZXREZXBsb3llZC5sZW5ndGggIT09IDE3KSB7XG5cdFx0cmFuZG9tQnRuLmNsaWNrKCk7XG5cdH1cblxuXHQvLyBBSSByYW5kb20gZmxlZXQgZGVwbG95bWVudFxuXHRhaS5nYW1lYm9hcmQucmFuZG9tRmxlZXRQbGFjZW1lbnQoKTtcblx0YWRkR2FtZXBsYXlMaXN0ZW5lcnMoYWksIHBsYXllcik7XG59KTtcblxucmVzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0cGxheWVyLmdhbWVib2FyZC5jbGVhckdyaWQoKTtcblx0YWkuZ2FtZWJvYXJkLmNsZWFyR3JpZCgpO1xuXG5cdGFkZEZsZWV0RGVwbG95bWVudExpc3RlbmVyKG9yaWVudGF0aW9uLCBwbGF5ZXIuZ2FtZWJvYXJkKTtcbn0pO1xuIiwiY29uc3Qgc2hpcFR5cGVzID0gW1xuXHR7IHR5cGU6ICdDYXJyaWVyJywgbGVuZ3RoOiA1LCBjb2xvcjogJ3JnYigyNTAsIDEwOCwgNTYpJyB9LFxuXHR7IHR5cGU6ICdCYXR0bGVzaGlwJywgbGVuZ3RoOiA0LCBjb2xvcjogJ3JnYigyNTUsIDE1NSwgMTMzKScgfSxcblx0eyB0eXBlOiAnRGVzdHJveWVyJywgbGVuZ3RoOiAzLCBjb2xvcjogJ3JnYigyNDYsIDIxNSwgNjApJyB9LFxuXHR7IHR5cGU6ICdTdWJtYXJpbmUnLCBsZW5ndGg6IDMsIGNvbG9yOiAncmdiKDAsIDE4NCwgMTQ0KScgfSxcblx0eyB0eXBlOiAnUGF0cm9sIEJvYXQnLCBsZW5ndGg6IDIsIGNvbG9yOiAncmdiKDgwLCAxODAsIDIyNiknIH0sXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBzaGlwVHlwZXM7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJvYm90bytNb25vOndnaHRANjAwJmZhbWlseT1VbmJvdW5kZWQ6d2dodEA4MDAmZGlzcGxheT1zd2FwKTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxZjI5Mzc7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgbWluLXdpZHRoOiA5NTBweDtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBtaW4taGVpZ2h0OiA3MjBweDtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIE1vbm8nLCBtb25vc3BhY2U7IH1cXG5cXG4udGl0bGUge1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMzBweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBjb2xvcjogd2hpdGU7XFxuICBmb250LWZhbWlseTogJ1VuYm91bmRlZCcsIGN1cnNpdmU7XFxuICBmb250LXNpemU6IDgwcHg7XFxuICBtYXJnaW4tdG9wOiAzMHB4OyB9XFxuXFxuLnNjb3JlIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgdG9wOiAyMyU7XFxuICB6LWluZGV4OiAxO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiA0MHB4O1xcbiAgdHJhbnNpdGlvbjogYWxsIDFzOyB9XFxuXFxuLnJlc3RhcnQge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3R0b206IDE1JTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMC44NSk7XFxuICB0cmFuc2l0aW9uOiBhbGwgMXM7IH1cXG5cXG4uZ2FtZS1jb250YWluZXIuc2hyaW5rIHtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMC42KTsgfVxcblxcbi53aW5uZXIge1xcbiAgYm94LXNoYWRvdzogMHB4IDBweCAyOXB4IDVweCB3aGl0ZTsgfVxcblxcbi5nYW1lLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAxMDBweDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTAwJTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxczsgfVxcbiAgLmdhbWUtY29udGFpbmVyIC5sZWZ0LFxcbiAgLmdhbWUtY29udGFpbmVyIC5yaWdodCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHdpZHRoOiA1MHZ3O1xcbiAgICBoZWlnaHQ6IDUwMHB4O1xcbiAgICBtYXJnaW4tdG9wOiAtMiU7IH1cXG4gIC5nYW1lLWNvbnRhaW5lciAubGVmdCB7XFxuICAgIGp1c3RpZnktY29udGVudDogZW5kOyB9XFxuICAuZ2FtZS1jb250YWluZXIgLnJpZ2h0IHtcXG4gICAganVzdGlmeS1jb250ZW50OiBzdGFydDsgfVxcbiAgLmdhbWUtY29udGFpbmVyIC5vcHRpb25zIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGZsZXgtc2hyaW5rOiAwO1xcbiAgICBnYXA6IDIwcHg7XFxuICAgIHdpZHRoOiAzODBweDtcXG4gICAgaGVpZ2h0OiA1MDBweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBmb250LXNpemU6IDMzcHg7XFxuICAgIGxpbmUtaGVpZ2h0OiA1MnB4OyB9XFxuICAgIC5nYW1lLWNvbnRhaW5lciAub3B0aW9ucyAucm90YXRlLWluc3RydWN0aW9uIHtcXG4gICAgICBoZWlnaHQ6IDEzNXB4O1xcbiAgICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCB3aGl0ZTsgfVxcbiAgICAuZ2FtZS1jb250YWluZXIgLm9wdGlvbnMgLnJhbmRvbS1kZXBsb3ltZW50IHtcXG4gICAgICBkaXNwbGF5OiBmbGV4OyB9XFxuXFxuLmJvYXJkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZmxleC1zaHJpbms6IDA7XFxuICB3aWR0aDogNDAwcHg7XFxuICBoZWlnaHQ6IDQwMHB4O1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggd2hpdGU7IH1cXG4gIC5ib2FyZCAucm93IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgZmxleC1ncm93OiAxOyB9XFxuXFxuLnNxdWFyZSB7XFxuICBmbGV4LWdyb3c6IDE7XFxuICBib3JkZXI6IHNvbGlkIDFweCB3aGl0ZTsgfVxcblxcbi5mb290ZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGhlaWdodDogNzBweDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIG1hcmdpbi1ib3R0b206IDVweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMTVweDtcXG4gIGNvbG9yOiAjYzhjOGM4OyB9XFxuXFxuI2dpdGh1YiB7XFxuICBoZWlnaHQ6IDI3cHg7XFxuICB3aWR0aDogMjdweDtcXG4gIHBhZGRpbmctYm90dG9tOiAwLjJ2aDtcXG4gIHRyYW5zaXRpb246IDAuM3M7IH1cXG5cXG4jZ2l0aHViOmhvdmVyIHtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS4xKTsgfVxcblxcbi5idXR0b24ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgbWFyZ2luOiAyNXB4IDEwcHggMCAxMHB4O1xcbiAgd2lkdGg6IDE5MHB4O1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgwLjgzKTtcXG4gIGxpbmUtaGVpZ2h0OiAyMXB4OyB9XFxuXFxuLmJ1dHRvbiBhIHtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGZvbnQtZmFtaWx5OiBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGZvbnQtc2l6ZTogMjVweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNiNTVlNGI7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHBhZGRpbmc6IDIwcHggNDBweDtcXG4gIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcXG4gIHRleHQtc2hhZG93OiAwcHggMXB4IDBweCAjMDAwO1xcbiAgZmlsdGVyOiBkcm9wc2hhZG93KGNvbG9yPSMwMDAsIG9mZng9MCBweCwgb2ZmeT0xIHB4KTtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAjZmZlNWM0LCAwIDhweCAwICM2ZTNlMDA7XFxuICAtbW96LWJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDAgI2ZmZTVjNCwgMCA4cHggMCAjNmUzZTAwO1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAjZmZlNWM0LCAwIDhweCAwICM2ZTNlMDA7XFxuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDVweDtcXG4gIC1tb3otYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogNXB4OyB9XFxuXFxuLmJ1dHRvbiBhOmFjdGl2ZSB7XFxuICB0b3A6IDEwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYjU1ZTRiO1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAwICNmZmU1YzQsIGluc2V0IDAgLTNweCAwICM5MTUxMDA7XFxuICAtbW96LWJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDAgI2ZmZTVjNCwgaW5zZXQgMCAtM3B4IDAgIzkxNTEwMDtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDAgI2ZmZTVjNCwgaW5zZXQgMCAtM3B4IDAgIzkxNTEwMDsgfVxcblxcbi5idXR0b24uc3RhcnQgYSxcXG4uYnV0dG9uLnN0YXJ0IGE6YWN0aXZlLFxcbi5idXR0b24ucmVzdGFydC1idG4gYSxcXG4uYnV0dG9uLnJlc3RhcnQgYTphY3RpdmUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2MzMTIxMjsgfVxcblxcbi5idXR0b246YWZ0ZXIge1xcbiAgY29udGVudDogJyc7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBhZGRpbmc6IDRweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvdHRvbTogLTE1cHg7XFxuICBsZWZ0OiAtNHB4O1xcbiAgei1pbmRleDogLTE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmIxODAwO1xcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHg7XFxuICAtbW96LWJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDsgfVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUVBO0VBQ0MsYUFBYTtFQUNi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QUF1QjtFQUN2QixrQkFBa0IsRUFBQVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Sb2JvdG8rTW9ubzp3Z2h0QDYwMCZmYW1pbHk9VW5ib3VuZGVkOndnaHRAODAwJmRpc3BsYXk9c3dhcCcpO1xcblxcbmJvZHkge1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMzEsIDQxLCA1NSk7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFxuXFx0d2lkdGg6IDEwMHZ3O1xcblxcdG1pbi13aWR0aDogOTUwcHg7XFxuXFx0aGVpZ2h0OiAxMDB2aDtcXG5cXHRtaW4taGVpZ2h0OiA3MjBweDtcXG5cXG5cXHRmb250LWZhbWlseTogJ1JvYm90byBNb25vJywgbW9ub3NwYWNlO1xcbn1cXG5cXG4udGl0bGUge1xcblxcdHdpZHRoOiAxMDB2dztcXG5cXHRoZWlnaHQ6IDEzMHB4O1xcblxcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuXFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXHRjb2xvcjogd2hpdGU7XFxuXFx0Zm9udC1mYW1pbHk6ICdVbmJvdW5kZWQnLCBjdXJzaXZlO1xcblxcdGZvbnQtc2l6ZTogODBweDtcXG5cXHRtYXJnaW4tdG9wOiAzMHB4O1xcbn1cXG5cXG4uc2NvcmUge1xcblxcdGRpc3BsYXk6IG5vbmU7XFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcblxcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xcblxcblxcdHdpZHRoOiAxMDAlO1xcblxcdHRvcDogMjMlO1xcblxcdHotaW5kZXg6IDE7XFxuXFxuXFx0Y29sb3I6IHdoaXRlO1xcblxcdHRleHQtYWxpZ246IGNlbnRlcjtcXG5cXHRmb250LXNpemU6IDQwcHg7XFxuXFx0dHJhbnNpdGlvbjogYWxsIDFzO1xcbn1cXG5cXG4ucmVzdGFydCB7XFxuXFx0ZGlzcGxheTogbm9uZTtcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuXFxuXFx0d2lkdGg6IDEwMCU7XFxuXFx0Ym90dG9tOiAxNSU7XFxuXFx0dHJhbnNmb3JtOiBzY2FsZSgwLjg1KTtcXG5cXHR0cmFuc2l0aW9uOiBhbGwgMXM7XFxufVxcblxcbi8vIEVuZGdhbWUgc3R5bGl6YXRpb25cXG4uZ2FtZS1jb250YWluZXIuc2hyaW5rIHtcXG5cXHR0cmFuc2Zvcm06IHNjYWxlKDAuNik7XFxufVxcblxcbi53aW5uZXIge1xcblxcdGJveC1zaGFkb3c6IDBweCAwcHggMjlweCA1cHggcmdiKDI1NSwgMjU1LCAyNTUpO1xcbn1cXG4vLyA8L0VuZGdhbWUgc3R5bGl6YXRpb24+XFxuXFxuLmdhbWUtY29udGFpbmVyIHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFx0Z2FwOiAxMDBweDtcXG5cXG5cXHR3aWR0aDogMTAwdnc7XFxuXFx0aGVpZ2h0OiAxMDAlO1xcblxcdGNvbG9yOiB3aGl0ZTtcXG5cXHR0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMXM7XFxuXFxuXFx0LmxlZnQsXFxuXFx0LnJpZ2h0IHtcXG5cXHRcXHRkaXNwbGF5OiBmbGV4O1xcblxcdFxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFxuXFx0XFx0d2lkdGg6IDUwdnc7XFxuXFx0XFx0aGVpZ2h0OiA1MDBweDtcXG5cXHRcXHRtYXJnaW4tdG9wOiAtMiU7XFxuXFx0fVxcblxcblxcdC5sZWZ0IHtcXG5cXHRcXHRqdXN0aWZ5LWNvbnRlbnQ6IGVuZDtcXG5cXHR9XFxuXFx0LnJpZ2h0IHtcXG5cXHRcXHRqdXN0aWZ5LWNvbnRlbnQ6IHN0YXJ0O1xcblxcdH1cXG5cXG5cXHQub3B0aW9ucyB7XFxuXFx0XFx0ZGlzcGxheTogZmxleDtcXG5cXHRcXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXHRcXHRhbGlnbi1pdGVtczogY2VudGVyO1xcblxcdFxcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuXFx0XFx0ZmxleC1zaHJpbms6IDA7XFxuXFx0XFx0Z2FwOiAyMHB4O1xcblxcblxcdFxcdHdpZHRoOiAzODBweDtcXG5cXHRcXHRoZWlnaHQ6IDUwMHB4O1xcblxcdFxcdHRleHQtYWxpZ246IGNlbnRlcjtcXG5cXHRcXHRmb250LXNpemU6IDMzcHg7XFxuXFx0XFx0bGluZS1oZWlnaHQ6IDUycHg7XFxuXFxuXFx0XFx0LnJvdGF0ZS1pbnN0cnVjdGlvbiB7XFxuXFx0XFx0XFx0aGVpZ2h0OiAxMzVweDtcXG5cXHRcXHRcXHRib3JkZXItYm90dG9tOiAycHggc29saWQgd2hpdGU7XFxuXFx0XFx0fVxcblxcblxcdFxcdC5yYW5kb20tZGVwbG95bWVudCB7XFxuXFx0XFx0XFx0ZGlzcGxheTogZmxleDtcXG5cXHRcXHR9XFxuXFx0fVxcbn1cXG5cXG4uYm9hcmQge1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG5cXHRmbGV4LXNocmluazogMDtcXG5cXG5cXHR3aWR0aDogNDAwcHg7XFxuXFx0aGVpZ2h0OiA0MDBweDtcXG5cXHRib3JkZXI6IHNvbGlkIDFweCB3aGl0ZTtcXG5cXG5cXHQucm93IHtcXG5cXHRcXHRkaXNwbGF5OiBmbGV4O1xcblxcdFxcdGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuXFx0XFx0ZmxleC1ncm93OiAxO1xcblxcdH1cXG59XFxuXFxuLnNxdWFyZSB7XFxuXFx0ZmxleC1ncm93OiAxO1xcblxcdGJvcmRlcjogc29saWQgMXB4IHdoaXRlO1xcbn1cXG5cXG4uZm9vdGVyIHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xcblxcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFxuXFx0aGVpZ2h0OiA3MHB4O1xcblxcdHdpZHRoOiAxMDB2dztcXG5cXHRtYXJnaW4tYm90dG9tOiA1cHg7XFxuXFxuXFx0dGV4dC1hbGlnbjogY2VudGVyO1xcblxcdGZvbnQtc2l6ZTogMTVweDtcXG5cXHRjb2xvcjogcmdiKDIwMCwgMjAwLCAyMDApO1xcbn1cXG5cXG4jZ2l0aHViIHtcXG5cXHRoZWlnaHQ6IDI3cHg7XFxuXFx0d2lkdGg6IDI3cHg7XFxuXFx0cGFkZGluZy1ib3R0b206IDAuMnZoO1xcblxcdHRyYW5zaXRpb246IDAuM3M7XFxufVxcblxcbiNnaXRodWI6aG92ZXIge1xcblxcdHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcXG59XFxuXFxuLy8gQnV0dG9uIGZyb20gaHR0cHM6Ly9kZXYudG8vd2ViZGVhc3kvdG9wLTIwLWNzcy1idXR0b25zLWFuaW1hdGlvbnMtZjQxXFxuLy8gYXV0aG9yIGplbXdhcmUuIEFkanVzdGVkIHRvIG15IG93biBuZWVkcy5cXG4uYnV0dG9uIHtcXG5cXHRwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xcblxcdG1hcmdpbjogMjVweCAxMHB4IDAgMTBweDtcXG5cXG5cXHR3aWR0aDogMTkwcHg7XFxuXFx0dHJhbnNmb3JtOiBzY2FsZSgwLjgzKTtcXG5cXHRsaW5lLWhlaWdodDogMjFweDtcXG59XFxuXFxuLmJ1dHRvbiBhIHtcXG5cXHRjb2xvcjogd2hpdGU7XFxuXFx0Zm9udC1mYW1pbHk6IEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXG5cXHRmb250LXdlaWdodDogYm9sZDtcXG5cXHRmb250LXNpemU6IDI1cHg7XFxuXFx0dGV4dC1hbGlnbjogY2VudGVyO1xcblxcdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTgxLCA5NCwgNzUpO1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcblxcdHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXHRwYWRkaW5nOiAyMHB4IDQwcHg7XFxuXFxuXFx0LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcblxcdHRleHQtc2hhZG93OiAwcHggMXB4IDBweCAjMDAwO1xcblxcdGZpbHRlcjogZHJvcHNoYWRvdyhjb2xvcj0jMDAwLCBvZmZ4PTBweCwgb2ZmeT0xcHgpO1xcblxcblxcdC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAjZmZlNWM0LCAwIDhweCAwICM2ZTNlMDA7XFxuXFx0LW1vei1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAwICNmZmU1YzQsIDAgOHB4IDAgIzZlM2UwMDtcXG5cXHRib3gtc2hhZG93OiBpbnNldCAwIDFweCAwICNmZmU1YzQsIDAgOHB4IDAgIzZlM2UwMDtcXG5cXG5cXHQtd2Via2l0LWJvcmRlci1yYWRpdXM6IDVweDtcXG5cXHQtbW96LWJvcmRlci1yYWRpdXM6IDVweDtcXG5cXHRib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcblxcbi5idXR0b24gYTphY3RpdmUge1xcblxcdHRvcDogMTBweDtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTgxLCA5NCwgNzUpO1xcblxcblxcdC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAjZmZlNWM0LCBpbnNldCAwIC0zcHggMCAjOTE1MTAwO1xcblxcdC1tb3otYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAjZmZlNWM0LCBpbnNldCAwIC0zcHggMCAjOTE1MTAwO1xcblxcdGJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDAgI2ZmZTVjNCwgaW5zZXQgMCAtM3B4IDAgIzkxNTEwMDtcXG59XFxuXFxuLmJ1dHRvbi5zdGFydCBhLFxcbi5idXR0b24uc3RhcnQgYTphY3RpdmUsXFxuLmJ1dHRvbi5yZXN0YXJ0LWJ0biBhLFxcbi5idXR0b24ucmVzdGFydCBhOmFjdGl2ZSB7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogI2MzMTIxMjtcXG59XFxuXFxuLmJ1dHRvbjphZnRlciB7XFxuXFx0Y29udGVudDogJyc7XFxuXFx0aGVpZ2h0OiAxMDAlO1xcblxcdHdpZHRoOiAxMDAlO1xcblxcdHBhZGRpbmc6IDRweDtcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0Ym90dG9tOiAtMTVweDtcXG5cXHRsZWZ0OiAtNHB4O1xcblxcdHotaW5kZXg6IC0xO1xcblxcdGJhY2tncm91bmQtY29sb3I6ICMyYjE4MDA7XFxuXFx0LXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHg7XFxuXFx0LW1vei1ib3JkZXItcmFkaXVzOiA1cHg7XFxuXFx0Ym9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9zdHlsZS5zY3NzJztcbmltcG9ydCAnLi9tb2R1bGVzL2dhbWVMb29wJztcbiJdLCJuYW1lcyI6WyJzaGlwVHlwZXMiLCJnaXRJY29uIiwiZ2l0SW1nIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwic3JjIiwiZ2FtZUNvbnRhaW5lciIsImxlZnQiLCJyaWdodCIsIm9wdGlvbnMiLCJzY29yZSIsInJhbmRvbUJ0biIsInN0YXJ0QnRuIiwicmVzdGFydEJ0biIsInJvdyIsImNyZWF0ZUVsZW1lbnQiLCJzcXVhcmUiLCJwbGF5ZXJCb2FyZCIsImNsYXNzTGlzdCIsImFkZCIsImkiLCJhcHBlbmRDaGlsZCIsImNsb25lTm9kZSIsImoiLCJ0ZW1wU3F1YXJlIiwic2V0QXR0cmlidXRlIiwibGFzdENoaWxkIiwiYWlCb2FyZCIsInN0eWxlIiwiZGlzcGxheSIsImhlbHBlckNob29zZVBsYXllckdyaWQiLCJwbGF5ZXIiLCJwb3B1bGF0ZUJvYXJkSFRNTCIsImdyaWRPYmplY3QiLCJncmlkSFRNTCIsInNxdWFyZUhUTUwiLCJmb3JFYWNoIiwic3F1YXJlT2JqIiwiY2hpbGROb2RlcyIsInJvd0hUTUwiLCJzcSIsIngiLCJnZXRBdHRyaWJ1dGUiLCJ5Iiwib2NjdXBpZWQiLCJoaXRUYWtlbiIsImJhY2tncm91bmRDb2xvciIsInNoaXBUeXBlIiwidHlwZSIsImNvbG9yIiwicmVzZXRHcmlkSFRNTCIsInJlbW92ZUdyaWRMaXN0ZW5lcnMiLCJwbGF5ZXJCb2FyZENsb25lIiwiYWlCb2FyZENsb25lIiwicGFyZW50Tm9kZSIsInJlcGxhY2VDaGlsZCIsImFkZEZsZWV0RGVwbG95bWVudExpc3RlbmVyIiwib3JpZW50YXRpb24iLCJnYW1lYm9hcmRPYmoiLCJzcVgiLCJzcVkiLCJzaGlwVHlwZU9iaiIsInNoaXBMZW5ndGgiLCJncmlkIiwic29tZSIsImVsIiwibGVuZ3RoIiwibm9TcGFjZSIsImNoZWNrU3BhY2VGb3JTaGlwIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJ3Iiwic3FyIiwiYWRkU2hpcCIsImVuZEdhbWUiLCJ3aW5uZXIiLCJpbm5lckhUTUwiLCJhZGRHYW1lcGxheUxpc3RlbmVycyIsImFpT2JqZWN0IiwicGxheWVyT2JqZWN0IiwiYXR0YWNrIiwiZ2FtZWJvYXJkIiwicmVjZWl2ZUF0dGFjayIsImdhbWVMb3N0IiwiYWlBdHRhY2siLCJvbmNsaWNrIiwicmVtb3ZlIiwiR2FtZWJvYXJkIiwiY3JlYXRlR3JpZCIsImdyaWRBcnJheSIsInB1c2giLCJjbGVhckdyaWQiLCJ4Q29vcmQiLCJ5Q29vcmQiLCJzdGFydFNxdWFyZSIsImdldFNxdWFyZSIsInJhbmRvbUZsZWV0UGxhY2VtZW50IiwicmFuZG9tU2hpcFBsYWNlbWVudCIsInNoaXBCdWlsdCIsIm9yaWVudGF0aW9uTnVtYmVyIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZmluZCIsImNoZWNrRmxlZXRDb25kaXRpb24iLCJmbGVldEFsaXZlIiwiUGxheWVyIiwiZGFtYWdlZEVuZW15IiwibGFzdERhbWFnZWRFbmVteSIsImF0dGFja0RpcmVjdGlvbiIsImRpcmVjdGlvbnNBdHRhY2tlZCIsImVuZW15Qm9hcmQiLCJyYW5kb21BdHRhY2siLCJzaG90RmlyZWQiLCJkYW1hZ2VkU3F1YXJlIiwiZ2V0UG9zc2libGVTaG90cyIsImVuZW15U3F1YXJlIiwidG9wIiwiYm90dG9tIiwicmVzZXRFbmVteURhdGEiLCJhdHRhY2tXaXRoRGlyZWN0aW9uIiwicG9zc2libGVTaG90cyIsImFpIiwiZSIsImNvZGUiLCJmbGVldERlcGxveWVkIiwiY2xpY2siXSwic291cmNlUm9vdCI6IiJ9