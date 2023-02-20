import Player from './factories/player';
import {
	startBtn,
	randomBtn,
	restartBtn,
	populateBoardHTML,
	resetGridHTML,
	addFleetDeploymentListener,
	addGameplayListeners,
	removeGridListeners,
} from './DOM';

// Initialize players
const player = Player();
const ai = Player();

// Player random fleet deployment
randomBtn.addEventListener('click', () => {
	player.gameboard.clearGrid();
	resetGridHTML('player');
	removeGridListeners();
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

	if (e.code === 'KeyF') {
		player.randomAttack(ai.gameboard);
		ai.aiAttack(player.gameboard);
		populateBoardHTML('player', player.gameboard.grid);
		populateBoardHTML('ai', ai.gameboard.grid);
	}
});

startBtn.addEventListener('click', () => {
	// Check if fleet is deployed
	const fleetDeployed = [];
	player.gameboard.grid.forEach((sq) => {
		if (sq.occupied) fleetDeployed.push(true);
	});
	// If not, deploy randomly
	if (fleetDeployed.length !== 17) {
		randomBtn.click();
	}

	// AI random fleet deployment
	ai.gameboard.randomFleetPlacement();
	addGameplayListeners(ai, player);
});

restartBtn.addEventListener('click', () => {
	player.gameboard.clearGrid();
	ai.gameboard.clearGrid();

	addFleetDeploymentListener(orientation, player.gameboard);
});
