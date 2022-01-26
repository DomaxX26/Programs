window.onload = main;

function main() {
    if (JSON.parse(localStorage.getItem("token") != null)) {
        cargarDatos();
        carregarDades();
    }
    document.getElementById("newBebida").addEventListener("click", novaBeguda);
    document.getElementById("confirmar").addEventListener("click", validar, false);
    document.getElementById("cancelar").addEventListener("click", ocultarBeguda);
}

function novaBeguda() {
    document.getElementById("formulario").setAttribute("class", "visually-visible");
}

function ocultarBeguda() {
    document.getElementById("formulario").setAttribute("class", "visually-hidden");
    esborrarError();
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
}

function cargarDatos() {
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
                mostrarBebidas(element);
            });
        })
        .catch((error) => {
            console.log("Error => ", error);
        })
}

function mostrarBebidas(element) {

    var files = document.getElementById("files");

    let tr = document.createElement("tr");

    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");

    let botonBorrar = document.createElement("button");
    let botonBorrarTexto = document.createTextNode("Esborrar");
    botonBorrar.setAttribute("class", "btn btn-primary btn-lg my-3");
    botonBorrar.setAttribute("onclick", "borrarBebida(this)");
    botonBorrar.setAttribute("id", element._id);
    botonBorrar.appendChild(botonBorrarTexto);

    let botonModificar = document.createElement("button");
    let botonModificarTexto = document.createTextNode("Modificar");
    botonModificar.setAttribute("class", "btn btn-primary btn-lg my-3");
    botonModificar.setAttribute("onclick", "modificarBebida(this)");
    botonModificar.setAttribute("id", element._id);
    botonModificar.appendChild(botonModificarTexto);

    let numero = document.createTextNode(element.nombre);
    let comensales = document.createTextNode(element.precio);

    td1.appendChild(botonBorrar);
    td2.appendChild(botonModificar);
    td3.appendChild(numero);
    td4.appendChild(comensales);

    tr.appendChild(td1);
    tr.appendChild(td2)
    tr.appendChild(td3);
    tr.appendChild(td4);

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

function validarNombre() {
    let nombre = document.getElementById("nombre");

    if (!nombre.checkValidity()) {
        if (nombre.validity.valueMissing) {
            error2(nombre, "Error: Nombre de la bebida es obligatorio");
            return false;
        }
        if (nombre.validity.patternMismatch) {
            error2(nombre, "Error: El nombre de la bebida no es correcto (4 - 60 caracteres)");
            return false;
        }
    }
    return true;
}

function validarPrecio() {
    let precio = document.getElementById("precio");

    if (!precio.checkValidity()) {
        if (precio.validity.valueMissing) {
            error2(precio, "Error: Precio de bebida es obligatorio");
            return false;
        }
        if (precio.validity.rangeUnderflow) {
            error2(precio, "Error: Numero de precio inferior de lo permitido");
            return false;
        }
    }
    return true;
}

function borrarBebida(element) {
    fetch("https://restaurante.serverred.es/api/bebidas/" + element.id, {
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

function modificarBebida(element) {
    var bebida = {
        nombre: document.getElementById("nombre").value,
        precio: document.getElementById("precio").value,
    }
    fetch("https://restaurante.serverred.es/api/bebidas/" + element.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify(bebida)
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
    if (validarNombre() && validarPrecio()) {
        newDrink();
        return true;
    } else {
        return false;
    }
}

function newDrink() {
    var bebida = {
        nombre: document.getElementById("nombre").value,
        precio: document.getElementById("precio").value,
    }

    fetch("https://restaurante.serverred.es/api/bebidas", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify(bebida)
    })
        .then(response => response.json())
        .then(data => mostrarBebidas(data.resultado))
        .catch(error => console.log(error));
}