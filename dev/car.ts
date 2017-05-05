/// <reference path="wheel.ts"/>
/// <reference path="gameobject.ts"/>

class Car extends GameObject {

    private speed: number;
    private game: Game;
    private braking: boolean;

    constructor(game: Game) {
        let container: HTMLElement = document.getElementById("container");
        super("car", container, -145, 220);
        let leftWheel = new Wheel(this.div, 15, 30);
        let rightWheel = new Wheel(this.div, 105, 30);

        this.speed = 3;
        this.game = game;
        this.braking = false;

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));

        this.move();
    }

    private onKeyDown(event: KeyboardEvent): void {
        if (event.keyCode == 32) {
            this.braking = true;
        }
    }

    public move(): void {
        if (this.speed <= 0) {
            this.game.endGame();
        } else {
            if (this.braking) {
                if (this.speed > 0) {
                    this.speed -= 0.1;
                }
            }
            if (this.x + 145 >= 492) {
                this.speed = 0;
                this.game.rock.adjustSpeed(5);
            }
            this.x += this.speed;
            this.draw();
        }
    }
}