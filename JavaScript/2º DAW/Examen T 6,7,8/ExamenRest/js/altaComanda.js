window.onload = main;
var infoTaula = [];
var infoBebidas = [];
var bebidas = [];

function main() {
	if (JSON.parse(localStorage.getItem("token") != null)) {
		getDatos();
		document
			.getElementById("confirmar")
			.addEventListener("click", validar, false);
	} else {
		location.assign("login.html");
	}
}

async function getDatos() {
	await carregarPlatos();
	await carregarBebidas();
	await carregarTaules();
}

async function carregarTaules() {
	fetch("https://restaurante.serverred.es/api/mesas", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"auth-token": localStorage.getItem("token")
		}
	})
		.then(response => response.json())
		.then(data => {
			data.data.data.forEach(element => {
				crearMesas(element);
				infoTaula.push(element);
			});
		})
		.catch(error => {
			console.log("Error => ", error);
		});
}

async function carregarBebidas() {
	fetch("https://restaurante.serverred.es/api/bebidas", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"auth-token": localStorage.getItem("token")
		}
	})
		.then(response => response.json())
		.then(data => {
			data.data.data.forEach(element => {
				crearBebidas(element);
			});
		})
		.catch(error => {
			console.log("Error => ", error);
		});
}

async function carregarPlatos() {
	fetch("https://restaurante.serverred.es/api/platos", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"auth-token": localStorage.getItem("token")
		}
	})
		.then(response => response.json())
		.then(data => {
			data.data.data.forEach(element => {
				crearPlatos(element);
			});
		})
		.catch(error => {
			console.log("Error => ", error);
		});
}

function crearMesas(element) {
	let mesas = document.getElementById("mesas");

	let div = document.createElement("div");
	div.setAttribute("class", "col");

	let input = document.createElement("input");
	input.setAttribute("type", "button");
	input.setAttribute("id", element._id);
	input.setAttribute("class", "mt-2 btn btn-primary p-3");
	input.setAttribute("value", element.numero);
	input.addEventListener("click", cambiarColor);

	div.appendChild(input);

	mesas.appendChild(div);
}

function cambiarColor() {
	infoTaula.forEach(element => {
		document
			.getElementById(element._id)
			.setAttribute("class", "mt-2 btn btn-primary p-3");
	});

	var infoMesa = infoTaula.find(item => item._id == this.id);
	var button = document.getElementById(infoMesa._id);
	button.setAttribute("class", "mt-2 btn btn-danger p-3");

	let datosMesa = document.getElementById("datosMesa");
	let txtMesa = document.createTextNode(
		"Numero de comensales: " +
		infoMesa.comensales +
		", Descripción: " +
		infoMesa.descripcion
	);
	datosMesa.replaceChildren(txtMesa);
}

function crearBebidas(element) {
	let bebidas = document.getElementById("bebidas");

	let div = document.createElement("div");
	div.setAttribute("class", "col");

	let input = document.createElement("input");
	input.setAttribute("type", "button");
	input.setAttribute("id", element._id);
	input.setAttribute("class", "mt-2 btn btn-info p-3");
	input.setAttribute("value", element.nombre);
	input.addEventListener("click", function () {
		infoBebidas.push(element);
		comandaBebidas(element._id);
	});

	div.appendChild(input);

	bebidas.appendChild(div);
}

function crearPlatos(element) {
	let div = document.createElement("div");
	div.setAttribute("class", "col");

	let input = document.createElement("input");
	input.setAttribute("type", "button");
	input.setAttribute("id", element._id);
	input.setAttribute("class", "mt-2 btn btn-warning p-3");
	input.setAttribute("value", element.nombre);

	div.appendChild(input);
	document.getElementById("platos" + element.orden).appendChild(div);
}

function validarNombre() {
	let nom = document.getElementById("nombre");

	if (!nom.checkValidity()) {
		if (nom.validity.valueMissing) {
			error2(nom, "Nom obligatori");
			return false;
		}
		if (nom.validity.patternMismatch) {
			error2(nom, "El nom no esta dins del rang (4 - 60) caràcters");
			return false;
		}
	}
	return true;
}

function validarComensales() {
	let comensales = document.getElementById("comensales");

	if (!comensales.checkValidity()) {
		if (comensales.validity.valueMissing) {
			error2(comensales, "Error: Numero de comensales obligatorio");
			return false;
		}
		if (comensales.validity.rangeOverflow) {
			error2(
				comensales,
				"Error: Numero de comensales por encima de lo permitido"
			);
			return false;
		}
		if (comensales.validity.rangeUnderflow) {
			error2(
				comensales,
				"Error: Numero de comensales inferior de lo permitido"
			);
			return false;
		}
	}
	return true;
}

function nuevaComanda() {
	console.log(infoTaula);
	let nombre = document.getElementById("nombre").value;
	let comensales = document.getElementById("comensales").value;
	let notas = document.getElementById("notas").value;

	var comanda = {
		nom: nombre,
		comensals: comensales,
		estado: "Pendiete",
		mesa: infoTaula._id,
		bebidas: [],
		platos: [],
		notas: notas
	};

	fetch("https://restaurante.serverred.es/api/comandas", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"auth-token": localStorage.getItem("token")
		},
		body: JSON.stringify(comanda)
	})
		.then(response => response.json())
		.then(data => { })
		.catch(error => {
			console.log("Error => ", error);
		});
}

function comandaBebidas(idBoto) {
	var comBebidas = document.getElementById("comBebidas");
	comBebidas.replaceChildren("");

	infoBebidas.forEach(element => {
		let tr = document.createElement("tr");

		let td1 = document.createElement("td");
		let td2 = document.createElement("td");
		let td3 = document.createElement("td");

		//Crear Boton
		let input = document.createElement("input");
		input.setAttribute("type", "button");
		input.setAttribute("id", element._id);
		input.setAttribute("class", "mt-2 btn btn-danger p-3");
		input.setAttribute("value", "Borrar");

		td1.appendChild(input);

		//Añadir Bebida
		let b = document.createElement("b");
		let txtBebida = document.createTextNode(element.nombre);
		b.appendChild(txtBebida);
		td2.appendChild(b);

		//Añadir Cantidad
		console.log(element)
		var bebida = {
			id: element._id,
			nombre: element.nombre,
			cantidad: 
		}

		let busqueda = element._id;
		let index = infoBebidas.findIndex(
			busca_bebidas => busca_bebidas._id === busqueda
		);

		if (index >= 0) {
			alert("Producto ya registrado");
		} else {
			array_tenda.push(objetoProductos);
			localStorage.setItem("productos", JSON.stringify(array_tenda));
			alert("Se a registrado correctamente");
		}

		console.log(index);
		//Añadir columnas
		tr.appendChild(td1);
		tr.appendChild(td2);

		comBebidas.appendChild(tr);
	});
}

function esborrarError() {
	let formulari = document.forms[0];
	for (
		let i = 0;
		i < formulari.elements.length - formulari.elements.length;
		i++
	) {
		formulari.elements[i].className = "form-control";
	}
	document.getElementById("missatgeError").innerHTML = "";
}

function error2(element, missatge) {
	document.getElementById("missatgeError").innerHTML = missatge;
	element.className = "error form-control";
}

function validar(e) {
	esborrarError();
	e.preventDefault();
	if (validarNombre() && validarComensales()) {
		nuevaComanda();
		return true;
	} else {
		return false;
	}
}
