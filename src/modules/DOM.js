import gitIcon from '../img/github.png';

const gitImg = document.querySelector('#github');
gitImg.src = gitIcon;

const left = document.querySelector('.left');
const right = document.querySelector('.right');

const playerBoard = document.createElement('div');
const row = document.createElement('div');
const square = document.createElement('div');

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

const aiBoard = playerBoard.cloneNode(true);
playerBoard.classList.add('player-board');
aiBoard.classList.add('ai-board');
aiBoard.style.display = 'none';

left.appendChild(playerBoard);
right.appendChild(aiBoard);

function populateDomBoard(player, gridObject) {
	let squareHTML;
	let gridHTML;

	if (player === 'player') {
		gridHTML = playerBoard;
	} else if (player === 'ai') {
		gridHTML = aiBoard;
	}

	// Find HTML equivalent of square object by coordinates
	gridObject.forEach((squareObj) => {
		if (squareObj.occupied) {
            gridHTML.childNodes.forEach((rowHTML) => {
                rowHTML.childNodes.forEach((sq) => {
                    if (
                        squareObj.x === +sq.getAttribute('data-x') &&
                        squareObj.y === +sq.getAttribute('data-y')
                    ) {
                        squareHTML = sq;
                        sq.style.backgroundColor = 'pink';
                    }
                });
            });

            if (squareObj.shipType === 'Patrol Boat') {
                squareHTML.style.backgroundColor = 'rgb(80, 180, 226)'
            } else if (squareObj.shipType === 'Submarine') {
                squareHTML.style.backgroundColor = 'rgb(0, 184, 144)'
            } else if (squareObj.shipType === 'Destroyer') {
                squareHTML.style.backgroundColor = 'rgb(246, 215, 60)'
            } else if (squareObj.shipType === 'Battleship') {
                squareHTML.style.backgroundColor = 'rgb(255, 155, 133)'
            } else if (squareObj.shipType === 'Carrier') {
                squareHTML.style.backgroundColor = 'rgb(250, 108, 56)'
            }
		}
	});
}


export default populateDomBoard;
