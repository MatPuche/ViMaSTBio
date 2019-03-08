//Ce script permet la représentation des automates lus dans le fichier

var x = 300;
var y = 200;

var transitions = {
  a: [[["0","1"],"b=1","c=1"]],
  b: [[["0","1"],"d=1"],[["0", "2"]],[["2", "1"]]],
  c: [[["0","1"],"d=1"]],
  d: [[["0","1"],"b=1"],[["0","1"],"c=1"]],
  initial_context: " \"a\" = 0, \"b\" = 0, \"c\" = 0, \"d\" = 0"};

var auto = [2,3,2,2];

var referenceAutom = document.getElementById("automata");



//  function draw(auto, transitions){
//    var dessinerAuto = function(p) {
//
//  		// Creates and adds the canvas element
//  		function addCanvas(canvasWidth, canvasHeight) {
//  			var referenceAutom, maxCanvasWidth, canvas;
//
//  			// Calculate the canvas dimensions
//  			referenceAutom = document.getElementById("automata");
//  			maxCanvasWidth = referenceAutom.clientWidth - 1;
//
//  			if (canvasWidth > maxCanvasWidth) {
//  				canvasHeight = maxCanvasWidth * canvasHeight / canvasWidth;
//  				canvasWidth = maxCanvasWidth;
//  			}
//
//  			// Create the canvas
//  			canvas = p.createCanvas(maxCanvasWidth, 0.7*maxCanvasWidth);
//
//  			// Resize the canvas if necessary
//  			maxCanvasWidth = referenceAutom.clientWidth - 1;
//
//  			if (canvasWidth > maxCanvasWidth) {
//  				p.resizeCanvas(maxCanvasWidth, maxCanvasWidth * canvasHeight
//  						/ canvasWidth, true);
//  			}
//
//  			return canvas;
//  		}
//
//  		// Initial setup
//  		p.setup = function() {
//  			var points, plot;
//
//  			// Add the canvas element
//  			addCanvas(500, 350);
//
//  			// Prepare the points for the plot
//  			points = [];
//
//  			for (var graph = 1; graph < array.length; graph++) {
//  				points.push([]);
//  				for (var gene = 1; gene < array[1].length; gene++) {
//  					points[graph-1].push([]);
//  					for (var pointNb = 0; pointNb < array[1][1].length; pointNb++) {
//  						points[graph - 1][gene - 1].push(new GPoint(
//  								Number(array[graph][0][pointNb]),
//  								Number(array[graph][gene][pointNb])));
//  					}
//  				}
//  			}
//
//  			// Create a new plot and set its position on the screen
//  			plot = new GPlot(p);
//  			plot.setPos(0, 0);
//  			plot.setOuterDim(p.width, p.height);
//
//  			// Add the points
//  			plot.setPoints(points[0][0]);
//  			for (var i = 2; i < array[0].length; i++){
//  				plot.addLayer(array[0][i], points[0][i-1]);
//  			}
//  			plot.activatePointLabels();
//
//  			// Set the plot title and the axis labels
//  			plot.setTitleText("Gene expression");
//  			plot.getXAxis().setAxisLabelText(array[0][0]);
//
//  			// Draw it!
//  			plot.defaultDraw();
//
//  			p.noLoop();
//  		};
//  	};
//
//
//
//
//
//
//
//
//
//    var canvas = document.getElementById("canvasAuto");
//    var context = canvas.getContext('2d');
//    if (mouseIsPressed){
//      x = mouseX;
//      y = mouseY;
//      context.clear();
//    }
//    context.ellipse(x, y, 50, 50, 0, PI, false);
//    context.stroke();
//
//    for (var i=0, c=auto.length ; i<c;i++){
//      automate(auto[i], 140+i*230,140,30,30);
//    }
//    var k = 1, n=1;
//
//    for (var id in transitions){
//      if (id!= "initial_context"){
//        //la variable e1 permet de savoir si c'est le premier arc sortant de auto ou non;
//        //On initialise à -1 car le premier est forcément la première transition sortante
//        var e1 = -1;
//        for (var i=0, c=transitions[id].length; i<c; i++){
//          var curTrans = transitions[id][i];
//          if (curTrans[0][0]==e1){
//            k+=1;
//          }
//          else{
//            k=1;
//          }
//          drawArc(parseInt(curTrans[0][0]), parseInt(curTrans[0][1]),n,k);
//          e1=curTrans[0][0];
//        }
//      }
//      n+=1;
//      k=1;
//    }
// }
//
// function automate(n,x1,y1,x2,y2){
//     for (var i=0; i<n; i++){
//       ellipse(x1,y1+(5-i-1)*50,x2,y2);
//     }
//     noFill();
//     rect((x1-x2), (y1-y2+(5-n)*50), 2*y2, 110+(n-2)*50, 20, 20, 20);
// }
//
// //Pour dessiner l'arc en passant de l'état e1 à l'état e2.
// //La variable a contient le numéro de l'automate concerné.
// //L'entier k représente le numéro de cette transition sur l'automate (si ce n'est
// //pas la seule transition allant de e1 à e2, il ne faut pas la superposer aux autres).
// function drawArc(e1,e2,a,k){
//   var x = 155+(a-1)*230, y= 140+(4-e1)*50-(e2-e1)*25, h = 2+(e2-e1)*50;
//   if (k==1){
//     if (e2>=e1){
//       arc(x,y,50+(e2-e1)*30,h, 3 * PI / 2,  PI / 2, OPEN);
//       line(x,y-h/2, x+8,y-h/2-8);
//       line(x,y-h/2, x+8,y-h/2+8);
//     }
//     else {
//       arc(x-30,y, 50+(e1-e2)*30, h, 3 * PI / 2,  PI / 2, OPEN);
//       line(x-38,y-h/2-9, x-30,y-h/2-1);
//       line(x-38,y-h/2+7, x-30,y-h/2-1);
//     }
//   }
//   else if (k==2){
//     if (e2<e1){
//       arc(x,y,50+(e1-e2)*30,h, PI / 2, 3* PI / 2, OPEN);
//       line(x,y-h/2, x+8,y-h/2-8);
//       line(x,y-h/2, x+8,y-h/2+8);
//     }
//     else {
//       arc(x-30,y, 50+(e2-e1)*30, h,  PI / 2,  3*PI / 2, OPEN);
//       line(x-38,y-h/2-9, x-30,y-h/2-1);
//       line(x-38,y-h/2+7, x-30,y-h/2-1);
//     }
//   }
//
//
// }
