import Gameboard from './gameboard';

function Player() {
	return {
		gameboard: Gameboard(),
		damagedEnemy: null,
		lastDamagedEnemy: null,
		attackDirection: null,
		directionsAttacked: [],

		attack(xCoord, yCoord, enemyBoard) {
			enemyBoard.receiveAttack(xCoord, yCoord);
		},

		randomAttack(enemyBoard) {
			let shotFired = false;
			let xCoord;
			let yCoord;

			while (!shotFired) {
				xCoord = Math.floor(Math.random() * 10) + 1;
				yCoord = Math.floor(Math.random() * 10) + 1;

				shotFired = enemyBoard.receiveAttack(xCoord, yCoord);
			}

			// Save coords of damaged ship
			const damagedSquare = enemyBoard.getSquare(xCoord, yCoord);
			if (damagedSquare.occupied && damagedSquare.hitTaken) {
				this.damagedEnemy = enemyBoard.getSquare(xCoord, yCoord);
			}
		},

		getPossibleShots(enemyBoard, enemySquare) {
			const left = enemyBoard.getSquare(enemySquare.x - 1, enemySquare.y);
			const right = enemyBoard.getSquare(enemySquare.x + 1, enemySquare.y);
			const top = enemyBoard.getSquare(enemySquare.x, enemySquare.y - 1);
			const bottom = enemyBoard.getSquare(enemySquare.x, enemySquare.y + 1);

			return { left, right, top, bottom };
		},

		resetEnemyData() {
			this.damagedEnemy = null;
			this.lastDamagedEnemy = null;
			this.attackDirection = null;
			this.directionsAttacked = [];
		},

		attackWithDirection(enemyBoard) {
			const possibleShots = this.getPossibleShots(
				enemyBoard,
				this.lastDamagedEnemy
			);

			if (this.attackDirection === 'left') {
				if (
					possibleShots.left &&
					!possibleShots.left.hitTaken &&
					this.lastDamagedEnemy.occupied
				) {
					enemyBoard.receiveAttack(
						this.lastDamagedEnemy.x - 1,
						this.lastDamagedEnemy.y
					);
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
				if (
					possibleShots.right &&
					!possibleShots.right.hitTaken &&
					this.lastDamagedEnemy.occupied
				) {
					enemyBoard.receiveAttack(
						this.lastDamagedEnemy.x + 1,
						this.lastDamagedEnemy.y
					);
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
				if (
					possibleShots.top &&
					!possibleShots.top.hitTaken &&
					this.lastDamagedEnemy.occupied
				) {
					enemyBoard.receiveAttack(
						this.lastDamagedEnemy.x,
						this.lastDamagedEnemy.y - 1
					);
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
				if (
					possibleShots.bottom &&
					!possibleShots.bottom.hitTaken &&
					this.lastDamagedEnemy.occupied
				) {
					enemyBoard.receiveAttack(
						this.lastDamagedEnemy.x,
						this.lastDamagedEnemy.y + 1
					);
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

		aiAttack(enemyBoard) {
			// Random attack hit enemy ship
			if (this.damagedEnemy) {
				const possibleShots = this.getPossibleShots(
					enemyBoard,
					this.damagedEnemy
				);

				if (this.attackDirection) {
					this.attackWithDirection(enemyBoard);

					// Attack direction unspecified
				} else if (!this.attackDirection) {
					if (possibleShots.left && !possibleShots.left.hitTaken) {
						enemyBoard.receiveAttack(
							this.damagedEnemy.x - 1,
							this.damagedEnemy.y
						);

						if (possibleShots.left.occupied && possibleShots.left.hitTaken) {
							this.attackDirection = 'left';
							this.lastDamagedEnemy = possibleShots.left;
						}
					} else if (possibleShots.right && !possibleShots.right.hitTaken) {
						enemyBoard.receiveAttack(
							this.damagedEnemy.x + 1,
							this.damagedEnemy.y
						);

						if (possibleShots.right.occupied && possibleShots.right.hitTaken) {
							this.attackDirection = 'right';
							this.lastDamagedEnemy = possibleShots.right;
						}
					} else if (possibleShots.top && !possibleShots.top.hitTaken) {
						enemyBoard.receiveAttack(
							this.damagedEnemy.x,
							this.damagedEnemy.y - 1
						);

						if (possibleShots.top.occupied && possibleShots.top.hitTaken) {
							this.attackDirection = 'top';
							this.lastDamagedEnemy = possibleShots.top;
						}
					} else if (possibleShots.bottom && !possibleShots.bottom.hitTaken) {
						enemyBoard.receiveAttack(
							this.damagedEnemy.x,
							this.damagedEnemy.y + 1
						);

						if (
							possibleShots.bottom.occupied &&
							possibleShots.bottom.hitTaken
						) {
							this.attackDirection = 'bottom';
							this.lastDamagedEnemy = possibleShots.bottom;
						}
					}
				}
			} else if (!this.damagedEnemy) {
				this.randomAttack(enemyBoard);
			}
		},
	};
}

export default Player;
