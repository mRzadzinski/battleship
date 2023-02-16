import Player from './factories/player';
import {
	startBtn,
	randomBtn,
	populateBoardHTML,
	resetGridHTML,
	addFleetDeploymentListener,
	addGameplayListeners,
} from './DOM';

// Initialize players
const player = Player();
const ai = Player();

// AI random fleet deployment
ai.gameboard.randomFleetPlacement();

// ai.gameboard.grid[0].occupied = true;
// ai.gameboard.grid[0].hitTaken = true;

// ai.gameboard.grid[10].occupied = false;
// ai.gameboard.grid[10].hitTaken = true;

// ai.gameboard.grid[2].occupied = true;
// ai.gameboard.grid[2].hitTaken = false;

// ai.gameboard.grid[3].occupied = false;
// ai.gameboard.grid[3].hitTaken = false;

populateBoardHTML('ai', ai.gameboard.grid);

console.log (ai.gameboard.grid)

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
		resetGridHTML('player');
		populateBoardHTML('player', player.gameboard.grid);
        addFleetDeploymentListener(orientation, player.gameboard);
	}
});

startBtn.addEventListener('click', () => {
	// Check if fleet is deployed
	const fleetDeployed = [];
	player.gameboard.grid.forEach(sq => {
		if (sq.occupied) fleetDeployed.push(true);
	});	
	// If not, deploy randomly
	if (fleetDeployed.length !== 17) {
		randomBtn.click();
	}

	addGameplayListeners(ai, player);
});

startBtn.click();