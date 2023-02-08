// MAKE FACTORY Function

class Ship {
	constructor(length) {
		this.length = length;
		this.isSunk = false;
		this.hitsTaken = 0;
	}

	takeHit() {
		this.hitsTaken += 1;
        this.checkHP();
	}

    checkHP() {
		if (this.hitsTaken >= this.length) {
			this.isSunk = true;
		}
    }
}

export default Ship;