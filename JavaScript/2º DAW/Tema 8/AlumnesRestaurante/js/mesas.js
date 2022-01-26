window.onload = main;

function main() {
    if (JSON.parse(localStorage.getItem("token") != null)) {
        cargarDatos();
        carregarDades();
    }
    document.getElementById("newMesa").addEventListener("click", novaTaula);
    document.getElementById("confirmar").addEventListener("click", validar, false);
    document.getElementById("cancelar").addEventListener("click", ocultarTaula);
}

function novaTaula() {
    document.getElementById("formulario").setAttribute("class", "visually-visible");
}

function ocultarTaula() {
    document.getElementById("formulario").setAttribute("class", "visually-hidden");
    esborrarError();
    document.getElementById("numero").value = "";
    document.getElementById("comensales").value = "";
    document.getElementById("descripcion").value = "";
}

function cargarDatos() {
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
                mostrarMesas(element);
            });
        })
        .catch((error) => {
            console.log("Error => ", error);
        })
}

function mostrarMesas(element) {
    var files = document.getElementById("files");

    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");

    let botonBorrar = document.createElement("button");
    let botonBorrarTexto = document.createTextNode("Esborrar");
    botonBorrar.setAttribute("class", "btn btn-primary btn-lg my-3");
    botonBorrar.setAttribute("onclick", "borrarMesa(this)");
    botonBorrar.setAttribute("id", element._id);
    botonBorrar.appendChild(botonBorrarTexto);

    let botonModificar = document.createElement("button");
    let botonModificarTexto = document.createTextNode("Modificar");
    botonModificar.setAttribute("class", "btn btn-primary btn-lg my-3");
    botonModificar.setAttribute("onclick", "modificarMesa(this)");
    botonModificar.setAttribute("id", element._id);
    botonModificar.appendChild(botonModificarTexto);

    let numero = document.createTextNode(element.numero);
    let comensales = document.createTextNode(element.comensales);
    let descripcion = document.createTextNode(element.descripcion);

    td1.appendChild(botonBorrar);
    td2.appendChild(botonModificar);
    td3.appendChild(numero);
    td4.appendChild(comensales);
    td5.appendChild(descripcion);

    tr.appendChild(td1);
    tr.appendChild(td2)
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    files.appendChild(tr);
}
function carregarDades() {

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

            avatar.setAttribute("src", "https://userprofile.serverred.es/public/img/" + data.data.user.avatar);
            user.replaceChildren(nombre);

        })
        .catch((error) => {
            console.log("Error => ", error);
        })
}

function validarNumMesa() {
    let numero = document.getElementById("numero");

    if (!numero.checkValidity()) {
        if (numero.validity.valueMissing) {
            error2(numero, "Error: Numero de mesa es obligatorio");
            return false;
        }
        if (numero.validity.rangeOverflow) {
            error2(numero, "Error: Numero de mesa superior a 100");
            return false;
        }
        if (numero.validity.rangeUnderflow) {
            error2(numero, "Error: Numero de mesa inferior a 1");
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
            error2(comensales, "Error: Numero de comensales por encima de lo permitido");
            return false;
        }
        if (comensales.validity.rangeUnderflow) {
            error2(comensales, "Error: Numero de comensales inferior de lo permitido");
            return false;
        }
    }
    return true;
}

function borrarMesa(element) {
    fetch("https://restaurante.serverred.es/api/mesas/" + element.id, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
    let platoBorrado = document.getElementById(element.id);
    platoBorrado.parentNode.parentNode.parentNode.removeChild(platoBorrado.parentNode.parentNode);
}

function modificarMesa(element) {

    var mesa = {
        numero: document.getElementById("numero").value,
        comensales: document.getElementById("comensales").value,
        descripcion: document.getElementById("descripcion").value
    }
    fetch("https://restaurante.serverred.es/api/mesas/" + element.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify(mesa)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

function esborrarError() {
    let formulari = document.forms[0];
    for (let i = 0; i < formulari.elements.length - 2; i++) {
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
    if (validarNumMesa() && validarComensales()) {
        newTable();
        return true;
    } else {
        return false;
    }
}

function newTable() {
    var mesa = {
        numero: document.getElementById("numero").value,
        comensales: document.getElementById("comensales").value,
        descripcion: document.getElementById("descripcion").value
    }

    fetch("https://restaurante.serverred.es/api/mesas", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify(mesa)
    })
        .then(response => response.json())
        .then(data => mostrarMesas(data.resultado))
        .catch(error => console.log(error));
}