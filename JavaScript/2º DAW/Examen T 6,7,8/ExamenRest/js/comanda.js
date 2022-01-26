window.onload = main;
var infoCamareros = [];
var infoComandas = [];

function main() {
    if (JSON.parse(localStorage.getItem("token") != null)) {
        getDatos();
        document.getElementById("newComanda").addEventListener("click", function(){
            location.assign("altaComandas.html");
        })
    }else {
        location.assign("login.html");
    }
}

async function getDatos() {
    await carregarComandas();
    await carregarCamareros();
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
                mostrarTabla(element);
            });
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
            infoCamareros.push(data.data.data);
        })
        .catch((error) => {
            console.log("Error => ", error);
        })
}

async function carregarComandas() {
    fetch("https://restaurante.serverred.es/api/comandas", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.data.data)
            infoComandas.push(data.data.data);
        })
        .catch((error) => {
            console.log("Error => ", error);
        })
}

var cont = 0;
function mostrarTabla(element){
    let files = document.getElementById("files");

    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let td7 = document.createElement("td");

    //Botones para editar la comanda de bebidas
    let sumaBebida = document.createElement("i");
    sumaBebida.setAttribute("class", "fas fa-plus");

    let editarBebidas = document.createElement("button");
    editarBebidas.setAttribute("class", "btn btn-info btn-lg p-2");

    let textEditarBebidas = document.createTextNode("Bebidas");
    editarBebidas.appendChild(sumaBebida);
    editarBebidas.appendChild(textEditarBebidas);

    //Botón para editar la comanda de platos
    let sumaPlatos = document.createElement("i");
    sumaPlatos.setAttribute("class", "fas fa-plus");

    let editarPlatos = document.createElement("button");
    editarPlatos.setAttribute("class", "btn btn-warning btn-lg p-2");

    let texteditarPlatos = document.createTextNode("Platos");
    editarPlatos.appendChild(sumaPlatos);
    editarPlatos.appendChild(texteditarPlatos);
    
    let nombre = document.createTextNode(infoComandas[0][cont].nombre);
    let mesa = document.createTextNode(element.numero);
    let comensales = document.createTextNode(element.comensales);
    let camarero = document.createTextNode(infoCamareros[0][0].name);
    let horaEntrada = document.createTextNode(infoComandas[0][cont].fechaEntrada.slice(11,-8));
    cont++;
    

    td1.appendChild(editarBebidas);
    td2.appendChild(editarPlatos);
    td3.appendChild(nombre);
    td4.appendChild(mesa);
    td5.appendChild(comensales);
    td6.appendChild(camarero);
    td7.appendChild(horaEntrada);



    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);

    files.appendChild(tr);
}
