import Gameboard from "./gameboard";

function Player() {
    return {
        gameboard: Gameboard(),
        gameWon: false,

        attack(xCoord, yCoord, enemyBoard) {
            enemyBoard.receiveAttack(xCoord, yCoord);
            if (enemyBoard.gameLost) {
                this.gameWon = true;
            }
        }
    }
}