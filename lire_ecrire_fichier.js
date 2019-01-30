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

    //On compte le nombre d'automates et on stocke leurs différents états dans une matrice
    var auto = [] ;
    while (lines[line].length > 1){
      //On lit les différents automates et les différents états qu'il peuvent prendre

      //Pour les afficher sur la page
      var d = document.createElement('div');
      d.appendChild(document.createTextNode(lines[line]));
      document.body.appendChild(d);

      //Pour les stocker dans la variable auto
      line+=1;
      auto+=1;
    }
    rien = document.createElement('br');
    document.body.appendChild(rien);


    //Pour chacun des automates nous allons lire les différentes transition possibles
    for (var i=0, c=auto.length; i<c; i++){
      line+=1;
      while (lines[line].length > 1){
        var d = document.createElement('div');
        d.appendChild(document.createTextNode(lines[line]));
        document.body.appendChild(d);
        line+=1;
      }
      rien = document.createElement('br');
      document.body.appendChild(rien);
    }
  };

  reader.readAsText(file);
}
