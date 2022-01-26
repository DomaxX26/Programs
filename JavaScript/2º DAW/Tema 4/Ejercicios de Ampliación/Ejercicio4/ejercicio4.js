window.onload = main;

function main(){
	document.getElementById("buscar").addEventListener("click", buscarElemento);
}

function buscarElemento(){
	let txt = document.getElementById("texto").textContent;
	let palabra = document.getElementById("text").value;

	var index = txt.indexOf(palabra);
	console.log(index);
}