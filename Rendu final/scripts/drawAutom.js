//this script enable to draw automatas and its transitions


var etatsEnCours = [0,0,0,0,0,0,0,0,1,0];



function paintAuto(transitions, auto) {

  var defaultAutoSketch = function(p) {


      // array that contains coordinates of each arrow
      var coordonnees = [];
      for (i = 0; i < transitions['nbre_arcs']; i++) {
        coordonnees.push([0, 0]);
      }
      var first = true;

    // Creates and adds the canvas element
    function addCanvas(canvasWidth, canvasHeight) {
      var canvas;

      // Create the canvas
			canvas = p.createCanvas(400*auto.length, 350);

      return canvas;
    }

    // Initial setup
    p.setup = function() {

      // Add the canvas element
      addCanvas();

    };

    // Now we draw
    if (selectedGenes.length == auto.length){

      p.draw = function(){
        p.clear();
        // Fisrt, we draw automatons.
        for (var i=0, c=auto.length ; i<c;i++){
          if (selectedGenes[i]==true){
            automate(auto[i], etatsEnCours[i], 130+i*180,40,18,18, p,(i+1));
          }
        }

        // Then, we draw arrows that represent transitions of each automaton
        var num_arc = 0;
        for (var id in transitions) {
          var k=1;
          if (id != "initial_context") {



            // the variable e1 enables to know if it is the first arrow coming
    			  // out of auto or not;
            // It takes the value of the outgoing state of the precedent drawn
    			  // arrow and we will check each time if
            // the outgoing state of the next transition is identic or not
            // We initialize to -1 because the first one is necessarily the
    			  // first outgoing transition

              var e1 = -1;
              const reducer = (x, y) => x + " and " +  y;


              for (var i = 0, c = transitions[id].length; i < c; i++) {

                var curTrans = transitions[id][i];
                if (curTrans[0][0] == e1) {
                  k += 1;
                } else {
                  k = 1;
                }

                var x = 155+(id-1)*230;
                var y = 140+(4-parseInt(curTrans[0][0]))*50-(parseInt(curTrans[0][1])-parseInt(curTrans[0][0]))*25;
                var h = 2+(parseInt(curTrans[0][1])-parseInt(curTrans[0][0]))*50;



                try{texte =  curTrans.slice(1).reduce(reducer);}
                catch(e){texte = ""};
                drawArc(texte, parseInt(curTrans[0][0]), parseInt(curTrans[0][1]), id, k, num_arc, coordonnees, first, p);
                num_arc+=1;
                e1 = curTrans[0][0];
              }
            }
        }
        first = false;
       };
     }

   };

var autoSketch = new p5(defaultAutoSketch, "sketch-auto");
}


// To enable arrows to be displaced
var xi, xj, yi, yj;

var divs = document.getElementsByClassName('arc');



// Function automate draw automata with paramaters :
// n = number of transitions for this auomata
// enCours = numero of the state actualemente activated
// x1,y1,x2 and y2 allows to place correctly the automata
function automate(n, enCours, x1, y1, x2, y2, p, a) {
  for (var i = 0; i < n; i++) {
    if (enCours==i){
      p.fill(237, 0, 0);
    }
    else{
      p.fill(255);
    }
    p.ellipse(x1+0.5, y1+14+ (5 - i - 1) * 50, x2, y2);
  }
  p.noFill();
  p.rect((x1 - x2), (y1 - y2 + (5 - n) * 50), 2 * y2, 110 + (n - 2) * 50, 20, 20, 20);
  p.fill(0);
  p.text("G"+a, x1-7, y1+275 + (n - 2) * 50);
}


// function drawArc draw arrows with parameters :
// e1 : the outgoing state ; e2 : the incoming state ; a : the number of the
// automata
// k : the number of the arrow of this automata ; num_arc : the number of the
// arrow in total (to allow the displacement)
// coordonnees : array containing the coordinates of each arrow ; first :
// boolean that indicates if it's the first time arrows are
// drawn (to create divs if it the case)
function drawArc(texte, e1, e2, a, k, num_arc, coordonnees, first, p) {

  var x = 140 + (a - 1) * 180,
    y = 55 + (4 - e1) * 50 - (e2 - e1) * 25,
    h = 2 + (e2 - e1) * 50,
    x1, x2, x3, x4, y1, y2, y3, y4;

  if (first) {
    first = false;

    if (k % 2 == 0) {

      if (e2 < e1) {
        coordonnees[num_arc][0] = x - 30 + 50 * ((k + 1) / 2) + (e1 - e2 - 1) * 15;
        coordonnees[num_arc][1] = y;
      } else {
        coordonnees[num_arc][0] = x - 30 - 50 * ((k + 1) / 2) - (e1 - e2 - 1) * 15;
        coordonnees[num_arc][1] = y;
      }
    } else {

      if (e2 >= e1) {
        coordonnees[num_arc][0] = x + 50 * ((k + 1) / 2) + (e2 - e1 - 1) * 15;
        coordonnees[num_arc][1] = y;
      } else {
        coordonnees[num_arc][0] = x - 55 - 50 * (k + 1) / 2 - (e2 - e1 - 1) * 15 + 30;
        coordonnees[num_arc][1] = y;
      }
    }
    var arc_div = document.createElement('div');
    arc_div.className = "arc";
    arc_div.id = num_arc;

    document.getElementById("sketch-auto").appendChild(arc_div);
    arc_div.onmousedown = function(evt) {
      traine = true;
      xi = num_arc;
      xj = 0;
      yi = num_arc;
      yj = 1;
    }

  }

  if (selectedGenes[a-1]){
    if (k % 2 == 0) {

      if (e2 < e1) {
        x1 = x4 = x;
        y1 = y + 26 + (e1 - e2 - 1) * 25;
        y4 = y - 26 - (e1 - e2 - 1) * 25;
        p.line(x, y - h / 2, x + 8, y - h / 2 - 8);
        p.line(x, y - h / 2, x + 8, y - h / 2 + 8);
        p.noFill();
        p.bezier(x1, y1, coordonnees[num_arc][0], coordonnees[num_arc][1] + (e1 - e2 - 1) * 25 + 20, coordonnees[num_arc][0], coordonnees[num_arc][1] - (e1 - e2 - 1) * 25 - 20, x4, y4);
        xx = p.bezierPoint(x1, coordonnees[num_arc][0], coordonnees[num_arc][0], x4, 1 / 2);
        yy = p.bezierPoint(y1, coordonnees[num_arc][1] + (e1 - e2 - 1) * 25 + 20, coordonnees[num_arc][1] - (e1 - e2 - 1) * 25 - 20, y4, 1 / 2);
        p.fill(0, 0, 0);
        p.textSize(15);
        p.text(texte, xx, yy + 10);
        p.textSize(10);
      } else {
        x1 = x4 = x - 18;
        y1 = y + 24 + (e2 - e1 - 1) * 25;
        y4 = y - 26 - (e2 - e1 - 1) * 25;
        p.line(x - 26, y - h / 2 - 9, x - 19, y - h / 2 - 1);
        p.line(x - 26, y - h / 2 + 7, x - 19, y - h / 2 - 1);
        p.noFill();
        p.bezier(x1, y1, coordonnees[num_arc][0] - 18, coordonnees[num_arc][1] + (e2 - e1 - 1) * 25 + 20, coordonnees[num_arc][0] - 18, coordonnees[num_arc][1] - (e2 - e1 - 1) * 25 - 20, x4, y4);
        xx = p.bezierPoint(x1, coordonnees[num_arc][0] - 18, coordonnees[num_arc][0] - 18, x4, 1 / 2);
        yy = p.bezierPoint(y1, coordonnees[num_arc][1] + (e2 - e1 - 1) * 25 + 20, coordonnees[num_arc][1] - (e2 - e1 - 1) * 25 - 20, y4, 1 / 2);
        p.fill(0, 0, 0);
        p.textSize(15);
        p.text(texte, xx, yy - 10);
        p.textSize(10);
      }
    } else {

      if (e2 >= e1) {
        x1 = x4 = x;
        y1 = y + 26 + (e2 - e1 - 1) * 25;
        y4 = y - 26 - (e2 - e1 - 1) * 25;
        p.line(x, y - h / 2, x + 7, y - h / 2 - 8);
        p.line(x, y - h / 2, x + 7, y - h / 2 + 8);
        p.noFill();
        p.bezier(x1, y1, coordonnees[num_arc][0], coordonnees[num_arc][1] + (e2 - e1 - 1) * 25 + 20, coordonnees[num_arc][0], coordonnees[num_arc][1] - (e2 - e1 - 1) * 25 - 20, x4, y4);
        xx = p.bezierPoint(x1, coordonnees[num_arc][0], coordonnees[num_arc][0], x4, 1 / 2);
        yy = p.bezierPoint(y1, coordonnees[num_arc][1] + (e2 - e1 - 1) * 25 + 20, coordonnees[num_arc][1] - (e2 - e1 - 1) * 25 - 20, y4, 1 / 2);
        p.fill(0, 0, 0);
        p.textSize(15);
        p.text(texte, xx + 10, yy);
        p.textSize(10);


      } else {
        x1 = x4 = x - 18;
        x2 = x3 = x - 55 - 50 * (k + 1) / 2 - (e2 - e1 - 1) * 15;
        y1 = y + 24 + (e1 - e2 - 1) * 25;
        y4 = y - 26 - (e1 - e2 - 1) * 25;
        p.line(x - 26, y - h / 2 - 9, x - 19, y - h / 2 - 1);
        p.line(x - 26, y - h / 2 + 7, x - 19, y - h / 2 - 1);
        p.noFill();
        p.bezier(x1, y1, coordonnees[num_arc][0] - 18, coordonnees[num_arc][1] + (e1 - e2 - 1) * 25 + 20, coordonnees[num_arc][0] - 18, coordonnees[num_arc][1] - (e1 - e2 - 1) * 25 - 20, x4, y4);
        xx = p.bezierPoint(x1, coordonnees[num_arc][0] - 18, coordonnees[num_arc][0] - 18, x4, 1 / 2);
        yy = p.bezierPoint(y1, coordonnees[num_arc][1] + (e1 - e2 - 1) * 25 + 20, coordonnees[num_arc][1] - (e1 - e2 - 1) * 25 - 20, y4, 1 / 2);
        p.fill(0, 0, 0);
        p.textSize(15);
        p.text(texte, xx - 10, yy);
        p.textSize(10);

      }
    }
    var margeY = document.getElementById("sketch-auto").offsetTop;
    var margeX = document.getElementById("sketch-auto").offsetLeft;
    divs[num_arc].style.top = margeY + yy - 7.5 + "px" ;
    divs[num_arc].style.left = margeX + xx - 7.5 + "px";
    p.fill(255);
    p.ellipse(xx, yy, 5, 5);

    function move(evt) {
      if (traine) {
        p.clear();
        coordonnees[xi][xj] = p.mouseX + 15;
        coordonnees[yi][yj] = p.mouseY;
      }
    }

    function stopTraine() {
      traine = false;
    }


    document.getElementById("sketch-auto").onmousemove = move;
    document.getElementById("sketch-auto").onmouseup = stopTraine;

  }

}
