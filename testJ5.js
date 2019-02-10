function setup() {
  createCanvas(900, 800);
}

 function draw(){
   automate(4,140,140,30,30);
   automate(2,370,140,30,30);
   automate(4,600, 140,30,30);
   automate(5,830,140,30,30);

   drawArc(0,3,1,1);
   // ellipse(70,130,85,205);
   //arrow(200,200,300,300);
   //rect(30, 30, 80, 200);
}

function automate(n,x1,y1,x2,y2){
    for (var i=0; i<n; i++){
      ellipse(x1,y1+(5-i-1)*50,x2,y2);
    }
    noFill();
    rect((x1-x2), (y1-y2+(5-n)*50), 2*y2, 110+(n-2)*50, 20, 20, 20);
}

//Pour dessiner l'arc en passant de l'état e1 à l'état e2.
//La variable a contient le numéro de l'automate concerné.
//L'entier k représente le numéro de cette transition sur l'automate (si ce n'est
//pas la première transition, il ne faut pas la superposer aux autres).
function drawArc(e1,e2,a,k){
  if (k==1){
    arc(155+(a-1)*230, 317+(e2-e1-1)*25-100, 90, 52+(e2-e1-1)*50, 3 * PI / 2,  PI / 2, OPEN);
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
