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
    await carregarDades();
    await carregarTaules();
    await carregarCamareros();
    await carregarComanda();
}

async function carregarDades() {
    fetch("https://userprofile.serverred.es/api/areaPersonal", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
        }
    })
        .then(response => response.json())
        .then(data => {
            let user = document.getElementById("user");

            let avatar = document.getElementById("avatar");

            let nombre = document.createTextNode(data.data.user.name);

            avatar.setAttribute(
                "src",
                "https://userprofile.serverred.es/public/img/" + data.data.user.avatar
            );
            user.replaceChildren(nombre);
        })
        .catch(error => {
            console.log("Error => ", error);
        });
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
                gestionComanda(element);
            });
		})
		.catch(error => {
			console.log("Error => ", error);
		});
}

async function gestionComanda(element) {
    let files = document.getElementById("files");

    console.log(element);
    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let td7 = document.createElement("td");
    let td8 = document.createElement("td");

    let inputCerrar = document.createElement("input");
    inputCerrar.setAttribute("type", "button");
    inputCerrar.setAttribute("id", element._id);
    inputCerrar.setAttribute("class", "btn btn-danger btn-lg p-2");
    inputCerrar.setAttribute("value", "Cerrar");
    inputCerrar.addEventListener("click",()=>{
        $('#myModal').modal('show');
        let nombre = document.getElementById("nombre");
        nombre.innerHTML = "Nombre: " +element.nombre;

        let mesa = document.getElementById("mesa");
        let valor = infoMesa.find(item => item._id == element.mesa);
        mesa.innerHTML = "Mesa: " + valor.numero;

        let comensales = document.getElementById("comensales");
        comensales.innerHTML = "Comensales: " + element.comensales;

        let camarero = document.getElementById("camarero");
        camarero.innerHTML = "Camarero: " + infoCamareros[0].name;

        document.getElementById("close").addEventListener("click",()=>{
            $('#myModal').modal('hide');
        })

        document.getElementById("anular").addEventListener("click",()=>{
            $('#myModal').modal('hide');
        })

    });
    td1.appendChild(inputCerrar);
    

    let inputTicket = document.createElement("input");
    inputTicket.setAttribute("type", "button");
    inputTicket.setAttribute("id", element._id);
    inputTicket.setAttribute("class", "btn btn-primary btn-lg p-2");
    inputTicket.setAttribute("value", "Ticket");
    inputTicket.addEventListener("click", ()=>{
        location.assign("comandasTicket.html");
    })
    

    td2.appendChild(inputTicket);


    let txtNombre = document.createTextNode(element.nombre);
    td3.appendChild(txtNombre);


    let valor = infoMesa.find(item => item._id == element.mesa);
    var txtMesa = document.createTextNode(valor.numero);
    td4.appendChild(txtMesa);
    
    let txtComensales = document.createTextNode(element.comensales);
    td5.appendChild(txtComensales);

    let txtEstado = document.createTextNode(element.estado);
    td6.appendChild(txtEstado);
    
    if(element.estado == "Servido"){
        tr.setAttribute("class", "table-success");
    }else{
        tr.setAttribute("class", "table-light");
    }

    let txtCamarero = document.createTextNode(infoCamareros[0].name);
    td7.appendChild(txtCamarero);

    let txtFechaEntrada = document.createTextNode(element.fechaEntrada.slice(11,-8));
    td8.appendChild(txtFechaEntrada);

    var datos = {
        mesa: txtMesa,
        camarero: txtCamarero,
        nombre: txtNombre,
        comensales: txtComensales,
        fecha: element.fechaEntrada,
        hora: txtFechaEntrada
    }

//localStorage.setItem(datos);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    tr.appendChild(td8);

    files.appendChild(tr);
}
