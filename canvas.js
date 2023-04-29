var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

var mouse = {
    x: undefined,
    y: undefined,
}

function handleMouseMove(event) {
    mouse.x = event.x;
    mouse.y = event.y;
}

window.addEventListener("mousemove", handleMouseMove);

function Circle(x, y, dx, dy, radius, colorIndex) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.colorIndex = colorIndex;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x,this.y,this.radius, Math.PI * 2, false);
        c.strokeStyle =`blue`;
        c.stroke();
        switch (this.colorIndex % 3) {
            case 0:
                c.fillStyle = "Tomato";
                break;
            case 1:
                c.fillStyle = "rgba(0,155,155,1)";
                break;
            case 2:
                c.fillStyle = "black";
                break;
        }
        c.fill();
    }

    this.update = function () {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // Interactivity
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
             mouse.y - this.y < 50 && mouse.y - this.y > -50 && this.radius < 40) {
            this.radius += 1;
        } else if(this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}

var circleArray = [];

for(let i = 0; i < 200; i++) {
    let radius = Math.random() * 20;

    let x = Math.random() * (window.innerWidth - radius * 2) + radius;
    let y = Math.random() * (window.innerHeight - radius * 2) + radius;
    let dx = (Math.random() - .5);
    let dy = (Math.random() - .5);

    circleArray.push(new Circle(x, y, dx, dy, radius, i));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);

    for(let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

animate();

