const CELLSIZE = 50;

// const runRight = new Image();
// runRight.src = '../src/images/run_1.png';

class Naruto {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.x = 0;
        this.y = 0;
        this.width = 49;
        this.height = 49;
        this.speed = 1
        this.movement = this.speed;
        this.health = Math.floor(Math.random() * 400) + 50;
        this.maxHealth = this.health;
        // this.runRight = runRight;
        // this.frameX = 0;
        // this.frameY = 0;
        // this.minFrame = 0;
        // this.maxFrame = 4;
        // this.spriteWidth = 90;
        // this.spriteHeight = 117

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

        // if (this.frameX < this.maxFrame) this.frameX++;
        // else this.frameX = this.minFrame;
    
    }

    draw() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = "gray";
        this.ctx.fillRect(this.x, this.y, this.width, this.height-35);
        this.ctx.fillStyle = "orange";
        this.ctx.font = "10px Arial";
        this.ctx.fillText(Math.floor(this.health)+"HP", this.x + 12, this.y + 10);
        this.ctx.fillText("Naruto", this.x + 12, this.y + 30);
        // this.ctx.drawImage(this.runRight, this.frameX*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

export default Naruto