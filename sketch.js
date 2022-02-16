var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;


// week 2 bouncing balls
// let numBalls = 8;
// let spring = 0.05;
// let gravity = 0.03;
// let friction = -0.9;
// let balls = [];
// function setup() {
//     let myCanvas = createCanvas(windowWidth, windowHeight);
//     myCanvas.parent('myZone');
//     for (let i = 0; i < numBalls; i++) {
//         balls[i] = new Ball(
//             random(width),
//             random(height),
//             random(100, 200),
//             i,
//             balls
//         );
//     }
//     noStroke();
//     fill(255, 204);
// }

// function draw() {
//     background(4, 27, 70);
//     balls.forEach(ball => {
//         ball.collide();
//         ball.move();
//         ball.display();
//     });
// }

// class Ball {
//     constructor(xin, yin, din, idin, oin) {
//         this.x = xin;
//         this.y = yin;
//         this.vx = 0;
//         this.vy = 0;
//         this.diameter = din;
//         this.id = idin;
//         this.others = oin;
//     }

//     collide() {
//         for (let i = this.id + 1; i < numBalls; i++) {
//             // console.log(others[i]);
//             let dx = this.others[i].x - this.x;
//             let dy = this.others[i].y - this.y;
//             let distance = sqrt(dx * dx + dy * dy);
//             let minDist = this.others[i].diameter / 2 + this.diameter / 2;
//             //   console.log(distance);
//             //console.log(minDist);
//             if (distance < minDist) {
//                 //console.log("2");
//                 let angle = atan2(dy, dx);
//                 let targetX = this.x + cos(angle) * minDist;
//                 let targetY = this.y + sin(angle) * minDist;
//                 let ax = (targetX - this.others[i].x) * spring;
//                 let ay = (targetY - this.others[i].y) * spring;
//                 this.vx -= ax;
//                 this.vy -= ay;
//                 this.others[i].vx += ax;
//                 this.others[i].vy += ay;
//             }
//         }
//     }

//     move() {
//         this.vy += gravity;
//         this.x += this.vx;
//         this.y += this.vy;
//         if (this.x + this.diameter / 2 > width) {
//             this.x = width - this.diameter / 2;
//             this.vx *= friction;
//         } else if (this.x - this.diameter / 2 < 0) {
//             this.x = this.diameter / 2;
//             this.vx *= friction;
//         }
//         if (this.y + this.diameter / 2 > height) {
//             this.y = height - this.diameter / 2;
//             this.vy *= friction;
//         } else if (this.y - this.diameter / 2 < 0) {
//             this.y = this.diameter / 2;
//             this.vy *= friction;
//         }
//     }

//     display() {
//         ellipse(this.x, this.y, this.diameter, this.diameter);
//     }
// }




// week 3 snowflakes p5.js 
// https: //p5js.org/examples/simulate-snowflakes.html

let snowflakes = []; // array to hold snowflake objects

function setup() {
    let myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('myZone');
    fill(255);
    noStroke();
}

function draw() {
    background(4, 27, 70);
    let t = frameCount / 200; // update time

    // create a random number of snowflakes each frame
    for (let i = 0; i < random(2); i++) {
        snowflakes.push(new snowflake()); // append snowflake object
    }

    // loop through snowflakes with a for..of loop
    for (let flake of snowflakes) {
        flake.update(t); // update snowflake position
        flake.display(); // draw snowflake
    }
}

// snowflake class
function snowflake() {
    // initialize coordinates
    this.posX = 0;
    this.posY = random(-100, 0);
    this.initialangle = random(0, 2 * PI);
    this.size = random(1, 4);

    // radius of snowflake spiral
    // chosen so the snowflakes are uniformly spread out in area
    this.radius = sqrt(random(pow(width / 2, 2)));

    this.update = function(time) {
        // x position follows a circle
        let w = 0.6; // angular speed
        let angle = w * time + this.initialangle;
        this.posX = width / 2 + this.radius * sin(angle);

        // different size snowflakes fall at slightly different y speeds
        this.posY += pow(this.size, 0.9);

        // delete snowflake if past end of screen
        if (this.posY > height) {
            let index = snowflakes.indexOf(this);
            snowflakes.splice(index, 1);
        }
    };

    this.display = function() {
        ellipse(this.posX, this.posY, this.size);
    };
}