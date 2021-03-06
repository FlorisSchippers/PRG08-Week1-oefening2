var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameObject = (function () {
    function GameObject(elementname, htmlelement, x, y) {
        this.div = document.createElement(elementname);
        htmlelement.appendChild(this.div);
        this.x = x;
        this.y = y;
        this.draw();
    }
    GameObject.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    return GameObject;
}());
var Wheel = (function (_super) {
    __extends(Wheel, _super);
    function Wheel(div, x, y) {
        _super.call(this, "wheel", div, x, y);
    }
    return Wheel;
}(GameObject));
var Car = (function (_super) {
    __extends(Car, _super);
    function Car() {
        var _this = this;
        var container = document.getElementById("container");
        _super.call(this, "car", container, -145, 220);
        var leftWheel = new Wheel(this.div, 15, 30);
        var rightWheel = new Wheel(this.div, 105, 30);
        this.width = 145;
        this.height = 45;
        this.speed = 3;
        this.braking = false;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        this.move();
    }
    Car.prototype.onKeyDown = function (event) {
        if (event.keyCode == 32) {
            this.braking = true;
        }
    };
    Car.prototype.move = function () {
        if (this.speed <= 0) {
            Game.getInstance().endGame();
        }
        else {
            if (this.braking) {
                if (this.speed > 0) {
                    this.speed -= 0.1;
                }
            }
            if (this.x + 145 >= 492) {
                this.speed = 0;
                Game.getInstance().rock.adjustSpeed(5);
            }
            this.x += this.speed;
            this.draw();
        }
    };
    return Car;
}(GameObject));
var Game = (function () {
    function Game() {
        var _this = this;
        this.car = new Car();
        this.rock = new Rock();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.car.move();
        this.rock.move();
        if (Utils.checkCollision(Car, Rock)) {
            this.endGame();
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    Game.prototype.endGame = function () {
        var carfix = this.car.x + 145;
        var difference = this.rock.x - carfix;
        var score = (500 - difference) * 2;
        if (score >= 1000) {
            document.getElementById("score").innerHTML = "You crashed!";
        }
        else {
            document.getElementById("score").innerHTML = "Score : " + score;
        }
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Rock = (function (_super) {
    __extends(Rock, _super);
    function Rock() {
        var container = document.getElementById("container");
        _super.call(this, "rock", container, 492, 208);
        this.width = 62;
        this.height = 62;
        this.speed = 0;
    }
    Rock.prototype.move = function () {
        this.y += this.speed;
        this.draw();
        if (this.y + 62 >= 600) {
            this.adjustSpeed(0);
        }
    };
    Rock.prototype.adjustSpeed = function (speed) {
        this.speed = speed;
    };
    return Rock;
}(GameObject));
var Utils = (function () {
    function Utils() {
    }
    Utils.checkCollision = function (instance1, instance2) {
        if (instance1.x < instance2.x + instance2.width &&
            instance1.x + instance1.width > instance2.x &&
            instance1.y < instance2.y + instance2.height &&
            instance1.height + instance1.y > instance2.y) {
            return true;
        }
        else {
            return false;
        }
    };
    return Utils;
}());
//# sourceMappingURL=main.js.map