function setup() {
  createCanvas(720, 400);
}
 function draw(){
   automate(3,70,70,40,40);
   automate(3,300,70,40,40);
   automate(3,530, 70,40,40);

   // arc(90, 100, 90, 68, 3 * PI / 2,  PI / 2, OPEN);
   // ellipse(70,130,85,205);
   //arrow(200,200,300,300);
   //rect(30, 30, 80, 200);
}

function automate(n,x1,y1,x2,y2){
  if (n==3){
    push();
    ellipse(x1,y1,x2,y2);
    ellipse(x1, y1+60, x2, y2);
    ellipse(x1, y1+120, x2, y2);
    noFill();
    rect((x1-x2), (y1-y2), 2*y2, 200, 20, 20, 20);
    pop();
  }
}

function arrow( x1,  y1,  x2,  y2) {
  ellipse(x1, y1, x2, y2);
  push();
  translate(x2, y2);
  var a = atan2(x1-x2, y2-y1);
  rotate(a);
  line(0, 0, -10, -10);
  line(0, 0, 10, -10);
  pop();
}
