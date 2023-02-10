import Gameboard from './gameboard';

function Player() {
	return {
		gameboard: Gameboard(),
		gameWon: false,

		attack(xCoord, yCoord, enemyBoard) {
			enemyBoard.receiveAttack(xCoord, yCoord);
			if (enemyBoard.gameLost) {
				this.gameWon = true;
			}
		},

		randomAttack(enemyBoard) {
			let shotFired = false;

			while (!shotFired) {
				const xCoord = Math.floor(Math.random() * 10) + 1;
				const yCoord = Math.floor(Math.random() * 10) + 1;

				shotFired = enemyBoard.receiveAttack(xCoord, yCoord);
			}

			if (enemyBoard.gameLost) {
				this.gameWon = true;
			}
		},
	};
}

export default Player;
