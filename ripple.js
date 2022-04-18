var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

let minSquareSize;
let squareSpacing = 100;
let squareSize;
let distFromRipple;

let ripplex;
let rippley;
let rippleRadius = 0;
let rippleStrength = 50;

let speed = 0.02;

let alph1 = ["0", "1", "*", "**"];
let alph2 = [
    "\\\\\\\\",
    "\\\\\\\\",
    "\\\\\\",
    "+",
    ".",
    "+",
    ":",
    "////",
    "////",
];
let xoff = 0;
let yoff = 0;
let zoff = 0;


// const capturer = new CCapture({
//     framerate: 20,
//     format: "png",
//     name: "zipped_movie",
//     quality: 100,
//     verbose: true,
// });


function setup() {
    let myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('myZone');
    frameRate(20);
    // createCanvas(windowWidth - 200, windowHeight - 100);

    ripplex = width / 2;
    rippley = height / 2;

    rectMode(CENTER);
    noStroke();
    // noLoop();
}

function draw() {
    background(0);
    xoff = 0;
    for (let x = 0; x <= width; x += 20) {
        yoff = 0;
        for (let y = 0; y <= height; y += 20) {
            noiseVal = noise(x, y);
            let flow = noise(xoff, yoff, zoff);
            let index1 = round(map(flow, 0, 1, 0, alph1.length));
            let index2 = round(map(flow, 0, 1, 0, alph2.length));


            distFromRipple = abs(dist(x, y, ripplex, rippley) - rippleRadius);
            let inc = 5;
            if (
                abs(distFromRipple - dist(x, y, ripplex, rippley)) <= rippleStrength
            ) {
                squareSize += inc;
                // fill(255);
                fill(random(100), random(255), random(250), noiseVal * 2500);
                text(alph1[index1], x, y, 50);
            } else {
                // fill(255);
                fill(100, 200, noiseVal * 250);
                text(alph2[index2], x, y, 50);
            }
            yoff += speed;
            squareSize += inc;
        }
        xoff += speed;
    }

    if (mouseIsPressed) {
        rippleRadius = rippleStrength;
        ripplex = mouseX;
        rippley = mouseY;
    }

    zoff += speed / 5;
    rippleRadius += 10;

    // if (frameCount == 60) {
    //     noLoop();
    // }

    // saveFrames("frames/####.png");

    // capturer.capture(p5Canvas.canvas);
    // if (frameCount === 30) {
    //     noLoop();
    //     capturer.stop();
    //     capturer.save();
    // }
}

// function keyPressed() {
//     saveFrames('out', 'png', 1, 25, data => {
//         print(data);
//     });
// }