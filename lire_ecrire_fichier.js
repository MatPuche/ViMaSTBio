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

    var nbre_auto = 0; //On compte le nombre d'automates
    while (lines[line].length > 1){
      //On lit les différents automates et les différents états qu'il peuvent prendre
      var d = document.createElement('div');
      d.appendChild(document.createTextNode(lines[line]));
      document.body.appendChild(d);
      line+=1;
      nbre_auto+=1;
    }
    rien = document.createElement('br');
    document.body.appendChild(rien);


    //Pour chacun des automates nous allons lire les différentes transition possibles
    for (var i=0; i<nbre_auto; i++){
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
