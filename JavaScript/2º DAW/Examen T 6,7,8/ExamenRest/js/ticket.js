window.onload = main;
var infoCamareros = [];
var infoMesa = [];

function main() {
    if (JSON.parse(localStorage.getItem("token") != null)) {
        cargarAPIS();
    } else {
        location.assign("login.html");
    }
}

async function cargarAPIS() {
    await carregarTaules();
    await carregarCamareros();
    await carregarComanda();
}

async function carregarCamareros() {
    fetch("https://restaurante.serverred.es/api/camareros", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
        }
    })
        .then(response => response.json())
        .then(data => {
            infoCamareros=data.data.data;
        })
        .catch((error) => {
            console.log("Error => ", error);
        })
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
                infoMesa.push(element);
            });
        })
        .catch((error) => {
            console.log("Error => ", error);
        })
}

async function carregarComanda(){
    fetch("https://restaurante.serverred.es/api/comandas", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"auth-token": localStorage.getItem("token")
		}
	})
		.then(response => response.json())
		.then(data => {
			data.data.data.forEach(element => {
                gestionTicket(element);
            });
		})
		.catch(error => {
			console.log("Error => ", error);
		});
}


function gestionTicket(element){
    let mesa = document.getElementById("mesa")
}
