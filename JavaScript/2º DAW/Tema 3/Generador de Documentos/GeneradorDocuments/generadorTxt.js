
let fs = require('fs');
var arrayPrimeraLinia = new Array();
var arraySegonaLinia = new Array();

const Plantilla = "Plantilla.txt";
const bd = "basedades.csv";

function obtenerPlantilla(plantilla) {
  return fs.readFileSync(plantilla, 'utf-8');
}
let aux = obtenerPlantilla(Plantilla);



// Llegir arxiu linea a linea
fs.readFileSync(bd, "utf-8").split(/\r?\n/).forEach(function (line, index) {
  if (index == 0) {
    arrayPrimeraLinia = line.split(';');
  }
  else {
    arraySegonaLinia = line.split(';');
  }
});

for(let i = 0; i < arrayPrimeraLinia.length; i++){
  aux = aux.replace(arrayPrimeraLinia[i], arraySegonaLinia[i]); 
}



//Crear carpeta
fs.mkdir("./resultat/", function (err) {
  if (err) {
    console.log(err);
  }
});

//Crear archivo 
let numAleatorio = Math.round(Math.random()*1000);

fs.appendFile("./resultat/"+ arraySegonaLinia[0] + "_" + arraySegonaLinia[1] +"_" + numAleatorio  + ".txt", aux + "\n", function (err) {
  if (err) {
    console.log(err);
  }
});









