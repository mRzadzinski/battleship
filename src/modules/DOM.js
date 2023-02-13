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
        tempSquare.setAttribute('data-x', i);
        tempSquare.setAttribute('data-y', j);

		playerBoard.lastChild.appendChild(tempSquare);
	}
}

const aiBoard = playerBoard.cloneNode(true);
playerBoard.classList.add('player-board');
aiBoard.classList.add('ai-board');
aiBoard.style.display = 'none';

left.appendChild(playerBoard);
right.appendChild(aiBoard);
