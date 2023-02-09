/* eslint-disable no-undef */
import Ship from './ship';

let newShip;
beforeEach(() => {
	newShip = Ship(5);
});

test('increase hitsTaken by 1', () => {
	newShip.takeHit();
	expect(newShip.hitsTaken).toBe(1);

	newShip.takeHit();
	expect(newShip.hitsTaken).toBe(2);
});

test('ship still alive after receiving non-fatal hits', () => {
	for (let i = 0; i < 4; i++) {
		newShip.takeHit();
	}

	expect(newShip.isSunk).toBe(false);
});

test('sunk ship when reaching threshold', () => {
	for (let i = 0; i < 5; i++) {
		newShip.takeHit();
	}
	expect(newShip.isSunk).toBe(true);
});
