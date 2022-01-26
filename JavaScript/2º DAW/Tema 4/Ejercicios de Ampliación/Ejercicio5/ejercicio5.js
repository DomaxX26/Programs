window.onload = main;

function main() {
	document.getElementById("ordenar").addEventListener("click", ordenarLista);
}

function ordenarLista() {
	//Obtenemos el elemento ul
	let ul = document.getElementById("list");
	//Obtenemos la lista de li
	let lista = ul.getElementsByTagName("li");
	//Creamos el array a partir de los elementos li
	//A continuación ordenamos con sort (hay que ordenar mirando el textContent y evitando la etiqueta li
	//Por último recorremos el array ya ordenado y vamos haciendo el append en el elemento ul (sobrescribiéndolo)
	let arrayMarcas = Array.from(lista);
	arrayMarcas.sort((marca1, marca2) => marca1.textContent.localeCompare(marca2.textContent)).forEach(li => ul.appendChild(li));
}

