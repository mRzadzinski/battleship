function Ship(length) {
	return {
		length,
		hitsTaken: 0,
		isSunk: false,

		takeHit() {
			this.hitsTaken += 1;
			this.checkHP();
		},

		checkHP() {
			if (this.hitsTaken >= this.length) {
				this.isSunk = true;
			}
		},
	};
}

export default Ship;
