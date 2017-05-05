/// <reference path="car.ts"/>

class Game {

    private car: Car;
    public rock: Rock;

    constructor() {
        this.car = new Car(this);
        this.rock = new Rock();
        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop() {
        this.car.move();
        this.rock.move();
        requestAnimationFrame(() => this.gameLoop());
    }

    public endGame() {
        let carfix = this.car.x + 145; // Bug?
        let difference: number = this.rock.x - carfix;
        let score = (500 - difference) * 2;
        if (score >= 1000) {
            document.getElementById("score").innerHTML = "You crashed!";
        } else {
            document.getElementById("score").innerHTML = "Score : " + score;
        }
    }
}


// load
window.addEventListener("load", function () {
    new Game();
});