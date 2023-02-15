import Player from './factories/player';
import shipTypes from './shipTypes';
import {
	startBtn,
	randomBtn,
	populateBoardHTML,
	resetGridHTML,
	addFleetDeploymentListener,
} from './DOM';

// Initialize players
const player = Player();
const ai = Player();

// AI random fleet deployment
ai.gameboard.randomFleetPlacement();

// Player random fleet deployment
randomBtn.addEventListener('click', () => {
	player.gameboard.clearGrid();
	resetGridHTML('player');
	player.gameboard.randomFleetPlacement();
	populateBoardHTML('player', player.gameboard.grid);
});

// Player manual fleet deployment
let orientation = 'horizontal';

addFleetDeploymentListener(orientation, player.gameboard);

// Toggle ship orientation
document.addEventListener('keypress', (e) => {
	if (e.code === 'KeyR') {
		if (orientation === 'horizontal') {
			orientation = 'vertical';
		} else if (orientation === 'vertical') {
			orientation = 'horizontal';
		}
        addFleetDeploymentListener(orientation, player.gameboard);
	}
});

// player.gameboard.addShip(1, 1, 'horizontal', 'Carrier');
// player.gameboard.addShip(3, 2, 'horizontal', 'Patrol Boat');
// player.gameboard.addShip(5, 4, 'horizontal', 'Submarine');
// player.gameboard.addShip(2, 6, 'horizontal', 'Destroyer');
// player.gameboard.addShip(7, 6, 'vertical', 'Battleship');
