import Ship from './ship';

test('increase hitsTaken by 1', () => {
	const newShip = new Ship(5);
	newShip.takeHit();
	expect(newShip.hitsTaken).toBe(1);
});

test('sunk ship when reaching threshold', () => {
	const newShip = new Ship(5);
	for (let i = 0; i < 5; i++) {
		newShip.takeHit();
	}
	expect(newShip.isSunk).toBe(true);
});
