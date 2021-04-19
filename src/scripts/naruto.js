const CELLSIZE = 50;
import { killCount } from './game';
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
        if (killCount < 8) {
            this.speed = 1;
            this.health = Math.floor(Math.random() * 50) + 25;
        }
        if (killCount >= 8 && killCount < 15) {
            this.speed = 1;
            this.health = Math.floor(Math.random() * 300) + 50;
        }
        if (killCount >= 15 && killCount < 30) {
            this.speed = 1;
            this.health = Math.floor(Math.random() * 900) + 30;
        }
        if (killCount >= 30 && killCount < 50) {
            this.speed = 1;
            this.health = Math.floor(Math.random() * 1200) + 900;
        } 
        if (killCount >= 50 && killCount < 90) {
            this.speed = 1;
            this.health = Math.floor(Math.random() * 1500) + 1200;
        } 
        if (killCount >= 90 && killCount < 150) {
          this.speed = 2;
          this.health = Math.floor(Math.random() * 2000) + 2500;
        } 
        if (killCount >= 150) {
            this.speed = 3;
            this.health = Math.floor(Math.random() * 10000) + 5000;
        } 
        this.movement = this.speed;
        // this.health = Math.floor(Math.random() * 400) + 50;
        this.maxHealth = this.health;
        this.img = document.getElementById("naruto1");

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
         this.ctx.shadowColor = "red";
         this.ctx.shadowBlur = 15;
        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        // this.ctx.fillStyle = "black";
        // this.ctx.fillRect(this.x, this.y, this.width, this.height);
        // this.ctx.fillStyle = "gray";
        // this.ctx.fillRect(this.x, this.y, this.width, this.height-35);
        this.ctx.fillStyle = "blue";
        this.ctx.font = "10px Arial";
        this.ctx.fillText(Math.floor(this.health)+"HP", this.x + 5, this.y + 60);
        // this.ctx.fillText("Naruto", this.x + 12, this.y + 30);
        // this.ctx.drawImage(this.runRight, this.frameX*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

export default Naruto