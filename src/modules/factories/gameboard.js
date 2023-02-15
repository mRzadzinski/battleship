/* eslint-disable no-loop-func */
import Ship from './ship';

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

		clearGrid() {
			this.grid.forEach((square) => {
				square.occupied = false;
				square.shipType = false;
				square.hitTaken = false;
			});
		},

		// Check if there is space to create ship and coords are in range
		checkSpaceForShip(xCoord, yCoord, length, orientation) {
			const startSquare = this.getSquare(xCoord, yCoord);
			let noSpace = false;

			if (orientation === 'horizontal') {
				for (let i = xCoord; i < xCoord + length; i++) {
					if (i > 10) return true;
					this.grid.forEach((square) => {
						if (
							square.x === i &&
							square.y === startSquare.y &&
							square.occupied
						) {
							noSpace = true;
						}
					});
				}
			} else if (orientation === 'vertical') {
				for (let i = yCoord; i < yCoord + length; i++) {
					if (i > 10) return true;
					this.grid.forEach((square) => {
						if (
							square.x === startSquare.x &&
							square.y === i &&
							square.occupied
						) {
							noSpace = true;
						}
					});
				}
			}
			return noSpace;
		},

		addShip(xCoord, yCoord, orientation, shipType) {
			const startSquare = this.getSquare(xCoord, yCoord);
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

			if (startSquare.occupied) return false;

			const noSpace = this.checkSpaceForShip(
				xCoord,
				yCoord,
				length,
				orientation
			);
			if (noSpace) return false;

			// Build ship
			const newShip = Ship(length);
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
			return true;
		},

		randomFleetPlacement() {
			this.randomShipPlacement('Patrol Boat');
			this.randomShipPlacement('Submarine');
			this.randomShipPlacement('Destroyer');
			this.randomShipPlacement('Battleship');
			this.randomShipPlacement('Carrier');
		},

		randomShipPlacement(shipType) {
			let shipBuilt = false;

			while (!shipBuilt) {
				let orientation;
				const orientationNumber = Math.floor(Math.random() * 2) + 1;
				const xCoord = Math.floor(Math.random() * 10) + 1;
				const yCoord = Math.floor(Math.random() * 10) + 1;

				if (orientationNumber === 1) {
					orientation = 'horizontal';
				} else {
					orientation = 'vertical';
				}

				shipBuilt = this.addShip(xCoord, yCoord, orientation, shipType);
			}
		},

		getSquare(xCoord, yCoord) {
			return this.grid.find(
				(square) => square.x === xCoord && square.y === yCoord
			);
		},

		receiveAttack(xCoord, yCoord) {
			const square = this.grid.find((sq) => sq.x === xCoord && sq.y === yCoord);

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
