var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;



/******************
Code by Vamoss
Original code link:
https://www.openprocessing.org/sketch/697891

Author links:
http://vamoss.com.br
http://twitter.com/vamoss
http://github.com/vamoss
******************/

const textToWrite = "a   chunk   of   my   adrenaline";
const SEGMENTS = 90;

//auto start variables
let centerX, centerY, fontSize, INNER_RADIUS, RADIUS_VARIATION;

function setup() {
    let myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('myZone');
    fill(250);
    centerX = windowWidth / 2;
    centerY = windowHeight / 1.8;

    let screenPct = min(height, width) / 1200;
    fontSize = screenPct * 120;
    INNER_RADIUS = screenPct * 300;
    RADIUS_VARIATION = screenPct * 200;

    textFont('Helvetica');
    textSize(fontSize);
}

//code adapted from @GoToLoop
//generates a circular noise with perfect looping
//https://forum.processing.org/one/topic/how-to-make-perlin-noise-loop.html
function pointForIndex(pct) {
    const NOISE_SCALE = 1.5;
    let angle = pct * TWO_PI;
    let cosAngle = cos(angle);
    let sinAngle = sin(angle);
    let time = frameCount / 80;
    let noiseValue = noise(NOISE_SCALE * cosAngle + NOISE_SCALE, NOISE_SCALE * sinAngle + NOISE_SCALE, time);
    let radius = INNER_RADIUS + RADIUS_VARIATION * noiseValue;
    return {
        x: radius * cosAngle + centerX,
        y: radius * sinAngle + centerY
    };
}

function draw() {
    background(4, 27, 70);
    fill(250);
    noStroke();

    //draw sphere
    beginShape();
    for (let i = 0; i < SEGMENTS; i++) {
        let p0 = pointForIndex(i / SEGMENTS);
        vertex(p0.x, p0.y);
    }
    endShape(CLOSE);

    //draw text
    let pct = atan2(mouseY - centerY, mouseX - centerX) / TWO_PI; //follow mouse
    //let pct = 0;//dont follow mouse
    let pixToAngularPct = 1 / ((INNER_RADIUS + RADIUS_VARIATION / 2) * TWO_PI);
    for (var i = 0; i < textToWrite.length; i++) {
        let charWidth = textWidth(textToWrite.charAt(i));
        pct += charWidth / 2 * pixToAngularPct;

        //calculate angle
        let leftP = pointForIndex(pct - 0.01);
        let rightP = pointForIndex(pct + 0.01);
        let angle = atan2(leftP.y - rightP.y, leftP.x - rightP.x) + PI;

        push();
        let p = pointForIndex(pct);
        //apply angle
        translate(p.x, p.y);
        rotate(angle);
        translate(-p.x, -p.y);

        text(textToWrite.charAt(i), p.x + 5 - charWidth / 2, p.y - 40);
        pop();

        pct += charWidth / 2 * pixToAngularPct;
    } //for
}