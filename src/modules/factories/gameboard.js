/* eslint-disable no-loop-func */
function Gameboard() {
	let grid;

	const createGrid = () => {
		const gridArray = [];
		for (let i = 1; i < 11; i++) {
			for (let j = 1; j < 11; j++) {
				gridArray.push({
					x: i,
					y: j,
					occupied: false,
					shipType: false,
					hitTaken: false,
				});
			}
		}
		grid = gridArray;
	};
	createGrid();

	return {
		grid,
		gameLost: false,

		addShip(xCoord, yCoord, orientation, shipType, shipFactory) {
			let startSquare;
			let length;

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

			this.grid.forEach((square) => {
				if (square.x === xCoord && square.y === yCoord) {
					startSquare = square;
				}
			});

			if (startSquare.occupied) return false;

			// Check if there is space to create ship and coords are in range
			let cantBuild = false;
			if (orientation === 'horizontal') {
				for (let i = xCoord; i < xCoord + length; i++) {
					if (i > 10) return false;
					this.grid.forEach((square) => {
						if (
							square.x === i &&
							square.y === startSquare.y &&
							square.occupied
						) {
							cantBuild = true;
						}
					});
				}
			} else if (orientation === 'vertical') {
				for (let i = yCoord; i < yCoord + length; i++) {
					if (i > 10) return false;
					this.grid.forEach((square) => {
						if (
							square.x === startSquare.x &&
							square.y === i &&
							square.occupied
						) {
							cantBuild = true;
						}
					});
				}
			}
			if (cantBuild) return false;

			// Build ship
			const newShip = shipFactory(length);
			if (orientation === 'horizontal') {
				for (let i = xCoord; i < xCoord + length; i++) {
					this.grid.forEach((square) => {
						if (
							square.x === i &&
							square.y === startSquare.y &&
							!square.occupied
						) {
							square.occupied = newShip;
							square.shipType = shipType;
						}
					});
				}
			} else if (orientation === 'vertical') {
				for (let i = yCoord; i < yCoord + length; i++) {
					this.grid.forEach((square) => {
						if (
							square.x === startSquare.x &&
							square.y === i &&
							!square.occupied
						) {
							square.occupied = newShip;
							square.shipType = shipType;
						}
					});
				}
			}
		},

		getSquare(xCoord, yCoord) {
			return this.grid.find(
				(square) => square.x === xCoord && square.y === yCoord
			);
		},

		receiveAttack(xCoord, yCoord) {
			const square = this.grid.find((sq) => sq.x === xCoord && sq.y === yCoord);

			if (!square.occupied && !square.hitTaken) {
				square.hitTaken = 'miss';
			} else if (square.occupied && !square.hitTaken) {
				square.hitTaken = 'damage';
				square.occupied.takeHit();
			} else if (square.occupied && square.hitTaken) {
				return true;
			}
			this.checkFleetCondition();
		},

		checkFleetCondition() {
			const fleetDeployed = this.grid.some((square) => square.occupied);
			const fleetAlive = this.grid.some(
				(square) => square.occupied && !square.hitTaken
			);
			if (fleetDeployed && !fleetAlive) {
				this.gameLost = true;
			}
		},
	};
}

export default Gameboard;
