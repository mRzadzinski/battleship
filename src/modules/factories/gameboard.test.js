/* eslint-disable no-undef */
import Gameboard from './gameboard';

test('Attack received properly', () => {
	const board = Gameboard();
    let damagedSquare;
	board.receiveAttack(5, 7);

    board.grid.forEach(square => {
        if (square.x === 5 && square.y === 7) {
            damagedSquare = square;
        }
    });

    expect(damagedSquare.hitTaken).toBe('miss' || 'damage');
});


test('Check fleet condition works properly', () => {
    
});