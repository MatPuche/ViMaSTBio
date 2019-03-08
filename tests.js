var xx, yy;

var transitions = {
  a: [[["0","1"],"b=1","c=1"]],
  b: [[["2","1"],"d=1"], [["2","1"],"c=1"], [["2", "1"]],[["3","1"],"d=1"], [["2","1"],"d=1"]],
  c: [[["1","0"],"d=1"]],
  d: [[["1","0"],"b=1"],[["1","0"],"c=1"]],
  initial_context: " \"a\" = 0, \"b\" = 0, \"c\" = 0, \"d\" = 0",
  nbre_arcs: 9};

var auto = [2,4,2,2];

// oscar
var texte = "click"
const reducer = (x, y) => x + " and " +  y
//


var coordonnees = [];
for (i=0; i<transitions['nbre_arcs']; i++){
  coordonnees.push([0,0]);
}

function setup() {
  createCanvas(900, 800);
}


var dragged = false, first = true;
var pt1 = document.getElementById("1");
var pt2 = document.getElementById("2");


function draw(){


  background(200);  // oscar
  for (var i=0, c=auto.length ; i<c;i++){
    automate(auto[i], 140+i*230,140,30,30);
  }

  var k = 1, n=1, num_arc=0;
  for (var id in transitions){
    if (id!= "initial_context"){
      //la variable e1 permet de savoir si c'est le premier arc sortant de auto ou non;
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
        var overBox = false;
        var locked = false;

        drawArc(parseInt(curTrans[0][0]), parseInt(curTrans[0][1]), n, k, num_arc, coordonnees, first);
        num_arc+=1;

        // oscar
        var x = 155+(n-1)*230;
        var y = 140+(4-parseInt(curTrans[0][0]))*50-(parseInt(curTrans[0][1])-parseInt(curTrans[0][0]))*25;
        var h = 2+(parseInt(curTrans[0][1])-parseInt(curTrans[0][0]))*50;
        overBox = (dist(mouseX, mouseY, x+8,y-h/2-8) < 50);

        try{texte =  curTrans.slice(1).reduce(reducer);}
        catch{texte = "r"}


        if(!locked) {
          fill(200);
          afficheTrans(texte, parseInt(curTrans[0][0]), parseInt(curTrans[0][1]),n,k);

        }

        else {
          //fill(200);
          overBox = false;
        }
      //

        e1=curTrans[0][0];
      }

    }
    n+=1;
    k=1;
  }
  first = false;
}



var xi, xj, yi, yj;

var divs = document.getElementsByClassName('arc');

function move(evt) {
    if (dragged) {
      clear();
      coordonnees[xi][xj] = mouseX+25;
      coordonnees[yi][yj]= mouseY;
    }
}

function stopDrag() {
    dragged = false;
}


document.onmousemove = move;
document.onmouseup = stopDrag;


//Function automate draw automata with paramaters :
//n = number of transitions for this auomata
//x1,y1,x2 and y2 allows to place correctly the automata
function automate(n,x1,y1,x2,y2){
    for (var i=0; i<n; i++){
      ellipse(x1,y1+(5-i-1)*50,x2,y2);
    }
    noFill();
    rect((x1-x2), (y1-y2+(5-n)*50), 2*y2, 110+(n-2)*50, 20, 20, 20);
}

// oscar
function mousePressed() {
  if(overBox) {
    locked = true;
  //  fill(200);
  } else {
    locked = false;
  //  fill(200);
  }


}

function mouseReleased() {
  locked = false;
}

function afficheTrans(texte, e1, e2, a, k){

  var x = 155+(a-1)*230;
  var y= 140+(4-e1)*50-(e2-e1)*25;
  var h = 2+(e2-e1)*50;

  if(dist(mouseX, mouseY, x+8,y-h/2-8) < 50) {
    fill(255, 0, 0); //rouge
    //noStroke();
     text(texte,x+8,y-h/2-8);
}

}
//

function drawArc(e1,e2,a,k,num_arc, coordonnees, first){

  var x = 155+(a-1)*230,
      y= 140+(4-e1)*50-(e2-e1)*25,
      h = 2+(e2-e1)*50, x1, x2, x3, x4,y1, y2, y3, y4;

  if (first){
    first = false;

    if (k%2==0){

      if (e2<e1){
        coordonnees[num_arc][0] = x-30+50*((k+1)/2)+(e1-e2-1)*15;
        coordonnees[num_arc][1] = y;
        }
      else {
        coordonnees[num_arc][0] = x-30-50*((k+1)/2)-(e1-e2-1)*15;
        coordonnees[num_arc][1] = y;
        }
    }


    else {

      if (e2>=e1){
        coordonnees[num_arc][0] = x+50*((k+1)/2)+(e2-e1-1)*15;
        coordonnees[num_arc][1] = y ;
        }

      else {
        coordonnees[num_arc][0] = x-55-50*(k+1)/2-(e2-e1-1)*15+30;
        coordonnees[num_arc][1] = y ;
      }
    }
    var arc_div = document.createElement('div');
    arc_div.className = "arc";
    arc_div.id = num_arc;
    document.body.appendChild(arc_div);
    arc_div.onmousedown = function(evt) {
        dragged = true;
        xi = num_arc; xj = 0;
        yi = num_arc; yj = 1;
    }

  }


  if (k%2==0){

    if (e2<e1){
      x1 = x4 = x;
      y1 = y+26+(e1-e2-1)*25;
      y4 = y-26-(e1-e2-1)*25;
      line(x,y-h/2, x+8,y-h/2-8);
      line(x,y-h/2, x+8,y-h/2+8);
      noFill();
      bezier(x1, y1, coordonnees[num_arc][0], coordonnees[num_arc][1]+(e1-e2-1)*25+20, coordonnees[num_arc][0], coordonnees[num_arc][1]-(e1-e2-1)*25-20, x4, y4);
      xx = bezierPoint(x1, coordonnees[num_arc][0], coordonnees[num_arc][0], x4, 1/2);
      yy = bezierPoint(y1, coordonnees[num_arc][1]+(e1-e2-1)*25+20,  coordonnees[num_arc][1]-(e1-e2-1)*25-20, y4, 1/2);
      }
    else {
      x1 = x4 = x-30;
      y1 =  y+24+(e2-e1-1)*25;
      y4 =  y-26-(e2-e1-1)*25;
      line(x-38,y-h/2-9, x-30,y-h/2-1);
      line(x-38,y-h/2+7, x-30,y-h/2-1);
      noFill();
      bezier(x1, y1, coordonnees[num_arc][0]-30, coordonnees[num_arc][1]+(e2-e1-1)*25+20, coordonnees[num_arc][0]-30,coordonnees[num_arc][1]-(e2-e1-1)*25-20, x4, y4);
      xx = bezierPoint(x1, coordonnees[num_arc][0]-30, coordonnees[num_arc][0]-30, x4, 1/2);
      yy = bezierPoint(y1, coordonnees[num_arc][1]+(e2-e1-1)*25+20,  coordonnees[num_arc][1]-(e2-e1-1)*25-20, y4, 1/2);
     }
  }

  else {

    if (e2>=e1){
      x1 = x4 = x;
      y1 = y+26+(e2-e1-1)*25;
      y4 =  y-26-(e2-e1-1)*25;
      line(x,y-h/2, x+8,y-h/2-8);
      line(x,y-h/2, x+8,y-h/2+8);
      noFill();
      bezier(x1, y1, coordonnees[num_arc][0], coordonnees[num_arc][1]+(e2-e1-1)*25+20, coordonnees[num_arc][0], coordonnees[num_arc][1]-(e2-e1-1)*25-20, x4, y4);
      xx = bezierPoint(x1, coordonnees[num_arc][0], coordonnees[num_arc][0], x4, 1/2);
      yy = bezierPoint(y1, coordonnees[num_arc][1]+(e2-e1-1)*25+20,  coordonnees[num_arc][1]-(e2-e1-1)*25-20, y4, 1/2);
      }
    else {
      x1 = x4 = x-30;
      x2 = x3 = x-55-50*(k+1)/2-(e2-e1-1)*15;
      y1 = y+24+(e1-e2-1)*25;
      y4 = y-26-(e1-e2-1)*25;
      line(x-38,y-h/2-9, x-30,y-h/2-1);
      line(x-38,y-h/2+7, x-30,y-h/2-1);
      noFill();
      bezier(x1, y1, coordonnees[num_arc][0]-30, coordonnees[num_arc][1]+(e1-e2-1)*25+20, coordonnees[num_arc][0]-30,coordonnees[num_arc][1]-(e1-e2-1)*25-20, x4, y4);
      xx = bezierPoint(x1, coordonnees[num_arc][0]-30, coordonnees[num_arc][0]-30, x4, 1/2);
      yy = bezierPoint(y1, coordonnees[num_arc][1]+(e1-e2-1)*25+20,  coordonnees[num_arc][1]-(e1-e2-1)*25-20, y4, 1/2);
      }
  }
  divs[num_arc].style.top = yy + "px";
  divs[num_arc].style.left = xx + "px";
  fill(255);
  ellipse(xx, yy, 5,5);

}
