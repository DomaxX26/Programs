window.onload = main;

var visites = 0;

function main(){
	contador();
}

function contador(){
	var aux = 0;

	if(JSON.parse(localStorage.getItem("visites")) != null){
		aux = JSON.parse(localStorage.getItem("visites"));
	}

	visites = aux;
	visites++;

	let h1 = document.createElement("h1");
	let txt = document.createTextNode("Contador de visitas: " + visites);
	h1.appendChild(txt);
	document.body.appendChild(h1);

	localStorage.setItem("visites",visites);
}