/* eslint-disable no-undef */
import Gameboard from './gameboard';

let board;

beforeEach(() => {
	board = Gameboard();
});

test('appropriate number of squares in grid', () => {
	expect(board.grid.length).toBe(100);
});

test('addShip works horizontally when given existing coord range', () => {
	board.addShip(4, 4, 'horizontal', 'Submarine');
    expect(board.getSquare(4, 4).shipType).toBe('Submarine');
    expect(board.getSquare(5, 4).shipType).toBe('Submarine');
    expect(board.getSquare(6, 4).shipType).toBe('Submarine');
});

test('addShip works vertically when given existing coord range', () => {
	board.addShip(4, 4, 'vertical', 'Carrier');
    expect(board.getSquare(4, 4).shipType).toBe('Carrier');
    expect(board.getSquare(4, 5).shipType).toBe('Carrier');
    expect(board.getSquare(4, 6).shipType).toBe('Carrier');
    expect(board.getSquare(4, 7).shipType).toBe('Carrier');
    expect(board.getSquare(4, 8).shipType).toBe('Carrier');
});

test('addShip returns false when given nonexistent coord range', () => {
    expect(board.addShip(8, 1, 'horizontal', 'Battleship')).toBe(false);
    expect(board.addShip(6, 10, 'vertical', 'Patrol Boat')).toBe(false);
});

test('addShip returns false when trying to build ship on occupied square', () => {
    board.addShip(4, 4, 'vertical', 'Carrier');
    expect(board.addShip(4, 2, 'vertical', 'Destroyer')).toBe(false);
    expect(board.addShip(3, 6, 'horizontal', 'Patrol Boat')).toBe(false);
});

test('getSquare returns correct cell', () => {
	const square = board.getSquare(7, 8);

	expect(square.x).toBe(7);
	expect(square.y).toBe(8);
});

test('receiveAttack records miss', () => {
    const square = board.getSquare(3, 3);
    board.receiveAttack(3, 3);

    expect(square.hitTaken).toBe('miss');
});

test('receiveAttack records ship hit', () => {
    const square = board.getSquare(2, 9);
    board.addShip(2, 5, 'vertical', 'Carrier');
    board.receiveAttack(2, 9);

    expect(square.hitTaken).toBe('damage');
    expect(square.occupied.hitsTaken).toBe(1);
});

test('checkFleetCondition returns object with fleet status', () => {
    board.addShip(1, 1, 'vertical', 'Patrol Boat');
    board.receiveAttack(1, 1);
    board.receiveAttack(1, 2);
    board.checkFleetCondition();
    
    expect(board.gameLost).toBe(true);
});

// test('checkFleetCondition returns object with fleet status', () => {
//     board.addShip(2, 2, 'horizontal', 'Battleship');
//     board.addShip(3, 9, 'horizontal', 'Submarine');
//     board.addShip(1, 1, 'vertical', 'Patrol Boat');
//     board.addShip(2, 5, 'vertical', 'Destroyer');
//     board.addShip(6, 10, 'horizontal', 'Carrier');
// });