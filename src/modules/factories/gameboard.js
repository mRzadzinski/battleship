/* eslint-disable no-loop-func */
import Ship from './ship';

function Gameboard() {
	let grid;

	const createGrid = () => {
		const gridArray = [];
		for (let i = 0; i < 10; i++) {
			for (let j = 0; j < 10; j++) {
				gridArray.push({
					x: i,
					y: j,
					occupied: false,
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

		addShip(xCoord, yCoord, orientation, shipType) {
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
				if (
					square.x === xCoord &&
					square.y === yCoord &&
					square.occupied === false
				) {
					startSquare = square;
				}
			});

            // Check if there is space to create ship
            let canBuild = true;

            if (orientation === 'horizontal') {
                for (let i = xCoord; i < xCoord + length; i++) {
                    this.grid.forEach(square => {
                        if (square.x === i && square.y === startSquare.y && square.occupied) {
                            canBuild = false;
                        }
                    });
                }
            } else if (orientation === 'vertical') {
                for (let i = yCoord; i < yCoord + length; i++) {
                
                }
            }

            
		},

		receiveAttack(xCoord, yCoord) {
			this.grid.forEach((square) => {
				if (square.x === xCoord && square.y === yCoord) {
					if (square.occupied === false && square.hitTaken === false) {
						square.hitTaken = 'miss';
					} else if (square.occupied === true && square.hitTaken === false) {
						square.hitTaken = 'damage';
					}
				}
			});
		},

		// checkFleetCondition() {

		// }
	};
}

// const board = Gameboard();
// console.log(board)

export default Gameboard;
