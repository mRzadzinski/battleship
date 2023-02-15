/* eslint-disable prefer-destructuring */
import shipTypes from './shipTypes';
import gitIcon from '../img/github.png';

const gitImg = document.querySelector('#github');
gitImg.src = gitIcon;

const startBtn = document.querySelector('.start');
const randomBtn = document.querySelector('.random');

const left = document.querySelector('.left');
const right = document.querySelector('.right');

const row = document.createElement('div');
const square = document.createElement('div');
let playerBoard = document.createElement('div');

playerBoard.classList.add('board');
row.classList.add('row');
square.classList.add('square');

// Create grid
for (let i = 1; i < 11; i++) {
	playerBoard.appendChild(row.cloneNode());
	playerBoard.lastChild.setAttribute('data-y', i);
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

function helperChoosePlayerGrid(player) {
	let gridHTML;

	if (player === 'player') {
		gridHTML = playerBoard;
	} else if (player === 'ai') {
		gridHTML = aiBoard;
	}
	return gridHTML;
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

			// On click add ship to player's board object
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

export {
	startBtn,
	randomBtn,
	populateBoardHTML,
	resetGridHTML,
	addFleetDeploymentListener,
};
