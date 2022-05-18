// size(720,720)
// noStroke()
// background(1,90,170)
// for i in range(5000):
//  x,y=random(720),random(720)
//  r=360-max(abs(x-360),abs(y-360))
//  for i in range(12):r=min(r,dist(x,y,360+245*cos(-i*.52),360+245*sin(-i*.52))-i*5-2)
//  fill(-1,8*exp(-r/70.))
//  circle(x,y,2*r)
let centerY = 580;
// let angles = [random(90), random(90), random(90)];

function setup() {
    createCanvas(720, 720);
    noStroke();
    setAttributes("alpha", false);
    frameRate(1);
    noLoop();
    colorMode(RGB, 200, 200, 300, 255);

}

function draw() {
    let t = frameCount * 0.01;
    randomSeed(2);
    // background('#1572A1');

    for (let i = 0; i < 3000; i++) {
        let x = random(720);
        let y = random(720);
        let r = 360 - max(abs(x - 360), abs(y - 360));
        // for (let j = 0; j < ripples.length; j++) {
        //     r = min(r, dist(x, y, ripples[j].x, ripples[j].y) - ripples[j].lifetime - 2);
        // }

        // for (let j = 0; j < 7; j++) {
        //     let sx = 360 + 250 * cos(-j * 0.2 + t);
        //     let sy = 360 + 250 * sin(-j * 0.2 + t);
        //     let s = 40;
        //     if (x < 360) {
        //         r = min(r, dist(x, y, sx, sy) - s - 2);
        //     } else {
        //         if (sx - s < x && x < sx + s) {
        //             r = min(r, min(abs(sy - s - y), abs(sy + s - y)) - 1);
        //         }
        //         if (sy - s < y && y < sy + s) {
        //             r = min(r, min(abs(sx - s - x), abs(sx + s - x)) - 1);
        //         }
        //     }
        // }

        for (let j = 0; j < 720; j += 5) {
            let s = 100;
            let centerX = 320;
            let theta = j;
            let sx = centerX + s * (2 * cos(theta) + cos(2 * theta));
            let sy = centerY + s * (2 * sin(theta) - sin(2 * theta));

            let rot = random(90);
            let nsx = (sx - centerX) * cos(rot) - (sy - centerY) * sin(rot) + centerX;
            let nsy = (sx - centerX) * sin(rot) + (sy - centerY) * cos(rot) + centerY;

            r = min(r, dist(x, y, nsx - 3, nsy - 3));
        }

        // if (240 < x && x < 480) {
        //     r = min(r, min(abs(240 - x), abs(480 - x)) - 4);
        // }
        // if (240 < y && y < 480) {
        //     r = min(r, min(abs(240 - y), abs(480 - y)) - 4);
        // }

        r = min(r, abs(360 - x));

        let c = color('#FFF9F9');
        c.setAlpha(8 * exp(-r / 60.0));
        fill(c);
        ellipse(x, y, r * 2);
    }
}