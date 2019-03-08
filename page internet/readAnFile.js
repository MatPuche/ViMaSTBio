document.getElementById('anFile').onchange = function(){

  var file = this.files[0];
  var reader = new FileReader();
  reader.onload = function(progressEvent){
    // By lines
    var lines = this.result.split('\n');

    //On retire les première lignes inutiles
    var rien, line=0;
    while (lines[line].length > 1){
      line+=1;
    }
    line+=1;

    //On compte le nombre d'automates et on stocke le nombre d'états qu'ils peuvent chacun prendre
    var auto = [];
    while (lines[line].length > 1){

      //Pour les stocker dans la variable auto, on récupère les états possibles
      var nbre_etats = (lines[line].match(/\b[0-9]+\b/g)).length;
      auto.push(nbre_etats);
      line+=1;
    }

    //le dictionnaire qui stocke les différentes transitions possibles pour chaque automate
    var transitions = {}

    //On itère sur chaque automate
    for (var i=0, c=auto.length; i<c; i++){
      line+=1;
      var trans = [] // la liste représentant toutes les transitions de l'automate auto
      while (lines[line].length > 1){

        //Pour ajouter la transition à la liste des transitions
        var curTrans = []; // la liste représentant la transition en cours d'analyse

        // On coupe d'abord la chaîne en deux :
        //le premier élément est la transition de l'automate considéré
        //le deuxième élement (éventuellement vide)contient les conditions sur les autres automates
        var words = lines[line].split('when');
        var test = /"([a-z])" ([0-9]) -> ([0-9])/.exec(words[0]);
        var autom = RegExp.$1;
        curTrans.push([RegExp.$2,RegExp.$3]);
        //On découpe ensuite selon le nombre de conditions sur les autres automates, si il y en a
        if (words[1]){
          var cond = words[1] .split('and');
          for(var k=0, l=cond.length; k<l;k++){
             /"([a-z])"=([0-9]+)/.exec(cond[k]);
             curTrans.push(RegExp.$1 + "=" + RegExp.$2);
          }
        }
        //on ajoute la transition actuellement analysée à la liste des transitions de l'automate auto
        trans.push(curTrans);
        line+=1;
      }
      //on ajoute la liste des transitions de l'automate auto au dictionnaire des transitions
      transitions[autom]=trans;

    }

    //on récupère le contexte initial
    line +=1;
    /initial_context (.+)/.exec(lines[line]);
    transitions['initial_context'] = (RegExp.$1);

  };

  reader.readAsText(file);
}
