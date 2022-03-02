let cx, cy;
let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;
const radiusSphere = 200;

function setup() {
    let myCanvas = createCanvas(windowWidth, windowHeight + 200, WEBGL);
    myCanvas.parent('myZone');
    noStroke();
    fill(250);


    let radius = min(width, height) / 2;
    secondsRadius = radius * 0.71;
    minutesRadius = radius * 0.6;
    hoursRadius = radius * 0.5;
    clockDiameter = radius * 1.7;

    cx = windowWidth / 2;
    cy = windowHeight / 2;
}

function draw() {
    let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
    // let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
    // let h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

    background(0)

    noStroke();
    // console.log((cx + cos(s) * secondsRadius) * 0.001)
    // hourHue = map(hour(), 0, 12, 2, 500)
    minuteHue = map(minute(), 0, 60, 2, 600)
        // secondHue = map(second(), 0, 60, 2, 204)
    console.log(minuteHue);


    // console.log(m);



    directionalLight(minuteHue, minuteHue, minuteHue, (cx + cos(s) * secondsRadius) * 0.001, (cy + sin(s) * secondsRadius) * -0.009, -1);
    // translate(3 * 200, hour() * 50 - windowHeight / 4, 0);
    // sphere(240);

    translate(0, 6 * 50 - windowHeight / 4, 0);
    sphere(500);

    // directionalLight(204, 204, 1, -dirX, -dirY, -1);
    // translate(2 * 150, 0, 0);
    // sphere(150);

    // directionalLight(2, 2, 204, dirX, dirY, 1);
    // translate(2.3 * 150, 0, 0);
    // sphere(150);






}