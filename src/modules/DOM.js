/* eslint-disable prefer-destructuring */
import shipTypes from './shipTypes';
import gitIcon from '../img/github.png';

const gitImg = document.querySelector('#github');
gitImg.src = gitIcon;

const gameContainer = document.querySelector('.game-container');
const left = document.querySelector('.left');
const right = document.querySelector('.right');
const options = document.querySelector('.options');
const score = document.querySelector('.score');

const randomBtn = document.querySelector('.random');
const startBtn = document.querySelector('.start');
const restartBtn = document.querySelector('.restart');

const row = document.createElement('div');
const square = document.createElement('div');
let playerBoard = document.createElement('div');

playerBoard.classList.add('board');
row.classList.add('row');
square.classList.add('square');

// Create grid
for (let i = 1; i < 11; i++) {
	playerBoard.appendChild(row.cloneNode());

	for (let j = 1; j < 11; j++) {
		const tempSquare = square.cloneNode();
		tempSquare.setAttribute('data-x', j);
		tempSquare.setAttribute('data-y', i);

		playerBoard.lastChild.appendChild(tempSquare);
	}
}

let aiBoard = playerBoard.cloneNode(true);
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
	const gridHTML = helperChoosePlayerGrid(player);
	let squareHTML;

	// Find HTML equivalent of square object by coordinates
	gridObject.forEach((squareObj) => {
		gridHTML.childNodes.forEach((rowHTML) => {
			rowHTML.childNodes.forEach((sq) => {
				if (
					squareObj.x === +sq.getAttribute('data-x') &&
					squareObj.y === +sq.getAttribute('data-y')
				) {
					squareHTML = sq;
				}
			});
		});

		if (!squareObj.occupied && !squareObj.hitTaken) {
			squareHTML.style.backgroundColor = 'rgb(31, 41, 55)';
		} else if (squareObj.occupied && !squareObj.hitTaken && player !== 'ai') {
			if (squareObj.shipType === shipTypes[4].type) {
				squareHTML.style.backgroundColor = shipTypes[4].color;
			} else if (squareObj.shipType === shipTypes[3].type) {
				squareHTML.style.backgroundColor = shipTypes[3].color;
			} else if (squareObj.shipType === shipTypes[2].type) {
				squareHTML.style.backgroundColor = shipTypes[2].color;
			} else if (squareObj.shipType === shipTypes[1].type) {
				squareHTML.style.backgroundColor = shipTypes[1].color;
			} else if (squareObj.shipType === shipTypes[0].type) {
				squareHTML.style.backgroundColor = shipTypes[0].color;
			}
		} else if (!squareObj.occupied && squareObj.hitTaken) {
			squareHTML.style.backgroundColor = 'rgb(88, 88, 88)';
		} else if (squareObj.occupied && squareObj.hitTaken) {
			squareHTML.style.backgroundColor = 'rgb(98, 0, 0)';
		}
	});
}

function resetGridHTML(player) {
	const gridHTML = helperChoosePlayerGrid(player);

	gridHTML.childNodes.forEach((rowHTML) => {
		rowHTML.childNodes.forEach((sq) => {
			sq.style.backgroundColor = 'rgb(31, 41, 55)';
		});
	});
}

function removeGridListeners() {
	const playerBoardClone = playerBoard.cloneNode(true);
	const aiBoardClone = aiBoard.cloneNode(true);

	playerBoard.parentNode.replaceChild(playerBoardClone, playerBoard);
	aiBoard.parentNode.replaceChild(aiBoardClone, aiBoard);

	playerBoard = playerBoardClone;
	aiBoard = aiBoardClone;
}

function addFleetDeploymentListener(orientation, gameboardObj) {
	removeGridListeners();

	playerBoard.childNodes.forEach((rowHTML) => {
		rowHTML.childNodes.forEach((sq) => {
			const sqX = +sq.getAttribute('data-x');
			const sqY = +sq.getAttribute('data-y');
			let shipTypeObj;
			let shipLength;

			// Check if particular ship type has been already deployed
			if (!gameboardObj.grid.some((el) => el.shipType === shipTypes[0].type)) {
				shipLength = shipTypes[0].length;
				shipTypeObj = shipTypes[0];
			} else if (
				!gameboardObj.grid.some((el) => el.shipType === shipTypes[1].type)
			) {
				shipLength = shipTypes[1].length;
				shipTypeObj = shipTypes[1];
			} else if (
				!gameboardObj.grid.some((el) => el.shipType === shipTypes[2].type)
			) {
				shipLength = shipTypes[2].length;
				shipTypeObj = shipTypes[2];
			} else if (
				!gameboardObj.grid.some((el) => el.shipType === shipTypes[3].type)
			) {
				shipLength = shipTypes[3].length;
				shipTypeObj = shipTypes[3];
			} else if (
				!gameboardObj.grid.some((el) => el.shipType === shipTypes[4].type)
			) {
				shipLength = shipTypes[4].length;
				shipTypeObj = shipTypes[4];
			}

			// Check if ship can be built
			const noSpace = gameboardObj.checkSpaceForShip(
				sqX,
				sqY,
				shipLength,
				orientation
			);

			// Show on grid if ship can be added
			sq.addEventListener('mouseover', () => {
				if (orientation === 'horizontal') {
					for (let i = sqX; i < sqX + shipLength; i++) {
						if (i > 10) break;

						playerBoard.childNodes.forEach((rw) => {
							rw.childNodes.forEach((sqr) => {
								if (
									+sqr.getAttribute('data-x') === i &&
									+sqr.getAttribute('data-y') === sqY
								) {
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
					}
				} else if (orientation === 'vertical') {
					for (let i = sqY; i < sqY + shipLength; i++) {
						if (i > 10) break;

						playerBoard.childNodes.forEach((rw) => {
							rw.childNodes.forEach((sqr) => {
								if (
									+sqr.getAttribute('data-x') === sqX &&
									+sqr.getAttribute('data-y') === i
								) {
									if (noSpace) {
										sqr.style.backgroundColor = 'rgb(88, 88, 88)';
									} else {
										sqr.style.backgroundColor = shipTypeObj.color;
									}
								}
							});
						});
					}
				}
			});

			// When leaving grid cell remove deployment indication
			sq.addEventListener('mouseleave', () => {
				populateBoardHTML('player', gameboardObj.grid);
			});

			// Add ship to player's board object on click
			sq.addEventListener('click', () => {
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
	aiBoard.childNodes.forEach((rowHTML) => {
		rowHTML.childNodes.forEach((sq) => {
			const sqX = +sq.getAttribute('data-x');
			const sqY = +sq.getAttribute('data-y');

			sq.addEventListener('click', () => {
				const attack = aiObject.gameboard.receiveAttack(sqX, sqY);
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

startBtn.onclick = () => {
	aiBoard.style.display = 'flex';
	options.style.display = 'none';
	removeGridListeners();
};

restartBtn.onclick = () => {
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

export {
	startBtn,
	randomBtn,
	restartBtn,
	populateBoardHTML,
	resetGridHTML,
	addFleetDeploymentListener,
	addGameplayListeners,
	removeGridListeners,
};
