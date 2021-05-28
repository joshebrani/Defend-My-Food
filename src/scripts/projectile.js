class Projectile {
    constructor(x, y) {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.x = x;
        this.y = y;
        this.width = 15;
        this.height = 15;
        this.power = 25;
        this.speed = 7;
         this.img = document.getElementById("kame");
    }

    shootNE() {
        this.y -= this.speed;
        this.x += this.speed;
    }
    shootSE() {
        this.y += this.speed;
        this.x += this.speed;
    }
    shootNW() {
        this.y -= this.speed;
        this.x -= this.speed;
    }
    shootSW() {
        this.y += this.speed;
        this.x -= this.speed;
    }


    draw() {
        this.ctx.shadowColor = "aqua";
        this.ctx.shadowBlur = 15;
        this.ctx.drawImage(this.img, this.x-20, this.y+20, this.width+20, this.height+20);
    }
}

export default Projectile