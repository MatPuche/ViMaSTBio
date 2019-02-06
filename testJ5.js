function setup() {
  createCanvas(720, 400);
}
 function draw(){
   rect(30, 30, 80, 200);
   ellipse(71, 70, 40, 40);
   ellipse(71, 130, 40, 40);
   ellipse(71, 190, 40, 40);
   noFill();
   arc(100, 95, 100, 50, 3 * PI / 2,  PI / 2, OPEN);
 }
