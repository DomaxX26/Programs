window.onload = main;
function main() {
  document.getElementById("inicio").addEventListener("click", contador);
  document.getElementById("cancelar").addEventListener("click", click);
}

var contador;
var interval;
var segundos = 30;

function click() {
  clearInterval(interval);
  var texto00 = contador.appendChild(document.createTextNode(segundos));
  contador.replaceChildren(texto00, texto00);
}

function temporizador() {
  console.log(segundos);

  segundos--;
  contador = document.getElementById("contador");
  var segundosTxt = document.createTextNode(segundos);
  contador.replaceChildren(segundosTxt, segundosTxt);

  if (segundos == 0) {
    document.location = "https://uniwebsidad.com/";
  }
}

function contador() {
    interval = setInterval(temporizador, 1000);
}
