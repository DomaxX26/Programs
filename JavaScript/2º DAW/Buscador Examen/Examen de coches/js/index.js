window.onload = main;

function main() {
	mostrarCartelera();
	cargarSelect();

	//document.getElementById("modelos").addEventListener("change", cargarSelect);
	document.getElementById("buscador").addEventListener("keyup", buscadorMarcas);
	document.getElementById("buscador").addEventListener("keyup", cargarSelect);

	document.getElementById("modelos").addEventListener("change", cambiarModeloCoche);

}
function mostrarCartelera() {
	let article = document.getElementById("articulos");
	let text = " ";
	for (var i = 0; i < coches.length; i++) {
		text +=
			"<div id='div" + i + "' class='card mt-2' style='width: 25rem;' >" +
			"<h5 class='card-header'>" +
			coches[i].nombre +
			"</h5>" +
			"<div class='card-body'>" +
			"<div class='row'>" +
			"<div class='col'>" +
			"<h3 class='card-title'>" + coches[i].model + "</h3>" +
			"<p class='card-text'>" + coches[i].combustible + "</p>" +
			"<a id='bt" + i + "' href='#' class='btn btn-primary text-end' onclick='borrarElementos(" + i + ")'><i class='fa fa-trash-o' aria-hidden='true'></i></a>" +
			"</div>" +
			"<div class='col '>" +
			"<img src='img/" + coches[i].image + "' class='img-fluid img-thumbnail' width='400'>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"</div>";
		article.innerHTML = text;
	}
}

function buscadorMarcas() {
	let input = document.getElementById("buscador");

	coches.forEach((element, index) => {
		if (!element.nombre.toUpperCase().includes(input.value.toUpperCase())) {
			let div = document.getElementById("div" + index);
			div.style = "display:none";
		} else {
			let div = document.getElementById("div" + index);
			div.style = "display:block";
		}
	});
}

function cargarSelect() {
	let select = document.getElementById("modelos");
	let input = document.getElementById("buscador");
		
	borrarOption();
	if (input.value == "") {
		coches.forEach((element, index) => {
			let option = document.createElement("option");
			let txt = document.createTextNode(element.nombre + ", " + element.model);
			option.setAttribute("value", "coche"+index);
			option.appendChild(txt);
			select.appendChild(option);
		});
		document.getElementById("modelos").addEventListener("change", cambiarModelo);
	} else {
		for (var i = 0; i < coches.length; i++) {
			if (input.value == coches[i].nombre) {
				let option = document.createElement("option");
				let txt = document.createTextNode(coches[i].model);
				option.appendChild(txt);
				select.appendChild(option);
			}
			
		}
		
	}
}

function cambiarModeloCoche(){
	let select = document.getElementById("modelos").value;

	for(let j = 0; j < coches.length; j++){
	if (select == "Selecciona un modelo") {
		mostrarCartelera();
	}else if(select != coches[j].model){
		let div = document.getElementById("div"+j);
		div.style.display = "none";
	}else{
		let div = document.getElementById("div" +j);
		div.style.display = "block";
	}
}
}

function cambiarModelo() {
	let select = document.getElementById("modelos").value;

	coches.forEach((element, index) => {
		if ( select == "Selecciona un modelo") {
			mostrarCartelera();
		}else if(select != "coche"+index){
			let div = document.getElementById("div" + index);
			div.style.display = "none";
		}else{
			let div = document.getElementById("div" + index);
			div.style.display = "block";
		}
	});

}

function borrarOption() {
	let select = document.getElementById("modelos");
	while (select.firstChild) {
		select.removeChild(select.firstChild);
	}

	let option1 = document.createElement("option");
	let text = document.createTextNode("Selecciona un modelo");
	option1.appendChild(text);
	select.appendChild(option1);
}