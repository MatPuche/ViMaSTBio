var sentence = '"b" 0 -> 1 when "d"=10';

var resultat = /"([a-z])" ([0-9]) -> ([0-9]) when "([a-z])"=([0-9]+)(?: and "([a-z])"=([0-9]+))*/.exec(sentence);

var recher = sentence.match(/\b[0-9]+\b/g);

alert(recher.length);



var transitions = {} //le dictionnaire

var auto = RegExp.$1;

var trans = [] // la liste représentant toutes les transitions de l'automate auto
var curTrans = [] // la liste représentant la transition en cours d'analyse

curTrans.push((RegExp.$1, RegExp.$2), []);
