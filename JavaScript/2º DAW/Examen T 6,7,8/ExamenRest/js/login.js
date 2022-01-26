window.onload = main;

function main() {
	document.getElementById("enviar").addEventListener("click", validar, false);
}

function validarEmail() {
	let correu = document.getElementById("email");

	if (!correu.checkValidity()) {
		if (correu.validity.valueMissing) {
			error2(correu, "Correu obligatori");
			return false;
		}
		if (correu.validity.patternMismatch) {
			error2(correu, "No es correcte el correu electrònic introduït");
			return false;
		}
	}
	return true;
}

function validarContrasenya() {
	let contrasenya = document.getElementById("password");

	if (!contrasenya.checkValidity()) {
		if (contrasenya.validity.valueMissing) {
			error2(contrasenya, "Contrasenya obligatoria");
			return false;
		}
		if (contrasenya.validity.patternMismatch) {
			error2(contrasenya, "Contrasenya no te el format correcte");
			return false;
		}
	}
	return true;
}

function login() {
	let correu = document.getElementById("email").value;
	let contrasenya = document.getElementById("password").value;

	var usuari = {
		email: correu,
		password: contrasenya
	}

	fetch("https://userprofile.serverred.es/api/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(usuari),
	})
		.then(response => response.json())
		.then(data => {
			if (data.error != null) {
				error2(document.getElementById("nom"), data.error)
			} else {
				localStorage.setItem("token", data.data.token);
				location.assign("areaPersonal.html");
				console.log(data);
			}
		})
		.catch((error) => {
			console.log("Error => ", error);
		})
}


function esborrarError() {
	let formulari = document.forms[0];
	for (let i = 0; i < formulari.elements.length - 1; i++) {
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
	if (validarEmail() && validarContrasenya()) {
		login();
		return true;
	} else {
		return false;
	}
}

