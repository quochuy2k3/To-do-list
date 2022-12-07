const canvas = document.querySelector('#canvas');

const c = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

function snow() {
    this.radius = Math.random() * 3;
    this.x = Math.floor(Math.random() * canvas.width);
    this.y = -this.radius;
    this.color = ' #4f8dcad9';
    this.speed = {
        x: Math.random() * 1 - 1,
        y: Math.random() * 1 + 1,
    };
}

snow.prototype.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, -10, Math.PI * 2);
    c.shadowColor = this.color;
    c.shadowBlur = 10;
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
}

snow.prototype.update = function() {
    this.x += this.speed.x;
    this.y += this.speed.y;

    if (this.y >= canvas.height) {
        this.speed.y = 0;
    }

    this.draw();
}

const arr = [];

function init() {
    arr.push(new snow());
}

function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    arr.forEach(function(item) {
        item.update();
    })
    if (arr.length > 4000) {
        arr.splice(0, 1);
    }
    init();
    window.requestAnimationFrame(animate);
}

animate();