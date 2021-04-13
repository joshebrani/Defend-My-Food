const CELLSIZE = 50;

class Naruto {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.x = 0;
        this.y = 0;
        this.width = CELLSIZE;
        this.height = CELLSIZE;
        this.speed = 1
        this.movement = this.speed;
        this.health = Math.floor(Math.random() * 400) + 50;
        this.maxHealth = this.health;

    }

    move() {
        // this.y += 1;
        if (this.x >= 0 && this.x <= CELLSIZE*15 && this.y === 0) {
            this.x += this.movement
        }

        if (this.x === CELLSIZE*15 && this.y >= 0  && this.y <= CELLSIZE*11) {
            this.y += this.movement
        }

        if (this.y === CELLSIZE*11 && this.x <= CELLSIZE*15  && this.x >= 0) {
            this.x -= this.movement
        }

        if (this.y <= CELLSIZE*11 && this.y >= CELLSIZE*3  && this.x === 0) {
            this.y -= this.movement
        }

        if (this.y === CELLSIZE*3 && this.x >= 0  && this.x <= CELLSIZE*12) {
            this.x += this.movement
        }

        if (this.y >= CELLSIZE*3 && this.y <= CELLSIZE*8  && this.x === CELLSIZE*12) {
            this.y += this.movement
        }

        if (this.y === CELLSIZE*8 && this.x <= CELLSIZE*12  && this.x >= CELLSIZE*6) {
            this.x -= this.movement
        }
        

        
        

    }

    draw() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = "orange";
        this.ctx.font = "10px Arial";
        this.ctx.fillText(Math.floor(this.health)+"HP", this.x + 12, this.y + 10);
        this.ctx.fillText("Naruto", this.x + 12, this.y + 30);

    }
}

export default Naruto