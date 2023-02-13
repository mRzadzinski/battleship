import Player from "./factories/player";
import populateDomBoard from "./DOM";

const player = Player();
const ai = Player();

ai.gameboard.randomFleetPlacement();

console.log(player.gameboard.grid)
// player.gameboard.addShip(1, 1, 'horizontal', 'Carrier');
// player.gameboard.addShip(3, 2, 'horizontal', 'Patrol Boat');
// player.gameboard.addShip(5, 4, 'horizontal', 'Submarine');
// player.gameboard.addShip(2, 6, 'horizontal', 'Destroyer');
// player.gameboard.addShip(7, 6, 'vertical', 'Battleship');
player.gameboard.randomFleetPlacement();

populateDomBoard('player', player.gameboard.grid);