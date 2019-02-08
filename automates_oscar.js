document.getElementById('file').onchange = function(){

  var file = this.files[0];
  var reader = new FileReader();
  reader.onload = function(progressEvent){
    // By lines
    var lines = this.result.split('\n');

    var etatsAutomates = []; // liste des nombres d'états des automates: l'indice courant est la position dans l'alphabet de l'automate (en supposant qu'ils soient écrits dans l'ordre alphabétique), la valeur est le nombre de ses états
    var transitions = {}; // dictionnaire des transitions: les clés sont les lettres de l'automate, les valeurs les transitions possibles
    var transitionCourante = [];
    var lettreCourante = "";

    for(var i = 0, c = lines.length; i < c; i++){ // pour chacune des lignes


      if (/^([a-z]+) \[([0-9,]*[0-9])\]/i.test(lines[i])){ // on récupère le nombre d'états des automates

        etatsAutomates.push(RegExp.$2.split(",").length);
        transitions[RegExp.$1] = [];
      }

      else if (/^([a-z]+) ([0-9]+) - ([0-9]+)/i.test(lines[i].split("when")[0])){ // on récupère les transitions


        for (var j = 0, d = etatsAutomates.length; j < d; j ++){ // on initialise la transition courante à autant de $ qu'il y a d'automates
          transitionCourante[j] = "$";
        }


        lettreCourante = RegExp.$1;
        transitionCourante[RegExp.$1.charCodeAt(0) - 97] = new Array(RegExp.$2, RegExp.$3); // on convertit la lettre de l'automate en sa place dans l'alphabet (a devient 0)


        if (lines[i].split("when").length > 1){ // dans ce cas il y a des conditions

          var and = lines[i].split("when")[1].split("and"); // liste de ces conditions

          for (var k = 0, e = and.length; k < e; k++){ // pour chacune de ces conditions

              if (/^ ([a-z]+)=([0-9]+)/i.test(and[k])){
                transitionCourante[RegExp.$1.charCodeAt(0) - 97] = RegExp.$2;
              }

          }

        }

        transitions[lettreCourante].push(transitionCourante);
        transitionCourante = [];



      }

      else if (/initial_context ((?:[a-z]+ = [0-9], )+[a-z]+ = [0-9])/i.test(lines[i])) { // on récupère enfin les conditions initiales

          var initial = RegExp.$1.split(",");
          transitions[0] = [];

          for (var l = 0, f = initial.length; l < f; l++){

            if (/([a-z]+) = ([0-9]+)/.test(initial[l])){

              transitions[0][RegExp.$1.charCodeAt(0) - 97] = RegExp.$2;

            }

          }

      }





    }

    console.log(transitions)



  };

  reader.readAsText(file);
}

//test pouèr oscar
