
document.getElementById('anFile').onchange = function(){

  var file = this.files[0];
  var reader = new FileReader();
  reader.onload = function(progressEvent){
	resetAutomata();
    // By lines
    var lines = this.result.split('\n');

    var line=0;
    while (lines[line].length > 1){

      // To store them in the auto variable, we retrieve the possible states
      var nbre_etats = (lines[line].match(/\b[0-9]+\b/g)).length;
      auto.push(nbre_etats);
      line+=1;

      var temp = [];
      for (var i = 0; i < nbre_etats-1; i++) {
    	   temp.push(Math.floor(100*(i+1)/(nbre_etats))/100);
      }
      statesThresholds.push(temp);
    }


    // We count the number of arcs that will have to be drawn for its transitions
    var nbre_arcs = 0;

    //We iterate on each automaton
    for (var i=0, c=auto.length; i<c; i++){
      line+=1;
      var trans = []; // the list representing all the transitions of the automaton auto
      while (lines[line].length > 1){

        // to add the transition to the list of transition
        var curTrans = []; // the list representing the transition being analyzed

        // We first cut the string in two parts:
        // the first element is the transition of the automaton considered
        // the second element (possibly empty) contains the conditions on the other automata
        var words = lines[line].split('when');

        var test = /"G([0-9]*)" ([0-9]) -> ([0-9])/.exec(words[0]);
        var autom = RegExp.$1;

        curTrans.push([RegExp.$2,RegExp.$3]);
        // We then cut according to the number of conditions on the other automata, if there are any
        if (words[1]){
          var cond = words[1].split('and');
          for(var k=0, l=cond.length; k<l;k++){
            /"(G[0-9]*)"=([0-9]+)/.exec(cond[k]);
             curTrans.push(RegExp.$1 + "=" + RegExp.$2);
          }
        }
        // add the currently analyzed transition to the list of automatons transitions
        trans.push(curTrans);
        // there is one more arc to draw for this transition
        nbre_arcs+=1;
        line+=1;
      }
      // add the list of transitions of the automat autom to the dictionary of transitions
      transitions[autom]=trans;

    }

    //we store the initial context
    line +=1;
    /initial_context (.+)/.exec(lines[line]);
    transitions['initial_context'] = (RegExp.$1);
    //and finally the total number of arrows
    transitions['nbre_arcs'] = nbre_arcs;
    console.log(transitions);
    console.log(auto);
    console.log("CLICK");

    paintAuto(transitions, auto);
  };

  reader.readAsText(file);
}
