// cada vegada que s'escriga una paraula al text area s'ha de contar el númerode paraules.
window.onload = main;

function main() {
	cargarAtributos();
	document.getElementById("tipo").addEventListener("change", cambiarImagen);
	document.getElementById("mostrarDescripcio").addEventListener("click", mostrarTextArea);
	document.getElementById("enviar").addEventListener("click", validar, false);
	document.getElementById("fDescripcio").addEventListener("keyup",contarPalabras);
}

function cambiarImagen() {
	let tipo = document.getElementById("tipo");
	let nomSelect = tipo[tipo.selectedIndex].value;

	let imagen = document.getElementById("imagen");
	let ruta = "img/" + nomSelect + ".jpg";

	imagen.setAttribute("src", ruta);
}

function mostrarTextArea() {
	let textarea = document.getElementById("fDescripcio");
	textarea.style.display = "block";
}

function validarTextArea(){
	let texto = document.getElementsByName("descripcio")[0].value;
	
	if (texto.length === 0) {
		error2(texto, "Introduzca una descripción.");
		return false;
	}else{
		return true;
	}

}

function valNumSerie() {
	let serie = document.getElementById("serie");
	let pattern = new RegExp(/^(\d{3})([A-Z]{4})([1-2]{1}||[A]{1})$/);
	
	if (pattern.test(serie.value)) {
		return true;
	} else if (serie.validity.valueMissing) {
		error2(serie, "Introduzca un número de serie.");
		return false;
	} else {
		error2(serie,"No es correcto el formato.");
		return false;
	}
}

function contarPalabras(){
	let label = document.getElementsByTagName("label")[2];
	
	let texto = document.getElementsByName("descripcio")[0].value;
	//Reemplazamos los saltos de linea por espacios
	texto = texto.replace (/\r?\n/g," ");
	//Reemplazamos los espacios seguidos por uno solo
	texto = texto.replace (/[ ]+/g," ");
	//Quitarmos los espacios del principio y del final
	texto = texto.replace (/^ /,"");
	texto = texto.replace (/ $/,"");
	//Troceamos el texto por los espacios
	var textoTroceado = texto.split (" ");
	//Contamos todos los trozos de cadenas que existen
	var numeroPalabras = textoTroceado.length;
	//Mostramos el número de palabras
	let text = document.createTextNode("Descripció - Nº de palabras: " + numeroPalabras);
	label.removeChild(label.lastChild);
	label.appendChild(text);
}



function cargarAtributos(){
	let serie = document.getElementById("serie");
	serie.setAttribute("placeholder", "Este es el formato: 123ABCD2");
	serie.setAttribute("required", "");
	

	let descricio = document.getElementById("descripcio");
	descricio.setAttribute("required", "");
}


function esborrarError() {
	let formulari = document.forms[0];
	let error = document.getElementById("capaError");
	for (let i = 0; i < formulari.elements.length; i++) {
		formulari.elements[i].className = "";
	}
	
	do{
		error.removeChild(error.lastChild);
	}while(error.children.length != 0);
}

function error2(element, missatge) {
	let textarea = document.getElementsByTagName("textarea");
	let capaError = document.getElementById("capaError");
	let text = document.createTextNode(missatge);
	let p = document.createElement("p");

	p.appendChild(text);
	capaError.appendChild(p);
	element.className = "error";
	if(!textarea){
		element.focus();
	}
}

function validar(e) {
	esborrarError();
	if (valNumSerie() && validarTextArea() && confirm("Confirma si vols enviar el formulari")) {
		return true;
	} else {
		e.preventDefault();
		return false;
	}
}