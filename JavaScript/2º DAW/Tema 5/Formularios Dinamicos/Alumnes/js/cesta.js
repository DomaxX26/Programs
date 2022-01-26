window.onload = main;

var resta = 0;
var valor = "";
var preuFinal = 0;
var resta2 = 0;
var total = 0;

function main() {
  recuperarLocalStoratge();
  document.getElementById("enviar").addEventListener("click", volverInicio);
}

function recuperarLocalStoratge() {
  let nombre = document.getElementById("nombreApellidos");
  let contacte = JSON.parse(localStorage.getItem("contacte"));
  if (contacte != null) {
    nombre.append("Basquet de " + contacte.nom);
  }
  let prendas = JSON.parse(localStorage.getItem("prendas"));
  if (localStorage.getItem("prendas") != null) {
    prendas = JSON.parse(localStorage.getItem("prendas"));
  }
  mostrarCompra(prendas);
  //sumarTotal(prendas);
}

function mostrarCompra(prendas) {
  var article = document.getElementById("articulos");
  //var preuFinal = document.getElementById("total");
  
  let text = "";
  if (prendas == null) {
    let h3 = document.getElementById("error");
    let error = "Basquet Vacio";
    h3.append(error);
  } else {
    for (var i = 0; i < prendas.length; i++) {
      text +=
        "<div id='div" + i + "' class='card mt-2' style='width: 25rem;'>" +
        "<h5 class='card-header'>" +
        prendas[i].article +
        "</h5>" +
        "<div class='card-body'>" +
        "<div class='row'>" +
        "<div class='col'>" +
        "<h3 class='card-title'>" + prendas[i].preu + " €</h3>" +
        "<p class='card-text'>Talla " + prendas[i].talla + "</p>" +
        "<a id='bt" + i + "' href='#' class='btn btn-primary text-end' onclick='borrarElementos("+i+")'><i class='fa fa-trash-o' aria-hidden='true'></i></a>" +
        "</div>" +
        "<div class='col '>" +
        "<img src='./img/" + prendas[i].article.toLowerCase() + ".jpg' class='img-fluid img-thumbnail'>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";
        total += prendas[i].preu;
      article.innerHTML = text;
    }
    //preuFinal.innerHTML = total + " €";
  }
}

function borrarElementos(i) {
  let div = document.getElementById("div"+i);
  //let total = document.getElementById("total");
  //let separacio = "";
  //separacio = total.outerText;
  //valor = separacio.split(" ");
  
  preuFinal = parseInt(valor[0]);
  let prendas = JSON.parse(localStorage.getItem("prendas"));
  if (localStorage.getItem("prendas") != null) {
    prendas = JSON.parse(localStorage.getItem("prendas"));
  }
  //resta = prendas[i].preu;
  //resta2 = preuFinal - resta;
  
  prendas.splice(i,1);
  localStorage.setItem("prendas", JSON.stringify(prendas));
  sumarTotal(prendas);
  //total.innerHTML = resta2 + " €";
  //location.reload();
  div.remove(div);
}

function sumarTotal(precio){
  //debugger;
  let h5 = document.getElementById("total");
  let txt = document.createTextNode(" 0 €");
  let total = 0;
  if(precio == null){
    h5.appendChild(txt);
  }else{
    for(let i = 0; i < precio.length; i++){
      total += precio[i].preu;
    }
    h5.append(" " + total + " €");
  }
}

function volverInicio(){
  localStorage.clear();
  window.location = "FDInici.html";
}