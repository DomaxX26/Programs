window.onload = main;
var infoCamareros = [];
var infoMesa = [];
var infoPlatos = [];

function main(){
    if (JSON.parse(localStorage.getItem("token") != null)) {
        cargarAPIS();
    } else {
        location.assign("login.html");
    }
}
async function cargarAPIS(){
    await carregarDades();
    await carregarTaules(); 
    await carregarCamareros();
    await cargarPlatos();
    await carregarComanda();
}

async function carregarDades() {
    
    fetch("https://userprofile.serverred.es/api/areaPersonal", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem("token")
        }
    })
        .then(response => response.json())
        .then(data => {
            let user = document.getElementById("user");
            
            let avatar = document.getElementById("avatar");
            
            let nombre  = document.createTextNode(data.data.user.name);

            avatar.setAttribute("src", "https://userprofile.serverred.es/public/img/"+ data.data.user.avatar);
            user.replaceChildren(nombre);

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
                setInterval (colaComandas(element), 5000);
            });
		})
		.catch(error => {
			console.log("Error => ", error);
		});
}

async function cargarPlatos() {
	fetch("https://restaurante.serverred.es/api/platos", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"auth-token": localStorage.getItem("token")
		}
	})
		.then(response => response.json())
		.then(data => {
			infoPlatos = data.data.data;
		})
		.catch((error) => {
			console.log("Error => ", error);
		})
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

var cont = 0;
function colaComandas(element){
    let files = document.getElementById("files");
    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let td7 = document.createElement("td");

    //Crear Boton
    let input = document.createElement("input");
    input.setAttribute("type", "button");
    input.setAttribute("id", element._id);
    input.setAttribute("class", "btn btn-warning btn-lg p-2");
    input.setAttribute("value", "Servir");

    td1.appendChild(input);

    //Cargar Mesa
    let valor = infoMesa.find(item => item._id == element.mesa);
    let txtMesa = document.createTextNode(valor.numero);
    td2.appendChild(txtMesa);

    //Cargar Plato
    var txtPlato = "";
    var txtCantidad = "";
    element.platos.forEach(element => {
        txtPlato = document.createTextNode(element.nombre);
        txtCantidad = document.createTextNode(element.cantidad);
    });
    td3.appendChild(txtPlato);

    //Cargar Cantidad
    td4.appendChild(txtCantidad);

    //Cargar Orden
    let txtOrden = document.createTextNode(infoPlatos[0].orden);
    td5.appendChild(txtOrden);

    //Cargar Camareros
    let txtCamareros = document.createTextNode(infoCamareros[0].name);
    td6.appendChild(txtCamareros);
    
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);

    cont++;
    files.appendChild(tr);
}