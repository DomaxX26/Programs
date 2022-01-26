window.onload = main;
var direciones = [];

function main() {
  cargarDatos();
  document.getElementById("crearAdresa").addEventListener("click", crearAdresa);
}

function crearAdresa() {
  //Recuperamos el valor de los inputs
  let nomAdresa = document.getElementById("nomAdresa").value;
  let urlAdresa = document.getElementById("urlAdresa").value;

  //Creamos el objeto
  var adreça = {
    nom: nomAdresa,
    url: urlAdresa
  };

  //Comprovamos que no este vacío el LocalStoratge
  if (JSON.parse(localStorage.getItem("direcion") != null)) {
    direciones = JSON.parse(localStorage.getItem("direcion"));
    console.log(direciones);
  }
  
    direciones.push(adreça);
  localStorage.setItem("direcion", JSON.stringify(direciones));
  let indAux = direciones.length -1;
  afegirLinia(adreça, indAux);
 
}

function borrarAdresa(index) {
  console.log(index);
  
  let arrayDireccions = new Array();
  //Obtener del localStoratge
  arrayDireccions = JSON.parse(localStorage.getItem("direcion"));
  arrayDireccions.splice(index, 1);
  localStorage.setItem("direcion", JSON.stringify(arrayDireccions));
  // eliminar li de la pantalla. 
  document.getElementById("adr"+ index).parentNode.parentNode.removeChild(document.getElementById("adr"+ index).parentNode);
}

function cargarDatos() {
  let ul = document.getElementById("llista");
  //Comprovamos que no este vacío el LocalStoratge
  if (JSON.parse(localStorage.getItem("direcion") != null)) {
    direciones = JSON.parse(localStorage.getItem("direcion"));
    console.log(direciones);
  }

  direciones.forEach((adresses, ind) => {
    afegirLinia(adresses, ind);
  });

}

function afegirLinia (adresses, ind){
  //Cogemos el valor de la lista en el HTML
  let ul = document.getElementById("llista");

  //Creamos el elemento <li>
  let li = document.createElement("li");

  //Creamos el elemento <input>
  let input = document.createElement("input");
  //Añadimos el atributo de 'type="checkbox"'
  input.setAttribute("type", "checkbox");
  //Crear indice para el id
  //Añadimos el atributo id
  input.setAttribute("id", "adr" + ind);

  //Añadimos el <input> al <li>
  li.appendChild(input);

  //Creamos la etiqueta <a>
  let link = document.createElement("a");
  //Añadimos el atributo "href" a <a>
  link.setAttribute("href", adresses.url);
  //Añadimos el atributo para que se abra en una pestaña diferente
  link.setAttribute("target", "_blank");
  //Creamos el texto que se vera en el programa con el enlace
  let linkText = document.createTextNode(adresses.nom);
  //Añadimos el texto a del enlace al enlace
  link.appendChild(linkText);
  //Añadimos el enlace a la etiqueta <li>
  li.appendChild(link);
  //Añadimos la etiqueta <li> a la etiqueta <ul> para que se muestre
  ul.appendChild(li);
  input.addEventListener("click", () => {
    borrarAdresa(ind);
  });
}
