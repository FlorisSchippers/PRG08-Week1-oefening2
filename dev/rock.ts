/// <reference path="gameobject.ts"/>

class Rock extends GameObject {

    public width: number;
    public height: number;
    private speed: number;

    constructor() {
        let container: HTMLElement = document.getElementById("container");
        super("rock", container, 492, 208);
        
        this.width = 62;
        this.height = 62;
        this.speed = 0;
    }

    public move(): void {
        this.y += this.speed;
        this.draw();

        if (this.y + 62 >= 600) {
            this.adjustSpeed(0);
        }
    }

    public adjustSpeed(speed: number) {
        this.speed = speed;
    }
}