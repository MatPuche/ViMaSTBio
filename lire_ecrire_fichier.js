document.getElementById('file').onchange = function(){

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

      //Pour les afficher sur la page
      var d = document.createElement('div');
      d.appendChild(document.createTextNode(lines[line]));
      document.body.appendChild(d);

      //Pour les stocker dans la variable auto, on récupère les états possibles
      var nbre_etats = (lines[line].match(/\b[0-9]+\b/g)).length;
      auto.push(nbre_etats);
      line+=1;
    }

    //on saute les lignes inutiles
    rien = document.createElement('br');
    document.body.appendChild(rien);
    alert(auto);

  //
  //   //On initialise le dictionnaire à un dictionnaire vide; remplacer str par lines[line]
  //   var str = '"b" 0 -> 1 when "d"=1'
  //   var transitions = {} //le dictionnaire
  //
  //   var trans = [] // la liste représentant la transition courante
  //
  //   for (var i = 0, c = auto.length; i < c; i++){
  //     trans.push("$") // on initialise la transition à [$, ..., $] (un $ pour chaque automate)
  //       }
  //
  //   var words = str.split('when') // liste à deux éléments, le premier est la transition de l'automate considéré et le deuxième (éventuellement vide) les conditions sur les autres automates
  //   k = words[0][1].charCodeAt(0) - 97 // on récupère l'indice de l'automate considéré (0 pour a, 1 pour b...)
  //
  //
  //
  //   trans[k] = [words[0][4], words[0][9]] // la transition de l'automate considéré
  //   var word = words[1].split('and') // liste éventuellement vide dont chaque élément est une condition
  //
  //   for (var j = 0, c = word.length; j < c; j++){ // pour chaque condition
  //     var letter = word[j][2].charCodeAt(0) - 97 // on récupère l'indice de l'automate apparaissant dans la condition
  //     trans[letter] = word[j][5] // on récupère la condtion en elle-même (le 1 de b = 1)
  //   }
  //
  //   try {
  //     var test = transitions[words[0][1]].length
  //     var newTrans = [transitions[words[0][1]]].concat([trans]) // words[0][1] est la lettre de l'automate considéré
  // }
  //
  // catch(error) {
  //   var newTrans = [trans]
  // }
  //
  //   transitions[words[0][1]] = newTrans
  //
  //
  //   console.log(transitions)

    //le dictionnaire qui stocke les différentes transitions possibles pour chaque automate
    var transitions = {}

    for (var i=0, c=auto.length; i<c; i++){
      line+=1;
      var trans = [] // la liste représentant toutes les transitions de l'automate auto
      while (lines[line].length > 1){

        //Pour afficher sur la page
        var d = document.createElement('div');
        d.appendChild(document.createTextNode(lines[line]));
        document.body.appendChild(d);

        //Pour ajouter la transition à la liste des transitions
        var curTrans = []; // la liste représentant la transition en cours d'analyse

        // On coupe d'abord la chaîne en deux :
        //le premier élément est la transition de l'automate considéré
        //le deuxième élement (éventuellement vide)contient les conditions sur les autres automates
        var words = lines[line].split('when');
        var test = /"([a-z])" ([0-9]) -> ([0-9])/.exec(words[0]);
        var auto = RegExp.$1;
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
      transitions[auto]=trans;

      rien = document.createElement('br');
      document.body.appendChild(rien);
    }

  };

  reader.readAsText(file);
}
