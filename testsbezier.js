var xx, yy;

var transitions = {
  a: [[["0","1"],"b=1","c=1"],[["1","0"],"XXXXX"]],
  b: [[["2","1"],"d=1"], [["2","1"],"c=1"], [["2", "1"]],[["3","1"],"d=1"], [["2","1"],"d=1"]],
  c: [[["1","0"],"d=1"]],
  d: [[["1","0"],"b=1"],[["1","0"],"c=1"]],
  initial_context: " \"a\" = 0, \"b\" = 0, \"c\" = 0, \"d\" = 0",
  nbre_arcs: 10};

var auto = [2,4,2,2];


// oscar

var overBox = false;
var locked = false;
var texte;
const reducer = (x, y) => x + " and " +  y;

var coordonnees = [];
for (i=0; i<transitions['nbre_arcs']; i++){
  coordonnees.push([0,0]);
}

function setup() {
  createCanvas(900, 800);
}


var dragged = false, first = true;


function draw(){


  //background(200);  // oscar

  //Fisrt, we draw automatons.
  for (var i=0, c=auto.length ; i<c;i++){
    automate(auto[i], 140+i*230,140,30,30);
  }

  //Then, we draw arrows that represent transitions of each automata
  var k = 1, n=1, num_arc=0;
  for (var id in transitions){
    if (id!= "initial_context"){
      // the variable e1 enables to know if it is the first arrow coming out of auto or not;
      //It takes the value of the outgoing state of the precedent drawn arrow and we will check each time if
      //the outgoing state of the next transition is identic or not
      // We initialize to -1 because the first one is necessarily the first outgoing transition
      var e1 = -1;

      for (var i=0, c=transitions[id].length; i<c; i++){

        var curTrans = transitions[id][i];
        if (curTrans[0][0]==e1){
          k+=1;
        }
        else{
          k=1;
        }

        drawArc(parseInt(curTrans[0][0]), parseInt(curTrans[0][1]), n, k, num_arc, coordonnees, first);
    //    num_arc+=1;

        // oscar
        var x = 155+(n-1)*230;
        var y = 140+(4-parseInt(curTrans[0][0]))*50-(parseInt(curTrans[0][1])-parseInt(curTrans[0][0]))*25;
        var h = 2+(parseInt(curTrans[0][1])-parseInt(curTrans[0][0]))*50;
        overBox = (dist(mouseX, mouseY, x+8,y-h/2-8) < 50);

        try{texte =  curTrans.slice(1).reduce(reducer);}
        catch{texte = "r"}


        if(!locked) {
          // fill(200);
          //afficheTrans(texte, parseInt(curTrans[0][0]), parseInt(curTrans[0][1]),n,k);
          afficheTransBezier(texte, parseInt(curTrans[0][0]), parseInt(curTrans[0][1]), n, k, num_arc, coordonnees, first);
          //num_arc+=1;


        }

        else {
      //    noFill;
          overBox = false;
        }
      //

      num_arc+=1;

        e1=curTrans[0][0];
      }

    }
    n+=1;
    k=1;
  }
  first = false;
}



//To enable arrows to be displaced
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
      fill(255);
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

  if (dist(mouseX, mouseY, x+8,y-h/2-8) < 50) {
    fill(255, 0, 0); //rouge
    //noStroke();
     text(texte,x+(e2-e1)*50, y);
}

}


function afficheTransBezier(texte, e1,e2,a,k,num_arc, coordonnees, first){

  var x = 155+(a-1)*230;
  var y= 140+(4-e1)*50-(e2-e1)*25;
  var h = 2+(e2-e1)*50;
  var x1, x2, x3, x4,y1, y2, y3, y4;

   fill(255, 0, 0); //rouge

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


  }


  if (k%2==0){

    if (e2<e1){
      x1 = x4 = x;
      y1 = y+26+(e1-e2-1)*25;
      y4 = y-26-(e1-e2-1)*25;
    //  noFill();
      xx = bezierPoint(x1, coordonnees[num_arc][0], coordonnees[num_arc][0], x4, 1/2);
      yy = bezierPoint(y1, coordonnees[num_arc][1]+(e1-e2-1)*25+20,  coordonnees[num_arc][1]-(e1-e2-1)*25-20, y4, 1/2);
      if (dist(mouseX, mouseY, xx, yy) < 50) {
      text(texte, xx, yy);}
      }
    else {
      x1 = x4 = x-30;
      y1 =  y+24+(e2-e1-1)*25;
      y4 =  y-26-(e2-e1-1)*25;
    //  noFill();
      xx = bezierPoint(x1, coordonnees[num_arc][0]-30, coordonnees[num_arc][0]-30, x4, 1/2);
      yy = bezierPoint(y1, coordonnees[num_arc][1]+(e2-e1-1)*25+20,  coordonnees[num_arc][1]-(e2-e1-1)*25-20, y4, 1/2);
      if (dist(mouseX, mouseY, xx, yy) < 50) {
      text(texte, xx, yy);}
     }
  }

  else {

    if (e2>=e1){
      x1 = x4 = x;
      y1 = y+26+(e2-e1-1)*25;
      y4 =  y-26-(e2-e1-1)*25;
    //  noFill();
      xx = bezierPoint(x1, coordonnees[num_arc][0], coordonnees[num_arc][0], x4, 1/2);
      yy = bezierPoint(y1, coordonnees[num_arc][1]+(e2-e1-1)*25+20,  coordonnees[num_arc][1]-(e2-e1-1)*25-20, y4, 1/2);
      if (dist(mouseX, mouseY, xx, yy) < 50){
      text(texte, xx, yy);}
      }
    else {
      x1 = x4 = x-30;
      x2 = x3 = x-55-50*(k+1)/2-(e2-e1-1)*15;
      y1 = y+24+(e1-e2-1)*25;
      y4 = y-26-(e1-e2-1)*25;
    //  noFill();
      xx = bezierPoint(x1, coordonnees[num_arc][0]-30, coordonnees[num_arc][0]-30, x4, 1/2);
      yy = bezierPoint(y1, coordonnees[num_arc][1]+(e1-e2-1)*25+20,  coordonnees[num_arc][1]-(e1-e2-1)*25-20, y4, 1/2);
      if (dist(mouseX, mouseY, xx, yy) < 50){
      text(texte, xx, yy);}
      }
  }


  }



//function drawArc draw arrows with parameters :
//e1 : the outgoing state ; e2 : the incoming state ; a : the number of the automata
//k : the number of the arrow of this automata ; num_arc : the number of the arrow in total (to allow the displacement)
//coordonnees : array containing the coordinates of each arrow ; first : boolean that indicates if it's the first time arrows are
//drawn (to create divs if it the case)
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
