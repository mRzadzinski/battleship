/* eslint-disable no-undef */
import Player from './player';

let player;
let enemyBoard;

function createGrid() {
	const gridArray = [];
	for (let i = 1; i < 11; i++) {
		for (let j = 1; j < 11; j++) {
			gridArray.push({
				x: i,
				y: j,
				hitTaken: false,
			});
		}
	}
	return gridArray;
}

beforeEach(() => {
	player = Player();

	enemyBoard = {
		grid: createGrid(),
		gameLost: false,

		// eslint-disable-next-line consistent-return
		receiveAttack(xCoord, yCoord) {
			const square = this.grid.find((sq) => sq.x === xCoord && sq.y === yCoord);
			if (!square.hitTaken) {
				square.hitTaken = true;
				return true;
			}
			if (square.hitTaken) {
				return false;
			}
		},

		getSquare(xCoord, yCoord) {
			return this.grid.find(
				(square) => square.x === xCoord && square.y === yCoord
			);
		},
	};
});

test("attack damages enemy's square", () => {
	const enemySquare = enemyBoard.grid.find((sq) => sq.x === 4 && sq.y === 7);
	player.attack(4, 7, enemyBoard);

	expect(enemySquare.hitTaken).toBe(true);
});

test('randomAttack works', () => {
	player.randomAttack(enemyBoard);
	const attackedSquare = enemyBoard.grid.some((sq) => sq.hitTaken);

	expect(attackedSquare).toBe(true);
});
