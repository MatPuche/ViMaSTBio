var x1; //starting vertex
var x2; //ending vertex
var r = 16; //vertex radius


function setup() {
    createCanvas(640, 480);
    x1 = createVector(random(0, width/2), random(0, height/2)); //random position to the upper left
    x2 = createVector(random(width/2, width), random(height/2, height)); //random position to the lower right
}

function draw() {
    background(200);
    stroke(0);
    var offset = r;
    ellipse(x1.x, x1.y, r, r); //starting vertex
    ellipse(x2.x, x2.y, r, r); //ending vertex
    line(x1.x, x1.y, x2.x, x2.y); //draw a line beetween the vertices

    // this code is to make the arrow point
    push() //start new drawing state
    var angle = atan2(x1.y - x2.y, x1.x - x2.x); //gets the angle of the line
    translate(x2.x, x2.y); //translates to the destination vertex
    rotate(angle); //rotates the arrow point
    triangle(-offset*0.5, offset, offset*0.5, offset, 0, -offset/2); //draws the arrow point as a triangle
    pop();
}
