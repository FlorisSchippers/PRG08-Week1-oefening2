/// <reference path="gameobject.ts"/>

class Wheel extends GameObject {

    constructor(div: HTMLElement, x: number, y: number) {
        super("wheel", div, x, y);
    }
}