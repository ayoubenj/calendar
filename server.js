//https://accueil-ent2.univ-avignon.fr/edt/exportAgendaUrl?codeDip=2-M2EN

/***************librairies importantes **********/
var express = require('express'); //express
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });//parser des url
var fs = require('fs');
var app = express();
var url = require('url');
var request = require("request");


app.use(bodyParser.urlencoded({
      extended: true
}));

app.use(bodyParser.json());

app.use(function(req, res, next){

      next();     
  
})
.get('/', function (req, res) {
      console.log("racine");
  
})

.get('/todo', function(req, res) {

	console.log(req.body);
	url = "https://accueil-ent2.univ-avignon.fr/edt/exportAgendaUrl?codeDip=2-M2EN";
      console.log("dans todo " );

request({uri: url}, 
    function(error, response, body) {
    	var tablo = [];
    	var myobj = {};
    	
   	var tous = body.split('BEGIN:VEVENT');
   	for(var s in tous){
   		var DTSTART = tous[s].split('\n');

   		var taille = DTSTART.length;
   		var rest = DTSTART.slice(5,taille-3);
   		var arra = [];
   		var obj ={};
	   	for (var i in rest){
	   		 var o= rest[i].split(":");
	   		 arra.push(o);
	   		 obj[o[0]] = o[1];
	   		//console.log(o);
	   	}
	   	 //{ arra[0]: arra[1]};
	   	//console.log(arra);
	   	tablo.push(arra);
	   	myobj[s] = obj;
	  	//console.log("-*******************************************************--" );

   	}
   	
   	var question = "20181004T12300"
   	var t = question.length;
   	console.log(t);
   	var indexx = 0;
   	for (var j in myobj){
   		var str = myobj[j]['DTSTART']+'';
   		if(str.indexOf(question)> -1){
   			indexx = j;
   			console.log("trouvee" + j);

   		}
   	}
   	var ww = myobj[indexx];
   	console.log("vous avez de " + ww['DTSTART'] + " à "  + ww['DTEND'] + " " + ww['SUMMARY;LANGUAGE=fr'] + " dans la salle " + ww['LOCATION;LANGUAGE=fr'] );
   	//var reponserendu = "demain vous avez " + 

   	console.log(myobj["1"]['DTSTART']);
   	return res.json(myobj);
   	
    //console.log(tablo[5]);
  });
})


.listen(8085, () => {
  console.log("Server running on port 8080");
});


/*
BEGIN:VEVENT : BEGIN 
CATEGORIES:HYPERPLANNING
DTSTAMP:20181215T114232Z : DATE START
LAST-MODIFIED:20180517T155824Z
UID:Cours-71398-12-M2_INGE_DU_LOGICIEL_DE_LA_SOCIETE_NUM_(ILSEN)-Index-Education
DTSTART:20181116T120000Z : DATE --> ANNEE+MOIS+JOURS+'T'+1200
DTEND:20181116T180000Z : DATE ---> FIN DU COURS 
SUMMARY;LANGUAGE=fr:S-E06-0622 - UCE 2 INSERTION PROFESSIONNELL - Mme FREDOUILLE Corinne - M2 INGE DU LOGICIEL DE LA SOCIETE NUM (ILSEN)\, M2 SYSTEMES INFORMATIQUES COMMUNICANTS (SICOM) - 1 - Simulations d'entretiens d'embauche
LOCATION;LANGUAGE=fr:S1 = C 042 Nodes\, S2 = C 040\, S2 BIS = C 038\, S3 = C 036\, S4 = C 034\, S5 = C 024\, S6 = C 022\, S7 = C 032\, S8 = C 030
DESCRIPTION;LANGUAGE=fr:Matière : S-E06-0622 - UCE 2 INSERTION PROFESSIONNELL\nEnseignant : Mme FREDOUILLE Corinne\nPromotions : M2 INGE DU LOGICIEL DE LA SOCIETE NUM (ILSEN)\, M2 SYSTEMES INFORMATIQUES COMMUNICANTS (SICOM)\nTD : 1\nSalles : S1 = C 042 Nodes\, S2 = C 040\, S2 BIS = C 038\, S3 = C 036\, S4 = C 034\, S5 = C 024\, S6 = C 022\, S7 = C 032\, S8 = C 030\nMémo : Simulations d'entretiens d'embauche\n
//// LANGUAGE=fr:S1 = ... split  entre langauge et description --> salles , 2nd language --> matiéres  split : le prof 

END:VEVENT : FIN 

*/

/**
[ 'DTSTART', '20180911T140000Z' ]
[ 'DTEND', '20180911T170000Z' ]
[ 'SUMMARY;LANGUAGE=fr',
  'Réservation de salles - M2 INGE DU LOGICIEL DE LA SOCIETE NUM (ILSEN)\\, M2 SYSTEMES INFORMATIQUES COMMUNICANTS (SICOM) - 1 - Entretiens individuels Master' ]
[ 'LOCATION;LANGUAGE=fr',
  'S2 = C 040\\, S5 = C 024\\, S6 = C 022' ]


*/