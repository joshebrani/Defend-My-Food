const CELLSIZE = 50;

class Naruto {
    constructor(verticalPosition) {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.x = 0;
        this.y = 0;
        this.width = CELLSIZE;
        this.height = CELLSIZE;
        this.speed = Math.random() * .4 + .7
        this.movement = this.speed;
        this.health = 100;
        this.maxHealth = this.health;

    }

    update() {
        this.x += this.movement;
    }

    draw() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = "orange";
        this.ctx.font = "10px Arial";
        this.ctx.fillText(Math.floor(this.health), this.x + 15, this.height + 30);
        this.ctx.fillText("Naruto", this.x + 15, this.y + 30);

    }
}

export default Naruto