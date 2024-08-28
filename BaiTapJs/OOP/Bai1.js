function Car(make, speed) {
	this.make = make;
	this.speed = speed;
	this.accelerate = function () {
		this.speed += 10;
		console.log(this.speed);
	};
	this.brake = function brake() {
		this.speed -= 5;
		console.log(this.speed);
	};
}

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);
car1.accelerate();
car1.brake();
car1.accelerate();
console.log('===========================');
car2.accelerate();
car2.brake();
car2.accelerate();
