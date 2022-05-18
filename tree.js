/*Concieved and Coded by Helene Federici
recoded for P5.js by Chris Coleman and then focused as an example */
let theShader;
let shaderBg;

var tree; //a graphics buffer to draw the tree into

var paths = []; //an array for all the growing branches

function setup() {
    let myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('myZone');
    tree = createGraphics(windowWidth, windowHeight); //decide how big the image is to hold the tree drawing
    ellipseMode(CENTER);
    smooth();
    frameRate(80); //makes tree grow slowly 
    paths.push(new Pathfinder());
    positionX = random(0, width / 2);
}

function draw() {
    //background(200, 200, 220);
    background(10);
    image(tree, positionX, 0, width, height); //here we draw the tree to the screen every frame
    tree.noStroke(); //tree has no stroke

    for (var i = 0; i < paths.length; i++) { //start drawing the tree by going thru all the branches

        var loc = paths[i].location.copy(); //grab a copy of their location
        var diam = paths[i].diameter; //grab a copy of the branch diameter
        count = random(0, 100);
        if (count > 30) {
            tree.fill(random(10, 100), 170 - (diam * 2.8), 0); //color of the tree
            tree.rect(loc.x, loc.y, diam, diam); //here we draw the next ellipse for each branch into the tree buffer
            // tree.ellipse(loc.x, loc.y, diam, diam); //here we draw the next ellipse for each branch into the tree buffer
            paths[i].update(); //update the position and direction for the growth of each branch
        } else {
            tree.fill(random(10, 100), 170 - (diam * 2.8), 0); //color of the tree
            tree.ellipse(loc.x, loc.y, diam, diam); //here we draw the next ellipse for each branch into the tree buffer
            paths[i].update(); //update the position and direction for the growth of each branch
        }

    }
}


function Pathfinder(parent) { //the class for making branches - note that it allows for another branch object to be passed in...
    if (parent === undefined) { //if this is the first branch, then use the following settings - note that this is how you deal with different constructors
        this.location = createVector(400, 800); //placemnet of the first branch, or trunk
        this.velocity = createVector(0, -1); //direction for the trunk, here -1 in the y axis = up
        this.diameter = random(20, 100); //size of trunk
    } else {
        this.location = parent.location.copy(); //for a new branch, copy in the last position, the end of the branch
        this.velocity = parent.velocity.copy(); //for a new branch, copy the direction the old branch was going
        var area = PI * sq(parent.diameter / 2); //find the area of the branch cross section
        var newDiam = sqrt(area / 2 / PI) * 2; //divide it by two and calculate the diameter of this new branch
        this.diameter = newDiam; //save the new diameter
        parent.diameter = newDiam; //the parent branch keeps on growing, but with the new diameter as well
    }
    this.update = function() { //update the growth of the tree
        if (this.diameter > 2) { //this indicates when the tree should stop growing, the smallest branch diameter
            this.location.add(this.velocity); //update the location of the end of the branch
            var bump = new createVector(random(-.87, .87), random(-.87, .87)); //this determines how straight or curly the growth is, here it is +-13% variation
            bump.mult(0.1); //this reduces that by ten so now it is +-1.3% variation
            this.velocity.add(bump); //apply that to the velocity for the next growth
            this.velocity.normalize(); //make sure our vector is normalized to be between 0-1
            if (random(0, 1) < .01) { //this is the probability that the tree splits, here it is 1% chance
                paths.push(new Pathfinder(this)); //if it is time for a split, make a new path
            }
        }
    }
}