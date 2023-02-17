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
          _this3.grid.forEach(function (square) {
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
          _this3.grid.forEach(function (square) {
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
    damagedEnemy: null,
    lastDamagedEnemy: null,
    enemyOrientation: null,
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
        // { x: xCoord, y: yCoord, squareObj: damagedSquare };
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

      // console.log(this.lastDamagedEnemy)
      // console.log([
      // 	'attackDirection:' + this.attackDirection ,
      // 	'directionsAttacked:' + this.directionsAttacked,
      // 	possibleShots.left,
      // 	possibleShots.right,
      // 	possibleShots.top,
      // 	possibleShots.bottom,
      // ]);

      if (this.attackDirection === 'left') {
        if (possibleShots.left && !possibleShots.left.hitTaken && this.lastDamagedEnemy.occupied) {
          enemyBoard.receiveAttack(this.lastDamagedEnemy.x - 1, this.lastDamagedEnemy.y);
          this.lastDamagedEnemy = possibleShots.left;
          // Haven't tried another direction yet
        } else if (this.directionsAttacked.length === 0) {
          this.directionsAttacked.push('left');
          this.attackDirection = 'right';
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
      if (this.damagedEnemy) {
        // Get possible shots
        var possibleShots = this.getPossibleShots(enemyBoard, this.damagedEnemy);
        if (this.attackDirection) {
          this.attackWithDirection(enemyBoard);

          // Ship orientation unspecified
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
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  display: flex;\n  flex-direction: column;\n  background-color: #1f2937;\n  margin: 0;\n  padding: 0;\n  width: 100vw;\n  min-width: 950px;\n  height: 100vh;\n  min-height: 720px;\n  font-family: 'Roboto Mono', monospace; }\n\n.title {\n  width: 100vw;\n  height: 130px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: white;\n  font-family: 'Unbounded', cursive;\n  font-size: 80px;\n  margin-top: 30px; }\n\n.score {\n  display: none;\n  position: absolute;\n  justify-content: center;\n  width: 100%;\n  top: 23%;\n  z-index: 1;\n  color: white;\n  text-align: center;\n  font-size: 40px;\n  transition: all 1s; }\n\n.restart {\n  display: none;\n  position: absolute;\n  justify-content: center;\n  width: 100%;\n  bottom: 15%;\n  transform: scale(0.85);\n  transition: all 1s; }\n\n.game-container.shrink {\n  transform: scale(0.6); }\n\n.winner {\n  box-shadow: 0px 0px 29px 5px white; }\n\n.game-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 100px;\n  width: 100vw;\n  height: 100%;\n  color: white;\n  transition: transform 1s; }\n  .game-container .left,\n  .game-container .right {\n    display: flex;\n    align-items: center;\n    width: 50vw;\n    height: 500px;\n    margin-top: -2%; }\n  .game-container .left {\n    justify-content: end; }\n  .game-container .right {\n    justify-content: start; }\n  .game-container .options {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    flex-shrink: 0;\n    gap: 20px;\n    width: 380px;\n    height: 500px;\n    text-align: center;\n    font-size: 33px;\n    line-height: 52px; }\n    .game-container .options .rotate-instruction {\n      height: 135px;\n      border-bottom: 2px solid white; }\n    .game-container .options .random-deployment {\n      display: flex; }\n\n.board {\n  display: flex;\n  flex-direction: column;\n  flex-shrink: 0;\n  width: 400px;\n  height: 400px;\n  border: solid 1px white; }\n  .board .row {\n    display: flex;\n    flex-direction: row;\n    flex-grow: 1; }\n\n.square {\n  flex-grow: 1;\n  border: solid 1px white; }\n\n.footer {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 70px;\n  width: 100vw;\n  margin-bottom: 5px;\n  text-align: center;\n  font-size: 15px;\n  color: #c8c8c8; }\n\n#github {\n  height: 27px;\n  width: 27px;\n  padding-bottom: 0.2vh;\n  transition: 0.3s; }\n\n#github:hover {\n  transform: scale(1.1); }\n\n.button {\n  position: relative;\n  display: inline-block;\n  margin: 25px 10px 0 10px;\n  width: 190px;\n  transform: scale(0.83);\n  line-height: 21px; }\n\n.button a {\n  color: white;\n  font-family: Helvetica, sans-serif;\n  font-weight: bold;\n  font-size: 25px;\n  text-align: center;\n  text-decoration: none;\n  background-color: #b55e4b;\n  display: block;\n  position: relative;\n  padding: 20px 40px;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  text-shadow: 0px 1px 0px #000;\n  filter: dropshadow(color=#000, offx=0 px, offy=1 px);\n  -webkit-box-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n  -moz-box-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n  box-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  border-radius: 5px; }\n\n.button a:active {\n  top: 10px;\n  background-color: #b55e4b;\n  -webkit-box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100;\n  -moz-box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100;\n  box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100; }\n\n.button.start a,\n.button.start a:active,\n.button.restart-btn a,\n.button.restart a:active {\n  background-color: #c31212; }\n\n.button:after {\n  content: '';\n  height: 100%;\n  width: 100%;\n  padding: 4px;\n  position: absolute;\n  bottom: -15px;\n  left: -4px;\n  z-index: -1;\n  background-color: #2b1800;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  border-radius: 5px; }\n", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"AAEA;EACC,aAAa;EACb,sBAAsB;EACtB,yBAAiC;EACjC,SAAS;EACT,UAAU;EAEV,YAAY;EACZ,gBAAgB;EAChB,aAAa;EACb,iBAAiB;EAEjB,qCAAqC,EAAA;;AAGtC;EACC,YAAY;EACZ,aAAa;EAEb,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,iCAAiC;EACjC,eAAe;EACf,gBAAgB,EAAA;;AAGjB;EACC,aAAa;EACb,kBAAkB;EAClB,uBAAuB;EAEvB,WAAW;EACX,QAAQ;EACR,UAAU;EAEV,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf,kBAAkB,EAAA;;AAGnB;EACC,aAAa;EACb,kBAAkB;EAClB,uBAAuB;EAEvB,WAAW;EACX,WAAW;EACX,sBAAqB;EACrB,kBAAkB,EAAA;;AAInB;EACC,qBAAoB,EAAA;;AAGrB;EACC,kCAA+C,EAAA;;AAIhD;EACC,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,UAAU;EAEV,YAAY;EACZ,YAAY;EACZ,YAAY;EACZ,wBAAwB,EAAA;EATzB;;IAcE,aAAa;IACb,mBAAmB;IAEnB,WAAW;IACX,aAAa;IACb,eAAe,EAAA;EAnBjB;IAuBE,oBAAoB,EAAA;EAvBtB;IA0BE,sBAAsB,EAAA;EA1BxB;IA8BE,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,sBAAsB;IACtB,cAAc;IACd,SAAS;IAET,YAAY;IACZ,aAAa;IACb,kBAAkB;IAClB,eAAe;IACf,iBAAiB,EAAA;IAzCnB;MA4CG,aAAa;MACb,8BAA8B,EAAA;IA7CjC;MAiDG,aAAa,EAAA;;AAKhB;EACC,aAAa;EACb,sBAAsB;EACtB,cAAc;EAEd,YAAY;EACZ,aAAa;EACb,uBAAuB,EAAA;EAPxB;IAUE,aAAa;IACb,mBAAmB;IACnB,YAAY,EAAA;;AAId;EACC,YAAY;EACZ,uBAAuB,EAAA;;AAGxB;EACC,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EAEnB,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAElB,kBAAkB;EAClB,eAAe;EACf,cAAyB,EAAA;;AAG1B;EACC,YAAY;EACZ,WAAW;EACX,qBAAqB;EACrB,gBAAgB,EAAA;;AAGjB;EACC,qBAAqB,EAAA;;AAKtB;EACC,kBAAkB;EAClB,qBAAqB;EACrB,wBAAwB;EAExB,YAAY;EACZ,sBAAqB;EACrB,iBAAiB,EAAA;;AAGlB;EACC,YAAY;EACZ,kCAAkC;EAClC,iBAAiB;EACjB,eAAe;EACf,kBAAkB;EAClB,qBAAqB;EACrB,yBAAkC;EAClC,cAAc;EACd,kBAAkB;EAClB,kBAAkB;EAElB,6CAA6C;EAC7C,6BAA6B;EAC7B,oDAAkD;EAElD,0DAA0D;EAC1D,uDAAuD;EACvD,kDAAkD;EAElD,0BAA0B;EAC1B,uBAAuB;EACvB,kBAAkB,EAAA;;AAGnB;EACC,SAAS;EACT,yBAAkC;EAElC,iEAAiE;EACjE,8DAA8D;EAC9D,yDAAyD,EAAA;;AAG1D;;;;EAIC,yBAAyB,EAAA;;AAG1B;EACC,WAAW;EACX,YAAY;EACZ,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,aAAa;EACb,UAAU;EACV,WAAW;EACX,yBAAyB;EACzB,0BAA0B;EAC1B,uBAAuB;EACvB,kBAAkB,EAAA","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@600&family=Unbounded:wght@800&display=swap');\n\nbody {\n\tdisplay: flex;\n\tflex-direction: column;\n\tbackground-color: rgb(31, 41, 55);\n\tmargin: 0;\n\tpadding: 0;\n\n\twidth: 100vw;\n\tmin-width: 950px;\n\theight: 100vh;\n\tmin-height: 720px;\n\n\tfont-family: 'Roboto Mono', monospace;\n}\n\n.title {\n\twidth: 100vw;\n\theight: 130px;\n\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tcolor: white;\n\tfont-family: 'Unbounded', cursive;\n\tfont-size: 80px;\n\tmargin-top: 30px;\n}\n\n.score {\n\tdisplay: none;\n\tposition: absolute;\n\tjustify-content: center;\n\n\twidth: 100%;\n\ttop: 23%;\n\tz-index: 1;\n\n\tcolor: white;\n\ttext-align: center;\n\tfont-size: 40px;\n\ttransition: all 1s;\n}\n\n.restart {\n\tdisplay: none;\n\tposition: absolute;\n\tjustify-content: center;\n\n\twidth: 100%;\n\tbottom: 15%;\n\ttransform: scale(.85);\n\ttransition: all 1s;\n}\n\n// Endgame stylization\n.game-container.shrink {\n\ttransform: scale(.6);\n}\n\n.winner {\n\tbox-shadow: 0px 0px 29px 5px rgb(255, 255, 255);\n}\n// </Endgame stylization>\n\n.game-container {\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tgap: 100px;\n\n\twidth: 100vw;\n\theight: 100%;\n\tcolor: white;\n\ttransition: transform 1s;\n\n\n\t.left,\n\t.right {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\n\t\twidth: 50vw;\n\t\theight: 500px;\n\t\tmargin-top: -2%;\n\t}\n\n\t.left {\n\t\tjustify-content: end;\n\t}\n\t.right {\n\t\tjustify-content: start;\n\t}\n\n\t.options {\n\t\tdisplay: flex;\n\t\tjustify-content: center;\n\t\talign-items: center;\n\t\tflex-direction: column;\n\t\tflex-shrink: 0;\n\t\tgap: 20px;\n\n\t\twidth: 380px;\n\t\theight: 500px;\n\t\ttext-align: center;\n\t\tfont-size: 33px;\n\t\tline-height: 52px;\n\n\t\t.rotate-instruction {\n\t\t\theight: 135px;\n\t\t\tborder-bottom: 2px solid white;\n\t\t}\n\n\t\t.random-deployment {\n\t\t\tdisplay: flex;\n\t\t}\n\t}\n}\n\n.board {\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex-shrink: 0;\n\n\twidth: 400px;\n\theight: 400px;\n\tborder: solid 1px white;\n\n\t.row {\n\t\tdisplay: flex;\n\t\tflex-direction: row;\n\t\tflex-grow: 1;\n\t}\n}\n\n.square {\n\tflex-grow: 1;\n\tborder: solid 1px white;\n}\n\n.footer {\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\n\theight: 70px;\n\twidth: 100vw;\n\tmargin-bottom: 5px;\n\n\ttext-align: center;\n\tfont-size: 15px;\n\tcolor: rgb(200, 200, 200);\n}\n\n#github {\n\theight: 27px;\n\twidth: 27px;\n\tpadding-bottom: 0.2vh;\n\ttransition: 0.3s;\n}\n\n#github:hover {\n\ttransform: scale(1.1);\n}\n\n// Button from https://dev.to/webdeasy/top-20-css-buttons-animations-f41\n// author jemware. Adjusted a bit to my own needs.\n.button {\n\tposition: relative;\n\tdisplay: inline-block;\n\tmargin: 25px 10px 0 10px;\n\n\twidth: 190px;\n\ttransform: scale(.83);\n\tline-height: 21px;\n}\n\n.button a {\n\tcolor: white;\n\tfont-family: Helvetica, sans-serif;\n\tfont-weight: bold;\n\tfont-size: 25px;\n\ttext-align: center;\n\ttext-decoration: none;\n\tbackground-color: rgb(181, 94, 75);\n\tdisplay: block;\n\tposition: relative;\n\tpadding: 20px 40px;\n\n\t-webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n\ttext-shadow: 0px 1px 0px #000;\n\tfilter: dropshadow(color=#000, offx=0px, offy=1px);\n\n\t-webkit-box-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n\t-moz-box-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n\tbox-shadow: inset 0 1px 0 #ffe5c4, 0 8px 0 #6e3e00;\n\n\t-webkit-border-radius: 5px;\n\t-moz-border-radius: 5px;\n\tborder-radius: 5px;\n}\n\n.button a:active {\n\ttop: 10px;\n\tbackground-color: rgb(181, 94, 75);\n\n\t-webkit-box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100;\n\t-moz-box-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100;\n\tbox-shadow: inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100;\n}\n\n.button.start a,\n.button.start a:active,\n.button.restart-btn a,\n.button.restart a:active {\n\tbackground-color: #c31212;\n}\n\n.button:after {\n\tcontent: '';\n\theight: 100%;\n\twidth: 100%;\n\tpadding: 4px;\n\tposition: absolute;\n\tbottom: -15px;\n\tleft: -4px;\n\tz-index: -1;\n\tbackground-color: #2b1800;\n\t-webkit-border-radius: 5px;\n\t-moz-border-radius: 5px;\n\tborder-radius: 5px;\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDZkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQXNCO0FBR0M7QUFDSTtBQUVPO0FBQ0siLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vc3JjL21vZHVsZXMvRE9NLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9mYWN0b3JpZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9mYWN0b3JpZXMvcGxheWVyLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9zcmMvbW9kdWxlcy9mYWN0b3JpZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vc3JjL21vZHVsZXMvZ2FtZUxvb3AuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL3NyYy9tb2R1bGVzL3NoaXBUeXBlcy5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vc3JjL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9zcmMvc3R5bGUuc2Nzcz83NWJhIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9wcm9qZWN0LXRlbXBsYXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Byb2plY3QtdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vcHJvamVjdC10ZW1wbGF0ZS8uL3NyYy9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcHJlZmVyLWRlc3RydWN0dXJpbmcgKi9cbmltcG9ydCBzaGlwVHlwZXMgZnJvbSAnLi9zaGlwVHlwZXMnO1xuaW1wb3J0IGdpdEljb24gZnJvbSAnLi4vaW1nL2dpdGh1Yi5wbmcnO1xuXG5jb25zdCBnYW1lQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtY29udGFpbmVyJyk7XG5jb25zdCBzY29yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY29yZScpO1xuY29uc3QgcmVzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN0YXJ0Jyk7XG5jb25zdCBnaXRJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ2l0aHViJyk7XG5jb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydCcpO1xuY29uc3QgcmFuZG9tQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJhbmRvbScpO1xuY29uc3QgbGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZWZ0Jyk7XG5jb25zdCByaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yaWdodCcpO1xuY29uc3Qgb3B0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vcHRpb25zJyk7XG5jb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xubGV0IHBsYXllckJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbmdpdEltZy5zcmMgPSBnaXRJY29uO1xuXG5wbGF5ZXJCb2FyZC5jbGFzc0xpc3QuYWRkKCdib2FyZCcpO1xucm93LmNsYXNzTGlzdC5hZGQoJ3JvdycpO1xuc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ3NxdWFyZScpO1xuXG4vLyBDcmVhdGUgZ3JpZFxuZm9yIChsZXQgaSA9IDE7IGkgPCAxMTsgaSsrKSB7XG5cdHBsYXllckJvYXJkLmFwcGVuZENoaWxkKHJvdy5jbG9uZU5vZGUoKSk7XG5cblx0Zm9yIChsZXQgaiA9IDE7IGogPCAxMTsgaisrKSB7XG5cdFx0Y29uc3QgdGVtcFNxdWFyZSA9IHNxdWFyZS5jbG9uZU5vZGUoKTtcblx0XHR0ZW1wU3F1YXJlLnNldEF0dHJpYnV0ZSgnZGF0YS14Jywgaik7XG5cdFx0dGVtcFNxdWFyZS5zZXRBdHRyaWJ1dGUoJ2RhdGEteScsIGkpO1xuXG5cdFx0cGxheWVyQm9hcmQubGFzdENoaWxkLmFwcGVuZENoaWxkKHRlbXBTcXVhcmUpO1xuXHR9XG59XG5cbmxldCBhaUJvYXJkID0gcGxheWVyQm9hcmQuY2xvbmVOb2RlKHRydWUpO1xucGxheWVyQm9hcmQuY2xhc3NMaXN0LmFkZCgncGxheWVyLWJvYXJkJyk7XG5haUJvYXJkLmNsYXNzTGlzdC5hZGQoJ2FpLWJvYXJkJyk7XG5haUJvYXJkLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbmxlZnQuYXBwZW5kQ2hpbGQocGxheWVyQm9hcmQpO1xucmlnaHQuYXBwZW5kQ2hpbGQoYWlCb2FyZCk7XG5cbmZ1bmN0aW9uIGhlbHBlckNob29zZVBsYXllckdyaWQocGxheWVyKSB7XG5cdGxldCBncmlkSFRNTDtcblxuXHRpZiAocGxheWVyID09PSAncGxheWVyJykge1xuXHRcdGdyaWRIVE1MID0gcGxheWVyQm9hcmQ7XG5cdH0gZWxzZSBpZiAocGxheWVyID09PSAnYWknKSB7XG5cdFx0Z3JpZEhUTUwgPSBhaUJvYXJkO1xuXHR9XG5cdHJldHVybiBncmlkSFRNTDtcbn1cblxuZnVuY3Rpb24gcG9wdWxhdGVCb2FyZEhUTUwocGxheWVyLCBncmlkT2JqZWN0KSB7XG5cdGNvbnN0IGdyaWRIVE1MID0gaGVscGVyQ2hvb3NlUGxheWVyR3JpZChwbGF5ZXIpO1xuXHRsZXQgc3F1YXJlSFRNTDtcblxuXHQvLyBGaW5kIEhUTUwgZXF1aXZhbGVudCBvZiBzcXVhcmUgb2JqZWN0IGJ5IGNvb3JkaW5hdGVzXG5cdGdyaWRPYmplY3QuZm9yRWFjaCgoc3F1YXJlT2JqKSA9PiB7XG5cdFx0Z3JpZEhUTUwuY2hpbGROb2Rlcy5mb3JFYWNoKChyb3dIVE1MKSA9PiB7XG5cdFx0XHRyb3dIVE1MLmNoaWxkTm9kZXMuZm9yRWFjaCgoc3EpID0+IHtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdHNxdWFyZU9iai54ID09PSArc3EuZ2V0QXR0cmlidXRlKCdkYXRhLXgnKSAmJlxuXHRcdFx0XHRcdHNxdWFyZU9iai55ID09PSArc3EuZ2V0QXR0cmlidXRlKCdkYXRhLXknKVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRzcXVhcmVIVE1MID0gc3E7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0aWYgKCFzcXVhcmVPYmoub2NjdXBpZWQgJiYgIXNxdWFyZU9iai5oaXRUYWtlbikge1xuXHRcdFx0c3F1YXJlSFRNTC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDMxLCA0MSwgNTUpJztcblx0XHR9IGVsc2UgaWYgKHNxdWFyZU9iai5vY2N1cGllZCAmJiAhc3F1YXJlT2JqLmhpdFRha2VuICYmIHBsYXllciAhPT0gJ2FpJykge1xuXHRcdFx0aWYgKHNxdWFyZU9iai5zaGlwVHlwZSA9PT0gc2hpcFR5cGVzWzRdLnR5cGUpIHtcblx0XHRcdFx0c3F1YXJlSFRNTC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzaGlwVHlwZXNbNF0uY29sb3I7XG5cdFx0XHR9IGVsc2UgaWYgKHNxdWFyZU9iai5zaGlwVHlwZSA9PT0gc2hpcFR5cGVzWzNdLnR5cGUpIHtcblx0XHRcdFx0c3F1YXJlSFRNTC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzaGlwVHlwZXNbM10uY29sb3I7XG5cdFx0XHR9IGVsc2UgaWYgKHNxdWFyZU9iai5zaGlwVHlwZSA9PT0gc2hpcFR5cGVzWzJdLnR5cGUpIHtcblx0XHRcdFx0c3F1YXJlSFRNTC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzaGlwVHlwZXNbMl0uY29sb3I7XG5cdFx0XHR9IGVsc2UgaWYgKHNxdWFyZU9iai5zaGlwVHlwZSA9PT0gc2hpcFR5cGVzWzFdLnR5cGUpIHtcblx0XHRcdFx0c3F1YXJlSFRNTC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzaGlwVHlwZXNbMV0uY29sb3I7XG5cdFx0XHR9IGVsc2UgaWYgKHNxdWFyZU9iai5zaGlwVHlwZSA9PT0gc2hpcFR5cGVzWzBdLnR5cGUpIHtcblx0XHRcdFx0c3F1YXJlSFRNTC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzaGlwVHlwZXNbMF0uY29sb3I7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICghc3F1YXJlT2JqLm9jY3VwaWVkICYmIHNxdWFyZU9iai5oaXRUYWtlbikge1xuXHRcdFx0c3F1YXJlSFRNTC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDg4LCA4OCwgODgpJztcblx0XHR9IGVsc2UgaWYgKHNxdWFyZU9iai5vY2N1cGllZCAmJiBzcXVhcmVPYmouaGl0VGFrZW4pIHtcblx0XHRcdHNxdWFyZUhUTUwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYig5OCwgMCwgMCknO1xuXHRcdH1cblx0fSk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0R3JpZEhUTUwocGxheWVyKSB7XG5cdGNvbnN0IGdyaWRIVE1MID0gaGVscGVyQ2hvb3NlUGxheWVyR3JpZChwbGF5ZXIpO1xuXG5cdGdyaWRIVE1MLmNoaWxkTm9kZXMuZm9yRWFjaCgocm93SFRNTCkgPT4ge1xuXHRcdHJvd0hUTUwuY2hpbGROb2Rlcy5mb3JFYWNoKChzcSkgPT4ge1xuXHRcdFx0c3Euc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYigzMSwgNDEsIDU1KSc7XG5cdFx0fSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiByZW1vdmVHcmlkTGlzdGVuZXJzKCkge1xuXHRjb25zdCBwbGF5ZXJCb2FyZENsb25lID0gcGxheWVyQm9hcmQuY2xvbmVOb2RlKHRydWUpO1xuXHRjb25zdCBhaUJvYXJkQ2xvbmUgPSBhaUJvYXJkLmNsb25lTm9kZSh0cnVlKTtcblxuXHRwbGF5ZXJCb2FyZC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChwbGF5ZXJCb2FyZENsb25lLCBwbGF5ZXJCb2FyZCk7XG5cdGFpQm9hcmQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoYWlCb2FyZENsb25lLCBhaUJvYXJkKTtcblxuXHRwbGF5ZXJCb2FyZCA9IHBsYXllckJvYXJkQ2xvbmU7XG5cdGFpQm9hcmQgPSBhaUJvYXJkQ2xvbmU7XG59XG5cbmZ1bmN0aW9uIGFkZEZsZWV0RGVwbG95bWVudExpc3RlbmVyKG9yaWVudGF0aW9uLCBnYW1lYm9hcmRPYmopIHtcblx0cmVtb3ZlR3JpZExpc3RlbmVycygpO1xuXG5cdHBsYXllckJvYXJkLmNoaWxkTm9kZXMuZm9yRWFjaCgocm93SFRNTCkgPT4ge1xuXHRcdHJvd0hUTUwuY2hpbGROb2Rlcy5mb3JFYWNoKChzcSkgPT4ge1xuXHRcdFx0Y29uc3Qgc3FYID0gK3NxLmdldEF0dHJpYnV0ZSgnZGF0YS14Jyk7XG5cdFx0XHRjb25zdCBzcVkgPSArc3EuZ2V0QXR0cmlidXRlKCdkYXRhLXknKTtcblx0XHRcdGxldCBzaGlwVHlwZU9iajtcblx0XHRcdGxldCBzaGlwTGVuZ3RoO1xuXG5cdFx0XHQvLyBDaGVjayBpZiBwYXJ0aWN1bGFyIHNoaXAgdHlwZSBoYXMgYmVlbiBhbHJlYWR5IGRlcGxveWVkXG5cdFx0XHRpZiAoIWdhbWVib2FyZE9iai5ncmlkLnNvbWUoKGVsKSA9PiBlbC5zaGlwVHlwZSA9PT0gc2hpcFR5cGVzWzBdLnR5cGUpKSB7XG5cdFx0XHRcdHNoaXBMZW5ndGggPSBzaGlwVHlwZXNbMF0ubGVuZ3RoO1xuXHRcdFx0XHRzaGlwVHlwZU9iaiA9IHNoaXBUeXBlc1swXTtcblx0XHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRcdCFnYW1lYm9hcmRPYmouZ3JpZC5zb21lKChlbCkgPT4gZWwuc2hpcFR5cGUgPT09IHNoaXBUeXBlc1sxXS50eXBlKVxuXHRcdFx0KSB7XG5cdFx0XHRcdHNoaXBMZW5ndGggPSBzaGlwVHlwZXNbMV0ubGVuZ3RoO1xuXHRcdFx0XHRzaGlwVHlwZU9iaiA9IHNoaXBUeXBlc1sxXTtcblx0XHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRcdCFnYW1lYm9hcmRPYmouZ3JpZC5zb21lKChlbCkgPT4gZWwuc2hpcFR5cGUgPT09IHNoaXBUeXBlc1syXS50eXBlKVxuXHRcdFx0KSB7XG5cdFx0XHRcdHNoaXBMZW5ndGggPSBzaGlwVHlwZXNbMl0ubGVuZ3RoO1xuXHRcdFx0XHRzaGlwVHlwZU9iaiA9IHNoaXBUeXBlc1syXTtcblx0XHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRcdCFnYW1lYm9hcmRPYmouZ3JpZC5zb21lKChlbCkgPT4gZWwuc2hpcFR5cGUgPT09IHNoaXBUeXBlc1szXS50eXBlKVxuXHRcdFx0KSB7XG5cdFx0XHRcdHNoaXBMZW5ndGggPSBzaGlwVHlwZXNbM10ubGVuZ3RoO1xuXHRcdFx0XHRzaGlwVHlwZU9iaiA9IHNoaXBUeXBlc1szXTtcblx0XHRcdH0gZWxzZSBpZiAoXG5cdFx0XHRcdCFnYW1lYm9hcmRPYmouZ3JpZC5zb21lKChlbCkgPT4gZWwuc2hpcFR5cGUgPT09IHNoaXBUeXBlc1s0XS50eXBlKVxuXHRcdFx0KSB7XG5cdFx0XHRcdHNoaXBMZW5ndGggPSBzaGlwVHlwZXNbNF0ubGVuZ3RoO1xuXHRcdFx0XHRzaGlwVHlwZU9iaiA9IHNoaXBUeXBlc1s0XTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2hlY2sgaWYgc2hpcCBjYW4gYmUgYnVpbHRcblx0XHRcdGNvbnN0IG5vU3BhY2UgPSBnYW1lYm9hcmRPYmouY2hlY2tTcGFjZUZvclNoaXAoXG5cdFx0XHRcdHNxWCxcblx0XHRcdFx0c3FZLFxuXHRcdFx0XHRzaGlwTGVuZ3RoLFxuXHRcdFx0XHRvcmllbnRhdGlvblxuXHRcdFx0KTtcblxuXHRcdFx0Ly8gU2hvdyBvbiBncmlkIGlmIHNoaXAgY2FuIGJlIGFkZGVkXG5cdFx0XHRzcS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XG5cdFx0XHRcdGlmIChvcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IHNxWDsgaSA8IHNxWCArIHNoaXBMZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0aWYgKGkgPiAxMCkgYnJlYWs7XG5cblx0XHRcdFx0XHRcdHBsYXllckJvYXJkLmNoaWxkTm9kZXMuZm9yRWFjaCgocncpID0+IHtcblx0XHRcdFx0XHRcdFx0cncuY2hpbGROb2Rlcy5mb3JFYWNoKChzcXIpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdFx0XHQrc3FyLmdldEF0dHJpYnV0ZSgnZGF0YS14JykgPT09IGkgJiZcblx0XHRcdFx0XHRcdFx0XHRcdCtzcXIuZ2V0QXR0cmlidXRlKCdkYXRhLXknKSA9PT0gc3FZXG5cdFx0XHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBJZiBzaGlwIGNhbid0IGJlIGJ1aWx0IGdyYXkgb3V0IHNxdWFyZXNcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChub1NwYWNlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNxci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiKDg4LCA4OCwgODgpJztcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gT3RoZXJ3aXNlIHNob3cgcHJvcGVyIHNoaXAgY29sb3Jcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNxci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzaGlwVHlwZU9iai5jb2xvcjtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2UgaWYgKG9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IHNxWTsgaSA8IHNxWSArIHNoaXBMZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0aWYgKGkgPiAxMCkgYnJlYWs7XG5cblx0XHRcdFx0XHRcdHBsYXllckJvYXJkLmNoaWxkTm9kZXMuZm9yRWFjaCgocncpID0+IHtcblx0XHRcdFx0XHRcdFx0cncuY2hpbGROb2Rlcy5mb3JFYWNoKChzcXIpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdFx0XHQrc3FyLmdldEF0dHJpYnV0ZSgnZGF0YS14JykgPT09IHNxWCAmJlxuXHRcdFx0XHRcdFx0XHRcdFx0K3Nxci5nZXRBdHRyaWJ1dGUoJ2RhdGEteScpID09PSBpXG5cdFx0XHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAobm9TcGFjZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzcXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYig4OCwgODgsIDg4KSc7XG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzcXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gc2hpcFR5cGVPYmouY29sb3I7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIFdoZW4gbGVhdmluZyBncmlkIGNlbGwgcmVtb3ZlIGRlcGxveW1lbnQgaW5kaWNhdGlvblxuXHRcdFx0c3EuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcblx0XHRcdFx0cG9wdWxhdGVCb2FyZEhUTUwoJ3BsYXllcicsIGdhbWVib2FyZE9iai5ncmlkKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBPbiBjbGljayBhZGQgc2hpcCB0byBwbGF5ZXIncyBib2FyZCBvYmplY3Rcblx0XHRcdHNxLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0XHRpZiAoIW5vU3BhY2UpIHtcblx0XHRcdFx0XHRnYW1lYm9hcmRPYmouYWRkU2hpcChzcVgsIHNxWSwgb3JpZW50YXRpb24sIHNoaXBUeXBlT2JqLnR5cGUpO1xuXHRcdFx0XHRcdHJlbW92ZUdyaWRMaXN0ZW5lcnMoKTtcblx0XHRcdFx0XHRhZGRGbGVldERlcGxveW1lbnRMaXN0ZW5lcihvcmllbnRhdGlvbiwgZ2FtZWJvYXJkT2JqKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBlbmRHYW1lKHdpbm5lcikge1xuICAgIGdhbWVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc2hyaW5rJyk7XG5cbiAgICBpZiAod2lubmVyID09PSAncGxheWVyJykge1xuICAgICAgICBwbGF5ZXJCb2FyZC5jbGFzc0xpc3QuYWRkKCd3aW5uZXInKTtcbiAgICAgICAgYWlCb2FyZC5jbGFzc0xpc3QuYWRkKCdsb3NlcicpO1xuICAgICAgICBzY29yZS5pbm5lckhUTUwgPSAnWW91IHdvbiEnXG4gICAgfSBlbHNlIGlmICh3aW5uZXIgPT09ICdhaScpIHtcbiAgICAgICAgcGxheWVyQm9hcmQuY2xhc3NMaXN0LmFkZCgnbG9zZXInKTtcbiAgICAgICAgYWlCb2FyZC5jbGFzc0xpc3QuYWRkKCd3aW5uZXInKTtcbiAgICAgICAgc2NvcmUuaW5uZXJIVE1MID0gJ0FJIHdvbiEnXG4gICAgfVxuXG4gICAgc2NvcmUuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICByZXN0YXJ0QnRuLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG59XG5cbmZ1bmN0aW9uIGFkZEdhbWVwbGF5TGlzdGVuZXJzKGFpT2JqZWN0LCBwbGF5ZXJPYmplY3QpIHtcblx0YWlCb2FyZC5jaGlsZE5vZGVzLmZvckVhY2goKHJvd0hUTUwpID0+IHtcblx0XHRyb3dIVE1MLmNoaWxkTm9kZXMuZm9yRWFjaCgoc3EpID0+IHtcblx0XHRcdGNvbnN0IHNxWCA9ICtzcS5nZXRBdHRyaWJ1dGUoJ2RhdGEteCcpO1xuXHRcdFx0Y29uc3Qgc3FZID0gK3NxLmdldEF0dHJpYnV0ZSgnZGF0YS15Jyk7XG5cblx0XHRcdHNxLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0XHRjb25zdCBhdHRhY2sgPSBhaU9iamVjdC5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhzcVgsIHNxWSk7XG5cdFx0XHRcdGlmIChhdHRhY2sgJiYgIWFpT2JqZWN0LmdhbWVib2FyZC5nYW1lTG9zdCkge1xuXHRcdFx0XHRcdGFpT2JqZWN0LmFpQXR0YWNrKHBsYXllck9iamVjdC5nYW1lYm9hcmQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cG9wdWxhdGVCb2FyZEhUTUwoJ3BsYXllcicsIHBsYXllck9iamVjdC5nYW1lYm9hcmQuZ3JpZCk7XG5cdFx0XHRcdHBvcHVsYXRlQm9hcmRIVE1MKCdhaScsIGFpT2JqZWN0LmdhbWVib2FyZC5ncmlkKTtcblxuXHRcdFx0XHRpZiAoYWlPYmplY3QuZ2FtZWJvYXJkLmdhbWVMb3N0KSB7XG5cdFx0XHRcdFx0cmVtb3ZlR3JpZExpc3RlbmVycygpO1xuXHRcdFx0XHRcdGVuZEdhbWUoJ3BsYXllcicpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHBsYXllck9iamVjdC5nYW1lYm9hcmQuZ2FtZUxvc3QpIHtcblx0XHRcdFx0XHRyZW1vdmVHcmlkTGlzdGVuZXJzKCk7XG5cdFx0XHRcdFx0ZW5kR2FtZSgnYWknKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0pO1xufVxuXG5zdGFydEJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuXHRhaUJvYXJkLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG5cdG9wdGlvbnMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0cmVtb3ZlR3JpZExpc3RlbmVycygpO1xufTtcblxucmVzdGFydEJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuXHRyZXNldEdyaWRIVE1MKCdwbGF5ZXInKTtcblx0cmVzZXRHcmlkSFRNTCgnYWknKTtcblxuXHRnYW1lQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3NocmluaycpO1xuXHRhaUJvYXJkLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdG9wdGlvbnMuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICBzY29yZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHJlc3RhcnRCdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuXHRwbGF5ZXJCb2FyZC5jbGFzc0xpc3QucmVtb3ZlKCd3aW5uZXInLCAnbG9zZXInKTtcbiAgICBhaUJvYXJkLmNsYXNzTGlzdC5yZW1vdmUoJ3dpbm5lcicsICdsb3NlcicpO1xufTtcblxuZXhwb3J0IHtcblx0c3RhcnRCdG4sXG5cdHJhbmRvbUJ0bixcblx0cmVzdGFydEJ0bixcblx0cG9wdWxhdGVCb2FyZEhUTUwsXG5cdHJlc2V0R3JpZEhUTUwsXG5cdGFkZEZsZWV0RGVwbG95bWVudExpc3RlbmVyLFxuXHRhZGRHYW1lcGxheUxpc3RlbmVycyxcblx0cmVtb3ZlR3JpZExpc3RlbmVyc1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWxvb3AtZnVuYyAqL1xuaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwJztcblxuZnVuY3Rpb24gR2FtZWJvYXJkKCkge1xuXHRsZXQgZ3JpZDtcblxuXHRjb25zdCBjcmVhdGVHcmlkID0gKCkgPT4ge1xuXHRcdGNvbnN0IGdyaWRBcnJheSA9IFtdO1xuXHRcdGZvciAobGV0IGkgPSAxOyBpIDwgMTE7IGkrKykge1xuXHRcdFx0Zm9yIChsZXQgaiA9IDE7IGogPCAxMTsgaisrKSB7XG5cdFx0XHRcdGdyaWRBcnJheS5wdXNoKHtcblx0XHRcdFx0XHR4OiBpLFxuXHRcdFx0XHRcdHk6IGosXG5cdFx0XHRcdFx0b2NjdXBpZWQ6IGZhbHNlLFxuXHRcdFx0XHRcdHNoaXBUeXBlOiBmYWxzZSxcblx0XHRcdFx0XHRoaXRUYWtlbjogZmFsc2UsXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRncmlkID0gZ3JpZEFycmF5O1xuXHR9O1xuXHRjcmVhdGVHcmlkKCk7XG5cblx0cmV0dXJuIHtcblx0XHRncmlkLFxuXHRcdGdhbWVMb3N0OiBmYWxzZSxcblxuXHRcdGNsZWFyR3JpZCgpIHtcblx0XHRcdHRoaXMuZ3JpZC5mb3JFYWNoKChzcXVhcmUpID0+IHtcblx0XHRcdFx0c3F1YXJlLm9jY3VwaWVkID0gZmFsc2U7XG5cdFx0XHRcdHNxdWFyZS5zaGlwVHlwZSA9IGZhbHNlO1xuXHRcdFx0XHRzcXVhcmUuaGl0VGFrZW4gPSBmYWxzZTtcblxuXHRcdFx0XHR0aGlzLmdhbWVMb3N0ID0gZmFsc2U7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0Ly8gQ2hlY2sgaWYgdGhlcmUgaXMgc3BhY2UgdG8gY3JlYXRlIHNoaXAgYW5kIGNvb3JkcyBhcmUgaW4gcmFuZ2Vcblx0XHRjaGVja1NwYWNlRm9yU2hpcCh4Q29vcmQsIHlDb29yZCwgbGVuZ3RoLCBvcmllbnRhdGlvbikge1xuXHRcdFx0Y29uc3Qgc3RhcnRTcXVhcmUgPSB0aGlzLmdldFNxdWFyZSh4Q29vcmQsIHlDb29yZCk7XG5cdFx0XHRsZXQgbm9TcGFjZSA9IGZhbHNlO1xuXG5cdFx0XHRpZiAob3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuXHRcdFx0XHRmb3IgKGxldCBpID0geENvb3JkOyBpIDwgeENvb3JkICsgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRpZiAoaSA+IDEwKSByZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR0aGlzLmdyaWQuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS54ID09PSBpICYmXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS55ID09PSBzdGFydFNxdWFyZS55ICYmXG5cdFx0XHRcdFx0XHRcdHNxdWFyZS5vY2N1cGllZFxuXHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdG5vU3BhY2UgPSB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKG9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG5cdFx0XHRcdGZvciAobGV0IGkgPSB5Q29vcmQ7IGkgPCB5Q29vcmQgKyBsZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGlmIChpID4gMTApIHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdHRoaXMuZ3JpZC5mb3JFYWNoKChzcXVhcmUpID0+IHtcblx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0c3F1YXJlLnggPT09IHN0YXJ0U3F1YXJlLnggJiZcblx0XHRcdFx0XHRcdFx0c3F1YXJlLnkgPT09IGkgJiZcblx0XHRcdFx0XHRcdFx0c3F1YXJlLm9jY3VwaWVkXG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0bm9TcGFjZSA9IHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBub1NwYWNlO1xuXHRcdH0sXG5cblx0XHRhZGRTaGlwKHhDb29yZCwgeUNvb3JkLCBvcmllbnRhdGlvbiwgc2hpcFR5cGUpIHtcblx0XHRcdGNvbnN0IHN0YXJ0U3F1YXJlID0gdGhpcy5nZXRTcXVhcmUoeENvb3JkLCB5Q29vcmQpO1xuXHRcdFx0bGV0IGxlbmd0aDtcblxuXHRcdFx0aWYgKHNoaXBUeXBlID09PSAnUGF0cm9sIEJvYXQnKSB7XG5cdFx0XHRcdGxlbmd0aCA9IDI7XG5cdFx0XHR9IGVsc2UgaWYgKHNoaXBUeXBlID09PSAnU3VibWFyaW5lJykge1xuXHRcdFx0XHRsZW5ndGggPSAzO1xuXHRcdFx0fSBlbHNlIGlmIChzaGlwVHlwZSA9PT0gJ0Rlc3Ryb3llcicpIHtcblx0XHRcdFx0bGVuZ3RoID0gMztcblx0XHRcdH0gZWxzZSBpZiAoc2hpcFR5cGUgPT09ICdCYXR0bGVzaGlwJykge1xuXHRcdFx0XHRsZW5ndGggPSA0O1xuXHRcdFx0fSBlbHNlIGlmIChzaGlwVHlwZSA9PT0gJ0NhcnJpZXInKSB7XG5cdFx0XHRcdGxlbmd0aCA9IDU7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChzdGFydFNxdWFyZS5vY2N1cGllZCkgcmV0dXJuIGZhbHNlO1xuXG5cdFx0XHRjb25zdCBub1NwYWNlID0gdGhpcy5jaGVja1NwYWNlRm9yU2hpcChcblx0XHRcdFx0eENvb3JkLFxuXHRcdFx0XHR5Q29vcmQsXG5cdFx0XHRcdGxlbmd0aCxcblx0XHRcdFx0b3JpZW50YXRpb25cblx0XHRcdCk7XG5cdFx0XHRpZiAobm9TcGFjZSkgcmV0dXJuIGZhbHNlO1xuXG5cdFx0XHQvLyBCdWlsZCBzaGlwXG5cdFx0XHRjb25zdCBuZXdTaGlwID0gU2hpcChsZW5ndGgpO1xuXHRcdFx0aWYgKG9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IHhDb29yZDsgaSA8IHhDb29yZCArIGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0dGhpcy5ncmlkLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0XHRzcXVhcmUueCA9PT0gaSAmJlxuXHRcdFx0XHRcdFx0XHRzcXVhcmUueSA9PT0gc3RhcnRTcXVhcmUueSAmJlxuXHRcdFx0XHRcdFx0XHQhc3F1YXJlLm9jY3VwaWVkXG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0c3F1YXJlLm9jY3VwaWVkID0gbmV3U2hpcDtcblx0XHRcdFx0XHRcdFx0c3F1YXJlLnNoaXBUeXBlID0gc2hpcFR5cGU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IHlDb29yZDsgaSA8IHlDb29yZCArIGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0dGhpcy5ncmlkLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0XHRzcXVhcmUueCA9PT0gc3RhcnRTcXVhcmUueCAmJlxuXHRcdFx0XHRcdFx0XHRzcXVhcmUueSA9PT0gaSAmJlxuXHRcdFx0XHRcdFx0XHQhc3F1YXJlLm9jY3VwaWVkXG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0c3F1YXJlLm9jY3VwaWVkID0gbmV3U2hpcDtcblx0XHRcdFx0XHRcdFx0c3F1YXJlLnNoaXBUeXBlID0gc2hpcFR5cGU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0sXG5cblx0XHRyYW5kb21GbGVldFBsYWNlbWVudCgpIHtcblx0XHRcdHRoaXMucmFuZG9tU2hpcFBsYWNlbWVudCgnUGF0cm9sIEJvYXQnKTtcblx0XHRcdHRoaXMucmFuZG9tU2hpcFBsYWNlbWVudCgnU3VibWFyaW5lJyk7XG5cdFx0XHR0aGlzLnJhbmRvbVNoaXBQbGFjZW1lbnQoJ0Rlc3Ryb3llcicpO1xuXHRcdFx0dGhpcy5yYW5kb21TaGlwUGxhY2VtZW50KCdCYXR0bGVzaGlwJyk7XG5cdFx0XHR0aGlzLnJhbmRvbVNoaXBQbGFjZW1lbnQoJ0NhcnJpZXInKTtcblx0XHR9LFxuXG5cdFx0cmFuZG9tU2hpcFBsYWNlbWVudChzaGlwVHlwZSkge1xuXHRcdFx0bGV0IHNoaXBCdWlsdCA9IGZhbHNlO1xuXG5cdFx0XHR3aGlsZSAoIXNoaXBCdWlsdCkge1xuXHRcdFx0XHRsZXQgb3JpZW50YXRpb247XG5cdFx0XHRcdGNvbnN0IG9yaWVudGF0aW9uTnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMikgKyAxO1xuXHRcdFx0XHRjb25zdCB4Q29vcmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuXHRcdFx0XHRjb25zdCB5Q29vcmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuXG5cdFx0XHRcdGlmIChvcmllbnRhdGlvbk51bWJlciA9PT0gMSkge1xuXHRcdFx0XHRcdG9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG9yaWVudGF0aW9uID0gJ3ZlcnRpY2FsJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHNoaXBCdWlsdCA9IHRoaXMuYWRkU2hpcCh4Q29vcmQsIHlDb29yZCwgb3JpZW50YXRpb24sIHNoaXBUeXBlKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Z2V0U3F1YXJlKHhDb29yZCwgeUNvb3JkKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5ncmlkLmZpbmQoXG5cdFx0XHRcdChzcXVhcmUpID0+IHNxdWFyZS54ID09PSB4Q29vcmQgJiYgc3F1YXJlLnkgPT09IHlDb29yZFxuXHRcdFx0KTtcblx0XHR9LFxuXG5cdFx0cmVjZWl2ZUF0dGFjayh4Q29vcmQsIHlDb29yZCkge1xuXHRcdFx0Y29uc3Qgc3F1YXJlID0gdGhpcy5ncmlkLmZpbmQoKHNxKSA9PiBzcS54ID09PSB4Q29vcmQgJiYgc3EueSA9PT0geUNvb3JkKTtcblxuXHRcdFx0aWYgKHNxdWFyZS5oaXRUYWtlbikge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIXNxdWFyZS5vY2N1cGllZCAmJiAhc3F1YXJlLmhpdFRha2VuKSB7XG5cdFx0XHRcdHNxdWFyZS5oaXRUYWtlbiA9IHRydWU7XG5cdFx0XHR9IGVsc2UgaWYgKHNxdWFyZS5vY2N1cGllZCAmJiAhc3F1YXJlLmhpdFRha2VuKSB7XG5cdFx0XHRcdHNxdWFyZS5oaXRUYWtlbiA9IHRydWU7XG5cdFx0XHRcdHNxdWFyZS5vY2N1cGllZC50YWtlSGl0KCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmNoZWNrRmxlZXRDb25kaXRpb24oKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0sXG5cblx0XHRjaGVja0ZsZWV0Q29uZGl0aW9uKCkge1xuXHRcdFx0Y29uc3QgZmxlZXRBbGl2ZSA9IHRoaXMuZ3JpZC5zb21lKFxuXHRcdFx0XHQoc3F1YXJlKSA9PiBzcXVhcmUub2NjdXBpZWQgJiYgIXNxdWFyZS5oaXRUYWtlblxuXHRcdFx0KTtcblxuXHRcdFx0aWYgKCFmbGVldEFsaXZlKSB7XG5cdFx0XHRcdHRoaXMuZ2FtZUxvc3QgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH0sXG5cdH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmQnO1xuXG5mdW5jdGlvbiBQbGF5ZXIoKSB7XG5cdHJldHVybiB7XG5cdFx0Z2FtZWJvYXJkOiBHYW1lYm9hcmQoKSxcdFx0XG5cdFx0ZGFtYWdlZEVuZW15OiBudWxsLFxuXHRcdGxhc3REYW1hZ2VkRW5lbXk6IG51bGwsXG5cdFx0ZW5lbXlPcmllbnRhdGlvbjogbnVsbCxcblx0XHRhdHRhY2tEaXJlY3Rpb246IG51bGwsXG5cdFx0ZGlyZWN0aW9uc0F0dGFja2VkOiBbXSxcblxuXHRcdGF0dGFjayh4Q29vcmQsIHlDb29yZCwgZW5lbXlCb2FyZCkge1xuXHRcdFx0ZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHhDb29yZCwgeUNvb3JkKTtcblx0XHR9LFxuXG5cdFx0cmFuZG9tQXR0YWNrKGVuZW15Qm9hcmQpIHtcblx0XHRcdGxldCBzaG90RmlyZWQgPSBmYWxzZTtcblx0XHRcdGxldCB4Q29vcmQ7XG5cdFx0XHRsZXQgeUNvb3JkO1xuXG5cdFx0XHR3aGlsZSAoIXNob3RGaXJlZCkge1xuXHRcdFx0XHR4Q29vcmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuXHRcdFx0XHR5Q29vcmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuXG5cdFx0XHRcdHNob3RGaXJlZCA9IGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh4Q29vcmQsIHlDb29yZCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFNhdmUgY29vcmRzIG9mIGRhbWFnZWQgc2hpcFxuXHRcdFx0Y29uc3QgZGFtYWdlZFNxdWFyZSA9IGVuZW15Qm9hcmQuZ2V0U3F1YXJlKHhDb29yZCwgeUNvb3JkKTtcblx0XHRcdGlmIChkYW1hZ2VkU3F1YXJlLm9jY3VwaWVkICYmIGRhbWFnZWRTcXVhcmUuaGl0VGFrZW4pIHtcblx0XHRcdFx0dGhpcy5kYW1hZ2VkRW5lbXkgPSBlbmVteUJvYXJkLmdldFNxdWFyZSh4Q29vcmQsIHlDb29yZClcblx0XHRcdFx0Ly8geyB4OiB4Q29vcmQsIHk6IHlDb29yZCwgc3F1YXJlT2JqOiBkYW1hZ2VkU3F1YXJlIH07XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdGdldFBvc3NpYmxlU2hvdHMoZW5lbXlCb2FyZCwgZW5lbXlTcXVhcmUpIHtcblx0XHRcdGNvbnN0IGxlZnQgPSBlbmVteUJvYXJkLmdldFNxdWFyZShlbmVteVNxdWFyZS54IC0gMSwgZW5lbXlTcXVhcmUueSk7XG5cdFx0XHRjb25zdCByaWdodCA9IGVuZW15Qm9hcmQuZ2V0U3F1YXJlKGVuZW15U3F1YXJlLnggKyAxLCBlbmVteVNxdWFyZS55KTtcblx0XHRcdGNvbnN0IHRvcCA9IGVuZW15Qm9hcmQuZ2V0U3F1YXJlKGVuZW15U3F1YXJlLngsIGVuZW15U3F1YXJlLnkgLSAxKTtcblx0XHRcdGNvbnN0IGJvdHRvbSA9IGVuZW15Qm9hcmQuZ2V0U3F1YXJlKGVuZW15U3F1YXJlLngsIGVuZW15U3F1YXJlLnkgKyAxKTtcblxuXHRcdFx0cmV0dXJuIHsgbGVmdCwgcmlnaHQsIHRvcCwgYm90dG9tIH07XG5cdFx0fSxcblxuXHRcdHJlc2V0RW5lbXlEYXRhKCkge1xuXHRcdFx0dGhpcy5kYW1hZ2VkRW5lbXkgPSBudWxsO1xuXHRcdFx0dGhpcy5sYXN0RGFtYWdlZEVuZW15ID0gbnVsbDtcblx0XHRcdHRoaXMuYXR0YWNrRGlyZWN0aW9uID0gbnVsbDtcblx0XHRcdHRoaXMuZGlyZWN0aW9uc0F0dGFja2VkID0gW107XG5cdFx0fSxcblxuXHRcdGF0dGFja1dpdGhEaXJlY3Rpb24oZW5lbXlCb2FyZCkge1xuXHRcdFx0Y29uc3QgcG9zc2libGVTaG90cyA9IHRoaXMuZ2V0UG9zc2libGVTaG90cyhlbmVteUJvYXJkLCB0aGlzLmxhc3REYW1hZ2VkRW5lbXkpO1xuXG5cdFx0XHQvLyBjb25zb2xlLmxvZyh0aGlzLmxhc3REYW1hZ2VkRW5lbXkpXG5cdFx0XHQvLyBjb25zb2xlLmxvZyhbXG5cdFx0XHQvLyBcdCdhdHRhY2tEaXJlY3Rpb246JyArIHRoaXMuYXR0YWNrRGlyZWN0aW9uICxcblx0XHRcdC8vIFx0J2RpcmVjdGlvbnNBdHRhY2tlZDonICsgdGhpcy5kaXJlY3Rpb25zQXR0YWNrZWQsXG5cdFx0XHQvLyBcdHBvc3NpYmxlU2hvdHMubGVmdCxcblx0XHRcdC8vIFx0cG9zc2libGVTaG90cy5yaWdodCxcblx0XHRcdC8vIFx0cG9zc2libGVTaG90cy50b3AsXG5cdFx0XHQvLyBcdHBvc3NpYmxlU2hvdHMuYm90dG9tLFxuXHRcdFx0Ly8gXSk7XG5cblx0XHRcdGlmICh0aGlzLmF0dGFja0RpcmVjdGlvbiA9PT0gJ2xlZnQnKSB7XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRwb3NzaWJsZVNob3RzLmxlZnQgJiZcblx0XHRcdFx0XHQhcG9zc2libGVTaG90cy5sZWZ0LmhpdFRha2VuICYmXG5cdFx0XHRcdFx0dGhpcy5sYXN0RGFtYWdlZEVuZW15Lm9jY3VwaWVkXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhcblx0XHRcdFx0XHRcdHRoaXMubGFzdERhbWFnZWRFbmVteS54IC0gMSxcblx0XHRcdFx0XHRcdHRoaXMubGFzdERhbWFnZWRFbmVteS55XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR0aGlzLmxhc3REYW1hZ2VkRW5lbXkgPSBwb3NzaWJsZVNob3RzLmxlZnQ7XG5cdFx0XHRcdFx0Ly8gSGF2ZW4ndCB0cmllZCBhbm90aGVyIGRpcmVjdGlvbiB5ZXRcblx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbnNBdHRhY2tlZC5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHR0aGlzLmRpcmVjdGlvbnNBdHRhY2tlZC5wdXNoKCdsZWZ0Jyk7XG5cdFx0XHRcdFx0dGhpcy5hdHRhY2tEaXJlY3Rpb24gPSAncmlnaHQnO1xuXHRcdFx0XHRcdHRoaXMubGFzdERhbWFnZWRFbmVteSA9IHRoaXMuZGFtYWdlZEVuZW15O1xuXHRcdFx0XHRcdHRoaXMuYXR0YWNrV2l0aERpcmVjdGlvbihlbmVteUJvYXJkKTtcblx0XHRcdFx0XHQvLyBCb3RoIGRpcmVjdGlvbnMgYXR0YWNrZWRcblx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbnNBdHRhY2tlZC5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHR0aGlzLnJlc2V0RW5lbXlEYXRhKCk7XG5cdFx0XHRcdFx0dGhpcy5haUF0dGFjayhlbmVteUJvYXJkKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLmF0dGFja0RpcmVjdGlvbiA9PT0gJ3JpZ2h0Jykge1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0cG9zc2libGVTaG90cy5yaWdodCAmJlxuXHRcdFx0XHRcdCFwb3NzaWJsZVNob3RzLnJpZ2h0LmhpdFRha2VuICYmXG5cdFx0XHRcdFx0dGhpcy5sYXN0RGFtYWdlZEVuZW15Lm9jY3VwaWVkXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhcblx0XHRcdFx0XHRcdHRoaXMubGFzdERhbWFnZWRFbmVteS54ICsgMSxcblx0XHRcdFx0XHRcdHRoaXMubGFzdERhbWFnZWRFbmVteS55XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR0aGlzLmxhc3REYW1hZ2VkRW5lbXkgPSBwb3NzaWJsZVNob3RzLnJpZ2h0O1xuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uc0F0dGFja2VkLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdHRoaXMuZGlyZWN0aW9uc0F0dGFja2VkLnB1c2goJ3JpZ2h0Jyk7XG5cdFx0XHRcdFx0dGhpcy5hdHRhY2tEaXJlY3Rpb24gPSAnbGVmdCc7XG5cdFx0XHRcdFx0dGhpcy5sYXN0RGFtYWdlZEVuZW15ID0gdGhpcy5kYW1hZ2VkRW5lbXk7XG5cdFx0XHRcdFx0dGhpcy5hdHRhY2tXaXRoRGlyZWN0aW9uKGVuZW15Qm9hcmQpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uc0F0dGFja2VkLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdHRoaXMucmVzZXRFbmVteURhdGEoKTtcblx0XHRcdFx0XHR0aGlzLmFpQXR0YWNrKGVuZW15Qm9hcmQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuYXR0YWNrRGlyZWN0aW9uID09PSAndG9wJykge1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0cG9zc2libGVTaG90cy50b3AgJiZcblx0XHRcdFx0XHQhcG9zc2libGVTaG90cy50b3AuaGl0VGFrZW4gJiZcblx0XHRcdFx0XHR0aGlzLmxhc3REYW1hZ2VkRW5lbXkub2NjdXBpZWRcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0ZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKFxuXHRcdFx0XHRcdFx0dGhpcy5sYXN0RGFtYWdlZEVuZW15LngsXG5cdFx0XHRcdFx0XHR0aGlzLmxhc3REYW1hZ2VkRW5lbXkueSAtIDFcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdHRoaXMubGFzdERhbWFnZWRFbmVteSA9IHBvc3NpYmxlU2hvdHMudG9wO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uc0F0dGFja2VkLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdHRoaXMuZGlyZWN0aW9uc0F0dGFja2VkLnB1c2goJ3RvcCcpO1xuXHRcdFx0XHRcdHRoaXMuYXR0YWNrRGlyZWN0aW9uID0gJ2JvdHRvbSc7XG5cdFx0XHRcdFx0dGhpcy5sYXN0RGFtYWdlZEVuZW15ID0gdGhpcy5kYW1hZ2VkRW5lbXk7XG5cdFx0XHRcdFx0dGhpcy5hdHRhY2tXaXRoRGlyZWN0aW9uKGVuZW15Qm9hcmQpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uc0F0dGFja2VkLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdHRoaXMucmVzZXRFbmVteURhdGEoKTtcblx0XHRcdFx0XHR0aGlzLmFpQXR0YWNrKGVuZW15Qm9hcmQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuYXR0YWNrRGlyZWN0aW9uID09PSAnYm90dG9tJykge1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0cG9zc2libGVTaG90cy5ib3R0b20gJiZcblx0XHRcdFx0XHQhcG9zc2libGVTaG90cy5ib3R0b20uaGl0VGFrZW4gJiZcblx0XHRcdFx0XHR0aGlzLmxhc3REYW1hZ2VkRW5lbXkub2NjdXBpZWRcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0ZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKFxuXHRcdFx0XHRcdFx0dGhpcy5sYXN0RGFtYWdlZEVuZW15LngsXG5cdFx0XHRcdFx0XHR0aGlzLmxhc3REYW1hZ2VkRW5lbXkueSArIDFcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdHRoaXMubGFzdERhbWFnZWRFbmVteSA9IHBvc3NpYmxlU2hvdHMuYm90dG9tO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uc0F0dGFja2VkLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdHRoaXMuZGlyZWN0aW9uc0F0dGFja2VkLnB1c2goJ2JvdHRvbScpO1xuXHRcdFx0XHRcdHRoaXMuYXR0YWNrRGlyZWN0aW9uID0gJ3RvcCc7XG5cdFx0XHRcdFx0dGhpcy5sYXN0RGFtYWdlZEVuZW15ID0gdGhpcy5kYW1hZ2VkRW5lbXk7XG5cdFx0XHRcdFx0dGhpcy5hdHRhY2tXaXRoRGlyZWN0aW9uKGVuZW15Qm9hcmQpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uc0F0dGFja2VkLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdHRoaXMucmVzZXRFbmVteURhdGEoKTtcblx0XHRcdFx0XHR0aGlzLmFpQXR0YWNrKGVuZW15Qm9hcmQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdGFpQXR0YWNrKGVuZW15Qm9hcmQpIHtcblx0XHRcdGlmICh0aGlzLmRhbWFnZWRFbmVteSkge1xuXHRcdFx0XHQvLyBHZXQgcG9zc2libGUgc2hvdHNcblx0XHRcdFx0Y29uc3QgcG9zc2libGVTaG90cyA9IHRoaXMuZ2V0UG9zc2libGVTaG90cyhlbmVteUJvYXJkLCB0aGlzLmRhbWFnZWRFbmVteSk7XG5cblx0XHRcdFx0aWYgKHRoaXMuYXR0YWNrRGlyZWN0aW9uKSB7XG5cdFx0XHRcdFx0dGhpcy5hdHRhY2tXaXRoRGlyZWN0aW9uKGVuZW15Qm9hcmQpO1xuXG5cdFx0XHRcdFx0Ly8gU2hpcCBvcmllbnRhdGlvbiB1bnNwZWNpZmllZFxuXHRcdFx0XHR9IGVsc2UgaWYgKCF0aGlzLmF0dGFja0RpcmVjdGlvbikge1xuXHRcdFx0XHRcdGlmIChwb3NzaWJsZVNob3RzLmxlZnQgJiYgIXBvc3NpYmxlU2hvdHMubGVmdC5oaXRUYWtlbikge1xuXHRcdFx0XHRcdFx0ZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKFxuXHRcdFx0XHRcdFx0XHR0aGlzLmRhbWFnZWRFbmVteS54IC0gMSxcblx0XHRcdFx0XHRcdFx0dGhpcy5kYW1hZ2VkRW5lbXkueVxuXHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0aWYgKHBvc3NpYmxlU2hvdHMubGVmdC5vY2N1cGllZCAmJiBwb3NzaWJsZVNob3RzLmxlZnQuaGl0VGFrZW4pIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5hdHRhY2tEaXJlY3Rpb24gPSAnbGVmdCc7XG5cdFx0XHRcdFx0XHRcdHRoaXMubGFzdERhbWFnZWRFbmVteSA9IHBvc3NpYmxlU2hvdHMubGVmdDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2UgaWYgKHBvc3NpYmxlU2hvdHMucmlnaHQgJiYgIXBvc3NpYmxlU2hvdHMucmlnaHQuaGl0VGFrZW4pIHtcblx0XHRcdFx0XHRcdGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhcblx0XHRcdFx0XHRcdFx0dGhpcy5kYW1hZ2VkRW5lbXkueCArIDEsXG5cdFx0XHRcdFx0XHRcdHRoaXMuZGFtYWdlZEVuZW15Lnlcblx0XHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRcdGlmIChwb3NzaWJsZVNob3RzLnJpZ2h0Lm9jY3VwaWVkICYmIHBvc3NpYmxlU2hvdHMucmlnaHQuaGl0VGFrZW4pIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5hdHRhY2tEaXJlY3Rpb24gPSAncmlnaHQnO1xuXHRcdFx0XHRcdFx0XHR0aGlzLmxhc3REYW1hZ2VkRW5lbXkgPSBwb3NzaWJsZVNob3RzLnJpZ2h0O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAocG9zc2libGVTaG90cy50b3AgJiYgIXBvc3NpYmxlU2hvdHMudG9wLmhpdFRha2VuKSB7XG5cdFx0XHRcdFx0XHRlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soXG5cdFx0XHRcdFx0XHRcdHRoaXMuZGFtYWdlZEVuZW15LngsXG5cdFx0XHRcdFx0XHRcdHRoaXMuZGFtYWdlZEVuZW15LnkgLSAxXG5cdFx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0XHRpZiAocG9zc2libGVTaG90cy50b3Aub2NjdXBpZWQgJiYgcG9zc2libGVTaG90cy50b3AuaGl0VGFrZW4pIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5hdHRhY2tEaXJlY3Rpb24gPSAndG9wJztcblx0XHRcdFx0XHRcdFx0dGhpcy5sYXN0RGFtYWdlZEVuZW15ID0gcG9zc2libGVTaG90cy50b3A7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChwb3NzaWJsZVNob3RzLmJvdHRvbSAmJiAhcG9zc2libGVTaG90cy5ib3R0b20uaGl0VGFrZW4pIHtcblx0XHRcdFx0XHRcdGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhcblx0XHRcdFx0XHRcdFx0dGhpcy5kYW1hZ2VkRW5lbXkueCxcblx0XHRcdFx0XHRcdFx0dGhpcy5kYW1hZ2VkRW5lbXkueSArIDFcblx0XHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0cG9zc2libGVTaG90cy5ib3R0b20ub2NjdXBpZWQgJiZcblx0XHRcdFx0XHRcdFx0cG9zc2libGVTaG90cy5ib3R0b20uaGl0VGFrZW5cblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLmF0dGFja0RpcmVjdGlvbiA9ICdib3R0b20nO1xuXHRcdFx0XHRcdFx0XHR0aGlzLmxhc3REYW1hZ2VkRW5lbXkgPSBwb3NzaWJsZVNob3RzLmJvdHRvbTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoIXRoaXMuZGFtYWdlZEVuZW15KSB7XG5cdFx0XHRcdHRoaXMucmFuZG9tQXR0YWNrKGVuZW15Qm9hcmQpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImZ1bmN0aW9uIFNoaXAobGVuZ3RoKSB7XG5cdHJldHVybiB7XG5cdFx0bGVuZ3RoLFxuXHRcdGhpdHNUYWtlbjogMCxcblx0XHRpc1N1bms6IGZhbHNlLFxuXG5cdFx0dGFrZUhpdCgpIHtcblx0XHRcdHRoaXMuaGl0c1Rha2VuICs9IDE7XG5cdFx0XHR0aGlzLmNoZWNrSFAoKTtcblx0XHR9LFxuXG5cdFx0Y2hlY2tIUCgpIHtcblx0XHRcdGlmICh0aGlzLmhpdHNUYWtlbiA+PSB0aGlzLmxlbmd0aCkge1xuXHRcdFx0XHR0aGlzLmlzU3VuayA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSxcblx0fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiIsImltcG9ydCBQbGF5ZXIgZnJvbSAnLi9mYWN0b3JpZXMvcGxheWVyJztcbmltcG9ydCB7XG5cdHN0YXJ0QnRuLFxuXHRyYW5kb21CdG4sXG5cdHJlc3RhcnRCdG4sXG5cdHBvcHVsYXRlQm9hcmRIVE1MLFxuXHRyZXNldEdyaWRIVE1MLFxuXHRhZGRGbGVldERlcGxveW1lbnRMaXN0ZW5lcixcblx0YWRkR2FtZXBsYXlMaXN0ZW5lcnMsXG5cdHJlbW92ZUdyaWRMaXN0ZW5lcnNcbn0gZnJvbSAnLi9ET00nO1xuXG4vLyBJbml0aWFsaXplIHBsYXllcnNcbmNvbnN0IHBsYXllciA9IFBsYXllcigpO1xuY29uc3QgYWkgPSBQbGF5ZXIoKTtcblxuLy8gUGxheWVyIHJhbmRvbSBmbGVldCBkZXBsb3ltZW50XG5yYW5kb21CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdHBsYXllci5nYW1lYm9hcmQuY2xlYXJHcmlkKCk7XG5cdHJlc2V0R3JpZEhUTUwoJ3BsYXllcicpO1xuXHRyZW1vdmVHcmlkTGlzdGVuZXJzKClcblx0cGxheWVyLmdhbWVib2FyZC5yYW5kb21GbGVldFBsYWNlbWVudCgpO1xuXHRwb3B1bGF0ZUJvYXJkSFRNTCgncGxheWVyJywgcGxheWVyLmdhbWVib2FyZC5ncmlkKTtcbn0pO1xuXG4vLyBQbGF5ZXIgbWFudWFsIGZsZWV0IGRlcGxveW1lbnRcbmxldCBvcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcblxuYWRkRmxlZXREZXBsb3ltZW50TGlzdGVuZXIob3JpZW50YXRpb24sIHBsYXllci5nYW1lYm9hcmQpO1xuXG4vLyBUb2dnbGUgc2hpcCBvcmllbnRhdGlvblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuXHRpZiAoZS5jb2RlID09PSAnS2V5UicpIHtcblx0XHRpZiAob3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuXHRcdFx0b3JpZW50YXRpb24gPSAndmVydGljYWwnO1xuXHRcdH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcblx0XHRcdG9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xuXHRcdH1cblx0XHRyZXNldEdyaWRIVE1MKCdwbGF5ZXInKTtcblx0XHRwb3B1bGF0ZUJvYXJkSFRNTCgncGxheWVyJywgcGxheWVyLmdhbWVib2FyZC5ncmlkKTtcbiAgICAgICAgYWRkRmxlZXREZXBsb3ltZW50TGlzdGVuZXIob3JpZW50YXRpb24sIHBsYXllci5nYW1lYm9hcmQpO1xuXHR9XG5cblx0aWYgKGUuY29kZSA9PT0gJ0tleUYnKSB7XG5cdFx0cGxheWVyLnJhbmRvbUF0dGFjayhhaS5nYW1lYm9hcmQpXG5cdFx0YWkuYWlBdHRhY2socGxheWVyLmdhbWVib2FyZCk7XG5cdFx0cG9wdWxhdGVCb2FyZEhUTUwoJ3BsYXllcicsIHBsYXllci5nYW1lYm9hcmQuZ3JpZCk7XG5cdFx0cG9wdWxhdGVCb2FyZEhUTUwoJ2FpJywgYWkuZ2FtZWJvYXJkLmdyaWQpO1xuXHR9XG59KTtcblxuc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdC8vIENoZWNrIGlmIGZsZWV0IGlzIGRlcGxveWVkXG5cdGNvbnN0IGZsZWV0RGVwbG95ZWQgPSBbXTtcblx0cGxheWVyLmdhbWVib2FyZC5ncmlkLmZvckVhY2goc3EgPT4ge1xuXHRcdGlmIChzcS5vY2N1cGllZCkgZmxlZXREZXBsb3llZC5wdXNoKHRydWUpO1xuXHR9KTtcdFxuXHQvLyBJZiBub3QsIGRlcGxveSByYW5kb21seVxuXHRpZiAoZmxlZXREZXBsb3llZC5sZW5ndGggIT09IDE3KSB7XG5cdFx0cmFuZG9tQnRuLmNsaWNrKCk7XG5cdH1cblxuXHQvLyBBSSByYW5kb20gZmxlZXQgZGVwbG95bWVudFxuXHRhaS5nYW1lYm9hcmQucmFuZG9tRmxlZXRQbGFjZW1lbnQoKTtcblx0YWRkR2FtZXBsYXlMaXN0ZW5lcnMoYWksIHBsYXllcik7XG59KTtcblxucmVzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0cGxheWVyLmdhbWVib2FyZC5jbGVhckdyaWQoKTtcblx0YWkuZ2FtZWJvYXJkLmNsZWFyR3JpZCgpO1xuXG5cdGFkZEZsZWV0RGVwbG95bWVudExpc3RlbmVyKG9yaWVudGF0aW9uLCBwbGF5ZXIuZ2FtZWJvYXJkKTtcbn0pO1xuXG4iLCJjb25zdCBzaGlwVHlwZXMgPSBbXG5cdHsgdHlwZTogJ0NhcnJpZXInLCBsZW5ndGg6IDUsIGNvbG9yOiAncmdiKDI1MCwgMTA4LCA1NiknIH0sXG5cdHsgdHlwZTogJ0JhdHRsZXNoaXAnLCBsZW5ndGg6IDQsIGNvbG9yOiAncmdiKDI1NSwgMTU1LCAxMzMpJyB9LFxuXHR7IHR5cGU6ICdEZXN0cm95ZXInLCBsZW5ndGg6IDMsIGNvbG9yOiAncmdiKDI0NiwgMjE1LCA2MCknIH0sXG5cdHsgdHlwZTogJ1N1Ym1hcmluZScsIGxlbmd0aDogMywgY29sb3I6ICdyZ2IoMCwgMTg0LCAxNDQpJyB9LFxuXHR7IHR5cGU6ICdQYXRyb2wgQm9hdCcsIGxlbmd0aDogMiwgY29sb3I6ICdyZ2IoODAsIDE4MCwgMjI2KScgfSxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IHNoaXBUeXBlczsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJvYm90bytNb25vOndnaHRANjAwJmZhbWlseT1VbmJvdW5kZWQ6d2dodEA4MDAmZGlzcGxheT1zd2FwKTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxZjI5Mzc7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgbWluLXdpZHRoOiA5NTBweDtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBtaW4taGVpZ2h0OiA3MjBweDtcXG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvIE1vbm8nLCBtb25vc3BhY2U7IH1cXG5cXG4udGl0bGUge1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMzBweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBjb2xvcjogd2hpdGU7XFxuICBmb250LWZhbWlseTogJ1VuYm91bmRlZCcsIGN1cnNpdmU7XFxuICBmb250LXNpemU6IDgwcHg7XFxuICBtYXJnaW4tdG9wOiAzMHB4OyB9XFxuXFxuLnNjb3JlIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgdG9wOiAyMyU7XFxuICB6LWluZGV4OiAxO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiA0MHB4O1xcbiAgdHJhbnNpdGlvbjogYWxsIDFzOyB9XFxuXFxuLnJlc3RhcnQge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3R0b206IDE1JTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMC44NSk7XFxuICB0cmFuc2l0aW9uOiBhbGwgMXM7IH1cXG5cXG4uZ2FtZS1jb250YWluZXIuc2hyaW5rIHtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMC42KTsgfVxcblxcbi53aW5uZXIge1xcbiAgYm94LXNoYWRvdzogMHB4IDBweCAyOXB4IDVweCB3aGl0ZTsgfVxcblxcbi5nYW1lLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAxMDBweDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTAwJTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxczsgfVxcbiAgLmdhbWUtY29udGFpbmVyIC5sZWZ0LFxcbiAgLmdhbWUtY29udGFpbmVyIC5yaWdodCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHdpZHRoOiA1MHZ3O1xcbiAgICBoZWlnaHQ6IDUwMHB4O1xcbiAgICBtYXJnaW4tdG9wOiAtMiU7IH1cXG4gIC5nYW1lLWNvbnRhaW5lciAubGVmdCB7XFxuICAgIGp1c3RpZnktY29udGVudDogZW5kOyB9XFxuICAuZ2FtZS1jb250YWluZXIgLnJpZ2h0IHtcXG4gICAganVzdGlmeS1jb250ZW50OiBzdGFydDsgfVxcbiAgLmdhbWUtY29udGFpbmVyIC5vcHRpb25zIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGZsZXgtc2hyaW5rOiAwO1xcbiAgICBnYXA6IDIwcHg7XFxuICAgIHdpZHRoOiAzODBweDtcXG4gICAgaGVpZ2h0OiA1MDBweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBmb250LXNpemU6IDMzcHg7XFxuICAgIGxpbmUtaGVpZ2h0OiA1MnB4OyB9XFxuICAgIC5nYW1lLWNvbnRhaW5lciAub3B0aW9ucyAucm90YXRlLWluc3RydWN0aW9uIHtcXG4gICAgICBoZWlnaHQ6IDEzNXB4O1xcbiAgICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCB3aGl0ZTsgfVxcbiAgICAuZ2FtZS1jb250YWluZXIgLm9wdGlvbnMgLnJhbmRvbS1kZXBsb3ltZW50IHtcXG4gICAgICBkaXNwbGF5OiBmbGV4OyB9XFxuXFxuLmJvYXJkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZmxleC1zaHJpbms6IDA7XFxuICB3aWR0aDogNDAwcHg7XFxuICBoZWlnaHQ6IDQwMHB4O1xcbiAgYm9yZGVyOiBzb2xpZCAxcHggd2hpdGU7IH1cXG4gIC5ib2FyZCAucm93IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgZmxleC1ncm93OiAxOyB9XFxuXFxuLnNxdWFyZSB7XFxuICBmbGV4LWdyb3c6IDE7XFxuICBib3JkZXI6IHNvbGlkIDFweCB3aGl0ZTsgfVxcblxcbi5mb290ZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGhlaWdodDogNzBweDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIG1hcmdpbi1ib3R0b206IDVweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMTVweDtcXG4gIGNvbG9yOiAjYzhjOGM4OyB9XFxuXFxuI2dpdGh1YiB7XFxuICBoZWlnaHQ6IDI3cHg7XFxuICB3aWR0aDogMjdweDtcXG4gIHBhZGRpbmctYm90dG9tOiAwLjJ2aDtcXG4gIHRyYW5zaXRpb246IDAuM3M7IH1cXG5cXG4jZ2l0aHViOmhvdmVyIHtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS4xKTsgfVxcblxcbi5idXR0b24ge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgbWFyZ2luOiAyNXB4IDEwcHggMCAxMHB4O1xcbiAgd2lkdGg6IDE5MHB4O1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgwLjgzKTtcXG4gIGxpbmUtaGVpZ2h0OiAyMXB4OyB9XFxuXFxuLmJ1dHRvbiBhIHtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGZvbnQtZmFtaWx5OiBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGZvbnQtc2l6ZTogMjVweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNiNTVlNGI7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHBhZGRpbmc6IDIwcHggNDBweDtcXG4gIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwKTtcXG4gIHRleHQtc2hhZG93OiAwcHggMXB4IDBweCAjMDAwO1xcbiAgZmlsdGVyOiBkcm9wc2hhZG93KGNvbG9yPSMwMDAsIG9mZng9MCBweCwgb2ZmeT0xIHB4KTtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAjZmZlNWM0LCAwIDhweCAwICM2ZTNlMDA7XFxuICAtbW96LWJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDAgI2ZmZTVjNCwgMCA4cHggMCAjNmUzZTAwO1xcbiAgYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAjZmZlNWM0LCAwIDhweCAwICM2ZTNlMDA7XFxuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDVweDtcXG4gIC1tb3otYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogNXB4OyB9XFxuXFxuLmJ1dHRvbiBhOmFjdGl2ZSB7XFxuICB0b3A6IDEwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYjU1ZTRiO1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAwICNmZmU1YzQsIGluc2V0IDAgLTNweCAwICM5MTUxMDA7XFxuICAtbW96LWJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDAgI2ZmZTVjNCwgaW5zZXQgMCAtM3B4IDAgIzkxNTEwMDtcXG4gIGJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDAgI2ZmZTVjNCwgaW5zZXQgMCAtM3B4IDAgIzkxNTEwMDsgfVxcblxcbi5idXR0b24uc3RhcnQgYSxcXG4uYnV0dG9uLnN0YXJ0IGE6YWN0aXZlLFxcbi5idXR0b24ucmVzdGFydC1idG4gYSxcXG4uYnV0dG9uLnJlc3RhcnQgYTphY3RpdmUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2MzMTIxMjsgfVxcblxcbi5idXR0b246YWZ0ZXIge1xcbiAgY29udGVudDogJyc7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBhZGRpbmc6IDRweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvdHRvbTogLTE1cHg7XFxuICBsZWZ0OiAtNHB4O1xcbiAgei1pbmRleDogLTE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmIxODAwO1xcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHg7XFxuICAtbW96LWJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDsgfVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8u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QjtFQUNsQixhQUFhO0VBQ2IsVUFBVTtFQUNWLFdBQVc7RUFDWCx5QkFBeUI7RUFDekIsMEJBQTBCO0VBQzFCLHVCQUF1QjtFQUN2QixrQkFBa0IsRUFBQVwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Sb2JvdG8rTW9ubzp3Z2h0QDYwMCZmYW1pbHk9VW5ib3VuZGVkOndnaHRAODAwJmRpc3BsYXk9c3dhcCcpO1xcblxcbmJvZHkge1xcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMzEsIDQxLCA1NSk7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFxuXFx0d2lkdGg6IDEwMHZ3O1xcblxcdG1pbi13aWR0aDogOTUwcHg7XFxuXFx0aGVpZ2h0OiAxMDB2aDtcXG5cXHRtaW4taGVpZ2h0OiA3MjBweDtcXG5cXG5cXHRmb250LWZhbWlseTogJ1JvYm90byBNb25vJywgbW9ub3NwYWNlO1xcbn1cXG5cXG4udGl0bGUge1xcblxcdHdpZHRoOiAxMDB2dztcXG5cXHRoZWlnaHQ6IDEzMHB4O1xcblxcblxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuXFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXHRjb2xvcjogd2hpdGU7XFxuXFx0Zm9udC1mYW1pbHk6ICdVbmJvdW5kZWQnLCBjdXJzaXZlO1xcblxcdGZvbnQtc2l6ZTogODBweDtcXG5cXHRtYXJnaW4tdG9wOiAzMHB4O1xcbn1cXG5cXG4uc2NvcmUge1xcblxcdGRpc3BsYXk6IG5vbmU7XFxuXFx0cG9zaXRpb246IGFic29sdXRlO1xcblxcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xcblxcblxcdHdpZHRoOiAxMDAlO1xcblxcdHRvcDogMjMlO1xcblxcdHotaW5kZXg6IDE7XFxuXFxuXFx0Y29sb3I6IHdoaXRlO1xcblxcdHRleHQtYWxpZ246IGNlbnRlcjtcXG5cXHRmb250LXNpemU6IDQwcHg7XFxuXFx0dHJhbnNpdGlvbjogYWxsIDFzO1xcbn1cXG5cXG4ucmVzdGFydCB7XFxuXFx0ZGlzcGxheTogbm9uZTtcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuXFxuXFx0d2lkdGg6IDEwMCU7XFxuXFx0Ym90dG9tOiAxNSU7XFxuXFx0dHJhbnNmb3JtOiBzY2FsZSguODUpO1xcblxcdHRyYW5zaXRpb246IGFsbCAxcztcXG59XFxuXFxuLy8gRW5kZ2FtZSBzdHlsaXphdGlvblxcbi5nYW1lLWNvbnRhaW5lci5zaHJpbmsge1xcblxcdHRyYW5zZm9ybTogc2NhbGUoLjYpO1xcbn1cXG5cXG4ud2lubmVyIHtcXG5cXHRib3gtc2hhZG93OiAwcHggMHB4IDI5cHggNXB4IHJnYigyNTUsIDI1NSwgMjU1KTtcXG59XFxuLy8gPC9FbmRnYW1lIHN0eWxpemF0aW9uPlxcblxcbi5nYW1lLWNvbnRhaW5lciB7XFxuXFx0ZGlzcGxheTogZmxleDtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXHRhbGlnbi1pdGVtczogY2VudGVyO1xcblxcdGdhcDogMTAwcHg7XFxuXFxuXFx0d2lkdGg6IDEwMHZ3O1xcblxcdGhlaWdodDogMTAwJTtcXG5cXHRjb2xvcjogd2hpdGU7XFxuXFx0dHJhbnNpdGlvbjogdHJhbnNmb3JtIDFzO1xcblxcblxcblxcdC5sZWZ0LFxcblxcdC5yaWdodCB7XFxuXFx0XFx0ZGlzcGxheTogZmxleDtcXG5cXHRcXHRhbGlnbi1pdGVtczogY2VudGVyO1xcblxcblxcdFxcdHdpZHRoOiA1MHZ3O1xcblxcdFxcdGhlaWdodDogNTAwcHg7XFxuXFx0XFx0bWFyZ2luLXRvcDogLTIlO1xcblxcdH1cXG5cXG5cXHQubGVmdCB7XFxuXFx0XFx0anVzdGlmeS1jb250ZW50OiBlbmQ7XFxuXFx0fVxcblxcdC5yaWdodCB7XFxuXFx0XFx0anVzdGlmeS1jb250ZW50OiBzdGFydDtcXG5cXHR9XFxuXFxuXFx0Lm9wdGlvbnMge1xcblxcdFxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0XFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuXFx0XFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXHRcXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcblxcdFxcdGZsZXgtc2hyaW5rOiAwO1xcblxcdFxcdGdhcDogMjBweDtcXG5cXG5cXHRcXHR3aWR0aDogMzgwcHg7XFxuXFx0XFx0aGVpZ2h0OiA1MDBweDtcXG5cXHRcXHR0ZXh0LWFsaWduOiBjZW50ZXI7XFxuXFx0XFx0Zm9udC1zaXplOiAzM3B4O1xcblxcdFxcdGxpbmUtaGVpZ2h0OiA1MnB4O1xcblxcblxcdFxcdC5yb3RhdGUtaW5zdHJ1Y3Rpb24ge1xcblxcdFxcdFxcdGhlaWdodDogMTM1cHg7XFxuXFx0XFx0XFx0Ym9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIHdoaXRlO1xcblxcdFxcdH1cXG5cXG5cXHRcXHQucmFuZG9tLWRlcGxveW1lbnQge1xcblxcdFxcdFxcdGRpc3BsYXk6IGZsZXg7XFxuXFx0XFx0fVxcblxcdH1cXG59XFxuXFxuLmJvYXJkIHtcXG5cXHRkaXNwbGF5OiBmbGV4O1xcblxcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuXFx0ZmxleC1zaHJpbms6IDA7XFxuXFxuXFx0d2lkdGg6IDQwMHB4O1xcblxcdGhlaWdodDogNDAwcHg7XFxuXFx0Ym9yZGVyOiBzb2xpZCAxcHggd2hpdGU7XFxuXFxuXFx0LnJvdyB7XFxuXFx0XFx0ZGlzcGxheTogZmxleDtcXG5cXHRcXHRmbGV4LWRpcmVjdGlvbjogcm93O1xcblxcdFxcdGZsZXgtZ3JvdzogMTtcXG5cXHR9XFxufVxcblxcbi5zcXVhcmUge1xcblxcdGZsZXgtZ3JvdzogMTtcXG5cXHRib3JkZXI6IHNvbGlkIDFweCB3aGl0ZTtcXG59XFxuXFxuLmZvb3RlciB7XFxuXFx0ZGlzcGxheTogZmxleDtcXG5cXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG5cXHRhbGlnbi1pdGVtczogY2VudGVyO1xcblxcblxcdGhlaWdodDogNzBweDtcXG5cXHR3aWR0aDogMTAwdnc7XFxuXFx0bWFyZ2luLWJvdHRvbTogNXB4O1xcblxcblxcdHRleHQtYWxpZ246IGNlbnRlcjtcXG5cXHRmb250LXNpemU6IDE1cHg7XFxuXFx0Y29sb3I6IHJnYigyMDAsIDIwMCwgMjAwKTtcXG59XFxuXFxuI2dpdGh1YiB7XFxuXFx0aGVpZ2h0OiAyN3B4O1xcblxcdHdpZHRoOiAyN3B4O1xcblxcdHBhZGRpbmctYm90dG9tOiAwLjJ2aDtcXG5cXHR0cmFuc2l0aW9uOiAwLjNzO1xcbn1cXG5cXG4jZ2l0aHViOmhvdmVyIHtcXG5cXHR0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XFxufVxcblxcbi8vIEJ1dHRvbiBmcm9tIGh0dHBzOi8vZGV2LnRvL3dlYmRlYXN5L3RvcC0yMC1jc3MtYnV0dG9ucy1hbmltYXRpb25zLWY0MVxcbi8vIGF1dGhvciBqZW13YXJlLiBBZGp1c3RlZCBhIGJpdCB0byBteSBvd24gbmVlZHMuXFxuLmJ1dHRvbiB7XFxuXFx0cG9zaXRpb246IHJlbGF0aXZlO1xcblxcdGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG5cXHRtYXJnaW46IDI1cHggMTBweCAwIDEwcHg7XFxuXFxuXFx0d2lkdGg6IDE5MHB4O1xcblxcdHRyYW5zZm9ybTogc2NhbGUoLjgzKTtcXG5cXHRsaW5lLWhlaWdodDogMjFweDtcXG59XFxuXFxuLmJ1dHRvbiBhIHtcXG5cXHRjb2xvcjogd2hpdGU7XFxuXFx0Zm9udC1mYW1pbHk6IEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXG5cXHRmb250LXdlaWdodDogYm9sZDtcXG5cXHRmb250LXNpemU6IDI1cHg7XFxuXFx0dGV4dC1hbGlnbjogY2VudGVyO1xcblxcdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTgxLCA5NCwgNzUpO1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcblxcdHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXHRwYWRkaW5nOiAyMHB4IDQwcHg7XFxuXFxuXFx0LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDApO1xcblxcdHRleHQtc2hhZG93OiAwcHggMXB4IDBweCAjMDAwO1xcblxcdGZpbHRlcjogZHJvcHNoYWRvdyhjb2xvcj0jMDAwLCBvZmZ4PTBweCwgb2ZmeT0xcHgpO1xcblxcblxcdC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAjZmZlNWM0LCAwIDhweCAwICM2ZTNlMDA7XFxuXFx0LW1vei1ib3gtc2hhZG93OiBpbnNldCAwIDFweCAwICNmZmU1YzQsIDAgOHB4IDAgIzZlM2UwMDtcXG5cXHRib3gtc2hhZG93OiBpbnNldCAwIDFweCAwICNmZmU1YzQsIDAgOHB4IDAgIzZlM2UwMDtcXG5cXG5cXHQtd2Via2l0LWJvcmRlci1yYWRpdXM6IDVweDtcXG5cXHQtbW96LWJvcmRlci1yYWRpdXM6IDVweDtcXG5cXHRib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcblxcbi5idXR0b24gYTphY3RpdmUge1xcblxcdHRvcDogMTBweDtcXG5cXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTgxLCA5NCwgNzUpO1xcblxcblxcdC13ZWJraXQtYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAjZmZlNWM0LCBpbnNldCAwIC0zcHggMCAjOTE1MTAwO1xcblxcdC1tb3otYm94LXNoYWRvdzogaW5zZXQgMCAxcHggMCAjZmZlNWM0LCBpbnNldCAwIC0zcHggMCAjOTE1MTAwO1xcblxcdGJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDAgI2ZmZTVjNCwgaW5zZXQgMCAtM3B4IDAgIzkxNTEwMDtcXG59XFxuXFxuLmJ1dHRvbi5zdGFydCBhLFxcbi5idXR0b24uc3RhcnQgYTphY3RpdmUsXFxuLmJ1dHRvbi5yZXN0YXJ0LWJ0biBhLFxcbi5idXR0b24ucmVzdGFydCBhOmFjdGl2ZSB7XFxuXFx0YmFja2dyb3VuZC1jb2xvcjogI2MzMTIxMjtcXG59XFxuXFxuLmJ1dHRvbjphZnRlciB7XFxuXFx0Y29udGVudDogJyc7XFxuXFx0aGVpZ2h0OiAxMDAlO1xcblxcdHdpZHRoOiAxMDAlO1xcblxcdHBhZGRpbmc6IDRweDtcXG5cXHRwb3NpdGlvbjogYWJzb2x1dGU7XFxuXFx0Ym90dG9tOiAtMTVweDtcXG5cXHRsZWZ0OiAtNHB4O1xcblxcdHotaW5kZXg6IC0xO1xcblxcdGJhY2tncm91bmQtY29sb3I6ICMyYjE4MDA7XFxuXFx0LXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHg7XFxuXFx0LW1vei1ib3JkZXItcmFkaXVzOiA1cHg7XFxuXFx0Ym9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCAnLi9zdHlsZS5zY3NzJztcblxuXG5pbXBvcnQgJy4vbW9kdWxlcy9ET00nO1xuaW1wb3J0ICcuL21vZHVsZXMvZ2FtZUxvb3AnXG5cbmltcG9ydCAnLi9tb2R1bGVzL2ZhY3Rvcmllcy9zaGlwJztcbmltcG9ydCAnLi9tb2R1bGVzL2ZhY3Rvcmllcy9nYW1lYm9hcmQnO1xuaW1wb3J0ICcuL21vZHVsZXMvZmFjdG9yaWVzL3BsYXllcic7XG5cbiJdLCJuYW1lcyI6WyJzaGlwVHlwZXMiLCJnaXRJY29uIiwiZ2FtZUNvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInNjb3JlIiwicmVzdGFydEJ0biIsImdpdEltZyIsInN0YXJ0QnRuIiwicmFuZG9tQnRuIiwibGVmdCIsInJpZ2h0Iiwib3B0aW9ucyIsInJvdyIsImNyZWF0ZUVsZW1lbnQiLCJzcXVhcmUiLCJwbGF5ZXJCb2FyZCIsInNyYyIsImNsYXNzTGlzdCIsImFkZCIsImkiLCJhcHBlbmRDaGlsZCIsImNsb25lTm9kZSIsImoiLCJ0ZW1wU3F1YXJlIiwic2V0QXR0cmlidXRlIiwibGFzdENoaWxkIiwiYWlCb2FyZCIsInN0eWxlIiwiZGlzcGxheSIsImhlbHBlckNob29zZVBsYXllckdyaWQiLCJwbGF5ZXIiLCJncmlkSFRNTCIsInBvcHVsYXRlQm9hcmRIVE1MIiwiZ3JpZE9iamVjdCIsInNxdWFyZUhUTUwiLCJmb3JFYWNoIiwic3F1YXJlT2JqIiwiY2hpbGROb2RlcyIsInJvd0hUTUwiLCJzcSIsIngiLCJnZXRBdHRyaWJ1dGUiLCJ5Iiwib2NjdXBpZWQiLCJoaXRUYWtlbiIsImJhY2tncm91bmRDb2xvciIsInNoaXBUeXBlIiwidHlwZSIsImNvbG9yIiwicmVzZXRHcmlkSFRNTCIsInJlbW92ZUdyaWRMaXN0ZW5lcnMiLCJwbGF5ZXJCb2FyZENsb25lIiwiYWlCb2FyZENsb25lIiwicGFyZW50Tm9kZSIsInJlcGxhY2VDaGlsZCIsImFkZEZsZWV0RGVwbG95bWVudExpc3RlbmVyIiwib3JpZW50YXRpb24iLCJnYW1lYm9hcmRPYmoiLCJzcVgiLCJzcVkiLCJzaGlwVHlwZU9iaiIsInNoaXBMZW5ndGgiLCJncmlkIiwic29tZSIsImVsIiwibGVuZ3RoIiwibm9TcGFjZSIsImNoZWNrU3BhY2VGb3JTaGlwIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJ3Iiwic3FyIiwiYWRkU2hpcCIsImVuZEdhbWUiLCJ3aW5uZXIiLCJpbm5lckhUTUwiLCJhZGRHYW1lcGxheUxpc3RlbmVycyIsImFpT2JqZWN0IiwicGxheWVyT2JqZWN0IiwiYXR0YWNrIiwiZ2FtZWJvYXJkIiwicmVjZWl2ZUF0dGFjayIsImdhbWVMb3N0IiwiYWlBdHRhY2siLCJvbmNsaWNrIiwicmVtb3ZlIiwiU2hpcCIsIkdhbWVib2FyZCIsImNyZWF0ZUdyaWQiLCJncmlkQXJyYXkiLCJwdXNoIiwiY2xlYXJHcmlkIiwieENvb3JkIiwieUNvb3JkIiwic3RhcnRTcXVhcmUiLCJnZXRTcXVhcmUiLCJuZXdTaGlwIiwicmFuZG9tRmxlZXRQbGFjZW1lbnQiLCJyYW5kb21TaGlwUGxhY2VtZW50Iiwic2hpcEJ1aWx0Iiwib3JpZW50YXRpb25OdW1iZXIiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJmaW5kIiwidGFrZUhpdCIsImNoZWNrRmxlZXRDb25kaXRpb24iLCJmbGVldEFsaXZlIiwiUGxheWVyIiwiZGFtYWdlZEVuZW15IiwibGFzdERhbWFnZWRFbmVteSIsImVuZW15T3JpZW50YXRpb24iLCJhdHRhY2tEaXJlY3Rpb24iLCJkaXJlY3Rpb25zQXR0YWNrZWQiLCJlbmVteUJvYXJkIiwicmFuZG9tQXR0YWNrIiwic2hvdEZpcmVkIiwiZGFtYWdlZFNxdWFyZSIsImdldFBvc3NpYmxlU2hvdHMiLCJlbmVteVNxdWFyZSIsInRvcCIsImJvdHRvbSIsInJlc2V0RW5lbXlEYXRhIiwiYXR0YWNrV2l0aERpcmVjdGlvbiIsInBvc3NpYmxlU2hvdHMiLCJoaXRzVGFrZW4iLCJpc1N1bmsiLCJjaGVja0hQIiwiYWkiLCJlIiwiY29kZSIsImZsZWV0RGVwbG95ZWQiLCJjbGljayJdLCJzb3VyY2VSb290IjoiIn0=