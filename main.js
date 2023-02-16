// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

// function to generate random color

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}


//les coordonnées verticales et horizontales où la balle débutera sur l'écran. 
//Ceci peut se trouver entre 0 (coin à gauche en haut) et la valeur de la hauteur et de la largeur de la fenêtre du navigateur (coin en bas à droite).
function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX; // pour la vitesse horizontale et verticale de la balle 
    this.velY = velY; // pour la vitesse horizontale et verticale de la balle 
    this.color = color; // pour la couleur de la balle 
    this.size = size; // pour la taille de la balle 
}

Ball.prototype.draw = function () {
    ctx.beginPath(); //  beginPath() pour spécifier que nous voulons dessiner une forme sur le papier.
    ctx.fillStyle = this.color; //  fillStyle pour définir de quelle couleur nous voulons que la forme soit — nous lui attribuons la valeur de la propriété color de notre balle.
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); //nous utilisons la méthode arc() pour tracer une forme en arc sur le papier. Les positions x et y du centre de l'arc — nous spécifions donc les propriétés x et y de notre balle.
    ctx.fill(); //mettre fin au dessin que nous avons commencé avec beginPath(), et remplir la surface délimitée avec la couleur que nous avions spécifiée plus tôt avec fillStyle.
}

Ball.prototype.update = function () { // vérifie si la balle a atteint le rebord du canvas. 
    if ((this.x + this.size) >= width) { //  Si c'est le cas, nous inversons la polarité de la vitesse appropriée pour faire bouger la balle dans le sens opposé.
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    //Ajoute la valeur velX à la coordonnée x et la valeur velY à la coordonnée y — la balle est en effet mise en mouvement chaque fois que cette méthode est invoquée.
    this.x += this.velX;
    this.y += this.velY;
}

Ball.prototype.collisionDetect = function () {
    for (let j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
            }
        }
    }
}

let balls = [];

while (balls.length < 25) {
    let size = random(10, 20);
    let ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
        size
    );

    balls.push(ball);
}

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }

    requestAnimationFrame(loop);
}

loop();