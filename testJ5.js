var transitions = {
  a: [[["0","1"],"b=1","c=1"]],
  b: [[["0","1"],"d=1"],[["0", "2"]],[["2", "1"]]],
  c: [[["0","1"],"d=1"]],
  d: [[["0","1"],"b=1"],[["0","1"],"c=1"]],
  initial_context: " \"a\" = 0, \"b\" = 0, \"c\" = 0, \"d\" = 0"};

var auto = [2,3,2,2];
var overBox = false;
var locked = false;
var texte = "click"
const reducer = (x, y) => x + " and " +  y

function setup() {
  createCanvas(900, 800);
}


 function draw(){

   background(200);

   for (var i=0, c=auto.length ; i<c;i++){
     automate(auto[i], 140+i*230,140,30,30);
   }
   var k = 1, n=1;

   for (var id in transitions){
     if (id!= "initial_context"){
       //la variable e1 permet de savoir si c'est le premier arc sortant de e1 ou non;
       //On initialise à -1 car le premier est forcément la première transition sortante
       var e1 = -1;
       for (var i=0, c=transitions[id].length; i<c; i++){
         var curTrans = transitions[id][i];
         if (curTrans[0][0]==e1){
           k+=1;
         }
         else{
           k=1;
         }

         drawArc(parseInt(curTrans[0][0]), parseInt(curTrans[0][1]),n,k);



           var x = 155+(n-1)*230, y= 140+(4-parseInt(curTrans[0][0]))*50-(parseInt(curTrans[0][1])-parseInt(curTrans[0][0]))*25, h = 2+(parseInt(curTrans[0][1])-parseInt(curTrans[0][0]))*50;
           overBox = (dist(mouseX, mouseY, x+8,y-h/2-8) < 50);


           try{texte =  transitions[id][i].slice(1).reduce(reducer);}
           catch{

           }


           if(!locked) {
             fill(100);
             afficheTrans(texte, parseInt(curTrans[0][0]), parseInt(curTrans[0][1]),n,k);

           }
           else {

             fill(100);
             overBox = false;
           }




         e1=curTrans[0][0];


       }
     }
     n+=1;
     k=1;
   }
}

function automate(n,x1,y1,x2,y2){
    for (var i=0; i<n; i++){
      noFill();
      ellipse(x1,y1+(5-i-1)*50,x2,y2);
    }
    fill(100);
    rect((x1-x2), (y1-y2+(5-n)*50), 2*y2, 110+(n-2)*50, 20, 20, 20);
}

function afficheTrans(texte, e1, e2, a, k){

  var x = 155+(a-1)*230, y= 140+(4-e1)*50-(e2-e1)*25, h = 2+(e2-e1)*50;

  if(dist(mouseX, mouseY, x+8,y-h/2-8) < 50) {

    fill(100);
    noStroke();
     text(texte,x+8,y-h/2-8);

}

}

function mousePressed() {
  if(overBox) {
    locked = true;
    fill(100);
  } else {
    locked = false;
    fill(100);
  }


}

function mouseReleased() {
  locked = false;
}

//Pour dessiner l'arc en passant de l'état e1 à l'état e2.
//La variable a contient le numéro de l'automate concerné.
//L'entier k représente le numéro de cette transition sur l'automate (si ce n'est
//pas la seule transition allant de e1 à e2, il ne faut pas la superposer aux autres).
function drawArc(e1,e2,a,k){
  var x = 155+(a-1)*230, y= 140+(4-e1)*50-(e2-e1)*25, h = 2+(e2-e1)*50;
  if (k==1){
    if (e2>=e1){
      fill(100);
      arc(x,y,50+(e2-e1)*30,h, 3 * PI / 2,  PI / 2, OPEN);
      line(x,y-h/2, x+8,y-h/2-8);
      line(x,y-h/2, x+8,y-h/2+8);


    }
    else {
      fill(100);
      arc(x-30,y, 50+(e1-e2)*30, h, 3 * PI / 2,  PI / 2, OPEN);
      line(x-38,y-h/2-9, x-30,y-h/2-1);
      line(x-38,y-h/2+7, x-30,y-h/2-1);
    }
  }
  else if (k==2){
    if (e2<e1){
      fill(100);
      arc(x,y,50+(e1-e2)*30,h, PI / 2, 3* PI / 2, OPEN);
      line(x,y-h/2, x+8,y-h/2-8);
      line(x,y-h/2, x+8,y-h/2+8);
    }
    else {
      fill(100);
      arc(x-30,y, 50+(e2-e1)*30, h,  PI / 2,  3*PI / 2, OPEN);
      line(x-38,y-h/2-9, x-30,y-h/2-1);
      line(x-38,y-h/2+7, x-30,y-h/2-1);
    }
  }


}
